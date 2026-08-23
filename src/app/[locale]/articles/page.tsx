import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SiteHeader from '@/components/SiteHeader';
import { articleList, type ArticleCategory } from '@/content/articles';
import { asLocale } from '@/i18n/routing';
import { hreflangMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  const t = await getTranslations({ locale, namespace: 'articles' });
  return {
    title: t('title'),
    description: t('lead'),
    ...hreflangMetadata(locale, '/articles'),
  };
}

export default async function ArticlesPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const t = await getTranslations('articles');
  const articles = articleList(locale);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
        <h1 className="max-w-[20ch] text-[36px] font-medium leading-[1.12] tracking-[-0.03em] sm:text-[48px]">
          {t('title')}
        </h1>
        <p className="mt-5 max-w-[720px] text-[18px] leading-[1.65] text-ink-secondary [text-wrap:pretty]">{t('lead')}</p>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="flex min-h-[240px] flex-col rounded-card border border-hairline bg-panel p-7 sm:p-8 hover:border-hairline-strong hover:bg-elevated"
            >
              <p className="font-mono text-caption text-ink-muted">
                {t(`category_${article.category}` as `category_${ArticleCategory}`)}
              </p>
              <h2 className="mt-3 text-[22px] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[26px]">
                {article.title}
              </h2>
              <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-ink-secondary [text-wrap:pretty]">{article.excerpt}</p>
              <span className="mt-6 font-mono text-caption text-gold">{t('read')}</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
