/**
 * Does the day actually change what the site says?
 *
 * Two layers claim to be daily. The public horoscope reads today's sky against a
 * Sun at 15° of each sign; the cabinet reads it against a real natal chart. Both
 * would look plausible while quietly returning the same text every morning — a
 * template that happens not to depend on the date reads exactly like one that
 * does, and nobody notices for weeks.
 *
 * So the same day is rendered across a week and the results are compared. A
 * natal chart is checked too, from the other direction: it must NOT move.
 */
import { buildDailyHoroscope } from '../src/lib/interpret/horoscope';
import { dailyReport } from '../src/lib/interpret/daily';
import { transitChartForDate } from '../src/lib/charts/daily';
import { calculateChart } from '../src/lib/astro';
import enMessages from '../src/messages/en.json';

const DAYS = 7;
const SIGNS = ['aries', 'leo', 'scorpio'] as const;

const iso = (offset: number) =>
  new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10);

const dates = Array.from({ length: DAYS }, (_, i) => iso(i));

/** The translator the report writer expects, wired straight to the English file. */
const t = ((key: string, values?: Record<string, string | number>) => {
  const raw = (enMessages.daily as Record<string, string>)[key] ?? key;
  return values
    ? Object.entries(values).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), raw)
    : raw;
}) as never;

let failed = 0;

console.log('== public horoscope, one line per day ==');
for (const sign of SIGNS) {
  const seen = new Map<string, string[]>();
  for (const date of dates) {
    const pack = buildDailyHoroscope('en', date);
    const row = pack.signs.find((s) => s.slug === sign);
    // The opening line is fixed per sign; the sky line and the aspect hits are
    // what the date is supposed to move.
    const text = JSON.stringify([pack.sky, row]);
    seen.set(text, [...(seen.get(text) ?? []), date]);
  }
  const distinct = seen.size;
  const bad = distinct < DAYS - 1;
  if (bad) failed += 1;
  console.log(
    `  ${sign.padEnd(9)} ${String(distinct).padStart(2)}/${DAYS} distinct ${
      bad ? '<<< FAIL — the day barely moves it' : 'ok'
    }`,
  );
  if (distinct < DAYS) {
    for (const [, days] of seen) {
      if (days.length > 1) console.log(`      identical on ${days.join(', ')}`);
    }
  }
}

console.log('\n== cabinet reading against a real natal chart ==');
const natal = calculateChart({
  date: '1994-03-12',
  time: '14:23',
  timeUnknown: false,
  lat: 38.7223,
  lon: -9.1393,
  tz: 'Europe/Lisbon',
});

const bodies = new Set<string>();
for (const date of dates) {
  const transit = transitChartForDate(natal, date);
  const doc = dailyReport(natal, transit, date, t, 'en');
  const body = JSON.stringify(doc);
  bodies.add(body);
  const moon = transit.bodies.find((b) => b.key === 'moon');
  console.log(`  ${date}  Moon ${moon?.sign ?? '—'} ${moon ? moon.lon.toFixed(1) : ''}°`);
}
const distinctDays = bodies.size;
if (distinctDays < DAYS) {
  console.log(`  <<< FAIL — only ${distinctDays} distinct readings across ${DAYS} days`);
  failed += 1;
} else {
  console.log(`  ${distinctDays}/${DAYS} distinct readings  ok`);
}

console.log('\n== the natal chart must NOT move ==');
const again = calculateChart({
  date: '1994-03-12',
  time: '14:23',
  timeUnknown: false,
  lat: 38.7223,
  lon: -9.1393,
  tz: 'Europe/Lisbon',
});
const stable = JSON.stringify(natal.bodies) === JSON.stringify(again.bodies);
console.log(`  same birth data, same positions: ${stable ? 'yes  ok' : 'NO <<< FAIL'}`);
if (!stable) failed += 1;

console.log(
  failed === 0
    ? '\nPASS — the day moves what it should and leaves the birth chart alone.'
    : `\nFAIL — ${failed} problem(s).`,
);
process.exit(failed === 0 ? 0 : 1);
