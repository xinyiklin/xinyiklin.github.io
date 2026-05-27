import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAME } from "../constants/app";
import ResumeOverlay from "./ResumeOverlay";

const NAV_ITEMS = [
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contacts", label: "Contact", href: "#contacts" },
];

const SECTION_IDS = ["home", "about", "skills", "projects", "contacts"];

function Navigation() {
    const [navProgress, setNavProgress] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [resumeOpen, setResumeOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [hoveredId, setHoveredId] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const navInnerRef = useRef(null);
    const indicatorRef = useRef(null);

    const closeResume = useCallback(() => setResumeOpen(false), []);

    useEffect(() => {
        const updateScroll = () => {
            const hero = document.getElementById("home");
            const fadeDistance = hero ? Math.max(320, hero.offsetHeight - 80) : 520;
            const nextNav = Math.min(1, Math.max(0, window.scrollY / fadeDistance));

            setNavProgress((prev) =>
                Math.abs(prev - nextNav) < 0.01 ? prev : Number(nextNav.toFixed(3))
            );

            const max = document.documentElement.scrollHeight - window.innerHeight;
            const nextScroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            setScrollProgress((prev) =>
                Math.abs(prev - nextScroll) < 0.005 ? prev : Number(nextScroll.toFixed(3))
            );

            const triggerLine = window.innerHeight * 0.35;
            let nextSection = "home";
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= triggerLine && rect.bottom > triggerLine) {
                    nextSection = id;
                    break;
                }
            }
            setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
        };

        updateScroll();
        window.addEventListener("scroll", updateScroll, { passive: true });
        window.addEventListener("resize", updateScroll);

        return () => {
            window.removeEventListener("scroll", updateScroll);
            window.removeEventListener("resize", updateScroll);
        };
    }, []);

    useEffect(() => {
        const handleOpenResume = () => setResumeOpen(true);
        window.addEventListener("open-resume", handleOpenResume);
        return () => window.removeEventListener("open-resume", handleOpenResume);
    }, []);

    const indicatorTarget = hoveredId
        || (resumeOpen ? "resume" : activeSection !== "home" ? activeSection : null);

    useLayoutEffect(() => {
        const inner = navInnerRef.current;
        const indicator = indicatorRef.current;
        if (!inner || !indicator) return;

        if (!indicatorTarget) {
            indicator.style.opacity = "0";
            return;
        }

        const link = inner.querySelector(`[data-section="${indicatorTarget}"]`);
        if (!link) {
            indicator.style.opacity = "0";
            return;
        }

        const linkRect = link.getBoundingClientRect();
        const innerRect = inner.getBoundingClientRect();
        const offsetX = linkRect.left - innerRect.left;
        const width = linkRect.width;

        indicator.style.transform = `translateX(${offsetX}px)`;
        indicator.style.width = `${width}px`;
        indicator.style.opacity = "1";
    }, [indicatorTarget, navProgress, expanded]);

    const handleNavClick = (event, href) => {
        if (!href) return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
        window.history.replaceState(null, "", href);
        setExpanded(false);
    };

    return (
        <div
            className={`navbar-shell ${navProgress > 0.96 ? "is-pinned" : ""}`}
            style={{
                "--nav-progress": navProgress,
                "--nav-rest": 1 - navProgress,
                "--scroll-progress": scrollProgress,
            }}
        >
            <Navbar
                expand="md"
                variant="light"
                expanded={expanded}
                onToggle={setExpanded}
                className="site-navbar"
            >
                <Container ref={navInnerRef} className="site-navbar-inner">
                    <Navbar.Brand
                        href="#home"
                        className="site-brand"
                        data-section="home"
                        onClick={(e) => handleNavClick(e, "#home")}
                        onMouseEnter={() => setHoveredId("home")}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {NAME}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbar-nav" />

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto align-items-md-center">
                            {NAV_ITEMS.map((item) => (
                                <Nav.Link
                                    key={item.id}
                                    href={item.href}
                                    className="site-nav-link"
                                    data-section={item.id}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {item.label}
                                </Nav.Link>
                            ))}
                            <Nav.Link
                                href="#resume"
                                className="site-nav-link"
                                data-section="resume"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setExpanded(false);
                                    window.dispatchEvent(new Event("open-resume"));
                                }}
                                onMouseEnter={() => setHoveredId("resume")}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                Resume
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
                </Container>
                <span className="nav-scroll-bar" aria-hidden="true" />
            </Navbar>
            <ResumeOverlay open={resumeOpen} onClose={closeResume} />
        </div>
    );
}

export default Navigation;
