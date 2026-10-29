import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor-hover]';

/**
 * A small dot-and-ring cursor for desktop/precise-pointer devices only.
 * Touch devices and prefers-reduced-motion keep the native cursor —
 * the `custom-cursor-active` class (which hides the native cursor via
 * CSS) is only ever added when both conditions are met.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const reduceMotion = usePrefersReducedMotion();
  const enabled = isFinePointer && !reduceMotion;

  useEffect(() => {
    document.documentElement.classList.toggle('custom-cursor-active', enabled);
    return () => document.documentElement.classList.remove('custom-cursor-active');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf = 0;
    let hovering = false;

    let revealed = false;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!revealed) {
        // First real pointer movement: snap the ring to the pointer so it
        // doesn't glide in from the screen center, then show both parts.
        revealed = true;
        ringX = targetX;
        ringY = targetY;
        dot.style.opacity = '1';
        ring.style.opacity = '0.5';
      }

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      const target = event.target as Element | null;
      const nextHovering = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      if (nextHovering !== hovering) {
        hovering = nextHovering;
        ring.style.width = hovering ? '48px' : '28px';
        ring.style.height = hovering ? '48px' : '28px';
        ring.style.opacity = hovering ? '0.9' : '0.5';
      }
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      if (!revealed) return;
      dot.style.opacity = '1';
      ring.style.opacity = hovering ? '0.9' : '0.5';
    };

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 h-7 w-7 rounded-full border border-ivory/60 transition-[width,height,opacity] duration-200 ease-out"
      />
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-ivory transition-opacity duration-200"
      />
    </div>
  );
}
