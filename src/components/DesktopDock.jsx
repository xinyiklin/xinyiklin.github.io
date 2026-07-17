import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB, LINKEDIN } from "../constants/app";
import { PROJECT_LINKS } from "../constants/projects";
import careflowFavicon from "../assets/careflow-favicon.svg";
import rolefitFavicon from "../assets/rolefit-favicon.svg";
import typesetFavicon from "../assets/typeset-favicon.svg";

// The desktop's floating dock: app tiles (left of the separator), link tiles
// (right), drag-to-reorder within each side, and the right-click app menu.
// Extracted from Projects.jsx, which owns the window manager.

// The four desktop apps shown in the dock (and targeted by the right-click menu).
// Apps with a `href` link straight to the live product on click; their in-desktop
// demo windows are kept as reference and still open from the right-click menu
// (and render as stacked cards on mobile/reduced-motion).
export const DOCK_APPS = [
  { id: "about", label: "About", accent: "linear-gradient(140deg, #189a8c 0%, #0f766e 50%, #7a5fc0 100%)", onText: "#ffffff", glyph: "XL" },
  { id: "typeset", label: "Typeset", href: PROJECT_LINKS.typeset.live, accent: "#176b5c", onText: "#ffffff", iconSrc: typesetFavicon },
  { id: "careflow", label: "CareFlow", href: PROJECT_LINKS.careflow.live, accent: "#2a3847", onText: "#ffffff", iconSrc: careflowFavicon },
  { id: "rolefit", label: "RoleFit AI", accent: "#eef2ef", onText: "#23664f", iconSrc: rolefitFavicon },
];

// External links open a real URL; the Contact tile (no href) just scrolls to
// the Contacts section in-page, without writing a hash to the URL.
const DOCK_LINKS = [
  { id: "github", label: "GitHub", href: GITHUB, accent: "#181717", icon: <FaGithub aria-hidden="true" /> },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN, accent: "#0a66c2", icon: <FaLinkedin aria-hidden="true" /> },
  { id: "contact", label: "Contact", target: "contacts", accent: "#0f766e", icon: <Mail size={20} aria-hidden="true" /> },
];

// Dock reorder: the grabbed tile follows the pointer directly (no animation);
// the OTHER tiles slide to open a gap via a short FLIP.
const DOCK_FLIP_MS = 200;
const DOCK_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// One dock tile, rendered as a new-tab anchor when `href` is set and a button
// otherwise, with the drag wiring (reorder pointerdown, native-drag suppression,
// and the moved-click swallow) identical across both shapes.
function DockTile({ id, kind, href, className, ariaLabel, movedRef, onPointerDown, onActivate, onContextMenu, children }) {
  const shared = { "data-dock-id": id, "data-dock-kind": kind, className, onPointerDown, onContextMenu };
  return href ? (
    <a
      {...shared}
      href={href}
      target="_blank"
      rel="noreferrer"
      draggable={false}
      aria-label={ariaLabel}
      onDragStart={(e) => e.preventDefault()}
      onClick={(e) => movedRef.current && e.preventDefault()}
    >
      {children}
    </a>
  ) : (
    <button {...shared} type="button" aria-label={ariaLabel} onClick={() => !movedRef.current && onActivate()}>
      {children}
    </button>
  );
}

export default function Dock({ wins, activeId, onActivate, onContextMenu }) {
  // Tiles can be dragged to reorder, but only within their own side of the
  // separator: app tiles stay on the left, link tiles on the right. Order is
  // session-local. A real drag (>6px) swallows the trailing click so it never
  // opens/navigates; the flag clears on a timeout after that click has fired.
  const [appOrder, setAppOrder] = useState(() => DOCK_APPS.map((a) => a.id));
  const [linkOrder, setLinkOrder] = useState(() => DOCK_LINKS.map((l) => l.id));
  const movedRef = useRef(false);
  const dockRef = useRef(null);
  // The active drag: { id, el, kind, scale, slots, index, lastX }. Slot centers
  // are measured once at drag start (slots are fixed while tiles reorder within
  // them), so pointermove needs no DOM reads — and never reads mid-FLIP rects.
  const dragRef = useRef(null);
  const flipRef = useRef(null); // { kind, positions: Map<dockId, left> } pre-reorder
  const flipAnims = useRef(new Map()); // dockId -> Animation

  const sideTiles = (kind) => [...(dockRef.current?.querySelectorAll(`[data-dock-kind="${kind}"]`) ?? [])];

  // Pin the grabbed tile's center under the pointer, expressed as an offset from
  // its own (fixed) slot center. Dividing by the live scale undoes the cinematic
  // camera's transform so the tile doesn't lag the pointer while zoomed.
  const pinToPointer = (drag) => {
    drag.el.style.transform = `translateX(${(drag.lastX - drag.slots[drag.index]) / drag.scale}px)`;
  };

  // After the order changes, the OTHER tiles slide from their old slot into the
  // new one (FLIP, via the Web Animations API — it self-reverts and an interrupted
  // slide continues from its current spot). The grabbed tile is NOT animated: it's
  // re-pinned under the pointer relative to its new slot so it never jumps.
  useLayoutEffect(() => {
    const flip = flipRef.current;
    if (!flip) return;
    flipRef.current = null;
    const drag = dragRef.current;
    sideTiles(flip.kind).forEach((el) => {
      const tileId = el.dataset.dockId;
      if (tileId === drag?.id) {
        pinToPointer(drag);
        return;
      }
      const oldLeft = flip.positions.get(tileId);
      if (oldLeft == null) return;
      flipAnims.current.get(tileId)?.cancel();
      const r = el.getBoundingClientRect();
      const dx = (oldLeft - r.left) / (r.width / el.offsetWidth || 1);
      if (Math.abs(dx) < 0.5) return;
      flipAnims.current.set(
        tileId,
        el.animate([{ transform: `translateX(${dx}px)` }, { transform: "translateX(0px)" }], {
          duration: DOCK_FLIP_MS,
          easing: DOCK_EASE,
        })
      );
    });
  }, [appOrder, linkOrder]);

  const beginReorder = (kind, id) => (event) => {
    // Left button only, and never while another pointer's drag is active (a
    // second pointerdown must not reset the first drag's state mid-flight).
    if (event.button !== 0 || dragRef.current) return;
    movedRef.current = false;
    const pid = event.pointerId;
    const startX = event.clientX;
    const setOrder = kind === "app" ? setAppOrder : setLinkOrder;
    const move = (ev) => {
      if (ev.pointerId !== pid) return;
      if (!dragRef.current) {
        if (Math.abs(ev.clientX - startX) < 6 || dragRef.current) return;
        // Drag activates: settle any leftover slides, then measure the side's
        // slot centers once. Reorders swap tiles between slots but never move
        // the slots themselves, so these stay valid for the whole drag.
        movedRef.current = true;
        const tiles = sideTiles(kind);
        tiles.forEach((t) => flipAnims.current.get(t.dataset.dockId)?.cancel());
        const el = tiles.find((t) => t.dataset.dockId === id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        dragRef.current = {
          id,
          el,
          kind,
          scale: r.width / el.offsetWidth || 1,
          slots: tiles.map((t) => {
            const tr = t.getBoundingClientRect();
            return tr.left + tr.width / 2;
          }),
          index: tiles.indexOf(el),
          lastX: ev.clientX,
        };
        el.classList.add("is-dragging");
        el.style.transition = "none";
        document.body.classList.add("pj-grabbing");
      }
      const drag = dragRef.current;
      drag.lastX = ev.clientX;
      pinToPointer(drag);
      // Reorder when the pointer is nearest another slot's center.
      let target = drag.index;
      let best = Infinity;
      drag.slots.forEach((c, i) => {
        const d = Math.abs(ev.clientX - c);
        if (d < best) {
          best = d;
          target = i;
        }
      });
      if (target === drag.index) return;
      // Snapshot this side's positions before the reorder commits so the layout
      // effect can FLIP the tiles that moved.
      const positions = new Map();
      sideTiles(kind).forEach((t) => positions.set(t.dataset.dockId, t.getBoundingClientRect().left));
      flipRef.current = { kind, positions };
      drag.index = target;
      setOrder((o) => {
        const next = o.filter((x) => x !== id);
        next.splice(target, 0, id);
        return next;
      });
    };
    const up = (ev) => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      const drag = dragRef.current;
      if (drag) {
        // Settle the grabbed tile from its pointer offset back into its slot via
        // the tile's base transform transition (restore it, then clear the
        // offset). Drop any pending FLIP snapshot so a same-batch commit can't
        // also animate the released tile.
        flipRef.current = null;
        flipAnims.current.get(drag.id)?.cancel();
        drag.el.classList.remove("is-dragging");
        drag.el.style.transition = "";
        drag.el.style.transform = "";
        dragRef.current = null;
        document.body.classList.remove("pj-grabbing");
      }
      setTimeout(() => {
        movedRef.current = false;
      }, 0);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  return (
    <div ref={dockRef} className="pj-dock" role="group" aria-label="Project dock">
      {appOrder.map((id) => {
        const app = DOCK_APPS.find((a) => a.id === id);
        const w = wins?.[app.id];
        const running = w ? !w.closed : true;
        const hidden = w ? w.closed || w.min : false;
        return (
          <DockTile
            key={app.id}
            id={app.id}
            kind="app"
            href={app.href}
            className={`pj-dock-item pj-dock-app${activeId === app.id && !hidden ? " is-active" : ""}`}
            ariaLabel={app.href ? `Open ${app.label} live site` : `${hidden ? "Open" : "Focus"} ${app.label}`}
            movedRef={movedRef}
            onPointerDown={beginReorder("app", app.id)}
            onActivate={() => onActivate(app.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              // Keyboard-invoked context menus (menu key / Shift+F10) report
              // 0,0 — anchor to the tile so the menu doesn't render off-screen.
              let { clientX: x, clientY: y } = e;
              if (!x && !y) {
                const r = e.currentTarget.getBoundingClientRect();
                x = r.left + r.width / 2;
                y = r.top - 4;
              }
              onContextMenu(app.id, x, y);
            }}
          >
            <span className="pj-dock-tip">{app.label}</span>
            <span className="pj-dock-icon" style={{ background: app.accent, color: app.onText }}>
              {app.iconSrc ? (
                <img className="pj-dock-img" src={app.iconSrc} alt="" aria-hidden="true" draggable={false} />
              ) : (
                app.glyph
              )}
            </span>
            <span className={running ? "pj-dock-run is-open" : "pj-dock-run"} aria-hidden="true" />
          </DockTile>
        );
      })}
      <span className="pj-dock-sep" aria-hidden="true" />
      {linkOrder.map((id) => {
        const link = DOCK_LINKS.find((l) => l.id === id);
        return (
          <DockTile
            key={link.id}
            id={link.id}
            kind="link"
            href={link.href}
            className="pj-dock-item pj-dock-link"
            ariaLabel={link.label}
            movedRef={movedRef}
            onPointerDown={beginReorder("link", link.id)}
            onActivate={() => document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="pj-dock-tip">{link.label}</span>
            <span className="pj-dock-icon pj-dock-icon--link" style={{ background: link.accent }}>
              {link.icon}
            </span>
            <span className="pj-dock-run" aria-hidden="true" />
          </DockTile>
        );
      })}
    </div>
  );
}

// Right-click menu for a dock app: actions mirror the window's traffic lights,
// shaped by its current state (closed / minimized / open).
export function appMenuItems(state, actions) {
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
export function DockContextMenu({ menu, title, items, onClose }) {
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
