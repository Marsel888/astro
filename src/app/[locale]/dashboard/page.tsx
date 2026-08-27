import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import CabinetChartHeader from '@/components/CabinetChartHeader';
import CabinetEmpty from '@/components/CabinetEmpty';
import HoroscopeSky from '@/components/HoroscopeSky';
import ReadingCard from '@/components/ReadingCard';
import TransitWheel from '@/components/TransitWheel';
import { toBodyPoints } from '@/lib/astro';
import type { SignName } from '@/lib/chart';
import { cabinetMetadata, loadCabinet } from '@/lib/charts/cabinet';
import {
  getOrCreateDailyReading,
  tomorrowPreview,
  transitChartForDate,
} from '@/lib/charts/daily';
import { formatDayShort } from '@/lib/dates';
import { chartLabel } from '@/lib/interpret/daily';
import { moonPhaseOf, skySnapshot } from '@/lib/interpret/horoscope';
import { asLocale } from '@/i18n/routing';

// Reads the session, so it must never be prerendered or reused.
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return cabinetMetadata(asLocale((await params).locale), 'tabToday');
}

/** The cabinet opens here: today's sky against the chart, and a look at tomorrow. */
export default async function CabinetTodayPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations('account');
  const horoscopeT = await getTranslations('horoscope');

  const { userId, rows, primary, natal, astroT } = await loadCabinet(locale, '/dashboard', {
    withHistory: true,
  });
  if (!primary || !natal) return <CabinetEmpty />;

  const daily = await getOrCreateDailyReading(primary.id, userId, locale);
  if (!daily) return <CabinetEmpty />;

  const transit = transitChartForDate(natal, daily.date);
  const sky = skySnapshot(transit);
  const moonPhase = moonPhaseOf(
    transit.bodies.find((b) => b.key === 'sun')?.lon ?? 0,
    transit.bodies.find((b) => b.key === 'moon')?.lon ?? 0,
  );
  const tomorrow = await tomorrowPreview(natal, locale);
  const natalSun = natal.bodies.find((b) => b.key === 'sun') ?? null;

  const signLabel = (sign: SignName) => astroT(`sign_${sign.toLowerCase()}`);
  const planetLabel = (key: string) => astroT(`planet_${key}`);

  return (
    <>
      <CabinetChartHeader
        birthDate={primary.birthDate}
        birthTime={primary.birthTime}
        timeUnknown={primary.timeUnknown}
        placeLabel={primary.placeLabel}
        locale={locale}
        showSwitch={rows.length > 1}
      />

      {/* The public sign page sends people here looking for a sign horoscope.
          It is not missing — this is the same thing from a real chart. */}
      {natalSun ? (
        <div className="mb-8 max-w-[640px]">
          <p className="text-caption text-ink-muted [text-wrap:pretty]">
            {t('todayBridge', { sign: signLabel(natalSun.sign as SignName) })}
          </p>
          <Link
            href={`/daily-horoscope/${natalSun.sign.toLowerCase()}`}
            className="mt-1.5 inline-block font-mono text-caption text-gold hover:text-ink"
          >
            {t('comparePublic', { sign: signLabel(natalSun.sign as SignName) })} →
          </Link>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-start">
        <div>
          <h2 className="mb-1 text-[18px] font-medium tracking-[-0.02em]">{t('wheelHeading')}</h2>
          <p className="mb-2 text-caption text-ink-muted">{t('wheelExplain')}</p>
          <ul className="mb-4 flex max-w-[440px] flex-col gap-1.5 text-caption text-ink-muted">
            {(['wheelLayerRing', 'wheelLayerHouses', 'wheelLayerNatal', 'wheelLayerTransit'] as const).map(
              (key) => (
                <li key={key} className="flex gap-2 [text-wrap:pretty]">
                  <span aria-hidden className="shrink-0 text-ink-secondary">
                    ·
                  </span>
                  <span>{t(key)}</span>
                </li>
              ),
            )}
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
        </div>

        <div>
          <div className="rounded-card border border-hairline bg-panel p-5">
            <p className="font-mono text-caption text-gold">{t('moonPhaseKicker')}</p>
            <p className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">
              {horoscopeT(`phase_${moonPhase}` as 'phase_new')}
            </p>
          </div>
          <HoroscopeSky
            sky={sky}
            signLabel={signLabel}
            planetLabel={planetLabel}
            heading={horoscopeT('skyHeading')}
          />
        </div>
      </div>

      <ReadingCard
        kicker={`${t('todayKicker')} · ${chartLabel(natal, astroT) || t('natalLabel')}`}
        title={daily.doc.title}
        sections={daily.doc.sections}
      />

      <div className="mt-4 rounded-card border border-hairline bg-panel p-5">
        <p className="font-mono text-caption text-gold">
          {t('tomorrowKicker')} · {formatDayShort(tomorrow.date, primary.tzName, locale)}
        </p>
        <p className="mt-2 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">
          {tomorrow.line ?? t('tomorrowQuiet')}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/chart/${primary.id}/day/${daily.date}`}
          className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
        >
          {t('readToday')}
        </Link>
        <Link
          href={`/chart/${primary.id}/history`}
          className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
        >
          {t('allDaysFull')}
        </Link>
      </div>
    </>
  );
}
