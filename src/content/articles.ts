import type { AppLocale } from '@/i18n/locales';
import { deArticles } from './articles.de';
import { enArticles } from './articles.en';
import { esArticles } from './articles.es';
import { frArticles } from './articles.fr';
import { ruArticles } from './articles.ru';
import { ukArticles } from './articles.uk';
import { CALCULATOR_NAV } from '@/lib/nav';

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleFaq = {
  q: string;
  a: string;
};

export type ArticleCopy = {
  title: string;
  excerpt: string;
  sections: ArticleSection[];
  faq: ArticleFaq[];
};

export type ArticleCategory =
  | 'basics'
  | 'method'
  | 'how-to'
  | 'placements'
  | 'relationships'
  | 'cabinet';

export type CalculatorHref = (typeof CALCULATOR_NAV)[number]['href'];

export type ArticleMeta = {
  slug: string;
  category: ArticleCategory;
  toolHref: CalculatorHref;
};

const EXTRAS: Partial<Record<AppLocale, Record<string, ArticleCopy>>> = {
  de: deArticles,
  en: enArticles,
  es: esArticles,
  fr: frArticles,
  ru: ruArticles,
  uk: ukArticles,
};

function pick(meta: ArticleMeta, locale: AppLocale): ArticleCopy {
  const local = EXTRAS[locale]?.[meta.slug];
  const en = enArticles[meta.slug];
  if (!en) {
    throw new Error(`Missing English article copy for ${meta.slug}`);
  }
  if (!local) return en;
  return {
    title: local.title,
    excerpt: local.excerpt,
    sections: local.sections.length ? local.sections : en.sections,
    faq: local.faq.length ? local.faq : en.faq,
  };
}

export function articleList(locale: AppLocale) {
  return ARTICLE_META.map((meta) => ({
    ...meta,
    ...pick(meta, locale),
  }));
}

export function getArticle(slug: string, locale: AppLocale) {
  const meta = ARTICLE_META.find((row) => row.slug === slug);
  if (!meta) return null;
  return { ...meta, ...pick(meta, locale) };
}

export const ARTICLE_META: ArticleMeta[] = [
  { slug: 'what-is-a-natal-chart', category: 'basics', toolHref: '/birth-chart-calculator' },
  { slug: 'natal-chart-vs-horoscope', category: 'basics', toolHref: '/birth-chart-calculator' },
  { slug: 'what-is-my-sun-sign', category: 'placements', toolHref: '/birth-chart-calculator' },
  { slug: 'sun-moon-rising', category: 'placements', toolHref: '/birth-chart-calculator' },
  { slug: 'rising-sign', category: 'placements', toolHref: '/rising-sign-calculator' },
  { slug: 'moon-sign', category: 'placements', toolHref: '/moon-sign-calculator' },
  { slug: 'venus-sign', category: 'placements', toolHref: '/venus-sign-calculator' },
  { slug: 'mercury-sign', category: 'placements', toolHref: '/mercury-sign-calculator' },
  { slug: 'mars-sign', category: 'placements', toolHref: '/mars-sign-calculator' },
  { slug: 'why-birth-time-matters', category: 'method', toolHref: '/birth-chart-calculator' },
  { slug: 'birth-chart-without-time', category: 'method', toolHref: '/birth-chart-calculator' },
  { slug: 'how-to-read-a-natal-chart', category: 'how-to', toolHref: '/birth-chart-calculator' },
  { slug: 'houses-in-a-birth-chart', category: 'method', toolHref: '/birth-chart-calculator' },
  { slug: 'empty-houses', category: 'method', toolHref: '/birth-chart-calculator' },
  { slug: 'aspects-in-astrology', category: 'basics', toolHref: '/birth-chart-calculator' },
  { slug: 'tropical-vs-sidereal', category: 'method', toolHref: '/birth-chart-calculator' },
  { slug: 'synastry-vs-composite', category: 'relationships', toolHref: '/synastry-calculator' },
  { slug: 'what-are-transits', category: 'cabinet', toolHref: '/birth-chart-calculator' },
];

/** @deprecated use ARTICLE_META — kept so sitemap and static params keep working */
export const ARTICLES = ARTICLE_META;
