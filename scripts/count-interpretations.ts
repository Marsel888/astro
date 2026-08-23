import { interpretationCatalog } from '../src/lib/interpret/catalog';

const rows = interpretationCatalog();
const byKind = rows.reduce<Record<string, number>>((acc, row) => {
  acc[row.kind] = (acc[row.kind] ?? 0) + 1;
  return acc;
}, {});

console.log(`interpretation catalog: ${rows.length} rows`);
for (const [kind, n] of Object.entries(byKind).sort()) {
  console.log(`  ${kind.padEnd(14)} ${n}`);
}
