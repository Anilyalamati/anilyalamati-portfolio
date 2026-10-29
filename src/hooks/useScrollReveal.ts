import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered entrance animation for every element carrying the
 * `.reveal-up` class inside the given container (sections, cards,
 * headings — applied declaratively via className, no per-component
 * wiring needed). No-ops entirely under prefers-reduced-motion.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  const reduceMotion = usePrefersReducedMotion();

  // useLayoutEffect so the initial hidden state is applied before the
  // browser paints — avoids a flash of fully-visible content.
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>('.reveal-up');
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      targets.forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: (i % 3) * 0.06,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              // One-shot: once content has been revealed it stays put.
              // Re-hiding on scroll-up hurts reading, anchor jumps and
              // find-in-page.
              once: true,
            },
          },
        );
      });
    }, container);

    // Self-hosted fonts load async and can shift layout slightly;
    // recompute trigger positions once they're ready.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [containerRef, reduceMotion]);
}
