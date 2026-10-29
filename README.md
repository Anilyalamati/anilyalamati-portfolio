# Anil Yalamati — Portfolio

A cinematic, accessible personal portfolio built with **React, Vite, TypeScript, Tailwind CSS v4, React Three Fiber, GSAP/ScrollTrigger and Framer Motion**, in the brand palette **#282B4A** (indigo) and **#EEEBDA** (ivory).

- GitHub: https://github.com/Anilyalamati
- LinkedIn: https://www.linkedin.com/in/anilyalamati/
- Featured project (EasyTrip): https://easytrip-travel.vercel.app

---

## 1. Run locally

Requires **Node.js 20.19+ or 22.12+** (Vite 8 requirement).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                     |
| `npm run build`   | Type-check (`tsc -b`) then production build    |
| `npm run preview` | Serve the production build locally             |
| `npm run lint`    | Lint with oxlint                               |

## 2. Project structure

```
src/
  components/
    layout/          CustomCursor (desktop, fine-pointer only)
    navigation/      Navbar + accessible mobile menu
    hero/            Hero, HeroVisual (3D vs fallback switch), StaticMark (SVG fallback)
    three/           Scene (R3F canvas, lazy-loaded) + HeroGeometry (the 3D mark)
    about/  skills/  projects/  education/  certifications/  contact/  footer/
    ui/              Button, Container, SectionHeading, FadeIn, BrandIcons
  data/              <-- EDIT YOUR CONTENT HERE
    profile.ts         name, email, social links, education, resume path
    about.ts           About copy
    skills.ts          skill categories
    projects.ts        project cards
    certifications.ts  certifications / achievements (empty until you add some)
    navigation.ts      nav items + social links
  hooks/             usePrefersReducedMotion, useMediaQuery, useWebGLSupported,
                     useInViewport, useActiveSection, useScrollReveal
  lib/               cn(), contact helpers
  types/             shared TypeScript types
public/              favicon.svg, og-image.png
```

## 3. Updating your content

Everything you will want to change lives in `src/data/` — no component edits needed.

- **Add a project:** add an object to the array in `projects.ts`. Leave `liveUrl`, `repoUrl` and `image` out until they exist; the card shows a tidy "coming soon" state instead of a dead link. Put real screenshots in `src/assets/` (or `public/`) and set `image`.
- **Add a skill:** push a string into the right category in `skills.ts`. There are deliberately no percentage bars.
- **Add a certification:** push an object into `certifications.ts` (title, issuer, optional date / verification URL / image). The section switches from its empty state to cards automatically.
- **Add your resume:** drop the PDF in `public/` and set `resumeUrl` in `profile.ts` (e.g. `'/resume.pdf'`). A "Resume" download button then appears in the hero automatically. Until you do, nothing resume-related is shown — no placeholder, no dead link.
- **Graduation year:** set `education.graduationYear` in `profile.ts` when you want it shown. It is hidden until then.

## 4. Contact form setup (optional)

Out of the box, **"Send Message" opens the visitor's email client** (a `mailto:` link prefilled with what they typed), and the form says so honestly. It never shows a fake success message.

To get a real inbox-delivered form, using [Formspree](https://formspree.io):

1. Create a free Formspree form that delivers to `achowdary259@gmail.com`; copy the form id (the `xxxxxxxx` in `https://formspree.io/f/xxxxxxxx`).
2. Locally: `cp .env.example .env.local` and set `VITE_FORMSPREE_FORM_ID=xxxxxxxx`.
3. On Vercel: add the same variable (see section 6).

The form id is **not a secret** (it is shipped to the browser by design). Never put a real API key in any `VITE_` variable. On a failed submission the form shows an error with a working `mailto:` fallback.

## 5. Publish to GitHub

You need a GitHub account (you have one: `Anilyalamati`). Nothing below has been done for you.

1. **Create the repository** at https://github.com/new
   - Name: `anilyalamati-portfolio`
   - **Do not** tick "Add a README", ".gitignore" or "license" (the project already has them; ticking them causes a merge conflict on first push).
2. **Public or private?** Public is the usual choice for a portfolio — recruiters can read the code, and it doubles as a showcase. Private also works and Vercel can still deploy it. Nothing in this repo is secret either way.
3. **Initialize and commit** (from the project folder):
   ```bash
   git init -b main
   git add .
   git status            # read this list! see step 5
   git commit -m "Initial portfolio"
   ```
4. **Connect and push:**
   ```bash
   git remote add origin https://github.com/Anilyalamati/anilyalamati-portfolio.git
   git push -u origin main
   ```
5. **Keep secrets out.** `.gitignore` already excludes `node_modules/`, `dist/`, `.env`, `.env.*` (but keeps `.env.example`), `*.tsbuildinfo` and `.vercel/`. Before committing, check that `git status` shows **no** `.env*` file other than `.env.example`, and no `node_modules` or `dist`. If you ever commit a secret by mistake, rotate it — deleting it in a later commit does not remove it from history.

## 6. Deploy on Vercel

Settings for *this* project (Vercel auto-detects Vite; no `vercel.json` is needed because the site is a single page with in-page `#` anchors, so no rewrites are required):

| Setting            | Value                       |
| ------------------ | --------------------------- |
| Framework preset   | **Vite**                    |
| Root directory     | `./` (repo root)            |
| Install command    | `npm install` (default)     |
| Build command      | `npm run build`             |
| Output directory   | `dist`                      |
| Node.js version    | 20.x or 22.x (≥ 20.19)      |

**Environment variables** (optional): `VITE_FORMSPREE_FORM_ID` — see section 4. Set it for Production **and** Preview if you want the form to work on preview URLs too. Redeploy after adding it, because `VITE_` values are baked in at build time.

**Steps**

1. Push the repo to GitHub (section 5).
2. At https://vercel.com/new choose **Import Git Repository** → pick `anilyalamati-portfolio` (authorize the Vercel GitHub app if prompted).
3. Confirm the settings in the table above → **Deploy**.
4. **Production deployments:** every push to `main` deploys to production automatically.
5. **Preview deployments:** every push to any other branch, and every pull request, gets its own preview URL.

Your live URL is assigned by Vercel at first deploy (e.g. `https://<something>.vercel.app`). It is intentionally not hard-coded anywhere. After you know it, you can optionally add to `index.html`:

```html
<link rel="canonical" href="https://YOUR-REAL-URL/" />
```

…and change the `og:image` / `twitter:image` values to absolute URLs (`https://YOUR-REAL-URL/og-image.png`) — some social platforms require absolute image URLs.

## 7. Accessibility & performance notes

- All text, links, buttons and the form are real HTML elements; the 3D canvas and cursor are `aria-hidden` decoration.
- Skip link, visible focus rings, `aria-current` on the active nav item, Escape-to-close and focus return on the mobile menu.
- `prefers-reduced-motion`: no WebGL scene (static SVG mark instead), no scroll reveals, no tilt, no custom cursor.
- No WebGL (or a failed context): static SVG mark; the rest of the page is unaffected.
- The 3D bundle (three / R3F / drei) is a separate lazy-loaded chunk, and the render loop pauses when the hero is off-screen.
- Custom cursor is enabled only for fine pointers (mouse/trackpad), never on touch devices.
