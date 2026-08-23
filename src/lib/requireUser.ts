import { redirect } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';

export function requireUser<T>(
  session: T | null,
  locale: AppLocale,
  nextPath: string,
): T {
  if (!session) {
    redirect({ href: `/sign-in?next=${nextPath}`, locale });
    throw new Error('redirect');
  }
  return session;
}
