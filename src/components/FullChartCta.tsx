'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { stashBirth } from '@/lib/stashedBirth';
import type { BirthData } from '@/lib/places/defaults';

/**
 * Shown under a single-planet result.
 *
 * The Moon, Venus, Mars, Mercury and rising calculators exist because those are
 * separate searches with separate volume — but they all read one natal chart, and
 * nothing on the page said so. People ran several and could not tell whether they
 * were building up one picture or collecting unrelated answers. Saying it also
 * points at the birth chart, which is where an account starts.
 *
 * It used to sit above the save button, in the same gold as the save button, and
 * it took the reader to a different calculator. Somebody who meant to keep their
 * Mars pressed it, entered their data again on the birth chart page, saved there,
 * and their cabinet opened every placement — the save had recorded the whole
 * chart, because that is what they had ended up on. Secondary now, and placed
 * after the thing most people came to do.
 *
 * It also carries the birth data across, so taking the offer costs one click
 * rather than typing a date, a time and a city a second time.
 */
export default function FullChartCta({ data }: { data?: BirthData }) {
  const t = useTranslations('resultUi');

  return (
    <section className="mt-8 rounded-card border border-hairline bg-panel p-5 sm:p-6">
      <h3 className="text-h3 font-medium text-ink">{t('onePlacementTitle')}</h3>
      <p className="mt-2 max-w-[560px] text-body text-ink-secondary [text-wrap:pretty]">
        {t('onePlacementBody')}
      </p>
      <Link
        href="/birth-chart-calculator"
        onClick={() => data && stashBirth('/birth-chart-calculator', data)}
        className="mt-5 inline-flex h-11 items-center rounded-control border border-hairline-strong px-5 text-[15px] text-ink-secondary hover:border-ink-muted hover:text-ink"
      >
        {t('onePlacementCta')}
      </Link>
    </section>
  );
}
