'use client';

import { useMemo } from 'react';
import { f } from '@/lib/chart';

export default function Starfield() {
  const { stars, rings, spokes } = useMemo(() => {
    let seed = 20260822;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };

    return {
      stars: Array.from({ length: 72 }, () => {
        const s = rnd();
        return {
          x: f(rnd() * 1440),
          y: f(rnd() * 900),
          r: f(0.45 + s * 0.85),
          o: f(0.06 + s * 0.12),
        };
      }),
      rings: [420, 600, 780, 960, 1140].map((r, i) => ({ r, o: f(0.38 - i * 0.06) })),
      spokes: Array.from({ length: 12 }, (_, i) => {
        const t = ((i * 30 + 8) * Math.PI) / 180;
        return { x: f(1180 + 1500 * Math.cos(t)), y: f(-260 + 1500 * Math.sin(t)) };
      }),
    };
  }, []);

  const layer = 'absolute inset-0 h-full w-full';

  return (
    <div data-backdrop aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={layer}>
        {rings.map((g, i) => (
          <circle
            key={i}
            cx={1180}
            cy={-260}
            r={g.r}
            fill="none"
            stroke="var(--line)"
            strokeWidth={0.6}
            opacity={g.o}
          />
        ))}
        {spokes.map((g, i) => (
          <line
            key={i}
            x1={1180}
            y1={-260}
            x2={g.x}
            y2={g.y}
            stroke="var(--line)"
            strokeWidth={0.6}
            opacity={0.4}
          />
        ))}
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--ink-secondary)" opacity={s.o} />
        ))}
      </svg>
    </div>
  );
}
