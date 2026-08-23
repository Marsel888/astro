'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FIELD, POPOVER } from '@/components/ui';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const MIN_YEAR = 1800;
const MAX_YEAR = 2035;

type Props = {
  value: string;
  onChange: (iso: string) => void;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toIso(y: number, m: number, d: number) {
  return `${y}-${pad(m)}-${pad(d)}`;
}

function parseIso(iso: string) {
  const [ys, ms, ds] = iso.split('-');
  const y = Number(ys);
  const m = Number(ms);
  const d = Number(ds);
  if (!y || !m || !d) return { y: 1994, m: 3, d: 12 };
  return { y, m, d };
}

function isoToDisplay(iso: string) {
  const { y, m, d } = parseIso(iso);
  return `${pad(d)}.${pad(m)}.${y}`;
}

function validCivil(y: number, m: number, d: number) {
  if (y < MIN_YEAR || y > MAX_YEAR || m < 1 || m > 12 || d < 1) return false;
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

function parseDisplay(raw: string): string | null {
  const t = raw.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
  if (iso) {
    const y = Number(iso[1]);
    const m = Number(iso[2]);
    const d = Number(iso[3]);
    return validCivil(y, m, d) ? toIso(y, m, d) : null;
  }
  const eu = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(t);
  if (eu) {
    const d = Number(eu[1]);
    const m = Number(eu[2]);
    const y = Number(eu[3]);
    return validCivil(y, m, d) ? toIso(y, m, d) : null;
  }
  return null;
}

function monthGrid(y: number, m: number) {
  const first = new Date(y, m - 1, 1);
  const start = (first.getDay() + 6) % 7;
  const count = new Date(y, m, 0).getDate();
  const cells: Array<number | null> = [...Array(start).fill(null)];
  for (let d = 1; d <= count; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function shiftMonth(y: number, m: number, delta: number) {
  const dt = new Date(y, m - 1 + delta, 1);
  const ny = dt.getFullYear();
  const nm = dt.getMonth() + 1;
  if (ny < MIN_YEAR) return { y: MIN_YEAR, m: 1 };
  if (ny > MAX_YEAR) return { y: MAX_YEAR, m: 12 };
  return { y: ny, m: nm };
}

export default function DateField({ value, onChange }: Props) {
  const t = useTranslations('form');
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(isoToDisplay(value));
  const selected = parseIso(value);
  const [view, setView] = useState({ y: selected.y, m: selected.m });

  useEffect(() => {
    setText(isoToDisplay(value));
  }, [value]);

  useEffect(() => {
    if (open) setView({ y: selected.y, m: selected.m });
  }, [open, selected.y, selected.m]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const cells = useMemo(() => monthGrid(view.y, view.m), [view.y, view.m]);
  const today = new Date();

  function commitText() {
    const next = parseDisplay(text);
    if (next) {
      onChange(next);
      setText(isoToDisplay(next));
    } else {
      setText(isoToDisplay(value));
    }
  }

  function pick(d: number) {
    onChange(toIso(view.y, view.m, d));
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <label className="flex flex-col gap-1.5">
        <span className="text-caption text-ink-secondary">{t('date')}</span>
        <span className="relative block">
          <input
            value={text}
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitText();
                setOpen(false);
              }
              if (e.key === 'Escape') setOpen(false);
            }}
            className={`${FIELD} pr-9 font-mono text-data ${open ? 'border-gold' : ''}`}
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink-muted">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
              <rect
                x="2"
                y="3.2"
                width="12"
                height="10.3"
                rx="1.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M2 6.4h12M5.2 2.2v2.4M10.8 2.2v2.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
        </span>
      </label>

      {open && (
        <div className={`${POPOVER} left-0 top-[calc(100%+6px)] w-[272px] p-3`}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label="Previous year"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView((v) => shiftMonth(v.y, v.m, -12))}
              className="grid h-8 w-8 place-items-center rounded-[7px] font-mono text-ink-muted hover:bg-[rgba(232,230,225,0.06)] hover:text-ink"
            >
              ‹‹
            </button>
            <button
              type="button"
              aria-label="Previous month"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView((v) => shiftMonth(v.y, v.m, -1))}
              className="grid h-8 w-8 place-items-center rounded-[7px] font-mono text-ink-muted hover:bg-[rgba(232,230,225,0.06)] hover:text-ink"
            >
              ‹
            </button>
            <span className="min-w-0 flex-1 text-center font-mono text-[12px] text-ink">
              {MONTHS[view.m - 1]} {view.y}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView((v) => shiftMonth(v.y, v.m, 1))}
              className="grid h-8 w-8 place-items-center rounded-[7px] font-mono text-ink-muted hover:bg-[rgba(232,230,225,0.06)] hover:text-ink"
            >
              ›
            </button>
            <button
              type="button"
              aria-label="Next year"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView((v) => shiftMonth(v.y, v.m, 12))}
              className="grid h-8 w-8 place-items-center rounded-[7px] font-mono text-ink-muted hover:bg-[rgba(232,230,225,0.06)] hover:text-ink"
            >
              ››
            </button>
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1 text-center font-mono text-[11px] text-ink-muted">
                {d}
              </span>
            ))}
            {cells.map((d, i) => {
              if (d == null) return <span key={`e-${i}`} />;
              const isSel = d === selected.d && view.m === selected.m && view.y === selected.y;
              const isToday =
                d === today.getDate() &&
                view.m === today.getMonth() + 1 &&
                view.y === today.getFullYear();
              return (
                <button
                  key={d}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(d)}
                  className={`grid h-8 place-items-center rounded-[7px] font-mono text-[13px] ${
                    isSel
                      ? 'bg-gold text-deep'
                      : isToday
                        ? 'text-ink ring-1 ring-inset ring-[var(--line-strong)]'
                        : 'text-ink-secondary hover:bg-[rgba(232,230,225,0.06)] hover:text-ink'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
