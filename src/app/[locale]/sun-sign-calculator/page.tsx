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
  return calculatorMetadata(locale, 'sun', '/sun-sign-calculator');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const navT = await getTranslations('nav');
  const t = await getTranslations('sun');
  const copy = await getTranslations('calcCopy');
  return (
    <>
      <CalculatorJsonLd name={t('title')} description={t('description')} path="/sun-sign-calculator" />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <SignFocusCalculator ns="sun" bodyKey="sun" />
        <CalculatorNote title={copy('sunTitle')} body={copy('sunBody')} />
        <PlacementsBySign kind="sun" locale={locale} />
        <ReadNext
          groups={[
            { title: navT('readNext'), links: articlesForTool(locale, '/sun-sign-calculator') },
            { title: navT('otherCalculators'), links: await otherCalculators(locale, '/sun-sign-calculator') },
          ]}
        />
      </main>
    </>
  );
}
