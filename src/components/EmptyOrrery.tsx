'use client';

export default function EmptyOrrery({ caption }: { caption: string }) {
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const t = ((i * 30 - 90) * Math.PI) / 180;
    return { x2: 140 + 118 * Math.cos(t), y2: 140 + 118 * Math.sin(t) };
  });

  return (
    <div className="mt-12 flex flex-col items-center border-t border-hairline pt-10">
      <div className="relative">
        <svg viewBox="0 0 280 280" width={280} height={280} className="max-w-full opacity-70" aria-hidden>
          <circle cx={140} cy={140} r={118} fill="none" stroke="var(--line)" strokeWidth={0.8} />
          <circle cx={140} cy={140} r={88} fill="none" stroke="var(--line)" strokeWidth={0.8} />
          <circle cx={140} cy={140} r={52} fill="none" stroke="var(--line-strong)" strokeWidth={0.8} />
          <g className="orrery-spin origin-center">
            {spokes.map((s, i) => (
              <line
                key={i}
                x1={140}
                y1={140}
                x2={s.x2}
                y2={s.y2}
                stroke={i % 3 === 0 ? 'var(--gold-dim)' : 'var(--line)'}
                strokeWidth={i % 3 === 0 ? 1 : 0.6}
              />
            ))}
          </g>
          <circle cx={140} cy={140} r={4} fill="var(--gold)" />
        </svg>
      </div>
      <p className="mt-4 max-w-[420px] text-center font-mono text-caption text-ink-muted">{caption}</p>
    </div>
  );
}
