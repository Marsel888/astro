import { and, asc, desc, eq, inArray, ne } from 'drizzle-orm';
import { db } from '@/lib/db';
import {
  account,
  charts,
  dailyReadings,
  reports,
  session,
  usageCounters,
  user,
} from '@/lib/db/schema';
import { asIsoDate } from '@/lib/dates';
import type { HouseSystem } from '@/lib/astro';
import { calculateChart } from '@/lib/astro';

export const HOUSE_SYSTEMS: HouseSystem[] = ['placidus', 'whole-sign'];

export function isHouseSystem(value: unknown): value is HouseSystem {
  return typeof value === 'string' && (HOUSE_SYSTEMS as string[]).includes(value);
}

/**
 * The chart the cabinet leads with. Falls back to the newest one so an account
 * created before the flag existed still opens on something.
 */
export async function primaryChartId(userId: string): Promise<string | null> {
  if (!db) return null;
  const rows = await db
    .select({ id: charts.id, isPrimary: charts.isPrimary })
    .from(charts)
    .where(eq(charts.userId, userId))
    .orderBy(desc(charts.isPrimary), desc(charts.createdAt));
  return rows[0]?.id ?? null;
}

export async function setPrimaryChart(userId: string, chartId: string): Promise<boolean> {
  if (!db) return false;
  const [owned] = await db
    .select({ id: charts.id })
    .from(charts)
    .where(and(eq(charts.id, chartId), eq(charts.userId, userId)))
    .limit(1);
  if (!owned) return false;

  await db
    .update(charts)
    .set({ isPrimary: false })
    .where(and(eq(charts.userId, userId), ne(charts.id, chartId)));
  await db.update(charts).set({ isPrimary: true }).where(eq(charts.id, chartId));
  return true;
}

/**
 * Switch a chart between Placidus and whole sign. The cached `computed` blob is
 * rebuilt, because every stored house placement and the wheel come from it.
 * Daily readings are dropped so they are rewritten against the new houses.
 */
export async function setChartHouseSystem(
  userId: string,
  chartId: string,
  system: HouseSystem,
): Promise<boolean> {
  if (!db) return false;
  const [row] = await db
    .select()
    .from(charts)
    .where(and(eq(charts.id, chartId), eq(charts.userId, userId)))
    .limit(1);
  if (!row) return false;
  if (row.houseSystem === system) return true;

  const computed = calculateChart({
    date: row.birthDate,
    time: row.birthTime ?? '12:00',
    timeUnknown: row.timeUnknown,
    lat: Number(row.lat),
    lon: Number(row.lon),
    tz: row.tzName,
    houseSystem: system,
    placeLabel: row.placeLabel ?? undefined,
  });

  await db.update(charts).set({ houseSystem: system, computed }).where(eq(charts.id, chartId));
  await db.delete(dailyReadings).where(eq(dailyReadings.chartId, chartId));
  await db.delete(reports).where(eq(reports.chartId, chartId));
  return true;
}

export type AccountExport = {
  exportedAt: string;
  account: { id: string; email: string; name: string | null; createdAt: string | null };
  charts: Array<{
    id: string;
    label: string | null;
    birthDate: string;
    birthTime: string | null;
    timeUnknown: boolean;
    place: { label: string | null; lat: number; lon: number; timezone: string };
    houseSystem: string;
    isPrimary: boolean;
    createdAt: string | null;
    computed: unknown;
    dailyReadings: Array<{ date: string; reading: unknown }>;
  }>;
};

/** Everything the account holds, in one JSON file. GDPR art. 20. */
export async function exportAccount(userId: string): Promise<AccountExport | null> {
  if (!db) return null;
  const [owner] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
  if (!owner) return null;

  const chartRows = await db
    .select()
    .from(charts)
    .where(eq(charts.userId, userId))
    .orderBy(desc(charts.createdAt));

  const chartIds = chartRows.map((row) => row.id);
  const readings = chartIds.length
    ? await db
        .select()
        .from(dailyReadings)
        .where(inArray(dailyReadings.chartId, chartIds))
        .orderBy(asc(dailyReadings.date))
    : [];

  const byChart = new Map<string, Array<{ date: string; reading: unknown }>>();
  for (const row of readings) {
    const list = byChart.get(row.chartId) ?? [];
    let reading: unknown = row.bodyMd;
    try {
      reading = JSON.parse(row.bodyMd);
    } catch {
      // Keep the raw string if it predates the JSON format.
    }
    list.push({ date: asIsoDate(row.date), reading });
    byChart.set(row.chartId, list);
  }

  return {
    exportedAt: new Date().toISOString(),
    account: {
      id: owner.id,
      email: owner.email,
      name: owner.name ?? null,
      createdAt: owner.createdAt?.toISOString() ?? null,
    },
    charts: chartRows.map((row) => ({
      id: row.id,
      label: row.label,
      birthDate: row.birthDate,
      birthTime: row.birthTime,
      timeUnknown: row.timeUnknown,
      place: {
        label: row.placeLabel,
        lat: Number(row.lat),
        lon: Number(row.lon),
        timezone: row.tzName,
      },
      houseSystem: row.houseSystem,
      isPrimary: row.isPrimary,
      createdAt: row.createdAt?.toISOString() ?? null,
      computed: row.computed,
      dailyReadings: byChart.get(row.id) ?? [],
    })),
  };
}

/**
 * Erase the account and everything attached to it. GDPR art. 17.
 *
 * `charts.userId` is ON DELETE SET NULL, so removing the user row alone would
 * leave the birth data behind as orphans. The charts go first and cascade into
 * their readings and reports.
 */
export async function deleteAccount(userId: string): Promise<boolean> {
  if (!db) return false;
  await db.delete(charts).where(eq(charts.userId, userId));
  await db.delete(usageCounters).where(eq(usageCounters.userId, userId));
  await db.delete(session).where(eq(session.userId, userId));
  await db.delete(account).where(eq(account.userId, userId));
  const removed = await db.delete(user).where(eq(user.id, userId)).returning({ id: user.id });
  return removed.length > 0;
}
