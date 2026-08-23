'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ATLAS, mergePlaces, searchAtlas, type Place } from '@/lib/places/atlas';
import { FIELD, POPOVER } from '@/components/ui';
import { useLocale, useTranslations } from 'next-intl';

export type { Place };

type Props = {
  value: Place;
  onSelect: (place: Place) => void;
};

export default function PlaceSearch({ value, onSelect }: Props) {
  const t = useTranslations('form');
  const locale = useLocale();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [remote, setRemote] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const [active, setActive] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<number | null>(null);

  const local = useMemo(() => searchAtlas(q), [q]);
  const rows = q.trim().length < 2 ? local : mergePlaces(local, remote);

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
    const t = window.setTimeout(() => searchRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const needle = q.trim();
    if (needle.length < 2) {
      setRemote([]);
      setSearching(false);
      return;
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      setSearching(true);
      fetch(`/api/places?q=${encodeURIComponent(needle)}&lang=${encodeURIComponent(locale)}`, { signal: ac.signal })
        .then((res) => (res.ok ? res.json() : []))
        .then((data: Place[]) => {
          setRemote(Array.isArray(data) ? data : []);
          setActive(0);
        })
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === 'AbortError') return;
        })
        .finally(() => setSearching(false));
    }, 280);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [q, open, locale]);

  function pick(place: Place) {
    onSelect(place);
    setOpen(false);
    setQ('');
    setRemote([]);
  }

  function onSearchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(rows.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (rows[active]) pick(rows[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const status = searching
    ? 'Searching the world map…'
    : q.trim().length < 2
      ? `${ATLAS.length} cities — type a town or village`
      : rows.length
        ? `${rows.length} matches`
        : 'No matches — try another spelling';

  return (
    <div ref={rootRef} className="relative min-w-0">
      <label className="flex flex-col gap-1.5">
        <span className="text-caption text-ink-secondary">{t('place')}</span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className={`${FIELD} flex items-center justify-between gap-2 text-left text-body ${open ? 'border-gold' : ''}`}
        >
          <span className="truncate">{value.name}</span>
          <span className="font-mono text-[11px] text-ink-muted">▾</span>
        </button>
      </label>

      {open && (
        <div className={`${POPOVER} left-0 right-0 top-[calc(100%+6px)] sm:left-auto sm:right-0 sm:w-[min(560px,calc(100vw-2rem))]`}>
          <div className="border-b border-hairline p-2">
            <input
              ref={searchRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onKeyDown={onSearchKey}
              placeholder={t('placeSearch')}
              autoComplete="off"
              spellCheck={false}
              className={`${FIELD} text-body`}
            />
          </div>
          <div className="flex items-center justify-between border-b border-hairline px-3 py-1.5 font-mono text-[11px] text-ink-muted">
            <span>{status}</span>
            <span>scroll</span>
          </div>
          <div className="place-scroll max-h-72 overflow-auto overscroll-contain">
            <table id={listId} className="w-full border-collapse text-left">
              <thead className="sticky top-0 bg-elevated">
                <tr className="font-mono text-[11px] text-ink-muted">
                  <th className="px-3 py-2 font-normal">Place</th>
                  <th className="hidden px-3 py-2 font-normal sm:table-cell">Region</th>
                  <th className="px-3 py-2 text-right font-normal">Coords</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c, i) => (
                  <tr
                    key={`${c.name}-${c.lat}-${c.lon}-${i}`}
                    data-active={i === active}
                    className={`cursor-pointer ${
                      i === active ? 'bg-[rgba(232,230,225,0.08)]' : 'hover:bg-[rgba(232,230,225,0.05)]'
                    }`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => pick(c)}
                  >
                    <td className="px-3 py-2 text-data text-ink">{c.name}</td>
                    <td className="hidden truncate px-3 py-2 font-mono text-[11px] text-ink-muted sm:table-cell">
                      {c.detail ?? c.kind ?? '—'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-[11px] text-ink-muted">
                      {c.coords}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
