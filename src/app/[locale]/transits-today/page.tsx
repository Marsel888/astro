import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CalculatorJsonLd from '@/components/CalculatorJsonLd';
import CalculatorNote from '@/components/CalculatorNote';
import ReadNext from '@/components/ReadNext';
import SiteHeader from '@/components/SiteHeader';
import TransitsCalculator from '@/components/TransitsCalculator';
import { articlesForTool, otherCalculators } from '@/lib/related';
import { hreflangMetadata, socialMetadata } from '@/lib/seo';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

const PATH = '/transits-today';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'transits' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    ...hreflangMetadata(locale, PATH),
    ...socialMetadata(locale, t('metaTitle'), t('metaDescription'), PATH),
  };
}

/**
 * Today's sky against your own chart.
 *
 * Every other page here answers a question about the moment you were born, and
 * answers it once. This one changes overnight: the fast planets turn over daily,
 * the slow ones sit for months, and both are read against real degrees rather
 * than a Sun at the middle of a sign. It is what the cabinet has been writing
 * privately since it existed, and the largest family of queries the site is seen
 * for at all.
 */
export default async function TransitsPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations('transits');
  const navT = await getTranslations('nav');

  const faq = [1, 2, 3, 4].map((n) => ({
    q: t(`faq${n}q` as 'faq1q'),
    a: t(`faq${n}a` as 'faq1a'),
  }));

  return (
    <>
      <CalculatorJsonLd name={t('h1')} description={t('metaDescription')} path={PATH} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((row) => ({
              '@type': 'Question',
              name: row.q,
              acceptedAnswer: { '@type': 'Answer', text: row.a },
            })),
          }),
        }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <h1 className="mb-2.5 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('h1')}</h1>
        <p className="mb-7 max-w-[620px] text-body text-ink-secondary [text-wrap:pretty]">
          {t('lead')}
        </p>

        <TransitsCalculator />

        <section className="mt-16 border-t border-hairline pt-10">
          <h2 className="text-h2 font-medium tracking-[-0.02em] text-ink">{t('layersTitle')}</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-h3 font-medium text-ink">{t('fastTitle')}</h3>
              <p className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">{t('fastBody')}</p>
            </div>
            <div>
              <h3 className="text-h3 font-medium text-ink">{t('slowTitle')}</h3>
              <p className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">{t('slowBody')}</p>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-hairline pt-10">
          <h2 className="text-h2 font-medium tracking-[-0.02em] text-ink">{t('faqTitle')}</h2>
          <div className="mt-6 flex flex-col gap-6">
            {faq.map((row) => (
              <div key={row.q}>
                <h3 className="text-h3 font-medium text-ink">{row.q}</h3>
                <p className="mt-2 max-w-[680px] text-body text-ink-secondary [text-wrap:pretty]">
                  {row.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <CalculatorNote title={t('methodTitle')} body={t('methodBody')} />

        <ReadNext
          groups={[
            { title: navT('readNext'), links: articlesForTool(locale, '/birth-chart-calculator') },
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
