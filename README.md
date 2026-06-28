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

The Projects section renders two case studies:

- CareFlow: an interactive sticky-scroll showcase using current product
  screenshots from the sibling `../careflow` repo.
- RoleFit AI: a quieter source-linked case study with three notes and one
  product screenshot of the resume workspace (the app's drafting-desk UI shown
  with demo starter data) in `src/assets/rolefit-workspace.png`.

Additional entries stay in `src/constants/projects.js` for archive/reference
use, but are intentionally not rendered.

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

Do not run `npm run deploy` unless production publishing is explicitly
requested.

## Content Sources

Project claims should be cross-checked against:

- `../careflow/README.md`
- `../careflow/CONTINUITY.md`
- `../role-fit-ai/README.md`
- `../role-fit-ai/CONTINUITY.md`

The inline resume (`src/constants/resume.js`) mirrors the user's LaTeX resume
(currently RoleFit AI's general SDE resume,
`../role-fit-ai/job-search-workspace/base-resume-general-sde.tex`) and is the
source of truth for resume and skills copy. The rendered hero, the desktop
About window, and Projects-card tech should stay aligned with it.

Do not invent employers, dates, metrics, education, tools, or project scope.
When a stronger claim depends on a missing fact, ask first or use a bracketed
placeholder.
