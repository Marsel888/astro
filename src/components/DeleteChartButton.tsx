'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export default function DeleteChartButton({ chartId }: { chartId: string }) {
  const t = useTranslations('account');
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy) return;
    if (!window.confirm(t('deleteChartConfirm'))) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/charts/${chartId}`, { method: 'DELETE' });
      if (!res.ok) {
        window.alert(t('deleteChartFailed'));
        return;
      }
      router.refresh();
    } catch {
      window.alert(t('deleteChartFailed'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:border-asp-hard hover:text-asp-hard disabled:opacity-50 sm:h-[34px]"
    >
      {busy ? t('deletingChart') : t('deleteChart')}
    </button>
  );
}
