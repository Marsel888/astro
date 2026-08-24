import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, JetBrains_Mono, Lora, Noto_Sans_JP, Noto_Sans_KR } from 'next/font/google';
import SiteFooter from '@/components/SiteFooter';
import Starfield from '@/components/Starfield';
import { SignEmblemDefs } from '@/components/SignEmblem';
import { clientMessages } from '@/i18n/clientMessages';
import { asLocale, routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import '../globals.css';

/*
 * This is the root layout.
 *
 * There used to be one above it, and it asked next-intl which language the page
 * was in. That resolves the request configuration before the locale segment has
 * had a chance to set it, and the answer is cached for the rest of the render —
 * so every page came out in English while its <title> stayed translated. The
 * locale is a route parameter here, so there is nothing to ask.
 */
const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'vietnamese'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-lora',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  // Every relative URL in the metadata tree resolves against this, including the
  // generated opengraph-image. Without it Next.js emits a relative og:image,
  // which social scrapers cannot fetch.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SideraChart — birth chart calculator',
    template: '%s — SideraChart',
  },
  description:
    'Free natal chart calculator. Enter birth date, time and place for planetary positions, houses and aspects.',
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// Paints the browser chrome to match the page instead of leaving a white bar
// above a very dark site on mobile.
export const viewport: Viewport = {
  themeColor: '#0b0e14',
  colorScheme: 'dark',
};

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
    <html lang={locale} className={`${inter.variable} ${mono.variable} ${lora.variable}`}>
      <body>
        <Starfield />
        <NextIntlClientProvider messages={clientMessages(messages)}>
          <div className={cjk || undefined}>
            <SignEmblemDefs />
            {children}
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
