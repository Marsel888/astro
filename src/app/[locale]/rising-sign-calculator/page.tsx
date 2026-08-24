import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CalculatorJsonLd from '@/components/CalculatorJsonLd';
import CalculatorNote from '@/components/CalculatorNote';
import PlacementsBySign from '@/components/PlacementsBySign';
import RisingCalculator from '@/components/RisingCalculator';
import SiteHeader from '@/components/SiteHeader';
import { calculatorMetadata } from '@/lib/calculatorMeta';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return calculatorMetadata(locale, 'rising', '/rising-sign-calculator');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const t = await getTranslations('rising');
  const copy = await getTranslations('calcCopy');
  return (
    <>
      <CalculatorJsonLd name={t('title')} description={t('description')} path="/rising-sign-calculator" />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <RisingCalculator />
        <CalculatorNote title={copy('risingTitle')} body={copy('risingBody')} />
        <PlacementsBySign kind="rising" locale={locale} />
      </main>
    </>
  );
}
