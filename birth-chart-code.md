# SideraChart — birth chart calculator (Next.js + Tailwind)

Paste this whole file into an AI coding tool. It contains four files:
`app/globals.css`, `lib/chart.ts`, `components/Starfield.tsx`,
`components/ChartWheel.tsx`, `app/birth-chart-calculator/page.tsx`.

Rules for whoever generates it: use only the tokens in `globals.css`. No
gradients, no glows, no glassmorphism. Dark everywhere except the
interpretation card (`--bg-reading`, Lora serif). Fonts: Inter (UI),
JetBrains Mono (numbers), Lora (reading card only). Sentence case.
Everything must work at 340px width.

---

## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-deep: #0B0E14;
  --bg-panel: #131824;
  --bg-elevated: #1B2231;
  --bg-reading: #F7F4EE;

  --ink-primary: #E8E6E1;
  --ink-secondary: #9BA3B4;
  --ink-muted: #5E6779;

  --read-primary: #1A1D24;
  --read-secondary: #4A5261;

  --gold: #D9A441;
  --gold-dim: #8A6A2A;

  --el-fire: #D9694A;
  --el-earth: #6E8B5A;
  --el-air: #7FA3C4;
  --el-water: #6C7FB8;

  --asp-hard: #C4564A;
  --asp-soft: #5A9A8B;
  --asp-neutral: #6E7686;

  --line: rgba(232, 230, 225, 0.10);
  --line-strong: rgba(232, 230, 225, 0.20);

  --radius-control: 10px;
  --radius-card: 14px;
}

html { background: var(--bg-deep); }
body {
  background: transparent;            /* lets the fixed starfield show through */
  color: var(--ink-primary);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--gold); text-decoration: none; }
a:hover { color: var(--ink-primary); }

/* backdrop motion */
@keyframes twinkle { 0%, 100% { opacity: .14 } 50% { opacity: .85 } }
@keyframes drift {
  from { transform: translate3d(0, 0, 0) }
  to   { transform: translate3d(-34px, 16px, 0) }
}
@keyframes shoot {
  0%        { transform: translate(0, 0); opacity: 0 }
  6%        { opacity: .55 }
  55%       { opacity: .35 }
  80%, 100% { transform: translate(520px, 300px); opacity: 0 }
}

@media (prefers-reduced-motion: reduce) {
  [data-backdrop] * { animation: none !important; }
}
```

Tailwind config — expose the tokens so classes like `bg-panel` work:

```js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: 'var(--bg-deep)',
        panel: 'var(--bg-panel)',
        elevated: 'var(--bg-elevated)',
        reading: 'var(--bg-reading)',
        ink: {
          DEFAULT: 'var(--ink-primary)',
          secondary: 'var(--ink-secondary)',
          muted: 'var(--ink-muted)',
        },
        read: {
          DEFAULT: 'var(--read-primary)',
          secondary: 'var(--read-secondary)',
        },
        gold: { DEFAULT: 'var(--gold)', dim: 'var(--gold-dim)' },
        el: {
          fire: 'var(--el-fire)', earth: 'var(--el-earth)',
          air: 'var(--el-air)', water: 'var(--el-water)',
        },
        asp: {
          hard: 'var(--asp-hard)', soft: 'var(--asp-soft)',
          neutral: 'var(--asp-neutral)',
        },
        hairline: 'var(--line)',
        'hairline-strong': 'var(--line-strong)',
      },
      borderRadius: { control: '10px', card: '14px' },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      fontSize: {
        h1: ['32px', '1.15'], h2: ['24px', '1.2'], h3: ['18px', '1.35'],
        body: ['16px', '1.6'], data: ['14px', '1.45'], caption: ['13px', '1.4'],
      },
    },
  },
};
```

Fonts — load Inter and JetBrains Mono up front, Lora lazily (it is only used
below the fold, which keeps the initial webfont count at two):

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono, Lora } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter', display: 'swap' });
const mono  = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
const lora  = Lora({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-lora', display: 'swap', preload: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## `lib/chart.ts`

Pure geometry and formatting. Replace the hard-coded `BODIES` with real Swiss
Ephemeris output; everything downstream is derived.

```ts
export const SIGNS = [
  { n: 'Aries', g: '♈', el: 'fire' }, { n: 'Taurus', g: '♉', el: 'earth' },
  { n: 'Gemini', g: '♊', el: 'air' }, { n: 'Cancer', g: '♋', el: 'water' },
  { n: 'Leo', g: '♌', el: 'fire' }, { n: 'Virgo', g: '♍', el: 'earth' },
  { n: 'Libra', g: '♎', el: 'air' }, { n: 'Scorpio', g: '♏', el: 'water' },
  { n: 'Sagittarius', g: '♐', el: 'fire' }, { n: 'Capricorn', g: '♑', el: 'earth' },
  { n: 'Aquarius', g: '♒', el: 'air' }, { n: 'Pisces', g: '♓', el: 'water' },
] as const;

export const EL: Record<string, string> = {
  fire: 'var(--el-fire)', earth: 'var(--el-earth)',
  air: 'var(--el-air)', water: 'var(--el-water)',
};

export type Body = { b: string; g: string; lon: number; sp: string; r?: boolean };

/** Example chart: 12 Mar 1994, 14:23 WET, Lisbon. Swap for real ephemeris data. */
export const BODIES: Body[] = [
  { b: 'Sun', g: '☉', lon: 351.733, sp: '+1°00′04″' },
  { b: 'Moon', g: '☽', lon: 218.200, sp: '+13°11′22″' },
  { b: 'Mercury', g: '☿', lon: 336.550, sp: '−0°21′17″', r: true },
  { b: 'Venus', g: '♀', lon: 14.383, sp: '+1°13′40″' },
  { b: 'Mars', g: '♂', lon: 268.900, sp: '+0°43′55″' },
  { b: 'Jupiter', g: '♃', lon: 216.050, sp: '−0°04′02″', r: true },
  { b: 'Saturn', g: '♄', lon: 341.400, sp: '+0°06′48″' },
  { b: 'Uranus', g: '♅', lon: 296.700, sp: '+0°02′51″' },
  { b: 'Neptune', g: '♆', lon: 292.850, sp: '+0°01′38″' },
  { b: 'Pluto', g: '♇', lon: 236.100, sp: '−0°00′44″', r: true },
];

export const ASC = 93.283;
export const CUSPS = [
  93.283, 121.5, 148.7, 174.4, 201.9, 232.583,
  273.283, 301.5, 328.7, 354.4, 21.9, 52.583,
];

export const ASPECT_DEFS = [
  { name: 'conjunction', sym: '☌', ang: 0,   orb: 6, color: 'var(--asp-neutral)' },
  { name: 'sextile',     sym: '⚹', ang: 60,  orb: 4, color: 'var(--asp-soft)' },
  { name: 'square',      sym: '□', ang: 90,  orb: 5, color: 'var(--asp-hard)' },
  { name: 'trine',       sym: '△', ang: 120, orb: 5, color: 'var(--asp-soft)' },
  { name: 'opposition',  sym: '☍', ang: 180, orb: 6, color: 'var(--asp-hard)' },
];

export const CX = 280, CY = 280;   // fixed viewBox centre, 560×560

/** Ecliptic longitude → SVG point. Ascendant is pinned to the left horizon. */
export function pt(r: number, lon: number): [number, number] {
  const t = ((180 - (lon - ASC)) * Math.PI) / 180;
  return [CX + r * Math.cos(t), CY - r * Math.sin(t)];
}

export const f = (n: number) => Math.round(n * 100) / 100;

export function dms(lon: number) {
  const within = ((lon % 30) + 30) % 30;
  const d = Math.floor(within);
  const m = Math.round((within - d) * 60);
  return `${d}°${String(m).padStart(2, '0')}′`;
}

export const signOf = (lon: number) =>
  SIGNS[Math.floor((((lon % 360) + 360) % 360) / 30)];

export function houseOf(lon: number) {
  const L = ((lon % 360) + 360) % 360;
  for (let i = 0; i < 12; i++) {
    const a = CUSPS[i], b = CUSPS[(i + 1) % 12];
    if (a < b ? L >= a && L < b : L >= a || L < b) return i + 1;
  }
  return 1;
}

export function sep(a: number, b: number) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

/** Zodiac ring: one wedge per sign, tinted by element. */
export function ringSegs(R1 = 272, R2 = 234, RG = 253) {
  return SIGNS.map((s, i) => {
    const l0 = i * 30, l1 = l0 + 30;
    const [ax, ay] = pt(R1, l0), [bx, by] = pt(R1, l1);
    const [cx, cy] = pt(R2, l1), [dx, dy] = pt(R2, l0);
    const [gx, gy] = pt(RG, l0 + 15);
    return {
      name: s.n, glyph: s.g, color: EL[s.el],
      // 12% tint of the element colour — hairline stroke does the rest
      fill: `color-mix(in oklab, ${EL[s.el]} 12%, transparent)`,
      gx: f(gx), gy: f(gy),
      d: `M ${f(ax)} ${f(ay)} A ${R1} ${R1} 0 0 1 ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)} A ${R2} ${R2} 0 0 0 ${f(dx)} ${f(dy)} Z`,
    };
  });
}

/** House cusps: angular cusps (1, 4, 7, 10) get the stronger hairline. */
export function houseGeom() {
  return CUSPS.map((c, i) => {
    const angular = i % 3 === 0;
    const [x1, y1] = pt(206, c);
    const [x2, y2] = pt(angular ? 272 : 234, c);
    const mid = c + ((((CUSPS[(i + 1) % 12] - c) + 360) % 360) / 2);
    const [nx, ny] = pt(196, mid);
    return {
      num: String(i + 1),
      x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2), nx: f(nx), ny: f(ny),
      stroke: angular ? 'var(--line-strong)' : 'var(--line)',
      w: angular ? 1.2 : 0.75,
    };
  });
}

/** Place glyphs on a radius, stepping inward when two bodies are within 8°. */
export function placed(list: Body[], baseR: number) {
  const sorted = [...list].sort((a, b) => a.lon - b.lon);
  let prev: number | null = null, step = 0;
  return sorted.map((p) => {
    step = prev !== null && sep(p.lon, prev) < 8 ? (step === 0 ? 1 : 0) : 0;
    prev = p.lon;
    const r = baseR - step * 26;
    const [gx, gy] = pt(r, p.lon);
    const [lx, ly] = pt(r - 17, p.lon);
    const [tx1, ty1] = pt(206, p.lon);
    const [tx2, ty2] = pt(198, p.lon);
    return {
      body: p.b, glyph: p.g, deg: dms(p.lon),
      gx: f(gx), gy: f(gy), lx: f(lx), ly: f(ly),
      tx1: f(tx1), ty1: f(ty1), tx2: f(tx2), ty2: f(ty2),
    };
  });
}

/** Aspect chords. Pass the same array twice for a natal chart. */
export function aspectLines(a: Body[], b: Body[], r: number) {
  const out = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = a === b ? i + 1 : 0; j < b.length; j++) {
      const s = sep(a[i].lon, b[j].lon);
      const def = ASPECT_DEFS.find((d) => Math.abs(s - d.ang) <= d.orb);
      if (!def) continue;
      const [x1, y1] = pt(r, a[i].lon), [x2, y2] = pt(r, b[j].lon);
      out.push({
        x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2),
        stroke: def.color, w: def.name === 'conjunction' ? 0.8 : 1.1,
        def, A: a[i], B: b[j], orb: Math.abs(s - def.ang),
      });
    }
  }
  return out;
}
```

---

## `components/Starfield.tsx`

Fixed behind the page. Two star layers drifting in opposite directions,
each star twinkling on its own cycle, plus four stars that cross the screen.
Deterministic PRNG so server and client markup match.

```tsx
'use client';
import { useMemo } from 'react';
import { f } from '@/lib/chart';

export default function Starfield() {
  const { far, near, shooting, rings, spokes } = useMemo(() => {
    let seed = 20260822;
    const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

    const stars = Array.from({ length: 96 }, () => {
      const s = rnd();
      return {
        x: f(rnd() * 1440), y: f(rnd() * 900),
        r: f(0.5 + s * 1.1), o: f(0.10 + s * 0.22),
        dur: f(3.4 + rnd() * 5.6), delay: f(rnd() * 9),
      };
    });

    return {
      far: stars.filter((s) => s.r < 1.05),
      near: stars.filter((s) => s.r >= 1.05),
      shooting: [
        { x: 120, y: -40, dur: 7, delay: 1 },
        { x: 700, y: -120, dur: 9, delay: 11 },
        { x: 320, y: 180, dur: 6.5, delay: 21 },
        { x: 980, y: 60, dur: 8, delay: 31 },
      ],
      // celestial grid, centred above the viewport so only the arcs come in
      rings: [420, 600, 780, 960, 1140].map((r, i) => ({ r, o: f(0.5 - i * 0.08) })),
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
          <circle key={i} cx={1180} cy={-260} r={g.r} fill="none"
            stroke="var(--line)" strokeWidth={0.6} opacity={g.o} />
        ))}
        {spokes.map((g, i) => (
          <line key={i} x1={1180} y1={-260} x2={g.x} y2={g.y}
            stroke="var(--line)" strokeWidth={0.6} opacity={0.5} />
        ))}
      </svg>

      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={layer}>
        <g style={{ animation: 'drift 120s ease-in-out infinite alternate' }}>
          {far.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--ink-secondary)" opacity={s.o}
              style={{ animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
          ))}
        </g>
        <g style={{ animation: 'drift 70s ease-in-out infinite alternate-reverse' }}>
          {near.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--ink-secondary)" opacity={s.o}
              style={{ animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
          ))}
        </g>
        {shooting.map((c, i) => (
          <g key={i} style={{ animation: `shoot ${c.dur}s linear ${c.delay}s infinite` }}>
            <circle cx={c.x} cy={c.y} r={1.5} fill="var(--ink-primary)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
```

---

## `components/ChartWheel.tsx`

SVG, fixed `0 0 560 560` viewBox — 560px desktop, 340px mobile, and it exports
as a standalone PNG because the opaque `--bg-deep` rect is inside the SVG.

```tsx
'use client';
import {
  BODIES, ASC, CUSPS, ringSegs, houseGeom, placed, aspectLines, pt, f, Body,
} from '@/lib/chart';

type Props = {
  bodies?: Body[];
  /** second chart, drawn on an inner ring in --ink-secondary (synastry) */
  bodiesB?: Body[];
  showAspects?: boolean;
  size?: number;
};

export default function ChartWheel({
  bodies = BODIES, bodiesB, showAspects = true, size = 560,
}: Props) {
  const signs = ringSegs();
  const houses = houseGeom();
  const glyphs = placed(bodies, bodiesB ? 190 : 182);
  const glyphsB = bodiesB ? placed(bodiesB, 158) : [];
  const aspects = bodiesB
    ? aspectLines(bodies, bodiesB, 140).sort((a, b) => a.orb - b.orb).slice(0, 8)
    : aspectLines(bodies, bodies, 150);

  const axes = [
    { lon: ASC, label: 'AC', anchor: 'end' as const },
    { lon: ASC + 180, label: 'DC', anchor: 'start' as const },
    { lon: CUSPS[9], label: 'MC', anchor: 'middle' as const },
    { lon: CUSPS[3], label: 'IC', anchor: 'middle' as const },
  ].map((a) => {
    const [x, y] = pt(281, a.lon);
    return { ...a, x: f(x), y: f(y) };
  });

  return (
    <svg viewBox="0 0 560 560" width={size} height={size}
      className="block max-w-full" role="img"
      aria-label="Natal chart wheel: zodiac ring, houses, planetary positions and aspects">
      <rect x={0} y={0} width={560} height={560} fill="var(--bg-deep)" />

      {signs.map((s) => (
        <g key={s.name}>
          <path d={s.d} fill={s.fill} stroke="var(--line-strong)" strokeWidth={0.75} />
          <text x={s.gx} y={s.gy} fill={s.color} fontSize={19}
            textAnchor="middle" dominantBaseline="central">{s.glyph}</text>
        </g>
      ))}

      <circle cx={280} cy={280} r={206} fill="none" stroke="var(--line-strong)" strokeWidth={0.75} />
      <circle cx={280} cy={280} r={bodiesB ? 172 : 150} fill="none" stroke="var(--line)" strokeWidth={0.75} />
      {bodiesB && <circle cx={280} cy={280} r={140} fill="none" stroke="var(--line)" strokeWidth={0.75} />}

      {houses.map((h) => (
        <g key={h.num}>
          <line x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} stroke={h.stroke} strokeWidth={h.w} />
          <text x={h.nx} y={h.ny} fill="var(--ink-muted)" fontSize={11}
            className="font-mono" textAnchor="middle" dominantBaseline="central">{h.num}</text>
        </g>
      ))}

      {showAspects && aspects.map((a, i) => (
        <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
          stroke={a.stroke} strokeWidth={a.w} opacity={0.75} />
      ))}

      {glyphs.map((p) => (
        <g key={p.body}>
          <line x1={p.tx1} y1={p.ty1} x2={p.tx2} y2={p.ty2} stroke="var(--gold-dim)" strokeWidth={0.75} />
          <text x={p.gx} y={p.gy} fill="var(--gold)" fontSize={19}
            textAnchor="middle" dominantBaseline="central">{p.glyph}</text>
          {!bodiesB && (
            <text x={p.lx} y={p.ly} fill="var(--ink-secondary)" fontSize={10.5}
              className="font-mono" textAnchor="middle" dominantBaseline="central">{p.deg}</text>
          )}
        </g>
      ))}

      {glyphsB.map((p) => (
        <text key={p.body} x={p.gx} y={p.gy} fill="var(--ink-secondary)" fontSize={18}
          textAnchor="middle" dominantBaseline="central">{p.glyph}</text>
      ))}

      {axes.map((a) => (
        <text key={a.label} x={a.x} y={a.y} fill="var(--ink-primary)" fontSize={11}
          className="font-mono" textAnchor={a.anchor} dominantBaseline="central">{a.label}</text>
      ))}
    </svg>
  );
}
```

---

## `app/birth-chart-calculator/page.tsx`

Input panel above the fold, then wheel → big three → reading card → paid CTA →
position table → prose. No images above the fold.

```tsx
'use client';
import { useState } from 'react';
import Starfield from '@/components/Starfield';
import ChartWheel from '@/components/ChartWheel';
import { BODIES, ASC, CUSPS, EL, dms, signOf, houseOf } from '@/lib/chart';

const NAV = ['Birth chart', 'Synastry', 'Transits', 'Ephemeris'];

const CITIES = [
  { name: 'Lisbon, Portugal', coords: '38°43′N 9°09′W' },
  { name: 'Lisbon, Ohio, United States', coords: '40°46′N 80°46′W' },
  { name: 'Lisburn, Northern Ireland', coords: '54°31′N 6°02′W' },
  { name: 'Lisboa, Guanajuato, Mexico', coords: '20°25′N 100°32′W' },
];

const BIG_THREE = [
  { glyph: '☉', label: 'Sun', sign: 'Pisces', deg: '21°44′ · house 12' },
  { glyph: '☽', label: 'Moon', sign: 'Scorpio', deg: '08°12′ · house 5' },
  { glyph: '↑', label: 'Rising', sign: 'Cancer', deg: '03°17′ · 01:23 sidereal' },
];

const field =
  'h-11 w-full rounded-control border border-hairline-strong bg-deep px-3 ' +
  'text-ink outline-none focus:border-gold';

export default function Page() {
  const [calculated, setCalculated] = useState(false);
  const [places, setPlaces] = useState(false);
  const [aspects, setAspects] = useState(true);

  const rows = [
    ...BODIES.map((p) => {
      const s = signOf(p.lon);
      return {
        glyph: p.g, body: p.b, sign: s.n, elColor: EL[s.el],
        lon: dms(p.lon), house: String(houseOf(p.lon)),
        motion: p.r ? 'retrograde' : 'direct', speed: p.sp, retro: !!p.r,
      };
    }),
    { glyph: 'AC', body: 'Ascendant', sign: signOf(ASC).n, elColor: EL[signOf(ASC).el],
      lon: dms(ASC), house: '1', motion: '—', speed: '—', retro: false },
    { glyph: 'MC', body: 'Midheaven', sign: signOf(CUSPS[9]).n, elColor: EL[signOf(CUSPS[9]).el],
      lon: dms(CUSPS[9]), house: '10', motion: '—', speed: '—', retro: false },
  ];

  return (
    <>
      <Starfield />

      <header className="border-b border-hairline px-5 sm:px-8">
        <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-h3 font-medium tracking-[-0.01em]">SideraChart</span>
            <span className="font-mono text-[11px] text-ink-muted">ephemeris v2.4</span>
          </div>
          <nav className="hidden gap-7 text-data sm:flex">
            {NAV.map((n, i) => (
              <a key={n} href="#" className={i === 0 ? 'text-ink' : 'text-ink-secondary hover:text-ink'}>{n}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <h1 className="mb-2.5 text-[26px] font-medium tracking-[-0.02em] sm:text-h1">Birth chart calculator</h1>
        <p className="mb-7 max-w-[620px] text-body text-ink-secondary [text-wrap:pretty]">
          Planetary positions computed from the Swiss Ephemeris for your exact date, time
          and coordinates. Accurate to the arcminute.
        </p>

        <section className="rounded-card border border-hairline bg-panel p-4 sm:px-6 sm:py-5">
          <div className="grid gap-4 sm:grid-cols-[150px_130px_1fr_auto] sm:items-end">
            <label className="flex flex-col gap-1.5">
              <span className="text-caption text-ink-secondary">Birth date</span>
              <input defaultValue="12.03.1994" className={`${field} font-mono text-data`} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-caption text-ink-secondary">Birth time</span>
              <input defaultValue="14:23" className={`${field} font-mono text-data`} />
            </label>
            <label className="relative flex flex-col gap-1.5">
              <span className="text-caption text-ink-secondary">Birthplace</span>
              <input defaultValue="Lisbon, Portugal" className={`${field} text-body`}
                onFocus={() => setPlaces(true)}
                onBlur={() => setTimeout(() => setPlaces(false), 120)} />
              {places && (
                <div className="absolute top-full left-0 right-0 z-20 mt-1.5 rounded-control border border-hairline-strong bg-elevated p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
                  {CITIES.map((c) => (
                    <div key={c.name}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-[7px] px-3 py-2 hover:bg-[rgba(232,230,225,0.06)]">
                      <span className="text-data text-ink">{c.name}</span>
                      <span className="font-mono text-[12px] text-ink-muted">{c.coords}</span>
                    </div>
                  ))}
                </div>
              )}
            </label>
            <button onClick={() => setCalculated(true)}
              className="h-12 rounded-control bg-gold px-6 text-[15px] font-medium text-deep hover:bg-[#E4B45A] sm:h-11">
              Calculate chart
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-hairline pt-4 sm:flex-row sm:items-center sm:gap-6">
            <label className="flex cursor-pointer items-center gap-2.5 text-data text-ink-secondary">
              <input type="checkbox"
                className="h-[18px] w-[18px] cursor-pointer appearance-none rounded-[4px] border border-hairline-strong bg-deep checked:bg-gold" />
              <span>Birth time unknown</span>
            </label>
            <span className="text-caption text-ink-muted">
              Without a time, the Moon and house cusps cannot be placed.
            </span>
          </div>
        </section>

        {calculated && (
          <>
            <div className="mt-12 border-t border-hairline pt-10 sm:mt-14 sm:pt-11">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-h2 font-medium tracking-[-0.01em]">Natal chart</h2>
                <span className="font-mono text-caption text-ink-muted">
                  12 Mar 1994 · 14:23 WET · 38°43′N 9°09′W · Placidus · tropical
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="sm:hidden"><ChartWheel showAspects={aspects} size={340} /></div>
              <div className="hidden sm:block"><ChartWheel showAspects={aspects} size={560} /></div>
            </div>

            <div className="mt-1 mb-10 flex justify-center gap-5">
              <button onClick={() => setAspects((v) => !v)}
                className="h-11 rounded-control border border-hairline-strong px-3.5 text-caption text-ink-secondary hover:border-ink-muted hover:text-ink sm:h-[34px]">
                {aspects ? 'Hide aspect lines' : 'Show aspect lines'}
              </button>
              <button className="h-11 rounded-control border border-hairline-strong px-3.5 text-caption text-ink-secondary hover:border-ink-muted hover:text-ink sm:h-[34px]">
                Download PNG
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {BIG_THREE.map((b) => (
                <div key={b.label}
                  className="flex items-center gap-4 rounded-card border border-hairline bg-panel p-4 sm:px-5 sm:py-5">
                  <span className="text-[34px] leading-none text-gold">{b.glyph}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-caption text-ink-muted">{b.label}</span>
                    <span className="text-h3 text-ink">{b.sign}</span>
                    <span className="font-mono text-data text-ink-secondary">{b.deg}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* the one light surface in the product */}
            <section className="mt-5 rounded-card bg-reading px-5 py-8 sm:px-13 sm:py-11">
              <div className="max-w-[640px]">
                <span className="font-mono text-caption text-read-secondary">reading · sun, moon, ascendant</span>
                <h3 className="mt-3.5 mb-4 font-serif text-[20px] font-medium tracking-[-0.01em] text-read sm:text-h2">
                  Water in all three places, but three different kinds of it.
                </h3>
                <p className="mb-4 font-serif text-[17px] leading-[1.68] text-read [text-wrap:pretty]">
                  Your Sun sits late in Pisces, in the twelfth house — the part of the chart that
                  keeps its own counsel. You take in far more than you report back, and you tend to
                  arrive at conclusions by a route you can&rsquo;t fully reconstruct for other people.
                  That isn&rsquo;t vagueness. It&rsquo;s a wide intake and a slow verdict.
                </p>
                <p className="mb-4 font-serif text-[17px] leading-[1.68] text-read-secondary [text-wrap:pretty]">
                  The Moon in Scorpio, conjunct Jupiter, wants the whole story or none of it. Small
                  talk costs you energy; one long conversation restores it. You are loyal in a way
                  that is closer to memory than to duty — you simply do not put people down once you
                  have picked them up.
                </p>
                <p className="font-serif text-[17px] leading-[1.68] text-read-secondary [text-wrap:pretty]">
                  Cancer rising is the softer front door. People meet care before they meet the depth
                  behind it, which is usually a kindness to them and occasionally a problem for you:
                  it takes a while before anyone realises how much you were holding.
                </p>
              </div>
            </section>

            <div className="mt-5 flex flex-col gap-3 rounded-card border border-hairline-strong bg-panel p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-h3 text-ink">Full report — 42 pages</span>
                <span className="text-data text-ink-secondary">
                  Every placement, all 78 aspects with orbs, house rulerships, and your next twelve
                  months of transits.
                </span>
              </div>
              <button className="h-12 whitespace-nowrap rounded-control bg-gold px-6 text-[15px] font-medium text-deep hover:bg-[#E4B45A] sm:h-11">
                Get full report $19
              </button>
            </div>

            <h2 className="mt-14 mb-1 text-h2 font-medium tracking-[-0.01em]">Planetary positions</h2>
            <p className="mb-4 font-mono text-data text-ink-muted">geocentric · true node · JD 2449423.10069</p>

            <div className="overflow-hidden rounded-card border border-hairline bg-panel">
              <div className="hidden grid-cols-[1.4fr_1.1fr_1fr_0.7fr_0.9fr_1fr] border-b border-hairline px-5 py-3 text-caption text-ink-muted sm:grid">
                <span>Body</span><span>Sign</span><span>Longitude</span>
                <span>House</span><span>Motion</span><span>Speed / day</span>
              </div>
              {rows.map((r) => (
                <div key={r.body}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-hairline px-4 py-3 font-mono text-data text-ink-secondary last:border-0 hover:bg-elevated sm:grid-cols-[1.4fr_1.1fr_1fr_0.7fr_0.9fr_1fr] sm:gap-0 sm:px-5">
                  <span className="flex items-center gap-2.5 text-ink">
                    <span className="text-[16px] text-gold">{r.glyph}</span>{r.body}
                  </span>
                  <span className="sm:hidden">{r.lon} {r.sign}</span>
                  <span className="hidden sm:inline" style={{ color: r.elColor }}>{r.sign}</span>
                  <span className="hidden text-ink sm:inline">{r.lon}</span>
                  <span className="hidden sm:inline">{r.house}</span>
                  <span className="hidden sm:inline" style={{ color: r.retro ? 'var(--gold)' : 'var(--ink-muted)' }}>{r.motion}</span>
                  <span className="hidden sm:inline">{r.speed}</span>
                </div>
              ))}
            </div>

            <section className="mt-16 grid gap-10 border-t border-hairline pt-11 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <h2 className="mb-4 text-h2 font-medium tracking-[-0.01em]">How a birth chart is calculated</h2>
                <p className="mb-3.5 text-body text-ink-secondary [text-wrap:pretty]">
                  A natal chart is a diagram of the sky from one place at one moment. Two inputs do
                  the work: time, which fixes where each body sat along the ecliptic, and
                  coordinates, which fix which part of that sky was rising. SideraChart resolves your
                  birthplace to latitude and longitude, converts local clock time to Universal Time
                  using the timezone rules in force on that date, then reads planetary longitudes
                  from the Swiss Ephemeris.
                </p>
                <p className="mb-3.5 text-body text-ink-secondary [text-wrap:pretty]">
                  Positions are given in the tropical zodiac, measured from the vernal equinox, which
                  is the convention used in Western astrology. Sidereal longitudes differ by roughly
                  24 degrees today and can be shown instead in the full report.
                </p>
                <h3 className="mt-8 mb-2.5 text-h3 font-medium">Why birth time matters</h3>
                <p className="mb-3.5 text-body text-ink-secondary [text-wrap:pretty]">
                  The Ascendant moves about one degree every four minutes, so a twenty minute error
                  shifts it by five degrees and can change the sign entirely. The Moon moves roughly
                  half a degree an hour. Everything else — Sun through Pluto — is stable enough
                  across a day that an unknown time still gives a usable chart, minus the houses.
                </p>
                <h3 className="mt-8 mb-2.5 text-h3 font-medium">House systems</h3>
                <p className="text-body text-ink-secondary [text-wrap:pretty]">
                  Placidus is the default because it is the most widely used, and most published
                  interpretations assume it. It divides time rather than space, which makes houses
                  uneven and breaks down above roughly 66° latitude; for births in the far north,
                  Whole Sign or Equal House is the more honest choice.
                </p>
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="rounded-card border border-hairline p-5">
                  <span className="font-mono text-caption text-ink-muted">sources</span>
                  <div className="mt-3 flex flex-col gap-2.5 text-data text-ink-secondary">
                    <span>Swiss Ephemeris (DE431)</span>
                    <span>IANA timezone database 2026a</span>
                    <span>GeoNames gazetteer</span>
                  </div>
                </div>
                <div className="rounded-card border border-hairline p-5">
                  <span className="font-mono text-caption text-ink-muted">precision</span>
                  <div className="mt-3 flex flex-col gap-2.5 font-mono text-data text-ink-secondary">
                    <span>longitude ± 0°00′30″</span>
                    <span>house cusps ± 0°01′</span>
                    <span>orb tolerance 6° / 4°</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
```

---

## `app/synastry/page.tsx` — shape only

Same header. Two input panels in a `grid sm:grid-cols-2 gap-5`, each a
`rounded-card border border-hairline bg-panel` block with a dot marking the
chart (`bg-gold` for A, `bg-ink-secondary` for B), name field, date + time in a
two-column grid, birthplace, and resolved coordinates in mono underneath. Gold
`Compare charts` button below. Results: `grid lg:grid-cols-[560px_1fr] gap-10`
— on the left `<ChartWheel bodies={a} bodiesB={b} />`, on the right a
`Cross aspects` list (`Ana ☌ Tomás` in mono, aspect name in its
`--asp-*` colour, orb in `--ink-muted`) and one light reading card.
