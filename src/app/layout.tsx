import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Inter, JetBrains_Mono, Lora } from 'next/font/google';
import Starfield from '@/components/Starfield';
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
  title: {
    default: 'Meridian — birth chart calculator',
    template: '%s — Meridian',
  },
  description:
    'Free natal chart calculator. Enter birth date, time and place for planetary positions, houses and aspects.',
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
