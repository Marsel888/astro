import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { deleteAccount } from '@/lib/charts/account';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

/**
 * Erase the account. Irreversible, so the client has to echo the confirmation
 * word back — a mis-click on the button alone must not be enough.
 */
export async function DELETE(request: Request) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });

  const session = auth ? await auth.api.getSession({ headers: request.headers }) : null;
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const limit = rateLimit(`account-delete:${clientIp(request)}`, 5, 60 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });

  const body = (await request.json().catch(() => ({}))) as { confirm?: string };
  if (body.confirm !== 'DELETE') {
    return NextResponse.json({ error: 'Confirmation word does not match' }, { status: 400 });
  }

  const removed = await deleteAccount(session.user.id);
  if (!removed) return NextResponse.json({ error: 'Account not found' }, { status: 404 });

  const response = NextResponse.json({ ok: true });
  // The session row is gone; clear the cookie so the browser stops sending it.
  for (const cookie of request.headers.get('cookie')?.split(';') ?? []) {
    const name = cookie.split('=')[0]?.trim();
    if (name && name.includes('session')) {
      response.cookies.set(name, '', { path: '/', maxAge: 0 });
    }
  }
  return response;
}
