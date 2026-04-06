import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useState, useEffect } from "react";

function Projects() {
    const API = "https://api.github.com";
    const username = "xinyiklin";

    const projectConfig = [
        {
            repo: "clinic-scheduler",
            title: "Clinic Scheduler",
            description:
                "A full-stack scheduling application for managing appointments, built with a focus on practical workflow and clean UI.",
            tech: ["React", "Bootstrap", "Django", "REST API"],
            demoUrl: "",
        },
        {
            repo: "crypto-app",
            title: "Crypto App",
            description:
                "A web app for browsing cryptocurrency data with a responsive frontend and API-driven content.",
            tech: ["React", "JavaScript", "Bootstrap"],
            demoUrl: "",
        },
        {
            repo: "web-game",
            title: "Web Game",
            description:
                "A browser-based game project focused on interactive logic, user experience, and front-end development.",
            tech: ["JavaScript", "HTML", "CSS"],
            demoUrl: "",
        },
    ];

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const responses = await Promise.all(
                    projectConfig.map((project) =>
                        axios.get(`${API}/repos/${username}/${project.repo}`)
                    )
                );

                const mergedProjects = projectConfig.map((project, index) => ({
                    ...project,
                    githubData: responses[index].data,
                }));

                setProjects(mergedProjects);
            } catch (error) {
                console.error("Failed to fetch repositories:", error.message);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchRepos();
    }, []);

    return (
        <div id="projects" className="bg-light">
            <Container className="p-5">
                <div className="display-4 pb-4 text-center">
                    Projects
                </div>

                {loading && (
                    <p className="text-center">Loading projects...</p>
                )}

                {hasError && (
                    <p className="text-center text-danger">
                        Unable to load project data right now.
                    </p>
                )}

                {!loading && !hasError && (
                    <Row className="g-4">
                        {projects.map((project) => (
                            <Col key={project.repo} md={6} xxl={4}>
                                <Card className="h-100 shadow-sm border-0">
                                    <Card.Body className="d-flex flex-column p-4">
                                        <Card.Title className="mb-3">
                                            {project.title}
                                        </Card.Title>

                                        <Card.Text className="flex-grow-1">
                                            {project.description}
                                        </Card.Text>

                                        <div className="mb-3">
                                            <div className="small text-muted mb-2">
                                                Tech Stack
                                            </div>
                                            <div className="d-flex flex-wrap gap-2">
                                                {project.tech.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="badge bg-secondary"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2 mt-auto">
                                            <Button
                                                href={project.githubData.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                variant="primary"
                                            >
                                                GitHub
                                            </Button>

                                            {project.demoUrl && (
                                                <Button
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    variant="outline-primary"
                                                >
                                                    Live Demo
                                                </Button>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Projects;