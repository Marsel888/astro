import { cookies } from 'next/headers';

// Renamed from meridian_rel_used when the project became SideraChart. Anyone
// still carrying the old cookie simply gets their free overlay again.
export const RELATIONSHIP_COOKIE = 'sidera_rel_used';
export const ANON_RELATIONSHIP_MAX = 1;

export async function relationshipUsed() {
  const raw = (await cookies()).get(RELATIONSHIP_COOKIE)?.value ?? '';
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}

export async function markRelationshipUsed() {
  const n = (await relationshipUsed()) + 1;
  (await cookies()).set(RELATIONSHIP_COOKIE, String(n), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return n;
}

export function anonymousRelationshipLeft(used: number) {
  return Math.max(0, ANON_RELATIONSHIP_MAX - used);
}
