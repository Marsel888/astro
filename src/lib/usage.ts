import { sql } from 'drizzle-orm';
import { DateTime } from 'luxon';
import { db } from '@/lib/db';
import { usageCounters } from '@/lib/db/schema';

export type UsageField = 'chartsSaved' | 'synastryRuns' | 'reportsGenerated';

export async function bumpUsage(userId: string, field: UsageField) {
  if (!db) return;
  const period = DateTime.utc().toFormat('yyyy-MM');
  const increment = {
    chartsSaved: sql`${usageCounters.chartsSaved} + 1`,
    synastryRuns: sql`${usageCounters.synastryRuns} + 1`,
    reportsGenerated: sql`${usageCounters.reportsGenerated} + 1`,
  }[field];

  await db
    .insert(usageCounters)
    .values({
      userId,
      period,
      chartsSaved: field === 'chartsSaved' ? 1 : 0,
      synastryRuns: field === 'synastryRuns' ? 1 : 0,
      reportsGenerated: field === 'reportsGenerated' ? 1 : 0,
    })
    .onConflictDoUpdate({
      target: [usageCounters.userId, usageCounters.period],
      set: { [field]: increment },
    });
}
