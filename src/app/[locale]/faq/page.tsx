import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ReadNext from '@/components/ReadNext';
import SiteHeader from '@/components/SiteHeader';
import { faqGroups, faqItems } from '@/content/faq';
import { articlesForTool, otherCalculators } from '@/lib/related';
import { hreflangMetadata, pageUrl, socialMetadata } from '@/lib/seo';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

const PATH = '/faq';

/**
 * What the link at the end of an answer promises.
 *
 * It said "open the calculator" under every answer, including the ones that
 * point at an article about the tropical zodiac or at the horoscope. A link
 * that misdescribes itself is worse than no link: the reader clicks expecting a
 * tool and lands on prose.
 */
function ctaKey(href: string): 'answerCtaArticle' | 'answerCtaHoroscope' | 'answerCta' {
  if (href.startsWith('/articles/')) return 'answerCtaArticle';
  if (href.startsWith('/daily-horoscope')) return 'answerCtaHoroscope';
  return 'answerCta';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'faq' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    ...hreflangMetadata(locale, PATH),
    ...socialMetadata(locale, t('metaTitle'), t('metaDescription'), PATH),
  };
}

/**
 * The questions, in the form people ask them.
 *
 * Search Console records what the site is found for, and the question-shaped
 * queries — "how to find your sun sign", "how to work out rising sign", "how to
 * know what house your moon is in" — have nowhere to land. The calculators are
 * titled as tools, which is what they are and not what anybody types. Each
 * answer here ends at the page that does the thing.
 */
export default async function FaqPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const navT = await getTranslations('nav');
  const groups = faqGroups(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl(locale, PATH)}#faq`,
    mainEntity: faqItems(locale).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <h1 className="mb-2.5 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('h1')}</h1>
        <p className="mb-10 max-w-[620px] text-body text-ink-secondary [text-wrap:pretty]">
          {t('lead')}
        </p>

        {/* A short index, because four groups of questions is a long scroll. */}
        <nav aria-label={t('h1')} className="mb-12 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="flex h-9 items-center rounded-control border border-hairline-strong px-3 text-caption text-ink-secondary hover:border-ink-muted hover:text-ink"
            >
              {group.heading}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-14">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-20">
              <h2 className="mb-6 text-h2 font-medium tracking-[-0.02em] text-ink">
                {group.heading}
              </h2>
              <div className="flex flex-col gap-8">
                {group.items.map((item) => (
                  <article key={item.q}>
                    <h3 className="text-h3 font-medium text-ink">{item.q}</h3>
                    <p className="mt-2 max-w-[680px] text-body text-ink-secondary [text-wrap:pretty]">
                      {item.a}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="mt-3 inline-flex font-mono text-caption text-gold hover:text-ink"
                      >
                        {t(ctaKey(item.href))} →
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <ReadNext
          groups={[
            { title: navT('relatedArticles'), links: articlesForTool(locale, '/birth-chart-calculator') },
            {
              title: navT('otherCalculators'),
              links: await otherCalculators(locale, '/birth-chart-calculator'),
            },
          ]}
        />
      </main>
    </>
  );
}
