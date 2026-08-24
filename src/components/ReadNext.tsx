import { Link } from '@/i18n/navigation';
import type { RelatedLink } from '@/lib/related';

type Group = { title: string; links: RelatedLink[] };

/**
 * Two columns of links out of a page, with the destination's own name as the
 * anchor. Renders nothing when there is nothing to point at.
 */
export default function ReadNext({ groups }: { groups: Group[] }) {
  const filled = groups.filter((group) => group.links.length > 0);
  if (!filled.length) return null;

  return (
    <nav className="mt-16 grid gap-8 border-t border-hairline pt-10 sm:grid-cols-2 sm:gap-12">
      {filled.map((group) => (
        <div key={group.title}>
          <h2 className="font-mono text-caption uppercase tracking-[0.08em] text-ink-muted">
            {group.title}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body text-ink-secondary underline decoration-hairline-strong underline-offset-4 hover:text-ink hover:decoration-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
