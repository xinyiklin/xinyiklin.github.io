import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BriefcaseBusiness, Code2, MapPin } from "lucide-react";
import { NAME } from "../constants/app";

function AboutMe() {
    const quickFacts = [
        {
            icon: <Code2 size={20} />,
            label: "Primary stack",
            value: "React, Django, PostgreSQL",
        },
        {
            icon: <BriefcaseBusiness size={20} />,
            label: "Target roles",
            value: "Entry-level software engineer",
        },
        {
            icon: <MapPin size={20} />,
            label: "Based in",
            value: "New York, open to remote or hybrid",
        },
    ];

    return (
        <section id="about" className="section-panel section-panel-white">
            <Container>
                <div className="section-intro text-center mb-5">
                    <p className="section-eyebrow mb-2">About</p>
                    <h2 className="display-5 fw-semibold mb-2">About Me</h2>
                    <p className="text-muted mb-0">
                        A practical builder focused on shipping useful full-stack products.
                    </p>
                </div>

                <div className="about-card">
                    <Row className="align-items-center g-4">
                        <Col lg={7}>
                            <p className="lead">
                                Hi, I’m <strong>{NAME}</strong>, a full-stack developer focused on
                                building clean, practical, and user-friendly web applications.
                            </p>

                            <p>
                                I have a background in Computer Science and hands-on experience with
                                <strong> React, JavaScript, Python, Django, and SQL</strong>.
                                I enjoy turning ideas into real applications and improving my skills
                                through full-stack projects.
                            </p>

                            <p>
                                Recently, I’ve been focused on CareFlow, a clinic workflow platform
                                where I built scheduling, patient, document, admin, and authentication
                                flows across the React frontend and Django backend.
                            </p>

                            <p className="mb-0">
                                I’m currently seeking <strong>entry-level software engineering roles</strong>{" "}
                                where I can contribute, continue learning, and grow as a developer.
                            </p>
                        </Col>

                        <Col lg={5}>
                            <div className="about-facts">
                                {quickFacts.map((fact) => (
                                    <div className="about-fact" key={fact.label}>
                                        <span className="about-fact-icon">{fact.icon}</span>
                                        <span>
                                            <small>{fact.label}</small>
                                            <strong>{fact.value}</strong>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
}

export default AboutMe;
