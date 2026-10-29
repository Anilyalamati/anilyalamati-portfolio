/**
 * Single source of truth for personal/contact details.
 * Edit this file to update your info anywhere it appears on the site.
 */
export const profile = {
  name: 'Anil Yalamati',
  role: 'B.Tech CSE Student · AI/ML Enthusiast',
  email: 'achowdary259@gmail.com',
  github: 'https://github.com/Anilyalamati',
  linkedin: 'https://www.linkedin.com/in/anilyalamati/',
  /**
   * Set to a path under /public (e.g. '/resume.pdf') once you have a
   * resume PDF to publish. Leave null to keep the download hidden —
   * the UI won't show a broken or fake download link.
   */
  resumeUrl: null as string | null,
  education: {
    institution: 'Sankethika Vidya Parshad Engineering College',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science and Engineering',
    focus: 'AI/ML interests',
    status: 'Currently studying — third year',
    /** Left unset until a graduation year is confirmed. */
    graduationYear: null as string | null,
  },
} as const;
