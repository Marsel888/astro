'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignOutButton() {
  const t = useTranslations('account');
  const router = useRouter();

  async function onClick() {
    await authClient.signOut();
    router.push('/birth-chart-calculator');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:border-ink-muted hover:text-ink sm:h-[34px]"
    >
      {t('signOut')}
    </button>
  );
}
