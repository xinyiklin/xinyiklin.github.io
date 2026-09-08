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

**Flag-first, skip by default.** Do not run browser QA unsolicited. This is a
live public site, so when a change touches the cinematic desktop, breakpoints,
reduced-motion fallback, or scroll-reveal behavior, say so and let the user
decide. Run it when asked.

When you do run it:

- **Default: the in-app browser pane** (`mcp__Claude_Browser__*`).
  `preview_start` with name `portfolio` (`.claude/launch.json`, port `5184`).
- Prefer `read_page` / `get_page_text` for content and structure,
  `javascript_tool` for computed styles and tokens, and
  `read_console_messages` before reporting done. Use `computer` for
  screenshots and `resize_window` for breakpoints (1440 / 768 / 375).
- **Claude in Chrome** (`mcp__claude-in-chrome__*`) for a real window when
  full-width fidelity matters, or to sanity-check a layout the pane renders
  cramped. If a bridge isn't connected, use the other and note the gap.
- **The pane is paint-gated.** `IntersectionObserver`, `ResizeObserver`, rAF,
  and CSS transitions do **not** fire while it is occluded — which silently
  breaks QA of the scroll-driven Projects chapters and any reveal animation.
  Force frames with a real scroll or screenshot gesture, or force the end state
  and inspect the wiring instead.
- The user browses in Firefox; a bug they report may be Firefox-specific even
  when Chrome looks fine. Fix the layout so it genuinely fits (flexible text
  columns yield) rather than trusting one engine's rendering.

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
