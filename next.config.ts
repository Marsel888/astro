import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
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
