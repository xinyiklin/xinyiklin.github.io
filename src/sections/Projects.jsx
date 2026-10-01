import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useInView, useMediaQuery, useReducedMotion, WIDE_QUERY } from "../hooks/useMotion";
import Dock, { PRODUCT_APPS, DockContextMenu, launcherMenuItems } from "../components/DesktopDock";
import DesktopWidgets from "../components/DesktopWidgets";

// The projects surface. On the floating desktop (wide, motion allowed) the
// products show as widgets and launch from the dock; on mobile/reduced-motion
// they render as the link cards below. There are no in-desktop windows.

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

function Projects({ sectionId = "projects", cinematic = false }) {
  const reduced = useReducedMotion();
  // Reduced-motion users always get the flat stacked layout, even on wide
  // viewports. Pairs with the CSS that applies the stacked block under
  // `prefers-reduced-motion`.
  const floating = useMediaQuery(WIDE_QUERY) && !reduced;
  const [osRef, osIn] = useInView();
  const clock = useClock();

  const [menu, setMenu] = useState(null); // dock right-click menu: { id, x, y, flipX } | null
  const openMenu = (id, x, y) => setMenu({ id, x, y, flipX: x > window.innerWidth - 200 });
  const closeMenu = useCallback(() => setMenu(null), []);
  const menuApp = menu && PRODUCT_APPS.find((a) => a.id === menu.id);

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

          <div className={floating ? "pj-desktop is-floating" : "pj-desktop"}>
            {floating ? (
              <DesktopWidgets />
            ) : (
              <ul className="pj-links" aria-label="Projects">
                {PRODUCT_APPS.map((p) => (
                  <li key={p.id} className="pj-link">
                    <span className="pj-link-icon" style={{ background: p.accent, color: p.onText }}>
                      <img src={p.iconSrc} alt="" aria-hidden="true" />
                    </span>
                    <span className="pj-link-info">
                      <span className="pj-link-title">{p.label}</span>
                      <span className="pj-link-sub">{p.sub}</span>
                      {p.demos && (
                        <span className="pj-link-demos">
                          {p.demos.map((d) => (
                            <a key={d.href} href={d.href} target="_blank" rel="noreferrer" aria-label={`Open the ${p.label} ${d.label.toLowerCase()} demo`}>
                              {d.label} demo
                            </a>
                          ))}
                        </span>
                      )}
                    </span>
                    <span className="pj-link-actions">
                      <a className="pj-link-btn pj-link-btn--solid" href={p.href} target="_blank" rel="noreferrer" aria-label={`Open ${p.label} live site`}>
                        Live <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                      <a
                        className="pj-link-btn pj-link-btn--icon"
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.label} source on GitHub`}
                      >
                        <FaGithub aria-hidden="true" />
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Dock onContextMenu={openMenu} />
        </div>
      </div>

      {menuApp && (
        <DockContextMenu menu={menu} title={menuApp.label} items={launcherMenuItems(menuApp)} onClose={closeMenu} />
      )}
    </section>
  );
}

export default Projects;
