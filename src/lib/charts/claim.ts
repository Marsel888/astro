import { and, inArray, isNull } from 'drizzle-orm';
import { db } from '@/lib/db';
import { charts } from '@/lib/db/schema';
import { clearPendingIds, readPendingIds } from './pending';

export async function claimPendingCharts(userId: string) {
  if (!db) return 0;
  const ids = await readPendingIds();
  if (!ids.length) return 0;
  const updated = await db
    .update(charts)
    .set({ userId })
    .where(and(inArray(charts.id, ids), isNull(charts.userId)))
    .returning({ id: charts.id });
  await clearPendingIds();
  return updated.length;
}
