import type { SkillCategory } from '../types';

/**
 * Only technologies confirmed by actual project work are listed here —
 * no proficiency bars or percentages. Add to an array as new skills are
 * confirmed; the "note" field disappears automatically once a category
 * has a healthy list.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Core languages used across coursework and project builds.',
    skills: ['Python'],
    note: 'More languages will be listed here as they’re confirmed.',
  },
  {
    title: 'Frontend & Web Development',
    description: 'Building and interacting with the browser UI layer.',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Applied AI work from academic and personal projects.',
    skills: [
      'Deepfake & Image Forensics Analysis',
      'K-Nearest Neighbors (KNN)',
      'Regression',
      'Decision Trees',
      'Random Forest',
      'K-Means Clustering',
      'Expectation–Maximization (EM) Clustering',
    ],
  },
  {
    title: 'Data Science & Analysis',
    description: 'Model evaluation and statistical analysis techniques.',
    skills: ['Bias–Variance Analysis', 'Cross-Validation'],
    note: 'Expanding alongside ongoing coursework.',
  },
  {
    title: 'Databases & Backend',
    description: 'Server-side logic behind project builds.',
    skills: ['Flask (Python)'],
    note: 'Database technologies will be added once confirmed.',
  },
  {
    title: 'Developer Tools & DevOps',
    description: 'Build, version control, and deployment tooling.',
    skills: ['Git & GitHub', 'Jenkins', 'Maven', 'Apache Tomcat'],
  },
];
