import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS_DATA } from "../constants/projects";
import careflowAdminCapture from "../assets/careflow-admin-capture.png";
import careflowDocumentsCapture from "../assets/careflow-documents-capture.png";
import careflowScheduleCapture from "../assets/careflow-schedule-capture.png";

const CAREFLOW = PROJECTS_DATA.find((p) => p.id === "careflow");

const CHAPTERS = [
  {
    src: careflowScheduleCapture,
    alt: "CareFlow schedule screen with calendar resources and appointment blocks",
    eyebrow: "01 — Scheduling",
    title: "Configurable scheduling",
    body: "Facility-local appointment views with visit types, rooms, resources, blocks, and configurable status. Each facility controls its own calendar rules.",
  },
  {
    src: careflowDocumentsCapture,
    alt: "CareFlow document center with file cabinet and viewer",
    eyebrow: "02 — Documents",
    title: "Patient and document workflows",
    body: "Smart patient search, Quick Start registration, a modal Patient Hub, uploads, inline previews, downloads, and selected-document PDF export.",
  },
  {
    src: careflowAdminCapture,
    alt: "CareFlow admin console facility overview screen",
    eyebrow: "03 — Administration",
    title: "Admin and permissions",
    body: "Organization and facility tools for staff, roles, document categories, and pharmacy preferences—all scoped to the selected facility.",
  },
];

function Projects() {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef([]);

  useEffect(() => {
    const observers = CHAPTERS.map((_, index) => {
      const el = chapterRefs.current[index];
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveChapter(index);
        },
        { rootMargin: "-15% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const scrollToChapter = (index) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="projects" className="projects-section" style={{ "--project-accent": CAREFLOW.accent }}>
      <Container>
        <div className="projects-heading mb-5">
          <div>
            <p className="project-eyebrow mb-3">Featured Project</p>
            <h2 className="projects-heading-title mb-0">CareFlow</h2>
          </div>
          <div className="projects-heading-meta">
            <p className="project-meta mb-2">{CAREFLOW.meta}</p>
            <p className="cf-description mb-3">{CAREFLOW.description}</p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <Badge className="project-status">{CAREFLOW.status}</Badge>
              <Badge className="project-status">{CAREFLOW.year}</Badge>
              <Badge className="project-status">{CAREFLOW.role}</Badge>
            </div>
            <div className="cf-actions">
              {CAREFLOW.live && (
                <Button
                  href={CAREFLOW.live}
                  target="_blank"
                  rel="noreferrer"
                  className="project-primary-action"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </Button>
              )}
              <Button
                href={CAREFLOW.github}
                target="_blank"
                rel="noreferrer"
                variant="outline-dark"
                className="project-secondary-action"
              >
                <FaGithub />
                GitHub
              </Button>
            </div>
          </div>
        </div>

        <div className="cf-showcase">
          <aside className="cf-sticky-panel">
            <div className="cf-visual-wrapper">
              <div className="cf-window-chrome" aria-hidden="true">
                <span className="cf-dot cf-dot-red" />
                <span className="cf-dot cf-dot-yellow" />
                <span className="cf-dot cf-dot-green" />
                <span className="cf-window-title">CareFlow</span>
              </div>
              <div className="cf-visual-frame">
                {CHAPTERS.map((chapter, index) => (
                  <img
                    key={chapter.eyebrow}
                    src={chapter.src}
                    alt={chapter.alt}
                    className={`cf-capture ${activeChapter === index ? "is-active" : ""}`}
                  />
                ))}
                <div className="cf-capture-badge">
                  <span className="cf-capture-badge-text">
                    {CHAPTERS[activeChapter].eyebrow}
                  </span>
                </div>
              </div>
            </div>

            <div className="cf-steps">
              {CHAPTERS.map((chapter, index) => (
                <button
                  key={chapter.eyebrow}
                  type="button"
                  className={`cf-step-dot ${activeChapter === index ? "is-active" : ""}`}
                  onClick={() => scrollToChapter(index)}
                  aria-label={`Go to ${chapter.title}`}
                />
              ))}
              <span className="cf-step-label">{CHAPTERS[activeChapter].title}</span>
            </div>
          </aside>

          <div className="cf-chapters">
            {CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.eyebrow}
                className={`cf-chapter ${activeChapter === index ? "is-active" : ""}`}
                ref={(el) => { chapterRefs.current[index] = el; }}
              >
                <p className="cf-chapter-eyebrow">{chapter.eyebrow}</p>
                <h3 className="cf-chapter-title">{chapter.title}</h3>
                <p className="cf-chapter-body">{chapter.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cf-footer">
          <p className="project-label mb-3">Tech Stack</p>
          <div className="d-flex flex-wrap gap-2">
            {CAREFLOW.tech.map((t) => (
              <Badge key={t} className="project-tech-pill">{t}</Badge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Projects;
