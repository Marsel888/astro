'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import DateField from '@/components/DateField';
import { Link } from '@/i18n/navigation';
import { HOROSCOPE_PATH, type HoroscopeSlug } from '@/lib/interpret/horoscope';

type Props = {
  slug?: HoroscopeSlug;
  born?: string;
};

export default function HoroscopeBornForm({ slug, born }: Props) {
  const t = useTranslations('horoscope');
  const locale = useLocale();
  const [date, setDate] = useState(born ?? '1994-03-12');
  const path = slug ? `${HOROSCOPE_PATH}/${slug}` : HOROSCOPE_PATH;
  // Always submit to the index. It resolves the date to its own sign and
  // redirects there, so a date entered on the wrong sign page cannot strand
  // the reader on a sign that is not theirs.
  const action = `/${locale}${HOROSCOPE_PATH}`;

  return (
    <form
      method="get"
      action={action}
      className="mt-8 rounded-card border border-hairline bg-panel p-4 sm:px-6 sm:py-5"
    >
      <p className="font-mono text-caption text-gold">{t('bornKicker')}</p>
      <h2 className="mt-2 text-h3 font-medium text-ink">{t('bornTitle')}</h2>
      <p className="mt-2 max-w-[560px] text-[14px] leading-[1.5] text-ink-secondary [text-wrap:pretty]">
        {t('bornLead')}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="sm:w-[188px]">
          <DateField value={date} onChange={setDate} />
          <input type="hidden" name="born" value={date} />
        </div>
        <button
          type="submit"
          className="h-11 rounded-control bg-gold px-6 text-[15px] font-medium text-deep transition-colors hover:bg-gold-hover"
        >
          {t('bornCta')}
        </button>
        {born ? (
          <Link
            href={path}
            className="flex h-11 items-center px-2 text-[14px] text-ink-secondary hover:text-ink"
          >
            {t('bornClear')}
          </Link>
        ) : null}
      </div>
      <p className="mt-3 max-w-[560px] text-[13px] leading-[1.45] text-ink-muted">{t('bornHint')}</p>
    </form>
  );
}
