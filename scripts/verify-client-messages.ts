/**
 * Every namespace a client component asks for must be sent to the browser.
 *
 * The layout used to ship the whole dictionary, so this could not go wrong. It
 * ships a list now, and a missing entry is a runtime error on one page in one
 * language — the kind nobody finds until a reader does.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { CLIENT_NAMESPACES } from '../src/i18n/clientMessages';

/** Components that read the root translator, with the namespaces they touch. */
const ROOT_READERS: Record<string, string[]> = {
  'SiteHeader.tsx': ['brand', 'nav'],
  'SiteFooter.tsx': ['brand', 'nav', 'footer'],
};

/** Namespaces reached through a prop rather than a literal. */
const DYNAMIC: Record<string, string[]> = {
  'SignFocusCalculator.tsx': ['moon', 'venus', 'mercury', 'mars'],
  'TwoChartCalculator.tsx': ['synastry', 'composite'],
};

function clientFiles(dir: string): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      out.push(...clientFiles(path));
      continue;
    }
    if (!/\.tsx?$/.test(name)) continue;
    const source = readFileSync(path, 'utf8');
    if (/^['"]use client['"]/m.test(source)) out.push([name, source]);
  }
  return out;
}

const sent = new Set<string>(CLIENT_NAMESPACES);
const wanted = new Map<string, string>();
let unexplained = 0;

for (const [name, source] of clientFiles('src')) {
  for (const match of source.matchAll(/useTranslations\(\s*['"]([a-zA-Z]+)['"]/g)) {
    wanted.set(match[1]!, name);
  }
  for (const ns of ROOT_READERS[name] ?? []) wanted.set(ns, name);
  for (const ns of DYNAMIC[name] ?? []) wanted.set(ns, name);

  // A root or computed namespace this script does not know about could be
  // reaching for anything, so the list above has to be kept honest by hand.
  if (/useTranslations\(\s*\)/.test(source) && !ROOT_READERS[name]) {
    console.log(`  ${name} <<< FAIL — reads the root translator, not listed in ROOT_READERS`);
    unexplained += 1;
  }
  if (/useTranslations\(\s*[a-z]\w*\s*\)/.test(source) && !DYNAMIC[name]) {
    console.log(`  ${name} <<< FAIL — computed namespace, not listed in DYNAMIC`);
    unexplained += 1;
  }
}

let missing = 0;
for (const [ns, file] of [...wanted].sort()) {
  if (sent.has(ns)) continue;
  console.log(`  ${ns.padEnd(12)} <<< FAIL — used by ${file}, not sent to the client`);
  missing += 1;
}

const unused = [...sent].filter((ns) => !wanted.has(ns));
for (const ns of unused) console.log(`  ${ns.padEnd(12)} sent but nothing asks for it`);

console.log(`\n  ${wanted.size} namespace(s) wanted, ${sent.size} sent`);
console.log(
  missing + unexplained === 0
    ? 'PASS — the browser gets what it asks for.'
    : `FAIL — ${missing + unexplained} problem(s).`,
);
process.exit(missing + unexplained === 0 ? 0 : 1);
