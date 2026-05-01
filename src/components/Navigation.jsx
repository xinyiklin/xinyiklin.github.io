import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import { NAME, RESUME } from "../constants/app";
import { PROJECTS_DATA } from "../constants/projects";

function Navigation({ onSelectProject }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateNavState = () => {
            const hero = document.getElementById("home");
            const heroThreshold = hero ? hero.offsetHeight - 96 : 420;

            setIsScrolled(window.scrollY > heroThreshold);
        };

        updateNavState();
        window.addEventListener("scroll", updateNavState, { passive: true });
        window.addEventListener("resize", updateNavState);

        return () => {
            window.removeEventListener("scroll", updateNavState);
            window.removeEventListener("resize", updateNavState);
        };
    }, []);

    return (
        <Navbar
            expand="md"
            fixed="top"
            variant={isScrolled ? "light" : "dark"}
            className={`site-navbar ${isScrolled ? "navbar-scrolled" : "navbar-hero"}`}
        >
            <Container>
                <Navbar.Brand href="#home" className="fw-bold">
                    {NAME}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <NavDropdown
                            title="Projects"
                            id="projects-dropdown"
                            align="start"
                            className="px-2"
                        >
                            <div className="project-menu p-2">
                                {PROJECTS_DATA.map((proj, index) => (
                                    <div key={proj.id}>
                                        <div className="project-menu-item p-2 rounded-3">
                                            <div className="d-flex align-items-center justify-content-between gap-3">
                                                <a
                                                    href={proj.sectionId || "#projects"}
                                                    className="project-menu-link text-decoration-none fw-semibold text-dark"
                                                    onClick={() => onSelectProject(index)}
                                                >
                                                    {proj.name}
                                                </a>

                                                {proj.live && (
                                                    <a
                                                        href={proj.live}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="project-menu-demo text-decoration-none px-2 py-1 rounded-2"
                                                    >
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {index < PROJECTS_DATA.length - 1 && <hr className="my-1 opacity-10" />}
                                    </div>
                                ))}

                                <div className="mt-2 pt-2 border-top text-center">
                                    <a href="#projects" className="project-menu-browse text-decoration-none text-muted">
                                        Browse Gallery →
                                    </a>
                                </div>
                            </div>
                        </NavDropdown>

                        <Nav.Link href="#about" className="px-2">About</Nav.Link>
                        <Nav.Link href="#skills" className="px-2">Skills</Nav.Link>
                        <Nav.Link href="#contacts" className="px-2">Contact</Nav.Link>
                        <Nav.Link
                            href={RESUME}
                            target="_blank"
                            rel="noreferrer"
                            className="nav-resume-link ms-md-3 btn btn-sm px-4 fw-semibold"
                        >
                            Resume
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
