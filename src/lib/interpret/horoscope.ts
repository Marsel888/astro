import { calculateChart, type ChartPlanet, type ChartResult } from '@/lib/astro/calculate';
import { angularSep, norm360 } from '@/lib/astro/math';
import { SIGNS, type SignName } from '@/lib/chart';
import { formatBirthDate, formatDayHeading, isIsoDate, todayInZone } from '@/lib/dates';

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
  { type: 'conjunction', angle: 0, moon: 8, other: 6, slow: 3 },
  { type: 'sextile', angle: 60, moon: 4, other: 3, slow: 2 },
  { type: 'square', angle: 90, moon: 6, other: 5, slow: 2.5 },
  { type: 'trine', angle: 120, moon: 6, other: 5, slow: 2.5 },
  { type: 'opposition', angle: 180, moon: 8, other: 6, slow: 3 },
] as const;

const FAST_KEYS = ['moon', 'mercury', 'venus', 'mars'] as const;
const SLOW_KEYS = ['jupiter', 'saturn'] as const;
const NATAL_INNER = ['mercury', 'venus', 'mars'] as const;

export type MoonPhase = 'new' | 'waxing' | 'full' | 'waning';
export type SignElement = 'fire' | 'earth' | 'air' | 'water';

export type HoroscopeHit = {
  planet: (typeof FAST_KEYS)[number] | (typeof SLOW_KEYS)[number];
  target: 'sun' | 'mercury' | 'venus' | 'mars';
  type: (typeof ASPECTS)[number]['type'];
  applying: boolean;
  orb: number;
  slow: boolean;
};

export type SkySnapshot = {
  sunSign: SignName;
  moonSign: SignName;
  mercurySign: SignName;
  venusSign: SignName;
  marsSign: SignName;
  jupiterSign: SignName;
  saturnSign: SignName;
  mercuryRx: boolean;
  venusRx: boolean;
  marsRx: boolean;
  moonPhase: MoonPhase;
};

export type NatalSnapshot = {
  birthDate: string;
  sunSign: SignName;
  sunDegree: string;
  moonSign: SignName;
  mercurySign: SignName;
  venusSign: SignName;
  marsSign: SignName;
};

export type SignHoroscope = {
  sign: SignName;
  slug: HoroscopeSlug;
  sunInSign: boolean;
  moonInSign: boolean;
  jupiterInSign: boolean;
  saturnInSign: boolean;
  hits: HoroscopeHit[];
  personal: boolean;
  natal?: NatalSnapshot;
};

export type DailyHoroscope = {
  isoDate: string;
  heading: string;
  sky: SkySnapshot;
  transit: ChartResult;
  signs: SignHoroscope[];
  natal?: NatalSnapshot;
};

export type HoroscopeT = {
  (key: string, values?: Record<string, string | number>): string;
};

export type HoroscopeSection = {
  heading: string;
  paragraphs: string[];
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

export function withBorn(path: string, born?: string): string {
  return born ? `${path}?born=${born}` : path;
}

export function parseHoroscopeBorn(raw: string | undefined | null): string | undefined {
  if (!raw || !isIsoDate(raw)) return undefined;
  if (raw < '1800-01-01') return undefined;
  if (raw > todayInZone('UTC')) return undefined;
  return raw;
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

export function slugForBirthDate(isoDate: string): HoroscopeSlug {
  const natal = natalFromBirthDate(isoDate);
  const sun = natal.bodies.find((body) => body.key === 'sun');
  return slugFromSign((sun?.sign ?? 'Aries') as SignName);
}

export function natalFromBirthDate(isoDate: string): ChartResult {
  return calculateChart({
    date: isoDate,
    time: '12:00',
    lat: 0,
    lon: 0,
    tz: 'UTC',
    timeUnknown: true,
    placeLabel: 'noon UTC (date only)',
  });
}

function bodyOf(chart: ChartResult, key: string): ChartPlanet | undefined {
  return chart.bodies.find((body) => body.key === key);
}

function bodySign(chart: ChartResult, key: string): SignName {
  return (bodyOf(chart, key)?.sign ?? 'Aries') as SignName;
}

export function moonPhaseOf(sunLon: number, moonLon: number): MoonPhase {
  const elong = norm360(moonLon - sunLon);
  if (elong < 20 || elong >= 340) return 'new';
  if (elong < 160) return 'waxing';
  if (elong < 200) return 'full';
  return 'waning';
}

export function skySnapshot(transit: ChartResult): SkySnapshot {
  const sun = bodyOf(transit, 'sun');
  const moon = bodyOf(transit, 'moon');
  return {
    sunSign: bodySign(transit, 'sun'),
    moonSign: bodySign(transit, 'moon'),
    mercurySign: bodySign(transit, 'mercury'),
    venusSign: bodySign(transit, 'venus'),
    marsSign: bodySign(transit, 'mars'),
    jupiterSign: bodySign(transit, 'jupiter'),
    saturnSign: bodySign(transit, 'saturn'),
    mercuryRx: Boolean(bodyOf(transit, 'mercury')?.retrograde),
    venusRx: Boolean(bodyOf(transit, 'venus')?.retrograde),
    marsRx: Boolean(bodyOf(transit, 'mars')?.retrograde),
    moonPhase: moonPhaseOf(sun?.lon ?? 0, moon?.lon ?? 0),
  };
}

function degreeLabel(planet: ChartPlanet | undefined): string {
  if (!planet) return '15°';
  return `${Math.floor(planet.lonInSign + 1e-9)}°`;
}

function natalSnapshot(natal: ChartResult, birthDate: string): NatalSnapshot {
  return {
    birthDate,
    sunSign: bodySign(natal, 'sun'),
    sunDegree: degreeLabel(bodyOf(natal, 'sun')),
    moonSign: bodySign(natal, 'moon'),
    mercurySign: bodySign(natal, 'mercury'),
    venusSign: bodySign(natal, 'venus'),
    marsSign: bodySign(natal, 'mars'),
  };
}

function hitsToLon(
  sky: ChartResult,
  natalLon: number,
  target: HoroscopeHit['target'],
  opts: { skipMoonConjunction?: boolean },
): HoroscopeHit[] {
  const hits: HoroscopeHit[] = [];
  const keys = [...FAST_KEYS, ...SLOW_KEYS];

  for (const key of keys) {
    const planet = bodyOf(sky, key);
    if (!planet) continue;
    const slow = (SLOW_KEYS as readonly string[]).includes(key);
    const sep = angularSep(planet.lon, natalLon);
    for (const def of ASPECTS) {
      const moonMax = target === 'sun' ? def.moon : def.moon * 0.5;
      const max = slow ? def.slow : key === 'moon' ? moonMax : def.other;
      const orb = Math.abs(sep - def.angle);
      if (orb > max) continue;
      if (key === 'moon' && opts.skipMoonConjunction && def.type === 'conjunction') continue;
      const future = angularSep(planet.lon + planet.speed / 24, natalLon);
      hits.push({
        planet: key,
        target,
        type: def.type,
        applying: Math.abs(future - def.angle) < orb,
        orb,
        slow,
      });
    }
  }

  return hits;
}

function uniqueHits(hits: HoroscopeHit[], limit: number): HoroscopeHit[] {
  const seen = new Set<string>();
  const out: HoroscopeHit[] = [];
  const sorted = [...hits].sort((a, b) => {
    if (a.target === 'sun' && b.target !== 'sun') return -1;
    if (b.target === 'sun' && a.target !== 'sun') return 1;
    return a.orb - b.orb;
  });
  for (const hit of sorted) {
    const id = `${hit.planet}-${hit.type}-${hit.target}`;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(hit);
    if (out.length >= limit) break;
  }
  return out;
}

export function buildDailyHoroscope(locale: string, isoDate?: string, birthDate?: string): DailyHoroscope {
  const date = isoDate ?? todayInZone('UTC');
  const transit = todaySkyChart(date);
  const sky = skySnapshot(transit);
  const natalChart = birthDate ? natalFromBirthDate(birthDate) : null;
  const natal = natalChart && birthDate ? natalSnapshot(natalChart, birthDate) : undefined;

  return {
    isoDate: date,
    heading: formatDayHeading(date, 'UTC', locale),
    sky,
    transit,
    natal,
    signs: SIGNS.map((row) => {
      const moonInSign = sky.moonSign === row.n;
      const personal = Boolean(natal && natal.sunSign === row.n);
      const sunLon =
        personal && natalChart ? (bodyOf(natalChart, 'sun')?.lon ?? natalSunLon(row.n)) : natalSunLon(row.n);

      const hits: HoroscopeHit[] = [
        ...hitsToLon(transit, sunLon, 'sun', { skipMoonConjunction: moonInSign }),
      ];

      if (personal && natalChart) {
        for (const key of NATAL_INNER) {
          const body = bodyOf(natalChart, key);
          if (!body) continue;
          hits.push(...hitsToLon(transit, body.lon, key, {}));
        }
      }

      return {
        sign: row.n,
        slug: slugFromSign(row.n),
        sunInSign: sky.sunSign === row.n,
        moonInSign,
        jupiterInSign: sky.jupiterSign === row.n,
        saturnInSign: sky.saturnSign === row.n,
        hits: [
          ...uniqueHits(
            hits.filter((hit) => !hit.slow),
            6,
          ),
          ...uniqueHits(
            hits.filter((hit) => hit.slow),
            3,
          ),
        ],
        personal,
        natal: personal ? natal : undefined,
      };
    }),
  };
}

function elementOf(sign: SignName): SignElement {
  return (SIGNS.find((row) => row.n === sign)?.el ?? 'fire') as SignElement;
}

function motionLabel(hit: HoroscopeHit, t: HoroscopeT): string {
  return hit.applying ? t('applying') : t('separating');
}

function hitParagraph(hit: HoroscopeHit, t: HoroscopeT, dailyT: HoroscopeT): string {
  const motion = motionLabel(hit, t);
  if (hit.target === 'sun' && !hit.slow) {
    return t(`hit_${hit.planet}_${hit.type}`, { motion });
  }
  const values = {
    planet: dailyT(`planet_${hit.planet}`),
    aspect: dailyT(`aspect_${hit.type}`),
    target: dailyT(`planet_${hit.target}`),
    sense: dailyT(`sense_${hit.type}`),
    motion,
  };
  if (hit.target === 'sun') return t('hitSlow', values);
  return t('hitNatal', values);
}

export function horoscopeSections(
  reading: SignHoroscope,
  pack: DailyHoroscope,
  t: HoroscopeT,
  dailyT: HoroscopeT,
  signLabel: (sign: SignName) => string,
  locale: string,
): HoroscopeSection[] {
  const skyParas = [t(`open_${reading.slug}`)];
  skyParas.push(
    t('skyToday', {
      sun: signLabel(pack.sky.sunSign),
      moon: signLabel(pack.sky.moonSign),
      mercury: signLabel(pack.sky.mercurySign),
      venus: signLabel(pack.sky.venusSign),
      mars: signLabel(pack.sky.marsSign),
    }),
  );
  skyParas.push(t(`phase_${pack.sky.moonPhase}`));
  if (pack.sky.mercuryRx) skyParas.push(t('rx_mercury'));
  if (pack.sky.venusRx) skyParas.push(t('rx_venus'));
  if (pack.sky.marsRx) skyParas.push(t('rx_mars'));

  const natal = reading.natal ?? (pack.natal && reading.personal ? pack.natal : undefined);
  if (natal) {
    skyParas.push(
      t('natalSnapshot', {
        date: formatBirthDate(natal.birthDate, locale),
        sun: signLabel(natal.sunSign),
        deg: natal.sunDegree,
        moon: signLabel(natal.moonSign),
        mercury: signLabel(natal.mercurySign),
        venus: signLabel(natal.venusSign),
        mars: signLabel(natal.marsSign),
      }),
    );
    skyParas.push(t('natalMoonNote'));
  }

  if (reading.sunInSign) skyParas.push(t('sunSeason'));
  if (reading.moonInSign) skyParas.push(t('moonInSign'));
  if (reading.jupiterInSign) skyParas.push(t('jupiterInSign'));
  if (reading.saturnInSign) skyParas.push(t('saturnInSign'));

  const sunElement = elementOf(pack.sky.sunSign);
  const signElement = elementOf(reading.sign);
  if (sunElement === signElement && !reading.sunInSign) {
    skyParas.push(t(`element_${signElement}`));
  }

  const fast = reading.hits.filter((hit) => !hit.slow);
  const slow = reading.hits.filter((hit) => hit.slow);
  const playParas = fast.map((hit) => hitParagraph(hit, t, dailyT));
  const longerParas = [
    t('longerLead', {
      jupiter: signLabel(pack.sky.jupiterSign),
      saturn: signLabel(pack.sky.saturnSign),
    }),
    ...slow.map((hit) => hitParagraph(hit, t, dailyT)),
  ];

  const sections: HoroscopeSection[] = [{ heading: t('skyHeading'), paragraphs: skyParas }];
  if (playParas.length) {
    sections.push({ heading: t('playHeading'), paragraphs: playParas });
  } else if (!reading.sunInSign && !reading.moonInSign) {
    sections.push({ heading: t('quietHeading'), paragraphs: [t('quiet')] });
  }
  sections.push({ heading: t('longerHeading'), paragraphs: longerParas });
  sections.push({
    heading: t('howHeading'),
    paragraphs: [reading.personal ? t('closePersonal') : t('close')],
  });
  return sections;
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
  for (const hit of reading.hits.filter((row) => row.target === 'sun' && !row.slow).slice(0, 2)) {
    out.push(t(`hit_${hit.planet}_${hit.type}`, { motion: motionLabel(hit, t) }));
  }
  if (!reading.hits.length && !reading.sunInSign && !reading.moonInSign) {
    out.push(t('quiet'));
  }
  return out;
}

export function horoscopeTeaser(
  reading: SignHoroscope,
  t: HoroscopeT,
): string[] {
  const out = [t(`open_${reading.slug}`)];
  const first = reading.hits.find((hit) => hit.target === 'sun' && !hit.slow);
  if (first) {
    out.push(t(`hit_${first.planet}_${first.type}`, { motion: motionLabel(first, t) }));
  } else if (reading.sunInSign) {
    out.push(t('sunSeason'));
  } else if (reading.moonInSign) {
    out.push(t('moonInSign'));
  }
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
