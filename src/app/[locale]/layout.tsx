import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Noto_Sans_JP, Noto_Sans_KR } from 'next/font/google';
import SiteFooter from '@/components/SiteFooter';
import { asLocale, routing } from '@/i18n/routing';
import { clientMessages } from '@/i18n/clientMessages';

const notoJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-noto-jp',
});
const notoKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-noto-kr',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const cjk = locale === 'ja' ? notoJp.className : locale === 'ko' ? notoKr.className : '';
  return (
    <NextIntlClientProvider messages={clientMessages(messages)}>
      <div className={cjk || undefined}>
        {children}
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
