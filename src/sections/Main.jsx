import Container from "react-bootstrap/Container";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { EMAIL, GITHUB, LINKEDIN, NAME, RESUME } from "../constants/app";

function Main() {
    const gradient = "#2563eb, #14b8a6, #f97316, #7c3aed, #ef4444, #f8fafc";
    const delay = 50;
    const pause = 700;

    return (
        <section
            id="home"
            style={{
                background: `linear-gradient(136deg, ${gradient})`,
                backgroundSize: "1200% 1200%",
            }}
            className="hero-section text-center text-light main-bg min-vh-100 d-flex align-items-center m-0"
        >
            <Container className="hero-content">
                <p className="hero-kicker mb-3">Software Engineer | Full-Stack Projects</p>
                <h1 className="hero-title fw-bold">{NAME}</h1>

                <Typewriter
                    options={{
                        cursor: "",
                        delay,
                        skipAddStyles: true,
                        wrapperClassName: "lead typewriter",
                        cursorClassName: "",
                    }}
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Full-stack developer.")
                            .pauseFor(pause)
                            .deleteAll()
                            .typeString("Building practical workflow applications.")
                            .pauseFor(pause)
                            .deleteAll()
                            .typeString("Focused on React, Django, and PostgreSQL.")
                            .start();
                    }}
                />

                <p className="hero-subtitle mt-4">
                    I build practical React and Django applications with clean workflows,
                    thoughtful UI, and PostgreSQL-backed data models.
                </p>

                <div className="hero-stack mt-4">
                    <span>React</span>
                    <span>Django REST</span>
                    <span>PostgreSQL</span>
                    <span>Product UI</span>
                </div>

                <div className="hero-socials p-4 d-flex justify-content-center gap-4 flex-wrap">
                    <a
                        href={GITHUB}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="My GitHub"
                        className="text-light"
                    >
                        <FaGithub className="socialicons" />
                    </a>

                    <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="My LinkedIn"
                        className="text-light"
                    >
                        <FaLinkedin className="socialicons" />
                    </a>

                    <a
                        href={`mailto:${EMAIL}`}
                        aria-label="My email"
                        className="text-light"
                    >
                        <FaEnvelope className="socialicons" />
                    </a>
                </div>

                <div className="hero-actions mt-2">
                    <a
                        className="btn hero-primary-btn btn-md mx-2"
                        href="#projects"
                        role="button"
                        aria-label="View my projects"
                    >
                        View Projects
                    </a>

                    <a
                        className="btn hero-secondary-btn btn-md mx-2"
                        href={RESUME}
                        target="_blank"
                        rel="noreferrer"
                        role="button"
                        aria-label="View my resume"
                    >
                        Resume
                    </a>
                </div>
            </Container>
        </section>
    );
}

export default Main;
