'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { BirthData } from '@/lib/places/defaults';
import { authClient } from '@/lib/auth-client';
import { stashBirth } from '@/lib/stashedBirth';

export default function SaveReportCta({ data, source }: { data: BirthData; source?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('resultUi');
  const { data: session } = authClient.useSession();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/charts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: data.date,
          time: data.time,
          timeUnknown: data.timeUnknown,
          source,
          place: {
            name: data.place.name,
            lat: data.place.lat,
            lon: data.place.lon,
            tz: data.place.tz,
          },
        }),
      });
      const json = (await res.json()) as { id?: string; error?: string; needAccount?: boolean };
      // The session can lapse between rendering the button and pressing it.
      if (res.status === 401 || json.needAccount) {
        stashBirth(pathname, data);
        router.push(`/sign-in?next=${encodeURIComponent(pathname)}`);
        return;
      }
      if (!res.ok || !json.id) throw new Error(json.error || t('saveError'));
      router.push('/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : t('saveError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col items-start gap-2 rounded-card border border-hairline bg-panel p-5 sm:items-center sm:p-6">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="h-11 rounded-control bg-gold px-6 text-[15px] font-medium text-deep hover:bg-gold-hover disabled:opacity-60"
      >
        {busy ? t('saving') : t('save')}
      </button>
      <p className="max-w-[480px] text-center text-[14px] leading-[1.5] text-ink-secondary">
        {session?.user ? t('saveHint') : t('saveHintGuest')}
      </p>
      {error && <p className="text-caption text-asp-hard">{error}</p>}
    </div>
  );
}
