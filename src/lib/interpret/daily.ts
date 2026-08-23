import { aspectsBetween, houseOf, type ChartAspect, type ChartPlanet, type ChartResult } from '@/lib/astro';
import { formatDayHeading } from '@/lib/dates';
import type { AppLocale } from '@/i18n/locales';
import type { ReportDoc, ReportSection } from './report';

const FAST = new Set(['sun', 'moon', 'mercury', 'venus', 'mars']);
const SLOW = new Set(['jupiter', 'saturn', 'uranus', 'neptune', 'pluto']);

export type DailyT = {
  (key: string, values?: Record<string, string | number>): string;
};

function natalHouse(natal: ChartResult, lon: number): number | null {
  if (!natal.cusps?.length || natal.timeUnknown) return null;
  return houseOf(lon, natal.cusps);
}

function keyOf(bodies: ChartPlanet[], name: string): string | undefined {
  return bodies.find((b) => b.name === name)?.key;
}

function astroKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

function splitTransits(crosses: ChartAspect[], transitBodies: ChartPlanet[]) {
  const daily: ChartAspect[] = [];
  const slower: ChartAspect[] = [];
  for (const row of crosses) {
    const key = keyOf(transitBodies, row.a);
    if (key && FAST.has(key)) daily.push(row);
    else if (key && SLOW.has(key)) slower.push(row);
  }
  return { daily: daily.slice(0, 8), slower: slower.slice(0, 6) };
}

function labelPlanet(t: DailyT, name: string): string {
  const key = astroKey(name);
  const translated = t(`planet_${key}`);
  return translated.startsWith('planet_') ? name : translated;
}

function labelSign(t: DailyT, sign: string): string {
  const key = astroKey(sign);
  const translated = t(`sign_${key}`);
  return translated.startsWith('sign_') ? sign : translated;
}

export function chartLabel(natal: ChartResult, t: DailyT): string {
  const sun = natal.bodies.find((b) => b.key === 'sun');
  const moon = natal.bodies.find((b) => b.key === 'moon');
  const bits = [
    sun ? t('sunBit', { sign: labelSign(t, sun.sign) }) : '',
    moon ? t('moonBit', { sign: labelSign(t, moon.sign) }) : '',
  ].filter(Boolean);
  return bits.join(' · ');
}

function labelAspect(t: DailyT, type: string): string {
  const translated = t(`aspect_${type}`);
  return translated.startsWith('aspect_') ? type : translated;
}

/**
 * One contact, composed from three parts that each vary.
 *
 * Keying the explanation on aspect type alone meant a fourteen-line reading used
 * five sentences, and Mars square Venus read word for word like Uranus square
 * Saturn. Naming what is being touched — and what that part of the chart is in
 * the reader's life — gives fifty shapes per transiting planet out of a handful
 * of strings, without writing five hundred texts per language.
 */
function contactLine(t: DailyT, row: ChartAspect): string {
  const natalKey = astroKey(row.b);
  return t('contactLine', {
    transit: labelPlanet(t, row.a),
    verb: t(`verb_${row.type}`),
    natalPoint: labelPlanet(t, row.b),
    natalMeaning: t(`natal_${natalKey}`),
    sense: t(`sense_${row.type}`),
    timing: row.applying ? t('timing_applying') : t('timing_separating'),
  });
}


function skyParagraphs(natal: ChartResult, transit: ChartResult, t: DailyT): string[] {
  const tSun = transit.bodies.find((b) => b.key === 'sun');
  const tMoon = transit.bodies.find((b) => b.key === 'moon');
  const nSun = natal.bodies.find((b) => b.key === 'sun');
  const nMoon = natal.bodies.find((b) => b.key === 'moon');
  const out: string[] = [];

  if (tSun && tMoon) {
    out.push(
      t('skyToday', {
        sun: labelSign(t, tSun.sign),
        moon: labelSign(t, tMoon.sign),
      }),
    );
  }

  if (tMoon) {
    const house = natalHouse(natal, tMoon.lon);
    if (house) {
      out.push(
        t('moonHouse', {
          house,
          houseLine: t(`house_${house}`),
        }),
      );
    } else {
      out.push(t('moonSign', { sign: labelSign(t, tMoon.sign) }));
    }
  }

  if (tSun && nSun && tSun.sign === nSun.sign) {
    out.push(t('sunSeason'));
  } else if (tMoon && nMoon && tMoon.sign === nMoon.sign) {
    out.push(t('moonReturn'));
  }

  return out;
}

/**
 * The single tightest contact of a day, as one line.
 *
 * Used for a look at tomorrow, so the cabinet gives a reason to come back rather
 * than only a record of today. Applying aspects win: those are the ones still
 * tightening, which is what makes them worth waiting for.
 */
export function strongestLine(
  natal: ChartResult,
  transit: ChartResult,
  t: DailyT,
): string | null {
  const crosses = aspectsBetween(transit.bodies, natal.bodies, 'synastry');
  if (!crosses.length) return null;
  const applying = crosses.filter((row) => row.applying).sort((a, b) => a.orb - b.orb);
  const row = applying[0] ?? crosses[0];
  return contactLine(t, row);
}

/**
 * The tightest contact of a day in a few words, for a list of days.
 *
 * A history that reads "23 Aug / 22 Aug / 21 Aug" gives no reason to open any
 * particular row. Naming what happened makes it scannable — and it is derived
 * from the stored transit positions rather than the stored text, so it follows
 * the reader's current language instead of the one the day was written in.
 */
export function shortContact(
  natal: ChartResult,
  transit: ChartResult,
  t: DailyT,
): string | null {
  const crosses = aspectsBetween(transit.bodies, natal.bodies, 'synastry');
  if (!crosses.length) return null;
  const applying = crosses.filter((row) => row.applying).sort((a, b) => a.orb - b.orb);
  const row = applying[0] ?? crosses[0];
  return t('shortContact', {
    transit: labelPlanet(t, row.a),
    verb: t(`verb_${row.type}`),
    natalPoint: labelPlanet(t, row.b),
  });
}

/** Shown inline. Anything past this is counted, not printed. */
const SHOW_DAILY = 4;
const SHOW_SLOW = 3;

export function dailyReport(
  natal: ChartResult,
  transit: ChartResult,
  isoDate: string,
  t: DailyT,
  locale: AppLocale = 'en',
): ReportDoc {
  const crosses = aspectsBetween(transit.bodies, natal.bodies, 'synastry');
  const { daily, slower } = splitTransits(crosses, transit.bodies);
  const heading = formatDayHeading(isoDate, natal.tz, locale);
  const sections: ReportSection[] = [];

  // Lead with the answer. The reading used to open on a technical description of
  // the sky, which buries the one thing the reader came for.
  const byOrb = [...daily].sort((a, b) => a.orb - b.orb);
  const tightest = byOrb[0];
  sections.push({
    heading: t('headingToday'),
    paragraphs: [tightest ? contactLine(t, tightest) : t('leadQuiet')],
  });

  const sky = skyParagraphs(natal, transit, t);
  if (sky.length) {
    sections.push({ heading: t('skyHeading'), paragraphs: sky });
  }

  // The lead already carried the tightest one; repeating it here was the whole
  // problem being fixed. Four more is enough to read — fourteen paragraphs of
  // the same shape is a wall, and the loose ones at the bottom carry little.
  const others = byOrb.slice(1);
  if (others.length) {
    const shown = others.slice(0, SHOW_DAILY);
    const rest = others.length - shown.length;
    sections.push({
      heading: t('playHeading'),
      paragraphs: [
        ...shown.map((row) => contactLine(t, row)),
        ...(rest > 0 ? [t('moreToday', { count: rest })] : []),
      ],
    });
  }

  if (slower.length) {
    const shown = slower.slice(0, SHOW_SLOW);
    const rest = slower.length - shown.length;
    sections.push({
      heading: t('longerHeading'),
      paragraphs: [
        t('longerLead'),
        ...shown.map((row) => contactLine(t, row)),
        ...(rest > 0 ? [t('moreLonger', { count: rest })] : []),
      ],
    });
  }

  if (!daily.length && !slower.length) {
    sections.push({
      heading: t('quietHeading'),
      paragraphs: [t('quietBody')],
    });
  }

  sections.push({
    heading: t('howHeading'),
    paragraphs: [t('howBody')],
  });

  const bits = [
    natal.bodies.find((b) => b.key === 'sun')
      ? t('sunBit', { sign: labelSign(t, natal.bodies.find((b) => b.key === 'sun')!.sign) })
      : '',
    natal.bodies.find((b) => b.key === 'moon')
      ? t('moonBit', { sign: labelSign(t, natal.bodies.find((b) => b.key === 'moon')!.sign) })
      : '',
  ].filter(Boolean);

  return {
    title: heading,
    kicker: t('kicker', {
      bits: bits.join(' · ') || t('natalFallback'),
      date: isoDate,
      place: natal.placeLabel ?? natal.tz,
    }),
    sections,
  };
}
