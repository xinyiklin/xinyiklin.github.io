# Product

## Register

brand

## Users

Software engineering recruiters, hiring managers, and engineering leads reviewing
full-stack engineer candidates with healthcare-software focus. They land on the
site from a resume link, a referral, or a LinkedIn profile, scan it in 30-90
seconds, and decide whether to read deeper or move on. Typical context: open in
one of many tabs during a screening sprint, on a laptop, sometimes mobile.
A small secondary audience is engineering peers and prospective collaborators.

The job to be done: read enough credible signal about two real builds
(CareFlow as the primary, RoleFit AI as a smaller second) and the person
behind them to decide whether to invite a conversation.

## Product Purpose

Present a primary production-grade engineering build (CareFlow) with
case-study depth, plus a quieter secondary build (RoleFit AI) that signals
breadth without distracting from CareFlow. A busy reviewer should be able to
answer "is this person worth a screen?" within a minute, then go deeper if
interested. Make the engineering decisions visible without demanding the
reader read every line.

The Projects section is a two-tier case study. CareFlow leads as an
interactive sticky-scroll showcase: a single pinned product visual on the
left swaps between five real screens as the reader scrolls five scenes on
the right. RoleFit AI follows below a hairline divider as a compact
secondary case study with three notes, one real product screenshot of the
resume workspace (the app's drafting-desk UI shown with demo starter data),
a Polish Violet accent, a View source CTA, and no live demo CTA. The contrast
in treatment is intentional: CareFlow is the primary proof; RoleFit AI is the
signal that more than one shipped build lives in the catalogue. The
interactive showcase itself is part of the proof: the candidate ships
frontend interactions, not just static pages. Success is qualified inbound
for full-time software engineering roles.

This is a brand surface, not an app. Design IS the product. The visitor's
impression is the deliverable.

## Brand Personality

Practical · Crafted · Confident.

- **Practical**: a working engineer's portfolio, not a marketing campaign. Real
  screenshots, real GitHub links, real product flow. No invented metrics, no
  fictional case studies.
- **Crafted**: attention to detail is visible. Type hierarchy, color
  commitment, motion restraint, micro-copy all suggest the same hand that
  builds clinic-workflow software with care.
- **Confident**: the work speaks for itself. No apology copy, no hedging
  qualifiers ("just a side project"), no asking-for-permission tone. Quiet
  authority over loud salesmanship.

Voice: first-person, concrete, free of marketing fluff. "I build" beats "I am
passionate about building." Specifics beat superlatives.

## Anti-references

- **Generic SaaS landing-page template.** Purple gradients, four-card icon
  grids, hero-metric blocks, gradient text, glass cards, Inter on white. The
  modal AI-generated landing page that flooded the internet by 2026. The
  visitor must not be able to say "AI made that" without doubt.
- **Editorial-magazine reflex.** Display serif italic, ruled columns,
  lowercase tracked metadata. Currently saturated; lands on every
  Notion-adjacent and Stripe-adjacent brand site. Not the right register for
  an engineering portfolio.
- **Brutalist or acid-maximalist art-project aesthetics.** Reads as
  "art student" rather than "hireable engineer with judgment."
- **Crypto/web3 dark-neon hacker palette.** Wrong audience.
- **Decorative animation that has no informational purpose.** Bounce easings,
  parallax for the sake of parallax, scroll-jacking with no payoff.

## AI Tells to Avoid

The visitor must not be able to say "AI made that" without doubt. These are
the specific patterns that flag AI output in 2026. All are forbidden in this
project unless an explicit brand reason overrides them.

- **No em-dashes (`,` or `:` instead).** The em-dash character is the single
  most-violated AI tell in production design tests. Zero em-dashes in any
  user-visible string: headlines, eyebrows, pills, body, quotes, attribution,
  captions, buttons, alt text. Also no en-dash as a separator. Hyphens only
  for compound words and number ranges.
- **No section-numbering eyebrows.** `01 / Scheduling`, `001, Capabilities`,
  `06, how it works` are banned. Eyebrows should name the topic in plain
  language. Better: drop the eyebrow entirely if the section heading is
  clear.
- **Eyebrow restraint.** Maximum 1 small uppercase tracked label per 3
  sections across the whole page. The portfolio has 5 sections (Main, About,
  Skills, Projects, Contacts) so the page may carry at most 2 eyebrows.
  Reusing eyebrows on every chapter or feature block is banned.
- **No decorative status dots.** The colored dot before every list item, nav
  link, or badge is a tell. Acceptable only when conveying real semantic
  state (the live availability flag on the CareFlow status pill, for
  example) and limited to one per page section.
- **No pill-on-image overlays.** No tag overlays painted on top of a
  screenshot ("Plate, 02", "Field notes"). Caption goes below the image, or
  the image speaks alone.
- **The middle-dot (`·`) is rationed.** Maximum 1 per line in any metadata
  strip. The reflex to use it as the default separator for everything is a
  tell.
- **No section-numbering folio numerals.** Giant 01 / 02 / 03 anchored to
  the side of a section reads as templated. Use the project name as the
  anchor, not its index.

## Design Principles

1. **Show, don't tell.** The case study leads with real product visuals (the
   schedule, patient hub, timeline, refill inbox, permission matrix, and
   RoleFit resume-workspace screenshot).
   Copy supports the visual, not the other way around.
2. **Interaction is part of the proof.** The CareFlow case study is a
   sticky-scroll showcase. As the reader scrolls scene text on the right,
   the pinned product visual on the left crossfades to the matching screen.
   Pip pills below the visual allow click-to-jump. The interaction itself
   is evidence the candidate ships frontend work.
3. **Truthful claims only.** Every spec corresponds to something that is
   actually shipped. No fabricated outcomes, no "10x" copy, no inflated tech
   stack lists. If a feature is not in the live demo or the source repo, it
   is not in the write-up. RoleFit AI uses a real screenshot of its resume
   workspace, captured from the live app with demo starter data, not a
   fabricated preview.
4. **One commitment per case study.** CareFlow commits to Operating Teal;
   RoleFit AI commits to Polish Violet. Each case study uses its accent
   end to end (tagline, status, primary CTA, note dividers). Accents do
   not bleed across case studies.
5. **Quiet by default, bold on identity.** Backgrounds and supporting copy
   stay restrained. Identity moments (the project name, the primary CTA,
   the sticky product visual) commit fully to scale and accent.
6. **Density over decoration.** Tight typographic hierarchy and concrete
   copy beat decorative ornament. Every word and pill earns its place.
   Eyebrows are not free; spend them carefully.

## Accessibility & Inclusion

Default target: WCAG 2.1 AA.

- Color contrast verified for body text and interactive elements against the
  light backgrounds. Accent colors used for decoration also pass against
  backgrounds at the sizes they appear.
- All actionable elements are keyboard-reachable and have visible focus
  states. Tab order follows the visual reading order. Pip pills in the
  sticky-scroll case study are real buttons with `aria-current` on the active
  scene; clicking jumps to the matching scene.
- Stage-frame crossfades collapse to a 0.15s linear fade under
  `prefers-reduced-motion`. Smooth-scroll on pip click degrades to instant
  scroll.
- Hash-based navigation (`#projects`, `#about`, etc.) preserves history and
  works with screen-reader skip links.
- Alt text on every project screenshot is specific to what is shown, not a
  generic label. Inactive sticky-stage images carry `aria-hidden="true"` so
  screen readers announce only the visible scene.
