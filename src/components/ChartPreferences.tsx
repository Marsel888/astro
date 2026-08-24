'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

type Props = {
  chartId: string;
  houseSystem: string;
  isPrimary: boolean;
  canBePrimary: boolean;
  /** No birth time means no houses at all, so the system cannot matter. */
  timeUnknown: boolean;
};

/**
 * Per-chart controls.
 *
 * "Make main" belongs on the surface — it decides what the cabinet opens with.
 * The house system does not: two unlabelled words next to a delete button read
 * as a mystery, and almost nobody needs to change it. It sits behind a
 * disclosure that names it, with an explanation written for someone who has
 * never heard of Placidus rather than for an astrologer.
 */
export default function ChartPreferences({
  chartId,
  houseSystem,
  isPrimary,
  canBePrimary,
  timeUnknown,
}: Props) {
  const t = useTranslations('account');
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // The controls were silent on success. On a chart where no planet changes
  // house between the two systems — most charts — that is indistinguishable
  // from a dead button.
  const [saved, setSaved] = useState<string | null>(null);

  async function patch(body: { primary?: boolean; houseSystem?: string }) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/charts/${chartId}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('failed');
      setSaved(t('savedOk'));
      window.setTimeout(() => setSaved(null), 4000);
      router.refresh();
    } catch {
      setError(t('dangerError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {isPrimary ? (
          <span className="flex h-11 items-center rounded-control border border-gold px-3 font-mono text-caption text-gold sm:h-[34px]">
            {t('primaryCurrent')}
          </span>
        ) : (
          canBePrimary && (
            <button
              type="button"
              disabled={busy}
              onClick={() => patch({ primary: true })}
              className="flex h-11 items-center rounded-control border border-hairline-strong px-3 text-caption text-ink-secondary hover:text-ink disabled:opacity-50 sm:h-[34px]"
            >
              {t('primarySet')}
            </button>
          )
        )}
        {error && <span className="text-caption text-asp-hard">{error}</span>}
        {saved && !error && <span className="text-caption text-asp-soft">{saved}</span>}
      </div>

      <details className="group">
        <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-caption text-ink-muted hover:text-ink [&::-webkit-details-marker]:hidden">
          <span aria-hidden className="transition-transform group-open:rotate-90">
            ›
          </span>
          {t('housesTitle')} · {houseSystem === 'whole-sign' ? t('housesWhole') : t('housesPlacidus')}
        </summary>

        <div className="mt-3 flex flex-col gap-3 border-l border-hairline pl-4">
          <p className="max-w-[620px] text-caption text-ink-secondary [text-wrap:pretty]">
            {timeUnknown ? t('housesNoTime') : t('housesBody')}
          </p>
          {!timeUnknown && (
            <div
              role="group"
              aria-label={t('housesTitle')}
              className="flex h-11 w-fit overflow-hidden rounded-control border border-hairline-strong sm:h-[34px]"
            >
              {(
                [
                  ['placidus', t('housesPlacidus')],
                  ['whole-sign', t('housesWhole')],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  disabled={busy || houseSystem === value}
                  aria-pressed={houseSystem === value}
                  onClick={() => patch({ houseSystem: value })}
                  className={`px-3 text-caption transition-colors ${
                    houseSystem === value
                      ? 'bg-gold text-deep'
                      : 'text-ink-secondary hover:bg-elevated hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          {saved && !error ? <p className="text-caption text-asp-soft">{saved}</p> : null}
        </div>
      </details>
    </div>
  );
}
