import type { SignName } from '@/lib/chart';
import type { AppLocale } from '@/i18n/locales';
import ukPack from './copy.uk.json';
import ruPack from './copy.ru.json';

export type CopyPack = {
  sun: Record<string, string>;
  moon: Record<string, string>;
  rising: Record<string, string>;
  mercury: Record<string, string>;
  venus: Record<string, string>;
  mars: Record<string, string>;
  jupiter: Record<string, string>;
  saturn: Record<string, string>;
  uranus: Record<string, string>;
  neptune: Record<string, string>;
  pluto: Record<string, string>;
  houses: Record<string, string>;
  lens: Record<string, string>;
  aspectSense: Record<string, string>;
  aspectType: Record<string, string>;
  housePlay: string;
};

const PACKS: Partial<Record<AppLocale, CopyPack>> = {
  uk: ukPack as CopyPack,
  ru: ruPack as CopyPack,
};

export function copyPack(locale?: string | null): CopyPack | null {
  if (!locale) return null;
  return PACKS[locale as AppLocale] ?? null;
}

export function packedReading(kind: string, sign: SignName, locale?: string | null): string | null {
  const pack = copyPack(locale);
  if (!pack) return null;
  const table = pack[kind as keyof CopyPack];
  if (!table || typeof table === 'string') return null;
  return (table as Record<string, string>)[sign] ?? null;
}

export function packedHouse(house: number, locale?: string | null): string | null {
  return copyPack(locale)?.houses[String(house)] ?? null;
}

export function packedLens(planetKey: string, locale?: string | null): string | null {
  return copyPack(locale)?.lens[planetKey] ?? null;
}

export function packedAspectSense(type: string, locale?: string | null): string | null {
  return copyPack(locale)?.aspectSense[type] ?? null;
}

export function packedAspectType(type: string, locale?: string | null): string | null {
  return copyPack(locale)?.aspectType[type] ?? null;
}

export function packedHousePlay(
  planetKey: string,
  house: number,
  locale?: string | null,
): string | null {
  const pack = copyPack(locale);
  if (!pack) return null;
  const domain = pack.houses[String(house)];
  const lens = pack.lens[planetKey];
  if (!domain || !lens) return null;
  return pack.housePlay.replace('{lens}', lens).replace('{house}', String(house)).replace('{domain}', domain);
}
