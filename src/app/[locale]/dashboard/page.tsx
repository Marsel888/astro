import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import DeleteChartButton from '@/components/DeleteChartButton';
import { DownloadTextButton } from '@/components/ReportActions';
import SignOutButton from '@/components/SignOutButton';
import SiteHeader from '@/components/SiteHeader';
import { getSession } from '@/lib/auth-session';
import { claimPendingCharts } from '@/lib/charts/claim';
import {
  dailyTranslator,
  ensureDailyHistory,
  getOrCreateDailyReading,
  listDailyReadings,
  listUserCharts,
  localizedDailyDoc,
  natalFromRow,
} from '@/lib/charts/daily';
import { formatBirthDate, formatDayShort, todayInZone } from '@/lib/dates';
import { chartLabel } from '@/lib/interpret/daily';
import { reportToText } from '@/lib/interpret/report';
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
  for (const row of rows) {
    await ensureDailyHistory(row.id, session.user.id, locale);
  }
  const primary = rows[0] ?? null;
  const daily = primary ? await getOrCreateDailyReading(primary.id, session.user.id, locale) : null;
  const history = primary ? await listDailyReadings(primary.id, session.user.id) : [];
  const natal = primary ? natalFromRow(primary) : null;
  const preview = daily?.doc.sections[0]?.paragraphs[0] ?? null;
  const historyText = natal
    ? (
        await Promise.all(
          history.map(async (row) => {
            const doc = await localizedDailyDoc(natal, row.transits, row.date, locale);
            return reportToText(doc);
          }),
        )
      ).join('\n---\n\n')
    : '';

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
            <p className="text-body text-ink-secondary">
              {t('empty')}{' '}
              <Link href="/birth-chart-calculator" className="text-gold hover:text-ink">
                {t('calculate')}
              </Link>
            </p>
          ) : (
            <div className="overflow-hidden rounded-card border border-hairline bg-panel">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-3 border-b border-hairline px-5 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                >
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
              ))}
            </div>
          )}
        </section>

        {primary && history.length ? (
          <section>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[18px] font-medium tracking-[-0.02em]">{t('byDay')}</h2>
                <p className="mt-1 font-mono text-caption text-ink-muted">
                  {chartLabel(natalFromRow(primary), astroT) || t('natalLabel')} · {t('visitHint')}
                </p>
              </div>
              <DownloadTextButton
                filename={`meridian-daily-${primary.id.slice(0, 8)}.txt`}
                text={historyText}
                label={t('downloadDays')}
              />
            </div>
            <div className="overflow-hidden rounded-card border border-hairline bg-panel">
              {history.map((row) => (
                <Link
                  key={row.id}
                  href={`/chart/${primary.id}/day/${row.date}`}
                  className="flex flex-col gap-1 border-b border-hairline px-5 py-4 text-ink last:border-0 hover:bg-elevated sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-data">{formatDayShort(row.date, primary.tzName, locale)}</span>
                  <span className="font-mono text-caption text-ink-muted">{t('readDay')}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
