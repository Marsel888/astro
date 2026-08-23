import { DateTime } from 'luxon';

export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validZone(tz: string | null | undefined): string {
  if (!tz) return 'UTC';
  return DateTime.now().setZone(tz).isValid ? tz : 'UTC';
}

export function asIsoDate(value: string | Date): string {
  if (value instanceof Date) {
    return DateTime.fromJSDate(value, { zone: 'utc' }).toFormat('yyyy-MM-dd');
  }
  return String(value).slice(0, 10);
}

export function todayInZone(tz: string | null | undefined): string {
  return DateTime.now().setZone(validZone(tz)).toFormat('yyyy-MM-dd');
}

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  return DateTime.fromISO(value, { zone: 'UTC' }).isValid;
}

export function luxonLocale(locale?: string | null): string {
  if (!locale) return 'en';
  return locale === 'pt-BR' ? 'pt-BR' : locale;
}

export function formatDayHeading(isoDate: string | Date, tz?: string | null, locale?: string | null): string {
  const dt = DateTime.fromISO(asIsoDate(isoDate), { zone: validZone(tz) }).setLocale(luxonLocale(locale));
  return dt.isValid ? dt.toFormat('cccc, d MMMM yyyy') : asIsoDate(isoDate);
}

export function formatDayShort(isoDate: string | Date, tz?: string | null, locale?: string | null): string {
  const dt = DateTime.fromISO(asIsoDate(isoDate), { zone: validZone(tz) }).setLocale(luxonLocale(locale));
  return dt.isValid ? dt.toFormat('ccc d MMM yyyy') : asIsoDate(isoDate);
}

export function formatBirthDate(isoDate: string | Date, locale?: string | null): string {
  const dt = DateTime.fromISO(asIsoDate(isoDate), { zone: 'UTC' }).setLocale(luxonLocale(locale));
  return dt.isValid ? dt.toFormat('d MMMM yyyy') : asIsoDate(isoDate);
}

export function isoDateInZone(value: Date, tz?: string | null): string {
  return DateTime.fromJSDate(value).setZone(validZone(tz)).toFormat('yyyy-MM-dd');
}

export function addDaysIso(isoDate: string, days: number): string {
  return DateTime.fromISO(asIsoDate(isoDate), { zone: 'UTC' }).plus({ days }).toFormat('yyyy-MM-dd');
}

export function eachIsoDate(from: string, to: string): string[] {
  const start = DateTime.fromISO(asIsoDate(from), { zone: 'UTC' }).startOf('day');
  const end = DateTime.fromISO(asIsoDate(to), { zone: 'UTC' }).startOf('day');
  if (!start.isValid || !end.isValid || start > end) return [];
  const out: string[] = [];
  for (let cursor = start; cursor <= end; cursor = cursor.plus({ days: 1 })) {
    out.push(cursor.toFormat('yyyy-MM-dd'));
  }
  return out;
}

export function maxIsoDate(a: string, b: string): string {
  return a >= b ? a : b;
}
