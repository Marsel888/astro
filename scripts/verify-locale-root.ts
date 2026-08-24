/**
 * Nothing above the locale segment may ask next-intl what language it is.
 *
 * There was a layout above `[locale]` that called `getLocale()` for the html
 * lang attribute. That resolves the request configuration before the locale
 * segment sets it, and next-intl caches the answer for the rest of the render —
 * so every page on the site rendered in English while its <title> stayed
 * translated. Nothing failed, nothing logged, and fifteen languages quietly
 * served the same page.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join('src', 'app');
const ASKS = /\b(getLocale|getTranslations|getMessages|useTranslations|useLocale)\s*\(/;

function outsideLocale(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === '[locale]' || name === 'api') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      out.push(...outsideLocale(path));
      continue;
    }
    if (/\.tsx?$/.test(name)) out.push(path);
  }
  return out;
}

let failed = 0;
const files = outsideLocale(ROOT);

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const hit = source.match(ASKS);
  if (!hit) continue;
  console.log(`  ${file} <<< FAIL — calls ${hit[1]}() outside the locale segment`);
  failed += 1;
}

// And the segment itself has to declare the locale it was given.
const layout = readFileSync(join(ROOT, '[locale]', 'layout.tsx'), 'utf8');
if (!/setRequestLocale\(locale\)/.test(layout)) {
  console.log('  src/app/[locale]/layout.tsx <<< FAIL — does not call setRequestLocale');
  failed += 1;
}
if (!/<html lang=\{locale\}/.test(layout)) {
  console.log('  src/app/[locale]/layout.tsx <<< FAIL — html lang is not the route locale');
  failed += 1;
}

console.log(`  ${files.length} file(s) outside the locale segment checked`);
console.log(
  failed === 0
    ? 'PASS — the locale comes from the route, not from a question.'
    : `FAIL — ${failed} problem(s).`,
);
process.exit(failed === 0 ? 0 : 1);
