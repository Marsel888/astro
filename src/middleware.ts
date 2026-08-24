import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { LOCALE_IDS } from './i18n/locales';

const handle = createMiddleware(routing);

/** A path that already names its language, e.g. /uk/moon-sign-calculator. */
const PREFIXED = new RegExp(`^/(${LOCALE_IDS.join('|')})(/|$)`);

/** Signed-in surfaces. Everything else is the same page for everybody. */
const PRIVATE = /^\/[a-zA-Z-]+\/(dashboard|settings|chart|sign-in|sign-up|signed-in)(\/|$)/;

export default function middleware(request: NextRequest) {
  const response = handle(request);
  const { pathname } = request.nextUrl;

  /*
   * next-intl writes NEXT_LOCALE on every response, which makes every response
   * uncacheable and is only ever read to pick a language for a bare "/". A path
   * that already names its language does not need it written again, and a page
   * carrying Set-Cookie is a page no shared cache will keep.
   */
  if (PREFIXED.test(pathname) && request.cookies.has('NEXT_LOCALE')) {
    response.headers.delete('set-cookie');
  }

  /*
   * Public pages are identical for every reader and rebuild on a schedule, so
   * they can be held. Anything behind a sign-in stays private — those pages read
   * cookies and name the reader's birth data.
   */
  if (!PRIVATE.test(pathname) && !response.headers.has('set-cookie')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
    );
  }

  return response;
}

export const config = {
  // Next.js metadata routes carry no file extension, so the catch-all below
  // would send /opengraph-image to /en/opengraph-image. Social scrapers and the
  // Google favicon fetcher do not follow that redirect — the preview comes back
  // empty and the tab icon stays blank.
  matcher: [
    '/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|manifest|.*\..*).*)',
  ],
};
