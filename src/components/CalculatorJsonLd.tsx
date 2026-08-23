import { getLocale } from 'next-intl/server';
import { SITE_URL } from '@/lib/site';

type Props = {
  name: string;
  description: string;
  path: string;
};

export default async function CalculatorJsonLd({ name, description, path }: Props) {
  const locale = await getLocale();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}/${locale}${path}`,
    inLanguage: locale,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
