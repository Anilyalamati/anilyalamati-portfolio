import type { Project } from '../types';

/**
 * Central project configuration. Add a new object to this array to add
 * a new project card — nothing else needs to change.
 *
 * Content rule for this file: only state what is confirmed. Leave
 * `features` empty, and leave `liveUrl` / `repoUrl` / `image` unset,
 * until you have verified them — the card then shows a graceful empty
 * state instead of a claim, a broken link or a placeholder image.
 */
export const projects: Project[] = [
  {
    id: 'easytrip',
    title: 'EasyTrip',
    tagline: 'AI Travel Companion',
    description:
      'A travel companion focused on helping people plan trips and navigate unfamiliar cities more confidently.',
    status: 'live',
    statusLabel: 'Live Demo',
    featured: true,
    tech: ['AI / ML', 'Web App', 'Vercel'],
    // Only the framing from the project brief is listed. The features
    // below were suggested but NOT yet verified against the live app or
    // its source. Verify each one (and that any SOS / emergency flow is
    // clearly a simulation, not connected to real emergency services),
    // then move it into `features`:
    //   - Personalized travel itinerary planning
    //   - Recommendations for destinations and activities
    //   - Safer route planning
    //   - Emergency SOS and assistance workflows
    //   - Location-aware travel support
    features: [
      'Helps travelers plan trips',
      'Supports navigating unfamiliar cities with more confidence',
    ],
    liveUrl: 'https://easytrip-travel.vercel.app',
    // repoUrl: 'https://github.com/Anilyalamati/<repo-name>', // add once the repository exists / is public
    previewSeed: 'easytrip',
  },
  {
    id: 'deepfake-detection',
    title: 'Deepfake Detection System',
    tagline: 'DeepDetect — image & video analysis',
    description:
      'A B.Tech CSE academic project for analyzing images and videos for potential deepfake manipulation, with a detection dashboard and a history of past analyses. Detection relies on classical image-forensics techniques. No accuracy figures or detection guarantees are claimed.',
    status: 'academic',
    statusLabel: 'Academic Project',
    tech: ['Python', 'Flask', 'JavaScript', 'HTML / CSS', 'Image Forensics'],
    features: [
      'Image and video upload for analysis',
      'Detection results dashboard',
      'Detection history',
    ],
    previewSeed: 'deepdetect',
  },
  {
    id: 'ml-recommender',
    title: 'Machine Learning Recommendation System',
    tagline: 'Recommendation modeling',
    description:
      'My machine-learning recommendation-system work. A full breakdown — data preparation, model development, recommendation logic and evaluation — will be added once it has been confirmed against the implementation.',
    status: 'pending',
    statusLabel: 'Write-up coming soon',
    tech: ['Machine Learning'],
    features: [],
    previewSeed: 'recommender',
  },
  {
    id: 'devops-cicd',
    title: 'DevOps CI/CD Pipeline',
    tagline: 'Build & deployment automation',
    description:
      'A DevOps project using GitHub, Jenkins, Maven and Apache Tomcat. The pipeline walkthrough, and which parts are complete versus still in progress, will be added once confirmed.',
    status: 'pending',
    statusLabel: 'Write-up coming soon',
    tech: ['GitHub', 'Jenkins', 'Maven', 'Apache Tomcat'],
    features: [],
    previewSeed: 'devops',
  },
  {
    id: 'ml-academic-experiments',
    title: 'Machine Learning — Academic Experiments',
    tagline: 'Coursework experiments',
    description:
      'A set of academic machine-learning experiments covering classification, clustering and model evaluation. This is coursework, grouped into one entry rather than presented as separate products.',
    status: 'academic',
    statusLabel: 'Academic Coursework',
    tech: [
      'K-Nearest Neighbors',
      'Regression',
      'Decision Trees',
      'Random Forest',
      'Bias–Variance Analysis',
      'Cross-Validation',
      'K-Means',
      'EM Clustering',
    ],
    features: [],
    previewSeed: 'experiments',
  },
];
