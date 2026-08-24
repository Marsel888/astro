import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import CabinetEmpty from '@/components/CabinetEmpty';
import ChartPreferences from '@/components/ChartPreferences';
import DeleteChartButton from '@/components/DeleteChartButton';
import { DownloadLinkButton } from '@/components/ReportActions';
import { cabinetMetadata, loadCabinet } from '@/lib/charts/cabinet';
import { natalFromRow } from '@/lib/charts/daily';
import { FULL_CHART, opensEverything, unlockedPlacements } from '@/lib/charts/placements';
import { formatBirthDate, todayInZone } from '@/lib/dates';
import { chartLabel } from '@/lib/interpret/daily';
import { asLocale } from '@/i18n/routing';

/** Which tab's name to print for each thing a chart holds. */
const TAB_OF: Record<string, string> = {
  [FULL_CHART]: 'tabChart',
  rising: 'tabRising',
  moon: 'tabMoon',
  mercury: 'tabMercury',
  venus: 'tabVenus',
  mars: 'tabMars',
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return cabinetMetadata(asLocale((await params).locale), 'tabCharts');
}

/** Saved charts, and the settings that belong to each one. */
export default async function CabinetChartsPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations('account');

  const { rows, primary, astroT } = await loadCabinet(locale, '/dashboard/charts');
  if (!rows.length) return <CabinetEmpty />;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-[560px] text-caption text-ink-muted [text-wrap:pretty]">
          {t('chartsHint')}
        </p>
        <Link href="/birth-chart-calculator" className="font-mono text-caption text-gold hover:text-ink">
          {t('calculate')} →
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((row) => {
          const isShown = row.id === primary?.id;
          // What the reader actually asked for, so a saved Moon reads as a Moon.
          const held = opensEverything(row) ? [FULL_CHART] : [...unlockedPlacements(row)];
          return (
            <div
              key={row.id}
              className={`rounded-card border bg-panel p-5 ${isShown ? 'border-gold/40' : 'border-hairline'}`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-data text-ink">
                    {formatBirthDate(row.birthDate, locale)}
                    {' · '}
                    {row.timeUnknown ? t('noTimeShort') : row.birthTime}
                    {row.placeLabel ? ` · ${row.placeLabel}` : ''}
                  </p>
                  <p className="mt-1 font-mono text-caption text-ink-muted">
                    {chartLabel(natalFromRow(row), astroT) || t('natalLabel')}
                    {isShown ? ` · ${t('shownInCabinet')}` : ''}
                  </p>
                  {held.length ? (
                    <p className="mt-2 flex flex-wrap gap-1.5">
                      {held.map((key) => (
                        <span
                          key={key}
                          className="rounded-full border border-hairline-strong px-2.5 py-0.5 text-[12px] text-ink-secondary"
                        >
                          {t(TAB_OF[key] as 'tabMoon')}
                        </span>
                      ))}
                    </p>
                  ) : null}
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
                  <DownloadLinkButton
                    href={`/api/charts/${row.id}/history?locale=${locale}`}
                    label={t('downloadDays')}
                  />
                  <DeleteChartButton chartId={row.id} />
                </div>
              </div>
              <div className="mt-4 border-t border-hairline pt-4">
                <ChartPreferences
                  chartId={row.id}
                  houseSystem={row.houseSystem}
                  isPrimary={rows.length > 1 && isShown}
                  canBePrimary={rows.length > 1}
                  timeUnknown={row.timeUnknown}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
