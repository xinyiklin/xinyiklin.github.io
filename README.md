# Xinyi Lin Personal Portfolio

A focused portfolio site for full-stack engineering roles with a healthcare
software angle. The site leads with CareFlow as the primary case study, then
uses RoleFit AI and Typeset as compact secondary builds to show breadth.

Live: [xinyiklin.com](https://xinyiklin.com)

## Projects

The site pairs an interactive desktop-inspired presentation with a responsive,
reduced-motion-friendly layout. It directs visitors to the real products for
project depth:

- [CareFlow](https://careflow.xinyiklin.com): the primary healthcare workflow
  platform.
- [RoleFit AI](https://rolefit.xinyiklin.com): the resume-tailoring workbench.
- [Typeset](https://typeset.xinyiklin.com): the resume editor and deterministic
  typesetting engine.

## Tech Stack

- React 18
- Vite
- Hand-written CSS
- Lucide React and React Icons
- GitHub Pages

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

Deployment is automated through GitHub Actions. Pushes to `main` build and
publish the site to GitHub Pages at `xinyiklin.com`.
