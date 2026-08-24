import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { formatBirthDate } from '@/lib/dates';
import type { AppLocale } from '@/i18n/locales';

type Props = {
  birthDate: string;
  birthTime: string | null;
  timeUnknown: boolean;
  placeLabel: string | null;
  locale: AppLocale;
  /** More than one chart saved, so it is worth saying which one this is about. */
  showSwitch: boolean;
};

/**
 * Which chart the page in front of you is reading.
 *
 * Every cabinet page repeats it. It is the line that was missing when a chart
 * saved a minute earlier looked identical to any other, and it is the only thing
 * that tells you the main-chart switch did anything.
 */
export default function CabinetChartHeader({
  birthDate,
  birthTime,
  timeUnknown,
  placeLabel,
  locale,
  showSwitch,
}: Props) {
  const t = useTranslations('account');

  return (
    <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-caption text-gold">
      <span>
        {formatBirthDate(birthDate, locale)}
        {' · '}
        {timeUnknown ? t('noTimeShort') : birthTime}
        {placeLabel ? ` · ${placeLabel}` : ''}
      </span>
      {showSwitch && (
        <Link href="/dashboard/charts" className="text-ink-muted hover:text-ink">
          {t('switchChart')} →
        </Link>
      )}
    </p>
  );
}
