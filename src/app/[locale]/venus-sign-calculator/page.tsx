import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CalculatorJsonLd from '@/components/CalculatorJsonLd';
import CalculatorNote from '@/components/CalculatorNote';
import PlacementsBySign from '@/components/PlacementsBySign';
import SignFocusCalculator from '@/components/SignFocusCalculator';
import ReadNext from '@/components/ReadNext';
import SiteHeader from '@/components/SiteHeader';
import { calculatorMetadata } from '@/lib/calculatorMeta';
import { articlesForTool, otherCalculators } from '@/lib/related';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return calculatorMetadata(locale, 'venus', '/venus-sign-calculator');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const navT = await getTranslations('nav');
  const t = await getTranslations('venus');
  const copy = await getTranslations('calcCopy');
  return (
    <>
      <CalculatorJsonLd name={t('title')} description={t('description')} path="/venus-sign-calculator" />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <SignFocusCalculator ns="venus" bodyKey="venus" />
        <CalculatorNote title={copy('venusTitle')} body={copy('venusBody')} />
        <PlacementsBySign kind="venus" locale={locale} />
        <ReadNext
          groups={[
            { title: navT('readNext'), links: articlesForTool(locale, '/venus-sign-calculator') },
            { title: navT('otherCalculators'), links: await otherCalculators(locale, '/venus-sign-calculator') },
          ]}
        />
      </main>
    </>
  );
}
