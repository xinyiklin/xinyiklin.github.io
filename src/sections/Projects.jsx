import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS_DATA } from "../constants/projects";

function Projects({ currentIndex, setCurrentIndex }) {
  const activeProject = PROJECTS_DATA[currentIndex];

  const handleProjectTabKeyDown = (event, index) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + PROJECTS_DATA.length) % PROJECTS_DATA.length;

    setCurrentIndex(nextIndex);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  return (
    <section
      id="projects"
      className="projects-section py-5"
      style={{ "--project-accent": activeProject.accent }}
    >
      <Container>
        <div className="projects-heading mb-4">
          <div>
            <p className="project-eyebrow mb-2">Selected Work</p>
            <h2 className="display-5 fw-semibold mb-2">Projects with real product shape</h2>
          </div>

          <p className="text-muted mb-0">
            Full-stack builds, UI systems, and engineering details that show how the work was designed, shipped, and maintained.
          </p>
        </div>

        <div className="project-switcher mb-4" role="tablist" aria-label="Project selector">
          {PROJECTS_DATA.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={currentIndex === index}
              aria-controls="project-panel"
              className={`project-tab ${currentIndex === index ? "is-active" : ""}`}
              id={`project-tab-${project.id}`}
              onClick={() => setCurrentIndex(index)}
              onKeyDown={(event) => handleProjectTabKeyDown(event, index)}
              tabIndex={currentIndex === index ? 0 : -1}
            >
              <span className="project-tab-name">{project.name}</span>
              <span className="project-tab-meta">{project.role}</span>
            </button>
          ))}
        </div>

        <div
          className="project-stage"
          id="project-panel"
          role="tabpanel"
          aria-labelledby={`project-tab-${activeProject.id}`}
        >
          <div className="project-stage-toolbar">
            <Button
              variant="light"
              className="project-nav-button"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <ChevronLeft size={19} strokeWidth={2.5} />
            </Button>

            <div className="project-counter">
              {currentIndex + 1} / {PROJECTS_DATA.length}
            </div>

            <Button
              variant="light"
              className="project-nav-button"
              onClick={handleNext}
              aria-label="Next project"
            >
              <ChevronRight size={19} strokeWidth={2.5} />
            </Button>
          </div>

          <Row className="g-4 align-items-stretch">
            <Col lg={7}>
              <div className="project-summary h-100">
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <Badge className="project-status" bg="light" text="dark">
                    {activeProject.status}
                  </Badge>
                  <Badge className="project-status" bg="light" text="dark">
                    {activeProject.year}
                  </Badge>
                  <Badge className="project-status" bg="light" text="dark">
                    {activeProject.role}
                  </Badge>
                </div>

                <h3 className="project-title mb-2">{activeProject.name}</h3>
                <p className="project-meta mb-4">{activeProject.meta}</p>
                <p className="project-description mb-4">{activeProject.description}</p>

                <div className="project-actions">
                  {activeProject.live && (
                    <Button
                      href={activeProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="project-primary-action"
                    >
                      <ExternalLink size={17} />
                      Live Demo
                    </Button>
                  )}
                  <Button
                    href={activeProject.github}
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
            </Col>

            <Col lg={5}>
              <div className="project-insight h-100">
                <p className="project-label mb-3">Project Snapshot</p>
                <div className="project-metrics">
                  {activeProject.metrics.map((metric) => (
                    <div className="project-metric" key={`${metric.value}-${metric.label}`}>
                      <span>{metric.value}</span>
                      <small>{metric.label}</small>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="project-label mb-3">Tech Stack</p>
                  <div className="d-flex flex-wrap gap-2">
                    {activeProject.tech.map((tech) => (
                      <Badge key={tech} className="project-tech-pill">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="project-highlights mt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
            <div>
              <p className="project-eyebrow mb-2">Engineering Highlights</p>
              <h3 className="h4 mb-0">What this project demonstrates</h3>
            </div>
            <div className="d-none d-md-flex align-items-center gap-2">
              <Button
                variant="light"
                className="project-nav-button"
                onClick={handlePrev}
                aria-label="Previous project"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </Button>
              <Button
                variant="light"
                className="project-nav-button"
                onClick={handleNext}
                aria-label="Next project"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          <Row className="g-3">
            {activeProject.highlights.map((item) => (
              <Col key={item.title} md={6}>
                <div className="project-highlight h-100">
                  <span className="project-highlight-marker" aria-hidden="true" />
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default Projects;
