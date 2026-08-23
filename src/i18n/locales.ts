export const LOCALES = [
  { id: 'en', name: 'English', html: 'en' },
  { id: 'de', name: 'Deutsch', html: 'de' },
  { id: 'es', name: 'Español', html: 'es' },
  { id: 'pt-BR', name: 'Português', html: 'pt-BR' },
  { id: 'fr', name: 'Français', html: 'fr' },
  { id: 'it', name: 'Italiano', html: 'it' },
  { id: 'pl', name: 'Polski', html: 'pl' },
  { id: 'tr', name: 'Türkçe', html: 'tr' },
  { id: 'ru', name: 'Русский', html: 'ru' },
  { id: 'nl', name: 'Nederlands', html: 'nl' },
  { id: 'id', name: 'Indonesia', html: 'id' },
  { id: 'vi', name: 'Tiếng Việt', html: 'vi' },
  { id: 'ja', name: '日本語', html: 'ja' },
  { id: 'uk', name: 'Українська', html: 'uk' },
  { id: 'ko', name: '한국어', html: 'ko' },
] as const;

export type AppLocale = (typeof LOCALES)[number]['id'];

export const LOCALE_IDS = LOCALES.map((l) => l.id) as [AppLocale, ...AppLocale[]];

export function localeMeta(id: string) {
  return LOCALES.find((l) => l.id === id) ?? LOCALES[0];
}
