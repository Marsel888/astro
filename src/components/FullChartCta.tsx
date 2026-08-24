import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * Shown under a single-planet result.
 *
 * The Moon, Venus, Mars, Mercury and rising calculators exist because those are
 * separate searches with separate volume — but they all read one natal chart, and
 * nothing on the page said so. People ran several and could not tell whether they
 * were building up one picture or collecting unrelated answers. Saying it also
 * points at the birth chart, which is where an account starts.
 */
export default function FullChartCta() {
  const t = useTranslations('resultUi');

  return (
    <section className="mt-8 rounded-card border border-hairline bg-panel p-5 sm:p-6">
      <h3 className="text-h3 font-medium text-ink">{t('onePlacementTitle')}</h3>
      <p className="mt-2 max-w-[560px] text-body text-ink-secondary [text-wrap:pretty]">
        {t('onePlacementBody')}
      </p>
      <Link
        href="/birth-chart-calculator"
        className="mt-5 inline-flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
      >
        {t('onePlacementCta')}
      </Link>
    </section>
  );
}
