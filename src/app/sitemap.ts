import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/articles';
import { LOCALE_IDS } from '@/i18n/locales';
import { horoscopePaths } from '@/lib/interpret/horoscope';
import { CALCULATOR_PATHS, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const horoscope = horoscopePaths();
  const pages = [
    '',
    ...CALCULATOR_PATHS,
    ...horoscope,
    '/articles',
    ...ARTICLES.map((article) => `/articles/${article.slug}`),
    '/privacy',
    '/terms',
  ];
  return LOCALE_IDS.flatMap((locale) =>
    pages.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: path.startsWith('/daily-horoscope')
        ? ('daily' as const)
        : path.startsWith('/articles')
          ? ('monthly' as const)
          : ('weekly' as const),
      priority:
        path === ''
          ? 1
          : path === '/birth-chart-calculator' || path === '/daily-horoscope'
            ? 0.9
            : path.startsWith('/daily-horoscope')
              ? 0.85
              : path.startsWith('/articles')
                ? 0.6
                : 0.8,
    })),
  );
}
