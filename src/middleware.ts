import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Next.js metadata routes carry no file extension, so the catch-all below
  // would send /opengraph-image to /en/opengraph-image. Social scrapers and the
  // Google favicon fetcher do not follow that redirect — the preview comes back
  // empty and the tab icon stays blank.
  matcher: [
    '/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|manifest|.*\\..*).*)',
  ],
};
