'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LOCALES, type AppLocale } from '@/i18n/locales';

function shortCode(id: string) {
  if (id === 'pt-BR') return 'PT';
  return id.toUpperCase();
}

export default function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((item) => item.id === locale) ?? LOCALES[0];

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
        aria-haspopup="listbox"
        aria-label={t('language')}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-2 rounded-control border border-hairline bg-elevated px-3 text-ink-secondary hover:border-hairline-strong hover:text-ink"
      >
        <span className="font-mono text-[11px] tracking-[0.08em] text-gold">{shortCode(current.id)}</span>
        <span className="hidden max-w-[8.5rem] truncate text-data sm:inline">{current.name}</span>
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 opacity-50" aria-hidden>
          <path d="M2 4.5 L6 8.5 L10 4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%-6px)] z-40 max-h-80 w-52 overflow-auto rounded-card border border-hairline bg-panel py-1.5 shadow-lg"
        >
          {LOCALES.map((item) => {
            const active = item.id === locale;
            return (
              <li key={item.id} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, { locale: item.id as AppLocale });
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-data ${
                    active ? 'text-ink' : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-[10px] tracking-[0.08em] text-ink-muted">{shortCode(item.id)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
