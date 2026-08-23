'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { stashBirth } from '@/lib/stashedBirth';
import type { BirthData } from '@/lib/places/defaults';

/**
 * What a guest sees where the save button would be.
 *
 * Saving needs an account, so rather than a button that fails, this states what
 * an account gives and offers both doors — register and sign in. The birth data
 * already on screen is kept in the browser on the way out, so coming back does
 * not mean typing it again.
 */
export default function SaveGate({ data }: { data: BirthData }) {
  const t = useTranslations('resultUi');
  const pathname = usePathname();
  const next = encodeURIComponent(pathname);

  const remember = () => stashBirth(pathname, data);

  return (
    <div className="mt-8 rounded-card border border-hairline bg-panel p-5 sm:p-6">
      <p className="font-mono text-caption text-gold">{t('saveGateKicker')}</p>
      <h3 className="mt-2 text-h3 font-medium text-ink">{t('saveGateTitle')}</h3>
      <p className="mt-2 max-w-[520px] text-body text-ink-secondary [text-wrap:pretty]">
        {t('saveGateBody')}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/sign-up?next=${next}`}
          onClick={remember}
          className="flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
        >
          {t('saveGateRegister')}
        </Link>
        <Link
          href={`/sign-in?next=${next}`}
          onClick={remember}
          className="flex h-11 items-center rounded-control border border-hairline-strong px-5 text-[15px] text-ink-secondary hover:text-ink"
        >
          {t('saveGateSignIn')}
        </Link>
      </div>
      <p className="mt-4 max-w-[520px] text-caption text-ink-muted [text-wrap:pretty]">
        {t('saveGateHint')}
      </p>
    </div>
  );
}
