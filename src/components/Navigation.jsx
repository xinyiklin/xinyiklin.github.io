import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { NAME, RESUME } from "../constants/app";

function Navigation() {
    const [navProgress, setNavProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const updateNavState = () => {
            const hero = document.getElementById("home");
            const fadeDistance = hero ? Math.max(320, hero.offsetHeight - 80) : 520;
            const nextProgress = Math.min(1, Math.max(0, window.scrollY / fadeDistance));

            setNavProgress((currentProgress) =>
                Math.abs(currentProgress - nextProgress) < 0.01
                    ? currentProgress
                    : Number(nextProgress.toFixed(3))
            );
            ticking = false;
        };

        const requestNavUpdate = () => {
            if (ticking) {
                return;
            }

            ticking = true;
            window.requestAnimationFrame(updateNavState);
        };

        updateNavState();
        window.addEventListener("scroll", requestNavUpdate, { passive: true });
        window.addEventListener("resize", requestNavUpdate);

        return () => {
            window.removeEventListener("scroll", requestNavUpdate);
            window.removeEventListener("resize", requestNavUpdate);
        };
    }, []);

    const isAtTop = navProgress <= 0.001;
    const isScrolled = navProgress > 0.96;

    return (
        <Navbar
            expand="md"
            fixed="top"
            variant="light"
            className={`site-navbar ${isAtTop ? "navbar-transparent" : ""} ${isScrolled ? "navbar-scrolled" : "navbar-hero"}`}
            style={{ "--nav-progress": navProgress }}
        >
            <Container>
                <Navbar.Brand href="#home" className="fw-bold">
                    {NAME}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link href="#about" className="px-2">About</Nav.Link>
                        <Nav.Link href="#skills" className="px-2">Skills</Nav.Link>
                        <Nav.Link href="#projects" className="px-2">Projects</Nav.Link>
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
