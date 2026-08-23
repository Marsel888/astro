import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, redirect } from '@/i18n/navigation';
import ReportActions from '@/components/ReportActions';
import ReportView from '@/components/ReportView';
import SiteHeader from '@/components/SiteHeader';
import { getSession } from '@/lib/auth-session';
import { claimPendingCharts } from '@/lib/charts/claim';
import { getOrCreateNatalReport } from '@/lib/charts/report';
import { requireUser } from '@/lib/requireUser';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  const t = await getTranslations({ locale: asLocale(raw), namespace: 'account' });
  return { title: t('natalReport'), robots: { index: false, follow: false } };
}

export default async function ReportPage({ params }: Props) {
  const { locale: raw, id } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const session = requireUser(await getSession(), locale, `/chart/${id}/report`);
  await claimPendingCharts(session.user.id);
  const t = await getTranslations('account');
  const result = await getOrCreateNatalReport(id, session.user.id, locale);
  if (!result) {
    redirect({ href: '/dashboard', locale });
    throw new Error('redirect');
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <div className="mb-6 flex flex-col gap-3 no-print sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="text-data text-ink-secondary hover:text-ink">
              ← {t('backCabinet')}
            </Link>
            <Link href={`/chart/${id}/history`} className="text-data text-ink-secondary hover:text-ink">
              {t('byDay')}
            </Link>
          </div>
          <ReportActions doc={result.doc} filename={`meridian-natal-${id.slice(0, 8)}.txt`} />
        </div>
        <ReportView doc={result.doc} />
      </main>
    </>
  );
}
