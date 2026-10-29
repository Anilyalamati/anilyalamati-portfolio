import { useMediaQuery } from './useMediaQuery';

/** True when the user has asked their OS for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
