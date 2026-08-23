'use client';

import {
  aspectLines,
  houseGeom,
  placed,
  pt,
  ringSegs,
  type BodyPoint,
  f,
} from '@/lib/chart';

type Props = {
  bodies: BodyPoint[];
  cusps: number[];
  asc: number;
  mc: number;
  bodiesB?: BodyPoint[];
  showAspects?: boolean;
  showHouses?: boolean;
  size?: number;
};

export default function ChartWheel({
  bodies,
  cusps,
  asc,
  mc,
  bodiesB,
  showAspects = true,
  showHouses = true,
  size = 560,
}: Props) {
  const signs = ringSegs(asc);
  const houses = showHouses ? houseGeom(cusps, asc) : [];
  const glyphs = placed(bodies, bodiesB ? 190 : 182, asc);
  const glyphsB = bodiesB ? placed(bodiesB, 158, asc) : [];
  const aspects = bodiesB
    ? aspectLines(bodies, bodiesB, 140, asc).sort((a, b) => a.orb - b.orb).slice(0, 8)
    : aspectLines(bodies, bodies, 150, asc);

  const axes = [
    { lon: asc, label: 'AC', anchor: 'end' as const },
    { lon: asc + 180, label: 'DC', anchor: 'start' as const },
    { lon: mc, label: 'MC', anchor: 'middle' as const },
    { lon: mc + 180, label: 'IC', anchor: 'middle' as const },
  ].map((a) => {
    const [x, y] = pt(281, a.lon, asc);
    return { ...a, x: f(x), y: f(y) };
  });

  return (
    <svg
      viewBox="0 0 560 560"
      width={size}
      height={size}
      className="wheel-play block max-w-full"
      role="img"
      aria-label="Natal chart wheel: zodiac ring, houses, planetary positions and aspects"
    >
      <rect x={0} y={0} width={560} height={560} fill="var(--bg-deep)" />

      {signs.map((s, i) => (
        <g key={s.name}>
          <path
            d={s.d}
            fill={s.fill}
            stroke="var(--line-strong)"
            strokeWidth={0.75}
            className="wheel-sign"
            style={{ animationDelay: `${0.04 * i}s` }}
          />
          <text
            x={s.gx}
            y={s.gy}
            fill={s.color}
            fontSize={19}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {s.glyph}
          </text>
        </g>
      ))}

      <circle
        cx={280}
        cy={280}
        r={206}
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth={0.75}
        pathLength={1}
        className="wheel-draw"
      />
      <circle
        cx={280}
        cy={280}
        r={bodiesB ? 172 : 150}
        fill="none"
        stroke="var(--line)"
        strokeWidth={0.75}
        pathLength={1}
        className="wheel-draw"
        style={{ animationDelay: '0.12s' }}
      />
      {bodiesB && (
        <circle
          cx={280}
          cy={280}
          r={140}
          fill="none"
          stroke="var(--line)"
          strokeWidth={0.75}
          pathLength={1}
          className="wheel-draw"
          style={{ animationDelay: '0.2s' }}
        />
      )}

      {houses.map((h) => (
        <g key={h.num}>
          <line x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} stroke={h.stroke} strokeWidth={h.w} />
          <text
            x={h.nx}
            y={h.ny}
            fill="var(--ink-muted)"
            fontSize={11}
            className="font-mono"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {h.num}
          </text>
        </g>
      ))}

      {showAspects &&
        aspects.map((a, i) => (
          <line
            key={i}
            x1={a.x1}
            y1={a.y1}
            x2={a.x2}
            y2={a.y2}
            stroke={a.stroke}
            strokeWidth={a.w}
            pathLength={1}
            className="wheel-draw"
            style={{ animationDelay: `${0.25 + i * 0.03}s` }}
            opacity={0.75}
          />
        ))}

      {glyphs.map((p, i) => (
        <g
          key={p.body}
          className="wheel-glyph"
          style={{ animationDelay: `${0.45 + i * 0.05}s` }}
        >
          <line
            x1={p.tx1}
            y1={p.ty1}
            x2={p.tx2}
            y2={p.ty2}
            stroke="var(--gold-dim)"
            strokeWidth={0.75}
          />
          <text
            x={p.gx}
            y={p.gy}
            fill="var(--gold)"
            fontSize={19}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {p.glyph}
          </text>
          {!bodiesB && (
            <text
              x={p.lx}
              y={p.ly}
              fill="var(--ink-secondary)"
              fontSize={10.5}
              className="font-mono"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {p.deg}
            </text>
          )}
        </g>
      ))}

      {glyphsB.map((p, i) => (
        <text
          key={p.body}
          x={p.gx}
          y={p.gy}
          fill="var(--ink-secondary)"
          fontSize={18}
          textAnchor="middle"
          dominantBaseline="central"
          className="wheel-glyph"
          style={{ animationDelay: `${0.7 + i * 0.04}s` }}
        >
          {p.glyph}
        </text>
      ))}

      {showHouses &&
        axes.map((a) => (
          <text
            key={a.label}
            x={a.x}
            y={a.y}
            fill="var(--ink-primary)"
            fontSize={11}
            className="font-mono"
            textAnchor={a.anchor}
            dominantBaseline="central"
          >
            {a.label}
          </text>
        ))}
    </svg>
  );
}
