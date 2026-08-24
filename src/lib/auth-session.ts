import { headers } from 'next/headers';
import { cache } from 'react';
import { auth } from '@/lib/auth';

/**
 * Cached for the length of one request: the cabinet's layout and its page both
 * ask who is reading, and without this that was two session lookups per view.
 */
export const getSession = cache(async () => {
  if (!auth) return null;
  return auth.api.getSession({ headers: await headers() });
});
