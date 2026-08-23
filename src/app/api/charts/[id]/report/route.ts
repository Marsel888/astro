import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { charts, reports } from '@/lib/db/schema';
import { natalReport } from '@/lib/interpret/report';
import type { ChartResult } from '@/lib/astro';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { bumpUsage } from '@/lib/usage';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  if (!auth) return NextResponse.json({ error: 'Auth is not configured' }, { status: 503 });
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const { id } = await params;
  const [row] = await db
    .select()
    .from(reports)
    .where(and(eq(reports.chartId, id), eq(reports.kind, 'natal'), eq(reports.locale, 'en')))
    .limit(1);
  if (!row) return NextResponse.json({ error: 'No report yet' }, { status: 404 });
  return NextResponse.json({ id: row.id, body: JSON.parse(row.bodyMd) as unknown });
}

export async function POST(request: Request, { params }: Params) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  if (!auth) return NextResponse.json({ error: 'Auth is not configured' }, { status: 503 });

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const ip = clientIp(request);
  const limit = rateLimit(`report:${session.user.id}:${ip}`, 10, 24 * 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Report limit reached for today.' }, { status: 429 });
  }

  const { id } = await params;
  const [chart] = await db.select().from(charts).where(eq(charts.id, id)).limit(1);
  if (!chart || chart.userId !== session.user.id) {
    return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
  }

  const [existing] = await db
    .select()
    .from(reports)
    .where(and(eq(reports.chartId, id), eq(reports.kind, 'natal'), eq(reports.locale, 'en')))
    .limit(1);
  if (existing) {
    return NextResponse.json({ id: existing.id, body: JSON.parse(existing.bodyMd) as unknown, cached: true });
  }

  await bumpUsage(session.user.id, 'reportsGenerated');

  const doc = natalReport(chart.computed as ChartResult);
  const [created] = await db
    .insert(reports)
    .values({
      chartId: id,
      chartBId: '',
      kind: 'natal',
      locale: 'en',
      bodyMd: JSON.stringify(doc),
      model: 'handwritten-cache',
      tokensUsed: 0,
    })
    .returning({ id: reports.id, bodyMd: reports.bodyMd });

  if (!created) return NextResponse.json({ error: 'Could not store report' }, { status: 500 });
  return NextResponse.json({ id: created.id, body: doc, cached: false });
}
