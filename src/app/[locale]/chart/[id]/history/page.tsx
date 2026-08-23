import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, redirect } from '@/i18n/navigation';
import { DownloadLinkButton } from '@/components/ReportActions';
import SiteHeader from '@/components/SiteHeader';
import { getSession } from '@/lib/auth-session';
import { claimPendingCharts } from '@/lib/charts/claim';
import {
  dailyTranslator,
  ensureDailyHistory,
  listDailyReadings,
  natalFromRow,
} from '@/lib/charts/daily';
import { loadOwnedChart } from '@/lib/charts/report';
import { formatDayShort } from '@/lib/dates';
import { chartLabel } from '@/lib/interpret/daily';
import { requireUser } from '@/lib/requireUser';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  const t = await getTranslations({ locale: asLocale(raw), namespace: 'account' });
  return { title: t('historyTitle'), robots: { index: false, follow: false } };
}

export default async function ChartHistoryPage({ params }: Props) {
  const { locale: raw, id } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const session = requireUser(await getSession(), locale, `/chart/${id}/history`);
  await claimPendingCharts(session.user.id);
  const t = await getTranslations('account');
  const astroT = await dailyTranslator(locale);
  const chart = await loadOwnedChart(id, session.user.id);
  if (!chart) {
    redirect({ href: '/dashboard', locale });
    throw new Error('redirect');
  }

  await ensureDailyHistory(id, session.user.id, locale);
  const history = await listDailyReadings(id, session.user.id);
  const natal = natalFromRow(chart);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/dashboard" className="text-data text-ink-secondary hover:text-ink">
              ← {t('backCabinet')}
            </Link>
            <h1 className="mt-3 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('byDay')}</h1>
            <p className="mt-2 font-mono text-caption text-ink-muted">
              {chartLabel(natal, astroT) || t('natalLabel')}
              {chart.placeLabel ? ` · ${chart.placeLabel}` : ''}
            </p>
            <p className="mt-3 max-w-[560px] text-body text-ink-secondary [text-wrap:pretty]">{t('historyLead')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/chart/${id}/report`}
              className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
            >
              {t('readReport')}
            </Link>
            {history.length ? (
              <DownloadLinkButton
                href={`/api/charts/${id}/history?locale=${locale}`}
                label={t('downloadDays')}
              />
            ) : null}
          </div>
        </div>

        {!history.length ? (
          <p className="text-body text-ink-secondary">{t('historyEmpty')}</p>
        ) : (
          <div className="overflow-hidden rounded-card border border-hairline bg-panel">
            {history.map((row) => (
              <Link
                key={row.id}
                href={`/chart/${id}/day/${row.date}`}
                className="flex flex-col gap-1 border-b border-hairline px-5 py-4 text-ink last:border-0 hover:bg-elevated sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-data">{formatDayShort(row.date, chart.tzName, locale)}</span>
                <span className="font-mono text-caption text-ink-muted">{t('readDay')}</span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
