import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS_DATA } from "../constants/projects";

function Projects({ currentIndex, setCurrentIndex }) {
  const activeProject = PROJECTS_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  return (
    <section id="projects" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-4">
          <h2 className="display-5 fw-semibold mb-2">Projects</h2>
          <p className="text-muted mb-0">
            Showcasing end-to-end development and system architecture.
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
          <Button 
            variant="white" 
            className="rounded-circle shadow-sm border d-flex align-items-center justify-content-center" 
            onClick={handlePrev}
            style={{ width: "42px", height: "42px" }}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </Button>

          <div className="text-center" style={{ minWidth: "160px" }}>
             <span className="fw-bold text-dark d-block" style={{ fontSize: "1.1rem" }}>
                {activeProject.name}
             </span>
             <div className="text-muted small">
                {currentIndex + 1} / {PROJECTS_DATA.length}
             </div>
          </div>

          <Button 
            variant="white" 
            className="rounded-circle shadow-sm border d-flex align-items-center justify-content-center" 
            onClick={handleNext}
            style={{ width: "42px", height: "42px" }}
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </Button>
        </div>

        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-4 p-md-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4 mb-4">
              <div>
                <h3 className="fw-bold text-primary mb-1">
                    {activeProject.name}
                </h3>
                <p className="text-muted small mb-2">
                    {activeProject.meta}
                </p>
                <p className="text-muted mb-0" style={{ maxWidth: "800px" }}>
                  {activeProject.description}
                </p>
              </div>

              <div className="d-flex gap-2 flex-shrink-0">
                {activeProject.live && (
                  <Button 
                      href={activeProject.live} 
                      target="_blank" 
                      rel="noreferrer" 
                      variant="primary"
                      className="px-4 fw-medium"
                  >
                    Live Demo
                  </Button>
                )}
                <Button 
                    href={activeProject.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    variant="outline-dark"
                    className="px-4 fw-medium"
                >
                  GitHub
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="text-uppercase text-muted fw-semibold mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                Tech Stack
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {activeProject.tech.map((tech) => (
                  <Badge 
                    key={tech} 
                    bg="white" 
                    text="dark" 
                    className="px-3 py-2 border fw-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h6 className="text-uppercase text-muted fw-semibold mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                Engineering Highlights
              </h6>
              <Row className="g-3">
                {activeProject.highlights.map((item) => (
                  <Col key={item} md={6}>
                    <div className="h-100 rounded-3 border bg-white p-3 shadow-sm border-light">
                      <span className="text-dark" style={{ fontSize: "0.9rem" }}>{item}</span>
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
