# Portfolio — Claude Overrides

`AGENTS.md` is the canonical guide. This file only adds Claude-specific tool
guidance; it must not override its priority order or project constraints.
`CONTINUITY.md` is not imported, so read it fresh before acting.

@AGENTS.md

## Tool Use

- `Read` before `Edit` / `Write`. Never `Write` without reading first.
- Prefer `Grep` / `Glob` over broad shell searches for codebase discovery.
- Use `Edit` for targeted changes; reserve `Write` for new files or
  intentional full-file replacements after first reading the existing file.
- Run commands via `Bash` from the project root; see AGENTS.md → Commands
  for port discipline (canonical `5184`, `strictPort`, sibling reservations,
  do not switch ports to sidestep a conflict).

## Visual QA

Verify major UI changes in a browser when feasible (`AGENTS.md` default).
Pick the tool by what you're verifying:

- **Content / computed styles / tokens / console** (this project's common case:
  design and token work) → **Claude Preview** (`mcp__Claude_Preview`),
  preferred here:
  1. `preview_start` with name `portfolio` (in `.claude/launch.json`).
  2. `preview_snapshot` / `preview_inspect` for text + computed styles — more
     reliable than screenshots for content/CSS.
  3. `preview_screenshot` for regressions; if blank, fall back to
     `preview_snapshot` + `preview_inspect`.
  4. Check `preview_console_logs` / `preview_logs` before reporting done.
- **Layout / responsive / visual fidelity** (desktop/tablet/mobile breakpoints,
  full-width render) → **Claude in Chrome** (`mcp__Claude_in_Chrome`) with
  `resize_window` (e.g. 1440 / 768 / 375); Preview's embedded viewport is too
  cramped for this.
- If the chosen tool's bridge isn't connected, use the other and note the gap.

## Design Context

This project has impeccable-skill context committed to disk. Read before any
UI work:

- **`PRODUCT.md`** at the project root, strategic context (users, product
  purpose, brand personality, design principles, accessibility).
- **`DESIGN.md`** at the project root, visual spec (color tokens, typography,
  elevation, components, do's and don'ts). Frontmatter is normative, prose
  is context.
- **`.impeccable/design.json`**, extended sidecar with tonal ramps, motion
  tokens, breakpoints, and full self-contained component snippets.

The strategic design principles live in `PRODUCT.md` (canonical); read them
there — do not maintain a second copy here. The impeccable skill's loader also
picks them up automatically, so no need to summarize them in chat.
