import type { Metadata, Viewport } from 'next';
import { getLocale } from 'next-intl/server';
import { Inter, JetBrains_Mono, Lora } from 'next/font/google';
import Starfield from '@/components/Starfield';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${inter.variable} ${mono.variable} ${lora.variable}`}>
      <body>
        <Starfield />
        {children}
      </body>
    </html>
  );
}
