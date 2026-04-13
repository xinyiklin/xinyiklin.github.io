import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NAME, RESUME } from "../constants/app";

function Navigation() {
    return (
        <Navbar
            expand="md"
            fixed="top"
            variant="light"
            className="navbar-transparent"
        >
            <Container>
                <Navbar.Brand href="#home" className="fw-bold">
                    {NAME}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#projects">Projects</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#skills">Skills</Nav.Link>
                        <Nav.Link href="#contacts">Contact</Nav.Link>
                        <Nav.Link
                            href={RESUME}
                            target="_blank"
                            rel="noreferrer"
                            className="fw-semibold"
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