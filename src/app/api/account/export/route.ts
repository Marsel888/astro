import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { exportAccount } from '@/lib/charts/account';

export const runtime = 'nodejs';

/** Everything the account holds, as a downloadable JSON file. */
export async function GET(request: Request) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });

  const session = auth ? await auth.api.getSession({ headers: request.headers }) : null;
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const data = await exportAccount(session.user.id);
  if (!data) return NextResponse.json({ error: 'Account not found' }, { status: 404 });

  const stamp = data.exportedAt.slice(0, 10);
  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="siderachart-export-${stamp}.json"`,
      'Cache-Control': 'no-store',
    },
  });
}
