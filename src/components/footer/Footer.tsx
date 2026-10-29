import { ArrowUp, Mail } from 'lucide-react';
import { navItems, socialLinks } from '../../data/navigation';
import { profile } from '../../data/profile';
import { Container } from '../ui/Container';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

const icons = { github: GithubIcon, linkedin: LinkedinIcon, mail: Mail };

// Evaluated once at load rather than on every render.
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-ivory/10">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <a href="#home" className="font-display text-xl text-ivory">
            {profile.name}
          </a>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 text-xs font-medium text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ivory-faint transition-colors hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ivory-faint">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = icons[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-ivory/40 hover:text-ivory"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
