import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
    DiBootstrap,
    DiHtml5,
    DiJavascript,
    DiCss3,
    DiReact,
    DiJava,
    DiPython,
    DiAndroid,
    DiApple,
    DiChrome,
    DiWindows,
    DiLinux,
    DiGit
} from "react-icons/di";
import {
    SiCplusplus,
    SiPostgresql,
    SiVisualstudiocode,
    SiNodedotjs,
    SiExpress,
    SiDjango
} from "react-icons/si";

function Skills() {
    const skillGroups = [
        {
            title: "Frontend",
            icons: [
                <DiHtml5 key="html" className="skillsicons" title="HTML5" />,
                <DiCss3 key="css" className="skillsicons" title="CSS3" />,
                <DiJavascript key="js" className="skillsicons" title="JavaScript" />,
                <DiReact key="react" className="skillsicons" title="React" />,
                <DiBootstrap key="bootstrap" className="skillsicons" title="Bootstrap" />
            ],
            description:
                "Experience building responsive and interactive user interfaces with HTML, CSS, JavaScript, React, and Bootstrap."
        },
        {
            title: "Backend",
            icons: [
                <SiNodedotjs key="node" className="skillsicons" title="Node.js" />,
                <SiExpress key="express" className="skillsicons" title="Express" />,
                <SiDjango key="django" className="skillsicons" title="Django" />,
                <DiPython key="python" className="skillsicons" title="Python" />
            ],
            description:
                "Currently developing backend skills through API-driven and full-stack projects using Node.js, Express, Django, and Python."
        },
        {
            title: "Programming Languages",
            icons: [
                <DiJavascript key="js" className="skillsicons" title="JavaScript" />,
                <DiPython key="python" className="skillsicons" title="Python" />,
                <DiJava key="java" className="skillsicons" title="Java" />,
                <SiCplusplus key="cpp" className="skillsicons" title="C++" />
            ],
            description:
                "Background in Java, C++, Python, and JavaScript, with a focus on applying them in practical development projects."
        },
        {
            title: "Databases",
            icons: [
                <SiPostgresql key="postgres" className="skillsicons" title="PostgreSQL" />
            ],
            description:
                "Familiar with relational databases and SQL, including hands-on experience with PostgreSQL."
        },
        {
            title: "Tools",
            icons: [
                <SiVisualstudiocode key="vscode" className="skillsicons" title="VS Code" />,
                <DiGit key="git" className="skillsicons" title="Git" />
            ],
            description:
                "Comfortable using Visual Studio Code and Git for development, version control, and project workflow."
        },
        {
            title: "Platforms & Operating Systems",
            icons: [
                <DiLinux key="linux" className="skillsicons" title="Linux" />,
                <DiWindows key="windows" className="skillsicons" title="Windows" />,
                <DiChrome key="chromeos" className="skillsicons" title="ChromeOS" />,
                <DiAndroid key="android" className="skillsicons" title="Android" />,
                <DiApple key="ios" className="skillsicons" title="iOS" />
            ],
            description:
                "Hands-on familiarity with Linux, Windows, ChromeOS, Android, and iOS environments."
        }
    ];

    return (
        <div id="skills" className="bg-white">
            <Container className="p-5">
                <div className="display-4 pb-4 text-center">
                    Skills
                </div>

                <Row className="pt-3 g-4">
                    {skillGroups.map((group) => (
                        <Col key={group.title} xs={12} md={6} xl={4}>
                            <div className="h-100 p-4 border rounded shadow-sm">
                                <div className="mb-3 d-flex flex-wrap gap-2">
                                    {group.icons}
                                </div>
                                <h3 className="h5">{group.title}</h3>
                                <p className="mb-0">{group.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Skills;