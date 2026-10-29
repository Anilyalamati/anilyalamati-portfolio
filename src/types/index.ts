export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  /** Shown as a quiet note instead of a fake proficiency score when the list is still growing. */
  note?: string;
}

/**
 * - live: has a public, working URL
 * - academic: confirmed college/coursework project
 * - pending: project exists but its write-up / details are not yet confirmed
 */
export type ProjectStatus = 'live' | 'academic' | 'pending';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  /** Technologies / techniques shown as tags. */
  tech: string[];
  /** Verified feature bullets. Leave empty until confirmed — the list is simply hidden. */
  features: string[];
  /** Gives the card a wider, side-by-side layout on large screens. */
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  /** Path under /src/assets, or undefined to fall back to a generated CSS preview. */
  image?: string;
  /** Short identifier used to pick a generated preview pattern when no image exists. */
  previewSeed: string;
  caveat?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  image?: string;
}
