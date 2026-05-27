import { useCallback, useEffect, useRef, useState } from "react";
import { NAME } from "../constants/app";
import ResumeOverlay from "./ResumeOverlay";

const DOTS = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contacts", label: "Contact", href: "#contacts" },
];

const SECTION_IDS = DOTS.map((d) => d.id);

function Navigation() {
    const [activeSection, setActiveSection] = useState("home");
    const [hoveredId, setHoveredId] = useState(null);
    const [resumeOpen, setResumeOpen] = useState(false);
    const constellationRef = useRef(null);

    const closeResume = useCallback(() => setResumeOpen(false), []);

    useEffect(() => {
        const handleOpenResume = () => setResumeOpen(true);
        window.addEventListener("open-resume", handleOpenResume);
        return () => window.removeEventListener("open-resume", handleOpenResume);
    }, []);

    useEffect(() => {
        const updateActive = () => {
            const triggerLine = window.innerHeight * 0.4;
            let next = "home";
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= triggerLine && rect.bottom > triggerLine) {
                    next = id;
                    break;
                }
            }
            setActiveSection((prev) => (prev === next ? prev : next));
        };

        updateActive();
        window.addEventListener("scroll", updateActive, { passive: true });
        window.addEventListener("resize", updateActive);
        return () => {
            window.removeEventListener("scroll", updateActive);
            window.removeEventListener("resize", updateActive);
        };
    }, []);

    const goTo = (event, href) => {
        event.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: "smooth" });
        window.history.replaceState(null, "", href);
    };

    const openResume = (event) => {
        event.preventDefault();
        window.dispatchEvent(new Event("open-resume"));
    };

    const focusedId = hoveredId || activeSection;
    const focusedIdx = DOTS.findIndex((d) => d.id === focusedId);

    return (
        <>
            <a
                href="#home"
                className="cn-brand"
                onClick={(e) => goTo(e, "#home")}
            >
                <span className="cn-brand-dot" aria-hidden="true" />
                <span className="cn-brand-name">{NAME}</span>
            </a>

            <nav className="cn-constellation" ref={constellationRef} aria-label="Sections">
                <ul className="cn-dots">
                    {DOTS.map((dot, idx) => {
                        const isActive = dot.id === activeSection;
                        const isHovered = dot.id === hoveredId;
                        const isFocused = dot.id === focusedId;
                        const distance = focusedIdx >= 0 ? Math.abs(idx - focusedIdx) : 99;
                        return (
                            <li
                                key={dot.id}
                                className={`cn-dot-slot ${isFocused ? "is-focused" : ""}`}
                                style={{ "--cn-distance": distance }}
                            >
                                <a
                                    href={dot.href}
                                    className={`cn-dot ${isActive ? "is-active" : ""} ${
                                        isHovered ? "is-hovered" : ""
                                    }`}
                                    onClick={(e) => goTo(e, dot.href)}
                                    onMouseEnter={() => setHoveredId(dot.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onFocus={() => setHoveredId(dot.id)}
                                    onBlur={() => setHoveredId(null)}
                                    aria-current={isActive ? "true" : undefined}
                                    aria-label={dot.label}
                                >
                                    <span className="cn-dot-mark" aria-hidden="true" />
                                    <span className="cn-dot-label">{dot.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <a
                href="#resume"
                className={`cn-resume ${resumeOpen ? "is-active" : ""}`}
                onClick={openResume}
            >
                <span className="cn-resume-text">Resume</span>
                <span className="cn-resume-arrow" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                            d="M3 9L9 3M9 3H4M9 3V8"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </a>

            <ResumeOverlay open={resumeOpen} onClose={closeResume} />
        </>
    );
}

export default Navigation;
