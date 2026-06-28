import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useInView, useMediaQuery, useReducedMotion, WIDE_QUERY } from "../hooks/useMotion";
import { GITHUB, LINKEDIN, NAME } from "../constants/app";
import { PROJECTS_DATA } from "../constants/projects";
import careflowSchedule from "../assets/careflow-schedule.png";
import careflowPatientHub from "../assets/careflow-patient-hub.png";
import careflowRefills from "../assets/careflow-refills.png";
import careflowSecurity from "../assets/careflow-security.png";
import rolefitWorkspace from "../assets/rolefit-workspace.png";
import careflowFavicon from "../assets/careflow-favicon.svg";
import rolefitFavicon from "../assets/rolefit-favicon.svg";

const CAREFLOW = PROJECTS_DATA.find((p) => p.id === "careflow");
const ROLEFIT = PROJECTS_DATA.find((p) => p.id === "role-fit-ai");

const CAREFLOW_SCENES = [
  {
    id: "schedule",
    label: "Schedule",
    body:
      "Day calendar with rooms, providers, visit types, operating hours, and closed-slot blocks. Status chips and heatmap density stay compact enough for real queue work.",
    src: careflowSchedule,
    alt: "CareFlow schedule view with rooms, providers, and visit blocks on a day calendar",
  },
  {
    id: "patient-hub",
    label: "Patient hub",
    body:
      "Smart search opens to demographics, insurance, care team, and pharmacy preferences. SSN stays masked by default and full reveal is audited.",
    src: careflowPatientHub,
    alt: "CareFlow patient hub showing demographics, insurance, and a masked SSN field",
  },
  {
    id: "refills",
    label: "Refills",
    body:
      "Patient-initiated refill requests flow into a shared clinician inbox with source, status, prescriber, pharmacy, and approve or deny actions in one workspace.",
    src: careflowRefills,
    alt: "CareFlow refill inbox with patient, pharmacy, prescriber, status, and approve or deny actions",
  },
  {
    id: "permissions",
    label: "Permissions",
    body:
      "Org and facility admin covers staff, roles, payers, pharmacies, and fee schedules. The permission matrix flags audited actions and guards the last-admin path.",
    src: careflowSecurity,
    alt: "Facility-scoped role and permission matrix with audited actions flagged per row",
  },
];

// The three desktop apps shown in the dock (and targeted by the right-click menu).
const DOCK_APPS = [
  { id: "about", label: "About", accent: "linear-gradient(140deg, #189a8c 0%, #0f766e 50%, #7a5fc0 100%)", onText: "#ffffff", glyph: "XL" },
  { id: "careflow", label: "CareFlow", accent: "#2a3847", onText: "#ffffff", iconSrc: careflowFavicon },
  { id: "rolefit", label: "RoleFit AI", accent: "#eef2ef", onText: "#23664f", iconSrc: rolefitFavicon },
];

// External links open a real URL; the Contact tile (no href) just scrolls to
// the Contacts section in-page, without writing a hash to the URL.
const DOCK_LINKS = [
  { id: "github", label: "GitHub", href: GITHUB, external: true, accent: "#181717", icon: <FaGithub aria-hidden="true" /> },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN, external: true, accent: "#0a66c2", icon: <FaLinkedin aria-hidden="true" /> },
  { id: "contact", label: "Contact", target: "contacts", accent: "#0f766e", icon: <Mail size={20} aria-hidden="true" /> },
];

const AUTOPLAY_MS = 5200;
// Smallest each window may be dragged/resized to, so content never gets crushed.
const MIN_SIZE = { about: { w: 300, h: 300 }, careflow: { w: 400, h: 340 }, rolefit: { w: 320, h: 320 } };

// About + Skills, merged into one "About This Mac"-style window. Profile facts
// render as key/value rows; the former Skills groups render as tag rows. All
// values mirror the former About/Skills copy.
const ABOUT_PROFILE = [
  { label: "Role", value: "Full-time SWE" },
  { label: "Based in", value: "New York, open to relocate" },
  { label: "Education", value: "Hunter College, BA CS" },
  { label: "Focus", value: "Healthcare workflows" },
];
const ABOUT_STACK = [
  { label: "Frontend", items: ["React", "TypeScript", "Vite"] },
  { label: "Backend", items: ["Django", "Python", "Node.js"] },
  { label: "Data & tooling", items: ["PostgreSQL", "Git", "Docker", "Vercel"] },
  { label: "AI / LLM", items: ["Claude Code", "Codex", "Antigravity"] },
];
// Bottom strip the floating dock occupies; default and maximized windows stay
// above it (but a window can still be dragged down into it).
const DOCK_RESERVE = 106;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function formatClock() {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes();
  const suffix = h < 12 ? "AM" : "PM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${suffix}`;
}

function useClock() {
  const [time, setTime] = useState(formatClock);
  useEffect(() => {
    const id = setInterval(() => setTime(formatClock()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Initial window geometry, derived from the measured desktop size so the two
// windows open scattered but in bounds.
function defaultLayout(w, h) {
  const pad = 28;
  const gap = 22;
  const eh = h - DOCK_RESERVE; // usable height above the floating dock
  const colH = eh - pad * 2;
  const aboutW = clamp(Math.round(w * 0.3), 300, 360);
  const rightX = pad + aboutW + gap;
  const rightW = Math.max(420, w - rightX - pad);
  const cfH = clamp(Math.round((colH - gap) * 0.56), 300, 480);
  const rfH = Math.max(220, colH - gap - cfH);
  // Apps start CLOSED by default (open them from the dock); on mobile the
  // collapse media query forces them visible as stacked cards regardless.
  const base = { min: false, closed: true, max: false, prev: null };
  // About fills the left column; CareFlow and RoleFit stack in the right column.
  return {
    about: { ...base, x: pad, y: pad, w: aboutW, h: colH },
    careflow: { ...base, x: rightX, y: pad, w: rightW, h: cfH },
    rolefit: { ...base, x: rightX, y: pad + cfH + gap, w: rightW, h: rfH },
  };
}

// A compact link button that lives in a window's title bar.
function WinAction({ href, solid, icon, ariaLabel, children }) {
  const cls = `pj-win-action${solid ? " pj-win-action--solid" : ""}${icon ? " pj-win-action--icon" : ""}`;
  return (
    <a className={cls} href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
      {children}
    </a>
  );
}

const CAREFLOW_ACTIONS = (
  <>
    <WinAction href={CAREFLOW.live} solid>
      Live demo <ArrowUpRight size={13} aria-hidden="true" />
    </WinAction>
    <WinAction href={CAREFLOW.portal}>Portal</WinAction>
    <WinAction href={CAREFLOW.github} icon ariaLabel="Source on GitHub">
      <FaGithub aria-hidden="true" />
    </WinAction>
  </>
);

const ROLEFIT_ACTIONS = (
  <WinAction href={ROLEFIT.github} icon ariaLabel="Source on GitHub">
    <FaGithub aria-hidden="true" />
  </WinAction>
);

// CareFlow.app: a single auto-cycling screen with a live caption. The screens
// advance on their own (pausing on hover) and the status line narrates each.
function CareFlowApp({ reduced, running }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [leavingIdx, setLeavingIdx] = useState(-1);
  // Paused when the pointer is over the screenshot OR keyboard focus is inside
  // the component, so keyboard users can read a slide without it advancing.
  const [paused, setPaused] = useState(false);
  const prevIdxRef = useRef(0);
  const screensRef = useRef(null);
  const elapsedRef = useRef(0);
  const segStartRef = useRef(0);
  const scene = CAREFLOW_SCENES[activeIdx];
  const count = CAREFLOW_SCENES.length;

  useEffect(() => {
    const prev = prevIdxRef.current;
    if (prev === activeIdx) return;
    screensRef.current?.style.setProperty("--enter-dir", String(activeIdx > prev ? 1 : -1));
    setLeavingIdx(prev);
    prevIdxRef.current = activeIdx;
    elapsedRef.current = 0;
  }, [activeIdx]);

  // Auto-advance the slideshow. Pausing (hover or focus) freezes the timer (and
  // the progress bar) while keeping the time already elapsed, so resuming
  // continues the current slide rather than restarting it.
  useEffect(() => {
    if (reduced || paused || !running) return undefined;
    segStartRef.current = Date.now();
    let timer = setTimeout(function tick() {
      elapsedRef.current = 0;
      segStartRef.current = Date.now();
      setActiveIdx((i) => (i + 1) % count);
      timer = setTimeout(tick, AUTOPLAY_MS);
    }, Math.max(0, AUTOPLAY_MS - elapsedRef.current));
    return () => {
      clearTimeout(timer);
      elapsedRef.current = Math.min(AUTOPLAY_MS, elapsedRef.current + (Date.now() - segStartRef.current));
    };
  }, [reduced, paused, running, count]);

  const showProgress = !reduced && running;

  return (
    <>
      <div
        className="pj-screens"
        ref={screensRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {CAREFLOW_SCENES.map((s, i) => (
          <img
            key={s.id}
            src={s.src}
            alt={s.alt}
            loading="lazy"
            aria-hidden={i !== activeIdx}
            className={i === activeIdx ? "pj-screen is-active" : i === leavingIdx ? "pj-screen is-prev" : "pj-screen"}
          />
        ))}
        {showProgress && (
          <div className="pj-progress" aria-hidden="true">
            <span
              key={activeIdx}
              className={paused ? "pj-progress-fill is-paused" : "pj-progress-fill"}
              style={{ "--demo-ms": `${AUTOPLAY_MS}ms` }}
            />
          </div>
        )}
      </div>

      <div className="pj-app-status">
        <span className="pj-app-path">careflow.xinyiklin.com/{scene.id}</span>
        {/* Caption is NOT a live region: autoplay would otherwise re-announce it
            every few seconds. Screen-reader users navigate with the tab list
            below, whose labels name each screen. */}
        <p className="pj-app-desc">{scene.body}</p>
        {/* Keyboard/touch/reduced-motion controls: a real tablist so every screen
            is reachable without relying on the mouse-only hover pause. Focusing a
            tab pauses autoplay via the wrapper's focus handlers. */}
        <div
          className="pj-tabs"
          role="tablist"
          aria-label="CareFlow screens"
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {CAREFLOW_SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={s.label}
              className={i === activeIdx ? "pj-tab is-active" : "pj-tab"}
              onClick={() => setActiveIdx(i)}
            >
              <span aria-hidden="true">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function RoleFitApp() {
  return (
    <>
      <div className="pj-screens pj-screens--static">
        <img
          src={rolefitWorkspace}
          alt="RoleFit AI resume workspace showing the structured editor, section tailoring, and the export toolbar"
          loading="lazy"
        />
      </div>
      <div className="pj-app-status">
        <p className="pj-app-desc">
          A local-first resume tailor: it scores fit against a posting, suggests section-scoped edits you accept or
          discard, and refuses to invent experience the resume cannot back.
        </p>
      </div>
    </>
  );
}

// About.app: a macOS "About This Mac"-style system readout. One bold moment (the
// gradient monogram + name); identity, then an aligned label -> value spec sheet.
function AboutApp() {
  return (
    <div className="pj-about">
      <header className="pj-about-head">
        <span className="pj-about-avatar" aria-hidden="true">
          XL
        </span>
        <div className="pj-about-id">
          <p className="pj-about-name">{NAME}</p>
          <p className="pj-about-role">Full-stack engineer · Healthcare software</p>
          <p className="pj-about-status">
            <span className="pj-about-status-dot" aria-hidden="true" />
            Open to work
          </p>
        </div>
      </header>

      <p className="pj-about-bio">
        I build full-stack software for healthcare workflows, where the interface, API, and data model
        fit together. Recent focus: <strong>CareFlow</strong>, a clinic workflow platform.
      </p>

      <dl className="pj-about-readout">
        {ABOUT_PROFILE.map((s) => (
          <div className="pj-about-row" key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>

      <dl className="pj-about-readout pj-about-readout--stack">
        {ABOUT_STACK.map((g) => (
          <div className="pj-about-row" key={g.label}>
            <dt>{g.label}</dt>
            <dd>{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <div className="pj-about-actions">
        <button
          type="button"
          className="pj-about-btn pj-about-btn--solid"
          onClick={() => window.dispatchEvent(new Event("open-resume"))}
        >
          Resume
        </button>
        <button
          type="button"
          className="pj-about-btn"
          onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get in touch
        </button>
      </div>
    </div>
  );
}

// A real OS window: drag by the title bar, double-click it to zoom, resize from
// the corner, and the three lights close / minimize / zoom. Geometry is owned by
// the parent so the window manager can stack, clamp, and restore.
function AppWindow({
  className,
  accent,
  accentSoft,
  title,
  subtitle,
  actions,
  floating,
  geom,
  z,
  active,
  state,
  onFocus,
  onClose,
  onMinimize,
  onZoom,
  onDragStart,
  onResizeStart,
  children,
}) {
  const flags = `${active ? " is-active" : ""}${state.min ? " is-min" : ""}${state.closed ? " is-closed" : ""}${
    state.max ? " is-max" : ""
  }${floating ? " pj-win--floating" : ""}`;
  const style = {
    "--accent": accent,
    "--accent-soft": accentSoft,
    zIndex: z,
    ...(floating && geom ? { left: geom.x, top: geom.y, width: geom.w, height: geom.h } : {}),
  };
  const stop = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };
  const onBarDoubleClick = (e) => {
    if (e.target.closest("button, a")) return;
    onZoom();
  };
  return (
    <section
      className={`pj-win ${className}${flags}`}
      style={style}
      onPointerDown={onFocus}
      aria-label={`${title} window`}
    >
      <div className="pj-win-bar" onPointerDown={onDragStart} onDoubleClick={onBarDoubleClick}>
        {/* Below the float breakpoint the lights are purely decorative (CSS
            disables pointer-events), so take them out of the tab order and the
            accessibility tree instead of leaving focusable no-op buttons. */}
        <span className="pj-traffic" {...(floating ? {} : { "aria-hidden": true })}>
          <button type="button" className="pj-light pj-light--close" aria-label={`Close ${title}`} onClick={stop(onClose)} disabled={!floating} tabIndex={floating ? undefined : -1} />
          <button type="button" className="pj-light pj-light--min" aria-label={`Minimize ${title}`} onClick={stop(onMinimize)} disabled={!floating} tabIndex={floating ? undefined : -1} />
          <button type="button" className="pj-light pj-light--zoom" aria-label={`Zoom ${title}`} onClick={stop(onZoom)} disabled={!floating} tabIndex={floating ? undefined : -1} />
        </span>
        <span className="pj-win-title">{title}</span>
        {subtitle && <span className="pj-win-sub">{subtitle}</span>}
        <span className="pj-win-bar-right">{actions}</span>
      </div>
      {children}
      {floating && (
        <>
          <span className="pj-rz pj-rz-n" aria-hidden="true" onPointerDown={onResizeStart("n")} />
          <span className="pj-rz pj-rz-s" aria-hidden="true" onPointerDown={onResizeStart("s")} />
          <span className="pj-rz pj-rz-e" aria-hidden="true" onPointerDown={onResizeStart("e")} />
          <span className="pj-rz pj-rz-w" aria-hidden="true" onPointerDown={onResizeStart("w")} />
          <span className="pj-rz pj-rz-ne" aria-hidden="true" onPointerDown={onResizeStart("ne")} />
          <span className="pj-rz pj-rz-nw" aria-hidden="true" onPointerDown={onResizeStart("nw")} />
          <span className="pj-rz pj-rz-se" aria-hidden="true" onPointerDown={onResizeStart("se")} />
          <span className="pj-rz pj-rz-sw" aria-hidden="true" onPointerDown={onResizeStart("sw")} />
        </>
      )}
    </section>
  );
}

function Dock({ wins, activeId, onActivate, onContextMenu }) {
  return (
    <div className="pj-dock" role="group" aria-label="Project dock">
      {DOCK_APPS.map((app) => {
        const w = wins?.[app.id];
        const running = w ? !w.closed : true;
        const hidden = w ? w.closed || w.min : false;
        return (
          <button
            key={app.id}
            type="button"
            className={`pj-dock-item pj-dock-app${activeId === app.id && !hidden ? " is-active" : ""}`}
            aria-label={`${hidden ? "Open" : "Focus"} ${app.label}`}
            onClick={() => onActivate(app.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              onContextMenu(app.id, e.clientX, e.clientY);
            }}
          >
            <span className="pj-dock-tip">{app.label}</span>
            <span className="pj-dock-icon" style={{ background: app.accent, color: app.onText }}>
              {app.iconSrc ? (
                <img className="pj-dock-img" src={app.iconSrc} alt="" aria-hidden="true" />
              ) : (
                app.glyph
              )}
            </span>
            <span className={running ? "pj-dock-run is-open" : "pj-dock-run"} aria-hidden="true" />
          </button>
        );
      })}
      <span className="pj-dock-sep" aria-hidden="true" />
      {DOCK_LINKS.map((link) => {
        const inner = (
          <>
            <span className="pj-dock-tip">{link.label}</span>
            <span className="pj-dock-icon pj-dock-icon--link" style={{ background: link.accent }}>
              {link.icon}
            </span>
            <span className="pj-dock-run" aria-hidden="true" />
          </>
        );
        return link.external ? (
          <a key={link.id} className="pj-dock-item pj-dock-link" href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
            {inner}
          </a>
        ) : (
          <button
            key={link.id}
            type="button"
            className="pj-dock-item pj-dock-link"
            aria-label={link.label}
            onClick={() => document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" })}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}

// Right-click menu for a dock app: actions mirror the window's traffic lights,
// shaped by its current state (closed / minimized / open).
function appMenuItems(state, actions) {
  const g = state ?? {};
  if (g.closed) return [{ label: "Open", run: actions.open }];
  if (g.min) {
    return [
      { label: "Show", run: actions.open },
      { sep: true },
      { label: "Close", run: actions.close, danger: true },
    ];
  }
  return [
    { label: g.max ? "Restore" : "Zoom", run: actions.zoom },
    { label: "Minimize", run: actions.minimize },
    { sep: true },
    { label: "Close", run: actions.close, danger: true },
  ];
}

// Floating menu portaled to <body> so the desktop's camera scale doesn't warp
// it. Anchored bottom-left at the cursor (grows upward, away from the dock) and
// flipped left near the right edge. Closes on Escape, outside-click, or blur.
function DockContextMenu({ menu, title, items, onClose }) {
  const ref = useRef(null);
  const menuItems = () => Array.from(ref.current?.querySelectorAll('[role="menuitem"]') ?? []);
  useEffect(() => {
    // Focus the first item (not the wrapper) so the menu opens ready for keyboard
    // use, per the role="menu" contract.
    menuItems()[0]?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && onClose();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("blur", onClose);
    window.addEventListener("resize", onClose);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("blur", onClose);
      window.removeEventListener("resize", onClose);
    };
  }, [onClose]);

  // Arrow / Home / End move focus between items (wrapping), the expected menu
  // keyboard model.
  const onMenuKey = (e) => {
    const items = menuItems();
    if (!items.length) return;
    const cur = items.indexOf(document.activeElement);
    let nextIdx = null;
    if (e.key === "ArrowDown") nextIdx = (cur + 1) % items.length;
    else if (e.key === "ArrowUp") nextIdx = (cur - 1 + items.length) % items.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = items.length - 1;
    if (nextIdx !== null) {
      e.preventDefault();
      items[nextIdx].focus();
    }
  };

  const x = `translateX(${menu.flipX ? "-100%" : "0"})`;
  return createPortal(
    <div
      ref={ref}
      className="pj-ctx"
      role="menu"
      aria-label={`${title} actions`}
      tabIndex={-1}
      onKeyDown={onMenuKey}
      style={{ left: menu.x, top: menu.y, transform: `${x} translateY(calc(-100% - 8px))` }}
    >
      <p className="pj-ctx-title">{title}</p>
      {items.map((it, i) =>
        it.sep ? (
          <div key={`sep-${i}`} className="pj-ctx-sep" role="separator" />
        ) : (
          <button
            key={it.label}
            type="button"
            role="menuitem"
            className={`pj-ctx-item${it.danger ? " pj-ctx-item--danger" : ""}`}
            onClick={() => {
              it.run();
              onClose();
            }}
          >
            {it.label}
          </button>
        )
      )}
    </div>,
    document.body
  );
}

function Projects({ sectionId = "projects", cinematic = false }) {
  const reduced = useReducedMotion();
  // Reduced-motion users always get the flat stacked layout (never the floating
  // window manager), even on wide viewports — otherwise the apps render maximized
  // /closed and hidden with no visible project content. Pairs with the CSS below
  // that applies the stacked block under `prefers-reduced-motion`.
  const floating = useMediaQuery(WIDE_QUERY) && !reduced;
  const deskRef = useRef(null);
  const [osRef, osIn] = useInView();
  const clock = useClock();

  const [order, setOrder] = useState(["about", "rolefit", "careflow"]);
  const [wins, setWins] = useState(null);
  const [menu, setMenu] = useState(null); // dock right-click menu: { id, x, y, flipX } | null
  const deskSizeRef = useRef({ w: 0, h: 0 });
  const activeId = order[order.length - 1];

  const openMenu = (id, x, y) => setMenu({ id, x, y, flipX: x > window.innerWidth - 200 });
  const closeMenu = useCallback(() => setMenu(null), []);

  // Height reserved at the bottom for the floating dock, measured from its real
  // size (so maximize/open-fullscreen geometry tracks the actual dock). Shared by
  // measure(), zoomWin(), and dockActivate() so the formula can't drift.
  const dockReserve = useCallback(() => {
    const dock = deskRef.current?.parentElement?.querySelector(".pj-dock");
    return dock ? dock.offsetHeight + parseFloat(getComputedStyle(dock).bottom) + 2 : DOCK_RESERVE;
  }, []);

  useLayoutEffect(() => {
    if (!floating) return undefined;
    const el = deskRef.current;
    if (!el) return undefined;
    const measure = () => {
      // clientWidth/Height are layout sizes, unaffected by the section's reveal
      // scale transform, so a maximized window fills the desktop exactly.
      const w = el.clientWidth;
      const h = el.clientHeight;
      deskSizeRef.current = { w, h };
      const dh = h - dockReserve();
      setWins((prev) => {
        if (!prev) return defaultLayout(w, h);
        // Keep maximized windows filling the desktop after a viewport resize /
        // orientation change, so the "open fullscreen" behavior survives — even
        // for a maximized window the user has dragged off the corner (it snaps
        // back to fill). Non-maximized windows keep their position and size.
        let changed = false;
        const next = {};
        for (const id of Object.keys(prev)) {
          const g = prev[id];
          if (g.max && (g.x !== 0 || g.y !== 0 || g.w !== w || g.h !== dh)) {
            next[id] = { ...g, x: 0, y: 0, w, h: dh };
            changed = true;
          } else {
            next[id] = g;
          }
        }
        return changed ? next : prev;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [floating, dockReserve]);

  const focusWin = (id) => setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((x) => x !== id), id]));
  // Closing/minimizing the front window sends it to the back of the order so the
  // next window becomes active (focus transfers); reopening focuses it again.
  const sendToBack = (id) => setOrder((o) => (o[0] === id ? o : [id, ...o.filter((x) => x !== id)]));
  const patch = (id, next) => setWins((w) => (w ? { ...w, [id]: { ...w[id], ...next } } : w));
  const closeWin = (id) => { patch(id, { closed: true }); sendToBack(id); };
  const minimizeWin = (id) => { patch(id, { min: true }); sendToBack(id); };
  const zoomWin = (id) => {
    // Maximize to ~2px above the floating dock, measured from its real size.
    const reserve = dockReserve();
    setWins((w) => {
      if (!w) return w;
      const g = w[id];
      const dw = deskSizeRef.current.w;
      const dh = deskSizeRef.current.h - reserve;
      if (g.max) {
        // A full-size window dragged off the corner snaps back to the full-size
        // position; one already parked there restores to its windowed size.
        if (g.x !== 0 || g.y !== 0) return { ...w, [id]: { ...g, x: 0, y: 0, w: dw, h: dh } };
        return { ...w, [id]: { ...g, max: false, ...(g.prev || {}), prev: null } };
      }
      return { ...w, [id]: { ...g, max: true, prev: { x: g.x, y: g.y, w: g.w, h: g.h }, x: 0, y: 0, w: dw, h: dh } };
    });
  };
  const dockActivate = (id) => {
    // Apps open FULLSCREEN (maximized) by default. Restoring from minimize keeps
    // the prior size; clicking an already-open app just focuses it.
    const reserve = dockReserve();
    setWins((w) => {
      if (!w) return w;
      const g = w[id];
      if (g.closed) {
        const dw = deskSizeRef.current.w;
        const dh = deskSizeRef.current.h - reserve;
        return {
          ...w,
          [id]: { ...g, closed: false, min: false, max: true, prev: { x: g.x, y: g.y, w: g.w, h: g.h }, x: 0, y: 0, w: dw, h: dh },
        };
      }
      if (g.min) return { ...w, [id]: { ...g, min: false } };
      return w;
    });
    focusWin(id);
  };

  const beginDrag = (id) => (event) => {
    if (!floating || event.target.closest("button, a")) return;
    focusWin(id);
    const el = deskRef.current;
    // Layout size (transform-independent) for bounds; getBoundingClientRect is
    // scaled by the cinematic camera, so derive the live scale to convert the
    // viewport-space pointer delta back into layout space.
    const layoutW = el.clientWidth;
    const layoutH = el.clientHeight;
    const scale = el.getBoundingClientRect().width / layoutW || 1;
    const g = wins[id];
    const startX = event.clientX;
    const startY = event.clientY;
    const baseX = g.x;
    const baseY = g.y;
    document.body.classList.add("pj-grabbing");
    const move = (ev) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      // Any window — full-size or not — can be dragged partly past the desktop
      // edge, always keeping a grabbable strip on-screen (>=90px wide, plus its
      // title bar) so it can be pulled back.
      const next = {
        x: clamp(baseX + dx, 90 - g.w, layoutW - 90),
        y: clamp(baseY + dy, 0, Math.max(0, layoutH - 44)),
      };
      patch(id, next);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.classList.remove("pj-grabbing");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const beginResize = (id, dir) => (event) => {
    if (!floating) return;
    event.stopPropagation();
    focusWin(id);
    const g = wins[id];
    const min = MIN_SIZE[id];
    const el = deskRef.current;
    const deskW = deskSizeRef.current.w;
    const deskH = deskSizeRef.current.h;
    // Convert viewport-space pointer movement back into layout space when the
    // cinematic camera has the desktop scaled.
    const scale = el.getBoundingClientRect().width / el.clientWidth || 1;
    const startX = event.clientX;
    const startY = event.clientY;
    const base = { x: g.x, y: g.y, w: g.w, h: g.h };
    const east = dir.includes("e");
    const west = dir.includes("w");
    const north = dir.includes("n");
    const south = dir.includes("s");
    document.body.classList.add("pj-grabbing");
    const move = (ev) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      let { x, y, w, h } = base;
      if (east) w = clamp(base.w + dx, min.w, deskW - base.x);
      if (west) {
        x = clamp(base.x + dx, 0, base.x + base.w - min.w);
        w = base.x + base.w - x;
      }
      if (south) h = clamp(base.h + dy, min.h, deskH - base.y);
      if (north) {
        y = clamp(base.y + dy, 0, base.y + base.h - min.h);
        h = base.y + base.h - y;
      }
      patch(id, { max: false, x, y, w, h });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.classList.remove("pj-grabbing");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const windowProps = (id) => ({
    floating,
    geom: floating ? wins?.[id] : null,
    z: order.indexOf(id) + 10,
    active: activeId === id,
    state: wins?.[id] ?? { min: false, closed: false, max: false },
    onFocus: () => focusWin(id),
    onClose: () => closeWin(id),
    onMinimize: () => minimizeWin(id),
    onZoom: () => zoomWin(id),
    onDragStart: beginDrag(id),
    onResizeStart: (dir) => beginResize(id, dir),
  });

  return (
    <section
      id={sectionId ?? undefined}
      className={cinematic ? "projects-section is-cinematic" : "projects-section"}
    >
      <div className="pj-grain" aria-hidden="true" />
      <div className="container pj-inner">
        <h2 className="pj-sr-only">Selected work</h2>

        <div ref={osRef} className={osIn ? "pj-os is-revealed" : "pj-os"}>
          <div className="pj-menubar">
            <div className="pj-menubar-left">
              <img className="pj-menubar-logo" src="/favicon.svg" alt="" aria-hidden="true" width="16" height="16" />
              <span className="pj-menubar-brand">Xinyi Lin</span>
              <button
                type="button"
                className="pj-menubar-btn"
                onClick={() => window.dispatchEvent(new Event("open-resume"))}
              >
                Resume
              </button>
            </div>
            <div className="pj-menubar-right">
              <span className="pj-menubar-status">
                <span className="pj-menubar-status-dot" aria-hidden="true" />
                Open to work
              </span>
              <span className="pj-menubar-clock" aria-hidden="true">{clock}</span>
            </div>
          </div>

          <div ref={deskRef} className={floating ? "pj-desktop is-floating" : "pj-desktop"}>
            <AppWindow
              className="pj-win--about"
              accent="#475569"
              accentSoft="rgba(71,85,105,0.14)"
              title="About"
              subtitle={NAME}
              {...windowProps("about")}
            >
              <AboutApp />
            </AppWindow>

            <AppWindow
              className="pj-win--cf"
              accent="#0f766e"
              accentSoft="rgba(15,118,110,0.14)"
              title="CareFlow"
              subtitle="Clinic workspace"
              actions={CAREFLOW_ACTIONS}
              {...windowProps("careflow")}
            >
              <CareFlowApp reduced={reduced} running={osIn && !(wins?.careflow?.min || wins?.careflow?.closed)} />
            </AppWindow>

            <AppWindow
              className="pj-win--rf"
              accent="#7c3aed"
              accentSoft="rgba(124,58,237,0.14)"
              title="RoleFit AI"
              subtitle="Resume workspace"
              actions={ROLEFIT_ACTIONS}
              {...windowProps("rolefit")}
            >
              <RoleFitApp />
            </AppWindow>
          </div>

          <Dock wins={wins} activeId={activeId} onActivate={dockActivate} onContextMenu={openMenu} />
        </div>
      </div>

      {menu && (
        <DockContextMenu
          menu={menu}
          title={DOCK_APPS.find((a) => a.id === menu.id)?.label ?? ""}
          items={appMenuItems(wins?.[menu.id], {
            open: () => dockActivate(menu.id),
            zoom: () => zoomWin(menu.id),
            minimize: () => minimizeWin(menu.id),
            close: () => closeWin(menu.id),
          })}
          onClose={closeMenu}
        />
      )}
    </section>
  );
}

export default Projects;
