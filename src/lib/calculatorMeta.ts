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

/**
 * `absolute` skips the "%s — SideraChart" template on purpose: metaTitle is
 * already written to fill the 50–60 character SERP budget (STRATEGY §12.2),
 * and appending the brand would push it past the cut-off.
 */
export async function calculatorMetadata(
  locale: AppLocale,
  namespace: CalculatorNamespace,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    ...hreflangMetadata(locale, path),
  };
}
