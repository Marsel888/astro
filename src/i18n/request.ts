import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getRequestConfig } from 'next-intl/server';
import { asLocale, type AppLocale } from './routing';
import { deepMerge } from './merge';

function loadMessages(locale: AppLocale): Record<string, unknown> {
  const file = join(process.cwd(), 'src', 'messages', `${locale}.json`);
  return JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = asLocale(await requestLocale);
  const en = loadMessages('en');
  if (locale === 'en') {
    return { locale, messages: en };
  }
  try {
    return { locale, messages: deepMerge(en, loadMessages(locale)) };
  } catch {
    return { locale, messages: en };
  }
});
