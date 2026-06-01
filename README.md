# Xinyi Lin Personal Portfolio

A focused portfolio site for full-stack engineering roles with a healthcare
software angle. The site leads with CareFlow as the primary case study, then
uses RoleFit AI as a compact secondary build to show breadth.

Live: https://xinyiklin.com

## Overview

The portfolio is a React 18 and Vite frontend styled with hand-written CSS. It
is content-driven: Main, About, Skills, Projects, Contacts, Navigation, and
Footer. There is no backend, database, auth, CMS, or analytics layer.

The Projects section renders two case studies:

- CareFlow: an interactive sticky-scroll showcase using current product
  screenshots from the sibling `../careflow` repo.
- RoleFit AI: a quieter source-linked case study with three notes and one
  sanitized product screenshot from `../role-fit-ai/docs/screenshot.png`.

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
and is the source of truth for resume and skills copy. The rendered hero,
Skills section, and Projects-card tech should stay aligned with it.

Do not invent employers, dates, metrics, education, tools, or project scope.
When a stronger claim depends on a missing fact, ask first or use a bracketed
placeholder.
