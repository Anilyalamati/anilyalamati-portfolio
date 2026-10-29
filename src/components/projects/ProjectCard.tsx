import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import type { Project } from '../../types';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/cn';
import { GithubIcon } from '../ui/BrandIcons';
import { ProjectPreview } from './ProjectPreview';

const statusStyles: Record<Project['status'], string> = {
  live: 'border-ivory/40 text-ivory',
  academic: 'border-ivory/25 text-ivory-dim',
  pending: 'border-dashed border-ivory/25 text-ivory-faint',
};

const emptyChip =
  'inline-flex items-center gap-1.5 rounded-full border border-dashed border-ivory/20 px-4 py-2 text-xs text-ivory-faint';

function ProjectLinks({ project }: { project: Project }) {
  const { liveUrl, repoUrl } = project;

  return (
    <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-ivory/10 pt-5">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-4 py-2 text-xs font-medium text-indigo-950 transition-colors hover:bg-ivory-dim"
        >
          Live Demo
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> — {project.title} (opens in a new tab)</span>
        </a>
      )}

      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-full border border-ivory/25 px-4 py-2 text-xs font-medium text-ivory transition-colors hover:border-ivory"
        >
          <GithubIcon size={14} />
          Source
          <span className="sr-only"> — {project.title} (opens in a new tab)</span>
        </a>
      )}

      {/* Graceful empty states: one quiet chip, never a dead link. */}
      {liveUrl && !repoUrl && (
        <span className={emptyChip}>
          <GithubIcon size={14} />
          Source coming soon
        </span>
      )}
      {!liveUrl && !repoUrl && <span className={emptyChip}>Demo &amp; source links coming soon</span>}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const featured = Boolean(project.featured);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 22 });
  const glowX = useTransform(rotateY, [-6, 6], [0, 100]);
  const glowY = useTransform(rotateX, [6, -6], [0, 100]);
  // Computed unconditionally (Rules of Hooks) even though the glow div
  // it feeds is only rendered when motion isn't reduced.
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(400px circle at ${gx}% ${gy}%, rgba(238,235,218,0.08), transparent 60%)`,
  );

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateYRaw.set((px - 0.5) * 10);
    rotateXRaw.set((py - 0.5) * -10);
  }

  function handleMouseLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    // The scroll-reveal (GSAP) animates this wrapper; the hover tilt
    // (Framer Motion) lives on the inner <article>. Keeping them on
    // separate elements stops the two libraries fighting over `transform`.
    <div className={cn('reveal-up', featured && 'xl:col-span-2')}>
      <motion.article
        ref={cardRef}
        aria-labelledby={`project-${project.id}-title`}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full rounded-2xl border border-ivory/12 bg-ivory/[0.02] p-5 transition-colors duration-300 hover:border-ivory/30 sm:p-6"
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glowBackground }}
          />
        )}

        <div className={cn('flex h-full flex-col', featured && 'xl:grid xl:grid-cols-[1fr_1.1fr] xl:gap-10')}>
          <ProjectPreview
            seed={project.previewSeed}
            image={project.image}
            title={project.title}
            className={cn(featured && 'xl:self-center')}
          />

          <div className={cn('mt-5 flex flex-1 flex-col', featured && 'xl:mt-0 xl:justify-center')}>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide uppercase',
                  statusStyles[project.status],
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {project.statusLabel}
              </span>
            </div>

            <h3
              id={`project-${project.id}-title`}
              className={cn('mt-3 font-display text-2xl text-ivory', featured && 'xl:text-4xl')}
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-ivory-faint">{project.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ivory-dim">{project.description}</p>

            {project.features.length > 0 && (
              <ul className="mt-5 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ivory-dim">
                    <Check size={15} className="mt-0.5 shrink-0 text-ivory/50" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies and topics">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ivory/10 bg-ivory/[0.03] px-3 py-1 font-mono text-[11px] text-ivory/70"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.caveat && <p className="mt-4 text-xs text-ivory-faint italic">{project.caveat}</p>}

            {/* Links sit at the bottom of regular cards so rows line up;
                in the featured layout they stay with the centered content. */}
            <div className={cn('mt-6 flex flex-1 flex-col justify-end', featured && 'xl:flex-none')}>
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
