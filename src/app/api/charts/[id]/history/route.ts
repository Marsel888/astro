import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { listDailyReadings, localizedDailyDoc, natalFromRow } from '@/lib/charts/daily';
import { loadOwnedChart } from '@/lib/charts/report';
import { reportToText } from '@/lib/interpret/report';
import { asLocale } from '@/i18n/routing';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

/**
 * The whole day-by-day log as one text file.
 *
 * This used to be built during the dashboard render, which meant re-localising
 * up to ninety readings on every visit just to fill a button. It only runs when
 * somebody actually asks for the download now.
 */
export async function GET(request: Request, { params }: Params) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });

  const session = auth ? await auth.api.getSession({ headers: request.headers }) : null;
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const { id } = await params;
  const chart = await loadOwnedChart(id, session.user.id);
  if (!chart) return NextResponse.json({ error: 'Chart not found' }, { status: 404 });

  const locale = asLocale(new URL(request.url).searchParams.get('locale') ?? undefined);
  const natal = natalFromRow(chart);
  const rows = await listDailyReadings(id, session.user.id);

  const parts: string[] = [];
  for (const row of rows) {
    const doc = await localizedDailyDoc(natal, row.transits, row.date, locale);
    parts.push(reportToText(doc));
  }

  return new NextResponse(parts.join('\n---\n\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="siderachart-daily-${id.slice(0, 8)}.txt"`,
      'Cache-Control': 'no-store',
    },
  });
}
