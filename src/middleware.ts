import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { LOCALE_IDS } from './i18n/locales';

const handle = createMiddleware(routing);

/**
 * Paths next-intl must not touch.
 *
 * This used to live in `config.matcher` as one long negative lookahead. It was
 * silently wrong: the pattern matched only "/", so the middleware never ran on
 * any real page. Nothing failed loudly — the locale segment caught prefixed
 * URLs on its own — which is why it went unnoticed until English lost its
 * prefix and there was no segment left to catch "/moon-sign-calculator".
 *
 * Kept as plain code, where it can be read and tested.
 */
const SKIP = new RegExp(
  '^/(api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|manifest)(/|$|\.)',
);

/** A path that already names its language, e.g. /uk/moon-sign-calculator. */
const PREFIXED = new RegExp(`^/(${LOCALE_IDS.join('|')})(/|$)`);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Metadata routes and anything with a file extension: robots.txt, sitemap.xml,
  // favicon.ico, the Search Console verification file, static assets.
  if (SKIP.test(pathname) || pathname.slice(1).includes('.')) {
    return NextResponse.next();
  }

  const response = handle(request);

  /*
   * next-intl writes NEXT_LOCALE on every response, which makes every response
   * uncacheable and is only ever read to pick a language for a bare "/". A path
   * that already names its language does not need it written again, and a page
   * carrying Set-Cookie is a page no shared cache will keep.
   */
  if (PREFIXED.test(pathname) && request.cookies.has('NEXT_LOCALE')) {
    response.headers.delete('set-cookie');
  }

  return response;
}

export const config = {
  matcher: ['/:path*'],
};
