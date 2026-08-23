import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import ArticleCalculator from '@/components/ArticleCalculator';
import SiteHeader from '@/components/SiteHeader';
import { ARTICLES, getArticle, type ArticleCategory } from '@/content/articles';
import { asLocale } from '@/i18n/routing';
import { hreflangMetadata, pageUrl } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  const article = getArticle(slug, locale);
  if (!article) return { title: 'Article' };
  return {
    title: article.title,
    description: article.excerpt,
    keywords: [article.title, ...article.faq.map((item) => item.q)],
    ...hreflangMetadata(locale, `/articles/${slug}`),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const article = getArticle(slug, locale);
  if (!article) notFound();
  const t = await getTranslations('articles');
  const url = pageUrl(locale, `/articles/${slug}`);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      inLanguage: locale,
      url,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <>
      {jsonLd.map((block) => (
        <script
          key={String(block['@type'])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <SiteHeader />
      <main className="mx-auto max-w-[800px] px-5 pb-28 pt-10 sm:px-8 sm:pt-16">
        <Link href="/articles" className="text-data text-ink-secondary hover:text-ink">
          ← {t('back')}
        </Link>
        <p className="mt-8 font-mono text-caption text-ink-muted">
          {t(`category_${article.category}` as `category_${ArticleCategory}`)}
        </p>
        <h1 className="mt-3 text-[34px] font-medium leading-[1.15] tracking-[-0.03em] sm:text-[44px]">{article.title}</h1>
        <p className="mt-5 text-[19px] leading-[1.6] text-ink-secondary [text-wrap:pretty]">{article.excerpt}</p>
        <p className="mt-4 font-mono text-caption text-ink-muted">{t('methodNote')}</p>

        <section className="mt-10">
          <ArticleCalculator toolHref={article.toolHref} />
        </section>

        <article className="mt-10 rounded-card bg-reading px-6 py-12 sm:px-14 sm:py-16">
          <div className="flex flex-col gap-12">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-[26px] font-medium leading-[1.25] tracking-[-0.02em] text-read sm:text-[30px]">
                  {section.heading}
                </h2>
                <div className="mt-5 flex flex-col gap-5">
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={`${section.heading}-${i}`}
                      className="font-serif text-[19px] leading-[1.75] text-read-secondary [text-wrap:pretty]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 border-t border-black/10 pt-10">
            <h2 className="font-serif text-[26px] font-medium text-read sm:text-[30px]">{t('faq')}</h2>
            <dl className="mt-6 flex flex-col gap-7">
              {article.faq.map((item) => (
                <div key={item.q}>
                  <dt className="font-serif text-[20px] font-medium text-read">{item.q}</dt>
                  <dd className="mt-2 font-serif text-[18px] leading-[1.7] text-read-secondary [text-wrap:pretty]">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <div className="mt-10">
          <Link
            href={article.toolHref}
            className="inline-flex h-12 items-center justify-center rounded-control bg-gold px-6 text-[16px] font-medium text-deep hover:bg-gold-hover"
          >
            {t('openTool')}
          </Link>
        </div>
      </main>
    </>
  );
}
