import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useInView, useMediaQuery, useReducedMotion, WIDE_QUERY } from "../hooks/useMotion";
import { NAME } from "../constants/app";
import Dock, { DOCK_APPS, DockContextMenu, appMenuItems, launcherMenuItems } from "../components/DesktopDock";

// Products have no in-desktop demo window — they launch from the dock (live site)
// and, on mobile/reduced-motion, render as the link cards below. Subtitles are
// short, factual descriptors drawn from each project's own copy.
const PROJECT_SUB = {
  careflow: "Clinic workflow platform",
  rolefit: "Resume-tailoring workbench",
  typeset: "Resume editor + typesetting engine",
};
const PROJECT_CARDS = DOCK_APPS.filter((a) => a.href).map((a) => ({
  id: a.id,
  title: a.label,
  sub: PROJECT_SUB[a.id],
  live: a.href,
  github: a.github,
  iconSrc: a.iconSrc,
  accent: a.accent,
  onText: a.onText,
}));

// Smallest the About window may be dragged/resized to, so content never gets crushed.
const MIN_SIZE = { about: { w: 300, h: 300 } };

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
  { label: "Data & tooling", items: ["PostgreSQL", "Git", "Docker", "AWS"] },
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

// Initial geometry for the sole in-desktop window (About), derived from the
// measured desktop size so it opens in-bounds above the floating dock.
function defaultLayout(w, h) {
  const pad = 28;
  const colH = h - DOCK_RESERVE - pad * 2; // usable height above the floating dock
  const aboutW = clamp(Math.round(w * 0.34), 320, 400);
  // Desktop starts CLEAN: About is closed and opens from the dock (products
  // launch straight to their live sites). On mobile the collapse media query
  // still forces About visible as a stacked card (wins stays null there).
  return { about: { min: false, closed: true, max: false, prev: null, x: pad, y: pad, w: aboutW, h: colH } };
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

  const [order, setOrder] = useState(["about"]);
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
    if (!floating || event.button !== 0 || event.target.closest("button, a")) return;
    focusWin(id);
    const pid = event.pointerId;
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
      if (ev.pointerId !== pid) return;
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
    const up = (ev) => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      document.body.classList.remove("pj-grabbing");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const beginResize = (id, dir) => (event) => {
    if (!floating || event.button !== 0) return;
    event.stopPropagation();
    focusWin(id);
    const pid = event.pointerId;
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
      if (ev.pointerId !== pid) return;
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
    const up = (ev) => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      document.body.classList.remove("pj-grabbing");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
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

            {/* Products have no window; on mobile/reduced-motion (the stacked
                layout) they render as link cards. On the floating desktop they
                live in the dock, so this is hidden there. */}
            {!floating && (
              <ul className="pj-links" aria-label="Projects">
                {PROJECT_CARDS.map((p) => (
                  <li key={p.id} className="pj-link">
                    <span className="pj-link-icon" style={{ background: p.accent, color: p.onText }}>
                      <img src={p.iconSrc} alt="" aria-hidden="true" />
                    </span>
                    <span className="pj-link-info">
                      <span className="pj-link-title">{p.title}</span>
                      <span className="pj-link-sub">{p.sub}</span>
                    </span>
                    <span className="pj-link-actions">
                      <a className="pj-link-btn pj-link-btn--solid" href={p.live} target="_blank" rel="noreferrer">
                        Live <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                      <a
                        className="pj-link-btn pj-link-btn--icon"
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} source on GitHub`}
                      >
                        <FaGithub aria-hidden="true" />
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Dock wins={wins} activeId={activeId} onActivate={dockActivate} onContextMenu={openMenu} />
        </div>
      </div>

      {menu && (() => {
        const app = DOCK_APPS.find((a) => a.id === menu.id);
        // Launcher apps (live products) get link items (open live site / source);
        // About (a real window) gets the window-control actions.
        const items = app?.href
          ? launcherMenuItems(app)
          : appMenuItems(wins?.[menu.id], {
              open: () => dockActivate(menu.id),
              zoom: () => zoomWin(menu.id),
              minimize: () => minimizeWin(menu.id),
              close: () => closeWin(menu.id),
            });
        return <DockContextMenu menu={menu} title={app?.label ?? ""} items={items} onClose={closeMenu} />;
      })()}
    </section>
  );
}

export default Projects;
