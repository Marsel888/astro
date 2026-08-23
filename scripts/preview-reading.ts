/** Prints the daily reading the way the cabinet renders it, for eyeballing copy. */
import { readFileSync } from 'node:fs';
import { calculateChart } from '../src/lib/astro';
import { dailyReport, type DailyT } from '../src/lib/interpret/daily';

const locale = (process.argv[2] ?? 'en') as 'en' | 'uk' | 'ru';
const messages = JSON.parse(readFileSync(`src/messages/${locale}.json`, 'utf8'));
const en = JSON.parse(readFileSync('src/messages/en.json', 'utf8'));

const t: DailyT = (key, values) => {
  const raw = messages.daily?.[key] ?? en.daily?.[key] ?? key;
  return String(raw).replace(/\{(\w+)\}/g, (_, k) => String(values?.[k] ?? `{${k}}`));
};

const natal = calculateChart({
  date: '1994-03-12', time: '14:23', lat: 38.7223, lon: -9.1393, tz: 'Europe/Lisbon',
  placeLabel: 'Lisbon',
});
const transit = calculateChart({
  date: '2026-08-23', time: '12:00', lat: natal.lat, lon: natal.lon, tz: natal.tz,
});

const doc = dailyReport(natal, transit, '2026-08-23', t, locale);
console.log(`${doc.kicker}\n${doc.title}\n`);
for (const section of doc.sections) {
  console.log(`── ${section.heading}`);
  for (const p of section.paragraphs) console.log(`   ${p}\n`);
}

const bodies = doc.sections.flatMap((s) => s.paragraphs);
const unique = new Set(bodies);
console.log(`paragraphs ${bodies.length} · distinct ${unique.size}`);
