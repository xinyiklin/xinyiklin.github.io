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

The job to be done: read enough credible signal about three real builds
(CareFlow as the primary, RoleFit AI and Typeset as smaller seconds) and the
person behind them to decide whether to invite a conversation.

## Product Purpose

Present a primary production-grade engineering build (CareFlow) with
case-study depth, plus quieter secondary builds (RoleFit AI and Typeset)
that signal breadth without distracting from CareFlow. A busy reviewer should
be able to
answer "is this person worth a screen?" within a minute, then go deeper if
interested. Make the engineering decisions visible without demanding the
reader read every line.

The Projects section is a focused desktop launcher. CareFlow, RoleFit AI, and
Typeset open their real hosted products directly, while each context menu also
offers its source repository. About remains the one local app window. Mobile
and reduced-motion visitors receive the same three destinations as compact
project rows. CareFlow stays the primary proof through its positioning and
resume copy; RoleFit AI and Typeset show breadth without asking a recruiter to
operate duplicate portfolio-only demos. Success is qualified inbound for
full-time software engineering roles.

This is a brand surface, not an app. Design IS the product. The visitor's
impression is the deliverable.

## Brand Personality

Practical · Crafted · Confident.

- **Practical**: a working engineer's portfolio, not a marketing campaign. Real
  GitHub links and real hosted products. No invented metrics or fictional case
  studies.
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
- **No pill-on-media overlays.** No tag overlays painted on top of an app
  surface ("Plate, 02", "Field notes"). Caption goes below, or the interface
  speaks alone.
- **The middle-dot (`·`) is rationed.** Maximum 1 per line in any metadata
  strip. The reflex to use it as the default separator for everything is a
  tell.
- **No section-numbering folio numerals.** Giant 01 / 02 / 03 anchored to
  the side of a section reads as templated. Use the project name as the
  anchor, not its index.

## Design Principles

1. **Show the real work.** The project launchers lead to the hosted CareFlow,
   RoleFit AI, and Typeset products, with source one context-menu action away.
   Portfolio copy supports those products instead of duplicating them.
2. **Interaction has a job.** The cinematic desktop makes the portfolio
   memorable; the dock launches real work, the About window carries identity,
   and mobile or reduced-motion visitors get direct project rows.
3. **Truthful claims only.** Every spec corresponds to something that is
   actually shipped. No fabricated outcomes, no "10x" copy, no inflated tech
   stack lists. If a feature is not in the hosted product or source repo, it is
   not in the write-up.
4. **Identity over duplicate UI.** Product favicons and restrained launcher
   accents distinguish the three destinations without recreating their
   interfaces inside the portfolio.
5. **Quiet by default, bold on identity.** Backgrounds and supporting copy
   stay restrained. Identity moments (the project name, the primary CTA,
   the desktop window and primary CTA) commit fully to scale and accent.
6. **Density over decoration.** Tight typographic hierarchy and concrete
   copy beat decorative ornament. Every word and pill earns its place.
   Eyebrows are not free; spend them carefully.

## Accessibility & Inclusion

Default target: WCAG 2.1 AA.

- Color contrast verified for body text and interactive elements against the
  light backgrounds. Accent colors used for decoration also pass against
  backgrounds at the sizes they appear.
- All actionable elements are keyboard-reachable and have visible focus
  states. Tab order follows the visual reading order. Dock tiles, About window
  actions, project rows, and modal controls are real buttons or links.
- The cinematic desktop is skipped under `prefers-reduced-motion`; reduced
  motion and mobile users receive the flat stacked layout.
- In-page navigation uses real section targets and preserves a predictable
  reading order.
- Decorative favicon images are hidden from assistive tech. Launcher purpose is
  expressed through visible labels and accessible link names.
