import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DiReact, DiJavascript, DiPython, DiGit } from "react-icons/di";
import { SiPostgresql, SiNodedotjs, SiDjango, SiExpress } from "react-icons/si";

function Skills() {
    const skillGroups = [
        {
            title: "Frontend",
            icons: [
                <DiReact key="react" className="skillsicons" title="React" />,
                <DiJavascript key="js" className="skillsicons" title="JavaScript" />,
            ],
            description:
                "Build responsive React interfaces with reusable components, accessible navigation, and polished user flows.",
        },
        {
            title: "Backend",
            icons: [
                <SiNodedotjs key="node" className="skillsicons" title="Node.js" />,
                <SiExpress key="express" className="skillsicons" title="Express" />,
                <SiDjango key="django" className="skillsicons" title="Django" />,
                <DiPython key="python" className="skillsicons" title="Python" />,
            ],
            description:
                "Develop Django and Node APIs that keep business logic clear, validated, and ready for real application workflows.",
        },
        {
            title: "Database",
            icons: [
                <SiPostgresql key="postgres" className="skillsicons" title="PostgreSQL" />,
            ],
            description:
                "Model relational data in PostgreSQL and connect it to application features through thoughtful query design.",
        },
        {
            title: "Tools",
            icons: [
                <DiGit key="git" className="skillsicons" title="Git" />,
            ],
            description:
                "Use Git, Vite, deployment tools, and local verification habits to keep projects reviewable and stable.",
        },
    ];

    return (
        <section id="skills" className="section-panel section-panel-muted">
            <Container>
                <div className="section-intro text-center mb-5">
                    <p className="section-eyebrow mb-2">Skills</p>
                    <h2 className="display-5 fw-semibold mb-2">Skills</h2>
                    <p className="text-muted mb-0">
                        Core technologies I use to move from UI idea to working full-stack application.
                    </p>
                </div>

                <Row className="g-4">
                    {skillGroups.map((group) => (
                        <Col key={group.title} xs={12} md={6}>
                            <div className="skill-card h-100">
                                <div className="skill-icon-row mb-3 d-flex gap-3 align-items-center">
                                    {group.icons}
                                </div>

                                <h3 className="h5 mb-2">{group.title}</h3>
                                <p className="mb-0 text-muted">{group.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default Skills;
