import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { isHouseSystem, setChartHouseSystem, setPrimaryChart } from '@/lib/charts/account';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

/** Per-chart preferences: which chart the cabinet leads with, and its house system. */
export async function PATCH(request: Request, { params }: Params) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });

  const session = auth ? await auth.api.getSession({ headers: request.headers }) : null;
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    primary?: boolean;
    houseSystem?: string;
  };

  if (body.primary === undefined && body.houseSystem === undefined) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  if (body.houseSystem !== undefined) {
    if (!isHouseSystem(body.houseSystem)) {
      return NextResponse.json({ error: 'Unknown house system' }, { status: 400 });
    }
    const ok = await setChartHouseSystem(session.user.id, id, body.houseSystem);
    if (!ok) return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
  }

  if (body.primary) {
    const ok = await setPrimaryChart(session.user.id, id);
    if (!ok) return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
