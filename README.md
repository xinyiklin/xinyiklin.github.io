# Xinyi Lin Personal Portfolio

A focused portfolio site for full-stack engineering roles with a healthcare
software angle. The site leads with CareFlow as the primary case study, then
uses RoleFit AI and Typeset as compact secondary builds to show breadth.

Live: https://xinyiklin.com

## Overview

The portfolio is a React 18 and Vite frontend styled with hand-written CSS. It
is content-driven: Main (hero), Projects, and Contacts under `src/sections/`,
plus Footer. On wide, motion-allowed viewports the landing is a cinematic
macOS-style desktop (`src/components/DesktopScene.jsx`) where the hero is the
wallpaper and apps open from a dock; mobile and reduced-motion get a flat
stacked layout. The CareFlow, RoleFit AI, and Typeset dock tiles launch their
live apps in a new tab. Their context menus provide direct Live and Source
links, while mobile and reduced-motion layouts expose the same destinations as
compact project rows. About and Skills are merged into the desktop's About window, so
there are no standalone About/Skills sections or a separate Navigation bar.
There is no backend, database, auth, CMS, or analytics layer.

The Projects section keeps the portfolio focused and sends visitors to the
real products for depth:

- CareFlow: the primary healthcare workflow platform.
- RoleFit AI: the resume-tailoring workbench at rolefit.xinyiklin.com.
- Typeset: the resume editor and deterministic typesetting engine at
  typeset.xinyiklin.com.

`src/constants/projects.js` now holds only the external action URLs used by the
dock and fallback project rows; resume copy lives in `src/constants/resume.js`.

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

Project claims in the launcher copy, resume overlay, and docs should be
cross-checked against:

- `../careflow/README.md` and `../careflow/CONTINUITY.md`
- `../role-fit-ai/README.md` and `../role-fit-ai/CONTINUITY.md` — the Typeset
  Workspace monorepo, which contains both secondary projects
  (`apps/role-fit-ai/` and `apps/typeset/`, over shared `packages/`)

The inline resume (`src/constants/resume.js`) mirrors the user's Typeset
resume (currently the general SDE variant,
`../role-fit-ai/apps/role-fit-ai/job-search-workspace/base-resume-general-sde.resume`)
and is the source of truth for resume and skills copy. The rendered hero,
desktop About window, and resume overlay should stay aligned with it.

Do not invent employers, dates, metrics, education, tools, or project scope.
When a stronger claim depends on a missing fact, ask first or use a bracketed
placeholder.
