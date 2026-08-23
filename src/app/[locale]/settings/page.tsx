import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import AccountDangerZone from '@/components/AccountDangerZone';
import SignOutButton from '@/components/SignOutButton';
import SiteHeader from '@/components/SiteHeader';
import { getSession } from '@/lib/auth-session';
import { requireUser } from '@/lib/requireUser';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  const t = await getTranslations({ locale: asLocale(raw), namespace: 'account' });
  return { title: t('settingsTitle'), robots: { index: false, follow: false } };
}

export default async function SettingsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const session = requireUser(await getSession(), locale, '/settings');
  const t = await getTranslations('account');

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <h1 className="mb-6 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('settings')}</h1>
        <div className="rounded-card border border-hairline bg-panel p-5">
          <p className="font-mono text-caption text-ink-muted">email</p>
          <p className="mt-1 text-data text-ink">{session.user.email}</p>
        </div>
        <p className="mt-6 text-body text-ink-secondary [text-wrap:pretty]">{t('settingsLead')}</p>
        <AccountDangerZone />
        <div className="mt-8 flex gap-3">
          <Link
            href="/dashboard"
            className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
          >
            {t('title')}
          </Link>
          <SignOutButton />
        </div>
      </main>
    </>
  );
}
