import {
    SiReact,
    SiJavascript,
    SiNodedotjs,
    SiExpress,
    SiDjango,
    SiPython,
    SiPostgresql,
    SiGit,
    SiCmake,
    SiVite,
    SiCplusplus,
} from "react-icons/si";

function Skills() {
    const skillGroups = [
        {
            title: "Frontend",
            icons: [
                <SiReact key="react" className="skillsicons" title="React" />,
                <SiJavascript key="js" className="skillsicons" title="JavaScript" />,
            ],
            description:
                "Create responsive React interfaces with reusable components and clear user flows.",
        },
        {
            title: "Backend",
            icons: [
                <SiNodedotjs key="node" className="skillsicons" title="Node.js" />,
                <SiExpress key="express" className="skillsicons" title="Express" />,
                <SiDjango key="django" className="skillsicons" title="Django" />,
                <SiPython key="python" className="skillsicons" title="Python" />,
            ],
            description:
                "Build Django and Node APIs with clear business logic and validated data.",
        },
        {
            title: "Database",
            icons: [
                <SiPostgresql key="postgres" className="skillsicons" title="PostgreSQL" />,
            ],
            description:
                "Model relational data in PostgreSQL and connect it cleanly to product features.",
        },
        {
            title: "Tools & Systems",
            icons: [
                <SiGit key="git" className="skillsicons" title="Git" />,
                <SiCmake key="cmake" className="skillsicons" title="CMake" />,
                <SiVite key="vite" className="skillsicons" title="Vite" />,
                <SiCplusplus key="cpp" className="skillsicons" title="C++" />,
            ],
            description:
                "Use Git, CMake, Vite, and C++ for systems builds, version control, and frontend tooling.",
        },
    ];

    return (
        <section id="skills" className="section-panel section-panel-muted">
            <div className="container">
                <div className="section-intro text-center mb-5">
                    <p className="section-eyebrow mb-2">Stack</p>
                    <h2 className="mb-2">Core Skills</h2>
                    <p className="text-muted mb-0">
                        Tools I use to build usable full-stack applications.
                    </p>
                </div>

                <div className="skills-grid">
                    {skillGroups.map((group) => (
                        <div className="skill-card h-100" key={group.title}>
                                <div className="skill-icon-row mb-3 d-flex gap-3 align-items-center">
                                    {group.icons}
                                </div>

                                <h3 className="h5 mb-2">{group.title}</h3>
                                <p className="mb-0 text-muted">{group.description}</p>
                            </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
