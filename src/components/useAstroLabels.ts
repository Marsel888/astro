'use client';

import { useLocale, useTranslations } from 'next-intl';

export function useAstroLabels() {
  const locale = useLocale();
  const daily = useTranslations('daily');
  const ui = useTranslations('resultUi');

  function sign(name: string) {
    const key = `sign_${name.toLowerCase()}`;
    const value = daily(key as never);
    return typeof value === 'string' && !value.startsWith('sign_') ? value : name;
  }

  function planet(key: string) {
    const value = daily(`planet_${key}` as never);
    return typeof value === 'string' && !value.startsWith('planet_') ? value : key;
  }

  function aspect(type: string) {
    const value = daily(`aspect_${type}` as never);
    return typeof value === 'string' && !value.startsWith('aspect_') ? value : type;
  }

  return { locale, ui, sign, planet, aspect };
}
