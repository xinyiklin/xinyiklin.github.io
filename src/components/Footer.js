import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import { EMAIL, GITHUB, LINKEDIN, NAME } from "../constants/app";

function Footer() {
    return (
        <footer className="bg-light border-top">
            <Container>
                <p className="text-center text-muted py-3 m-0 d-flex justify-content-center align-items-center gap-3 flex-wrap">

                    <span>
                        © {new Date().getFullYear()} {NAME}
                    </span>

                    <a
                        href={GITHUB}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="text-muted"
                    >
                        <FaGithub className="footer-icons" />
                    </a>

                    <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted"
                    >
                        <FaLinkedin className="footer-icons" />
                    </a>

                    <a
                        href={`mailto:${EMAIL}`}
                        aria-label="Email"
                        className="text-muted"
                    >
                        <FaEnvelope className="footer-icons" />
                    </a>

                </p>
            </Container>
        </footer>
    );
}

export default Footer;