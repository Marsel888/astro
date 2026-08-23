'use client';

import { useCallback, useRef } from 'react';

/**
 * Moves the viewport and the screen reader to the result after a calculation.
 * Without this the wheel renders below the fold on a phone and the submit looks
 * like it did nothing.
 */
export function useResultFocus<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const focusResult = useCallback(() => {
    // The result mounts in the same commit as the state update, so wait a frame.
    requestAnimationFrame(() => {
      const node = ref.current;
      if (!node) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      node.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      node.focus({ preventScroll: true });
    });
  }, []);

  return { ref, focusResult };
}
