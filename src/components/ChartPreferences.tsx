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
 * Per-chart controls: which chart the cabinet leads with, and how its houses are
 * divided.
 *
 * The house switch used to look inert. It does write and recompute, but on many
 * charts no planet crosses a cusp when the system changes — only the cusps
 * themselves move — and the cabinet showed no house numbers to compare. It now
 * says what the two systems are and warns when a chart has no houses to divide.
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
      router.refresh();
    } catch {
      setError(t('dangerError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
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

        <div
          role="group"
          aria-label={t('housesTitle')}
          className="flex h-11 overflow-hidden rounded-control border border-hairline-strong sm:h-[34px]"
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
              disabled={busy || timeUnknown || houseSystem === value}
              aria-pressed={houseSystem === value}
              onClick={() => patch({ houseSystem: value })}
              className={`px-3 text-caption transition-colors ${
                houseSystem === value
                  ? 'bg-gold text-deep'
                  : 'text-ink-secondary hover:bg-elevated hover:text-ink disabled:opacity-40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && <span className="text-caption text-asp-hard">{error}</span>}
      </div>

      <p className="max-w-[620px] text-caption text-ink-muted [text-wrap:pretty]">
        {timeUnknown ? t('housesNoTime') : t('housesBody')}
      </p>
    </div>
  );
}
