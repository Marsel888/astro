import { ImageResponse } from 'next/og';

// iOS ignores SVG favicons and crops to a rounded square itself, so this is a
// flat PNG with no corner radius of its own and a little more padding.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0e14',
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="21" fill="none" stroke="#d9a441" strokeWidth="2.5" opacity="0.42" />
          <path
            d="M32 12 C33.5 24.5 39.5 30.5 52 32 C39.5 33.5 33.5 39.5 32 52 C30.5 39.5 24.5 33.5 12 32 C24.5 30.5 30.5 24.5 32 12 Z"
            fill="#d9a441"
          />
        </svg>
      </div>
    ),
    size,
  );
}
