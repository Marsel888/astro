/**
 * Translation coverage per locale, measured against en.json.
 *
 * A key counts as translated only if it exists in the locale file AND differs
 * from English — `src/i18n/request.ts` deep-merges over English, so a missing key
 * silently renders as English rather than failing.
 *
 * Fails the process if a locale marked `published` in src/i18n/locales.ts is
 * below the threshold, so a half-translated locale can never reach the index.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES } from '../src/i18n/locales';

const DIR = join(process.cwd(), 'src', 'messages');
const PUBLISH_THRESHOLD = 92;

type Flat = Record<string, string>;

function flatten(value: unknown, prefix = '', out: Flat = {}): Flat {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [k, v] of Object.entries(value)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out[prefix] = String(value);
  }
  return out;
}

const load = (id: string) => flatten(JSON.parse(readFileSync(join(DIR, `${id}.json`), 'utf8')));

const en = load('en');
const enKeys = Object.keys(en);
const published = new Set<string>(LOCALES.filter((l) => l.published).map((l) => l.id));

console.log(`en.json — ${enKeys.length} keys\n`);
console.log('locale   state      translated   missing   same-as-en');
console.log('─'.repeat(58));

let failed = 0;

for (const file of readdirSync(DIR).sort()) {
  const id = file.replace(/\.json$/, '');
  if (id === 'en') continue;
  const messages = load(id);
  const missing = enKeys.filter((k) => !(k in messages));
  const same = enKeys.filter((k) => k in messages && messages[k] === en[k]);
  const translated = enKeys.length - missing.length - same.length;
  const pct = (translated / enKeys.length) * 100;
  const state = published.has(id) ? 'published' : 'draft';
  const flag = published.has(id) && pct < PUBLISH_THRESHOLD ? '  <<< BELOW THRESHOLD' : '';
  if (flag) failed += 1;
  console.log(
    `${id.padEnd(8)} ${state.padEnd(10)} ${`${pct.toFixed(1)}%`.padStart(10)} ${String(missing.length).padStart(9)} ${String(same.length).padStart(12)}${flag}`,
  );
}

console.log(
  failed === 0
    ? `\nPASS — every published locale is at or above ${PUBLISH_THRESHOLD}%.`
    : `\nFAIL — ${failed} published locale(s) below ${PUBLISH_THRESHOLD}%. Translate them or set published: false.`,
);
process.exit(failed === 0 ? 0 : 1);
