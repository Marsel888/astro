import { redirect } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata() {
  return { robots: { index: false, follow: false } };
}

export default async function ChartPage({ params }: Props) {
  const { locale: raw, id } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  redirect({ href: `/chart/${id}/report`, locale });
}
