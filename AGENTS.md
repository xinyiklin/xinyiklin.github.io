# Portfolio Agent Guide

Operational rules for coding agents working in the Portfolio repository.

Portfolio is a personal website that showcases projects, skills, and contact
info for a full-stack engineer targeting healthcare software roles. It is a
React 18 + Vite frontend styled with hand-written CSS (no UI framework), using
React Icons and Lucide React, deployed to GitHub Pages on a custom domain.
There is no backend, no database,
and no authenticated surface. Framework and dependency versions live in
`package.json`; check that file instead of copying version numbers here.

The site is content-driven: a small set of sections (Main, AboutMe, Skills,
Projects, Contacts) plus a Navigation and Footer. The Projects section renders
two case studies: CareFlow as the primary interactive showcase and RoleFit AI
as a quieter secondary study. Other `PROJECTS_DATA` entries (Catch the Ball,
the portfolio itself) stay in `constants/` but are deliberately unrendered.

---

## Priority Order

When rules conflict, follow this order:

1. Explicit user request
2. Truthfulness of resume / portfolio claims
3. Current state in `CONTINUITY.md`
4. Existing architecture and content conventions
5. Scope minimization
6. Local style preferences

Do not sacrifice correctness, accessibility, or factual accuracy of portfolio
copy for stylistic consistency.

> Truthfulness note: never invent employers, dates, metrics, education, tools,
> or project scope in portfolio copy. If the user asks for copy that depends
> on facts you do not have, ask first or leave a bracketed placeholder.

---

## Core Non-Negotiables

- Read `CONTINUITY.md` before acting.
- Do not read or rely on prior chat context unless the durable fact is recorded
  in `CONTINUITY.md`.
- Do not overwrite unrelated work or user-edited files.
- Do not invent project details, metrics, or experience in portfolio copy.
- Do not broaden scope without justification (the Projects section renders
  CareFlow and RoleFit AI only; other constants entries stay unrendered).
- Do not invent speculative abstractions (CMS, dynamic routing, auth, blog
  engines, analytics dashboards).
- Verify important changes before finalizing.
- Keep patches reviewable and reversible.
- Do not print secrets, tokens, broad environment dumps, or personal data
  beyond what already lives in tracked files.
- Do not ask the user to paste secrets.

---

## Quick Reference

Before any code:

1. Read `CONTINUITY.md`.
2. Confirm scope; ask only if ambiguity blocks progress.
3. Inspect the files you will touch.
4. For UI work, open the matching section under `src/sections/` first so the
   change matches surrounding tone and structure.
5. For non-trivial work, sketch a verification plan.

While coding:

- Every changed line traces to the request, required cleanup, or verification.
- Match local patterns; do not introduce new ones when existing ones work.
- State assumptions and surface meaningful tradeoffs.
- Iterate against verification, not vibes.

Before finishing:

- Run the verification checklist for the change type.
- Update `CONTINUITY.md` if state changed meaningfully.
- Call out residual risks and skipped checks.
- Start the final reply with a brief ledger snapshot: Goal, Now, Next, and
  Open Questions.

When in doubt, pause and ask before deploying, reworking the Projects section,
adding new top-level sections, introducing routing, or adding paid/vendor
dependencies.

---

## Anti-Patterns

Do not:

- overwrite unrelated work or broaden scope without justification
- unhide further projects (Catch the Ball, the portfolio itself) without an
  explicit user request; the Projects section renders only CareFlow and RoleFit AI
- invent speculative abstractions or premature configurability
- silently swallow errors or hide failures with fallback behavior
- build fake loading states or skeleton placeholders
- introduce formatting churn unrelated to the task
- introduce new patterns when existing ones work
- introduce new global UX systems (banner systems, toast systems, loading
  frameworks) unless the user asks and the need is cross-cutting
- invent project copy (metrics, tech, dates, role scope, employer details)
- write multi-sentence inline help blocks or in-app manuals; keep interface
  labels and copy short and obvious
- add new emoji to UI copy unless the user explicitly asks

---

## Refactor Rules

Refactor only when:

- the current task requires it
- the existing structure blocks correctness
- the refactor reduces future complexity
- the refactor can be verified safely

Prefer local improvement over architectural rewrites. Drive-by refactors during
content updates are not allowed.

---

## Continuity Rules

`CONTINUITY.md` is the canonical workspace memory. The riskiest moment in
multi-agent work is handoff; the ledger exists so future agents do not
relitigate prior decisions.

### Required Behavior

- Read `CONTINUITY.md` before acting.
- Update it only for meaningful state changes.
- Keep entries factual, compact, and high-signal.
- Tag entries with `[USER]`, `[CODE]`, `[TOOL]`, or `[ASSUMPTION]`.
- Use `UNCONFIRMED` instead of guessing.
- Capture active risks, durable decisions, current state, and next steps.
- Every entry includes an ISO timestamp.

### Bounds

- Snapshot: max 25 lines.
- Done (recent): max 7 bullets.
- Working Set: max 12 paths.
- Receipts: keep only the last 10-20 entries.

If sections grow noisy, compress older entries into milestone bullets with a
pointer to the relevant commit or doc path.

### Durable Decisions

Use lightweight ADR-style entries:
`D001 ACTIVE: Projects renders CareFlow plus RoleFit AI, others hidden.`

Entries should be specific and verifiable, include what changed, what was
verified, and any required follow-up. Avoid vague summaries.

---

## Multi-Agent Workflow

Multiple coding assistants may work on this repo. All follow these rules
regardless of provider. Route work by task shape (UI iteration, content
updates, build/deploy, docs-only), not by model brand. The agent with verified
access to the relevant tooling wins.

---

## Frontend Discipline

Before changing UI:

- Reuse tokens from `src/App.css` (CSS custom properties under `:root`).
  Match the existing Manrope display/body font and the teal-accented palette.
- Layout is hand-written CSS in `src/App.css`: the `.container` wrapper, CSS
  Grid (`.about-grid`, `.skills-grid`), and a small utility layer (`.d-flex`,
  `.text-center`, spacing and gap helpers). Action buttons are anchors styled
  with `.cs-action*`. No Bootstrap, react-bootstrap, or Tailwind. Reuse the
  Lucide / React Icons sets already imported in the file.
- Keep sections compact and recruiter-friendly. Density beats decoration.
- Prefer composition over giant section components. If a section grows past
  the soft target, extract focused pieces into `src/components/`.
- Verify major UI changes visually in Chrome (or the preview browser) when
  feasible. Use the project's dedicated port (see Commands).
- Respect responsive breakpoints already in `App.css`; do not introduce a
  parallel mobile system.

The portfolio is content-first. When the change is copy, prefer editing the
existing constant or JSX text in place rather than introducing a CMS or new
abstraction.

---

## Content And Copy Discipline

- Portfolio copy should be concrete, recruiter-oriented, and free of
  marketing fluff or vague superlatives.
- Project entries in `src/constants/projects.js` should match the actual
  state of the project they describe. When updating CareFlow or RoleFit AI
  copy, cross-check the sibling repos (`../careflow/` and `../role-fit-ai/`
  README and CONTINUITY) for the current feature set.
- The Projects section renders CareFlow (primary) and RoleFit AI (secondary).
  The `PROJECTS_DATA` array keeps further entries (Catch the Ball, the
  portfolio itself), but do not unhide them in the rendered section without an
  explicit user request.
- The hero, About, Skills, and Contacts copy should stay aligned with what
  the user says about themselves elsewhere (resume, AboutMe). Do not invent
  hobbies, locations, role types, or tech the user has not stated.

---

## Modularity

Split growing workflows into components, hooks, and utilities. Keep public
interfaces stable; isolate volatile logic behind smaller helpers.

### File Size

Soft target: about 300 LOC for hand-written files. This is a smell, not a hard
rule.

When a hand-written file crosses about 400 LOC, either:

- justify why splitting would harm cohesion, or
- propose a split as part of the current task, only if the task already touches
  that file.

Do not split files purely to hit the target during unrelated work. `App.css`
is already large by nature and is exempt from the soft target, it is a single
tokens-and-section stylesheet, not hand-written logic.

---

## Safety And Data Handling

- Do not print secrets, tokens, private keys, or broad environment dumps.
- Do not commit `.env` files or local credentials.
- The portfolio has no server-side code, so there are no API keys to leak,
  but treat the `gh-pages` deploy token (if any) as sensitive.
- Do not embed real user contact info beyond what already appears in tracked
  files. If asked to add new contact channels, confirm them with the user.
- The resume renders inline from `src/constants/resume.js` (mirrored from a
  local LaTeX source); keep personal data to what already ships there.

---

## Git Rules

Default to local-only work unless the user explicitly asks to stage, commit,
push, or open a PR.

Never:

- overwrite unrelated changes
- use destructive git operations (force push, hard reset, branch delete)
  without explicit instruction
- rebase, amend, push, or switch branches unless requested
- stage unrelated files
- stage `AGENTS.md`, `CLAUDE.md`, or `CONTINUITY.md` unless the user
  explicitly asks
- run `npm run deploy` (which publishes to GitHub Pages) without explicit
  instruction, this writes to the production custom domain

Always:

- keep patches reviewable and scoped
- check `git status --short` before staging
- use non-interactive git commands
- avoid formatting churn unrelated to the task

When asked to name a branch, commit work, push, or draft PR copy, follow
Conventional Commit subjects by default:

```
docs(projects): refresh careflow chapter copy
fix(nav): preserve hash-scroll offset under sticky navbar
```

---

## Escalation Rules

Pause and ask before:

- destructive operations
- deploying to GitHub Pages (`npm run deploy` / `predeploy`)
- changing the custom domain, `CNAME`, or routing entry points
- reworking the Projects section structure (chapter count, layout, hero)
- introducing routing, a CMS, analytics, or auth
- introducing paid or vendor dependencies
- changing workflow-critical UI patterns
- introducing new global UX systems

---

## Verification

- **UI**: no console errors, layout stable across the existing breakpoints,
  no regression in the sticky navigation or hash scrolling. Major changes:
  `npm run dev` + visual QA in the preview browser on the project's port
  (see Commands). Minor: use judgment, note if skipped.
- **Build**: `npm run build` succeeds when source or config changed.
- **Content**: re-read the changed copy in full; check it matches the source
  of truth (resume, CareFlow README, user-confirmed facts).
- **Refactors**: existing behavior preserved, `npm run build` succeeds, grep
  confirms old symbols removed.
- **Docs-only**: verify paths and links; runtime checks not required.

If checks are skipped, explain why.

---

## Commands

Run from the project root.

- **Build**: `npm run build`
- **Dev**: `npm run dev` (starts Vite on the canonical port, see below)
- **Preview**: `npm run preview` (serves the production build locally)
- **Deploy**: `npm run deploy` (only on explicit user instruction; publishes
  the `dist/` build to GitHub Pages and overwrites the live site)

> Port `5175` is the canonical port for this project. `vite.config.js` sets
> `strictPort: true`, so Vite will not silently switch ports. If `5175` is
> already bound, treat that as a signal the app is already running, connect
> to `http://localhost:5175` instead of launching another `npm run dev`, and
> do not change the port to dodge the conflict.
> Sibling projects: careflow uses `5173`, role-fit-ai uses `5174`. Do not
> confuse the three.

Notes:

- Do not commit `node_modules/`, `dist/`, or `.env`.
- The custom domain is configured via `public/CNAME`. Do not edit it unless
  the user explicitly asks.

---

## Communication Style

- Think privately.
- Do not print reasoning in the final response to the user.
- Skip preambles and explanations unless necessary.
- Only report actions, blockers, and final outputs.

---

## Definition Of Done

A task is complete when:

- requested behavior works or the requested question is answered
- diff is appropriately scoped
- relevant verification was performed
- skipped checks are explained
- `CONTINUITY.md` is updated for meaningful state changes
- UI changes were inspected in the preview browser when risk warrants it
- residual risks or follow-ups are called out clearly
