export const SIGNS = [
  { n: 'Aries', g: '♈', el: 'fire' },
  { n: 'Taurus', g: '♉', el: 'earth' },
  { n: 'Gemini', g: '♊', el: 'air' },
  { n: 'Cancer', g: '♋', el: 'water' },
  { n: 'Leo', g: '♌', el: 'fire' },
  { n: 'Virgo', g: '♍', el: 'earth' },
  { n: 'Libra', g: '♎', el: 'air' },
  { n: 'Scorpio', g: '♏', el: 'water' },
  { n: 'Sagittarius', g: '♐', el: 'fire' },
  { n: 'Capricorn', g: '♑', el: 'earth' },
  { n: 'Aquarius', g: '♒', el: 'air' },
  { n: 'Pisces', g: '♓', el: 'water' },
] as const;

export type SignName = (typeof SIGNS)[number]['n'];
export type ElementName = (typeof SIGNS)[number]['el'];

export const EL: Record<ElementName, string> = {
  fire: 'var(--el-fire)',
  earth: 'var(--el-earth)',
  air: 'var(--el-air)',
  water: 'var(--el-water)',
};

export type BodyPoint = {
  b: string;
  g: string;
  lon: number;
  sp: string;
  r?: boolean;
};

export const CX = 280;
export const CY = 280;

export function norm360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/** Round to 1″ so 29°59′60″ does not display as 30° of the previous sign. */
export function snapLon(lon: number): number {
  return norm360(Math.round(norm360(lon) * 3600) / 3600);
}

export const f = (n: number) => Math.round(n * 100) / 100;

export function dms(lon: number): string {
  const within = snapLon(lon) % 30;
  let d = Math.floor(within + 1e-9);
  let m = Math.round((within - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  if (d >= 30) d = 0;
  return `${d}°${String(m).padStart(2, '0')}′`;
}

export const signOf = (lon: number) => SIGNS[Math.floor(snapLon(lon) / 30) % 12];

export function sep(a: number, b: number): number {
  const d = Math.abs(norm360(a) - norm360(b)) % 360;
  return d > 180 ? 360 - d : d;
}

export function pt(r: number, lon: number, asc: number): [number, number] {
  const t = ((180 - (lon - asc)) * Math.PI) / 180;
  return [CX + r * Math.cos(t), CY - r * Math.sin(t)];
}

export function ringSegs(asc: number, R1 = 272, R2 = 234, RG = 253) {
  return SIGNS.map((s, i) => {
    const l0 = i * 30;
    const l1 = l0 + 30;
    const [ax, ay] = pt(R1, l0, asc);
    const [bx, by] = pt(R1, l1, asc);
    const [cx, cy] = pt(R2, l1, asc);
    const [dx, dy] = pt(R2, l0, asc);
    const [gx, gy] = pt(RG, l0 + 15, asc);
    return {
      name: s.n,
      glyph: s.g,
      color: EL[s.el],
      fill: `color-mix(in oklab, ${EL[s.el]} 12%, transparent)`,
      gx: f(gx),
      gy: f(gy),
      d: `M ${f(ax)} ${f(ay)} A ${R1} ${R1} 0 0 1 ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)} A ${R2} ${R2} 0 0 0 ${f(dx)} ${f(dy)} Z`,
    };
  });
}

export function houseGeom(cusps: number[], asc: number) {
  return cusps.map((c, i) => {
    const angular = i % 3 === 0;
    const [x1, y1] = pt(206, c, asc);
    const [x2, y2] = pt(angular ? 272 : 234, c, asc);
    const next = cusps[(i + 1) % 12];
    const mid = c + (((next - c + 360) % 360) / 2);
    const [nx, ny] = pt(196, mid, asc);
    return {
      num: String(i + 1),
      x1: f(x1),
      y1: f(y1),
      x2: f(x2),
      y2: f(y2),
      nx: f(nx),
      ny: f(ny),
      stroke: angular ? 'var(--line-strong)' : 'var(--line)',
      w: angular ? 1.2 : 0.75,
    };
  });
}

export function placed(list: BodyPoint[], baseR: number, asc: number) {
  const sorted = [...list].sort((a, b) => a.lon - b.lon);
  let prev: number | null = null;
  let step = 0;
  return sorted.map((p) => {
    step = prev !== null && sep(p.lon, prev) < 8 ? (step === 0 ? 1 : 0) : 0;
    prev = p.lon;
    const r = baseR - step * 26;
    const [gx, gy] = pt(r, p.lon, asc);
    const [lx, ly] = pt(r - 17, p.lon, asc);
    const [tx1, ty1] = pt(206, p.lon, asc);
    const [tx2, ty2] = pt(198, p.lon, asc);
    return {
      body: p.b,
      glyph: p.g,
      deg: dms(p.lon),
      gx: f(gx),
      gy: f(gy),
      lx: f(lx),
      ly: f(ly),
      tx1: f(tx1),
      ty1: f(ty1),
      tx2: f(tx2),
      ty2: f(ty2),
    };
  });
}

/**
 * The single orb table for the whole app. The wheel draws these lines and the
 * positions table lists these rows, so the two can never disagree.
 */
export const ASPECT_DEFS = [
  { name: 'conjunction', sym: '☌', ang: 0, orb: 8, color: 'var(--asp-neutral)' },
  { name: 'sextile', sym: '⚹', ang: 60, orb: 4, color: 'var(--asp-soft)' },
  { name: 'square', sym: '□', ang: 90, orb: 6, color: 'var(--asp-hard)' },
  { name: 'trine', sym: '△', ang: 120, orb: 6, color: 'var(--asp-soft)' },
  { name: 'opposition', sym: '☍', ang: 180, orb: 8, color: 'var(--asp-hard)' },
] as const;

export function aspectLines(a: BodyPoint[], b: BodyPoint[], r: number, asc: number) {
  const out: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    w: number;
    def: (typeof ASPECT_DEFS)[number];
    A: BodyPoint;
    B: BodyPoint;
    orb: number;
  }> = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = a === b ? i + 1 : 0; j < b.length; j++) {
      const s = sep(a[i].lon, b[j].lon);
      const def = ASPECT_DEFS.find((d) => Math.abs(s - d.ang) <= d.orb);
      if (!def) continue;
      const [x1, y1] = pt(r, a[i].lon, asc);
      const [x2, y2] = pt(r, b[j].lon, asc);
      out.push({
        x1: f(x1),
        y1: f(y1),
        x2: f(x2),
        y2: f(y2),
        stroke: def.color,
        w: def.name === 'conjunction' ? 0.8 : 1.1,
        def,
        A: a[i],
        B: b[j],
        orb: Math.abs(s - def.ang),
      });
    }
  }
  return out;
}
