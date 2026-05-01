import Container from "react-bootstrap/Container";
import { FaEnvelope } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { EMAIL, LOCATION, AVAILABILITY } from "../constants/app";

function Contacts() {
    return (
        <section id="contacts" className="section-panel section-panel-white">
            <Container>
                <div className="section-intro text-center mb-5">
                    <p className="section-eyebrow mb-2">Contact</p>
                    <h2 className="display-5 fw-semibold mb-2">Get in Touch</h2>
                    <p className="text-muted mb-0">
                        I’m open to software engineering opportunities and professional connections.
                    </p>
                </div>

                <div
                    className="contact-card mx-auto"
                >
                    <div>
                        <p className="lead mb-3">
                            I’m currently seeking entry-level opportunities as a
                            <strong> Software Engineer</strong>.
                        </p>

                        <p className="mb-0 text-muted">
                            Based in {LOCATION} • {AVAILABILITY}
                        </p>
                    </div>

                    <a
                        href={`mailto:${EMAIL}`}
                        className="contact-link"
                        aria-label={`Email ${EMAIL}`}
                    >
                        <span>
                            <FaEnvelope />
                            {EMAIL}
                        </span>
                        <ArrowRight size={20} />
                    </a>
                </div>
            </Container>
        </section>
    );
}

export default Contacts;
