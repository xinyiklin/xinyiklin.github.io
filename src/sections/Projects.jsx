import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS_DATA } from "../constants/projects";
import careflowSchedule from "../assets/careflow-schedule.gif";
import careflowScheduleStill from "../assets/careflow-schedule-capture.png";
import careflowPatientHub from "../assets/careflow-patient-hub.png";
import careflowTimeline from "../assets/careflow-timeline.png";
import careflowSecurity from "../assets/careflow-security.png";

const CAREFLOW = PROJECTS_DATA.find((p) => p.id === "careflow");
const ROLEFIT = PROJECTS_DATA.find((p) => p.id === "role-fit-ai");

const CAREFLOW_SCENES = [
  {
    id: "schedule",
    label: "Schedule",
    title: "A schedule that thinks in facility time",
    body:
      "Day calendar with rooms, providers, and visit blocks. Drag-to-reschedule guards, appointment heatmap, and per-day interval customization, all on facility-local time.",
    media: {
      src: careflowSchedule,
      still: careflowScheduleStill,
      alt: "CareFlow schedule view with rooms, providers, and visit blocks on a day calendar",
    },
  },
  {
    id: "patient-hub",
    label: "Patient hub",
    title: "Patient hub with masked PII",
    body:
      "Smart search opens to demographics, insurance, emergency contact, and care team. SSN stays masked by default; full reveal is an audited action, and the last four digits remain visible for ID workflows.",
    media: {
      src: careflowPatientHub,
      alt: "CareFlow patient hub showing demographics, insurance, and a masked SSN field",
    },
  },
  {
    id: "timeline",
    label: "Timeline",
    title: "A timeline that crosses domains",
    body:
      "One feed across appointments, encounters, SOAP progress notes, medications, and allergies, filterable by source. Encounters carry draft and signed states with a sign and unsign workflow that emits audit events.",
    media: {
      src: careflowTimeline,
      alt: "Patient timeline aggregating appointments, encounters, progress notes, medications, and allergies",
    },
  },
  {
    id: "permissions",
    label: "Permissions",
    title: "Permissions and audit at facility scope",
    body:
      "Org and facility admin for staff, roles, payers, pharmacies, and fee schedules, with a permission matrix at org and facility scope. Sensitive actions are flagged audited; the audit log is read-only and facility-scoped.",
    media: {
      src: careflowSecurity,
      alt: "Facility-scoped role and permission matrix with audited actions flagged per row",
    },
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function CareFlowStudy({ reduced }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sceneRefs = useRef([]);

  useEffect(() => {
    const els = sceneRefs.current.filter(Boolean);
    if (!els.length || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            if (!Number.isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (idx) => {
    const target = sceneRefs.current[idx];
    if (!target) return;
    setActiveIdx(idx);
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <article
      className="cs cs--primary"
      style={{ "--project-accent": CAREFLOW.accent }}
      id="project-careflow"
    >
      <header className="cs-intro">
        <h2 className="cs-name">{CAREFLOW.name}</h2>
        <p className="cs-tagline">{CAREFLOW.tagline}</p>
        <p className="cs-description">{CAREFLOW.description}</p>
      </header>

      <div className="cs-meta">
        <dl className="cs-meta-list">
          <div className="cs-meta-item">
            <dt>Year</dt>
            <dd>{CAREFLOW.year}</dd>
          </div>
          <div className="cs-meta-item">
            <dt>Role</dt>
            <dd>{CAREFLOW.role}</dd>
          </div>
          <div className="cs-meta-item">
            <dt>Status</dt>
            <dd className="cs-meta-status">
              <span className="cs-status-dot" aria-hidden="true" />
              Live
            </dd>
          </div>
        </dl>

        <div className="cs-actions">
          <Button
            href={CAREFLOW.live}
            target="_blank"
            rel="noreferrer"
            className="cs-action cs-action-primary"
          >
            Open live demo
            <ArrowUpRight size={16} />
          </Button>
          <Button
            href={CAREFLOW.github}
            target="_blank"
            rel="noreferrer"
            variant="outline-dark"
            className="cs-action cs-action-secondary"
          >
            <FaGithub />
            View source
          </Button>
        </div>
      </div>

      <div className="cs-showcase">
        <aside
          className="cs-stage"
          aria-label="CareFlow product screenshots, current view changes with scroll"
        >
          <div className="cs-stage-frame">
            <span className="cs-stage-label" aria-hidden="true">
              {String(activeIdx + 1).padStart(2, "0")} of 0{CAREFLOW_SCENES.length}
            </span>
            {CAREFLOW_SCENES.map((scene, i) => {
              const src =
                scene.id === "schedule" && reduced
                  ? scene.media.still
                  : scene.media.src;
              return (
                <img
                  key={scene.id}
                  src={src}
                  alt={scene.media.alt}
                  className={
                    i === activeIdx
                      ? "cs-stage-img is-active"
                      : "cs-stage-img"
                  }
                  loading="lazy"
                  aria-hidden={i === activeIdx ? "false" : "true"}
                />
              );
            })}
          </div>
          <ol className="cs-stage-pips" role="tablist">
            {CAREFLOW_SCENES.map((scene, i) => (
              <li key={scene.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === activeIdx}
                  className={
                    i === activeIdx
                      ? "cs-stage-pip is-active"
                      : "cs-stage-pip"
                  }
                  onClick={() => jumpTo(i)}
                >
                  {scene.label}
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <div className="cs-scenes">
          {CAREFLOW_SCENES.map((scene, i) => {
            const isActive = i === activeIdx;
            const src =
              scene.id === "schedule" && reduced
                ? scene.media.still
                : scene.media.src;
            return (
              <article
                ref={(el) => (sceneRefs.current[i] = el)}
                data-idx={i}
                className={isActive ? "cs-scene is-active" : "cs-scene"}
                key={scene.id}
              >
                <p className="cs-scene-label">{scene.label}</p>
                <h3 className="cs-scene-title">{scene.title}</h3>
                <figure className="cs-scene-fig">
                  <img src={src} alt={scene.media.alt} loading="lazy" />
                </figure>
                <p className="cs-scene-body">{scene.body}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="cs-areas">
        <p className="cs-areas-lede">Eight feature areas, end to end.</p>
        <ul className="cs-areas-list">
          {CAREFLOW.areas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>

      <footer className="cs-stack">
        <p className="cs-stack-label">Stack</p>
        <p className="cs-stack-tech">{CAREFLOW.tech.join(", ")}</p>
      </footer>
    </article>
  );
}

function RoleFitStudy() {
  return (
    <article
      className="cs cs--secondary"
      style={{ "--project-accent": ROLEFIT.accent }}
      id="project-rolefit"
    >
      <header className="cs-intro">
        <h2 className="cs-name">{ROLEFIT.name}</h2>
        <p className="cs-tagline">{ROLEFIT.tagline}</p>
        <p className="cs-description">{ROLEFIT.description}</p>
      </header>

      <div className="cs-meta">
        <dl className="cs-meta-list">
          <div className="cs-meta-item">
            <dt>Year</dt>
            <dd>{ROLEFIT.year}</dd>
          </div>
          <div className="cs-meta-item">
            <dt>Role</dt>
            <dd>{ROLEFIT.role}</dd>
          </div>
          <div className="cs-meta-item">
            <dt>Status</dt>
            <dd className="cs-meta-status cs-meta-status--quiet">
              Source available
            </dd>
          </div>
        </dl>

        <div className="cs-actions">
          <Button
            href={ROLEFIT.github}
            target="_blank"
            rel="noreferrer"
            className="cs-action cs-action-primary"
          >
            View source
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>

      <div className="cs-notes">
        {ROLEFIT.notes.map((note) => (
          <article className="cs-note" key={note.title}>
            <h3 className="cs-note-title">{note.title}</h3>
            <p className="cs-note-body">{note.body}</p>
          </article>
        ))}
      </div>

      <footer className="cs-stack">
        <p className="cs-stack-label">Stack</p>
        <p className="cs-stack-tech">{ROLEFIT.tech.join(", ")}</p>
      </footer>
    </article>
  );
}

function Projects() {
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="projects-section">
      <Container>
        <CareFlowStudy reduced={reduced} />
        <hr className="cs-divider" />
        <RoleFitStudy />
      </Container>
    </section>
  );
}

export default Projects;
