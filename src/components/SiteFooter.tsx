'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CALCULATOR_NAV } from '@/lib/nav';

export default function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="border-t border-hairline px-5 sm:px-8">
      <div className="mx-auto grid max-w-[1080px] gap-8 py-10 sm:grid-cols-[1.1fr_1.4fr_0.7fr]">
        <div>
          <p className="text-h3 font-medium tracking-[-0.01em] text-ink">{t('brand.name')}</p>
          <p className="mt-1 max-w-[280px] font-mono text-caption text-ink-muted">{t('footer.blurb')}</p>
        </div>
        <nav aria-label={t('nav.calculators')}>
          <p className="mb-3 font-mono text-caption text-ink-muted">{t('nav.calculators')}</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-data text-ink-secondary">
            {CALCULATOR_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink">
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </nav>
        <nav aria-label={t('footer.legal')} className="flex flex-col gap-2 text-data text-ink-secondary">
          <p className="mb-1 font-mono text-caption text-ink-muted">{t('footer.legal')}</p>
          <Link href="/" className="hover:text-ink">
            {t('nav.home')}
          </Link>
          <Link href="/articles" className="hover:text-ink">
            {t('nav.articles')}
          </Link>
          <Link href="/daily-horoscope" className="hover:text-ink">
            {t('nav.horoscope')}
          </Link>
          <Link href="/dashboard" className="hover:text-ink">
            {t('nav.account')}
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            {t('legal.privacyTitle')}
          </Link>
          <Link href="/terms" className="hover:text-ink">
            {t('legal.termsTitle')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
