import { defineRouting } from 'next-intl/routing';
import { LOCALE_IDS, type AppLocale } from './locales';

export const routing = defineRouting({
  locales: LOCALE_IDS,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export type { AppLocale };

export function asLocale(value: string | undefined): AppLocale {
  if (value && (LOCALE_IDS as string[]).includes(value)) return value as AppLocale;
  return routing.defaultLocale;
}
