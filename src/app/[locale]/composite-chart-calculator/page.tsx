import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CalculatorJsonLd from '@/components/CalculatorJsonLd';
import CalculatorNote from '@/components/CalculatorNote';
import SiteHeader from '@/components/SiteHeader';
import TwoChartCalculator from '@/components/TwoChartCalculator';
import { calculatorMetadata } from '@/lib/calculatorMeta';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return calculatorMetadata(locale, 'composite', '/composite-chart-calculator');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const t = await getTranslations('composite');
  const copy = await getTranslations('calcCopy');
  return (
    <>
      <CalculatorJsonLd
        name={t('title')}
        description={t('description')}
        path="/composite-chart-calculator"
      />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <TwoChartCalculator mode="composite" />
        <CalculatorNote title={copy('compositeTitle')} body={copy('compositeBody')} />
      </main>
    </>
  );
}
