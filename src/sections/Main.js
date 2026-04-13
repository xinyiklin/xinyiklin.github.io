import Container from "react-bootstrap/Container";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { EMAIL, GITHUB, LINKEDIN, NAME, RESUME } from "../constants/app";

function Main() {
    const gradient = "#4484ce, #1ad7c0, #ff9b11, #9b59b6, #ff7f7f, #ecf0f1";
    const delay = 50;
    const pause = 500;

    return (
        <section
            id="home"
            style={{
                background: `linear-gradient(136deg, ${gradient})`,
                backgroundSize: "1200% 1200%",
            }}
            className="text-center text-light main-bg min-vh-100 d-flex align-items-center m-0"
        >
            <Container>
                <h1 className="display-2 fw-bold">{NAME}</h1>

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
                            .typeString("Aspiring full-stack developer.")
                            .pauseFor(pause)
                            .deleteAll()
                            .typeString("Building practical and user-friendly web applications.")
                            .pauseFor(pause)
                            .deleteAll()
                            .typeString("Focused on React, Django, and PostgreSQL.")
                            .start();
                    }}
                />

                <p className="mt-4 text-light-emphasis">
                    React • Django • PostgreSQL • Full-Stack Projects
                </p>

                <div className="p-4 d-flex justify-content-center gap-4 flex-wrap">
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

                <div className="mt-2">
                    <a
                        className="btn btn-light btn-md mx-2"
                        href="#projects"
                        role="button"
                        aria-label="View my projects"
                    >
                        View Project
                    </a>

                    <a
                        className="btn btn-outline-light btn-md mx-2"
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