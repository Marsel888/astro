import { interpretationCatalog } from '../src/lib/interpret/catalog';
import { db } from '../src/lib/db';
import { interpretations } from '../src/lib/db/schema';

async function main() {
  if (!db) {
    console.error('DATABASE_URL is not set. Run `npm run interpret:dump` and start Postgres first.');
    process.exit(1);
  }

  const rows = interpretationCatalog().map((row) => ({
    kind: row.kind,
    key: row.key,
    locale: row.locale,
    title: row.title,
    bodyMd: row.body,
    model: 'handwritten',
    tokensUsed: null,
    version: 1,
  }));

  await db.insert(interpretations).values(rows).onConflictDoNothing();
  console.log(`seeded ${rows.length} interpretation rows (existing keys skipped)`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
