'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FIELD, POPOVER } from '@/components/ui';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

type Props = {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function parseTime(raw: string): string | null {
  const t = raw.trim();
  const m = /^(\d{1,2}):(\d{2})$/.exec(t);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return `${pad(h)}:${pad(min)}`;
}

function parts(value: string) {
  const [h, m] = value.split(':').map(Number);
  return { h: Number.isFinite(h) ? h : 12, m: Number.isFinite(m) ? m : 0 };
}

export default function TimeField({ value, onChange, disabled }: Props) {
  const t = useTranslations('form');
  const rootRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLButtonElement>(null);
  const minRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(value);
  const { h, m } = parts(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    hourRef.current?.scrollIntoView({ block: 'center' });
    minRef.current?.scrollIntoView({ block: 'center' });
  }, [open, h, m]);

  function commitText() {
    const next = parseTime(text);
    if (next) {
      onChange(next);
      setText(next);
    } else {
      setText(value);
    }
  }

  function pick(nextH: number, nextM: number) {
    onChange(`${pad(nextH)}:${pad(nextM)}`);
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <label className="flex flex-col gap-1.5">
        <span className="text-caption text-ink-secondary">{t('time')}</span>
        <span className="relative block">
          <input
            value={text}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => {
              if (!disabled) setOpen(true);
            }}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitText();
                setOpen(false);
              }
              if (e.key === 'Escape') setOpen(false);
            }}
            className={`${FIELD} pr-9 font-mono text-data disabled:opacity-40 ${open ? 'border-gold' : ''}`}
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink-muted">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
              <circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 4.8v3.4l2.2 1.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
        </span>
      </label>

      {open && !disabled && (
        <div className={`${POPOVER} left-0 top-[calc(100%+6px)] w-[168px]`}>
          <div className="grid grid-cols-2 border-b border-hairline font-mono text-[11px] text-ink-muted">
            <span className="px-3 py-1.5">Hour</span>
            <span className="px-3 py-1.5">Min</span>
          </div>
          <div className="grid h-56 grid-cols-2">
            <div className="place-scroll overflow-auto border-r border-hairline">
              {HOURS.map((hour) => (
                <button
                  key={hour}
                  ref={hour === h ? hourRef : undefined}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(hour, m)}
                  className={`block w-full px-3 py-1.5 text-left font-mono text-[13px] ${
                    hour === h
                      ? 'bg-gold text-deep'
                      : 'text-ink-secondary hover:bg-[rgba(232,230,225,0.06)] hover:text-ink'
                  }`}
                >
                  {pad(hour)}
                </button>
              ))}
            </div>
            <div className="place-scroll overflow-auto">
              {MINUTES.map((min) => (
                <button
                  key={min}
                  ref={min === m ? minRef : undefined}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    pick(h, min);
                    setOpen(false);
                  }}
                  className={`block w-full px-3 py-1.5 text-left font-mono text-[13px] ${
                    min === m
                      ? 'bg-gold text-deep'
                      : 'text-ink-secondary hover:bg-[rgba(232,230,225,0.06)] hover:text-ink'
                  }`}
                >
                  {pad(min)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
