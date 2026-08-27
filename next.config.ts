import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  /*
   * Next marks everything that passes through middleware as no-store, and
   * next-intl's middleware is on every page. These pages are prerendered and
   * identical for everybody, so the header is put back here — headers() is
   * applied to the finished response and wins.
   *
   * Signed-in surfaces are matched out by name: they read cookies and name the
   * reader's birth data, and must never be held anywhere.
   */
  async redirects() {
    return [
      /*
       * English lost its prefix, and Google had already indexed the /en/* URLs.
       * Permanent, so the signals move rather than splitting in two.
       */
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      {
        source: '/:locale/articles/how-to-read-the-wheel',
        destination: '/:locale/articles/how-to-read-a-natal-chart',
        permanent: true,
      },
      {
        source: '/:locale/articles/houses-placidus',
        destination: '/:locale/articles/houses-in-a-birth-chart',
        permanent: true,
      },
      {
        source: '/:locale/articles/tropical-zodiac',
        destination: '/:locale/articles/tropical-vs-sidereal',
        permanent: true,
      },
      {
        source: '/:locale/articles/aspects',
        destination: '/:locale/articles/aspects-in-astrology',
        permanent: true,
      },
      {
        source: '/:locale/articles/transits-and-daily-sky',
        destination: '/:locale/articles/what-are-transits',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
