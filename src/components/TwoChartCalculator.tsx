'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import AccountGate from '@/components/AccountGate';
import BirthDataForm from '@/components/BirthDataForm';
import ChartWheel from '@/components/ChartWheel';
import EmptyOrrery from '@/components/EmptyOrrery';
import { aspectsBetween, compositeChart, formatCoord, toBodyPoints, type ChartResult } from '@/lib/astro';
import { chartFromBirth } from '@/lib/astro/fromBirth';
import { aspectReading } from '@/lib/interpret/aspects';
import { DEFAULT_BIRTH, NEW_YORK, type BirthData } from '@/lib/places/defaults';
import { useAstroLabels } from '@/components/useAstroLabels';

type Mode = 'synastry' | 'composite';

type Gate = {
  signedIn: boolean;
  allowed: boolean;
};

export default function TwoChartCalculator({ mode }: { mode: Mode }) {
  const t = useTranslations(mode);
  const form = useTranslations('form');
  const common = useTranslations('common');
  const gateCopy = useTranslations('gate');
  const { locale, ui, sign: signLabel, planet: planetLabel, aspect } = useAstroLabels();
  const [a, setA] = useState<BirthData>(DEFAULT_BIRTH);
  const [b, setB] = useState<BirthData>({
    ...DEFAULT_BIRTH,
    date: '1991-08-04',
    time: '19:24',
    place: NEW_YORK,
  });
  const [left, setLeft] = useState<ChartResult | null>(null);
  const [right, setRight] = useState<ChartResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectsOn, setAspectsOn] = useState(true);
  const [gate, setGate] = useState<Gate | null>(null);
  const [needAccount, setNeedAccount] = useState(false);

  const nextPath = mode === 'synastry' ? '/synastry-calculator' : '/composite-chart-calculator';

  useEffect(() => {
    fetch('/api/gates/relationship')
      .then((res) => res.json())
      .then((json: Gate) => {
        setGate(json);
        if (!json.signedIn && !json.allowed) setNeedAccount(true);
      })
      .catch(() => setGate({ signedIn: false, allowed: true }));
  }, []);

  const composite = useMemo(
    () => (mode === 'composite' && left && right ? compositeChart(left, right) : null),
    [mode, left, right],
  );
  const cross = useMemo(
    () => (mode === 'synastry' && left && right ? aspectsBetween(left.bodies, right.bodies) : []),
    [mode, left, right],
  );

  async function onSubmit() {
    setError(null);
    if (gate && !gate.signedIn && !gate.allowed) {
      setNeedAccount(true);
      return;
    }
    const res = await fetch('/api/gates/relationship', { method: 'POST' });
    const json = (await res.json().catch(() => ({}))) as Gate & { needAccount?: boolean };
    if (res.status === 403 || json.needAccount) {
      setNeedAccount(true);
      setGate({ signedIn: false, allowed: false });
      return;
    }
    try {
      setLeft(chartFromBirth(a));
      setRight(chartFromBirth(b));
    } catch (e) {
      setLeft(null);
      setRight(null);
      setError(e instanceof Error ? e.message : ui('failed'));
      return;
    }
    setGate({
      signedIn: Boolean(json.signedIn),
      allowed: Boolean(json.signedIn),
    });
    if (!json.signedIn) setNeedAccount(true);
  }

  const display = mode === 'composite' ? composite : left;
  const bodiesB = mode === 'synastry' && right ? toBodyPoints(right.bodies) : undefined;

  return (
    <>
      <h1 className="mb-2.5 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('title')}</h1>
      <p className="mb-7 max-w-[620px] text-body text-ink-secondary [text-wrap:pretty]">{t('lead')}</p>
      <div className="flex flex-col gap-4">
        <BirthDataForm value={a} onChange={setA} onSubmit={onSubmit} title={form('personA')} />
        <BirthDataForm value={b} onChange={setB} onSubmit={onSubmit} title={form('personB')} />
      </div>
      {error && <p className="mt-3 text-caption text-asp-hard">{error}</p>}
      {!display && !needAccount && (
        <EmptyOrrery caption={ui('emptyOverlay')} />
      )}
      {display && (
        <section className="mt-12 border-t border-hairline pt-10">
          <h2 className="mb-5 text-h2 font-medium tracking-[-0.01em]">{t('result')}</h2>
          <div key={`${left?.jd}-${right?.jd}`} className="flex justify-center">
            <ChartWheel
              bodies={toBodyPoints(display.bodies)}
              bodiesB={bodiesB}
              cusps={display.cusps ?? Array.from({ length: 12 }, (_, i) => i * 30)}
              asc={display.ascendant ?? 0}
              mc={display.mc ?? 90}
              showAspects={aspectsOn}
              showHouses={!display.timeUnknown}
              size={560}
            />
          </div>
          <div className="mb-8 mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setAspectsOn((v) => !v)}
              className="h-11 rounded-control border border-hairline-strong px-3.5 text-caption text-ink-secondary hover:border-ink-muted hover:text-ink sm:h-[34px]"
            >
              {aspectsOn ? common('hideAspects') : common('showAspects')}
            </button>
          </div>
          {mode === 'synastry' && (
            <>
              <h3 className="mb-3 text-h3 font-medium">{t('aspects')}</h3>
              <p className="mb-4 font-mono text-caption text-ink-muted">
                {a.place.name} · {b.place.name} · {formatCoord(left!.lat, left!.lon)}
              </p>
              <div className="overflow-hidden rounded-card border border-hairline bg-panel">
                {cross.slice(0, 24).map((row, i) => (
                  <div
                    key={`${row.a}-${row.b}-${row.type}-${i}`}
                    className="border-b border-hairline px-4 py-3 last:border-0 sm:px-5"
                  >
                    <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 font-mono text-data">
                      <span className="text-ink">{planetLabel(row.a.toLowerCase())}</span>
                      <span className="text-gold">
                        {row.symbol} {aspect(row.type)}
                      </span>
                      <span className="text-ink">{planetLabel(row.b.toLowerCase())}</span>
                      <span className="text-ink-muted">{row.orb.toFixed(1)}°</span>
                    </div>
                    <p className="mt-2 max-w-[640px] font-serif text-[15px] leading-[1.65] text-ink-secondary [text-wrap:pretty]">
                      {aspectReading(
                        planetLabel(row.a.toLowerCase()),
                        planetLabel(row.b.toLowerCase()),
                        row.type,
                        locale,
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          {mode === 'composite' && (
            <div className="overflow-hidden rounded-card border border-hairline bg-panel">
              {display.bodies.map((p) => (
                <div
                  key={p.key}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-hairline px-4 py-2.5 font-mono text-data last:border-0 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-5"
                >
                  <span className="text-ink">
                    {p.glyph} {planetLabel(p.key)}
                  </span>
                  <span className="text-ink-secondary">{signLabel(p.sign)}</span>
                  <span className="hidden text-ink sm:inline">{p.lon.toFixed(2)}°</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {needAccount ? (
        <AccountGate nextPath={nextPath} title={gateCopy('relTitle')} body={gateCopy('relBody')} />
      ) : null}
    </>
  );
}
