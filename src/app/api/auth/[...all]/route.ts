import { NextResponse } from 'next/server';
import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

function unavailable() {
  return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
}

const handler = auth ? toNextJsHandler(auth) : null;

export const GET = handler?.GET ?? unavailable;
export const POST = handler?.POST ?? unavailable;
