import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoVector,
  MakeTime,
  SiderealTime,
  e_tilt,
} from 'astronomy-engine';
import { DateTime } from 'luxon';
import { calculateHouses, houseOf, type HouseSystem } from './houses';
import { angularSep, norm360 } from './math';
import { SIGNS, type BodyPoint } from '../chart';

export type ChartInput = {
  date: string;
  time: string;
  lat: number;
  lon: number;
  tz: string;
  houseSystem?: HouseSystem;
  timeUnknown?: boolean;
  placeLabel?: string;
};

export type ChartPlanet = {
  key: string;
  name: string;
  glyph: string;
  lon: number;
  speed: number;
  retrograde: boolean;
  sign: string;
  signGlyph: string;
  house: number | null;
  lonInSign: number;
};

export type ChartAspect = {
  a: string;
  b: string;
  type: string;
  symbol: string;
  angle: number;
  orb: number;
  applying: boolean;
};

export type ChartResult = {
  datetimeLocal: string;
  datetimeUtc: string;
  tz: string;
  lat: number;
  lon: number;
  placeLabel?: string;
  timeUnknown: boolean;
  houseSystem: HouseSystem;
  obliquity: number;
  lstDeg: number;
  jd: number;
  bodies: ChartPlanet[];
  ascendant: number | null;
  mc: number | null;
  ic: number | null;
  descendant: number | null;
  cusps: number[] | null;
  aspects: ChartAspect[];
};

const PLANETS: Array<{ key: string; name: string; glyph: string; body: Body }> = [
  { key: 'sun', name: 'Sun', glyph: '☉', body: Body.Sun },
  { key: 'moon', name: 'Moon', glyph: '☽', body: Body.Moon },
  { key: 'mercury', name: 'Mercury', glyph: '☿', body: Body.Mercury },
  { key: 'venus', name: 'Venus', glyph: '♀', body: Body.Venus },
  { key: 'mars', name: 'Mars', glyph: '♂', body: Body.Mars },
  { key: 'jupiter', name: 'Jupiter', glyph: '♃', body: Body.Jupiter },
  { key: 'saturn', name: 'Saturn', glyph: '♄', body: Body.Saturn },
  { key: 'uranus', name: 'Uranus', glyph: '♅', body: Body.Uranus },
  { key: 'neptune', name: 'Neptune', glyph: '♆', body: Body.Neptune },
  { key: 'pluto', name: 'Pluto', glyph: '♇', body: Body.Pluto },
];

const ASPECTS: Array<{ name: string; symbol: string; angle: number; orb: number }> = [
  { name: 'conjunction', symbol: '☌', angle: 0, orb: 8 },
  { name: 'sextile', symbol: '⚹', angle: 60, orb: 4 },
  { name: 'square', symbol: '□', angle: 90, orb: 6 },
  { name: 'trine', symbol: '△', angle: 120, orb: 6 },
  { name: 'opposition', symbol: '☍', angle: 180, orb: 8 },
];

function tropicalLon(body: Body, time: Date | import('astronomy-engine').AstroTime): number {
  if (body === Body.Moon) {
    return norm360(EclipticGeoMoon(time).lon);
  }
  const vec = GeoVector(body, time, true);
  return norm360(Ecliptic(vec).elon);
}

function localDateTime(date: string, time: string, tz: string): DateTime {
  const dt = DateTime.fromFormat(`${date} ${time}`, 'yyyy-MM-dd HH:mm', { zone: tz });
  if (!dt.isValid) {
    throw new Error(`Invalid datetime: ${date} ${time} ${tz} (${dt.invalidReason})`);
  }
  return dt;
}

function formatSpeed(degPerDay: number): string {
  const sign = degPerDay < 0 ? '−' : '+';
  const abs = Math.abs(degPerDay);
  const d = Math.floor(abs);
  const rest = (abs - d) * 60;
  const m = Math.floor(rest);
  const s = Math.round((rest - m) * 60);
  return `${sign}${d}°${String(m).padStart(2, '0')}′${String(s).padStart(2, '0')}″`;
}

function signMeta(lon: number) {
  const s = SIGNS[Math.floor(norm360(lon) / 30)];
  return { sign: s.n, signGlyph: s.g, lonInSign: norm360(lon) % 30 };
}

function buildAspects(planets: ChartPlanet[]): ChartAspect[] {
  return aspectsBetween(planets, planets, 'natal');
}

export function aspectsBetween(
  groupA: ChartPlanet[],
  groupB: ChartPlanet[],
  mode: 'natal' | 'synastry' = 'synastry',
): ChartAspect[] {
  const out: ChartAspect[] = [];
  for (let i = 0; i < groupA.length; i++) {
    const j0 = mode === 'natal' ? i + 1 : 0;
    const listB = mode === 'natal' ? groupA : groupB;
    for (let j = j0; j < listB.length; j++) {
      const A = groupA[i];
      const B = listB[j];
      const s = angularSep(A.lon, B.lon);
      const def = ASPECTS.find((d) => Math.abs(s - d.angle) <= d.orb);
      if (!def) continue;
      const orb = Math.abs(s - def.angle);
      const future = angularSep(A.lon + A.speed / 24, B.lon + B.speed / 24);
      out.push({
        a: A.name,
        b: B.name,
        type: def.name,
        symbol: def.symbol,
        angle: def.angle,
        orb,
        applying: Math.abs(future - def.angle) < orb,
      });
    }
  }
  return out.sort((x, y) => x.orb - y.orb);
}

export function midpointLon(a: number, b: number): number {
  const delta = ((b - a + 540) % 360) - 180;
  return norm360(a + delta / 2);
}

export function compositeChart(left: ChartResult, right: ChartResult): ChartResult {
  const bodies: ChartPlanet[] = left.bodies.map((p) => {
    const q = right.bodies.find((x) => x.key === p.key);
    const lon = midpointLon(p.lon, q?.lon ?? p.lon);
    const speed = (p.speed + (q?.speed ?? p.speed)) / 2;
    const meta = signMeta(lon);
    return {
      ...p,
      lon,
      speed,
      retrograde: speed < 0 && p.key !== 'sun' && p.key !== 'moon',
      sign: meta.sign,
      signGlyph: meta.signGlyph,
      lonInSign: meta.lonInSign,
      house: null,
    };
  });

  const timeUnknown = left.timeUnknown || right.timeUnknown;
  const ascendant =
    left.ascendant != null && right.ascendant != null
      ? midpointLon(left.ascendant, right.ascendant)
      : null;
  const mc =
    left.mc != null && right.mc != null ? midpointLon(left.mc, right.mc) : null;
  const cusps = ascendant != null ? Array.from({ length: 12 }, (_, i) => norm360(ascendant + i * 30)) : null;
  if (cusps) {
    for (const body of bodies) {
      body.house = houseOf(body.lon, cusps);
    }
  }

  return {
    datetimeLocal: left.datetimeLocal,
    datetimeUtc: left.datetimeUtc,
    tz: left.tz,
    lat: (left.lat + right.lat) / 2,
    lon: midpointLon(left.lon + 180, right.lon + 180) - 180,
    placeLabel: [left.placeLabel, right.placeLabel].filter(Boolean).join(' × '),
    timeUnknown,
    houseSystem: 'whole-sign',
    obliquity: left.obliquity,
    lstDeg: left.lstDeg,
    jd: (left.jd + right.jd) / 2,
    bodies,
    ascendant,
    mc,
    ic: mc != null ? norm360(mc + 180) : null,
    descendant: ascendant != null ? norm360(ascendant + 180) : null,
    cusps,
    aspects: buildAspects(bodies),
  };
}

export function toBodyPoints(planets: ChartPlanet[]): BodyPoint[] {
  return planets.map((p) => ({
    b: p.name,
    g: p.glyph,
    lon: p.lon,
    sp: formatSpeed(p.speed),
    r: p.retrograde || undefined,
  }));
}

export function formatCoord(lat: number, lon: number): string {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lon >= 0 ? 'E' : 'W';
  const fmt = (v: number, hemi: string) => {
    const abs = Math.abs(v);
    const d = Math.floor(abs);
    const m = Math.round((abs - d) * 60);
    return `${d}°${String(m).padStart(2, '0')}′${hemi}`;
  };
  return `${fmt(lat, ns)} ${fmt(lon, ew)}`;
}

/**
 * Natal chart from civil date/time in an IANA timezone.
 * Planets: astronomy-engine (tropical apparent ecliptic of date).
 * Houses: Placidus or Whole Sign from LST + latitude.
 */
export function calculateChart(input: ChartInput): ChartResult {
  const houseSystem = input.houseSystem ?? 'placidus';
  const timeUnknown = Boolean(input.timeUnknown);
  const time = timeUnknown ? '12:00' : input.time;
  const local = localDateTime(input.date, time, input.tz);
  const utc = local.toUTC();
  const jsDate = utc.toJSDate();
  const astroTime = MakeTime(jsDate);
  const nextDay = MakeTime(new Date(jsDate.getTime() + 86_400_000));

  const gastHours = SiderealTime(astroTime);
  const lstDeg = norm360(gastHours * 15 + input.lon);
  const obliquity = e_tilt(astroTime).tobl;

  const houses = timeUnknown
    ? null
    : calculateHouses({
        latitude: input.lat,
        localSiderealTimeDeg: lstDeg,
        obliquity,
        system: houseSystem,
      });

  const bodies: ChartPlanet[] = PLANETS.map(({ key, name, glyph, body }) => {
    const lon = tropicalLon(body, astroTime);
    const lonNext = tropicalLon(body, nextDay);
    let speed = lonNext - lon;
    if (speed > 180) speed -= 360;
    if (speed < -180) speed += 360;
    const meta = signMeta(lon);
    return {
      key,
      name,
      glyph,
      lon,
      speed,
      retrograde: speed < 0 && key !== 'sun' && key !== 'moon',
      sign: meta.sign,
      signGlyph: meta.signGlyph,
      house: houses ? houseOf(lon, houses.cusps) : null,
      lonInSign: meta.lonInSign,
    };
  });

  return {
    datetimeLocal: local.toISO() ?? `${input.date}T${time}`,
    datetimeUtc: utc.toISO() ?? '',
    tz: input.tz,
    lat: input.lat,
    lon: input.lon,
    placeLabel: input.placeLabel,
    timeUnknown,
    houseSystem,
    obliquity,
    lstDeg,
    jd: astroTime.ut + 2451545.0,
    bodies,
    ascendant: houses?.ascendant ?? null,
    mc: houses?.mc ?? null,
    ic: houses?.ic ?? null,
    descendant: houses?.descendant ?? null,
    cusps: houses?.cusps ?? null,
    aspects: buildAspects(bodies),
  };
}
