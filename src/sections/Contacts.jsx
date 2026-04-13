import Container from "react-bootstrap/Container";
import { FaEnvelope } from "react-icons/fa";
import { EMAIL, LOCATION, AVAILABILITY } from "../constants/app";

function Contacts() {
    return (
        <section id="contacts" className="py-5 bg-white">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-semibold mb-2">Get in Touch</h2>
                    <p className="text-muted mb-0">
                        I’m open to software engineering opportunities and professional connections.
                    </p>
                </div>

                <div
                    className="mx-auto rounded-4 border bg-white shadow-sm p-4 p-md-5 text-center"
                    style={{ maxWidth: "900px" }}
                >
                    <p className="lead">
                        I’m currently seeking internship or entry-level opportunities as a
                        <strong> Software Engineer</strong>.
                    </p>

                    <p className="lead">
                        If you have an opportunity, a project to collaborate on, or just want to connect,
                        feel free to reach out.
                    </p>

                    <p className="lead mb-3 d-flex justify-content-center align-items-center gap-2">
                        <FaEnvelope />
                        <a
                            href={`mailto:${EMAIL}`}
                            className="text-decoration-none"
                        >
                            {EMAIL}
                        </a>
                    </p>

                    <p className="text-muted mb-0">
                        Based in {LOCATION} • {AVAILABILITY}
                    </p>
                </div>
            </Container>
        </section>
    );
}

export default Contacts;