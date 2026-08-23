'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';
import { takeStashedBirth } from '@/lib/stashedBirth';
import type { BirthData } from '@/lib/places/defaults';

/**
 * Picks up the birth data a guest left behind before going to register, once
 * they come back signed in, and hands it to the calculator so the result is
 * already on screen with the save button live.
 *
 * Runs at most once: the stash is consumed on read, and the ref guards against
 * the session hook resolving more than once.
 */
export function useStashedBirth(signedIn: boolean, apply: (data: BirthData) => void) {
  const pathname = usePathname();
  const done = useRef(false);
  const applyRef = useRef(apply);
  applyRef.current = apply;

  useEffect(() => {
    if (!signedIn || done.current) return;
    const stashed = takeStashedBirth(pathname);
    if (!stashed) return;
    done.current = true;
    applyRef.current(stashed);
  }, [signedIn, pathname]);
}
