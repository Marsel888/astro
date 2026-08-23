import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import CalculatorNote from '@/components/CalculatorNote';
import HoroscopeBornForm from '@/components/HoroscopeBornForm';
import HoroscopePicker from '@/components/HoroscopePicker';
import HoroscopeSky from '@/components/HoroscopeSky';
import ReadingCard from '@/components/ReadingCard';
import SignEmblem from '@/components/SignEmblem';
import SiteHeader from '@/components/SiteHeader';
import { asLocale } from '@/i18n/routing';
import { formatBirthDate } from '@/lib/dates';
import {
  HOROSCOPE_PATH,
  HOROSCOPE_SLUGS,
  buildDailyHoroscope,
  horoscopeSections,
  isHoroscopeSlug,
  parseHoroscopeBorn,
  slugFromSign,
  withBorn,
  type HoroscopeSlug,
} from '@/lib/interpret/horoscope';
import { hreflangMetadata, pageUrl } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import type { SignName } from '@/lib/chart';

type Props = {
  params: Promise<{ locale: string; sign: string }>;
  searchParams: Promise<{ born?: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return HOROSCOPE_SLUGS.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, sign } = await params;
  const locale = asLocale(raw);
  if (!isHoroscopeSlug(sign)) return { title: 'Horoscope' };
  const t = await getTranslations({ locale, namespace: 'horoscope' });
  const daily = await getTranslations({ locale, namespace: 'daily' });
  const label = daily(`sign_${sign}` as 'sign_aries');
  return {
    title: { absolute: t('signMetaTitle', { sign: label }) },
    description: t('signMetaDescription', { sign: label }),
    ...hreflangMetadata(locale, `${HOROSCOPE_PATH}/${sign}`),
  };
}

export default async function SignHoroscopePage({ params, searchParams }: Props) {
  const { locale: raw, sign: slug } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  if (!isHoroscopeSlug(slug)) notFound();

  const born = parseHoroscopeBorn((await searchParams).born);
  const t = await getTranslations('horoscope');
  const daily = await getTranslations('daily');
  const copy = await getTranslations('calcCopy');
  const pack = buildDailyHoroscope(locale, undefined, born);
  const ht = (key: string, values?: Record<string, string | number>) => t(key as never, values as never);
  const dt = (key: string, values?: Record<string, string | number>) => daily(key as never, values as never);
  const reading = pack.signs.find((row) => row.slug === slug);
  if (!reading) notFound();

  const signLabel = (sign: SignName) => daily(`sign_${sign.toLowerCase()}` as 'sign_aries');
  const planetLabel = (key: string) => daily(`planet_${key}` as 'planet_sun');
  const labels = Object.fromEntries(
    HOROSCOPE_SLUGS.map((item) => [item, daily(`sign_${item}` as 'sign_aries')]),
  ) as Record<HoroscopeSlug, string>;
  const label = labels[slug];
  const sections = horoscopeSections(reading, pack, ht, dt, signLabel, locale);
  const natalSign = pack.natal ? slugFromSign(pack.natal.sunSign) : undefined;
  const natalLabel = pack.natal ? signLabel(pack.natal.sunSign) : '';
  const natalDate = born ? formatBirthDate(born, locale) : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('signTitle', { sign: label }),
    description: reading.personal
      ? t('signLeadPersonal', { sign: label, deg: pack.natal?.sunDegree ?? '15°', date: natalDate })
      : t('signLead', { sign: label }),
    inLanguage: locale,
    url: pageUrl(locale, `${HOROSCOPE_PATH}/${slug}`),
    dateModified: pack.isoDate,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="mx-auto max-w-[800px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <Link href={withBorn(HOROSCOPE_PATH, born)} className="font-mono text-caption text-gold hover:text-ink">
          ← {t('allSigns')}
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <SignEmblem sign={reading.sign} size={64} />
          <div>
            <p className="font-mono text-caption text-ink-muted">
              {reading.personal ? t('personalKicker', { date: natalDate }) : t('kicker')}
            </p>
            <h1 className="mt-1 text-[32px] font-medium tracking-[-0.03em] sm:text-[40px]">
              {t('signTitle', { sign: label })}
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">
          {reading.personal
            ? t('signLeadPersonal', {
                sign: label,
                deg: pack.natal?.sunDegree ?? '15°',
                date: natalDate,
              })
            : t('signLead', { sign: label })}
        </p>
        {pack.natal && natalSign && natalSign !== slug ? (
          <p className="mt-4 rounded-control border border-gold/40 bg-gold/10 px-4 py-3 text-[14px] leading-[1.5] text-ink">
            {t('wrongSign', { sign: natalLabel, date: natalDate })}{' '}
            <Link href={withBorn(`${HOROSCOPE_PATH}/${natalSign}`, born)} className="text-gold hover:text-ink">
              {t('openNatalSign', { sign: natalLabel })}
            </Link>
          </p>
        ) : null}
        <p className="mt-3 font-mono text-caption text-gold">
          {t('skyLine', { sun: signLabel(pack.sky.sunSign), moon: signLabel(pack.sky.moonSign) })}
          {' · '}
          {pack.heading}
        </p>

        <HoroscopeSky sky={pack.sky} signLabel={signLabel} planetLabel={planetLabel} heading={t('skyHeading')} />
        <HoroscopeBornForm slug={slug} born={born} />
        <HoroscopePicker active={slug} labels={labels} born={born} />

        <ReadingCard
          kicker={reading.personal ? t('personalKicker', { date: natalDate }) : t('kicker')}
          title={t('signTitle', { sign: label })}
          sections={sections}
          footer={
            <div className="mt-8 flex flex-col gap-2 border-t border-read-secondary/20 pt-6">
              <div className="flex flex-wrap gap-3">
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
              <p className="max-w-[480px] text-[14px] leading-[1.5] text-read-secondary">{t('natalHint')}</p>
            </div>
          }
        />

        <CalculatorNote title={copy('horoscopeTitle')} body={copy('horoscopeBody')} />

        <p className="mt-10 font-mono text-caption text-ink-muted">{t('otherSigns')}</p>
        <HoroscopePicker active={slug} labels={labels} born={born} />
      </main>
    </>
  );
}
