'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';

export function useFullReading() {
  const { data: session, isPending } = authClient.useSession();
  return {
    fullReading: Boolean(session?.user),
    showGuestCta: !isPending && !session?.user,
  };
}

export default function GuestCabinetCta() {
  const t = useTranslations('resultUi');
  const { showGuestCta } = useFullReading();

  if (!showGuestCta) return null;

  return (
    <div className="mt-8 flex flex-col items-start gap-2 border-t border-read-secondary/20 pt-6">
      <Link
        href="/sign-in?next=/dashboard"
        className="inline-flex h-11 items-center rounded-control bg-gold px-6 text-[15px] font-medium text-deep hover:bg-gold-hover"
      >
        {t('cabinetCta')}
      </Link>
      <p className="max-w-[480px] font-sans text-[14px] leading-[1.5] text-read-secondary">
        {t('cabinetCtaHint')}
      </p>
    </div>
  );
}
