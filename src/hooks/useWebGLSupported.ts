import { useSyncExternalStore } from 'react';

let cached: boolean | null = null;

function detectWebGL(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement('canvas');
    cached = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    cached = false;
  }
  return cached;
}

const subscribe = () => () => {};

/** WebGL capability never changes at runtime, so there is nothing to subscribe to. Detected once, cached. */
export function useWebGLSupported(): boolean {
  return useSyncExternalStore(subscribe, detectWebGL, () => false);
}
