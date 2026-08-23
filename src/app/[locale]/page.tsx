import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SiteHeader from '@/components/SiteHeader';
import { CALCULATOR_NAV } from '@/lib/nav';
import { hreflangMetadata, socialMetadata } from '@/lib/seo';
import { asLocale } from '@/i18n/routing';
import { articleList, type ArticleCategory } from '@/content/articles';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

const TOOL_COPY = {
  birth: { ns: 'birthChart' as const, href: '/birth-chart-calculator' },
  rising: { ns: 'rising' as const, href: '/rising-sign-calculator' },
  moon: { ns: 'moon' as const, href: '/moon-sign-calculator' },
  mercury: { ns: 'mercury' as const, href: '/mercury-sign-calculator' },
  venus: { ns: 'venus' as const, href: '/venus-sign-calculator' },
  mars: { ns: 'mars' as const, href: '/mars-sign-calculator' },
  synastry: { ns: 'synastry' as const, href: '/synastry-calculator' },
  composite: { ns: 'composite' as const, href: '/composite-chart-calculator' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  const t = await getTranslations({ locale, namespace: 'home' });
  const title = t('metaTitle');
  const description = t('metaDescription');
  return {
    title: { absolute: title },
    description,
    ...hreflangMetadata(locale, ''),
    ...socialMetadata(locale, title, description, ''),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = asLocale(raw);
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const nav = await getTranslations('nav');
  const articlesT = await getTranslations('articles');
  const articles = articleList(locale).slice(0, 8);
  const tools = await Promise.all(
    CALCULATOR_NAV.map(async (item) => {
      const meta = TOOL_COPY[item.key];
      const tool = await getTranslations(meta.ns);
      return {
        key: item.key,
        href: meta.href,
        label: nav(item.key),
        title: tool('title'),
        lead: tool('lead'),
      };
    }),
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    description: t('lead'),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <section className="max-w-[720px]">
          <p className="font-mono text-caption text-ink-muted">{nav('calculators')}</p>
          <h1 className="mt-2 text-[32px] font-medium tracking-[-0.03em] sm:text-[40px]">{t('h1')}</h1>
          <p className="mt-4 text-body text-ink-secondary [text-wrap:pretty]">{t('lead')}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="flex h-9 items-center rounded-control border border-hairline bg-panel px-3 font-mono text-caption text-ink-secondary hover:border-hairline-strong hover:text-ink"
              >
                {tool.label}
              </Link>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/birth-chart-calculator"
              className="flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
            >
              {t('cta')}
            </Link>
            <Link
              href="/articles"
              className="flex h-11 items-center rounded-control border border-hairline-strong px-5 text-[15px] text-ink-secondary hover:text-ink"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </section>

        <section id="calculators" className="mt-16 scroll-mt-24 border-t border-hairline pt-11">
          <h2 className="text-h2 font-medium tracking-[-0.01em]">{t('toolsTitle')}</h2>
          <p className="mt-3 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">{t('toolsLead')}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="rounded-card border border-hairline bg-panel p-5 hover:border-hairline-strong hover:bg-elevated"
              >
                <p className="font-mono text-caption text-gold">{tool.label}</p>
                <h3 className="mt-2 text-h3 font-medium text-ink">{tool.title}</h3>
                <p className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">{tool.lead}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-hairline pt-11">
          <Link
            href="/daily-horoscope"
            className="block rounded-card border border-hairline bg-panel p-6 hover:border-hairline-strong hover:bg-elevated sm:p-8"
          >
            <p className="font-mono text-caption text-gold">{t('horoscopeKicker')}</p>
            <h2 className="mt-2 text-h2 font-medium tracking-[-0.01em]">{t('horoscopeTitle')}</h2>
            <p className="mt-3 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">{t('horoscopeLead')}</p>
            <span className="mt-5 inline-block font-mono text-caption text-gold">{t('horoscopeCta')}</span>
          </Link>
        </section>

        <section className="mt-16 border-t border-hairline pt-11">
          <h2 className="text-h2 font-medium tracking-[-0.01em]">{t('howTitle')}</h2>
          <p className="mt-3 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">{t('howLead')}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {(
              [
                ['step1Title', 'step1Body'],
                ['step2Title', 'step2Body'],
                ['step3Title', 'step3Body'],
                ['step4Title', 'step4Body'],
              ] as const
            ).map(([titleKey, bodyKey]) => (
              <div key={titleKey} className="rounded-card border border-hairline bg-panel p-5">
                <h3 className="text-h3 font-medium text-ink">{t(titleKey)}</h3>
                <p className="mt-2 text-body text-ink-secondary [text-wrap:pretty]">{t(bodyKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-hairline pt-11">
          <h2 className="text-h2 font-medium tracking-[-0.01em]">{t('methodTitle')}</h2>
          <p className="mt-3 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">{t('methodBody')}</p>
        </section>

        <section className="mt-16 border-t border-hairline pt-11">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-h2 font-medium tracking-[-0.01em]">{t('articlesTitle')}</h2>
              <p className="mt-3 max-w-[640px] text-body text-ink-secondary [text-wrap:pretty]">{t('articlesLead')}</p>
            </div>
            <Link href="/articles" className="shrink-0 font-mono text-caption text-gold hover:text-ink">
              {t('articlesAll')}
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="flex min-h-[220px] flex-col rounded-card border border-hairline bg-panel p-7 hover:border-hairline-strong hover:bg-elevated"
              >
                <p className="font-mono text-caption text-ink-muted">
                  {articlesT(`category_${article.category}` as `category_${ArticleCategory}`)}
                </p>
                <h3 className="mt-3 text-[22px] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-ink-secondary [text-wrap:pretty]">{article.excerpt}</p>
                <span className="mt-6 font-mono text-caption text-gold">{articlesT('read')}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

