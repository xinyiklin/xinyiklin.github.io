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
                "Build responsive and interactive UIs using React, JavaScript, HTML, and CSS with a focus on usability and clean structure.",
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
                "Develop backend logic and APIs using Node.js and Django while building full-stack applications end to end.",
        },
        {
            title: "Database",
            icons: [
                <SiPostgresql key="postgres" className="skillsicons" title="PostgreSQL" />,
            ],
            description:
                "Work with relational databases using SQL and PostgreSQL, including data modeling and query-based application features.",
        },
        {
            title: "Tools",
            icons: [
                <DiGit key="git" className="skillsicons" title="Git" />,
            ],
            description:
                "Use Git and modern development tools to manage projects, collaborate, and maintain a clean development workflow.",
        },
    ];

    return (
        <section id="skills" className="py-5 bg-light">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-semibold mb-2">Skills</h2>
                    <p className="text-muted mb-0">
                        Core technologies and tools I use to build full-stack applications.
                    </p>
                </div>

                <Row className="g-4">
                    {skillGroups.map((group) => (
                        <Col key={group.title} xs={12} md={6}>
                            <div className="h-100 rounded-4 border bg-white shadow-sm p-4">
                                <div className="mb-3 d-flex gap-3 align-items-center">
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