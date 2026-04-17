import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Projects() {
  const project = {
    name: "CareFlow",
    meta: "Clinical Workflow Management • React, Django, PostgreSQL",
    description:
      "A full-stack healthcare workflow platform built to manage scheduling, patient records, and facility-level configurations. Designed with a focus on data integrity, responsive UI, and real-world clinical workflows.",
    highlights: [
      "Interactive day-view scheduler with real-time updates",
      "Modal-driven CRUD workflows for patients and appointments",
      "Facility-based configuration for statuses, visit types, and metadata",
      "Optimized server-state handling using React Query",
    ],
    tech: ["React", "Django", "PostgreSQL", "React Query", "Tailwind CSS"],
    github: "https://github.com/xinyiklin/careflow",
    live: "https://careflow.xinyiklin.com/",
  };

  return (
    <section id="projects" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-semibold mb-2">Featured Project</h2>
          <p className="text-muted mb-0">
            Highlighting full-stack development, system design, and real-world workflow implementation.
          </p>
        </div>

        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4 p-md-5">
            {/* Header */}
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4 mb-4">
              <div>
                <h3 className="fw-bold text-primary mb-1">
                  {project.name}
                </h3>
                <p className="text-muted small mb-2">
                  {project.meta}
                </p>
                <p className="text-muted mb-0" style={{ maxWidth: "800px" }}>
                  {project.description}
                </p>
              </div>

              <div className="d-flex gap-2 flex-shrink-0">
                <Button
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Live Demo
                </Button>
                <Button
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline-dark"
                >
                  GitHub
                </Button>
              </div>
            </div>

            {/* Tech stack */}
            <div className="mb-4">
              <h6 className="text-uppercase text-muted fw-semibold mb-2">
                Tech Stack
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    bg="light"
                    text="dark"
                    className="px-3 py-2 border"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h6 className="text-uppercase text-muted fw-semibold mb-3">
                Engineering Highlights
              </h6>

              <Row className="g-3">
                {project.highlights.map((item) => (
                  <Col key={item} md={6}>
                    <div className="h-100 rounded-3 border bg-white p-3">
                      <span className="text-dark">{item}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Projects;
