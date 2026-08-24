'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

/**
 * Open a saved chart in the cabinet.
 *
 * This replaces a "make main" toggle that sat in each chart's settings. Saving a
 * chart now points the cabinet at it, so the only thing left to do is go back to
 * an older one — and that is opening it, not changing a preference. It shows up
 * only when there is more than one chart to choose between.
 */
export default function OpenInCabinet({ chartId }: { chartId: string }) {
  const t = useTranslations('account');
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function open() {
    setBusy(true);
    try {
      await fetch(`/api/charts/${chartId}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primary: true }),
      });
      router.push('/dashboard');
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={open}
      disabled={busy}
      className="flex h-11 items-center rounded-control bg-gold px-4 text-caption font-medium text-deep hover:bg-gold-hover disabled:opacity-50 sm:h-[34px]"
    >
      {t('openInCabinet')}
    </button>
  );
}
