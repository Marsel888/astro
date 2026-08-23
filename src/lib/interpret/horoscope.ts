import { calculateChart, type ChartPlanet, type ChartResult } from '@/lib/astro/calculate';
import { angularSep } from '@/lib/astro/math';
import { SIGNS, type SignName } from '@/lib/chart';
import { formatDayHeading, todayInZone } from '@/lib/dates';

export const HOROSCOPE_SLUGS = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
] as const;

export type HoroscopeSlug = (typeof HOROSCOPE_SLUGS)[number];

export const HOROSCOPE_PATH = '/daily-horoscope';

const ASPECTS = [
  { type: 'conjunction', angle: 0, moon: 8, other: 6 },
  { type: 'sextile', angle: 60, moon: 4, other: 3 },
  { type: 'square', angle: 90, moon: 6, other: 5 },
  { type: 'trine', angle: 120, moon: 6, other: 5 },
  { type: 'opposition', angle: 180, moon: 8, other: 6 },
] as const;

const TRANSIT_KEYS = ['moon', 'mercury', 'venus', 'mars'] as const;

export type HoroscopeHit = {
  planet: (typeof TRANSIT_KEYS)[number];
  type: (typeof ASPECTS)[number]['type'];
  applying: boolean;
  orb: number;
};

export type SignHoroscope = {
  sign: SignName;
  slug: HoroscopeSlug;
  sunInSign: boolean;
  moonInSign: boolean;
  hits: HoroscopeHit[];
};

export type DailyHoroscope = {
  isoDate: string;
  heading: string;
  sky: { sunSign: SignName; moonSign: SignName };
  transit: ChartResult;
  signs: SignHoroscope[];
};

export type HoroscopeT = {
  (key: string, values?: Record<string, string | number>): string;
};

export function isHoroscopeSlug(value: string): value is HoroscopeSlug {
  return (HOROSCOPE_SLUGS as readonly string[]).includes(value);
}

export function slugFromSign(sign: SignName): HoroscopeSlug {
  return sign.toLowerCase() as HoroscopeSlug;
}

export function signFromSlug(slug: string): SignName | null {
  if (!isHoroscopeSlug(slug)) return null;
  return SIGNS.find((s) => s.n.toLowerCase() === slug)?.n ?? null;
}

export function horoscopePaths(): string[] {
  return [HOROSCOPE_PATH, ...HOROSCOPE_SLUGS.map((slug) => `${HOROSCOPE_PATH}/${slug}`)];
}

export function natalSunLon(sign: SignName): number {
  const i = SIGNS.findIndex((s) => s.n === sign);
  return i * 30 + 15;
}

export function todaySkyChart(isoDate?: string): ChartResult {
  const date = isoDate ?? todayInZone('UTC');
  return calculateChart({
    date,
    time: '12:00',
    lat: 0,
    lon: 0,
    tz: 'UTC',
    timeUnknown: true,
    placeLabel: 'UTC noon',
  });
}

function hitsForSign(sky: ChartResult, sign: SignName, moonInSign: boolean): HoroscopeHit[] {
  const natalLon = natalSunLon(sign);
  const hits: HoroscopeHit[] = [];

  for (const key of TRANSIT_KEYS) {
    const planet = sky.bodies.find((body) => body.key === key);
    if (!planet) continue;
    const sep = angularSep(planet.lon, natalLon);
    for (const def of ASPECTS) {
      const max = key === 'moon' ? def.moon : def.other;
      const orb = Math.abs(sep - def.angle);
      if (orb > max) continue;
      if (key === 'moon' && moonInSign && def.type === 'conjunction') continue;
      const future = angularSep(planet.lon + planet.speed / 24, natalLon);
      hits.push({
        planet: key,
        type: def.type,
        applying: Math.abs(future - def.angle) < orb,
        orb,
      });
    }
  }

  return hits.sort((a, b) => a.orb - b.orb).slice(0, 4);
}

export function buildDailyHoroscope(locale: string, isoDate?: string): DailyHoroscope {
  const date = isoDate ?? todayInZone('UTC');
  const transit = todaySkyChart(date);
  const sun = transit.bodies.find((body) => body.key === 'sun');
  const moon = transit.bodies.find((body) => body.key === 'moon');
  const sunSign = (sun?.sign ?? 'Aries') as SignName;
  const moonSign = (moon?.sign ?? 'Aries') as SignName;

  return {
    isoDate: date,
    heading: formatDayHeading(date, 'UTC', locale),
    sky: { sunSign, moonSign },
    transit,
    signs: SIGNS.map((row) => {
      const moonInSign = moonSign === row.n;
      return {
        sign: row.n,
        slug: slugFromSign(row.n),
        sunInSign: sunSign === row.n,
        moonInSign,
        hits: hitsForSign(transit, row.n, moonInSign),
      };
    }),
  };
}

export function horoscopeParagraphs(
  reading: SignHoroscope,
  sky: DailyHoroscope['sky'],
  t: HoroscopeT,
  signLabel: (sign: SignName) => string,
): string[] {
  const out = [t(`open_${reading.slug}`)];
  out.push(
    t('skyLine', {
        sun: signLabel(sky.sunSign),
        moon: signLabel(sky.moonSign),
      }),
  );
  if (reading.sunInSign) out.push(t('sunSeason'));
  if (reading.moonInSign) out.push(t('moonInSign'));
  for (const hit of reading.hits) {
    out.push(
      t(`hit_${hit.planet}_${hit.type}`, {
        motion: hit.applying ? t('applying') : t('separating'),
      }),
    );
  }
  if (!reading.hits.length && !reading.sunInSign && !reading.moonInSign) {
    out.push(t('quiet'));
  }
  out.push(t('close'));
  return out;
}

/** @deprecated synthetic planet kept for tests / future aspectarian reuse */
export function proxySunPlanet(sign: SignName): ChartPlanet {
  const i = SIGNS.findIndex((s) => s.n === sign);
  const meta = SIGNS[i] ?? SIGNS[0];
  return {
    key: 'sun',
    name: 'Sun',
    glyph: '☉',
    lon: natalSunLon(sign),
    speed: 0,
    retrograde: false,
    sign: meta.n,
    signGlyph: meta.g,
    house: null,
    lonInSign: 15,
  };
}
