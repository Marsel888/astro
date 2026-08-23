'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import AccountLink from '@/components/AccountLink';
import BrandMark from '@/components/BrandMark';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { CALCULATOR_NAV } from '@/lib/nav';

export default function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === '/';
  const articles = pathname === '/articles' || pathname.startsWith('/articles/');
  const horoscope = pathname === '/daily-horoscope' || pathname.startsWith('/daily-horoscope/');

  return (
    <header className="border-b border-hairline px-5 sm:px-8">
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 text-ink hover:text-ink">
          <span aria-hidden className="h-3.5 w-px bg-gold" />
          <span className="flex items-baseline gap-2">
            <BrandMark />
            <span className="hidden font-mono text-[11px] text-ink-muted sm:inline">{t('brand.tag')}</span>
          </span>
        </Link>
        <nav className="hidden h-16 items-center gap-5 text-data lg:flex">
          <NavLink href="/" active={home}>
            {t('nav.home')}
          </NavLink>
          <CalculatorsMenu pathname={pathname} />
          <NavLink href="/daily-horoscope" active={horoscope}>
            {t('nav.horoscope')}
          </NavLink>
          <NavLink href="/articles" active={articles}>
            {t('nav.articles')}
          </NavLink>
        </nav>
        <div className="flex h-16 items-center gap-3 sm:gap-5">
          <LanguageSwitcher />
          <span aria-hidden className="hidden h-4 w-px bg-hairline sm:block" />
          <AccountLink />
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.open')}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-control text-ink-secondary hover:text-ink lg:hidden"
          >
            <span className="flex w-4 flex-col gap-1" aria-hidden>
              <span className="block h-px bg-current" />
              <span className="block h-px bg-current" />
              <span className="block h-px bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="mx-auto flex max-w-[1080px] flex-col gap-1 border-t border-hairline py-3 lg:hidden">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`rounded-control px-2 py-2.5 text-data ${home ? 'text-ink' : 'text-ink-secondary'}`}
          >
            {t('nav.home')}
          </Link>
          <Link
            href="/articles"
            onClick={() => setOpen(false)}
            className={`rounded-control px-2 py-2.5 text-data ${articles ? 'text-ink' : 'text-ink-secondary'}`}
          >
            {t('nav.articles')}
          </Link>
          <Link
            href="/daily-horoscope"
            onClick={() => setOpen(false)}
            className={`rounded-control px-2 py-2.5 text-data ${horoscope ? 'text-ink' : 'text-ink-secondary'}`}
          >
            {t('nav.horoscope')}
          </Link>
          <p className="px-2 pt-2 font-mono text-caption text-ink-muted">{t('nav.calculators')}</p>
          {CALCULATOR_NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.key}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`rounded-control px-2 py-2.5 text-data ${active ? 'text-ink' : 'text-ink-secondary'}`}
              >
                {t(`nav.${n.key}`)}
              </Link>
            );
          })}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className={`rounded-control px-2 py-2.5 text-data ${pathname === '/dashboard' ? 'text-ink' : 'text-ink-secondary'}`}
          >
            {t('nav.account')}
          </Link>
        </nav>
      )}
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: '/' | '/articles' | '/daily-horoscope';
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative flex h-16 items-center ${active ? 'text-ink' : 'text-ink-secondary hover:text-ink'}`}
    >
      {children}
      {active && <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gold" />}
    </Link>
  );
}

function CalculatorsMenu({ pathname }: { pathname: string }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const active = CALCULATOR_NAV.some((n) => n.href === pathname);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={root} className="relative flex h-16 items-center">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative flex h-16 items-center ${active ? 'text-ink' : 'text-ink-secondary hover:text-ink'}`}
      >
        {t('nav.calculators')}
        {active && <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gold" />}
      </button>
      {open && (
        <div className="absolute left-0 top-16 z-30 w-56 rounded-card border border-hairline bg-panel py-2 shadow-lg">
          {CALCULATOR_NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-data ${pathname === n.href ? 'text-ink' : 'text-ink-secondary hover:text-ink'}`}
            >
              {t(`nav.${n.key}`)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
