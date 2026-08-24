import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import CabinetChartHeader from '@/components/CabinetChartHeader';
import CabinetEmpty from '@/components/CabinetEmpty';
import CabinetLocked from '@/components/CabinetLocked';
import ReadingCard from '@/components/ReadingCard';
import SignEmblem from '@/components/SignEmblem';
import { dms, signOf, type SignName } from '@/lib/chart';
import { cabinetMetadata, loadCabinet } from '@/lib/charts/cabinet';
import { opensEverything } from '@/lib/charts/placements';
import { natalParagraphs } from '@/lib/interpret/copy';
import { chartLabel } from '@/lib/interpret/daily';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return cabinetMetadata(asLocale((await params).locale), 'tabChart');
}

/** The whole natal chart: the Big Three, every placement, and the reading. */
export default async function CabinetChartPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations('account');
  const ui = await getTranslations('resultUi');

  const { rows, primary, natal, astroT } = await loadCabinet(locale, '/dashboard/chart');
  if (!primary || !natal) return <CabinetEmpty />;

  /*
   * Saving from a single-planet calculator is not asking for the whole chart.
   * The offer to compute it is the point of this tab until it has been taken up.
   */
  if (!opensEverything(primary)) {
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
          title={t('chartLockedTitle')}
          body={t('chartLockedBody')}
          href="/birth-chart-calculator"
          cta={t('calculate')}
        />
      </>
    );
  }

  const signLabel = (sign: SignName) => astroT(`sign_${sign.toLowerCase()}`);
  const planetLabel = (key: string) => astroT(`planet_${key}`);

  const sun = natal.bodies.find((b) => b.key === 'sun');
  const moon = natal.bodies.find((b) => b.key === 'moon');
  const rising = natal.ascendant != null && !natal.timeUnknown ? signOf(natal.ascendant).n : null;

  const bigThree = [
    sun && { key: 'sun', sign: sun.sign as SignName, deg: dms(sun.lon), house: sun.house },
    moon && { key: 'moon', sign: moon.sign as SignName, deg: dms(moon.lon), house: moon.house },
    rising && { key: 'rising', sign: rising, deg: dms(natal.ascendant!), house: 1 as number | null },
  ].filter(Boolean) as Array<{ key: string; sign: SignName; deg: string; house: number | null }>;

  const reading =
    sun && moon
      ? natalParagraphs({
          sun: sun.sign as SignName,
          moon: moon.sign as SignName,
          rising,
          sunHouse: sun.house,
          moonHouse: moon.house,
          locale,
        })
      : [];

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

      <p className="mb-6 max-w-[560px] text-caption text-ink-muted [text-wrap:pretty]">
        {t('natalHint')}
      </p>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
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

      <h2 className="mb-3 mt-10 text-[18px] font-medium tracking-[-0.02em]">{t('allPlacements')}</h2>
      <div className="overflow-hidden rounded-card border border-hairline bg-panel">
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

      {reading.length ? (
        <ReadingCard
          kicker={rising ? ui('readingNatal') : ui('readingNatalNoAsc')}
          title={chartLabel(natal, astroT) || t('natalLabel')}
          paragraphs={reading}
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
    </>
  );
}
