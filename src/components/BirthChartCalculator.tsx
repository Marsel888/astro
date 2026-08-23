'use client';

import { useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import BirthDataForm from '@/components/BirthDataForm';
import ChartWheel from '@/components/ChartWheel';
import {
  formatCoord,
  toBodyPoints,
  type ChartResult,
} from '@/lib/astro';
import { chartFromBirth } from '@/lib/astro/fromBirth';
import { EL, dms, signOf, type SignName } from '@/lib/chart';
import { DEFAULT_BIRTH, type BirthData } from '@/lib/places/defaults';
import {
  natalParagraphs,
  placementReading,
  readingFor,
} from '@/lib/interpret/copy';
import EmptyOrrery from '@/components/EmptyOrrery';
import ReadingCard from '@/components/ReadingCard';
import SignEmblem from '@/components/SignEmblem';
import SaveReportCta from '@/components/SaveReportCta';
import GuestCabinetCta, { useFullReading } from '@/components/GuestCabinetCta';
import { aspectReading } from '@/lib/interpret/aspects';
import { downloadSvgAsPng } from '@/lib/exportSvg';
import { useResultFocus } from '@/components/useResultFocus';
import { useAstroLabels } from '@/components/useAstroLabels';

const PERSONAL = ['mercury', 'venus', 'mars'] as const;

export default function BirthChartCalculator({ headingAs = 'h1' }: { headingAs?: 'h1' | 'h2' | 'none' } = {}) {
  const t = useTranslations('birthChart');
  const common = useTranslations('common');
  const { locale, ui, sign, planet, aspect } = useAstroLabels();
  const { fullReading } = useFullReading();
  const [data, setData] = useState<BirthData>(DEFAULT_BIRTH);
  const [chart, setChart] = useState<ChartResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspects, setAspects] = useState(true);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { ref: resultRef, focusResult } = useResultFocus<HTMLDivElement>();

  function onCalculate() {
    setError(null);
    try {
      setChart(chartFromBirth(data));
      focusResult();
    } catch (e) {
      setError(e instanceof Error ? e.message : ui('failed'));
    }
  }

  const bodies = useMemo(() => (chart ? toBodyPoints(chart.bodies) : []), [chart]);

  const rows = useMemo(() => {
    if (!chart) return [];
    const planetRows = chart.bodies.map((p) => {
      const s = signOf(p.lon);
      return {
        key: p.key,
        glyph: p.glyph,
        body: planet(p.key),
        sign: s.n as SignName,
        signLabel: sign(s.n),
        elColor: EL[s.el],
        lon: dms(p.lon),
        house: p.house ? String(p.house) : '—',
        motion: p.retrograde ? ui('retrograde') : ui('direct'),
        speed: toBodyPoints([p])[0].sp,
        retro: p.retrograde,
        reading: placementReading(p.key, s.n, p.house, locale),
      };
    });
    if (chart.ascendant != null) {
      const s = signOf(chart.ascendant);
      planetRows.push({
        key: 'ascendant',
        glyph: 'AC',
        body: ui('ascendant'),
        sign: s.n,
        signLabel: sign(s.n),
        elColor: EL[s.el],
        lon: dms(chart.ascendant),
        house: '1',
        motion: '—',
        speed: '—',
        retro: false,
        reading: chart.timeUnknown ? [] : [readingFor('rising', s.n, locale)],
      });
    }
    if (chart.mc != null) {
      const s = signOf(chart.mc);
      planetRows.push({
        key: 'mc',
        glyph: 'MC',
        body: ui('midheaven'),
        sign: s.n,
        signLabel: sign(s.n),
        elColor: EL[s.el],
        lon: dms(chart.mc),
        house: '10',
        motion: '—',
        speed: '—',
        retro: false,
        reading: [],
      });
    }
    return planetRows;
  }, [chart, locale, planet, sign, ui]);

  const sun = chart?.bodies.find((b) => b.key === 'sun');
  const moon = chart?.bodies.find((b) => b.key === 'moon');
  const risingSign = chart?.ascendant != null ? signOf(chart.ascendant) : null;
  const personal = chart?.bodies.filter((b) => PERSONAL.includes(b.key as (typeof PERSONAL)[number])) ?? [];
  const natalAspects = chart?.aspects ?? [];

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

      <BirthDataForm value={data} onChange={setData} onSubmit={onCalculate} />
      {error && <p className="mt-3 text-caption text-asp-hard">{error}</p>}

      {!chart && (
        <EmptyOrrery caption={ui('emptyNatal')} />
      )}

      {chart && (
        <>
          <div
            ref={resultRef}
            tabIndex={-1}
            className="mt-12 scroll-mt-4 border-t border-hairline pt-10 outline-none sm:mt-14 sm:pt-11"
          >
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-h2 font-medium tracking-[-0.01em]">{t('result')}</h2>
              <span className="font-mono text-caption text-ink-muted">
                {data.date} · {data.timeUnknown ? common('timeUnknown') : data.time} · {data.place.tz} ·{' '}
                {formatCoord(chart.lat, chart.lon)} ·{' '}
                {chart.houseSystemResolved === 'porphyry' ? common('porphyry') : common('placidus')} ·{' '}
                {common('tropical')}
              </span>
            </div>
            {chart.houseSystemResolved === 'porphyry' && (
              <p className="mt-2 text-caption text-ink-muted [text-wrap:pretty]">{common('houseFallbackNote')}</p>
            )}
          </div>

          <div key={chart.jd} ref={wheelRef} className="flex justify-center">
            <ChartWheel
              bodies={bodies}
              cusps={chart.cusps ?? Array.from({ length: 12 }, (_, i) => i * 30)}
              asc={chart.ascendant ?? 0}
              mc={chart.mc ?? 90}
              showAspects={aspects}
              showHouses={!chart.timeUnknown}
              maxSize={560}
              label={ui('wheelLabel')}
            />
          </div>

          <div className="mb-10 mt-1 flex justify-center gap-5">
            <button
              type="button"
              onClick={() => setAspects((v) => !v)}
              className="h-11 rounded-control border border-hairline-strong px-3.5 text-caption text-ink-secondary hover:border-ink-muted hover:text-ink sm:h-[34px]"
            >
              {aspects ? common('hideAspects') : common('showAspects')}
            </button>
            <button
              type="button"
              onClick={() => {
                const svg = wheelRef.current?.querySelector('svg');
                if (!svg) return;
                downloadSvgAsPng(svg, { filename: 'siderachart-natal-chart.png' }).catch(() =>
                  setError(ui('downloadFailed')),
                );
              }}
              className="h-11 rounded-control border border-hairline-strong px-3.5 text-caption text-ink-secondary hover:border-ink-muted hover:text-ink sm:h-[34px]"
            >
              {common('downloadPng')}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {sun && (
              <div className="result-enter flex items-center gap-4 rounded-card border border-hairline bg-panel p-4 sm:px-5 sm:py-5">
                <SignEmblem sign={sun.sign as SignName} />
                <div className="flex flex-col gap-1">
                  <span className="text-caption text-ink-muted">{ui('sun')}</span>
                  <span className="text-h3 text-ink">{sign(sun.sign)}</span>
                  <span className="font-mono text-data text-ink-secondary">
                    {dms(sun.lon)}
                    {sun.house ? ` · ${ui('house', { n: sun.house })}` : ''}
                  </span>
                </div>
              </div>
            )}
            {moon && (
              <div
                className="result-enter flex items-center gap-4 rounded-card border border-hairline bg-panel p-4 sm:px-5 sm:py-5"
                style={{ animationDelay: '0.08s' }}
              >
                <SignEmblem sign={moon.sign as SignName} />
                <div className="flex flex-col gap-1">
                  <span className="text-caption text-ink-muted">{ui('moon')}</span>
                  <span className="text-h3 text-ink">{sign(moon.sign)}</span>
                  <span className="font-mono text-data text-ink-secondary">
                    {dms(moon.lon)}
                    {moon.house ? ` · ${ui('house', { n: moon.house })}` : ''}
                  </span>
                </div>
              </div>
            )}
            <div
              className="result-enter flex items-center gap-4 rounded-card border border-hairline bg-panel p-4 sm:px-5 sm:py-5"
              style={{ animationDelay: '0.16s' }}
            >
              {risingSign && !chart.timeUnknown ? (
                <SignEmblem sign={risingSign.n} />
              ) : (
                <span className="text-[34px] leading-none text-gold">↑</span>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-caption text-ink-muted">{ui('rising')}</span>
                <span className="text-h3 text-ink">
                  {risingSign && !chart.timeUnknown ? sign(risingSign.n) : ui('unknown')}
                </span>
                <span className="font-mono text-data text-ink-secondary">
                  {chart.ascendant != null && !chart.timeUnknown
                    ? `${dms(chart.ascendant)} · ${ui('house', { n: 1 })}`
                    : ui('needsTime')}
                </span>
              </div>
            </div>
          </div>

          {sun && moon && (
            <ReadingCard
              kicker={chart.timeUnknown ? ui('readingNatalNoAsc') : ui('readingNatal')}
              title={`${sign(sun.sign)} · ${ui('sun')}, ${sign(moon.sign)} · ${ui('moon')}${
                risingSign && !chart.timeUnknown ? `, ${sign(risingSign.n)} · ${ui('rising')}` : ''
              }`}
              paragraphs={natalParagraphs({
                sun: sun.sign as SignName,
                moon: moon.sign as SignName,
                rising: risingSign && !chart.timeUnknown ? risingSign.n : null,
                sunHouse: sun.house,
                moonHouse: moon.house,
                locale,
                short: !fullReading,
              })}
              footer={<GuestCabinetCta />}
            />
          )}

          {fullReading && personal.length > 0 && (
            <ReadingCard
              kicker={ui('readingPersonal')}
              title={personal.map((p) => `${sign(p.sign)} · ${planet(p.key)}`).join(', ')}
              paragraphs={personal.flatMap((p) =>
                placementReading(p.key, p.sign as SignName, p.house, locale),
              )}
            />
          )}

          {fullReading && <SaveReportCta data={data} />}

          <h2 className="mb-1 mt-14 text-h2 font-medium tracking-[-0.01em]">{t('positions')}</h2>
          <p className="mb-4 font-mono text-data text-ink-muted">
            {ui('geocentric')} · JD {chart.jd.toFixed(5)} · {t('rowHint')}
          </p>

          <div className="overflow-hidden rounded-card border border-hairline bg-panel">
            <div className="hidden grid-cols-[1.4fr_1.1fr_1fr_0.7fr_0.9fr_1fr] border-b border-hairline px-5 py-3 text-caption text-ink-muted sm:grid">
              <span>{ui('body')}</span>
              <span>{ui('sign')}</span>
              <span>{ui('longitude')}</span>
              <span>{ui('houseCol')}</span>
              <span>{ui('motion')}</span>
              <span>{ui('speed')}</span>
            </div>
            {rows.map((r) => {
              const rowCells = (
                <>
                  <span className="flex items-center gap-2.5 text-ink">
                    <span className="text-[16px] text-gold">{r.glyph}</span>
                    {r.body}
                  </span>
                  <span className="sm:hidden">
                    {r.lon} {r.signLabel}
                  </span>
                  <span className="hidden sm:inline" style={{ color: r.elColor }}>
                    {r.signLabel}
                  </span>
                  <span className="hidden text-ink sm:inline">{r.lon}</span>
                  <span className="hidden sm:inline">{r.house}</span>
                  <span
                    className="hidden sm:inline"
                    style={{ color: r.retro ? 'var(--gold)' : 'var(--ink-muted)' }}
                  >
                    {r.motion}
                  </span>
                  <span className="hidden sm:inline">{r.speed}</span>
                </>
              );
              if (!fullReading) {
                return (
                  <div
                    key={r.key}
                    className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-hairline px-4 py-3 font-mono text-data text-ink-secondary last:border-0 sm:grid-cols-[1.4fr_1.1fr_1fr_0.7fr_0.9fr_1fr] sm:gap-0 sm:px-5"
                  >
                    {rowCells}
                  </div>
                );
              }
              return (
                <details
                  key={r.key}
                  className="group border-b border-hairline last:border-0 open:bg-elevated"
                >
                  <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-2 px-4 py-3 font-mono text-data text-ink-secondary hover:bg-elevated sm:grid-cols-[1.4fr_1.1fr_1fr_0.7fr_0.9fr_1fr] sm:gap-0 sm:px-5 [&::-webkit-details-marker]:hidden">
                    {rowCells}
                  </summary>
                  {r.reading.length > 0 ? (
                    <div className="flex flex-col gap-2.5 px-4 pb-4 sm:px-5 sm:pb-5">
                      {r.reading.map((p, i) => (
                        <p
                          key={`${r.key}-${i}`}
                          className="max-w-[640px] font-serif text-[15px] leading-[1.65] text-ink-secondary [text-wrap:pretty]"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="px-4 pb-4 font-mono text-caption text-ink-muted sm:px-5">
                      {r.body === ui('midheaven') ? ui('mcHint') : ui('noReading')}
                    </p>
                  )}
                </details>
              );
            })}
          </div>

          <h2 className="mb-1 mt-14 text-h2 font-medium tracking-[-0.01em]">{t('aspects')}</h2>
          <p className="mb-4 font-mono text-data text-ink-muted">{ui('orbs')}</p>
          <div className="overflow-hidden rounded-card border border-hairline bg-panel">
            {natalAspects.length === 0 && (
              <p className="px-5 py-4 font-mono text-caption text-ink-muted">{ui('noAspects')}</p>
            )}
            {natalAspects.map((row, i) => (
              <div
                key={`${row.a}-${row.b}-${row.type}-${i}`}
                className="border-b border-hairline px-4 py-3 last:border-0 sm:px-5"
              >
                <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 font-mono text-data">
                  <span className="text-ink">{planet(row.a.toLowerCase())}</span>
                  <span className="text-gold">
                    {row.symbol} {aspect(row.type)}
                  </span>
                  <span className="text-ink">{planet(row.b.toLowerCase())}</span>
                  <span className="text-ink-muted">
                    {row.orb.toFixed(1)}°{row.applying ? ` ${ui('applying')}` : ` ${ui('separating')}`}
                  </span>
                </div>
                {fullReading && (
                  <p className="mt-2 max-w-[640px] font-serif text-[15px] leading-[1.65] text-ink-secondary [text-wrap:pretty]">
                    {aspectReading(planet(row.a.toLowerCase()), planet(row.b.toLowerCase()), row.type, locale)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
