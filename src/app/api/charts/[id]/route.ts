import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { readPendingIds } from '@/lib/charts/pending';
import { db } from '@/lib/db';
import { charts } from '@/lib/db/schema';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  const { id } = await params;
  const [row] = await db.select().from(charts).where(eq(charts.id, id)).limit(1);
  if (!row) return NextResponse.json({ error: 'Chart not found' }, { status: 404 });

  const session = auth ? await auth.api.getSession({ headers: request.headers }) : null;
  const pending = await readPendingIds();
  const allowed = (session && row.userId === session.user.id) || pending.includes(row.id);

  if (!allowed) return NextResponse.json({ error: 'Sign in to open this chart' }, { status: 401 });

  return NextResponse.json({
    id: row.id,
    label: row.label,
    birthDate: row.birthDate,
    birthTime: row.birthTime,
    timeUnknown: row.timeUnknown,
    placeLabel: row.placeLabel,
    tzName: row.tzName,
    computed: row.computed,
  });
}

export async function DELETE(request: Request, { params }: Params) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  const session = auth ? await auth.api.getSession({ headers: request.headers }) : null;
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const { id } = await params;
  const deleted = await db
    .delete(charts)
    .where(and(eq(charts.id, id), eq(charts.userId, session.user.id)))
    .returning({ id: charts.id });

  if (!deleted.length) return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
