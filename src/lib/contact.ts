import { profile } from '../data/profile';

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

/** Builds a mailto: link pre-filled with whatever the person typed. */
export function buildMailtoLink(values: Partial<ContactFormValues> = {}): string {
  const subject = `Portfolio contact from ${values.name?.trim() || 'your site'}`;
  const bodyLines = [
    values.message?.trim() || '',
    '',
    values.name ? `— ${values.name}` : '',
    values.email ? `(${values.email})` : '',
  ].filter(Boolean);

  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n'),
  });

  return `mailto:${profile.email}?${params.toString()}`;
}

/**
 * Public, non-secret identifier for the Formspree endpoint this form
 * posts to (https://formspree.io/f/<id>) — safe to ship in client
 * code, unlike an API secret. Unset until VITE_FORMSPREE_FORM_ID is
 * configured; see README for setup.
 */
export const formEndpointId: string | undefined = import.meta.env.VITE_FORMSPREE_FORM_ID;

export const isContactBackendConfigured = Boolean(formEndpointId);
