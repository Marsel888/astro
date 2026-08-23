import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ChartPreferences from '@/components/ChartPreferences';
import DeleteChartButton from '@/components/DeleteChartButton';
import SignOutButton from '@/components/SignOutButton';
import SiteHeader from '@/components/SiteHeader';
import { getSession } from '@/lib/auth-session';
import { claimPendingCharts } from '@/lib/charts/claim';
import {
  dailyTranslator,
  ensureDailyHistory,
  getOrCreateDailyReading,
  listUserCharts,
  natalFromRow,
} from '@/lib/charts/daily';
import { formatBirthDate, todayInZone } from '@/lib/dates';
import { chartLabel } from '@/lib/interpret/daily';
import { requireUser } from '@/lib/requireUser';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  const t = await getTranslations({ locale: asLocale(raw), namespace: 'account' });
  return { title: t('title'), robots: { index: false, follow: false } };
}

export default async function DashboardPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const session = requireUser(await getSession(), locale, '/dashboard');

  await claimPendingCharts(session.user.id);
  const t = await getTranslations('account');
  const astroT = await dailyTranslator(locale);
  const rows = await listUserCharts(session.user.id);

  // The chart the cabinet leads with. Explicit flag first, newest as the fallback
  // for accounts created before the flag existed.
  const primary = rows.find((row) => row.isPrimary) ?? rows[0] ?? null;

  // Only the primary chart backfills its history on a visit. Doing it for every
  // saved chart made the dashboard slower with each one the user kept.
  if (primary) await ensureDailyHistory(primary.id, session.user.id, locale);

  const daily = primary ? await getOrCreateDailyReading(primary.id, session.user.id, locale) : null;
  const preview = daily?.doc.sections[0]?.paragraphs[0] ?? null;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('title')}</h1>
            <p className="mt-1 font-mono text-caption text-ink-muted">{session.user.email}</p>
            <p className="mt-3 max-w-[560px] text-body text-ink-secondary [text-wrap:pretty]">{t('lead')}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/settings"
              className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
            >
              {t('settings')}
            </Link>
            <SignOutButton />
          </div>
        </div>

        {daily && primary ? (
          <section className="mb-10 rounded-card border border-hairline bg-panel p-5 sm:p-6">
            <p className="font-mono text-caption text-ink-muted">{t('todayKicker')}</p>
            <h2 className="mt-2 font-serif text-[22px] font-medium tracking-[-0.02em] text-ink">{daily.doc.title}</h2>
            {preview ? (
              <p className="mt-3 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">{preview}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/chart/${primary.id}/day/${daily.date}`}
                className="flex h-11 items-center rounded-control bg-gold px-4 text-caption font-medium text-deep hover:bg-gold-hover sm:h-[34px]"
              >
                {t('readToday')}
              </Link>
              <Link
                href={`/chart/${primary.id}/history`}
                className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
              >
                {t('allDays')}
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mb-10">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-[18px] font-medium tracking-[-0.02em]">{t('charts')}</h2>
            <Link href="/birth-chart-calculator" className="font-mono text-caption text-gold hover:text-ink">
              {t('calculate')}
            </Link>
          </div>

          {!rows.length ? (
            <div className="rounded-card border border-hairline bg-panel p-6 sm:p-8">
              <h3 className="text-h3 font-medium text-ink">{t('emptyTitle')}</h3>
              <p className="mt-2 max-w-[520px] text-body text-ink-secondary [text-wrap:pretty]">
                {t('emptyBody')}
              </p>
              <Link
                href="/birth-chart-calculator"
                className="mt-5 inline-flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
              >
                {t('emptyCta')}
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-card border border-hairline bg-panel">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-3 border-b border-hairline px-5 py-4 last:border-0"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-data text-ink">{chartLabel(natalFromRow(row), astroT) || t('natalLabel')}</p>
                      <p className="mt-1 font-mono text-caption text-ink-muted">
                        {formatBirthDate(row.birthDate, locale)}
                        {row.placeLabel ? ` · ${row.placeLabel}` : ''}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/chart/${row.id}/report`}
                        className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
                      >
                        {t('readReport')}
                      </Link>
                      <Link
                        href={`/chart/${row.id}/day/${todayInZone((row.computed as { tz?: string } | null)?.tz ?? row.tzName)}`}
                        className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
                      >
                        {t('todaySky')}
                      </Link>
                      <Link
                        href={`/chart/${row.id}/history`}
                        className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
                      >
                        {t('history')}
                      </Link>
                      <DeleteChartButton chartId={row.id} />
                    </div>
                  </div>
                  <ChartPreferences
                    chartId={row.id}
                    houseSystem={row.houseSystem}
                    isPrimary={row.id === primary?.id}
                    canBePrimary={rows.length > 1}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
