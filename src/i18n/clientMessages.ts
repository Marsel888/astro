/**
 * The namespaces the browser actually needs.
 *
 * Every page shipped the whole dictionary — the cabinet's copy on a horoscope,
 * the legal pages on a calculator — because the layout has no idea which page is
 * under it. Server components read their translations on the server and never
 * need them sent; only what a `'use client'` component asks for has to travel.
 *
 * Adding `useTranslations('x')` to a client component means adding `x` here.
 * scripts/verify-client-messages.ts fails the build if the two drift apart.
 */
export const CLIENT_NAMESPACES = [
  // The header and footer read the root, but only touch these three.
  'brand',
  'nav',
  'footer',
  // Forms, gates and shared controls.
  'form',
  'common',
  'gate',
  'auth',
  // Results and the cabinet.
  'resultUi',
  'account',
  'daily',
  'horoscopeForm',
  // The calculators with client shells of their own.
  'birthChart',
  'rising',
  'moon',
  'venus',
  'mercury',
  'mars',
  'synastry',
  'composite',
] as const;

export function clientMessages(all: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const ns of CLIENT_NAMESPACES) {
    if (ns in all) out[ns] = all[ns];
  }
  return out;
}
