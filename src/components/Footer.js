import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Container from "react-bootstrap/Container";

function Footer() {
    return (
        <footer className="bg-light border-top">
            <Container>
                <p className="text-center text-muted py-3 m-0 d-flex justify-content-center align-items-center gap-3 flex-wrap">

                    {/* Copyright */}
                    <span>
                        © {new Date().getFullYear()} Xinyi Lin
                    </span>

                    {/* GitHub */}
                    <a
                        href="https://github.com/xinyiklin"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="text-muted"
                    >
                        <FaGithub />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/xinyiklin/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted"
                    >
                        <FaLinkedin />
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:kevinlin11426@gmail.com"
                        aria-label="Email"
                        className="text-muted"
                    >
                        <FaEnvelope />
                    </a>
                </p>
            </Container>
        </footer>
    );
}

export default Footer;