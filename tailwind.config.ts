import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
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
        gold: { DEFAULT: 'var(--gold)', dim: 'var(--gold-dim)', hover: 'var(--gold-hover)' },
        el: {
          fire: 'var(--el-fire)',
          earth: 'var(--el-earth)',
          air: 'var(--el-air)',
          water: 'var(--el-water)',
        },
        asp: {
          hard: 'var(--asp-hard)',
          soft: 'var(--asp-soft)',
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
        h1: ['32px', '1.15'],
        h2: ['24px', '1.2'],
        h3: ['18px', '1.35'],
        body: ['16px', '1.6'],
        data: ['14px', '1.45'],
        caption: ['13px', '1.4'],
      },
    },
  },
  plugins: [],
};

export default config;
