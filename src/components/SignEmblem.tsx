import { EL, SIGNS, type ElementName, type SignName } from '@/lib/chart';

const MAP: Record<SignName, { dots: Array<[number, number]>; lines: Array<[number, number]> }> = {
  Aries: {
    dots: [[22, 52], [32, 38], [44, 28], [58, 22], [50, 40]],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4]],
  },
  Taurus: {
    dots: [[24, 30], [36, 22], [48, 30], [40, 44], [40, 58]],
    lines: [[0, 1], [1, 2], [0, 3], [2, 3], [3, 4]],
  },
  Gemini: {
    dots: [[28, 20], [28, 40], [28, 60], [52, 20], [52, 40], [52, 60]],
    lines: [[0, 1], [1, 2], [3, 4], [4, 5], [1, 4]],
  },
  Cancer: {
    dots: [[30, 28], [48, 24], [56, 38], [44, 50], [26, 48]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
  },
  Leo: {
    dots: [[22, 42], [34, 28], [50, 24], [58, 38], [50, 54], [34, 56]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
  },
  Virgo: {
    dots: [[24, 24], [36, 32], [48, 24], [44, 46], [32, 52], [56, 58]],
    lines: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5]],
  },
  Libra: {
    dots: [[20, 40], [40, 24], [60, 40], [40, 56]],
    lines: [[0, 1], [1, 2], [0, 3], [2, 3]],
  },
  Scorpio: {
    dots: [[18, 44], [30, 32], [42, 28], [54, 36], [58, 52], [46, 58]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
  },
  Sagittarius: {
    dots: [[22, 58], [34, 44], [46, 30], [58, 20], [50, 40]],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4]],
  },
  Capricorn: {
    dots: [[24, 28], [38, 22], [52, 32], [46, 48], [30, 56], [22, 44]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
  },
  Aquarius: {
    dots: [[20, 32], [32, 44], [46, 32], [58, 44], [34, 58], [50, 58]],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4], [2, 5]],
  },
  Pisces: {
    dots: [[24, 24], [24, 56], [56, 24], [56, 56], [40, 40]],
    lines: [[0, 1], [2, 3], [0, 4], [2, 4], [1, 4], [3, 4]],
  },
};

type Props = {
  sign: SignName;
  size?: number;
};

export default function SignEmblem({ sign, size = 72 }: Props) {
  const meta = SIGNS.find((s) => s.n === sign)!;
  const map = MAP[sign];
  const color = EL[meta.el as ElementName];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className="shrink-0"
      aria-hidden
    >
      <circle cx={40} cy={40} r={38} fill="color-mix(in oklab, var(--bg-elevated) 80%, transparent)" stroke="var(--line-strong)" strokeWidth={0.8} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const inner = i % 3 === 0 ? 32 : 34;
        return (
          <line
            key={i}
            x1={40 + inner * Math.cos(a)}
            y1={40 + inner * Math.sin(a)}
            x2={40 + 37 * Math.cos(a)}
            y2={40 + 37 * Math.sin(a)}
            stroke="var(--line)"
            strokeWidth={i % 3 === 0 ? 1.1 : 0.6}
          />
        );
      })}
      {map.lines.map(([a, b], i) => (
        <line
          key={i}
          x1={map.dots[a][0]}
          y1={map.dots[a][1]}
          x2={map.dots[b][0]}
          y2={map.dots[b][1]}
          stroke={color}
          strokeWidth={1}
          opacity={0.85}
        />
      ))}
      {map.dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 1.8 : 1.2} fill="var(--gold)" />
      ))}
    </svg>
  );
}
