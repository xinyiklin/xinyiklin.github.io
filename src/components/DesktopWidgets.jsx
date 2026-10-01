import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PRODUCT_APPS } from "./DesktopDock";
import careflowDemo from "../assets/careflow-demo.mp4";
import careflowPoster from "../assets/careflow-demo-poster.jpg";

// macOS-style desktop widgets: the floating desktop's always-visible project
// surface, so a visitor sees what each product is without hovering the dock.
// CareFlow is the large primary widget with its recorded demo; RoleFit AI and
// Typeset are the small secondary pair. Copy traces to resume.js and each
// sibling repo's README.
const DETAILS = {
  careflow: {
    blurb: "Patients book visits; staff schedule them and open the chart, with conflict-checked booking and facility-scoped access.",
    tags: ["React", "TypeScript", "Django REST Framework", "PostgreSQL"],
  },
  rolefit: {
    blurb: "Local-first app that tailors a resume to a job posting; suggested edits apply only after you approve them.",
  },
  typeset: {
    blurb: "Edit the rendered page directly, then export a matching PDF in the browser.",
  },
};

// The recording is ~60s, so it needs a visible pause control (WCAG 2.2.2).
// Playback starts once the desktop settles (the `autoplay` attribute doesn't
// reliably fire while the stage is still inert behind the splash) and pauses
// while scrolled offscreen. A user pause sticks until they press play.
function DemoVideo() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(true);
  const settledRef = useRef(false);
  const visibleRef = useRef(false);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const sync = () => {
      if (settledRef.current && visibleRef.current && !userPausedRef.current) v.play().catch(() => {});
      else if (!v.paused) v.pause();
    };
    const onSettled = () => {
      settledRef.current = true;
      sync();
    };
    window.addEventListener("desktop-settled", onSettled);
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      sync();
    });
    io.observe(v);
    return () => {
      window.removeEventListener("desktop-settled", onSettled);
      io.disconnect();
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    userPausedRef.current = !v.paused;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  return (
    <div className="pj-widget-media">
      <video
        ref={ref}
        src={careflowDemo}
        poster={careflowPoster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="CareFlow demo recording: a patient books a follow-up, staff assign it on the schedule, and the Patient Hub opens the chart"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />
      <button
        type="button"
        className="pj-widget-media-btn"
        onClick={toggle}
        aria-label={paused ? "Play CareFlow demo" : "Pause CareFlow demo"}
      >
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      </button>
    </div>
  );
}

function Widget({ app, primary }) {
  const { blurb, tags } = DETAILS[app.id];
  return (
    <article className={`pj-widget${primary ? " pj-widget--primary" : ""}`} aria-labelledby={`pj-widget-${app.id}`}>
      <header className="pj-widget-head">
        <span className="pj-widget-icon" style={{ background: app.accent }}>
          <img src={app.iconSrc} alt="" aria-hidden="true" draggable={false} />
        </span>
        <span className="pj-widget-id">
          <h3 id={`pj-widget-${app.id}`} className="pj-widget-title">{app.label}</h3>
          <span className="pj-widget-sub">{app.sub}</span>
        </span>
      </header>

      {primary && <DemoVideo />}

      <p className="pj-widget-blurb">{blurb}</p>

      {tags && (
        <ul className="pj-widget-tags" aria-label={`${app.label} stack`}>
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}

      <div className="pj-widget-actions">
        <a className="pj-link-btn pj-link-btn--solid" href={app.href} target="_blank" rel="noreferrer" aria-label={`Open ${app.label} live site`}>
          Live <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        {app.demos?.map((d) => (
          <a key={d.href} className="pj-link-btn" href={d.href} target="_blank" rel="noreferrer" aria-label={`Open the ${app.label} ${d.label.toLowerCase()} demo`}>
            {d.label}
          </a>
        ))}
        <a className="pj-link-btn pj-link-btn--icon" href={app.github} target="_blank" rel="noreferrer" aria-label={`${app.label} source on GitHub`}>
          <FaGithub aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function DesktopWidgets() {
  const [primary, ...rest] = PRODUCT_APPS;
  return (
    <div className="pj-widgets" role="group" aria-label="Projects">
      <Widget app={primary} primary />
      <div className="pj-widgets-pair">
        {rest.map((app) => (
          <Widget key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
