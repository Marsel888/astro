import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { PUBLISHED_LOCALE_IDS, isPublishedLocale, type AppLocale } from '@/i18n/locales';

export function pageUrl(locale: string, path = '') {
  const suffix = path === '/' ? '' : path;
  return `${SITE_URL}/${locale}${suffix}`;
}

/** hreflang alternates for the published locales only, plus x-default on English. */
export function alternateLanguages(path = ''): Record<string, string> {
  const languages: Record<string, string> = { 'x-default': pageUrl('en', path) };
  for (const id of PUBLISHED_LOCALE_IDS) {
    languages[id] = pageUrl(id, path);
  }
  return languages;
}

/**
 * Canonical + hreflang for a public page.
 *
 * A draft locale gets `noindex, follow`: it still passes link equity to the
 * published versions, but it does not compete with them in the index while most
 * of its copy is still falling back to English.
 */
export function hreflangMetadata(
  locale: AppLocale,
  path = '',
): Pick<Metadata, 'alternates' | 'robots'> {
  const meta: Pick<Metadata, 'alternates' | 'robots'> = {
    alternates: {
      canonical: pageUrl(locale, path),
      languages: alternateLanguages(path),
    },
  };
  if (!isPublishedLocale(locale)) {
    meta.robots = { index: false, follow: true };
  }
  return meta;
}
