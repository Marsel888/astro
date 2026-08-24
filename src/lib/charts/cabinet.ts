import { getTranslations } from 'next-intl/server';
import { cache } from 'react';
import { getSession } from '@/lib/auth-session';
import {
  dailyTranslator,
  ensureDailyHistory,
  listUserCharts,
  natalFromRow,
} from '@/lib/charts/daily';
import { requireUser } from '@/lib/requireUser';
import type { ChartResult } from '@/lib/astro';
import type { AppLocale } from '@/i18n/locales';

/**
 * Everything the cabinet pages share.
 *
 * The cabinet used to be one long page where every section updated in place, so
 * changing the main chart quietly rewrote something three screens away and read
 * as nothing happening. It is a set of pages now, and each of them needs the
 * same three things: the session, which chart is being read, and its positions.
 */
export type CabinetContext = {
  userId: string;
  email: string;
  rows: Awaited<ReturnType<typeof listUserCharts>>;
  primary: Awaited<ReturnType<typeof listUserCharts>>[number] | null;
  natal: ChartResult | null;
  astroT: Awaited<ReturnType<typeof dailyTranslator>>;
};

/*
 * The layout and the page below it render in the same request and need the same
 * rows, and a row carries a whole computed chart. Cached, the cabinet reads them
 * once instead of once per level.
 */
const cabinetRows = cache((userId: string) => listUserCharts(userId));

export async function loadCabinet(
  locale: AppLocale,
  returnTo: string,
  options: { withHistory?: boolean } = {},
): Promise<CabinetContext> {
  const session = requireUser(await getSession(), locale, returnTo);
  const rows = await cabinetRows(session.user.id);
  const primary = rows.find((row) => row.isPrimary) ?? rows[0] ?? null;

  // Only the horoscope pages need the day-by-day log filled in, and it is the
  // expensive part — leave it alone for the pages that just read positions.
  if (primary && options.withHistory) {
    await ensureDailyHistory(primary.id, session.user.id, locale);
  }

  return {
    userId: session.user.id,
    email: session.user.email,
    rows,
    primary,
    natal: primary ? natalFromRow(primary) : null,
    astroT: await dailyTranslator(locale),
  };
}

/** Title and noindex for any cabinet page. */
export async function cabinetMetadata(locale: AppLocale, key: string) {
  const t = await getTranslations({ locale, namespace: 'account' });
  return {
    title: `${t(key as 'title')} — ${t('title')}`,
    robots: { index: false, follow: false },
  };
}
