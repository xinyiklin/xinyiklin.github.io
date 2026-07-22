---
name: Xinyi Lin Portfolio
description: A working engineer's portfolio. CareFlow, RoleFit AI, and Typeset launch from a cinematic desktop, with one local About window and direct links to the real products and source.
colors:
  operating-teal: "#0f766e"
  typeset-green: "#176b5c"
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

This portfolio reads like a working engineer presenting three builds with care, not a marketing site. On wide, motion-allowed viewports the landing becomes a cinematic macOS-style desktop: the hero is the wallpaper, the About window carries identity, and the dock launches CareFlow, RoleFit AI, and Typeset directly. A launcher context menu exposes each source repository without duplicating product UI inside the portfolio. Mobile and reduced-motion users get the same destinations as compact project rows. CareFlow remains the primary project in the resume and positioning; RoleFit AI and Typeset signal breadth without competing with it.

The visual register is engineer-pragmatic: a restrained teal palette, strong
typographic hierarchy, and one confident interactive surface. Avoid generic
SaaS styling, editorial ornament, and motion without a clear interaction role.

**Key Characteristics:**
- **One About window, three product launchers.** CareFlow, RoleFit AI, and Typeset open their real hosted products from the dock.
- **Cinematic desktop on wide screens.** The dock launches products, reorders within each side, and provides source links through app context menus.
- **Flat fallback on mobile and reduced motion.** No hidden project destinations, no motion dependence.
- **Product-owned identity.** Each launcher uses the real product favicon and restrained brand color.
- **No invented claims.** Every project statement maps to a hosted product, source repository, or resume fact.

## 2. Colors: The Operating Palette

A restrained teal system over a near-white drafting surface. Product favicons carry their own identity; the portfolio neutrals carry the page.

### Primary

- **Operating Teal** (`#0f766e`, `oklch(45% 0.075 180)`): the brand's load-bearing color. Primary CTA backgrounds, the CareFlow window accent, hero badge text, dock states, contact-section pulse, schedule blocks, active filters, and real availability/status dots.

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

**The Product-Identity Rule.** Product launchers use their real favicons and a single supporting tile color. Portfolio chrome remains in the shared neutral and teal system.

**The Color-Mix Rule.** Accent-tinted About actions derive from the current window accent (`--accent` / `--accent-soft`) rather than hand-tuned one-offs.

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

### Desktop Launchers (the signature surface)

The Projects section renders one desktop surface with an About window and
three external product launchers. On wide, motion-allowed viewports the dock is
the primary project navigation. On mobile and reduced motion the About window
becomes static and the products render as direct Live and Source rows.

- **Product launchers.** CareFlow, RoleFit AI, and Typeset open their hosted
  products from the dock. Right-click exposes one-word Live and Source actions.
- **Fallback project rows.** Mobile and reduced-motion layouts show the same
  products as compact rows with explicit Live and GitHub actions.

### Cards (skills, contact, about)

- **Corner Style:** `var(--radius)` = 10px.
- **Background:** Specimen White over the Trace Paper section background.
- **Shadow Strategy:** shadow-sm at rest. These are passive cards, not interactive.
- **Border:** none. Shadow + background contrast carries separation.

### Navigation (desktop dock)

On wide, motion-allowed viewports the landing is a cinematic desktop: the hero
is the wallpaper, About is a draggable window, and project tiles launch hosted
products. The resume action lives in the About window.

- **Style:** a floating bottom dock (`.pj-dock`) with About, Typeset, CareFlow, and RoleFit AI, then a separator and GitHub, LinkedIn, and Contact. The dock fades in as the camera settles. Product tiles launch live sites in a new tab; About opens its local window fullscreen.
- **Reordering:** tiles can be dragged within their side of the separator; app
  tiles stay on the left and link tiles on the right. A completed drag must not
  trigger the tile's link.
- **States:** hovering or focusing a tile reveals its label tooltip; the tile itself stays put (no magnify). Keyboard focus adds a ring on the icon. About uses the gradient "XL" brand tile, and CareFlow, RoleFit AI, and Typeset each use their own favicon tile. Motion is suppressed under `prefers-reduced-motion`.
- **Right-click menu:** right-clicking About opens state-aware window actions. Right-clicking a product offers Live and Source links. Menus dismiss on Escape, outside-click, or blur; link tiles keep the browser's native menu.
- **Mobile / reduced-motion:** the flat layout has no dock. About renders as a static window with decorative traffic lights, followed by direct project rows.

## 6. Do's and Don'ts

### Do:
- **Do** lead visitors to the real hosted products and source repositories.
- **Do** keep product identity scoped to each launcher favicon and supporting tile color.
- **Do** keep RoleFit AI and Typeset quieter than CareFlow in portfolio copy and ordering.
- **Do** derive About action tints from `--accent` / `--accent-soft`.
- **Do** keep neutrals tinted toward teal. Drafting Paper (`#f5f9fc`) is the right base; never `#fff` or `#000`.
- **Do** use ≥1.25 ratios between Headline, Title, Subtitle, Body, Label. Flat scales read as uncommitted.
- **Do** cap body line length at 60ch. Wider lines lose recruiters fast.
- **Do** ration eyebrows: maximum 1 per 3 sections across the whole page. App-window headings should be functional and compact.
- **Do** respect `prefers-reduced-motion`: skip the cinematic boot/desktop manager and render the flat stacked layout.
- **Do** keep the project launch path explicit on both cinematic and fallback layouts.

### Don't:
- **Don't** invent project claims, metrics, or outcomes.
- **Don't** add generic feature-card grids, decorative overlays, or gradients as
  a substitute for hierarchy.
- **Don't** add a second typeface family, colored side-stripe borders, or
  decorative status dots.
- **Don't** use bounce or elastic easing, or add motion without a clear purpose.
