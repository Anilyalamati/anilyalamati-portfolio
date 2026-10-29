import type { Certification } from '../types';

/**
 * No certifications have been confirmed yet, so this starts empty —
 * the section renders an honest "coming soon" state rather than a
 * fabricated list. Add entries in this shape as you earn them:
 *
 * {
 *   title: 'Certificate name',
 *   issuer: 'Issuing organization',
 *   date: 'Month Year',           // optional
 *   url: 'https://...',           // optional, verification link
 *   image: '/certs/example.png',  // optional, path under /public
 * }
 */
export const certifications: Certification[] = [];
