import type { BirthData } from '@/lib/places/defaults';

/**
 * Holds the birth data a guest already typed while they go and create an account.
 *
 * It lives in sessionStorage, on their own device, and is cleared as soon as it
 * is used: the point of requiring an account before saving is that unowned birth
 * data should not sit on our server, so parking it there in the meantime would
 * defeat the change.
 */
const KEY = 'sidera:stashed-birth';

type Stash = {
  path: string;
  data: BirthData;
};

export function stashBirth(path: string, data: BirthData) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ path, data } satisfies Stash));
  } catch {
    // Private mode, or storage disabled. The user retypes; nothing breaks.
  }
}

/** Returns the stash for this path once, then forgets it. */
export function takeStashedBirth(path: string): BirthData | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stash;
    if (parsed?.path !== path || !parsed.data?.date || !parsed.data?.place) return null;
    sessionStorage.removeItem(KEY);
    return parsed.data;
  } catch {
    return null;
  }
}

export function clearStashedBirth() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // Nothing to do.
  }
}
