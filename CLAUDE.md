# Portfolio — Claude Overrides

`AGENTS.md` is the canonical guide. It is imported below, so its rules load
into context every session — no separate read step. `CONTINUITY.md` is **not**
imported (it changes constantly); read it fresh before acting. This file adds
Claude-specific behavior; when it conflicts with `AGENTS.md`, this file wins.

@AGENTS.md

## Tool Use

- `Read` before `Edit` / `Write`. Never `Write` without reading first.
- Prefer `Grep` / `Glob` over shell `grep` / `find` for codebase searches.
- Use `Edit` for targeted changes; reserve `Write` for new files or
  intentional full-file replacements after first reading the existing file.
- Run commands via `Bash` from the project root; see AGENTS.md → Commands
  for port discipline (canonical `5184`, `strictPort`, sibling reservations,
  do not switch ports to sidestep a conflict).

## Visual QA

Verify major UI changes in a browser when feasible (`AGENTS.md` default).
Pick the tool by what you're verifying:

- **Content / computed styles / tokens / console** (this project's common case —
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

- **`PRODUCT.md`** at the project root, strategic context (register, users,
  brand personality, anti-references, design principles, accessibility).
- **`DESIGN.md`** at the project root, visual spec (color tokens, typography,
  elevation, components, do's and don'ts). Frontmatter is normative, prose
  is context.
- **`.impeccable/design.json`**, extended sidecar with tonal ramps, motion
  tokens, breakpoints, and full self-contained component snippets.

**Register:** brand (portfolio = design IS the product).

The strategic design principles live in `PRODUCT.md` (canonical); read them
there — do not maintain a second copy here. The impeccable skill's loader also
picks them up automatically, so no need to summarize them in chat.
