import { cookies } from 'next/headers';

export const PENDING_COOKIE = 'meridian_pending';
const MAX_PENDING = 1;

export async function readPendingIds() {
  const raw = (await cookies()).get(PENDING_COOKIE)?.value ?? '';
  return raw.split(',').map((id) => id.trim()).filter(Boolean);
}

export async function writePendingIds(ids: string[]) {
  const unique = [...new Set(ids)].slice(-MAX_PENDING);
  const store = await cookies();
  if (!unique.length) {
    store.delete(PENDING_COOKIE);
    return;
  }
  store.set(PENDING_COOKIE, unique.join(','), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function addPendingId(id: string) {
  const ids = await readPendingIds();
  ids.push(id);
  await writePendingIds(ids);
}

export async function clearPendingIds() {
  await writePendingIds([]);
}
