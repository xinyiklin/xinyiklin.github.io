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

The Projects section is a focused desktop. Desktop widgets keep the three
projects visible on landing: a large CareFlow widget with its recorded demo and
Live, Clinician, Patient, and Source links, plus smaller RoleFit AI and Typeset
widgets. The dock also launches each hosted product, and its context menu
offers the same links. There are no in-desktop windows; the hero carries
identity with Resume and Get in touch actions. Mobile and reduced-motion
visitors receive the same destinations as compact project rows. CareFlow stays the primary proof through its positioning and
resume copy; RoleFit AI and Typeset show breadth without asking a recruiter to
operate duplicate portfolio-only demos. Success is qualified inbound for
full-time software engineering roles.

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

## Design Principles

1. **Show the real work.** The widgets and launchers lead to the hosted
   CareFlow, RoleFit AI, and Typeset products, with source one click away.
   CareFlow's recorded demo plays in its widget. Portfolio copy supports those
   products instead of duplicating them.
2. **Interaction has a job.** The cinematic desktop makes the portfolio
   memorable; the widgets name the work at a glance, the dock launches it, the
   hero carries identity and the Resume action, and mobile or reduced-motion
   visitors get direct project rows.
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
  states. Tab order follows the visual reading order. Hero actions, dock tiles,
  widget links, project rows, and modal controls are real buttons or links.
- The cinematic desktop is skipped under `prefers-reduced-motion`; reduced
  motion and mobile users receive the flat stacked layout.
- In-page navigation uses real section targets and preserves a predictable
  reading order.
- Decorative favicon images are hidden from assistive tech. Launcher purpose is
  expressed through visible labels and accessible link names.
