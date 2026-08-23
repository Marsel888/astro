import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { anonymousRelationshipLeft, markRelationshipUsed, relationshipUsed } from '@/lib/gates';
import { bumpUsage } from '@/lib/usage';

export const runtime = 'nodejs';

async function sessionOf(request: Request) {
  if (!auth) return null;
  return auth.api.getSession({ headers: request.headers });
}

export async function GET(request: Request) {
  const session = await sessionOf(request);
  if (session) {
    return NextResponse.json({ signedIn: true, allowed: true, remaining: null });
  }
  const remaining = anonymousRelationshipLeft(await relationshipUsed());
  return NextResponse.json({ signedIn: false, allowed: remaining > 0, remaining });
}

export async function POST(request: Request) {
  const session = await sessionOf(request);
  if (session) {
    await bumpUsage(session.user.id, 'synastryRuns');
    return NextResponse.json({ signedIn: true, allowed: true, remaining: null });
  }

  const remaining = anonymousRelationshipLeft(await relationshipUsed());
  if (remaining <= 0) {
    return NextResponse.json(
      {
        signedIn: false,
        allowed: false,
        remaining: 0,
        needAccount: true,
        error: 'Free synastry is used. Create an account to run more.',
      },
      { status: 403 },
    );
  }

  await markRelationshipUsed();
  return NextResponse.json({
    signedIn: false,
    allowed: false,
    remaining: remaining - 1,
  });
}
