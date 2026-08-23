import { Link } from '@/i18n/navigation';
import SignEmblem from '@/components/SignEmblem';
import { SIGNS } from '@/lib/chart';
import { HOROSCOPE_PATH, slugFromSign, type HoroscopeSlug } from '@/lib/interpret/horoscope';

type Props = {
  active?: HoroscopeSlug;
  labels: Record<HoroscopeSlug, string>;
};

export default function HoroscopePicker({ active, labels }: Props) {
  return (
    <nav className="mt-8 flex flex-wrap gap-2" aria-label="Signs">
      {SIGNS.map((row) => {
        const slug = slugFromSign(row.n);
        const current = slug === active;
        return (
          <Link
            key={slug}
            href={`${HOROSCOPE_PATH}/${slug}`}
            className={`flex h-11 items-center gap-2 rounded-control border px-3 text-[14px] ${
              current
                ? 'border-gold bg-gold/10 text-ink'
                : 'border-hairline text-ink-secondary hover:border-hairline-strong hover:text-ink'
            }`}
          >
            <SignEmblem sign={row.n} size={22} />
            {labels[slug]}
          </Link>
        );
      })}
    </nav>
  );
}
