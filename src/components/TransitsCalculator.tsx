'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import BirthDataForm from '@/components/BirthDataForm';
import BirthDataLine from '@/components/BirthDataLine';
import EmptyOrrery from '@/components/EmptyOrrery';
import ReadingCard from '@/components/ReadingCard';
import SaveGate from '@/components/SaveGate';
import SaveReportCta from '@/components/SaveReportCta';
import { useFullReading } from '@/components/GuestCabinetCta';
import { useAstroLabels } from '@/components/useAstroLabels';
import { useStashedBirth } from '@/components/useStashedBirth';
import { useResultFocus } from '@/components/useResultFocus';
import { chartFromBirth } from '@/lib/astro/fromBirth';
import { transitChartForDate } from '@/lib/charts/daily';
import { dailyReport, type DailyT } from '@/lib/interpret/daily';
import { todayInZone } from '@/lib/dates';
import { DEFAULT_BIRTH, type BirthData } from '@/lib/places/defaults';
import type { ChartResult } from '@/lib/astro';
import type { ReportDoc } from '@/lib/interpret/report';

/**
 * Today's sky against a chart, in public.
 *
 * The cabinet has written this every day since it existed; nothing on the open
 * site showed it. Of the queries the site is seen for at all, transits is the
 * largest family and holds the best position we have — and it is the one thing
 * here that a birth chart calculator does not already do. The reading comes from
 * the same dailyReport the cabinet stores, so the public page and the saved
 * history cannot say different things about the same day.
 */
export default function TransitsCalculator() {
  const t = useTranslations('transits');
  const daily = useTranslations('daily');
  const { locale, ui } = useAstroLabels();
  const { fullReading } = useFullReading();
  const [data, setData] = useState<BirthData>(DEFAULT_BIRTH);
  const [chart, setChart] = useState<ChartResult | null>(null);
  const [doc, setDoc] = useState<ReportDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref: resultRef, focusResult } = useResultFocus<HTMLElement>();

  // dailyReport asks for keys it may not have — it checks whether the answer
  // came back as the key itself — so the translator has to be forgiving.
  const report: DailyT = (key, values) => {
    try {
      return daily(key as never, values as never);
    } catch {
      return key;
    }
  };

  function onSubmit(input: BirthData = data) {
    setError(null);
    try {
      const natal = chartFromBirth(input);
      const today = todayInZone(natal.tz);
      const transit = transitChartForDate(natal, today);
      setChart(natal);
      setDoc(dailyReport(natal, transit, today, report, locale));
      focusResult();
    } catch (e) {
      setChart(null);
      setDoc(null);
      setError(e instanceof Error ? e.message : ui('failed'));
    }
  }

  useStashedBirth(true, (restored) => {
    setData(restored);
    onSubmit(restored);
  });

  return (
    <>
      <BirthDataForm value={data} onChange={setData} onSubmit={onSubmit} />
      {error && <p className="mt-3 text-caption text-asp-hard">{error}</p>}
      {!doc && <EmptyOrrery caption={t('empty')} />}
      {doc && chart && (
        <section
          ref={resultRef}
          tabIndex={-1}
          className="mt-12 scroll-mt-4 border-t border-hairline pt-10 outline-none"
        >
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-h2 font-medium tracking-[-0.01em]">{doc.title}</h2>
            <BirthDataLine data={data} chart={chart} />
          </div>

          {doc.sections.map((section) => (
            <ReadingCard
              key={section.heading}
              kicker={doc.kicker}
              title={section.heading}
              paragraphs={fullReading ? section.paragraphs : section.paragraphs.slice(0, 2)}
            />
          ))}

          {fullReading ? (
            <SaveReportCta data={data} source="birth-chart" label={ui('natalChart')} />
          ) : (
            <SaveGate data={data} />
          )}
        </section>
      )}
    </>
  );
}
