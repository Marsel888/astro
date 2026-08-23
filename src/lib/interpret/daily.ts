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

function aspectLine(t: DailyT, row: ChartAspect): string {
  const applying = row.applying ? t('applying') : t('separating');
  return t('aspectLine', {
    a: labelPlanet(t, row.a),
    type: labelAspect(t, row.type),
    b: labelPlanet(t, row.b),
    sense: t(`sense_${row.type}`),
    applying,
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
  return aspectLine(t, row);
}

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

  const sky = skyParagraphs(natal, transit, t);
  if (sky.length) {
    sections.push({ heading: t('skyHeading'), paragraphs: sky });
  }

  if (daily.length) {
    sections.push({
      heading: t('playHeading'),
      paragraphs: daily.map((row) => aspectLine(t, row)),
    });
  }

  if (slower.length) {
    sections.push({
      heading: t('longerHeading'),
      paragraphs: [t('longerLead'), ...slower.map((row) => aspectLine(t, row))],
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
