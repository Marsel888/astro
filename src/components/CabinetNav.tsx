'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

type Item = { href: string; key: string };

/**
 * The cabinet's tabs.
 *
 * One page per thing the reader might have come for, mirroring the calculators,
 * so somebody who worked out their Moon finds a Moon tab rather than hunting a
 * row in a table halfway down a scroll.
 */
const ITEMS: Item[] = [
  { href: '/dashboard', key: 'tabToday' },
  { href: '/dashboard/chart', key: 'tabChart' },
  { href: '/dashboard/sun', key: 'tabSun' },
  { href: '/dashboard/rising', key: 'tabRising' },
  { href: '/dashboard/moon', key: 'tabMoon' },
  { href: '/dashboard/mercury', key: 'tabMercury' },
  { href: '/dashboard/venus', key: 'tabVenus' },
  { href: '/dashboard/mars', key: 'tabMars' },
  { href: '/dashboard/charts', key: 'tabCharts' },
];

/** `locked` lists hrefs whose calculator has not been run against this chart. */
export default function CabinetNav({ locked = [] }: { locked?: string[] }) {
  const t = useTranslations('account');
  const pathname = usePathname();

  return (
    <nav aria-label={t('title')} className="-mx-5 mb-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-1 border-b border-hairline">
        {ITEMS.map((item) => {
          // /dashboard is the only one that must match exactly, or it would light
          // up on every child route.
          const active =
            item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-11 items-center whitespace-nowrap px-3.5 text-caption transition-colors ${
                  active
                    ? 'text-ink'
                    : locked.includes(item.href)
                      ? // Not run yet: reachable, but visibly not filled in.
                        'text-ink-muted/60 hover:text-ink-secondary'
                      : 'text-ink-muted hover:text-ink-secondary'
                }`}
              >
                {t(item.key as 'tabToday')}
                {active && <span aria-hidden className="absolute inset-x-2 bottom-0 h-px bg-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
