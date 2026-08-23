'use client';

import { Link } from '@/i18n/navigation';

type Props = {
  nextPath: string;
  title: string;
  body: string;
};

export default function AccountGate({ nextPath, title, body }: Props) {
  const next = encodeURIComponent(nextPath);
  return (
    <div className="mt-6 rounded-card border border-hairline bg-panel p-5">
      <p className="text-data text-ink">{title}</p>
      <p className="mt-2 max-w-[520px] text-body text-ink-secondary [text-wrap:pretty]">{body}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/sign-up?next=${next}`}
          className="flex h-11 items-center rounded-control bg-gold px-4 text-caption font-medium text-deep hover:bg-gold-hover sm:h-[34px]"
        >
          Create free account
        </Link>
        <Link
          href={`/sign-in?next=${next}`}
          className="flex h-11 items-center rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
