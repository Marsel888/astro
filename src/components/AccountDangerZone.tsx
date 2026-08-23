'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

/**
 * Data export and account erasure — GDPR art. 20 and art. 17.
 *
 * Deletion is guarded by typing the confirmation word rather than a modal,
 * because it takes every saved chart and the whole daily history with it.
 */
export default function AccountDangerZone() {
  const t = useTranslations('account');
  const router = useRouter();
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const word = t('dangerConfirmWord');
  const armed = confirm.trim().toUpperCase() === word;

  async function onDelete() {
    if (!armed || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: 'DELETE' }),
      });
      if (!res.ok) throw new Error('failed');
      router.push('/');
      router.refresh();
    } catch {
      setError(t('dangerError'));
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 flex flex-col gap-4">
      <section className="rounded-card border border-hairline bg-panel p-5">
        <h2 className="text-h3 font-medium text-ink">{t('exportTitle')}</h2>
        <p className="mt-2 max-w-[520px] text-body text-ink-secondary [text-wrap:pretty]">
          {t('exportBody')}
        </p>
        {/* A real navigation, not a route change: next/link would intercept it
            client-side and the file would never reach the browser. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/api/account/export"
          className="mt-4 inline-flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink"
        >
          {t('exportButton')}
        </a>
      </section>

      <section className="rounded-card border border-asp-hard/40 bg-panel p-5">
        <h2 className="text-h3 font-medium text-ink">{t('dangerTitle')}</h2>
        <p className="mt-2 max-w-[520px] text-body text-ink-secondary [text-wrap:pretty]">
          {t('dangerBody')}
        </p>
        <label className="mt-4 flex max-w-[320px] flex-col gap-1.5 text-caption text-ink-muted">
          {t('dangerConfirmLabel')}
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="h-11 w-full rounded-control border border-hairline-strong bg-deep px-3 text-ink caret-gold outline-none transition-colors focus:border-asp-hard"
          />
        </label>
        <button
          type="button"
          onClick={onDelete}
          disabled={!armed || busy}
          className="mt-4 h-11 rounded-control border border-asp-hard px-4 text-caption text-asp-hard transition-colors hover:bg-asp-hard hover:text-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-asp-hard"
        >
          {busy ? t('dangerBusy') : t('dangerButton')}
        </button>
        {error && <p className="mt-3 text-caption text-asp-hard">{error}</p>}
      </section>
    </div>
  );
}
