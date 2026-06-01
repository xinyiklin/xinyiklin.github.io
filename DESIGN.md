---
name: Xinyi Lin Portfolio
description: A working engineer's portfolio. CareFlow as an interactive sticky-scroll case study, RoleFit AI as a compact secondary case study with one real screenshot below.
colors:
  operating-teal: "#0f766e"
  polish-violet: "#7c3aed"
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
  case-hero:
    backgroundColor: "{colors.specimen-white}"
    textColor: "{colors.chart-ink}"
    rounded: "{rounded.lg}"
    padding: "0"
---

# Design System: Xinyi Lin Portfolio

## 1. Overview

**Creative North Star: "An engineer's case study, interactive"**

This portfolio reads like a working engineer presenting two builds with care, not a marketing site. The Projects section is a two-tier case study. CareFlow leads as an interactive sticky-scroll showcase: a single product visual (schedule, patient hub, timeline, refill inbox, or permission matrix) pins on the left while five scene blocks scroll on the right. As each scene crosses the viewport center band, the pinned visual crossfades to the matching screen. Pip pills below the visual allow click-to-jump. RoleFit AI follows below a hairline divider as a quieter, compact case study: three notes, one real sanitized pipeline screenshot, Polish Violet accent, View source CTA only. The contrast in treatment is intentional, CareFlow earns the interactive proof; RoleFit AI signals breadth with a real source-backed visual.

The system rejects the AI-generated SaaS landing template that flooded the internet by 2026 (purple gradients, four-card icon grids, hero metric tiles, gradient text, glass cards, Inter on white). It also rejects the editorial-magazine reflex (italic Cormorant, ruled columns, lowercase tracked metadata, drop caps) that has saturated tech brand sites. The right register is engineer-pragmatic with quiet authority and one moment of confident interactivity.

**Key Characteristics:**
- **Two case studies, one section.** CareFlow as the primary interactive showcase, RoleFit AI as a compact secondary with one real screenshot below.
- **Sticky-scroll case study for CareFlow.** A pinned left stage swaps between five real screens as the right column scrolls through five scene blocks. IntersectionObserver drives the active index; pip pills also offer click-to-jump.
- **Quiet case study for RoleFit AI.** No fabricated UI. Three short notes, one real sanitized pipeline screenshot, Polish Violet top-border per note, View source CTA.
- **One accent per case study.** Operating Teal for CareFlow, Polish Violet for RoleFit AI. Accents are scoped to each `<article>` via `--project-accent`, never bleed across.
- **Restrained backgrounds, committed identity.** The page is near-white. The project name, the tagline color, the sticky stage, and the primary CTA carry identity.
- **Show, don't tell.** The CareFlow case study leads with real product visuals. RoleFit AI adds one real product screenshot from its source repo, without pretending it has a live demo.
- **No invented claims.** Every spec maps to something shipping. No fake product previews for RoleFit AI.

## 2. Colors: The Operating Palette

A two-accent system over a near-white drafting surface. Accents stay rare and project-scoped; the neutrals carry the page.

### Primary

- **Operating Teal** (`#0f766e`, `oklch(45% 0.075 180)`): the brand's load-bearing color. Primary CTA backgrounds (Live demo button), the CareFlow case-study accent, link hovers in the navbar, hero badge text, contact-section pulse, sticky-stage halo, active pip pill, scene labels, status dot pulse.

### Secondary

- **Polish Violet** (`#7c3aed`, `oklch(50% 0.25 290)`): the RoleFit AI case-study accent. Used on the RoleFit tagline, the View source CTA, and the 2px top divider above each RoleFit note. The cross-project signal that more than one shipped build lives in the catalogue. Polish Violet never appears in the CareFlow case study, never in the navbar, never in the hero.

### Tertiary

- **Beacon Teal** (`#14b8a6`, `oklch(72% 0.135 180)`): the brighter teal used on the hero badge, the "Open to Work" contact pill, and the nav scroll-progress glow. A more luminous variant of Operating Teal for high-luminance contexts.

### Neutral

- **Drafting Paper** (`#f5f9fc`): the page background. Cool off-white tinted faintly toward teal so the page never reads as `#fff`.
- **Specimen White** (`#ffffff`): surface color for cards (about, skills, contact, case-hero figures).
- **Trace Paper** (`#edf5f8`): the muted section background (skills section, hero gradient floor).
- **Chart Ink** (`#102033`): primary text. A blue-leaning ink that pairs with teal.
- **Quiet Slate** (`#607083`): secondary text. Used for meta lines, descriptions, eyebrow labels, tagline supporting text.
- **Hairline** (`rgba(15,42,61,0.09)`): subtle dividers (between case studies, around case-hero figures, footer divider).
- **Hard Edge** (`rgba(15,42,61,0.16)`): borders on secondary buttons, anywhere a more committed line is needed.

### Named Rules

**The One-Accent-Per-Case-Study Rule.** Each case study commits to exactly one accent (its `--project-accent`) and the shared neutral envelope. CareFlow uses Operating Teal across its tagline, active pip pill, scene label, status dot, stage halo, and primary CTA. RoleFit AI uses Polish Violet across its tagline, View source CTA, and note dividers. Accents are scoped to the `<article>` wrapper and never bleed into the other case study.

**The Color-Mix Rule.** Accent-tinted backgrounds for status pills, pip pills, and stage halos are derived from `var(--project-accent)` via `color-mix(in oklch, ...)` rather than hand-tuned. The same recipe scales across both case studies and would extend cleanly to any future project accent.

**The No-Gradient-Text Rule.** Text is always one solid color. `background-clip: text` with a gradient is forbidden. Emphasis comes from scale, weight, and color.

## 3. Typography: The Single-Family Notebook

**Display Font:** Manrope (with Avenir Next, system-ui, sans-serif fallback)
**Body Font:** Manrope
**Label Font:** Manrope (no second family)

**Character:** One geometric humanist family does all the work. Weight contrast (400 vs 900) carries the hierarchy. Manrope sits outside the reflex-reject font list (Inter, DM Sans, Plus Jakarta, etc.) while still reading as a precise, engineer-leaning sans. No serif companion.

### Hierarchy

- **Headline** (900, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.05, tracking -0.025em): each section's title ("Recent builds", "Who I Am", "Let's Work Together"). One per section.
- **Title** (900, `clamp(2.1rem, 4.8vw, 3.5rem)`, line-height 1.04, tracking -0.025em): the project name in each case study (CareFlow, RoleFit AI). Sits in Chart Ink.
- **Subtitle** (800, `clamp(1.25rem, 2vw, 1.6rem)`, line-height 1.2, tracking -0.01em): the note titles inside a case study ("Patient hub with masked PII by default").
- **Tagline** (700, `1.02rem`, line-height 1.5): the one-line positioning under each project name, in the project accent color.
- **Body** (400, `1rem`, line-height 1.7): blurbs, note bodies, about-section copy. Max line length 60ch.
- **Label** (800, `0.78rem`, tracking 0.16em, uppercase): section eyebrows ("PROJECTS", "ABOUT", "STACK", "TECH"). Rationed: maximum 1 eyebrow per 3 sections across the page. Never used as a section-numbering or section-categorizing label inside a case study.

### Named Rules

**The Single-Family Rule.** One typeface family across the whole portfolio. A serif companion is forbidden.

**The Tracking-Out-Loud Rule.** Uppercase labels always use letter-spacing 0.14em or more. Tightly-set uppercase reads as shouty; spaced uppercase reads as catalogued.

**The Headline-Anchor Rule.** Every section has one Headline and only one.

**The Eyebrow-Restraint Rule.** Maximum 1 small uppercase tracked label per 3 sections across the whole page. Eyebrows are not free.

## 4. Elevation

The system is flat by default and lifted only on interaction. Surfaces sit at rest. Depth comes from full borders, accent-tinted status pills, and gentle shadows on resting surfaces. There are no decorative drop shadows.

When a button is hovered or focused, a subtle translate-Y appears. State, not status, drives elevation.

### Shadow Vocabulary

- **shadow-sm** (`0 2px 8px rgba(15,42,61,0.08)`): case-hero figures and note figures at rest. Almost invisible; suggests material more than shadow.
- **shadow-md** (`0 12px 32px rgba(15,42,61,0.1)`): on hover for primary buttons and prominent interactive surfaces.
- **shadow-lg** (`0 24px 64px rgba(15,42,61,0.14)`): reserved for the hero and floating prominent elements. Used sparingly.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, focus).

**The No-Side-Stripe Rule.** `border-left` or `border-right` greater than 1px as a colored accent on cards, list items, or callouts is forbidden. Use full borders or background tints.

**The Hairline-Divider Rule.** Between case studies, between header and notes, between notes and the stack footer: a 1px Hairline is enough. No heavier rules, no inset shadows, no double lines.

## 5. Components

### Buttons

- **Shape:** soft rectangle, `var(--radius)` = 10px.
- **Primary** (`Live demo`): solid project-accent background, Specimen White text, weight 700, padding `0.6rem 1.05rem`. On hover: color-mix(accent 80%, black) for the background, +1px translateY.
- **Secondary** (`Source` / `GitHub`): Specimen White background, Chart Ink text, Hard Edge border. On hover: Chart Ink border.

### Status Pill

- **Accent** (used for the "Live demo" / "Source available" status): background `color-mix(in oklch, var(--project-accent) 12%, transparent)`, border `color-mix(... 26%, transparent)`, text in the project accent. When the project is live (CareFlow), the pill carries a small leading dot in the solid accent color with a subtle 2.4s pulse. Source-available projects (RoleFit AI) carry the pill without the dot.

### Case Study (the signature surface)

The Projects section renders two case studies in order:

1. **CareFlow (primary, interactive):** the long-form sticky-scroll showcase described below.
2. **Hairline divider:** a 1px `var(--c-border)` rule with `clamp(3rem, 6vw, 5rem)` top and bottom margins, separating the two case studies.
3. **RoleFit AI (secondary, compact):** a compact case study with no interactive showcase. Three text notes, one proof screenshot, View source CTA only.

Each case study is wrapped in an `<article class="cs">` element that sets `--project-accent` inline. The shared `.cs-*` token vocabulary applies to both; the secondary variant uses `.cs--secondary` to scale down the headline and tagline.

#### Primary case study (CareFlow), five vertical regions, in order:

1. **Intro.** Left-aligned, asymmetric (max 62ch). The project Name in Title scale, the tagline in `var(--project-accent)` weight 700, the description in Quiet Slate body. No eyebrow. The H2 itself is the section anchor.
2. **Meta strip + actions.** A horizontal kv strip (`<dl>`) with three terms (Year / Role / Status) on the left, two action buttons on the right. Bounded top and bottom by 1px Hairline. The Status definition carries a pulsing accent dot when the project is live; the dot animation respects `prefers-reduced-motion`.
3. **Showcase.** A two-column grid on `≥ lg`. The left column is a sticky stage (`position: sticky; top: 92px`) containing a `1.86:1` aspect-ratio frame with all scene screenshots stacked at the same coordinates, only the active one at opacity 1. Below the frame, a row of pip pills (one per scene) acts as a scene switcher; clicking a pip calls `setActiveIdx(idx)` and `scrollIntoView({ block: 'center' })`. The right column scrolls through scene blocks; an IntersectionObserver with `rootMargin: '-40% 0px -40% 0px'` flips the active index as each scene crosses the viewport center band. On `< lg` the sticky stage is hidden; each scene renders an inline figure instead.
4. **Feature index.** A short typographic grid listing core product areas, no icons, no cards, no hairlines per item. Lede "Core product areas, end to end." then a 4-column grid on `≥ md` (2-column on tablet, 1-column on mobile).
5. **Stack strip.** A single line. Label "STACK" in Quiet Slate, then the tech list as a plain comma-separated sentence in Chart Ink. No pill grid.

### Sticky Stage and Scenes

- **Stage frame.** `aspect-ratio: 1.86 / 1`, Specimen White background, Hairline border, `var(--radius-lg)` corners, a soft accent-tinted halo at two opposite corners via `::before`, shadow-sm + a 50px ambient drop.
- **Stage images.** All five scene screenshots are positioned absolutely in the same frame. The active one has `opacity: 1` and `transform: scale(1)`; inactives have `opacity: 0` and `transform: scale(1.012)`. Transition: `opacity 0.5s ease, transform 0.7s ease`. Under reduced motion this collapses to a 0.15s linear opacity fade with no transform.
- **Pip pills.** Specimen White at rest with a Hairline border and Quiet Slate text. On hover: Chart Ink border and Chart Ink text plus a 1px translateY lift. When active: accent-tinted background, accent border, and accent text via `color-mix`. Buttons carry `aria-current` for the active scene.
- **Stage label.** A small badge in the bottom-left of the frame names the active scene. It updates with the active index.
- **Scenes.** Each scene is at least 68vh tall on desktop (3rem padding) so the IntersectionObserver activation band has enough runway to land on exactly one scene at a time. Inactive scenes drop to `opacity: 0.32`; active jumps to 1 via a 0.45s ease transition. On `< lg`, all scenes stay at opacity 1 since the visual cue is absent.

#### Secondary case study (RoleFit AI), five vertical regions:

1. **Intro.** Same layout pattern as CareFlow but smaller. Name at `clamp(2rem, 4.4vw, 3.25rem)`, tagline at `clamp(1rem, 1.6vw, 1.2rem)`. Polish Violet accent.
2. **Meta strip + actions.** Same three-term `<dl>` (Year / Role / Status). Status reads "Source available" in Chart Ink (no pulsing dot, since there is no live demo). Only one action button: "View source" in Polish Violet, full-width on mobile.
3. **Notes.** Three text notes in a 3-column grid at `≥ md` (1-column below). Each note has a 2px Polish Violet top border, a Subtitle, and a body paragraph. The top border is the per-note brand commitment beat.
4. **Proof screenshot.** One real sanitized pipeline screenshot from the RoleFit AI repo, framed as a quiet proof image below the notes. No carousel, no overlays, no invented UI.
5. **Stack strip.** Identical to CareFlow's: "STACK" label + tech as a plain comma sentence.

The secondary case study deliberately has no `.cs-showcase`, no `.cs-areas` feature index, and no live demo button. It says less because it has less to honestly show. The contrast in treatment between the two case studies is itself the design signal: the candidate knows when to commit and when to restrain.

### Cards (skills, contact, about)

- **Corner Style:** `var(--radius)` = 10px.
- **Background:** Specimen White over the Trace Paper section background.
- **Shadow Strategy:** shadow-sm at rest. These are passive cards, not interactive.
- **Border:** none. Shadow + background contrast carries separation.

### Navigation

- **Style:** transparent over hero, transitioning via `--nav-progress` to a frosted Specimen-White-tinted bar with backdrop-filter blur when scrolled.
- **Typography:** brand name 800, nav links 700, all in Chart Ink.
- **States:** active link hover is Operating Teal; resume CTA is a Specimen-White-tinted button with Hard Edge border.

## 6. Do's and Don'ts

### Do:
- **Do** lead the primary case study with real product visuals and real product copy from the live demo.
- **Do** keep one accent per case study, scoped to its `<article>` via `--project-accent`. Operating Teal for CareFlow; Polish Violet for RoleFit AI. No accent rotation between scenes, no accent bleeding between case studies.
- **Do** keep the secondary case study deliberately quieter: three notes, one real screenshot, no interactive showcase, no live demo CTA, smaller heading scale. Restraint is the right move when there is no public live demo.
- **Do** use `color-mix(in oklch, var(--project-accent) X%, ...)` for status pill, pip pill, and stage halo. The recipe scales to any future project accent.
- **Do** keep neutrals tinted toward teal. Drafting Paper (`#f5f9fc`) is the right base; never `#fff` or `#000`.
- **Do** use ≥1.25 ratios between Headline, Title, Subtitle, Body, Label. Flat scales read as uncommitted.
- **Do** cap body line length at 60ch. Wider lines lose recruiters fast.
- **Do** ration eyebrows: maximum 1 per 3 sections across the whole page. The case study itself carries zero eyebrows; the H2 project name anchors the section.
- **Do** respect `prefers-reduced-motion` for hero animation, stage-image crossfades, and smooth-scroll on pip click (degrade to instant).
- **Do** size project screenshots so they render crisply inside the sticky stage and proof frame; never stretch them across the full container without constraints.

### Don't:
- **Don't** ever use the em-dash character (`,` or `:` is the replacement) anywhere user-visible: headlines, taglines, blurbs, eyebrows, status pills, button labels, captions, alt text. Also no en-dash as a separator. The em-dash is the single most-violated AI tell.
- **Don't** use section-numbering eyebrows. `01 / Scheduling`, `001, Capabilities`, `04, Security` are banned. The note's Subtitle is enough.
- **Don't** stamp giant folio numerals (`01`, `02`) as a section anchor. Use the project name as the anchor.
- **Don't** overlay pills or labels on top of an image (`Plate, 02`, `Field notes`). Caption goes below, or the image speaks alone.
- **Don't** spend more than 1 middle-dot per line in a metadata strip. Reach for line breaks, commas, or columns first.
- **Don't** use the AI-slop SaaS template: purple gradients, four-card icon grids, hero-metric blocks, gradient text, glass cards, Inter on white. Visitor must not be able to say "AI made that" without doubt.
- **Don't** drift into the editorial-magazine reflex: italic Cormorant or Recoleta or Fraunces, ruled columns, lowercase tracked metadata, drop caps. Currently saturated; wrong register.
- **Don't** add a second typeface family. Manrope alone, weight contrast does the work.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent. Side-stripe borders are an absolute ban.
- **Don't** use `background-clip: text` with a gradient anywhere. Text is one solid color.
- **Don't** use decorative status dots on every nav link, list row, or badge. Acceptable only when conveying real semantic state (the live status pill, the active stepper pip), one per page section.
- **Don't** invent metrics or outcomes in project copy. If it is not in the live demo, it is not in the case study.
- **Don't** apply bounce or elastic easings. Ease-out exponential curves only.
- **Don't** repeat identical card grids (four cards, same size, icon + heading + body). If a layout starts looking like a SaaS feature row, restructure.
- **Don't** add `window.addEventListener("scroll", ...)` to drive the sticky-scroll active index. Use IntersectionObserver instead. The click handler on each pip pill provides a direct, scroll-independent path to switch scenes.
- **Don't** stretch source screenshots beyond the stage or proof frame constraints.
