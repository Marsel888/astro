import { getTranslations } from 'next-intl/server';
import { SIGNS, type SignName } from '@/lib/chart';
import { readingFor, type ReadingKind } from '@/lib/interpret/copy';
import { hasReadings } from '@/lib/interpret/packs';
import type { AppLocale } from '@/i18n/locales';

type Props = {
  kind: ReadingKind;
  locale: AppLocale;
};

/**
 * All twelve signs for one placement, rendered on the server.
 *
 * The readings existed already, but only ever appeared after somebody typed
 * their birth data in — so a search engine arriving at the moon sign calculator
 * found a form and one paragraph, about 180 words against roughly 2000 on the
 * pages that rank for it. The reader who lands here without calculating gets
 * something to read as well, which is the same problem from the other side.
 *
 * Only rendered where the readings are actually in the page's language.
 */
export default async function PlacementsBySign({ kind, locale }: Props) {
  if (!hasReadings(locale)) return null;

  const t = await getTranslations('calcCopy');
  const labels = await getTranslations('daily');
  const planet = kind === 'rising' ? t('risingNoun') : labels(`planet_${kind}` as 'planet_moon');

  const heading = (sign: SignName) => {
    const slug = sign.toLowerCase();
    const args = {
      planet,
      sign: labels(`sign_${slug}` as 'sign_aries'),
      inSign: t(`in_${slug}` as 'in_aries'),
    };
    return kind === 'rising' ? t('risingSignHeading', args) : t('bySignHeading', args);
  };

  return (
    <section className="mt-16 border-t border-hairline pt-10">
      <h2 className="text-h2 font-medium tracking-[-0.02em] text-ink">
        {t('bySignTitle', { planet })}
      </h2>
      <p className="mt-3 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">
        {t('bySignLead', { planet })}
      </p>

      <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {SIGNS.map(({ n }) => (
          <article key={n}>
            <h3 className="text-h3 font-medium text-ink">{heading(n as SignName)}</h3>
            <p className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">
              {readingFor(kind, n as SignName, locale)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
