import {
    SiReact,
    SiTypescript,
    SiVite,
    SiNodedotjs,
    SiDjango,
    SiPython,
    SiPostgresql,
    SiDocker,
    SiGit,
    SiVercel,
    SiOpenai,
} from "react-icons/si";
import { LuSparkles, LuTerminal } from "react-icons/lu";
import { useInView, useReducedMotion, useTilt } from "../hooks/useMotion";

function SkillCard({ group, reduced }) {
    const tilt = useTilt(reduced, { max: 7, axisRatio: 1, scale: 1.03 });
    return (
        <div className="skill-card h-100">
            <div
                className="skill-card-inner"
                ref={tilt.ref}
                onPointerMove={tilt.onPointerMove}
                onPointerLeave={tilt.onPointerLeave}
            >
                <div className="skill-icon-row mb-3 d-flex gap-3 align-items-center">
                    {group.icons}
                </div>

                <h3 className="h5 mb-2">{group.title}</h3>
                <p className="mb-0 text-muted">{group.description}</p>
            </div>
        </div>
    );
}

function Skills() {
    const reduced = useReducedMotion();
    const [gridRef, revealed] = useInView();
    const skillGroups = [
        {
            title: "Frontend",
            icons: [
                <SiReact key="react" className="skillsicons" title="React" />,
                <SiTypescript key="ts" className="skillsicons" title="TypeScript" />,
                <SiVite key="vite" className="skillsicons" title="Vite" />,
            ],
            description:
                "Build responsive React and TypeScript interfaces with reusable components and clear user flows.",
        },
        {
            title: "Backend",
            icons: [
                <SiNodedotjs key="node" className="skillsicons" title="Node.js" />,
                <SiDjango key="django" className="skillsicons" title="Django" />,
                <SiPython key="python" className="skillsicons" title="Python" />,
            ],
            description:
                "Build Django REST and Node APIs with typed OpenAPI clients, validated data, and JWT and CSRF auth.",
        },
        {
            title: "Data & Tooling",
            icons: [
                <SiPostgresql key="postgres" className="skillsicons" title="PostgreSQL" />,
                <SiGit key="git" className="skillsicons" title="Git" />,
                <SiDocker key="docker" className="skillsicons" title="Docker" />,
                <SiVercel key="vercel" className="skillsicons" title="Vercel" />,
            ],
            description:
                "Model relational data in PostgreSQL and ship with Git, Docker, Render, and Vercel.",
        },
        {
            title: "AI / LLM tooling",
            icons: [
                <SiOpenai key="codex" className="skillsicons" title="Codex" />,
                <LuTerminal key="cli" className="skillsicons" title="Coding CLIs" />,
                <LuSparkles key="agentic" className="skillsicons" title="Agentic workflows" />,
            ],
            description:
                "Build agentic workflows with Claude Code, Codex, and Antigravity, plus prompt engineering and deterministic fallbacks.",
        },
    ];

    return (
        <section id="skills" className="section-panel section-panel-muted">
            <div className="container">
                <div className="section-intro text-center mb-5">
                    <h2 className="mb-2">Core Skills</h2>
                    <p className="text-muted mb-0">
                        Tools I use to build usable full-stack applications.
                    </p>
                </div>

                <div
                    className={revealed ? "skills-grid is-revealed" : "skills-grid"}
                    ref={gridRef}
                >
                    {skillGroups.map((group) => (
                        <SkillCard key={group.title} group={group} reduced={reduced} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
