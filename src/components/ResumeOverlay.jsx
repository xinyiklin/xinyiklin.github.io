import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
    RESUME_HEADER,
    RESUME_EDUCATION,
    RESUME_PROJECTS,
    RESUME_EXPERIENCE,
    RESUME_SKILLS,
} from "../constants/resume";

function renderSegments(segments) {
    return segments.map((segment, index) =>
        segment.bold ? (
            <strong key={index}>{segment.text}</strong>
        ) : (
            <span key={index}>{segment.text}</span>
        )
    );
}

function ResumeOverlay({ open, onClose }) {
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousActive = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKey = (event) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                onClose();
                return;
            }

            if (event.key === "Tab") {
                const dialog = dialogRef.current;
                if (!dialog) return;
                const focusable = dialog.querySelectorAll(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKey);

        const focusTarget = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        return () => {
            window.removeEventListener("keydown", handleKey);
            window.cancelAnimationFrame(focusTarget);
            document.body.style.overflow = previousOverflow;
            if (previousActive instanceof HTMLElement) {
                previousActive.focus();
            }
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const overlay = (
        <div
            className="resume-overlay"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-overlay-title"
        >
            <div className="resume-overlay-dialog" ref={dialogRef}>
                <div className="resume-overlay-bar">
                    <span className="resume-overlay-bar-label">Resume</span>
                    <button
                        type="button"
                        className="resume-overlay-close"
                        onClick={onClose}
                        ref={closeButtonRef}
                        aria-label="Close resume"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="resume-overlay-scroll">
                    <article className="resume-doc">
                        <header className="resume-head">
                            <h1 className="resume-name" id="resume-overlay-title">
                                {RESUME_HEADER.name}
                            </h1>
                            <p className="resume-contact">
                                {RESUME_HEADER.links.map((link, index) => (
                                    <span key={link.href}>
                                        <a href={link.href} target="_blank" rel="noreferrer">
                                            {link.label}
                                        </a>
                                        {index < RESUME_HEADER.links.length - 1 && (
                                            <span className="resume-contact-sep" aria-hidden="true">|</span>
                                        )}
                                    </span>
                                ))}
                                <span className="resume-contact-sep" aria-hidden="true">|</span>
                                <span>{RESUME_HEADER.location}</span>
                            </p>
                        </header>

                        <section className="resume-section">
                            <h2 className="resume-section-title">Education</h2>
                            {RESUME_EDUCATION.map((entry) => (
                                <div key={entry.school} className="resume-entry">
                                    <div className="resume-entry-row">
                                        <span className="resume-entry-primary">{entry.school}</span>
                                        <span className="resume-entry-aside">{entry.dates}</span>
                                    </div>
                                    <div className="resume-entry-row resume-entry-row-sub">
                                        <span className="resume-entry-secondary">{entry.degree}</span>
                                        <span className="resume-entry-aside-sub">{entry.location}</span>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="resume-section">
                            <h2 className="resume-section-title">Projects</h2>
                            {RESUME_PROJECTS.map((project) => (
                                <div key={project.name} className="resume-entry">
                                    <div className="resume-entry-row">
                                        <span className="resume-entry-primary">{project.name}</span>
                                        {project.links?.length > 0 && (
                                            <span className="resume-entry-aside resume-entry-links">
                                                {project.links.map((link, index) => (
                                                    <span key={link.href}>
                                                        {index > 0 && (
                                                            <span className="resume-link-sep" aria-hidden="true"> / </span>
                                                        )}
                                                        <a href={link.href} target="_blank" rel="noreferrer">
                                                            {link.label}
                                                        </a>
                                                    </span>
                                                ))}
                                            </span>
                                        )}
                                    </div>
                                    <div className="resume-entry-row resume-entry-row-sub">
                                        <span className="resume-entry-secondary">{project.stack}</span>
                                    </div>
                                    <ul className="resume-bullets">
                                        {project.bullets.map((bullet, index) => (
                                            <li key={index}>{renderSegments(bullet.segments)}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        <section className="resume-section">
                            <h2 className="resume-section-title">Experience</h2>
                            {RESUME_EXPERIENCE.map((entry) => (
                                <div key={`${entry.role}-${entry.org}`} className="resume-entry">
                                    <div className="resume-entry-row">
                                        <span className="resume-entry-primary">{entry.role}</span>
                                        <span className="resume-entry-aside">{entry.dates}</span>
                                    </div>
                                    <div className="resume-entry-row resume-entry-row-sub">
                                        <span className="resume-entry-secondary">{entry.org}</span>
                                        <span className="resume-entry-aside-sub">{entry.location}</span>
                                    </div>
                                    <ul className="resume-bullets">
                                        {entry.bullets.map((bullet, index) => (
                                            <li key={index}>{renderSegments(bullet.segments)}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        <section className="resume-section">
                            <h2 className="resume-section-title">Technical Skills</h2>
                            <ul className="resume-skills">
                                {RESUME_SKILLS.map((skill) => (
                                    <li key={skill.label}>
                                        <strong>{skill.label}:</strong> {skill.value}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    );

    return createPortal(overlay, document.body);
}

export default ResumeOverlay;
