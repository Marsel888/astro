import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import BirthChartCalculator from '@/components/BirthChartCalculator';
import CalculatorJsonLd from '@/components/CalculatorJsonLd';
import SiteHeader from '@/components/SiteHeader';
import { calculatorMetadata } from '@/lib/calculatorMeta';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return calculatorMetadata(locale, 'birthChart', '/birth-chart-calculator');
}

export default async function BirthChartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const t = await getTranslations('birthChart');
  const copy = await getTranslations('calcCopy');
  return (
    <>
      <CalculatorJsonLd name={t('title')} description={t('lead')} path="/birth-chart-calculator" />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <BirthChartCalculator />

        <section className="mt-16 grid gap-10 border-t border-hairline pt-11 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h2 className="mb-4 text-h2 font-medium tracking-[-0.01em]">{copy('howTitle')}</h2>
            <p className="mb-3.5 text-body text-ink-secondary [text-wrap:pretty]">{copy('howP1')}</p>
            <p className="mb-3.5 text-body text-ink-secondary [text-wrap:pretty]">{copy('howP2')}</p>
            <h3 className="mb-2.5 mt-8 text-h3 font-medium">{copy('whyTimeTitle')}</h3>
            <p className="mb-3.5 text-body text-ink-secondary [text-wrap:pretty]">{copy('whyTimeBody')}</p>
            <h3 className="mb-2.5 mt-8 text-h3 font-medium">{copy('housesTitle')}</h3>
            <p className="text-body text-ink-secondary [text-wrap:pretty]">{copy('housesBody')}</p>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="rounded-card border border-hairline p-5">
              <span className="font-mono text-caption text-ink-muted">{copy('sources')}</span>
              <div className="mt-3 flex flex-col gap-2.5 text-data text-ink-secondary">
                <span>{copy('sourceEngine')}</span>
                <span>{copy('sourceIana')}</span>
                <span>{copy('sourceNominatim')}</span>
              </div>
            </div>
            <div className="rounded-card border border-hairline p-5">
              <span className="font-mono text-caption text-ink-muted">{copy('precision')}</span>
              <div className="mt-3 flex flex-col gap-2.5 font-mono text-data text-ink-secondary">
                <span>{copy('precisionPlanets')}</span>
                <span>{copy('precisionHouses')}</span>
                <span>{copy('precisionOrbs')}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
