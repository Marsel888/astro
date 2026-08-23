'use client';

import ChartWheel from '@/components/ChartWheel';
import type { BodyPoint } from '@/lib/chart';

type Props = {
  natal: BodyPoint[];
  transit: BodyPoint[];
  cusps: number[];
  asc: number;
  mc: number;
  showHouses: boolean;
  label: string;
  legendNatal: string;
  legendTransit: string;
};

/**
 * The natal chart with today's sky laid over it — the same two-ring overlay the
 * synastry calculator draws, except the second chart is the current sky rather
 * than another person.
 *
 * This is the piece of the cabinet that visibly changes every day. Gold is the
 * chart the reader knows; the muted outer glyphs are where the planets actually
 * are right now, and the lines between them are the contacts the text describes.
 */
export default function TransitWheel({
  natal,
  transit,
  cusps,
  asc,
  mc,
  showHouses,
  label,
  legendNatal,
  legendTransit,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <ChartWheel
        bodies={natal}
        bodiesB={transit}
        cusps={cusps}
        asc={asc}
        mc={mc}
        showHouses={showHouses}
        maxSize={440}
        label={label}
      />
      <div className="mt-2 flex flex-wrap items-center justify-center gap-5 font-mono text-caption">
        <span className="flex items-center gap-2 text-ink-secondary">
          <span aria-hidden className="text-[15px] text-gold">
            ☉
          </span>
          {legendNatal}
        </span>
        <span className="flex items-center gap-2 text-ink-muted">
          <span aria-hidden className="text-[15px] text-ink-secondary">
            ☉
          </span>
          {legendTransit}
        </span>
      </div>
    </div>
  );
}
