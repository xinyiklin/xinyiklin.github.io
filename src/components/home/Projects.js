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
    const repos = ["clinic-scheduler", "crypto-app", "web-game"];

    const fallbackProjects = [
        {
            id: 1,
            name: "Clinic Scheduler",
            description:
                "A full-stack scheduling application for managing appointments with a clean UI and real-world workflow.",
            tech: ["React", "Django", "Bootstrap"],
            github: "https://github.com/xinyiklin/clinic-scheduler",
        },
        {
            id: 2,
            name: "Crypto App",
            description:
                "A responsive web app that displays cryptocurrency data using API integration.",
            tech: ["React", "JavaScript", "Bootstrap"],
            github: "https://github.com/xinyiklin/crypto-app",
        },
        {
            id: 3,
            name: "Web Game",
            description:
                "A browser-based game focused on interactive logic and user experience.",
            tech: ["JavaScript", "HTML", "CSS"],
            github: "https://github.com/xinyiklin/web-game",
        },
    ];

    const [projects, setProjects] = useState([]);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const responses = await Promise.all(
                    repos.map((repo) =>
                        axios.get(`${API}/repos/${username}/${repo}`)
                    )
                );

                const repoList = responses.map((res) => res.data);
                setProjects(repoList);
            } catch (error) {
                console.error("API failed, using fallback:", error.message);
                setUseFallback(true);
                setProjects(fallbackProjects);
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

                <Row className="g-4">
                    {projects.map((project) => (
                        <Col key={project.id || project.name} md={6} xxl={4}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="d-flex flex-column p-4">

                                    <Card.Title>
                                        {useFallback
                                            ? project.name
                                            : project.name.replace(/-/g, " ")}
                                    </Card.Title>

                                    <Card.Text className="flex-grow-1">
                                        {project.description || "No description available."}
                                    </Card.Text>

                                    {/* Tech stack (only for fallback) */}
                                    {useFallback && (
                                        <div className="mb-3">
                                            <div className="small text-muted mb-2">
                                                Tech Stack
                                            </div>
                                            <div className="d-flex flex-wrap gap-2">
                                                {project.tech.map((tech) => (
                                                    <span key={tech} className="badge bg-secondary">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        href={
                                            useFallback
                                                ? project.github
                                                : project.html_url
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        variant="primary"
                                    >
                                        View Project
                                    </Button>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {useFallback && (
                    <p className="text-center text-muted mt-4">
                        Showing cached project data (GitHub API limit reached).
                    </p>
                )}
            </Container>
        </div>
    );
}

export default Projects;