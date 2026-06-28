# Xinyi Lin Personal Portfolio

A focused portfolio site for full-stack engineering roles with a healthcare
software angle. The site leads with CareFlow as the primary case study, then
uses RoleFit AI as a compact secondary build to show breadth.

Live: https://xinyiklin.com

## Overview

The portfolio is a React 18 and Vite frontend styled with hand-written CSS. It
is content-driven: Main (hero), Projects, and Contacts under `src/sections/`,
plus Footer. On wide, motion-allowed viewports the landing is a cinematic
macOS-style desktop (`src/components/DesktopScene.jsx`) where the hero is the
wallpaper and apps open from a dock; mobile and reduced-motion get a flat
stacked layout. About and Skills are merged into the desktop's About window, so
there are no standalone About/Skills sections or a separate Navigation bar.
There is no backend, database, auth, CMS, or analytics layer.

The Projects section renders two case studies as interactive desktop windows
with hand-built, fake-data mock UIs (`src/components/CareFlowDemo.jsx` and
`src/components/RoleFitDemo.jsx`), not screenshots:

- CareFlow: the primary window, a clinic-workspace app shell with a sidebar
  (Schedule, Documents, Billing, Refills, Admin). Schedule has draggable
  appointment blocks that open a details modal linking to a Patient hub; Refills
  and Admin carry working approve/deny and permission toggles.
- RoleFit AI: a quieter source-linked window mocking the resume tailor — a rail
  (Resume, Materials, Applications, Analytics), section Tailor/Include/Off
  controls with a derived fit score, and a zoom selector.

`src/constants/projects.js` now holds only the external action URLs used by the
window chrome; resume/project copy lives in the relevant components and
`src/constants/resume.js`.

## Tech Stack

- React 18
- Vite
- Hand-written CSS in `src/App.css`
- Lucide React and React Icons
- GitHub Pages with the custom domain in `public/CNAME`

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

The canonical local dev port is `5184`; `vite.config.js` uses strict port
binding.

## Deployment

Deployment is automated with GitHub Actions
(`.github/workflows/deploy.yml`). On every push to `main` (i.e. when a PR
merges) the workflow builds the site and publishes `dist/` to GitHub Pages;
the Pages source is set to "GitHub Actions". The custom domain is carried by
`public/CNAME` (copied to `dist/CNAME` at build), so `xinyiklin.com` keeps
resolving. The workflow can also be run on demand from the Actions tab
("Run workflow").

Merging to `main` therefore publishes to the live site — review before merge.
There is no manual `npm run deploy` step anymore.

## Content Sources

Project claims in the demo components, resume overlay, and docs should be
cross-checked against:

- `../careflow/README.md`
- `../careflow/CONTINUITY.md`
- `../role-fit-ai/README.md`
- `../role-fit-ai/CONTINUITY.md`

The inline resume (`src/constants/resume.js`) mirrors the user's LaTeX resume
(currently RoleFit AI's general SDE resume,
`../role-fit-ai/job-search-workspace/base-resume-general-sde.tex`) and is the
source of truth for resume and skills copy. The rendered hero, the desktop
About window, and RoleFit demo resume should stay aligned with it.

Do not invent employers, dates, metrics, education, tools, or project scope.
When a stronger claim depends on a missing fact, ask first or use a bracketed
placeholder.
