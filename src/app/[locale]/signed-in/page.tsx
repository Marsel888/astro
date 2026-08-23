import { redirect } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getSession } from '@/lib/auth-session';
import { claimPendingCharts } from '@/lib/charts/claim';
import { asLocale } from '@/i18n/routing';
import { safeNextPath } from '@/lib/safePath';

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ next?: string }> };

export const metadata = { robots: { index: false, follow: false } };

export default async function SignedInPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const session = await getSession();
  const nextPath = safeNextPath((await searchParams).next);
  if (session) await claimPendingCharts(session.user.id);
  redirect({ href: session ? nextPath : '/sign-in', locale });
}
