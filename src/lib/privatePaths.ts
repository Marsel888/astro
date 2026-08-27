/**
 * Path segments that belong to a signed-in reader.
 *
 * One list, imported by both the middleware and the cache headers in
 * next.config. They used to be two copies of the same names, which is the kind
 * of pair that stays in step right up until someone adds a page — and the page
 * that gets missed is served from a shared cache to whoever asks next.
 */
export const PRIVATE_SEGMENTS = [
  'admin',
  'dashboard',
  'settings',
  'chart',
  'sign-in',
  'sign-up',
  'signed-in',
] as const;

/** Never cacheable, never prerendered, never shown to a stranger. */
export function isPrivatePath(pathname: string, localeIds: readonly string[]): boolean {
  const withoutLocale = pathname.replace(new RegExp(`^/(${localeIds.join('|')})(?=/|$)`), '');
  const segment = withoutLocale.split('/')[1] ?? '';
  return (PRIVATE_SEGMENTS as readonly string[]).includes(segment);
}
