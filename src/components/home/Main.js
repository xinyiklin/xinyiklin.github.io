import Container from "react-bootstrap/Container";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Main() {
    const resume = "/resume.pdf";
    const gradient = "#4484ce, #1ad7c0, #ff9b11, #9b59b6, #ff7f7f, #ecf0f1";
    const delay = 50;
    const pause = 500;

    return (
        <div
            id="home"
            style={{
                background: `linear-gradient(136deg, ${gradient})`,
                backgroundSize: "1200% 1200%",
            }}
            className="text-center text-light main-bg min-vh-100 d-flex align-items-center flex-wrap m-0"
        >
            <Container>
                <h1 className="display-1 fw-bold">Xinyi Lin</h1>

                <Typewriter
                    options={{
                        cursor: "",
                        delay: delay,
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
                            .typeString("Currently focused on React, Node.js, and Python.")
                            .start();
                    }}
                />

                <div className="p-4 d-flex justify-content-center gap-4 flex-wrap">
                    <a
                        href="https://github.com/xinyiklin"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="My GitHub"
                        className="text-light"
                    >
                        <FaGithub className="socialicons" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/xinyiklin/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="My LinkedIn"
                        className="text-light"
                    >
                        <FaLinkedin className="socialicons" />
                    </a>

                    <a
                        href="mailto:kevinlin11426@gmail.com"
                        aria-label="My email"
                        className="text-light"
                    >
                        <FaEnvelope className="socialicons" />
                    </a>
                </div>

                <div className="mt-2">
                    <a
                        className="btn btn-outline-light btn-md mx-2"
                        href="#about"
                        role="button"
                        aria-label="Learn more about me"
                    >
                        About Me
                    </a>

                    <a
                        className="btn btn-success btn-md mx-2"
                        href={resume}
                        target="_blank"
                        rel="noreferrer"
                        role="button"
                        aria-label="View my resume"
                    >
                        Resume
                    </a>
                </div>
            </Container>
        </div>
    );
}

export default Main;