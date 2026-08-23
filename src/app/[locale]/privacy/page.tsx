import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import { asLocale } from '@/i18n/routing';
import { hreflangMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('privacyTitle'), ...hreflangMetadata(locale, '/privacy') };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-5 py-16 sm:px-8">
        <h1 className="text-h1 font-medium tracking-[-0.02em]">{t('privacyTitle')}</h1>
        <p className="mt-4 text-body text-ink-secondary [text-wrap:pretty]">{t('privacyBody')}</p>
      </main>
    </>
  );
}
