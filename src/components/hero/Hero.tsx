import { ArrowDown, Download } from 'lucide-react';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';
import { Container } from '../ui/Container';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[560px] w-[560px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(64,68,122,0.5) 0%, rgba(40,43,74,0) 70%)',
        }}
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="order-2 lg:order-1">
          <FadeIn>
            <p className="mb-5 font-mono text-xs tracking-[0.25em] text-ivory-faint uppercase">
              Portfolio — B.Tech CSE · AI/ML
            </p>
          </FadeIn>

          <h1 className="text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            <FadeIn delay={0.05} as="span" className="block">
              Hi, I&rsquo;m
            </FadeIn>
            <FadeIn delay={0.15} as="span" className="block text-ivory-dim italic">
              Anil Yalamati.
            </FadeIn>
          </h1>

          <FadeIn delay={0.3}>
            <p className="mt-7 max-w-lg text-lg text-ivory-dim sm:text-xl">
              A third-year B.Tech CSE student who builds things in software
              development and AI/ML — from a deepfake-detection system to an
              AI travel companion — focused on turning useful ideas into
              working products.
            </p>
          </FadeIn>

          <FadeIn delay={0.45} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#projects">
              Explore Projects
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
          </FadeIn>

          <FadeIn delay={0.6} className="mt-10 flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Anil Yalamati on GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Anil Yalamati on LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
            >
              <LinkedinIcon size={18} />
            </a>
            {/* Only rendered once a real resume path is set in data/profile.ts —
                never a placeholder or dead download. */}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full border border-ivory/20 px-5 text-sm font-medium text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
              >
                <Download size={16} aria-hidden="true" />
                Resume
              </a>
            )}
          </FadeIn>
        </div>

        <div className="order-1 lg:order-2">
          <HeroVisual />
        </div>
      </Container>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory-faint sm:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-ivory-faint" />
      </a>
    </section>
  );
}
