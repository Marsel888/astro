import type { ChartResult } from '@/lib/astro';
import { signOf, type SignName } from '@/lib/chart';
import { aspectReading } from './aspects';
import { HOUSES } from './houses';
import { packedHouse } from './packs';
import { natalParagraphs, placementReading, readingFor } from './copy';

export type ReportSection = {
  heading: string;
  paragraphs: string[];
};

export type ReportDoc = {
  title: string;
  kicker: string;
  sections: ReportSection[];
};

export function reportToText(doc: ReportDoc): string {
  const blocks = [`${doc.kicker}\n${doc.title}`, ...doc.sections.map((section) => [section.heading, ...section.paragraphs].join('\n\n'))];
  return `${blocks.join('\n\n')}\n`;
}

export function natalReport(chart: ChartResult, locale: string = 'en'): ReportDoc {
  const sun = chart.bodies.find((b) => b.key === 'sun');
  const moon = chart.bodies.find((b) => b.key === 'moon');
  const sunSign = sun?.sign as SignName | undefined;
  const moonSign = moon?.sign as SignName | undefined;
  const ascSign =
    chart.ascendant != null && !chart.timeUnknown ? signOf(chart.ascendant).n : null;

  const titleBits = [
    sunSign ? `${sunSign} Sun` : null,
    moonSign ? `${moonSign} Moon` : null,
    ascSign ? `${ascSign} rising` : null,
  ].filter(Boolean);

  const sections: ReportSection[] = [];

  if (sunSign && moonSign) {
    sections.push({
      heading: locale === 'uk' ? 'Велика трійка' : locale === 'ru' ? 'Большая тройка' : 'The Big Three',
      paragraphs: natalParagraphs({
        sun: sunSign,
        moon: moonSign,
        rising: ascSign,
        sunHouse: sun?.house ?? null,
        moonHouse: moon?.house ?? null,
        locale,
      }),
    });
  }

  for (const body of chart.bodies) {
    const paras = placementReading(body.key, body.sign as SignName, body.house, locale);
    if (!paras.length) continue;
    sections.push({
      heading: `${body.name} in ${body.sign}${body.house ? `, house ${body.house}` : ''}`,
      paragraphs: paras,
    });
  }

  if (ascSign) {
    sections.push({
      heading: `${ascSign} rising`,
      paragraphs: [readingFor('rising', ascSign, locale)],
    });
  }

  const occupied = new Set(chart.bodies.map((b) => b.house).filter((h): h is number => h != null));
  if (occupied.size) {
    sections.push({
      heading: locale === 'uk' ? 'Будинки в цій карті' : locale === 'ru' ? 'Дома в этой карте' : 'Houses in this chart',
      paragraphs: [...occupied]
        .sort((a, b) => a - b)
        .map((h) => packedHouse(h, locale) ?? HOUSES[h])
        .filter((p): p is string => Boolean(p)),
    });
  }

  if (chart.aspects.length) {
    sections.push({
      heading: locale === 'uk' ? 'Великі аспекти' : locale === 'ru' ? 'Большие аспекты' : 'Major aspects',
      paragraphs: chart.aspects.map((row) => aspectReading(row.a, row.b, row.type, locale)),
    });
  }

  return {
    title: titleBits.join(', ') || 'Natal chart',
    kicker: `${chart.placeLabel ?? 'Birth'} · ${chart.datetimeLocal.slice(0, 16)} · ${chart.tz} · tropical · ${chart.houseSystem}`,
    sections,
  };
}
