/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Public Formspree form id (the `xxxxxxxx` in formspree.io/f/xxxxxxxx).
   * Not a secret — safe to expose in client code. Leave unset to keep
   * the contact form on its mailto fallback. See README.md.
   */
  readonly VITE_FORMSPREE_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
