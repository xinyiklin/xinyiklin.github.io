import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

function Projects() {
    const project = {
        name: "Clinic Scheduler",
        meta: "Full-stack web app • React, Django, PostgreSQL",
        description:
            "A full-stack clinic scheduling application built to simulate real-world healthcare workflows. It includes patient search and management, appointment creation and editing, day-view scheduling, drag-and-drop rescheduling, facility-scoped configuration, and role-aware data handling.",
        highlights: [
            "Day-view scheduler with drag-and-drop appointment updates",
            "Patient search, create, and edit flows with modal-based UX",
            "Facility-based configuration for statuses, visit types, and genders",
            "React Query integration for cleaner server-state management",
        ],
        tech: ["React", "Django", "PostgreSQL", "React Query", "Tailwind CSS"],
        github: "https://github.com/xinyiklin/clinic-scheduler",
        live: "https://clinic-scheduler-seven.vercel.app/",
    };

    return (
        <section
            id="projects"
            className="py-5"
            style={{
                background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
            }}
        >
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-semibold mb-2">Projects</h2>
                    <p className="text-muted mb-0">
                        A featured project highlighting full-stack product development and real-world workflow design.
                    </p>
                </div>

                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    <Card.Body className="p-4 p-md-5">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4 mb-4">
                            <div>
                                <h3 className="mb-1">{project.name}</h3>
                                <p className="text-muted small mb-2">{project.meta}</p>
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

                        <div className="mb-4">
                            <div className="fw-semibold mb-2">Tech Stack</div>
                            <div className="d-flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <Badge
                                        key={tech}
                                        bg="light"
                                        text="dark"
                                        className="border px-3 py-2 fw-normal"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="fw-semibold mb-3">Key Highlights</div>
                            <div className="row g-3">
                                {project.highlights.map((item) => (
                                    <div key={item} className="col-md-6">
                                        <div className="h-100 rounded-4 border bg-white p-3">
                                            <span className="text-dark">{item}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
}

export default Projects;