import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { claimPendingCharts } from '@/lib/charts/claim';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!auth) return NextResponse.json({ error: 'Auth is not configured' }, { status: 503 });
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  const claimed = await claimPendingCharts(session.user.id);
  return NextResponse.json({ claimed });
}
