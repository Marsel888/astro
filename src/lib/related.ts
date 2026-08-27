import { getTranslations } from 'next-intl/server';
import { articleList, type ArticleCategory } from '@/content/articles';
import { CALCULATOR_NAV } from '@/lib/nav';
import type { AppLocale } from '@/i18n/locales';

/**
 * What to read after this page.
 *
 * Every calculator used to be a dead end: fifteen links on the moon sign
 * calculator, all fifteen from the header and footer, none from the page itself.
 * For a site nobody links to yet, the links it draws between its own pages are
 * the only ones it controls — and the anchor is the calculator's real name
 * ("Moon sign calculator"), not the two words that fit in a menu.
 */
export type RelatedLink = { href: string; label: string };

/** The namespace each calculator's full name lives in. */
const CALC_NS: Record<string, string> = {
  '/birth-chart-calculator': 'birthChart',
  '/rising-sign-calculator': 'rising',
  '/sun-sign-calculator': 'sun',
  '/moon-sign-calculator': 'moon',
  '/mercury-sign-calculator': 'mercury',
  '/venus-sign-calculator': 'venus',
  '/mars-sign-calculator': 'mars',
  '/synastry-calculator': 'synastry',
  '/composite-chart-calculator': 'composite',
  '/transits-today': 'transits',
};

async function calculatorName(locale: AppLocale, href: string): Promise<string> {
  const t = await getTranslations({ locale, namespace: CALC_NS[href] as 'moon' });
  return t('title');
}

/** Sibling calculators, in nav order, starting after the current one so the
 *  set differs from page to page rather than always naming the same three. */
export async function otherCalculators(
  locale: AppLocale,
  current: string,
  limit = 4,
): Promise<RelatedLink[]> {
  const hrefs = CALCULATOR_NAV.map((row) => row.href as string);
  const at = hrefs.indexOf(current);
  const ordered = at < 0 ? hrefs : [...hrefs.slice(at + 1), ...hrefs.slice(0, at)];
  return Promise.all(
    ordered.slice(0, limit).map(async (href) => ({ href, label: await calculatorName(locale, href) })),
  );
}

/** Articles written about this calculator, most specific first. */
export function articlesForTool(locale: AppLocale, toolHref: string, limit = 4): RelatedLink[] {
  return articleList(locale)
    .filter((article) => article.toolHref === toolHref)
    .slice(0, limit)
    .map((article) => ({ href: `/articles/${article.slug}`, label: article.title }));
}

/** Other articles worth reading next to this one. */
export function relatedArticles(
  locale: AppLocale,
  slug: string,
  category: ArticleCategory,
  limit = 4,
): RelatedLink[] {
  const all = articleList(locale).filter((article) => article.slug !== slug);
  const sameCategory = all.filter((article) => article.category === category);
  const rest = all.filter((article) => article.category !== category);
  return [...sameCategory, ...rest]
    .slice(0, limit)
    .map((article) => ({ href: `/articles/${article.slug}`, label: article.title }));
}
