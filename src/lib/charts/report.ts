import { and, eq } from 'drizzle-orm';
import type { ChartResult } from '@/lib/astro';
import { db } from '@/lib/db';
import { charts, reports } from '@/lib/db/schema';
import { natalReport, type ReportDoc } from '@/lib/interpret/report';
import { bumpUsage } from '@/lib/usage';
import type { AppLocale } from '@/i18n/locales';

export async function loadOwnedChart(chartId: string, userId: string) {
  if (!db) return null;
  const [row] = await db.select().from(charts).where(eq(charts.id, chartId)).limit(1);
  if (!row || row.userId !== userId) return null;
  return row;
}

export async function getOrCreateNatalReport(chartId: string, userId: string, locale: AppLocale = 'en') {
  const chart = await loadOwnedChart(chartId, userId);
  if (!chart || !db) return null;

  const [existing] = await db
    .select()
    .from(reports)
    .where(and(eq(reports.chartId, chartId), eq(reports.kind, 'natal'), eq(reports.locale, locale)))
    .limit(1);
  if (existing) {
    return { cached: true, doc: JSON.parse(existing.bodyMd) as ReportDoc, chart };
  }

  const doc = natalReport(chart.computed as ChartResult, locale);
  await db.insert(reports).values({
    chartId,
    chartBId: '',
    kind: 'natal',
    locale,
    bodyMd: JSON.stringify(doc),
    model: 'handwritten-cache',
    tokensUsed: 0,
  });
  await bumpUsage(userId, 'reportsGenerated');
  return { cached: false, doc, chart };
}
