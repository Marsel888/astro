import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { LOCALES, PUBLISHED_LOCALE_IDS, isPublishedLocale, type AppLocale } from '@/i18n/locales';
import { SITE_NAME } from '@/lib/site';

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

/**
 * Open Graph and Twitter tags for a page.
 *
 * Next.js does not copy `title` and `description` into the social tags on its
 * own, so a page that only sets those shares as bare brand text. The image comes
 * from src/app/opengraph-image.tsx and is inherited automatically.
 */
export function socialMetadata(
  locale: AppLocale,
  title: string,
  description: string,
  path = '',
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const htmlLocale = LOCALES.find((l) => l.id === locale)?.html ?? 'en';

  // Declaring `openGraph` on a page replaces the whole object, so the image that
  // src/app/opengraph-image.tsx would otherwise contribute is lost. It has to be
  // named here or the share card comes out as text with no picture.
  const images = [
    {
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} — free birth chart calculators`,
    },
  ];

  return {
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: pageUrl(locale, path),
      locale: htmlLocale.replace('-', '_'),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
