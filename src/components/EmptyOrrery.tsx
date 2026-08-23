'use client';

import { ringSegs, placed, type BodyPoint } from '@/lib/chart';

/** Atmospheric sky — not a real natal. Glyphs only, no degrees or houses. */
const GHOST: BodyPoint[] = [
  { b: 'Sun', g: '☉', lon: 352, sp: '' },
  { b: 'Moon', g: '☽', lon: 84, sp: '' },
  { b: 'Mercury', g: '☿', lon: 14, sp: '' },
  { b: 'Venus', g: '♀', lon: 31, sp: '' },
  { b: 'Mars', g: '♂', lon: 198, sp: '' },
  { b: 'Jupiter', g: '♃', lon: 246, sp: '' },
  { b: 'Saturn', g: '♄', lon: 308, sp: '' },
  { b: 'Uranus', g: '♅', lon: 128, sp: '' },
  { b: 'Neptune', g: '♆', lon: 271, sp: '' },
  { b: 'Pluto', g: '♇', lon: 168, sp: '' },
];

export default function EmptyOrrery({ caption }: { caption: string }) {
  const signs = ringSegs(0);
  const planets = placed(GHOST, 182, 0);

  return (
    <div className="mt-12 flex flex-col items-center border-t border-hairline pt-10">
      <div className="orrery-spin w-[min(100%,480px)]">
        <svg
          viewBox="0 0 560 560"
          className="block w-full"
          aria-hidden
          style={{ fontFamily: 'var(--font-inter), "Segoe UI Symbol", "Apple Symbols", serif' }}
        >
          <defs>
            <radialGradient id="orrery-void" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.08} />
              <stop offset="62%" stopColor="var(--bg-deep)" stopOpacity={0} />
            </radialGradient>
            <filter id="orrery-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {signs.map((s) => (
            <g key={s.name}>
              <path d={s.d} fill={s.fill} stroke="var(--line-strong)" strokeWidth={0.75} />
              <text
                x={s.gx}
                y={s.gy}
                fill={s.color}
                fontSize={20}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {s.glyph}
              </text>
            </g>
          ))}

          <circle cx={280} cy={280} r={272} fill="none" stroke="var(--line-strong)" strokeWidth={0.9} />
          <circle cx={280} cy={280} r={234} fill="none" stroke="var(--line-strong)" strokeWidth={0.75} />
          <circle cx={280} cy={280} r={206} fill="none" stroke="var(--line)" strokeWidth={0.75} />
          <circle cx={280} cy={280} r={150} fill="url(#orrery-void)" />
          <circle cx={280} cy={280} r={150} fill="none" stroke="var(--line)" strokeWidth={0.75} />

          {planets.map((p) => (
            <text
              key={p.body}
              x={p.gx}
              y={p.gy}
              fill="var(--gold)"
              fontSize={20}
              textAnchor="middle"
              dominantBaseline="central"
              filter="url(#orrery-glow)"
              opacity={0.92}
            >
              {p.glyph}
            </text>
          ))}
        </svg>
      </div>
      <p className="mt-4 max-w-[420px] text-center font-mono text-caption text-ink-muted">{caption}</p>
    </div>
  );
}
