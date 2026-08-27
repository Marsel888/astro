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
import { DEFAULT_BIRTH, type BirthData } from '@/lib/places/defaults';
import { dms, type SignName } from '@/lib/chart';
import { placementReading, type ReadingKind } from '@/lib/interpret/copy';
import type { ChartPlanet, ChartResult } from '@/lib/astro';

type Props = {
  ns: 'moon' | 'venus' | 'mercury' | 'mars';
  bodyKey: string;
  headingAs?: 'h1' | 'h2' | 'none';
};

export default function SignFocusCalculator({ ns, bodyKey, headingAs = 'h1' }: Props) {
  const t = useTranslations(ns);
  const { locale, ui, sign: signLabel, planet: planetLabel } = useAstroLabels();
  const { fullReading } = useFullReading();
  const [data, setData] = useState<BirthData>(DEFAULT_BIRTH);
  const [body, setBody] = useState<ChartPlanet | null>(null);
  const [chart, setChart] = useState<ChartResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref: resultRef, focusResult } = useResultFocus<HTMLElement>();

  function onSubmit(input: BirthData = data) {
    setError(null);
    try {
      const computed = chartFromBirth(input);
      setChart(computed);
      setBody(computed.bodies.find((row) => row.key === bodyKey) ?? null);
      focusResult();
    } catch (e) {
      setBody(null);
      setChart(null);
      setError(e instanceof Error ? e.message : ui('failed'));
    }
  }

  useStashedBirth(true, (restored) => {
    setData(restored);
    onSubmit(restored);
  });

  const kind = bodyKey as ReadingKind;
  const sign = body ? (body.sign as SignName) : null;
  const paras = body && sign ? placementReading(kind, sign, body.house, locale) : [];

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
      <BirthDataForm value={data} onChange={setData} onSubmit={onSubmit} />
      {error && <p className="mt-3 text-caption text-asp-hard">{error}</p>}
      {!body && <EmptyOrrery caption={ui('emptySign')} />}
      {body && sign && (
        <section ref={resultRef} tabIndex={-1} className="mt-12 scroll-mt-4 border-t border-hairline pt-10 outline-none">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="mb-5 text-h2 font-medium tracking-[-0.01em]">{t('result')}</h2>
            {chart ? <BirthDataLine data={data} chart={chart} /> : null}
          </div>
          <div className="result-enter flex items-center gap-5 rounded-card border border-hairline bg-panel p-5 sm:p-7">
            <SignEmblem sign={sign} size={88} />
            <div className="flex flex-col gap-1">
              <span className="text-caption text-ink-muted">{planetLabel(bodyKey)}</span>
              <span className="text-h1 font-medium tracking-[-0.02em] text-ink">{signLabel(body.sign)}</span>
              <span className="font-mono text-data text-ink-secondary">
                {dms(body.lon)}
                {body.house ? ` · ${ui('house', { n: body.house })}` : ''}
                {body.retrograde ? ` · ${ui('retrograde')}` : ''}
              </span>
            </div>
          </div>
          <ReadingCard
            kicker={ui('readingPlanet', { planet: planetLabel(bodyKey) })}
            title={`${signLabel(body.sign)} · ${planetLabel(bodyKey)}${body.house ? `, ${ui('house', { n: body.house })}` : ''}`}
            paragraphs={fullReading ? paras : paras.slice(0, 1)}
            footer={<GuestCabinetCta />}
          />
          {fullReading ? <SaveReportCta data={data} source={ns} /> : <SaveGate data={data} />}
          <FullChartCta data={data} />
        </section>
      )}
    </>
  );
}
