import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import AuthForm from '@/components/AuthForm';
import SiteHeader from '@/components/SiteHeader';
import { googleEnabled } from '@/lib/auth';
import { asLocale } from '@/i18n/routing';
import { safeNextPath } from '@/lib/safePath';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('signUpTitle'), robots: { index: false, follow: false } };
}

export default async function SignUpPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const q = await searchParams;
  const nextPath = safeNextPath(q.next);
  const t = await getTranslations('auth');

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <h1 className="mb-2 text-center text-[26px] font-medium tracking-[-0.02em] sm:text-h1">{t('signUpTitle')}</h1>
        <p className="mb-8 text-center text-body text-ink-secondary">{t('signUpLead')}</p>
        <AuthForm mode="sign-up" googleConfigured={googleEnabled} nextPath={nextPath} />
        <p className="mt-6 text-center text-data text-ink-secondary">
          {t('hasAccount')}{' '}
          <Link href={`/sign-in?next=${encodeURIComponent(nextPath)}`}>{t('signInLink')}</Link>
        </p>
      </main>
    </>
  );
}
