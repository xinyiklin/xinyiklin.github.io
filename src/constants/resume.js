// Resume content mirrors the LaTeX source (RoleFit AI general SDE resume,
// base-resume-general-sde.tex). Keep this file and the LaTeX in sync when
// content changes.

export const RESUME_HEADER = {
    name: "Xinyi Lin",
    location: "New York, NY",
    links: [
        { label: "linkedin.com/in/xinyiklin", href: "https://www.linkedin.com/in/xinyiklin/" },
        { label: "xinyiklin@gmail.com", href: "mailto:xinyiklin@gmail.com" },
        { label: "xinyiklin.com", href: "https://xinyiklin.com/" },
        { label: "github.com/xinyiklin", href: "https://github.com/xinyiklin" },
    ],
};

export const RESUME_EDUCATION = [
    {
        school: "City University of New York, Hunter College",
        degree: "Bachelor of Arts in Computer Science, Daedalus Honors Scholar",
        location: "New York, NY",
        dates: "May 2024",
    },
];

export const RESUME_PROJECTS = [
    {
        name: "CareFlow",
        stack: "React 19, TypeScript, Django REST Framework, PostgreSQL, React Query, Tailwind CSS v4, AWS",
        links: [
            { label: "careflow.xinyiklin.com", href: "https://careflow.xinyiklin.com" },
        ],
        bullets: [
            {
                segments: [
                    { text: "Built and deployed a " },
                    { text: "React + Django REST", bold: true },
                    { text: " clinic platform spanning 10+ domain apps, 45+ PostgreSQL models, and 250+ endpoints for scheduling, charting, billing, and patient records, with the frontend on " },
                    { text: "AWS Amplify", bold: true },
                    { text: " and PostgreSQL on " },
                    { text: "Amazon RDS", bold: true },
                    { text: "." },
                ],
            },
            {
                segments: [
                    { text: "Implemented clinician and patient workflows on a " },
                    { text: "React Query", bold: true },
                    { text: " data layer of 90+ mutations, with role-based access scoped to org and facility, audit logging on sensitive actions, and Fernet-encrypted SSNs." },
                ],
            },
            {
                segments: [
                    { text: "Maintained " },
                    { text: "GitHub Actions CI", bold: true },
                    { text: " across two React apps and the Django backend, running lint/typecheck/build, migration checks, and " },
                    { text: "400+ Django tests", bold: true },
                    { text: " for auth, validation, and facility isolation." },
                ],
            },
            {
                segments: [
                    { text: "Built a separate " },
                    { text: "patient-portal React app", bold: true },
                    { text: " backed by a dedicated /v1/portal/ API namespace, with generated OpenAPI types keeping both frontends type-safe against the backend contract." },
                ],
            },
        ],
    },
    {
        name: "RoleFit AI",
        stack: "React 19, TypeScript, Vite, Node.js, LLM APIs, LaTeX/Tectonic",
        links: [{ label: "xinyiklin.com/rolefit-ai", href: "https://xinyiklin.com/rolefit-ai/" }],
        bullets: [
            {
                segments: [
                    { text: "Built a " },
                    { text: "local-first React + Node.js", bold: true },
                    { text: " app that tailors resumes to a posting without inventing experience, with a structured editor, server-side Tectonic PDF export, and an on-disk tracker." },
                ],
            },
            {
                segments: [
                    { text: "Designed a " },
                    { text: "recruiter-style review engine", bold: true },
                    { text: " that scores resume-to-role fit, capping scores at what the resume actually evidences, on a provider adapter spanning " },
                    { text: "10+ AI backends", bold: true },
                    { text: " with a deterministic local fallback." },
                ],
            },
            {
                segments: [
                    { text: "Constrained AI edits to " },
                    { text: "schema-validated, section-scoped suggestions", bold: true },
                    { text: " surfaced as accept/edit/discard diffs in the editor." },
                ],
            },
            {
                segments: [
                    { text: "Hardened the AI pipeline with prompt-injection fencing, SSRF-guarded job import, DOCX zip-slip validation, a grounded-output sanitizer, and " },
                    { text: "120+ offline anti-fabrication eval probes", bold: true },
                    { text: "." },
                ],
            },
        ],
    },
    {
        name: "JakeForge",
        stack: "React 19, TypeScript, Node.js, Docker, AWS EC2, GitHub Actions, LaTeX/Tectonic",
        links: [{ label: "jakeforge.xinyiklin.com", href: "https://jakeforge.xinyiklin.com" }],
        bullets: [
            {
                segments: [
                    { text: "Forked RoleFit AI's editor and rendering core into a self-hosted " },
                    { text: "drag-and-drop resume editor", bold: true },
                    { text: " with a live LaTeX/Tectonic export pipeline and DOCX import." },
                ],
            },
            {
                segments: [
                    { text: "Containerized the app with " },
                    { text: "Docker", bold: true },
                    { text: " and deployed it to an " },
                    { text: "AWS EC2", bold: true },
                    { text: " instance with a custom domain and HTTPS via a " },
                    { text: "GitHub Actions", bold: true },
                    { text: " CI/CD pipeline, with a host/origin allowlist guard on the server before exposing it publicly." },
                ],
            },
        ],
    },
];

export const RESUME_EXPERIENCE = [
    {
        role: "Clinic Operations & IT Assistant",
        org: "Colden Heart Center",
        location: "Queens, NY",
        dates: "Mar 2023 - Present",
        bullets: [
            {
                segments: [
                    { text: "Translated recurring " },
                    { text: "EHR, scheduling, and clinical workflow issues", bold: true },
                    { text: " into practical requirements for physicians and staff in a high-volume cardiovascular clinic." },
                ],
            },
            {
                segments: [
                    { text: "Led an " },
                    { text: "EHR migration", bold: true },
                    { text: ", coordinating data transfer, validation checks, staff workflow continuity, and production troubleshooting across clinic systems." },
                ],
            },
            {
                segments: [
                    { text: "Identified patient-flow bottlenecks in intake and testing; proposed and implemented a revised " },
                    { text: "room-assignment process", bold: true },
                    { text: " that " },
                    { text: "reduced patient wait times by over 50%", bold: true },
                    { text: " and improved clinic throughput." },
                ],
            },
        ],
    },
    {
        role: "Teaching Assistant — Introductory Java Programming",
        org: "Hunter College",
        location: "New York, NY",
        dates: "Jul 2022 - Aug 2022",
        bullets: [
            {
                segments: [
                    { text: "Supported students in introductory Java through labs, code reviews, and debugging, covering " },
                    { text: "object-oriented programming, data structures, and algorithmic problem-solving", bold: true },
                    { text: "." },
                ],
            },
        ],
    },
];

export const RESUME_SKILLS = [
    { label: "Languages", value: "Python, C++, JavaScript, TypeScript, SQL, HTML/CSS" },
    { label: "Frontend", value: "React, Vite, React Query, React Router, Tailwind CSS" },
    { label: "Backend & Data", value: "Django REST Framework, Node.js, REST APIs, OpenAPI, JWT/CSRF auth, PostgreSQL" },
    { label: "Testing & Quality", value: "Django TestCase, GitHub Actions CI, ESLint, TypeScript typecheck, regression evals" },
    { label: "Tooling & Cloud", value: "Git, Docker, AWS (Amplify, RDS, EC2), Render, Cloudflare R2" },
];
