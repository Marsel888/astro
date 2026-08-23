import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { LOCALE_IDS, type AppLocale } from '@/i18n/locales';

export function pageUrl(locale: string, path = '') {
  const suffix = path === '/' ? '' : path;
  return `${SITE_URL}/${locale}${suffix}`;
}

export function hreflangMetadata(locale: AppLocale, path = ''): Pick<Metadata, 'alternates'> {
  const languages: Record<string, string> = {
    'x-default': pageUrl('en', path),
  };
  for (const id of LOCALE_IDS) {
    languages[id] = pageUrl(id, path);
  }
  return {
    alternates: {
      canonical: pageUrl(locale, path),
      languages,
    },
  };
}
