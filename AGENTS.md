# Portfolio Agent Guide

Operational rules for coding agents working in this repository.

Portfolio is a personal website for a full-stack engineer targeting healthcare
software roles. It is a React 18 + Vite frontend with hand-written CSS, React
Icons, and Lucide React, deployed to GitHub Pages on a custom domain. There is
no backend, database, authentication, CMS, blog engine, or analytics surface.
Framework and dependency versions live in `package.json`.

The app is content-driven: sections under `src/sections/`, desktop components
and `Footer` under `src/components/`. Two things the file tree won't tell you:
there are **no** `AboutMe`, `Skills`, or `Navigation` components or About
window — identity lives in the hero and the Resume overlay — and product depth
belongs in the hosted apps and source repos, not embedded demos. Projects
frames CareFlow as primary, with RoleFit AI and Typeset as quieter studies.

---

## Priority Order

When rules conflict, follow this order:

1. Explicit user request
2. Truthfulness of resume and portfolio claims
3. Current state in `CONTINUITY.md`
4. Existing architecture and content conventions
5. Scope minimization
6. Local style preferences

Correctness, accessibility, and factual accuracy outrank style consistency.
Never invent employers, dates, metrics, education, tools, project scope, or
impact claims. If a requested copy change depends on unknown facts, ask first
or leave a bracketed placeholder.

---

## Start Here

Before acting: read `CONTINUITY.md`; check `git status --short` so unrelated
work stays visible; inspect the files you will touch — for UI that means the
`src/sections/` file *and* its styles in `src/App.css`; and for non-trivial work
define the outcome and verification path before editing.

While working, keep every changed line tied to the request, its cleanup, or
verification. Match local patterns before introducing new ones, and prefer
focused in-place edits for content. When ambiguity would materially change
scope or a claim, state the assumption and ask before picking a direction.

Before finishing: run the verification checklist below, update `CONTINUITY.md`
only if state changed meaningfully, leave unrelated work untouched, and open
non-trivial replies with a Goal / Now / Next / Open Questions snapshot.

---

## Delivery Workflow

Non-trivial work runs through the portable `product-delivery` workflow
(Product Partner → Delivery Lead → Verifier) installed at
`~/.agents/workflows/product-delivery/`. That package owns the process: the two
exact user-approval gates, Change Request escalation, and honest verification
reporting. Do not copy it here. This repo may strengthen it, never weaken it.

- **Independent review:** after the implementer's own verification, one fresh
  reviewer by default. Only the user may waive it for a specific change. If the
  user asks for more reviewers, give a firm risk-based recommendation first,
  then honor the request.
- **Expect a second reviewer** for resume or project-claim copy, anything that
  changes what the live site asserts about the user's experience, and any
  change landing on `main` (which auto-deploys).
- **Extra Change Request triggers** beyond the portable list: a claim that no
  longer traces to `src/constants/resume.js` or a sibling repo's own docs.
- **Task artifacts** live under `.agent-work/tasks/<task-id>/` and stay local,
  like `CONTINUITY.md` and `.claude/`. Keep continuity entries self-contained
  so they remain useful without those files, and tag them `[TASK <task-id>]`.

The seven workflow templates are building blocks, not mandatory files. A normal
task uses Product Brief, Delivery Plan, Alignment Review, Implementation
Report, and Verification Report; create a Decision Log or Change Request only
when its trigger occurs.

---

## Non-Negotiables

- `CONTINUITY.md` is the canonical memory; do not rely on prior chat context
  unless the durable fact is recorded there.
- Do not overwrite unrelated work or user-edited files, or broaden app scope
  without justification.
- Do not add speculative systems: routing, CMS, auth, analytics, backend APIs,
  global toast/banner systems, or fake loading states.
- Do not silently hide failures with fallback behavior.
- Do not print secrets or broad environment dumps, and never ask the user to
  paste one. The Pages deploy uses the built-in Actions `GITHUB_TOKEN` — there
  is no stored deploy token, so never add or echo one.

Pause and ask before deploying, changing `CNAME` or routing entry points,
reworking the Projects structure, introducing paid/vendor dependencies,
changing workflow-critical UI patterns, or taking destructive actions.

---

## Content Rules

- Keep copy concrete, recruiter-oriented, and free of marketing fluff.
- `src/constants/projects.js` is only the link registry used by project window
  actions. For CareFlow, RoleFit AI, or Typeset claim/copy updates in
  components, resume data, or docs, cross-check sibling repo `README` and
  `CONTINUITY` files under `../careflow/` and `../role-fit-ai/` (the Typeset
  Workspace monorepo holding `apps/role-fit-ai/` and `apps/typeset/`).
- `src/constants/resume.js` mirrors the user's Typeset resume (the base
  `.resume` files in the monorepo's local job-search workspace,
  `apps/role-fit-ai/workspace/resumes/`) and is the source of truth for
  resume and skills copy. When the user provides an updated resume, mirror it
  directly and align `Main.jsx`, the desktop widget copy
  (`DesktopWidgets.jsx`), and `ResumeOverlay.jsx` with it.
- If resume facts conflict with sibling repo facts, follow the user's explicit
  instruction on which source wins and record meaningful divergence in
  `CONTINUITY.md`.
- Keep hero, desktop widgets, project rows, and Contacts aligned with facts the user has stated. Do not invent hobbies, locations,
  role types, tech, or contact channels; confirm any new contact channel with
  the user before adding it.
- Keep interface labels short and obvious. Do not add multi-sentence in-app
  help blocks. Do not add or remove emoji in tracked files unless requested.

---

## Frontend Rules

Before any UI work read the root design specs: `PRODUCT.md` (users, brand,
design principles, accessibility), `DESIGN.md` (color, typography, elevation,
components — its frontmatter is normative), and `.impeccable/design.json`
(tonal ramps, motion tokens, breakpoints, component snippets).

- Reuse `:root` custom properties in `src/App.css`; match the Manrope-only
  typography and teal-accented palette.
- Plain CSS only, in `src/App.css`. No Bootstrap, react-bootstrap, Tailwind, or
  component library. Reuse the existing Lucide/React Icons imports.
- Keep sections compact and recruiter-friendly; density beats decoration.
- Respect the existing breakpoints, cinematic desktop gate, and reduced-motion
  stacked fallback. Do not add a parallel mobile system.
- Browser QA is flag-first: skip it by default, and when a change carries real
  layout, breakpoint, motion, or theming risk, say so and let the user decide
  rather than starting a dev server unasked (`CLAUDE.md` has the mechanics).

`App.css` is a single tokens-and-section stylesheet, exempt from size-splitting.

---

## Refactors And Modularity

Refactor only when the task requires it, the structure blocks correctness, or
the change clearly reduces future complexity and can be verified safely. Prefer
local improvements over rewrites; no drive-by refactors during content updates.
Soft target ~300 LOC per logic file; past ~400 while already touching it,
justify the cohesion or propose a focused split into `src/components/`, hooks,
or utilities.

Keep implementation scope literal. An improvement you notice but the request
does not require gets presented to the user and waits for approval — including
copy polish in a section you are already editing.

Before adding or upgrading a dependency, read `package.json` and
`package-lock.json` for the runtime and range policy already in force, then
verify the current stable release from npm or the maintainer's release notes.
Never choose a version from memory. Prefer the latest compatible stable
release, update the lockfile, and explain any deliberate pin to an older or
prerelease version. The no-CSS-framework and no-analytics rules above still
apply — a version check is not permission to add a dependency.

Comment only for non-obvious rationale, constraints, or safety. Do not narrate
self-explanatory code; durable rationale belongs in `PRODUCT.md`, `DESIGN.md`,
or this guide.

---

## Continuity

`CONTINUITY.md` is local-only and gitignored; it keeps multi-agent handoffs
factual. Update it only for meaningful state changes: active risks, durable
decisions, current state and next steps, important verification receipts,
persistent user instructions, and source-of-truth divergence.

Compact ISO-timestamped entries tagged `[USER]`, `[CODE]`, `[TOOL]`, or
`[ASSUMPTION]`; `UNCONFIRMED` rather than a guess. Keep Snapshot ~25 lines,
Done ~7 bullets, Working Set ~12 paths, Receipts to the last 10-20; compress
older entries. Durable decisions take the form
`D001 ACTIVE: Projects renders CareFlow, RoleFit AI, and Typeset windows only.`

---

## Git And Publishing

Read `docs/engineering/git-workflow.md` before branch, commit, PR, exact-head
review, merge, cleanup, release, or deployment work.

Default to local-only work. Do not stage, commit, push, rebase, amend,
force-push, switch branches, open a PR, or deploy unless asked — and **a merge
to `main` auto-deploys the live site**, so treat one as a deploy needing
explicit authorization.

- Check `git status --short` before staging; stage only related paths; use
  non-interactive commands; keep patches reviewable.
- Stage `AGENTS.md`/`CLAUDE.md` like any other tracked file when they're part of
  the change. `CONTINUITY.md` and `.claude/` are gitignored here.
- Conventional Commit subjects by default: `docs(projects): refresh careflow
  chapter copy`. This repo squash-merges, so PR titles use the same
  commit-subject form.

---

## Verification

- UI: no console errors, stable layout at existing breakpoints, no cinematic
  desktop, reduced-motion, or in-page contact-scroll regression. Reason these
  through by reading the changed CSS and markup; browser QA stays flag-first
  (above), so name the risk and let the user call it.
- Build: `npm run build` succeeds when source or config changed.
- Content: re-read changed copy in full and confirm it matches the source of
  truth.
- Refactors: behavior is preserved, `npm run build` succeeds, and grep confirms
  old symbols were removed.
- Docs-only: verify paths, links, critical commands, and internal consistency.
  Runtime checks are not required unless docs describe behavior that changed.

If a relevant check is skipped, say why.

---

## Commands

Run commands from the project root.

- Build: `npm run build`
- Dev: `npm run dev`
- Preview: `npm run preview`
- Deploy: automated via GitHub Actions (`.github/workflows/deploy.yml`); every
  push to `main` builds and publishes `dist/` to Pages, custom domain
  `xinyiklin.com` riding along via `public/CNAME` -> `dist/CNAME`. There is no
  `npm run deploy`. Can also be run manually from the Actions tab.

Canonical port `5184` (reserved `5184-5185`), `strictPort` in `vite.config.js`.
A bound `5184` means the app is already running — connect to it; never switch
ports to sidestep a conflict. Siblings: careflow `5173-5180`, role-fit-ai
`5181-5183` + `5186`, token-dashboard `5187-5189`.

Do not commit `node_modules/`, `dist/`, `.env`, or local credentials. Do not
edit `public/CNAME` unless explicitly requested.

---

## Communication

Think privately; skip preambles. Report actions, blockers, verification,
skipped checks, and residual risks. Keep final responses concise.

---

## Definition Of Done

A task is complete when the requested behavior works or the question is
answered, the diff is scoped, relevant checks ran, skipped checks are explained,
meaningful continuity updates are made, and follow-ups or residual risks are
clear.
