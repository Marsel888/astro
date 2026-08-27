'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { BirthData } from '@/lib/places/defaults';
import { authClient } from '@/lib/auth-client';
import { stashBirth } from '@/lib/stashedBirth';

/** Where the cabinet should open after keeping this. */
const TAB: Record<string, string> = {
  'birth-chart': '/dashboard/chart',
  rising: '/dashboard/rising',
  moon: '/dashboard/moon',
  mercury: '/dashboard/mercury',
  venus: '/dashboard/venus',
  mars: '/dashboard/mars',
};

/**
 * Keep this result.
 *
 * `label` names what is being kept, because the button read the same on every
 * calculator. Somebody who followed the full-chart offer from the Mars page and
 * pressed save there had no way to tell from the button that they were now
 * keeping the whole chart — and their cabinet opened every placement, which
 * looked like a bug in the saving rather than a wrong page.
 */
export default function SaveReportCta({
  data,
  source,
  label,
  wholeChart = false,
}: {
  data: BirthData;
  source?: string;
  label?: string;
  /** Offer to keep the whole chart from here, without moving to another page. */
  wholeChart?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('resultUi');
  const { data: session } = authClient.useSession();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(as?: string) {
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
          source: as,
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
      // Land on what was just kept, not on a general page that could be showing
      // anything: the answer to "did that work?" should be the first thing seen.
      router.push((as && TAB[as]) ?? '/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : t('saveError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col items-start gap-3 rounded-card border border-hairline bg-panel p-5 sm:items-center sm:p-6">
      <button
        type="button"
        onClick={() => save(source)}
        disabled={busy}
        className="h-11 rounded-control bg-gold px-6 text-[15px] font-medium text-deep hover:bg-gold-hover disabled:opacity-60"
      >
        {busy ? t('saving') : label ? t('saveNamed', { what: label }) : t('save')}
      </button>
      <p className="max-w-[480px] text-center text-[14px] leading-[1.5] text-ink-secondary">
        {session?.user ? t('saveHint') : t('saveHintGuest')}
      </p>

      {wholeChart ? (
        <div className="mt-2 w-full border-t border-hairline pt-4 text-center">
          <p className="mx-auto max-w-[520px] text-caption text-ink-muted [text-wrap:pretty]">
            {t('onePlacementBody')}
          </p>
          <button
            type="button"
            onClick={() => save('birth-chart')}
            disabled={busy}
            className="mt-3 h-11 rounded-control border border-hairline-strong px-5 text-[15px] text-ink-secondary hover:border-ink-muted hover:text-ink disabled:opacity-60"
          >
            {t('saveWholeChart')}
          </button>
        </div>
      ) : null}

      {error && <p className="text-caption text-asp-hard">{error}</p>}
    </div>
  );
}
