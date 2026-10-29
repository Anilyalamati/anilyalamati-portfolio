import { lazy, Suspense, useRef } from 'react';
import { useInViewport } from '../../hooks/useInViewport';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useWebGLSupported } from '../../hooks/useWebGLSupported';
import { StaticMark } from './StaticMark';

const Scene = lazy(() => import('../three/Scene'));

/**
 * Hero visual entry point. Renders the interactive 3D scene only when
 * it's safe and worthwhile to do so (WebGL present, motion allowed,
 * reasonable viewport); otherwise shows the static mark so the hero
 * never ships a broken or jarring experience.
 *
 * - prefers-reduced-motion → static mark, always.
 * - No WebGL → static mark.
 * - Small / low-powered viewport → the 3D scene still loads, but with
 *   a lighter particle count and no pointer parallax plane cost spike.
 * - Scrolled out of view → frameloop pauses (handled by Scene).
 */
export function HeroVisual() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const hasWebGL = useWebGLSupported();
  const isCompactViewport = useMediaQuery('(max-width: 640px)');
  const inView = useInViewport(wrapperRef);

  const canRender3D = hasWebGL && !reduceMotion;

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto aspect-square w-full max-w-[15rem] sm:max-w-md lg:mx-0 lg:max-w-xl"
    >
      {canRender3D ? (
        <Suspense fallback={<StaticMark className="absolute inset-0" />}>
          <Scene active={inView} compact={isCompactViewport} />
        </Suspense>
      ) : (
        <StaticMark className="absolute inset-0" />
      )}
    </div>
  );
}
