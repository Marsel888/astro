import { transitChartForDate } from '@/lib/astro/transits';
import { and, desc, eq, lte } from 'drizzle-orm';
import { getTranslations } from 'next-intl/server';
import { calculateChart, type ChartResult, type HouseSystem } from '@/lib/astro';
import { db } from '@/lib/db';
import { charts, dailyReadings } from '@/lib/db/schema';
import type { AppLocale } from '@/i18n/locales';
import { addDaysIso, asIsoDate, eachIsoDate, isIsoDate, isoDateInZone, maxIsoDate, todayInZone } from '@/lib/dates';
import { dailyReport, shortContact, strongestLine, type DailyT } from '@/lib/interpret/daily';
import type { ReportDoc } from '@/lib/interpret/report';
import { loadOwnedChart } from './report';

type ChartRow = typeof charts.$inferSelect;

const HISTORY_DAYS = 90;

export function natalFromRow(row: ChartRow): ChartResult {
  const computed = row.computed as ChartResult;
  if (computed?.bodies?.length) return computed;
  return calculateChart({
    date: row.birthDate,
    time: row.birthTime ?? '12:00',
    timeUnknown: row.timeUnknown,
    lat: Number(row.lat),
    lon: Number(row.lon),
    tz: row.tzName,
    houseSystem: (row.houseSystem as HouseSystem) || 'placidus',
    placeLabel: row.placeLabel ?? undefined,
  });
}

export { transitChartForDate };



export function parseReportDoc(raw: string): ReportDoc | null {
  try {
    const doc = JSON.parse(raw) as ReportDoc;
    if (!doc?.title || !Array.isArray(doc.sections)) return null;
    return doc;
  } catch {
    return null;
  }
}

async function dailyT(locale: AppLocale): Promise<DailyT> {
  const t = await getTranslations({ locale, namespace: 'daily' });
  return (key, values) => t(key as never, values as never);
}

export async function dailyTranslator(locale: AppLocale): Promise<DailyT> {
  return dailyT(locale);
}

function historyStart(natal: ChartResult, createdAt: Date, today: string): string {
  const created = isoDateInZone(createdAt, natal.tz);
  const floor = addDaysIso(today, -(HISTORY_DAYS - 1));
  return maxIsoDate(created, floor);
}

/**
 * A one-line look at tomorrow's sky against this chart.
 *
 * Nothing is stored: tomorrow's reading is written when tomorrow arrives, so
 * this is a peek, not a pre-generated entry.
 */
export async function tomorrowPreview(natal: ChartResult, locale: AppLocale) {
  const date = addDaysIso(todayInZone(natal.tz), 1);
  const t = await dailyT(locale);
  const line = strongestLine(natal, transitChartForDate(natal, date), t);
  return { date, line };
}

export type DaySummary = {
  id: string;
  date: string;
  headline: string | null;
};

/**
 * A list of days, each with the day's tightest contact in a few words.
 *
 * Built from the transit positions already stored on the row, so it costs an
 * aspect scan rather than a chart calculation, and it renders in whatever
 * language the reader is using now.
 */
export async function summariseDays(
  natal: ChartResult,
  rows: Array<{ id: string; date: string; transits: unknown }>,
  locale: AppLocale,
): Promise<DaySummary[]> {
  const t = await dailyT(locale);
  return rows.map((row) => {
    const transit = (row.transits as ChartResult | null)?.bodies?.length
      ? (row.transits as ChartResult)
      : null;
    return {
      id: row.id,
      date: row.date,
      headline: transit ? shortContact(natal, transit, t) : null,
    };
  });
}

export async function localizedDailyDoc(
  natal: ChartResult,
  transits: unknown,
  date: string,
  locale: AppLocale,
): Promise<ReportDoc> {
  const t = await dailyT(locale);
  const transit =
    (transits as ChartResult | null)?.bodies?.length ? (transits as ChartResult) : transitChartForDate(natal, date);
  return dailyReport(natal, transit, date, t, locale);
}

export async function listUserCharts(userId: string) {
  if (!db) return [];
  return db
    .select()
    .from(charts)
    .where(eq(charts.userId, userId))
    .orderBy(desc(charts.createdAt));
}

export async function listDailyReadings(chartId: string, userId: string) {
  if (!db) return [];
  const chart = await loadOwnedChart(chartId, userId);
  if (!chart) return [];
  const natal = natalFromRow(chart);
  const today = todayInZone(natal.tz);
  return db
    .select({
      id: dailyReadings.id,
      date: dailyReadings.date,
      bodyMd: dailyReadings.bodyMd,
      transits: dailyReadings.transits,
    })
    .from(dailyReadings)
    .where(and(eq(dailyReadings.chartId, chartId), lte(dailyReadings.date, today)))
    .orderBy(desc(dailyReadings.date))
    .then((rows) => rows.map((row) => ({ ...row, date: asIsoDate(row.date) })));
}

async function writeReading(
  chartId: string,
  natal: ChartResult,
  date: string,
  locale: AppLocale,
  existingTransit?: ChartResult | null,
) {
  if (!db) return null;
  const t = await dailyT(locale);
  const transit = existingTransit?.bodies?.length ? existingTransit : transitChartForDate(natal, date);
  const doc = dailyReport(natal, transit, date, t, locale);
  const [inserted] = await db
    .insert(dailyReadings)
    .values({
      chartId,
      date,
      transits: transit,
      bodyMd: JSON.stringify(doc),
    })
    .onConflictDoNothing()
    .returning();
  return { transit, doc, inserted };
}

export async function ensureDailyHistory(chartId: string, userId: string, locale: AppLocale) {
  if (!db) return [];
  const chart = await loadOwnedChart(chartId, userId);
  if (!chart) return [];

  const natal = natalFromRow(chart);
  const today = todayInZone(natal.tz);
  const from = historyStart(natal, chart.createdAt, today);
  const dates = eachIsoDate(from, today);
  if (!dates.length) return [];

  const existing = await db
    .select({ date: dailyReadings.date })
    .from(dailyReadings)
    .where(and(eq(dailyReadings.chartId, chartId), lte(dailyReadings.date, today)));
  const have = new Set(existing.map((row) => asIsoDate(row.date)));
  const missing = dates.filter((date) => !have.has(date));

  for (let i = 0; i < missing.length; i += 5) {
    await Promise.all(missing.slice(i, i + 5).map((date) => writeReading(chartId, natal, date, locale)));
  }

  return listDailyReadings(chartId, userId);
}

export async function getOrCreateDailyReading(
  chartId: string,
  userId: string,
  locale: AppLocale,
  isoDate?: string,
) {
  if (!db) return null;
  const chart = await loadOwnedChart(chartId, userId);
  if (!chart) return null;

  const natal = natalFromRow(chart);
  const today = todayInZone(natal.tz);
  const date = isoDate && isIsoDate(isoDate) ? isoDate : today;
  if (date > today) return null;

  const t = await dailyT(locale);
  const [existing] = await db
    .select()
    .from(dailyReadings)
    .where(and(eq(dailyReadings.chartId, chartId), eq(dailyReadings.date, date)))
    .limit(1);

  if (existing) {
    const transit = (existing.transits as ChartResult | null)?.bodies?.length
      ? (existing.transits as ChartResult)
      : transitChartForDate(natal, date);
    const doc = dailyReport(natal, transit, date, t, locale);
    return { chart, natal, date: asIsoDate(existing.date), today, doc, created: false as const };
  }

  const written = await writeReading(chartId, natal, date, locale);
  if (!written) return null;
  if (!written.inserted) {
    const [again] = await db
      .select()
      .from(dailyReadings)
      .where(and(eq(dailyReadings.chartId, chartId), eq(dailyReadings.date, date)))
      .limit(1);
    const transit = (again?.transits as ChartResult | null)?.bodies?.length
      ? (again!.transits as ChartResult)
      : written.transit;
    return { chart, natal, date, today, doc: dailyReport(natal, transit, date, t, locale), created: false as const };
  }

  return { chart, natal, date, today, doc: written.doc, created: true as const };
}
