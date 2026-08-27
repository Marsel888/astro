'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import BirthDataForm from '@/components/BirthDataForm';
import BirthDataLine from '@/components/BirthDataLine';
import FullChartCta from '@/components/FullChartCta';
import EmptyOrrery from '@/components/EmptyOrrery';
import ReadingCard from '@/components/ReadingCard';
import SignEmblem from '@/components/SignEmblem';
import SaveGate from '@/components/SaveGate';
import SaveReportCta from '@/components/SaveReportCta';
import GuestCabinetCta, { useFullReading } from '@/components/GuestCabinetCta';
import { useAstroLabels } from '@/components/useAstroLabels';
import { useStashedBirth } from '@/components/useStashedBirth';
import { useResultFocus } from '@/components/useResultFocus';
import { chartFromBirth } from '@/lib/astro/fromBirth';
import type { ChartResult } from '@/lib/astro';
import { DEFAULT_BIRTH, type BirthData } from '@/lib/places/defaults';
import { dms, signOf, type SignName } from '@/lib/chart';
import { readingFor } from '@/lib/interpret/copy';

export default function RisingCalculator({ headingAs = 'h1' }: { headingAs?: 'h1' | 'h2' | 'none' } = {}) {
  const t = useTranslations('rising');
  const form = useTranslations('form');
  const { locale, ui, sign: signLabel } = useAstroLabels();
  const { fullReading } = useFullReading();
  const [data, setData] = useState<BirthData>(DEFAULT_BIRTH);
  const [result, setResult] = useState<{ sign: SignName; lon: string } | null>(null);
  const [chart, setChart] = useState<ChartResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref: resultRef, focusResult } = useResultFocus<HTMLElement>();

  // Imported but never called: a guest who signed up from this page came back to
  // an empty form, while the Moon and birth chart pages remembered.
  useStashedBirth(true, (restored) => {
    setData(restored);
    onSubmit(restored);
  });

  function onSubmit(input: BirthData = data) {
    setError(null);
    if (input.timeUnknown) {
      setResult(null);
      setError(form('timeRequired'));
      return;
    }
    try {
      const chart = chartFromBirth({ ...input, timeUnknown: false });
      if (chart.ascendant == null) {
        setResult(null);
        setError(form('timeRequired'));
        return;
      }
      const s = signOf(chart.ascendant);
      setChart(chart);
      setResult({ sign: s.n, lon: dms(chart.ascendant) });
      focusResult();
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : ui('failed'));
    }
  }

  // 'none' is for embedding under a page that already has its own heading.
  const Heading = headingAs === 'none' ? null : headingAs;

  return (
    <>
      {Heading && (
        <>
          <Heading className="mb-2.5 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('h1')}</Heading>
          <p className="mb-7 max-w-[620px] text-body text-ink-secondary [text-wrap:pretty]">{t('lead')}</p>
        </>
      )}
      <BirthDataForm value={data} onChange={setData} onSubmit={onSubmit} allowUnknownTime={false} />
      {error && <p className="mt-3 text-caption text-asp-hard">{error}</p>}
      {!result && <EmptyOrrery caption={ui('emptyRising')} />}
      {result && (
        <section ref={resultRef} tabIndex={-1} className="mt-12 scroll-mt-4 border-t border-hairline pt-10 outline-none">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="mb-5 text-h2 font-medium tracking-[-0.01em]">{t('result')}</h2>
            {chart ? <BirthDataLine data={data} chart={chart} /> : null}
          </div>
          <div className="result-enter flex items-center gap-5 rounded-card border border-hairline bg-panel p-5 sm:p-7">
            <SignEmblem sign={result.sign} size={88} />
            <div className="flex flex-col gap-1">
              <span className="text-caption text-ink-muted">{ui('ascendant')}</span>
              <span className="text-h1 font-medium tracking-[-0.02em] text-ink">{signLabel(result.sign)}</span>
              <span className="font-mono text-data text-ink-secondary">
                {result.lon} · {ui('house', { n: 1 })}
              </span>
            </div>
          </div>
          <ReadingCard
            kicker={ui('readingRising')}
            title={ui('risingTitle', { sign: signLabel(result.sign) })}
            paragraphs={[readingFor('rising', result.sign, locale)]}
            footer={<GuestCabinetCta />}
          />
          {fullReading ? <SaveReportCta data={data} source="rising" /> : <SaveGate data={data} />}
          <FullChartCta data={data} />
        </section>
      )}
    </>
  );
}
