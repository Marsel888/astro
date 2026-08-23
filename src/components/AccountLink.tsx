'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';

export default function AccountLink() {
  const t = useTranslations('nav');
  const { data: session, isPending } = authClient.useSession();
  const href = session?.user ? '/dashboard' : '/sign-in';
  const label = session?.user ? t('account') : t('signIn');

  return (
    <Link
      href={href}
      className="relative flex h-16 items-center text-data text-ink-secondary hover:text-ink"
    >
      {isPending ? t('signIn') : label}
    </Link>
  );
}
