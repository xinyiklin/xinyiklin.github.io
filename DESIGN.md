---
name: Xinyi Lin Portfolio
description: A working engineer's portfolio. CareFlow, RoleFit AI, and JakeForge presented as interactive desktop app windows, with CareFlow as the primary clinic-workspace proof.
colors:
  operating-teal: "#0f766e"
  polish-violet: "#7c3aed"
  forge-green: "#1b674c"
  beacon-teal: "#14b8a6"
  drafting-paper: "#f5f9fc"
  specimen-white: "#ffffff"
  trace-paper: "#edf5f8"
  chart-ink: "#102033"
  quiet-slate: "#607083"
  hairline: "#0f2a3d17"
  hard-edge: "#0f2a3d29"
typography:
  headline:
    fontFamily: "Manrope, Avenir Next, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, Avenir Next, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.8vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  subtitle:
    fontFamily: "Manrope, Avenir Next, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.6rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Manrope, Avenir Next, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  tagline:
    fontFamily: "Manrope, Avenir Next, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 700
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, Avenir Next, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 800
    letterSpacing: "0.16em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  pill: "999px"
spacing:
  xs: "0.4rem"
  sm: "0.6rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  section: "clamp(4rem, 8vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.operating-teal}"
    textColor: "{colors.specimen-white}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1.05rem"
  button-secondary:
    backgroundColor: "{colors.specimen-white}"
    textColor: "{colors.chart-ink}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1.05rem"
  chip-accent:
    backgroundColor: "{colors.operating-teal}"
    textColor: "{colors.operating-teal}"
    rounded: "{rounded.pill}"
    padding: "0.36rem 0.85rem"
  project-window:
    backgroundColor: "{colors.specimen-white}"
    textColor: "{colors.chart-ink}"
    rounded: "{rounded.lg}"
    padding: "0"
---

# Design System: Xinyi Lin Portfolio

## 1. Overview

**Creative North Star: "An engineer's desktop, interactive"**

This portfolio reads like a working engineer presenting three builds with care, not a marketing site. On wide, motion-allowed viewports the landing becomes a cinematic macOS-style desktop: the hero is the wallpaper, the dock opens app windows, and the project proof lives inside interactive product-like demos. CareFlow leads as the primary clinic-workspace window with Schedule, Documents, Billing, Refills, Admin, a Patient hub path, draggable appointments, and working local state. RoleFit AI is a quieter secondary window: a resume-tailor workspace with Resume, Materials, Applications, and Analytics tabs, linked to its hosted build and source. JakeForge is the compact third window: the Jake's-style resume editor with export, spacing, and heading-case controls over an editable serif page, linked to the live app and source. Mobile and reduced-motion users get the same content as flat stacked windows. The contrast in treatment is intentional, CareFlow earns the primary proof; RoleFit AI and JakeForge signal breadth without competing with it.

The system rejects the AI-generated SaaS landing template that flooded the internet by 2026 (purple gradients, four-card icon grids, hero metric tiles, gradient text, glass cards, Inter on white). It also rejects the editorial-magazine reflex (italic Cormorant, ruled columns, lowercase tracked metadata, drop caps) that has saturated tech brand sites. The right register is engineer-pragmatic with quiet authority and one moment of confident interactivity.

**Key Characteristics:**
- **Three project windows, one desktop.** CareFlow as the primary interactive app, RoleFit AI and JakeForge as the quieter secondary apps.
- **Cinematic desktop on wide screens.** The dock opens, focuses, minimizes, closes, and right-clicks app windows. The window manager is the showcase.
- **Flat fallback on mobile and reduced motion.** No hidden project content, no motion dependence.
- **Quiet secondary treatment.** The RoleFit and JakeForge windows show their workflows with local demo data; title-bar actions link to the real hosted builds and source.
- **Scoped accents.** Operating Teal for CareFlow, Polish Violet for RoleFit AI, Forge Green for JakeForge. Accents are supplied through window CSS variables and do not bleed across apps.
- **Show, don't tell.** All project windows are real DOM prototypes with interactive state, not static image plates.
- **No invented claims.** Every spec maps to something shipping or explicitly demo-only.

## 2. Colors: The Operating Palette

A two-accent system over a near-white drafting surface. Accents stay rare and project-scoped; the neutrals carry the page.

### Primary

- **Operating Teal** (`#0f766e`, `oklch(45% 0.075 180)`): the brand's load-bearing color. Primary CTA backgrounds, the CareFlow window accent, hero badge text, dock states, contact-section pulse, schedule blocks, active filters, and real availability/status dots.

### Secondary

- **Polish Violet** (`#7c3aed`, `oklch(50% 0.25 290)`): the RoleFit AI window accent. Used on the RoleFit title-bar action, rail state, fit score, chips, and segmented controls. Polish Violet never appears in the CareFlow window or the hero.

### Tertiary

- **Beacon Teal** (`#14b8a6`, `oklch(72% 0.135 180)`): the brighter teal used on the hero badge, the "Open to Work" contact pill, and the nav scroll-progress glow. A more luminous variant of Operating Teal for high-luminance contexts.

### Neutral

- **Drafting Paper** (`#f5f9fc`): the page background. Cool off-white tinted faintly toward teal so the page never reads as `#fff`.
- **Specimen White** (`#ffffff`): surface color for cards, app windows, dialogs, and document previews.
- **Trace Paper** (`#edf5f8`): the muted section background (skills section, hero gradient floor).
- **Chart Ink** (`#102033`): primary text. A blue-leaning ink that pairs with teal.
- **Quiet Slate** (`#607083`): secondary text. Used for meta lines, descriptions, eyebrow labels, tagline supporting text.
- **Hairline** (`rgba(15,42,61,0.09)`): subtle dividers around app windows, title bars, document rows, tables, and the footer.
- **Hard Edge** (`rgba(15,42,61,0.16)`): borders on secondary buttons, anywhere a more committed line is needed.

### Named Rules

**The One-Accent-Per-App Rule.** Each project window commits to exactly one accent and the shared neutral envelope. CareFlow uses Operating Teal across its title-bar action, nav state, schedule blocks, chips, and primary buttons. RoleFit AI uses Polish Violet across its window action, rail state, fit score, chips, and segmented controls.

**The Color-Mix Rule.** Accent-tinted backgrounds should be derived from the current window accent (`--accent` / `--accent-soft`) rather than hand-tuned. The same recipe scales across both project apps.

**The No-Gradient-Text Rule.** Text is always one solid color. `background-clip: text` with a gradient is forbidden. Emphasis comes from scale, weight, and color.

## 3. Typography: The Single-Family Notebook

**Display Font:** Manrope (with Avenir Next, system-ui, sans-serif fallback)
**Body Font:** Manrope
**Label Font:** Manrope (no second family)

**Character:** One geometric humanist family does all the work. Weight contrast (400 vs 900) carries the hierarchy. Manrope sits outside the reflex-reject font list (Inter, DM Sans, Plus Jakarta, etc.) while still reading as a precise, engineer-leaning sans. No serif companion.

### Hierarchy

- **Headline** (900, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.05, tracking -0.025em): section-scale titles such as the hero and contact anchors.
- **Title** (900, `clamp(2.1rem, 4.8vw, 3.5rem)`, line-height 1.04, tracking -0.025em): reserved for large identity moments, not compact app chrome.
- **Subtitle** (800, `clamp(1.25rem, 2vw, 1.6rem)`, line-height 1.2, tracking -0.01em): secondary section-scale headings.
- **Tagline** (700, `1.02rem`, line-height 1.5): concise positioning copy when a page-level identity moment needs support.
- **Body** (400, `1rem`, line-height 1.7): blurbs, About copy, and contact copy. Max line length 60ch.
- **Label** (800, `0.78rem`, tracking 0.16em, uppercase): the hero kicker and compact app labels. Rationed: maximum 1 section eyebrow per 3 sections across the whole page; the desktop windows use short functional labels rather than decorative section eyebrows.

### Named Rules

**The Single-Family Rule.** One typeface family across the whole portfolio. A serif companion is forbidden.

**The Tracking-Out-Loud Rule.** Uppercase labels always use letter-spacing 0.14em or more. Tightly-set uppercase reads as shouty; spaced uppercase reads as catalogued.

**The Headline-Anchor Rule.** Every section has one Headline and only one.

**The Eyebrow-Restraint Rule.** Maximum 1 small uppercase tracked label per 3 sections across the whole page. Eyebrows are not free.

## 4. Elevation

The system is flat by default and lifted only on interaction. Surfaces sit at rest. Depth comes from full borders, accent-tinted status pills, and gentle shadows on resting surfaces. There are no decorative drop shadows.

When a button is hovered or focused, a subtle translate-Y appears. State, not status, drives elevation.

### Shadow Vocabulary

- **shadow-sm** (`0 2px 8px rgba(15,42,61,0.08)`): resting cards, app rows, and document surfaces. Almost invisible; suggests material more than shadow.
- **shadow-md** (`0 12px 32px rgba(15,42,61,0.1)`): on hover for primary buttons and prominent interactive surfaces.
- **shadow-lg** (`0 24px 64px rgba(15,42,61,0.14)`): reserved for the hero and floating prominent elements. Used sparingly.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, focus).

**The No-Side-Stripe Rule.** `border-left` or `border-right` greater than 1px as a colored accent on cards, list items, or callouts is forbidden. Use full borders or background tints.

**The Hairline-Divider Rule.** Between title bars, rows, tables, panels, and footer content: a 1px Hairline is enough. No heavier rules, no inset shadows, no double lines.

## 5. Components

### Buttons

- **Shape:** soft rectangle, `var(--radius)` = 10px.
- **Primary** (`Live demo` / `Apply`): solid app accent background, Specimen White text, weight 700, padding `0.6rem 1.05rem`. On hover: color-mix(accent 80%, black) for the background, +1px translateY.
- **Secondary** (`Source` / `GitHub`): Specimen White background, Chart Ink text, Hard Edge border. On hover: Chart Ink border.

### Status Pill

- **Accent** (used for real availability/status states): background derives from the app accent, border is a stronger tint, and text stays in the accent. A dot appears only when it conveys real semantic state such as availability, not as decoration.

### Desktop Project Windows (the signature surface)

The Projects section renders one desktop surface with three app windows: About,
CareFlow, and RoleFit AI. On wide, motion-allowed viewports the dock is the
primary navigation. On mobile and reduced motion the same windows are stacked
as static cards and their traffic-light controls are decorative.

- **Desktop scene.** `DesktopScene` owns the cinematic boot, scroll lock, hero
  wallpaper, and camera framing. It must release scroll and interactivity
  together so the resume overlay cannot capture stale body overflow state.
- **Window manager.** `Projects.jsx` owns window geometry, z-order, dock state,
  context menus, dragging, resizing, maximizing, minimizing, and closing. App
  windows open maximized by default from the dock.
- **CareFlow window.** `CareFlowDemo.jsx` is the primary proof surface: sidebar
  nav, draggable schedule blocks, appointment modal, Patient hub path,
  Documents, Billing, Refills, and Admin permissions. State is local and
  fake-data only.
- **RoleFit AI window.** `RoleFitDemo.jsx` is a quieter secondary surface:
  rail navigation, resume section controls, derived fit score, zoom selector,
  Materials, Applications, and Analytics. It links to the hosted build and
  source.
- **JakeForge window.** `JakeForgeDemo.jsx` is the compact third surface: a
  sidebar with export buttons, spacing presets, heading-case control, and zoom
  over a Jake's-style serif page that is editable in place. It links to the
  live app and source.
- **Action URLs.** `src/constants/projects.js` stores only the external URLs
  used by the window title-bar actions. Case-study copy belongs in the demo
  components or docs, not in an unused archive data array.

### Cards (skills, contact, about)

- **Corner Style:** `var(--radius)` = 10px.
- **Background:** Specimen White over the Trace Paper section background.
- **Shadow Strategy:** shadow-sm at rest. These are passive cards, not interactive.
- **Border:** none. Shadow + background contrast carries separation.

### Navigation (desktop dock)

The fixed dot-constellation navbar was removed with the desktop redesign. On wide, motion-allowed viewports the landing is a cinematic macOS-style desktop (`DesktopScene`): the hero is the wallpaper and the case studies open as draggable windows. There is no standalone About/Skills section and no separate navigation bar; the Resume CTA now lives inside the desktop's About window.

- **Style:** a floating bottom dock (`.pj-dock`) with one tile per app, About, JakeForge, CareFlow, and RoleFit AI, then a separator and the link tiles (GitHub, LinkedIn, Contact). The dock fades in as the camera settles into the framed desktop. CareFlow and JakeForge tiles link straight to the live products in a new tab; About and RoleFit AI open their windows fullscreen (maximized) by default, and clicking an open app focuses it. The CareFlow and JakeForge demo windows are kept as reference: they still open from the tile's right-click menu and render as stacked cards on mobile/reduced-motion.
- **Reordering:** tiles can be dragged to reposition, but only within their own side of the separator — app tiles stay on the left, link tiles on the right. The order is session-local (not persisted). The grabbed tile follows the pointer directly (reads as picked up via a deeper shadow, no scale) while the other tiles slide out of the way with a short FLIP; on release the grabbed tile settles into its slot. A real drag suppresses the tile's trailing click/navigation.
- **States:** hovering or focusing a tile reveals its label tooltip; the tile itself stays put (no magnify). Keyboard focus adds a ring on the icon. About uses the gradient "XL" brand tile, and CareFlow, RoleFit AI, and JakeForge each use their own favicon tile. Motion is suppressed under `prefers-reduced-motion`.
- **Right-click menu:** right-clicking an app tile opens a context menu (`.pj-ctx`, portaled to `<body>`) whose actions mirror the window's traffic lights and adapt to state, Open / Show, Zoom or Restore, Minimize, Close. Dismisses on Escape, outside-click, or blur. Link tiles keep the browser's native menu.
- **Mobile / reduced-motion:** the flat stacked layout has no dock; the windows render as static stacked cards and their traffic-light controls are decorative (non-interactive, removed from the tab order and the accessibility tree).

## 6. Do's and Don'ts

### Do:
- **Do** lead the primary case study with working product-like UI and real product copy from the live demo/source.
- **Do** keep one accent per project app. Operating Teal for CareFlow; Polish Violet for RoleFit AI; Forge Green for JakeForge. No accent rotation between pages, no accent bleeding between apps.
- **Do** keep the secondary RoleFit and JakeForge windows quieter: locally interactive demos whose title-bar actions link to the real builds and source, without competing with CareFlow's depth.
- **Do** derive tinted surfaces from `--accent` / `--accent-soft` so the recipe scales across all apps.
- **Do** keep neutrals tinted toward teal. Drafting Paper (`#f5f9fc`) is the right base; never `#fff` or `#000`.
- **Do** use ≥1.25 ratios between Headline, Title, Subtitle, Body, Label. Flat scales read as uncommitted.
- **Do** cap body line length at 60ch. Wider lines lose recruiters fast.
- **Do** ration eyebrows: maximum 1 per 3 sections across the whole page. App-window headings should be functional and compact.
- **Do** respect `prefers-reduced-motion`: skip the cinematic boot/desktop manager and render the flat stacked layout.
- **Do** keep project demos in real DOM where possible so content, controls, and states remain inspectable.

### Don't:
- **Don't** ever use the em-dash character (`,` or `:` is the replacement) anywhere user-visible: headlines, taglines, blurbs, eyebrows, status pills, button labels, captions, alt text. Also no en-dash as a separator. The em-dash is the single most-violated AI tell.
- **Don't** use section-numbering eyebrows. `01 / Scheduling`, `001, Capabilities`, `04, Security` are banned. The note's Subtitle is enough.
- **Don't** stamp giant folio numerals (`01`, `02`) as a section anchor. Use the project name as the anchor.
- **Don't** overlay decorative pills or labels on top of an app surface (`Plate, 02`, `Field notes`). Caption goes below, or the interface speaks alone.
- **Don't** spend more than 1 middle-dot per line in a metadata strip. Reach for line breaks, commas, or columns first.
- **Don't** use the AI-slop SaaS template: purple gradients, four-card icon grids, hero-metric blocks, gradient text, glass cards, Inter on white. Visitor must not be able to say "AI made that" without doubt.
- **Don't** drift into the editorial-magazine reflex: italic Cormorant or Recoleta or Fraunces, ruled columns, lowercase tracked metadata, drop caps. Currently saturated; wrong register.
- **Don't** add a second typeface family. Manrope alone, weight contrast does the work.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent. Side-stripe borders are an absolute ban.
- **Don't** use `background-clip: text` with a gradient anywhere. Text is one solid color.
- **Don't** use decorative status dots on every nav link, list row, or badge. Acceptable only when conveying real semantic state, one per page section.
- **Don't** invent metrics or outcomes in project copy. If it is not in the live demo, local demo surface, or source repo, it is not in the case study.
- **Don't** apply bounce or elastic easings. Ease-out exponential curves only.
- **Don't** repeat identical card grids (four cards, same size, icon + heading + body). If a layout starts looking like a SaaS feature row, restructure.
- **Don't** add scroll-driven showcase code without a real need. The current proof surface is the dock/window interaction, not page-scroll choreography.
- **Don't** reintroduce screenshot-only project panes when a small real-DOM prototype can show the workflow more honestly.
