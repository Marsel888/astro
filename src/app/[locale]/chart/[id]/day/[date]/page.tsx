import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, redirect } from '@/i18n/navigation';
import ReportActions from '@/components/ReportActions';
import ReportView from '@/components/ReportView';
import SiteHeader from '@/components/SiteHeader';
import { getSession } from '@/lib/auth-session';
import { claimPendingCharts } from '@/lib/charts/claim';
import { getOrCreateDailyReading } from '@/lib/charts/daily';
import { isIsoDate } from '@/lib/dates';
import { requireUser } from '@/lib/requireUser';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; id: string; date: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw, date } = await params;
  const t = await getTranslations({ locale: asLocale(raw), namespace: 'account' });
  return { title: t('dailyTitle', { date }), robots: { index: false, follow: false } };
}

export default async function DailyReadingPage({ params }: Props) {
  const { locale: raw, id, date } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const session = requireUser(await getSession(), locale, `/chart/${id}/day/${date}`);
  await claimPendingCharts(session.user.id);
  const t = await getTranslations('account');

  if (!isIsoDate(date)) {
    redirect({ href: '/dashboard', locale });
    throw new Error('redirect');
  }

  const result = await getOrCreateDailyReading(id, session.user.id, locale, date);
  if (!result) {
    redirect({ href: `/chart/${id}/history`, locale });
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
            <Link href={`/chart/${id}/report`} className="text-data text-ink-secondary hover:text-ink">
              {t('natalReport')}
            </Link>
          </div>
          <ReportActions doc={result.doc} filename={`siderachart-daily-${date}.txt`} />
        </div>
        <ReportView doc={result.doc} />
      </main>
    </>
  );
}
