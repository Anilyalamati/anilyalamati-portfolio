import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a CSS media query. Uses useSyncExternalStore so the
 * correct value is available on the very first client render (no
 * flash of the wrong state, e.g. for prefers-reduced-motion) and no
 * setState-in-effect is needed. Server snapshot is `false`.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
