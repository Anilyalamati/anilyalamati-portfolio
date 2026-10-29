import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span';
}

/** One-shot entrance animation (mount-triggered, not scroll-triggered) that respects reduced motion. */
export function FadeIn({ children, delay = 0, y = 16, className, as = 'div' }: FadeInProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
