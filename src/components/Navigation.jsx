import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NAME, RESUME } from "../constants/app";
import { PROJECTS_DATA } from "../constants/projects";

function Navigation({ onSelectProject }) {
    return (
        <Navbar expand="md" fixed="top" variant="light" className="navbar-transparent">
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
                            <div className="p-2" style={{ minWidth: "260px" }}>
                                {PROJECTS_DATA.map((proj, index) => (
                                    <div key={proj.id}>
                                        <div 
                                            className="p-2 rounded-3" 
                                            style={{ transition: "background 0.2s" }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            <div className="d-flex align-items-center justify-content-between gap-3">
                                                <a
                                                    href={proj.sectionId || "#projects"}
                                                    className="text-decoration-none fw-semibold text-dark"
                                                    style={{ fontSize: "14px", flex: 1 }}
                                                    onClick={() => onSelectProject(index)}
                                                >
                                                    {proj.name}
                                                </a>
                                                
                                                {proj.live && (
                                                    <a
                                                        href={proj.live}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-decoration-none px-2 py-1 rounded-2"
                                                        style={{ 
                                                            fontSize: "11px", 
                                                            backgroundColor: "#eef2ff", 
                                                            color: "#4f46e5",
                                                            fontWeight: "600",
                                                            border: "1px solid #c7d2fe",
                                                            whiteSpace: "nowrap"
                                                        }}
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
                                    <a href="#projects" className="text-decoration-none text-muted" style={{ fontSize: "12px" }}>
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
                            className="ms-md-3 btn btn-outline-dark btn-sm px-4 fw-semibold shadow-sm"
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
