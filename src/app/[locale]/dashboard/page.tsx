import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ChartPreferences from '@/components/ChartPreferences';
import DeleteChartButton from '@/components/DeleteChartButton';
import HoroscopeSky from '@/components/HoroscopeSky';
import ReadingCard from '@/components/ReadingCard';
import { DownloadLinkButton } from '@/components/ReportActions';
import SignOutButton from '@/components/SignOutButton';
import SiteHeader from '@/components/SiteHeader';
import SignEmblem from '@/components/SignEmblem';
import TransitWheel from '@/components/TransitWheel';
import { toBodyPoints } from '@/lib/astro';
import { dms, signOf, type SignName } from '@/lib/chart';
import { natalParagraphs, placementReading, readingFor } from '@/lib/interpret/copy';
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

// Per-user and read from cookies, so it must never be served from a cache: a
// chart saved a moment ago has to be there on the next render.
export const dynamic = 'force-dynamic';

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
  const ui = await getTranslations('resultUi');
  const signLabel = (sign: SignName) => astroT(`sign_${sign.toLowerCase()}`);
  const planetLabel = (key: string) => astroT(`planet_${key}`);

  // Who the reader is, not just what today is doing to them. The cabinet showed
  // only the transit reading, so the natal interpretation they had just read on
  // the calculator vanished the moment they saved the chart.
  const natalSun = natal?.bodies.find((b) => b.key === 'sun') ?? null;
  const natalMoon = natal?.bodies.find((b) => b.key === 'moon') ?? null;
  const risingSign =
    natal?.ascendant != null && !natal.timeUnknown ? signOf(natal.ascendant).n : null;
  const bigThree =
    natal && natalSun && natalMoon
      ? [
          { key: 'sun', sign: natalSun.sign as SignName, deg: dms(natalSun.lon), house: natalSun.house },
          { key: 'moon', sign: natalMoon.sign as SignName, deg: dms(natalMoon.lon), house: natalMoon.house },
          ...(risingSign
            ? [{ key: 'rising', sign: risingSign, deg: dms(natal.ascendant!), house: 1 as number | null }]
            : []),
        ]
      : [];
  /*
   * If the chart was saved from a single-planet calculator, lead with that one
   * placement — it is the question the reader actually asked. The rest of the
   * chart is one disclosure away, not spread over the page uninvited.
   */
  const FOCUSABLE = ['rising', 'moon', 'mercury', 'venus', 'mars'] as const;
  const focusKey = FOCUSABLE.find((k) => k === primary?.source) ?? null;
  const focusBody = focusKey && focusKey !== 'rising'
    ? (natal?.bodies.find((b) => b.key === focusKey) ?? null)
    : null;
  const focus =
    focusKey === 'rising' && risingSign && natal?.ascendant != null
      ? {
          key: 'rising',
          label: ui('rising'),
          sign: risingSign,
          deg: dms(natal.ascendant),
          house: 1 as number | null,
          reading: [readingFor('rising', risingSign, locale)],
        }
      : focusBody
        ? {
            key: focusBody.key,
            label: planetLabel(focusBody.key),
            sign: focusBody.sign as SignName,
            deg: dms(focusBody.lon),
            house: focusBody.house,
            reading: placementReading(focusBody.key, focusBody.sign as SignName, focusBody.house, locale),
          }
        : null;

  const natalReading =
    natal && natalSun && natalMoon
      ? natalParagraphs({
          sun: natalSun.sign as SignName,
          moon: natalMoon.sign as SignName,
          rising: risingSign,
          sunHouse: natalSun.house,
          moonHouse: natalMoon.house,
          locale,
        })
      : [];

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

        {primary && natal && bigThree.length ? (
          <section className="mb-14">
            <h2 className="text-[18px] font-medium tracking-[-0.02em]">{t('natalHeading')}</h2>
            {/* Which chart this is. Without the birth data on screen there was no
                way to tell the cabinet was showing the one just saved. */}
            <p className="mt-1.5 font-mono text-caption text-gold">
              {formatBirthDate(primary.birthDate, locale)}
              {' · '}
              {primary.timeUnknown ? t('noTimeShort') : primary.birthTime}
              {primary.placeLabel ? ` · ${primary.placeLabel}` : ''}
            </p>
            <p className="mt-2 max-w-[560px] text-caption text-ink-muted [text-wrap:pretty]">
              {t('natalHint')}
            </p>
            {focus ? (
              <>
                <p className="mt-4 font-mono text-caption text-ink-muted">
                  {t('savedFrom', { calculator: t(`calc_${focus.key}` as 'calc_moon') })}
                </p>
                <div className="result-enter mt-3 flex items-center gap-5 rounded-card border border-hairline bg-panel p-5 sm:p-7">
                  <SignEmblem sign={focus.sign} size={88} />
                  <div className="flex flex-col gap-1">
                    <span className="text-caption text-ink-muted">{focus.label}</span>
                    <span className="text-h1 font-medium tracking-[-0.02em] text-ink">
                      {signLabel(focus.sign)}
                    </span>
                    <span className="font-mono text-data text-ink-secondary">
                      {focus.deg}
                      {focus.house ? ` · ${ui('house', { n: focus.house })}` : ''}
                    </span>
                  </div>
                </div>
                {focus.reading.length ? (
                  <ReadingCard
                    kicker={`${t('natalHeading')} · ${focus.label}`}
                    title={`${signLabel(focus.sign)} · ${focus.label}`}
                    paragraphs={focus.reading}
                  />
                ) : null}

                {/* Everything they did not ask for, offered rather than imposed. */}
                <div className="mt-6 rounded-card border border-hairline bg-panel p-5 sm:p-6">
                  <h3 className="text-h3 font-medium text-ink">{t('seeWholeChart')}</h3>
                  <p className="mt-2 max-w-[560px] text-body text-ink-secondary [text-wrap:pretty]">
                    {t('wholeChartBody')}
                  </p>
                  <Link
                    href={`/chart/${primary.id}/report`}
                    className="mt-5 inline-flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
                  >
                    {t('readReport')}
                  </Link>
                </div>
              </>
            ) : null}

            <div className={`grid gap-3 sm:grid-cols-3 sm:gap-4 ${focus ? 'mt-8' : 'mt-5'}`}>
              {bigThree.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center gap-4 rounded-card border border-hairline bg-panel p-4 sm:px-5 sm:py-5"
                >
                  <SignEmblem sign={row.sign} />
                  <div className="flex flex-col gap-1">
                    <span className="text-caption text-ink-muted">{ui(row.key as 'sun')}</span>
                    <span className="text-h3 text-ink">{signLabel(row.sign)}</span>
                    <span className="font-mono text-data text-ink-secondary">
                      {row.deg}
                      {row.house ? ` · ${ui('house', { n: row.house })}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Everything else, on request. Somebody who asked for their Moon gets
                their Moon above; the other nine are here if they want them, not
                spread across the page as a wall they did not ask for. */}
            <details className="group mt-4">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-caption text-ink-muted hover:text-ink [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="transition-transform group-open:rotate-90">
                  ›
                </span>
                {t('allPlacements')}
              </summary>
              <div className="mt-3 overflow-hidden rounded-card border border-hairline bg-panel">
              <div className="hidden grid-cols-[1.3fr_1.1fr_1fr_0.7fr] border-b border-hairline px-5 py-3 text-caption text-ink-muted sm:grid">
                <span>{ui('body')}</span>
                <span>{ui('sign')}</span>
                <span>{ui('longitude')}</span>
                <span>{ui('houseCol')}</span>
              </div>
              {natal.bodies.map((body) => (
                <div
                  key={body.key}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-hairline px-5 py-2.5 font-mono text-data text-ink-secondary last:border-0 sm:grid-cols-[1.3fr_1.1fr_1fr_0.7fr] sm:gap-0"
                >
                  <span className="flex items-center gap-2.5 text-ink">
                    <span className="text-[15px] text-gold">{body.glyph}</span>
                    {planetLabel(body.key)}
                  </span>
                  <span className="sm:hidden">
                    {signLabel(body.sign as SignName)} {dms(body.lon)}
                  </span>
                  <span className="hidden sm:inline">{signLabel(body.sign as SignName)}</span>
                  <span className="hidden text-ink sm:inline">{dms(body.lon)}</span>
                  <span className="hidden sm:inline">{body.house ?? '—'}</span>
                </div>
              ))}
              </div>
            </details>

            {natalReading.length && !focus ? (
              <ReadingCard
                kicker={risingSign ? ui('readingNatal') : ui('readingNatalNoAsc')}
                title={chartLabel(natal, astroT) || t('natalLabel')}
                paragraphs={natalReading}
                footer={
                  <div className="mt-8 border-t border-read-secondary/20 pt-6">
                    <Link
                      href={`/chart/${primary.id}/report`}
                      className="inline-flex h-11 items-center rounded-control border border-read-secondary/30 px-4 text-caption text-read-secondary hover:border-read hover:text-read"
                    >
                      {t('readReport')}
                    </Link>
                  </div>
                }
              />
            ) : null}
          </section>
        ) : null}

        {daily && primary && natal && transit && sky ? (
          <section className="mb-12">
            <h2 className="mb-5 text-[18px] font-medium tracking-[-0.02em]">{t('todayHeading')}</h2>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-start">
              <div>
                <h2 className="mb-1 text-[18px] font-medium tracking-[-0.02em]">{t('wheelHeading')}</h2>
                {/* Two rings of glyphs look nothing like the single-ring natal
                    wheel on the calculator. Say what the reader is looking at. */}
                <p className="mb-2 text-caption text-ink-muted">{t('wheelExplain')}</p>
                <ul className="mb-4 flex max-w-[440px] flex-col gap-1.5 text-caption text-ink-muted">
                  {(
                    [
                      ['wheelLayerRing', 'text-ink-secondary'],
                      ['wheelLayerHouses', 'text-ink-secondary'],
                      ['wheelLayerNatal', 'text-gold'],
                      ['wheelLayerTransit', 'text-ink-secondary'],
                    ] as const
                  ).map(([key, tone]) => (
                    <li key={key} className="flex gap-2 [text-wrap:pretty]">
                      <span aria-hidden className={`shrink-0 ${tone}`}>
                        ·
                      </span>
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
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
                <Link
                  href={`/chart/${primary.id}/report`}
                  className="mt-3 inline-block font-mono text-caption text-gold hover:text-ink"
                >
                  {t('wheelSeeNatal')} →
                </Link>
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
                      {/* Birth data first. It is what identifies a chart; the Sun
                          and Moon are the same for anyone born the same week. */}
                      <p className="text-data text-ink">
                        {formatBirthDate(row.birthDate, locale)}
                        {' · '}
                        {row.timeUnknown ? t('noTimeShort') : row.birthTime}
                        {row.placeLabel ? ` · ${row.placeLabel}` : ''}
                      </p>
                      <p className="mt-1 font-mono text-caption text-ink-muted">
                        {chartLabel(natalFromRow(row), astroT) || t('natalLabel')}
                        {row.id === primary?.id ? ` · ${t('shownInCabinet')}` : ''}
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
                    timeUnknown={row.timeUnknown}
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
