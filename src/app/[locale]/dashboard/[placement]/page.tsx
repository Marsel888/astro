import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import CabinetChartHeader from '@/components/CabinetChartHeader';
import CabinetEmpty from '@/components/CabinetEmpty';
import CabinetLocked from '@/components/CabinetLocked';
import ReadingCard from '@/components/ReadingCard';
import SignEmblem from '@/components/SignEmblem';
import { dms, signOf, type SignName } from '@/lib/chart';
import { cabinetMetadata, loadCabinet } from '@/lib/charts/cabinet';
import { placementReading, readingFor } from '@/lib/interpret/copy';
import { unlockedPlacements } from '@/lib/charts/placements';
import { asLocale } from '@/i18n/routing';

/**
 * One placement, one page — the cabinet's answer to each single-planet
 * calculator. Somebody who worked out their Moon on the site opens the Moon tab
 * and finds exactly that, instead of hunting a row in a table.
 */
const PLACEMENTS = {
  sun: { tab: 'tabSun', calculator: '/sun-sign-calculator' },
  rising: { tab: 'tabRising', calculator: '/rising-sign-calculator' },
  moon: { tab: 'tabMoon', calculator: '/moon-sign-calculator' },
  mercury: { tab: 'tabMercury', calculator: '/mercury-sign-calculator' },
  venus: { tab: 'tabVenus', calculator: '/venus-sign-calculator' },
  mars: { tab: 'tabMars', calculator: '/mars-sign-calculator' },
} as const;

type Placement = keyof typeof PLACEMENTS;

/** What to call this placement in a button. */
async function placementName(placement: Placement): Promise<string> {
  const labels = await getTranslations('daily');
  const ui = await getTranslations('resultUi');
  return placement === 'rising'
    ? ui('ascendant')
    : labels(`planet_${placement}` as 'planet_moon');
}
// Reads the session, so it must never be prerendered or reused.
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string; placement: string }> };

function isPlacement(value: string): value is Placement {
  return Object.prototype.hasOwnProperty.call(PLACEMENTS, value);
}

export function generateStaticParams() {
  return Object.keys(PLACEMENTS).map((placement) => ({ placement }));
}

export async function generateMetadata({ params }: Props) {
  const { locale: raw, placement } = await params;
  if (!isPlacement(placement)) return { robots: { index: false, follow: false } };
  return cabinetMetadata(asLocale(raw), PLACEMENTS[placement].tab);
}

export default async function CabinetPlacementPage({ params }: Props) {
  const { locale: raw, placement } = await params;
  if (!isPlacement(placement)) notFound();
  const locale = asLocale(raw);
  setRequestLocale(locale);

  const t = await getTranslations('account');
  const ui = await getTranslations('resultUi');
  const { rows, primary, natal, astroT } = await loadCabinet(locale, `/dashboard/${placement}`);
  if (!primary || !natal) {
    // The tab you are on decides which calculator is offered. Offering the natal
    // one from every tab is how somebody ends up saving the whole chart while
    // believing they saved a single placement.
    return (
      <CabinetEmpty
        href={PLACEMENTS[placement].calculator}
        label={await placementName(placement)}
      />
    );
  }

  const signLabel = (sign: SignName) => astroT(`sign_${sign.toLowerCase()}`);

  /*
   * The chart holds every placement, but the cabinet is a record of what was
   * asked for. A calculator never run leaves its tab empty with a way to fill it,
   * rather than answering a question nobody put.
   */
  if (!unlockedPlacements(primary).has(placement)) {
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
        <CabinetLocked
          title={t('placementLockedTitle', { calculator: t(`calc_${placement}` as 'calc_moon') })}
          body={t('placementLockedBody')}
          href={PLACEMENTS[placement].calculator}
          cta={t('openCalculator')}
        />
      </>
    );
  }

  // The ascendant is not a body, so it is read off the chart's angles instead.
  const rising = natal.ascendant != null && !natal.timeUnknown;
  const view =
    placement === 'rising'
      ? rising
        ? {
            label: ui('rising'),
            sign: signOf(natal.ascendant!).n,
            deg: dms(natal.ascendant!),
            house: 1 as number | null,
            reading: [readingFor('rising', signOf(natal.ascendant!).n, locale)],
          }
        : null
      : (() => {
          const body = natal.bodies.find((b) => b.key === placement);
          if (!body) return null;
          return {
            label: astroT(`planet_${body.key}`),
            sign: body.sign as SignName,
            deg: dms(body.lon),
            house: body.house,
            reading: placementReading(body.key, body.sign as SignName, body.house, locale),
          };
        })();

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

      {!view ? (
        // Only the ascendant can be missing, and only for a chart with no time.
        <div className="rounded-card border border-hairline bg-panel p-6">
          <p className="text-body text-ink-secondary [text-wrap:pretty]">{t('risingNeedsTime')}</p>
          <Link
            href="/rising-sign-calculator"
            className="mt-5 inline-flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
          >
            {t('risingRecalculate')}
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-5 rounded-card border border-hairline bg-panel p-5 sm:p-7">
            <SignEmblem sign={view.sign} size={88} />
            <div className="flex flex-col gap-1">
              <span className="text-caption text-ink-muted">{view.label}</span>
              <span className="text-h1 font-medium tracking-[-0.02em] text-ink">
                {signLabel(view.sign)}
              </span>
              <span className="font-mono text-data text-ink-secondary">
                {view.deg}
                {view.house ? ` · ${ui('house', { n: view.house })}` : ''}
              </span>
            </div>
          </div>

          {view.reading.length ? (
            <ReadingCard
              kicker={`${t('natalHeading')} · ${view.label}`}
              title={`${signLabel(view.sign)} · ${view.label}`}
              paragraphs={view.reading}
            />
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/chart"
              className="flex h-11 items-center rounded-control bg-gold px-5 text-caption font-medium text-deep hover:bg-gold-hover"
            >
              {t('tabChart')}
            </Link>
            <Link
              href={PLACEMENTS[placement].calculator}
              className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink"
            >
              {t('openCalculator')}
            </Link>
          </div>
        </>
      )}
    </>
  );
}
