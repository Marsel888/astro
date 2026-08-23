import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, redirect } from '@/i18n/navigation';
import CalculatorNote from '@/components/CalculatorNote';
import HoroscopeBornForm from '@/components/HoroscopeBornForm';
import HoroscopePicker from '@/components/HoroscopePicker';
import HoroscopeSky from '@/components/HoroscopeSky';
import ReadingCard from '@/components/ReadingCard';
import SignEmblem from '@/components/SignEmblem';
import SiteHeader from '@/components/SiteHeader';
import { asLocale } from '@/i18n/routing';
import {
  HOROSCOPE_PATH,
  HOROSCOPE_SLUGS,
  buildDailyHoroscope,
  horoscopeTeaser,
  parseHoroscopeBorn,
  slugForBirthDate,
  withBorn,
  type HoroscopeSlug,
} from '@/lib/interpret/horoscope';
import { hreflangMetadata, pageUrl, socialMetadata } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import type { SignName } from '@/lib/chart';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ born?: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'horoscope' });
  const title = t('indexMetaTitle');
  const description = t('indexMetaDescription');
  return {
    title: { absolute: title },
    description,
    ...hreflangMetadata(locale, HOROSCOPE_PATH),
    ...socialMetadata(locale, title, description, HOROSCOPE_PATH),
  };
}

export default async function DailyHoroscopePage({ params, searchParams }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const born = parseHoroscopeBorn((await searchParams).born);
  if (born) {
    redirect({ href: withBorn(`${HOROSCOPE_PATH}/${slugForBirthDate(born)}`, born), locale });
  }

  const t = await getTranslations('horoscope');
  const daily = await getTranslations('daily');
  const copy = await getTranslations('calcCopy');
  const pack = buildDailyHoroscope(locale);
  const ht = (key: string, values?: Record<string, string | number>) => t(key as never, values as never);

  const signLabel = (sign: SignName) => daily(`sign_${sign.toLowerCase()}` as 'sign_aries');
  const planetLabel = (key: string) => daily(`planet_${key}` as 'planet_sun');
  const labels = Object.fromEntries(
    HOROSCOPE_SLUGS.map((slug) => [slug, daily(`sign_${slug}` as 'sign_aries')]),
  ) as Record<HoroscopeSlug, string>;

  const faq = [
    { q: t('faq1q'), a: t('faq1a') },
    { q: t('faq2q'), a: t('faq2a') },
    { q: t('faq3q'), a: t('faq3a') },
    { q: t('faq4q'), a: t('faq4a') },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: t('indexTitle'),
      description: t('lead'),
      inLanguage: locale,
      url: pageUrl(locale, HOROSCOPE_PATH),
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
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
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <p className="font-mono text-caption text-ink-muted">{t('kicker')}</p>
        <h1 className="mt-2 text-[32px] font-medium tracking-[-0.03em] sm:text-[40px]">{t('title')}</h1>
        <p className="mt-4 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">{t('lead')}</p>
        <p className="mt-3 font-mono text-caption text-gold">
          {t('skyLine', { sun: signLabel(pack.sky.sunSign), moon: signLabel(pack.sky.moonSign) })}
          {' · '}
          {pack.heading}
        </p>

        <HoroscopeSky sky={pack.sky} signLabel={signLabel} planetLabel={planetLabel} heading={t('skyHeading')} />
        <HoroscopeBornForm />
        <HoroscopePicker labels={labels} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {pack.signs.map((reading) => {
            const teaser = horoscopeTeaser(reading, ht);
            return (
              <Link
                key={reading.slug}
                href={`${HOROSCOPE_PATH}/${reading.slug}`}
                className="rounded-card border border-hairline bg-panel p-5 hover:border-hairline-strong hover:bg-elevated"
              >
                <div className="flex items-center gap-3">
                  <SignEmblem sign={reading.sign} size={40} />
                  <div>
                    <p className="font-mono text-caption text-gold">{labels[reading.slug]}</p>
                    <h2 className="text-h3 font-medium text-ink">{t('readSign', { sign: labels[reading.slug] })}</h2>
                  </div>
                </div>
                <p className="mt-3 text-body text-ink-secondary [text-wrap:pretty]">{teaser[0]}</p>
                {teaser[1] ? (
                  <p className="mt-2 text-[14px] leading-[1.5] text-ink-muted [text-wrap:pretty]">{teaser[1]}</p>
                ) : null}
              </Link>
            );
          })}
        </div>

        <ReadingCard
          kicker={t('kicker')}
          title={t('methodTitle')}
          paragraphs={[t('methodBody')]}
          footer={
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/birth-chart-calculator"
                className="flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
              >
                {t('natalCta')}
              </Link>
              <Link
                href="/dashboard"
                className="flex h-11 items-center rounded-control border border-hairline-strong px-5 text-[15px] text-ink-secondary hover:text-ink"
              >
                {t('cabinetCta')}
              </Link>
            </div>
          }
        />

        <CalculatorNote title={copy('horoscopeTitle')} body={copy('horoscopeBody')} />

        <section className="mt-16 max-w-[640px] border-t border-hairline pt-11">
          <h2 className="text-h2 font-medium tracking-[-0.01em]">{t('faqTitle')}</h2>
          <dl className="mt-6 flex flex-col gap-7">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="text-h3 font-medium text-ink">{item.q}</dt>
                <dd className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}
