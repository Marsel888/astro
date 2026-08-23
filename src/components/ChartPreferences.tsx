'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

type Props = {
  chartId: string;
  houseSystem: string;
  isPrimary: boolean;
  canBePrimary: boolean;
};

/**
 * Per-chart controls that used to have no home: which chart the cabinet leads
 * with, and whether its houses are Placidus or whole sign.
 */
export default function ChartPreferences({ chartId, houseSystem, isPrimary, canBePrimary }: Props) {
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
            disabled={busy || houseSystem === value}
            aria-pressed={houseSystem === value}
            onClick={() => patch({ houseSystem: value })}
            className={`px-3 text-caption transition-colors ${
              houseSystem === value
                ? 'bg-gold text-deep'
                : 'text-ink-secondary hover:bg-elevated hover:text-ink disabled:opacity-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <span className="text-caption text-asp-hard">{error}</span>}
    </div>
  );
}
