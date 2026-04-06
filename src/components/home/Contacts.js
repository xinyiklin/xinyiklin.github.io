import Container from "react-bootstrap/Container";
import { FaEnvelope } from "react-icons/fa";

function Contacts() {
    const email = "kevinlin11426@gmail.com";

    return (
        <div id="contacts" className="bg-white">
            <Container className="p-5 text-center">

                <div className="display-4 pb-4">
                    Get in Touch
                </div>

                <p className="lead">
                    I’m currently seeking internship or entry-level opportunities as a
                    <strong> Software Engineer</strong>.
                </p>

                <p className="lead">
                    If you have an opportunity, a project to collaborate on,
                    or just want to connect — feel free to reach out!
                </p>

                {/* Email */}
                <p className="lead mb-3">
                    <FaEnvelope className="me-2" />
                    <a
                        href={`mailto:${email}`}
                        className="text-decoration-none"
                    >
                        {email}
                    </a>
                </p>

                <p className="text-muted">
                    Based in New York • Open to remote opportunities
                </p>

            </Container>
        </div>
    );
}

export default Contacts;