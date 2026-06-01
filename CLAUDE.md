# Portfolio, Claude Overrides

`AGENTS.md` is the canonical guide. Read it and `CONTINUITY.md` before
acting. This file adds Claude-specific behavior; when it conflicts with
`AGENTS.md`, this file wins.

## Tool Use

- `Read` before `Edit` / `Write`. Never `Write` without reading first.
- Prefer `Grep` / `Glob` over shell `grep` / `find` for codebase searches.
- Use `Edit` for targeted changes; reserve `Write` for new files or
  intentional full-file replacements after first reading the existing file.
- Run commands via `Bash` from the project root. The dev server uses
  port `5184` (reserved range `5184-5185`) and `vite.config.js` sets
  `strictPort: true`. If `5184` is already bound, the app is almost
  certainly already running, connect to `http://localhost:5184` instead
  of launching another `npm run dev`, and do not switch ports to sidestep
  the conflict.
  Sibling reservations: careflow `5173-5180`, role-fit-ai `5181-5183`.
  Do not confuse them.

## Visual QA

For UI changes, use `mcp__Claude_Preview` (preferred) or
`mcp__Claude_in_Chrome` when available. With Claude Preview:

1. `preview_start` with name `portfolio` (defined in `.claude/launch.json`).
2. `preview_snapshot` or `preview_inspect` for text and computed styles -
   these are more reliable than screenshots for verifying content and CSS.
3. `preview_screenshot` for visual regressions; if it returns blank, fall
   back to `preview_snapshot` + `preview_inspect`.
4. Check `preview_console_logs` and `preview_logs` for errors before
   reporting the change as done.

Note the gap in the final response if preview tooling is unavailable.

## Content And Copy

- Do not invent project copy. Cross-check the CareFlow and RoleFit AI
  constants against the sibling repos (`../careflow/` and `../role-fit-ai/`
  README and CONTINUITY) when refreshing the Projects section.
- The inline resume (`src/constants/resume.js`) mirrors the user's LaTeX
  resume and is the source of truth for resume and skills copy. When the user
  supplies an updated resume, mirror it directly; if it conflicts with a
  sibling repo, follow the user's instruction on which source wins.
- The Projects section renders two case studies: CareFlow (primary) and
  RoleFit AI (secondary). Other `PROJECTS_DATA` entries (Catch the Ball, the
  portfolio itself) stay in `src/constants/projects.js` but unrendered; do
  not surface them without an explicit user request.
- Do not add or remove emoji in tracked files unless the user asks.

## Deploy Safety

- `npm run deploy` publishes `dist/` to GitHub Pages on the live custom
  domain (`xinyiklin.com`). Do not run it without explicit instruction.
- `predeploy` runs `npm run build` automatically; the same caution applies.
- Treat `public/CNAME` as production-critical config.

## Git

Do not stage `AGENTS.md`, `CLAUDE.md`, `CONTINUITY.md`, or `.claude/`
contents unless the user explicitly asks.

## Communication

Think privately. Report actions, blockers, and outputs only. Skip
preambles and reasoning unless asked.

## Design Context

This project has impeccable-skill context committed to disk. Read before any
UI work:

- **`PRODUCT.md`** at the project root, strategic context (register, users,
  brand personality, anti-references, design principles, accessibility).
- **`DESIGN.md`** at the project root, visual spec (color tokens, typography,
  elevation, components, do's and don'ts). Frontmatter is normative, prose
  is context.
- **`.impeccable/design.json`**, extended sidecar with tonal ramps, motion
  tokens, breakpoints, and full self-contained component snippets.

**Register:** brand (portfolio = design IS the product).

**The five strategic principles to keep in mind on every UI turn:**
1. Show, don't tell. Visual leads, copy supports.
2. Truthful claims only. Specs match what's actually shipped.
3. One commitment per surface. One accent, one shape per plate.
4. Quiet by default, bold on identity. Restrained backgrounds, committed
   identity moments.
5. Density over decoration. Every word, pill, and number earns its place.

When the impeccable skill is invoked, its loader picks these up
automatically; no need to summarize them in chat.
