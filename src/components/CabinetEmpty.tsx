import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Props = {
  /** The calculator this tab is about. Defaults to the whole chart. */
  href?: string;
  /** Its name, so the button says where it goes. */
  label?: string;
};

/**
 * Shown on a cabinet page while no chart has been saved yet.
 *
 * It used to offer the natal calculator whatever tab you were on. Somebody with
 * an empty cabinet opened the Mars tab, pressed the only button there, and
 * arrived at the birth chart calculator — then calculated, saved, and found
 * every placement open.
 *
 * One button, for the tab you are on. The whole chart has a tab of its own, so
 * offering it again from every other one was the same page pushed six times.
 */
export default function CabinetEmpty({ href, label }: Props) {
  const t = useTranslations('account');

  return (
    <div className="rounded-card border border-hairline bg-panel p-6 sm:p-8">
      <h2 className="text-h3 font-medium text-ink">{t('emptyTitle')}</h2>
      <p className="mt-2 max-w-[520px] text-body text-ink-secondary [text-wrap:pretty]">
        {t('emptyBody')}
      </p>
      <Link
        href={href ?? '/birth-chart-calculator'}
        className="mt-5 inline-flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
      >
        {label ? t('openNamedCalculator', { what: label }) : t('emptyCta')}
      </Link>
    </div>
  );
}
