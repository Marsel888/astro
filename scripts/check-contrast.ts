/**
 * WCAG contrast gate for the palette in src/app/globals.css.
 *
 * Text tokens must clear 4.5:1 against the surface they sit on; tokens used only
 * as lines or glyph strokes must clear 3:1. Run after touching any colour.
 */
import { readFileSync } from 'node:fs';

const css = readFileSync('src/app/globals.css', 'utf8');

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!match) throw new Error(`Token --${name} not found in globals.css`);
  return match[1];
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

type Check = { fg: string; bg: string; min: number; note: string };

const CHECKS: Check[] = [
  { fg: 'ink-primary', bg: 'bg-deep', min: 4.5, note: 'body text' },
  { fg: 'ink-secondary', bg: 'bg-deep', min: 4.5, note: 'secondary text' },
  { fg: 'ink-muted', bg: 'bg-deep', min: 4.5, note: 'captions, 13px' },
  { fg: 'ink-muted', bg: 'bg-panel', min: 4.5, note: 'captions on cards' },
  { fg: 'ink-secondary', bg: 'bg-elevated', min: 4.5, note: 'popover text' },
  { fg: 'gold', bg: 'bg-deep', min: 4.5, note: 'links, glyphs' },
  { fg: 'gold', bg: 'bg-panel', min: 4.5, note: 'links on cards' },
  { fg: 'asp-hard', bg: 'bg-deep', min: 4.5, note: 'error text, hard aspects' },
  { fg: 'asp-soft', bg: 'bg-deep', min: 4.5, note: 'soft aspects' },
  { fg: 'asp-neutral', bg: 'bg-deep', min: 3, note: 'conjunction lines' },
  { fg: 'el-fire', bg: 'bg-panel', min: 4.5, note: 'fire sign label' },
  { fg: 'el-earth', bg: 'bg-panel', min: 4.5, note: 'earth sign label' },
  { fg: 'el-air', bg: 'bg-panel', min: 4.5, note: 'air sign label' },
  { fg: 'el-water', bg: 'bg-panel', min: 4.5, note: 'water sign label' },
  { fg: 'read-primary', bg: 'bg-reading', min: 4.5, note: 'report heading' },
  { fg: 'read-secondary', bg: 'bg-reading', min: 4.5, note: 'report body' },
  { fg: 'bg-deep', bg: 'gold', min: 4.5, note: 'primary button label' },
];

console.log('foreground        background     ratio   min   note');
console.log('─'.repeat(72));

let failed = 0;
for (const check of CHECKS) {
  const value = ratio(token(check.fg), token(check.bg));
  const ok = value >= check.min;
  if (!ok) failed += 1;
  console.log(
    `${check.fg.padEnd(17)} ${check.bg.padEnd(13)} ${value.toFixed(2).padStart(6)}  ${String(check.min).padStart(4)}   ${check.note}${ok ? '' : '  <<< FAIL'}`,
  );
}

console.log(failed === 0 ? '\nPASS — palette meets WCAG AA.' : `\nFAIL — ${failed} pair(s) below target.`);
process.exit(failed === 0 ? 0 : 1);
