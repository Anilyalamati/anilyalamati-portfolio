import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

/** Whether the given element currently intersects the viewport at all. */
export function useInViewport<T extends Element>(ref: RefObject<T | null>): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
