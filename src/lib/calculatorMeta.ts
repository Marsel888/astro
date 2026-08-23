import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { hreflangMetadata } from '@/lib/seo';
import type { AppLocale } from '@/i18n/routing';

type CalculatorNamespace =
  | 'birthChart'
  | 'rising'
  | 'moon'
  | 'venus'
  | 'mercury'
  | 'mars'
  | 'synastry'
  | 'composite';

export async function calculatorMetadata(
  locale: AppLocale,
  namespace: CalculatorNamespace,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  return {
    title: t('title'),
    description: t('lead'),
    ...hreflangMetadata(locale, path),
  };
}
