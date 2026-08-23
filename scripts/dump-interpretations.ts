import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { interpretationCatalog } from '../src/lib/interpret/catalog';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rows = interpretationCatalog();
const outDir = join(root, 'data');
const out = join(outDir, 'interpretations.en.json');

mkdirSync(outDir, { recursive: true });
writeFileSync(out, `${JSON.stringify(rows, null, 2)}\n`);

const byKind = rows.reduce<Record<string, number>>((acc, row) => {
  acc[row.kind] = (acc[row.kind] ?? 0) + 1;
  return acc;
}, {});

console.log(`wrote ${rows.length} rows → ${out}`);
for (const [kind, n] of Object.entries(byKind).sort()) {
  console.log(`  ${kind.padEnd(14)} ${n}`);
}
