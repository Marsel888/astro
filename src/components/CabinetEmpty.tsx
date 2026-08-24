import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/** Shown on every cabinet page while no chart has been saved yet. */
export default function CabinetEmpty() {
  const t = useTranslations('account');

  return (
    <div className="rounded-card border border-hairline bg-panel p-6 sm:p-8">
      <h2 className="text-h3 font-medium text-ink">{t('emptyTitle')}</h2>
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
  );
}
