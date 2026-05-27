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
            value: "Full-time software engineer",
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
                    <h2 className="mb-2">Who I Am</h2>
                    <p className="text-muted mb-0">
                        Practical software for healthcare teams.
                    </p>
                </div>

                <div className="about-card">
                    <Row className="align-items-center g-4">
                        <Col lg={7}>
                            <p className="lead">
                                Hi, I’m <strong>{NAME}</strong>. I build full-stack software for
                                healthcare workflows.
                            </p>

                            <p>
                                I like building features where the interface, API, and data model all need to fit together, getting scheduling logic, access control, and document workflows right at once.
                            </p>

                            <p>
                                My recent focus is CareFlow, a clinic workflow platform for scheduling,
                                a patient hub, clinical charting, billing, documents, and facility admin.
                            </p>

                            <p className="mb-0">
                                I’m looking for a <strong>full-time software engineering role</strong> where I can
                                build useful products and keep growing with a strong team.
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
