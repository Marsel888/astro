import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ChartPreferences from '@/components/ChartPreferences';
import DeleteChartButton from '@/components/DeleteChartButton';
import HoroscopeSky from '@/components/HoroscopeSky';
import ReadingCard from '@/components/ReadingCard';
import { DownloadLinkButton } from '@/components/ReportActions';
import SignOutButton from '@/components/SignOutButton';
import SiteHeader from '@/components/SiteHeader';
import TransitWheel from '@/components/TransitWheel';
import { toBodyPoints } from '@/lib/astro';
import type { SignName } from '@/lib/chart';
import { moonPhaseOf, skySnapshot } from '@/lib/interpret/horoscope';
import { getSession } from '@/lib/auth-session';
import { claimPendingCharts } from '@/lib/charts/claim';
import {
  dailyTranslator,
  ensureDailyHistory,
  getOrCreateDailyReading,
  listDailyReadings,
  listUserCharts,
  natalFromRow,
  summariseDays,
  tomorrowPreview,
  transitChartForDate,
} from '@/lib/charts/daily';
import { formatBirthDate, formatDayShort, todayInZone } from '@/lib/dates';
import { chartLabel } from '@/lib/interpret/daily';
import { requireUser } from '@/lib/requireUser';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

/** Past days shown inline before sending the reader to the full log. */
const RECENT_DAYS = 7;

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

  const primary = rows.find((row) => row.isPrimary) ?? rows[0] ?? null;
  if (primary) await ensureDailyHistory(primary.id, session.user.id, locale);

  const natal = primary ? natalFromRow(primary) : null;
  const daily = primary ? await getOrCreateDailyReading(primary.id, session.user.id, locale) : null;
  const tomorrow = natal ? await tomorrowPreview(natal, locale) : null;

  // The wheel and the sky strip are the parts that visibly move day to day.
  const transit = natal && daily ? transitChartForDate(natal, daily.date) : null;
  const sky = transit ? skySnapshot(transit) : null;
  const moonPhase = transit
    ? moonPhaseOf(
        transit.bodies.find((b) => b.key === 'sun')?.lon ?? 0,
        transit.bodies.find((b) => b.key === 'moon')?.lon ?? 0,
      )
    : null;
  const horoscopeT = await getTranslations('horoscope');
  const signLabel = (sign: SignName) => astroT(`sign_${sign.toLowerCase()}`);
  const planetLabel = (key: string) => astroT(`planet_${key}`);

  // Today is the card above, so the strip below is only what came before it and
  // the same day is never listed twice.
  const history = primary ? await listDailyReadings(primary.id, session.user.id) : [];
  const earlier = history.filter((row) => row.date !== daily?.date);
  const recent = natal ? await summariseDays(natal, earlier.slice(0, RECENT_DAYS), locale) : [];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('title')}</h1>
            <p className="mt-1 font-mono text-caption text-ink-muted">{session.user.email}</p>
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

        {daily && primary && natal && transit && sky ? (
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-start">
              <div>
                <p className="mb-3 font-mono text-caption text-ink-muted">{t('wheelHeading')}</p>
                <TransitWheel
                  natal={toBodyPoints(natal.bodies)}
                  transit={toBodyPoints(transit.bodies)}
                  cusps={natal.cusps ?? Array.from({ length: 12 }, (_, i) => i * 30)}
                  asc={natal.ascendant ?? 0}
                  mc={natal.mc ?? 90}
                  showHouses={!natal.timeUnknown}
                  label={t('wheelLabel')}
                  legendNatal={t('wheelNatal')}
                  legendTransit={t('wheelTransit')}
                />
                {natal.timeUnknown ? (
                  <p className="mt-3 text-caption text-ink-muted [text-wrap:pretty]">{t('wheelNoTime')}</p>
                ) : null}
              </div>

              <div>
                {moonPhase ? (
                  <div className="rounded-card border border-hairline bg-panel p-5">
                    <p className="font-mono text-caption text-gold">{t('moonPhaseKicker')}</p>
                    <p className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">
                      {horoscopeT(`phase_${moonPhase}` as 'phase_new')}
                    </p>
                  </div>
                ) : null}
                <HoroscopeSky
                  sky={sky}
                  signLabel={signLabel}
                  planetLabel={planetLabel}
                  heading={horoscopeT('skyHeading')}
                />
              </div>
            </div>

            {/* The whole reading, not a teaser. Opening the cabinet should be the
                act of reading today's sky, not a link to somewhere that has it. */}
            <ReadingCard
              kicker={`${t('todayKicker')} · ${chartLabel(natal, astroT) || t('natalLabel')}`}
              title={daily.doc.title}
              sections={daily.doc.sections}
              footer={
                <div className="mt-8 flex flex-wrap gap-3 border-t border-read-secondary/20 pt-6">
                  <Link
                    href={`/chart/${primary.id}/day/${daily.date}`}
                    className="flex h-11 items-center rounded-control border border-read-secondary/30 px-4 text-caption text-read-secondary hover:border-read hover:text-read"
                  >
                    {t('readToday')}
                  </Link>
                  <Link
                    href={`/chart/${primary.id}/report`}
                    className="flex h-11 items-center rounded-control border border-read-secondary/30 px-4 text-caption text-read-secondary hover:border-read hover:text-read"
                  >
                    {t('readReport')}
                  </Link>
                </div>
              }
            />

            {tomorrow ? (
              <div className="mt-4 rounded-card border border-hairline bg-panel p-5">
                <p className="font-mono text-caption text-gold">
                  {t('tomorrowKicker')} · {formatDayShort(tomorrow.date, primary.tzName, locale)}
                </p>
                <p className="mt-2 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">
                  {tomorrow.line ?? t('tomorrowQuiet')}
                </p>
              </div>
            ) : null}
          </section>
        ) : null}

        {primary && recent.length ? (
          <section className="mb-12">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-medium tracking-[-0.02em]">{t('previousDays')}</h2>
                <p className="mt-1 max-w-[560px] font-mono text-caption text-ink-muted">
                  {history.length === 1
                    ? t('daysKeptOne', { count: history.length })
                    : t('daysKeptMany', { count: history.length })}{' '}
                  · {t('previousHint')}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/chart/${primary.id}/history`}
                  className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
                >
                  {t('allDaysFull')}
                </Link>
                <DownloadLinkButton
                  href={`/api/charts/${primary.id}/history?locale=${locale}`}
                  label={t('downloadDays')}
                />
              </div>
            </div>
            <div className="overflow-hidden rounded-card border border-hairline bg-panel">
              {recent.map((row) => (
                <Link
                  key={row.id}
                  href={`/chart/${primary.id}/day/${row.date}`}
                  className="flex flex-col gap-1 border-b border-hairline px-5 py-3.5 last:border-0 hover:bg-elevated sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <span className="shrink-0 font-mono text-caption text-ink-muted sm:w-[110px]">
                    {formatDayShort(row.date, primary.tzName, locale)}
                  </span>
                  <span className="text-data text-ink-secondary">{row.headline ?? t('quietDay')}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section>
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
                <div key={row.id} className="flex flex-col gap-3 border-b border-hairline px-5 py-4 last:border-0">
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
