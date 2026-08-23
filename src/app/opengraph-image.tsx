import { ImageResponse } from 'next/og';

// Facebook, LinkedIn, Slack, Telegram and X all want a raster image at roughly
// 1.91:1, so this is generated rather than shipped as SVG — none of them render
// SVG previews.
export const alt = 'SideraChart — free birth chart calculators from a real ephemeris';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GOLD = '#d9a441';
const INK = '#e8e6e1';
const MUTED = '#9ba3b4';
const DEEP = '#0b0e14';

/** Twelve sign divisions, drawn the way the real wheel draws them. */
function wheelTicks() {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x1 = 150 + Math.cos(angle) * 108;
    const y1 = 150 + Math.sin(angle) * 108;
    const x2 = 150 + Math.cos(angle) * 132;
    const y2 = 150 + Math.sin(angle) * 132;
    return { x1, y1, x2, y2, key: i };
  });
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 72,
          padding: '0 96px',
          background: DEEP,
          backgroundImage: `radial-gradient(circle at 22% 40%, rgba(217,164,65,0.14), transparent 55%)`,
        }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300" style={{ flexShrink: 0 }}>
          <circle cx="150" cy="150" r="140" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.35" />
          <circle cx="150" cy="150" r="108" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.22" />
          <circle cx="150" cy="150" r="74" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.16" />
          {wheelTicks().map((t) => (
            <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={GOLD} strokeWidth="2" opacity="0.3" />
          ))}
          <path
            d="M150 62 C156 116 184 144 238 150 C184 156 156 184 150 238 C144 184 116 156 62 150 C116 144 144 116 150 62 Z"
            fill={GOLD}
          />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 600, letterSpacing: '-0.03em' }}>
            <span style={{ color: GOLD }}>Sidera</span>
            <span style={{ color: INK }}>Chart</span>
          </div>
          <div style={{ color: INK, fontSize: 34, marginTop: 20, lineHeight: 1.3, maxWidth: 560 }}>
            Free birth chart calculators
          </div>
          <div style={{ color: MUTED, fontSize: 26, marginTop: 14, lineHeight: 1.4, maxWidth: 600 }}>
            Real ephemeris positions, Placidus houses, and a written reading. No account needed.
          </div>
          <div
            style={{
              color: GOLD,
              fontSize: 22,
              marginTop: 40,
              letterSpacing: '0.04em',
            }}
          >
            siderachart.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
