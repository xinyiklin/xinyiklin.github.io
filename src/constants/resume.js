// Resume content mirrors the LaTeX source.
// Keep this file and the LaTeX in sync when content changes.

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
        stack: "React 19, TypeScript, Django REST Framework, PostgreSQL, React Query, Tailwind CSS v4",
        link: { label: "careflow.xinyiklin.com", href: "https://careflow.xinyiklin.com" },
        bullets: [
            {
                segments: [
                    { text: "Built and deployed a " },
                    { text: "full-stack clinic workflow app", bold: true },
                    { text: " spanning scheduling, patient records, clinical charting, billing, documents, refills, and facility administration." },
                ],
            },
            {
                segments: [
                    { text: "Designed " },
                    { text: "React + TypeScript workflows", bold: true },
                    { text: " for a clinician workspace and patient portal, including SOAP progress notes, a unified patient timeline, refill queues, and responsive dashboard surfaces." },
                ],
            },
            {
                segments: [
                    { text: "Implemented " },
                    { text: "Django REST APIs", bold: true },
                    { text: " with PostgreSQL models, org/facility-scoped permissions, audit logging, encrypted SSNs at rest, JWT access tokens, HTTP-only refresh cookies, and CSRF protection." },
                ],
            },
            {
                segments: [
                    { text: "Generated " },
                    { text: "TypeScript API types", bold: true },
                    { text: " from OpenAPI, organized the front end as an " },
                    { text: "npm-workspaces monorepo", bold: true },
                    { text: ", and deployed the backend/frontend split on " },
                    { text: "Render and Vercel", bold: true },
                    { text: "." },
                ],
            },
        ],
    },
    {
        name: "RoleFit AI",
        stack: "React 19, TypeScript, Vite, Node.js, Claude Code/Codex/Antigravity, LaTeX",
        link: null,
        bullets: [
            {
                segments: [
                    { text: "Built a " },
                    { text: "local-first resume tailoring platform", bold: true },
                    { text: " that ingests DOCX, PDF, LaTeX, and plain-text resumes, tracks applications on disk, and exports polished drafts in the user's chosen format." },
                ],
            },
            {
                segments: [
                    { text: "Designed a " },
                    { text: "subscription-based AI workflow layer", bold: true },
                    { text: " around Claude Code, Codex, Antigravity, and CLI runs, standardizing prompts, structured review outputs, error handling, and deterministic fallbacks." },
                ],
            },
            {
                segments: [
                    { text: "Implemented " },
                    { text: "fit scoring and review workflows", bold: true },
                    { text: " across keyword coverage, bullet quality, structure, and concision, with keyword-gap analysis, recruiter-style risk flags, and apply/no-apply guidance." },
                ],
            },
            {
                segments: [
                    { text: "Engineered " },
                    { text: "format-preserving document pipelines", bold: true },
                    { text: " for LaTeX and DOCX, including OpenXML paragraph edits, template-based LaTeX export, optional Tectonic PDF compile, and Overleaf submission." },
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
                    { text: "Troubleshot " },
                    { text: "EHR, scheduling, and clinical workflow issues", bold: true },
                    { text: " with physicians and staff in a high-volume cardiovascular clinic." },
                ],
            },
            {
                segments: [
                    { text: "Led an " },
                    { text: "EHR migration", bold: true },
                    { text: ", coordinating data transfer, validation, and workflow continuity with minimal disruption." },
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
            {
                segments: [
                    { text: "Designed a " },
                    { text: "Google Sheets-based scheduling workflow", bold: true },
                    { text: " for concurrent scheduling, improving cross-staff visibility while preserving the clinic's existing process." },
                ],
            },
        ],
    },
    {
        role: "Teaching Assistant, Introductory Java Programming",
        org: "Hunter College",
        location: "New York, NY",
        dates: "Jul 2022 - Aug 2022",
        bullets: [
            {
                segments: [
                    { text: "Supported students on " },
                    { text: "object-oriented programming, data structures, and Java fundamentals", bold: true },
                    { text: " through labs, code reviews, and debugging help." },
                ],
            },
            {
                segments: [
                    { text: "Guided " },
                    { text: "algorithmic problem-solving", bold: true },
                    { text: " for correctness, efficiency, and readable implementation." },
                ],
            },
        ],
    },
];

export const RESUME_SKILLS = [
    { label: "Languages", value: "Python, Java, JavaScript, TypeScript, SQL, HTML/CSS" },
    { label: "Frontend", value: "React, Vite, React Query, React Router, Tailwind CSS" },
    { label: "Backend", value: "Django, Django REST Framework, Node.js, REST APIs, OpenAPI, JWT + CSRF auth" },
    { label: "AI/LLM Tooling", value: "Claude Code, Codex, Antigravity, prompt engineering, agentic workflow design" },
    { label: "Data & Storage", value: "PostgreSQL, Cloudflare R2 / S3-compatible object storage" },
    { label: "Tooling & Deployment", value: "Git, GitHub, Docker, Docker Compose, Render, Vercel, ESLint, Prettier, Tectonic" },
];
