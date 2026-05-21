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
            value: "Full-time healthcare software engineer",
        },
        {
            icon: <MapPin size={20} />,
            label: "Based in",
            value: "New York, open to relocate",
        },
    ];

    return (
        <section id="about" className="section-panel section-panel-white">
            <Container>
                <div className="section-intro text-center mb-5">
                    <p className="section-eyebrow mb-2">About</p>
                    <h2 className="display-5 fw-semibold mb-2">Who I Am</h2>
                    <p className="text-muted mb-0">
                        Full-stack developer focused on building reliable software for healthcare workflows.
                    </p>
                </div>

                <div className="about-card">
                    <Row className="align-items-center g-4">
                        <Col lg={7}>
                            <p className="lead">
                                Hi, I’m <strong>{NAME}</strong>—a full-stack developer who builds
                                clean, reliable software for healthcare and operational workflows.
                            </p>

                            <p>
                                My background is in Computer Science, and I work across the stack with
                                <strong> React, Python, Django, JavaScript, and PostgreSQL</strong>.
                                I’m drawn to projects where the UI and the data model both need to be right.
                            </p>

                            <p>
                                My recent focus is CareFlow, a clinic workflow platform I built from the ground up—
                                covering scheduling, patient registration, document management, admin tools,
                                and a secure auth layer across a React frontend and Django REST backend.
                            </p>

                            <p className="mb-0">
                                I’m looking for a <strong>full-time software engineering role</strong> where I can
                                ship reliable products that solve real operational problems.
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
