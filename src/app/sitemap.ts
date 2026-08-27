import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/articles';
import { PUBLISHED_LOCALE_IDS } from '@/i18n/locales';
import { horoscopePaths } from '@/lib/interpret/horoscope';
import { alternateLanguages, pageUrl } from '@/lib/seo';
import { CALCULATOR_PATHS } from '@/lib/site';

/**
 * Published locales only. A draft locale serves English copy under its own
 * `lang`, so listing it here would ask Google to index the same page fifteen times.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = new Date();
  const today = new Date(builtAt.toISOString().slice(0, 10));

  const pages = [
    '',
    ...CALCULATOR_PATHS,
    ...horoscopePaths(),
    '/articles',
    '/faq',
    ...ARTICLES.map((article) => `/articles/${article.slug}`),
    '/privacy',
    '/terms',
  ];

  return PUBLISHED_LOCALE_IDS.flatMap((locale) =>
    pages.map((path) => {
      const horoscope = path.startsWith('/daily-horoscope');
      const article = path.startsWith('/articles');
      const articleMeta = ARTICLES.find((row) => path === `/articles/${row.slug}`);
      return {
        url: pageUrl(locale, path),
        lastModified: horoscope ? today : articleMeta ? new Date(articleMeta.updatedAt) : builtAt,
        changeFrequency: horoscope ? ('daily' as const) : article ? ('monthly' as const) : ('weekly' as const),
        priority: path === '' ? 1 : path === '/birth-chart-calculator' ? 0.9 : article ? 0.6 : 0.8,
        alternates: { languages: alternateLanguages(path) },
      };
    }),
  );
}
