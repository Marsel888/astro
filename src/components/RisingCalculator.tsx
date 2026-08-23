'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import BirthDataForm from '@/components/BirthDataForm';
import EmptyOrrery from '@/components/EmptyOrrery';
import ReadingCard from '@/components/ReadingCard';
import SignEmblem from '@/components/SignEmblem';
import SaveReportCta from '@/components/SaveReportCta';
import GuestCabinetCta, { useFullReading } from '@/components/GuestCabinetCta';
import { useAstroLabels } from '@/components/useAstroLabels';
import { chartFromBirth } from '@/lib/astro/fromBirth';
import { DEFAULT_BIRTH, type BirthData } from '@/lib/places/defaults';
import { dms, signOf, type SignName } from '@/lib/chart';
import { readingFor } from '@/lib/interpret/copy';

export default function RisingCalculator() {
  const t = useTranslations('rising');
  const form = useTranslations('form');
  const { locale, ui, sign: signLabel } = useAstroLabels();
  const { fullReading } = useFullReading();
  const [data, setData] = useState<BirthData>(DEFAULT_BIRTH);
  const [result, setResult] = useState<{ sign: SignName; lon: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit() {
    setError(null);
    if (data.timeUnknown) {
      setResult(null);
      setError(form('timeRequired'));
      return;
    }
    try {
      const chart = chartFromBirth({ ...data, timeUnknown: false });
      if (chart.ascendant == null) {
        setResult(null);
        setError(form('timeRequired'));
        return;
      }
      const s = signOf(chart.ascendant);
      setResult({ sign: s.n, lon: dms(chart.ascendant) });
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : ui('failed'));
    }
  }

  return (
    <>
      <h1 className="mb-2.5 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('title')}</h1>
      <p className="mb-7 max-w-[620px] text-body text-ink-secondary [text-wrap:pretty]">{t('lead')}</p>
      <BirthDataForm value={data} onChange={setData} onSubmit={onSubmit} allowUnknownTime={false} />
      {error && <p className="mt-3 text-caption text-asp-hard">{error}</p>}
      {!result && <EmptyOrrery caption={ui('emptyRising')} />}
      {result && (
        <section className="mt-12 border-t border-hairline pt-10">
          <h2 className="mb-5 text-h2 font-medium tracking-[-0.01em]">{t('result')}</h2>
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
          {fullReading && <SaveReportCta data={data} />}
        </section>
      )}
    </>
  );
}
