import { Link } from '@/i18n/navigation';

type Props = {
  title: string;
  body: string;
  href: string;
  cta: string;
};

/**
 * A cabinet tab whose calculator has not been run yet.
 *
 * The chart holds every placement the moment it is computed, but showing all of
 * them would answer questions nobody put — somebody who came for their Moon
 * opened five tabs of readings they never asked for and could not tell what they
 * had actually done. So a tab stays empty until it is earned, and says how.
 */
export default function CabinetLocked({ title, body, href, cta }: Props) {
  return (
    <div className="rounded-card border border-hairline bg-panel p-6 sm:p-8">
      <h2 className="text-h3 font-medium text-ink">{title}</h2>
      <p className="mt-2 max-w-[560px] text-body text-ink-secondary [text-wrap:pretty]">{body}</p>
      <Link
        href={href}
        className="mt-5 inline-flex h-11 items-center rounded-control bg-gold px-5 text-[15px] font-medium text-deep hover:bg-gold-hover"
      >
        {cta}
      </Link>
    </div>
  );
}
