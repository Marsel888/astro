import { defineRouting } from 'next-intl/routing';
import { LOCALE_IDS, type AppLocale } from './locales';

export const routing = defineRouting({
  locales: LOCALE_IDS,
  defaultLocale: 'en',
  /*
   * English lives at the root, every other language keeps its prefix.
   *
   * With a prefix on all fifteen, "/" had to redirect to "/en", and a temporary
   * redirect leaves the redirecting URL in the index: Google indexed "/" and
   * marked "/en" a duplicate of it. Since every hreflang annotation pointed at
   * "/en", the whole cluster for the home page hung off a URL Google had
   * decided was not canonical.
   */
  localePrefix: 'as-needed',
});

export type { AppLocale };

export function asLocale(value: string | undefined): AppLocale {
  if (value && (LOCALE_IDS as string[]).includes(value)) return value as AppLocale;
  return routing.defaultLocale;
}
