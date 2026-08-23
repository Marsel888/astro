/**
 * `published: true` means the locale is genuinely translated and may be indexed:
 * it goes into the sitemap and into every page's hreflang set.
 *
 * Draft locales stay reachable — a visitor who picks one gets the interface in
 * their language wherever copy exists — but they are marked noindex and are not
 * offered as hreflang alternates, because a page that falls back to English under
 * `lang="pl"` is a duplicate of the English page, not a Polish version of it.
 *
 * Promote a locale here only once `npm run i18n:coverage` reports it near 100%.
 * See STRATEGY.md §13: architecture for 15, publish one at a time.
 */
export const LOCALES = [
  { id: 'en', name: 'English', html: 'en', published: true },
  { id: 'uk', name: 'Українська', html: 'uk', published: true },
  { id: 'ru', name: 'Русский', html: 'ru', published: true },
  { id: 'de', name: 'Deutsch', html: 'de', published: false },
  { id: 'es', name: 'Español', html: 'es', published: false },
  { id: 'pt-BR', name: 'Português', html: 'pt-BR', published: false },
  { id: 'fr', name: 'Français', html: 'fr', published: false },
  { id: 'it', name: 'Italiano', html: 'it', published: false },
  { id: 'pl', name: 'Polski', html: 'pl', published: false },
  { id: 'tr', name: 'Türkçe', html: 'tr', published: false },
  { id: 'nl', name: 'Nederlands', html: 'nl', published: false },
  { id: 'id', name: 'Indonesia', html: 'id', published: false },
  { id: 'vi', name: 'Tiếng Việt', html: 'vi', published: false },
  { id: 'ja', name: '日本語', html: 'ja', published: false },
  { id: 'ko', name: '한국어', html: 'ko', published: false },
] as const;

export type AppLocale = (typeof LOCALES)[number]['id'];

/** Every locale the app can serve. */
export const LOCALE_IDS = LOCALES.map((l) => l.id) as [AppLocale, ...AppLocale[]];

/** The locales search engines are allowed to index. */
export const PUBLISHED_LOCALE_IDS = LOCALES.filter((l) => l.published).map(
  (l) => l.id,
) as [AppLocale, ...AppLocale[]];

export function localeMeta(id: string) {
  return LOCALES.find((l) => l.id === id) ?? LOCALES[0];
}

export function isPublishedLocale(id: string): boolean {
  return LOCALES.some((l) => l.id === id && l.published);
}
