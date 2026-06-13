# Portfolio Agent Guide

Operational rules for coding agents working in this repository.

Portfolio is a personal website for a full-stack engineer targeting healthcare
software roles. It is a React 18 + Vite frontend with hand-written CSS, React
Icons, and Lucide React, deployed to GitHub Pages on a custom domain. There is
no backend, database, authentication, CMS, blog engine, or analytics surface.
Framework and dependency versions live in `package.json`.

The app is content-driven: sections (`Main`, `AboutMe`, `Skills`, `Projects`,
`Contacts`) under `src/sections/`, plus `Navigation` and `Footer` in
`src/components/`. The rendered Projects section shows exactly two case studies:
CareFlow as the primary interactive showcase and RoleFit AI as the quieter
secondary study. Other entries remain in `PROJECTS_DATA` but stay unrendered
unless the user explicitly asks.

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

Before acting:

1. Read `CONTINUITY.md`.
2. Check `git status --short` so unrelated work is visible.
3. Inspect the files you will touch.
4. For UI work, open the relevant file under `src/sections/` and the matching
   styles in `src/App.css`.
5. For non-trivial work, decide the verification path before editing.

While working:

- Keep every changed line tied to the request, required cleanup, or
  verification.
- Match local patterns before introducing new ones.
- Prefer focused in-place edits for content changes.
- Surface meaningful blockers, assumptions, and skipped checks.

Before finishing:

- Run the relevant verification checklist below.
- Update `CONTINUITY.md` only if the state changed meaningfully.
- Leave unrelated work untouched.
- For non-trivial tasks, start the final reply with a brief ledger snapshot:
  Goal, Now, Next, and Open Questions. Trivial Q&A may skip it.

---

## Non-Negotiables

- `CONTINUITY.md` is the canonical workspace memory; do not rely on prior chat
  context unless the durable fact is recorded there.
- Do not overwrite unrelated work or user-edited files.
- Do not broaden the app scope without justification.
- Do not add speculative systems such as routing, CMS, auth, analytics,
  backend APIs, global toast/banner systems, or fake loading states.
- Do not silently hide failures with fallback behavior.
- Do not print secrets, tokens, broad environment dumps, or private data beyond
  what already lives in tracked files; treat the `gh-pages` deploy token as
  sensitive.
- Do not ask the user to paste secrets.

Pause and ask before deploying, changing `CNAME` or routing entry points,
reworking the Projects structure, introducing paid/vendor dependencies,
changing workflow-critical UI patterns, or taking destructive actions.

---

## Content Rules

- Keep copy concrete, recruiter-oriented, and free of marketing fluff.
- `src/constants/projects.js` must match the real project state. For CareFlow
  or RoleFit AI updates, cross-check sibling repo `README` and `CONTINUITY`
  files under `../careflow/` and `../role-fit-ai/`.
- `src/constants/resume.js` mirrors the user's LaTeX resume and is the source
  of truth for resume and skills copy. When the user provides an updated
  resume, mirror it directly and align `Main.jsx`, `Skills.jsx`, and
  project-card tech with it.
- If resume facts conflict with sibling repo facts, follow the user's explicit
  instruction on which source wins and record meaningful divergence in
  `CONTINUITY.md`.
- Keep hero, About, Skills, Projects, and Contacts aligned with facts the user
  has stated. Do not invent hobbies, locations, role types, tech, or contact
  channels; confirm any new contact channel with the user before adding it.
- Keep interface labels short and obvious. Do not add multi-sentence in-app
  help blocks. Do not add or remove emoji in tracked files unless requested.

---

## Frontend Rules

Before any UI work, read the design specs committed at the project root:
`PRODUCT.md` (strategic context: register, users, brand, design principles,
accessibility), `DESIGN.md` (visual spec: color tokens, typography, elevation,
components; its frontmatter is normative), and `.impeccable/design.json`
(extended sidecar with tonal ramps, motion tokens, breakpoints, and component
snippets).

- Reuse tokens from `src/App.css`, especially CSS custom properties under
  `:root`.
- Match the existing Manrope-only typography and teal-accented palette.
- Use plain CSS in `src/App.css`: `.container`, CSS Grid layouts such as
  `.about-grid` and `.skills-grid`, small utilities, and `.cs-action*` anchor
  buttons.
- Do not add Bootstrap, react-bootstrap, Tailwind, or a component library.
- Reuse existing Lucide React and React Icons imports when appropriate.
- Keep sections compact and recruiter-friendly; density beats decoration.
- Respect the existing breakpoints and sticky/hash-scroll behavior. Do not add
  a parallel mobile system.
- For major UI changes, run the app on the canonical port and visually inspect
  the changed section in the preview browser when feasible.

`App.css` is a single tokens-and-section stylesheet, exempt from size-splitting.

---

## Refactors And Modularity

Refactor only when the current task requires it, the existing structure blocks
correctness, or the change clearly reduces future complexity and can be
verified safely.

Prefer local improvements over architectural rewrites. Do not perform drive-by
refactors during content updates.

Soft target for hand-written logic files is about 300 LOC. If one crosses
about 400 LOC while the task already touches it, either justify keeping it
together or propose a focused split into `src/components/`, hooks, or utilities.

---

## Continuity

`CONTINUITY.md` is local-only and gitignored. It exists to keep multi-agent
handoffs factual.

Update it only for meaningful state changes:

- active risks, durable decisions, current state, and next steps
- important verification receipts
- user instructions that should persist across sessions
- source-of-truth changes or known divergence

Use compact ISO-timestamped entries tagged `[USER]`, `[CODE]`, `[TOOL]`, or
`[ASSUMPTION]`. Use `UNCONFIRMED` instead of guessing. Keep Snapshot to 25
lines, Done to 7 bullets, Working Set to 12 paths, and Receipts to the last
10-20 entries; compress older entries when they get noisy.

Durable decisions use this shape:

```text
D001 ACTIVE: Projects renders CareFlow plus RoleFit AI, others hidden.
```

---

## Git And Publishing

Default to local-only work unless the user explicitly asks to stage, commit,
push, open a PR, or deploy.

Never:

- use destructive git operations without explicit instruction
- rebase, amend, force-push, push, or switch branches unless requested
- stage unrelated files
- run `npm run deploy` or `npm run predeploy` without explicit instruction

Always:

- keep patches reviewable and scoped
- stage and commit `AGENTS.md` and `CLAUDE.md` like any other tracked file when
  they're part of the change; do not single them out to exclude (`CONTINUITY.md`
  and `.claude/` are gitignored and won't appear as staging candidates)
- check `git status --short` before staging
- use non-interactive git commands
- use Conventional Commit subjects by default when asked to name a branch,
  commit, or push
- PR titles: human-readable sentence case by default (uppercase first letter,
  verb first, no trailing punctuation); use the Conventional Commit subject
  form when squash-merge takes the PR title as the commit subject. (This repo
  squash-merges, so commit-style titles are the norm for merged PRs.)

Examples:

```text
docs(projects): refresh careflow chapter copy
fix(nav): preserve hash-scroll offset under sticky navbar
```

---

## Verification

- UI: no console errors, stable layout at existing breakpoints, no sticky-nav
  or hash-scroll regression. Major UI changes need `npm run dev` plus visual QA
  on the canonical port when feasible.
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
- Deploy: `npm run deploy` only on explicit user instruction; publishes to the
  live custom domain (`xinyiklin.com`), and `predeploy` runs `npm run build`
  automatically.

Canonical port `5184` (reserved `5184-5185`); `vite.config.js` sets
`strictPort: true`, so Vite will not silently choose another port. If `5184` is
bound, the app is already running, connect to it rather than starting another
dev server, and do not switch ports to sidestep the conflict.

Sibling reservations:

- CareFlow: `5173-5180`
- RoleFit AI: `5181-5183`

Do not commit `node_modules/`, `dist/`, `.env`, or local credentials. Do not
edit `public/CNAME` unless explicitly requested.

---

## Communication

- Think privately.
- Skip preambles unless they add useful context.
- Report actions, blockers, verification, and final outputs.
- Keep final responses concise, but include residual risks and skipped checks.

---

## Definition Of Done

A task is complete when the requested behavior works or the question is
answered, the diff is scoped, relevant checks ran, skipped checks are explained,
meaningful continuity updates are made, and follow-ups or residual risks are
clear.
