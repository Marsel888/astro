import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { adminDeleteUser, isAdmin } from '@/lib/admin';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

/**
 * Erase a reader on the administrator's behalf.
 *
 * The allowlist is checked here as well as on the page: a route handler is
 * reachable directly, and a page that renders for nobody else is no protection
 * for an endpoint that does the deleting.
 */
export async function DELETE(request: Request, { params }: Params) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });

  const session = auth ? await auth.api.getSession({ headers: request.headers }) : null;
  if (!isAdmin(session?.user.email)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { id } = await params;
  if (id === session?.user.id) {
    return NextResponse.json({ error: 'Cannot delete yourself here' }, { status: 400 });
  }

  const removed = await adminDeleteUser(id);
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
