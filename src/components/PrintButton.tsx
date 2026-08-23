'use client';

import { useTranslations } from 'next-intl';

export default function PrintButton() {
  const t = useTranslations('common');
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="h-11 rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
    >
      {t('print')}
    </button>
  );
}
