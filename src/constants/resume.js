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
        stack: "React, TypeScript, Django REST Framework, PostgreSQL, React Query, Tailwind CSS",
        link: { label: "careflow.xinyiklin.com", href: "https://careflow.xinyiklin.com" },
        bullets: [
            {
                segments: [
                    { text: "Built and deployed a " },
                    { text: "full-stack EHR-style web app", bold: true },
                    { text: " for clinic scheduling, clinical charting, billing, document management, and organization/facility administration." },
                ],
            },
            {
                segments: [
                    { text: "Implemented " },
                    { text: "clinical charting with SOAP progress notes", bold: true },
                    { text: " (states: draft, signed, unsigned), a " },
                    { text: "68-code CPT catalog", bold: true },
                    { text: ", configurable fee schedules with payer and facility overrides, and a " },
                    { text: "patient timeline", bold: true },
                    { text: " that combines appointments, encounters, medications, and allergies into one chronological view." },
                ],
            },
            {
                segments: [
                    { text: "Added security and access controls: " },
                    { text: "SSN encryption at rest using Fernet", bold: true },
                    { text: ", JWT access tokens with HTTP-only refresh cookies, " },
                    { text: "CSRF protection", bold: true },
                    { text: ", " },
                    { text: "role-based permissions", bold: true },
                    { text: " scoped per facility, and an audit log for sensitive actions." },
                ],
            },
            {
                segments: [
                    { text: "Generated " },
                    { text: "TypeScript API clients", bold: true },
                    { text: " from a live OpenAPI schema, organized the React code into " },
                    { text: "feature modules", bold: true },
                    { text: " with shared components, and deployed via " },
                    { text: "Render and Vercel", bold: true },
                    { text: " with Docker Compose for local development." },
                ],
            },
        ],
    },
    {
        name: "RoleFit AI",
        stack: "React 19, TypeScript, Vite, Node.js, OpenAI/Anthropic/Gemini APIs, LaTeX",
        link: null,
        bullets: [
            {
                segments: [
                    { text: "Built and deployed a " },
                    { text: "local-first resume tailoring webapp", bold: true },
                    { text: " with a React 19 + TypeScript frontend and a Node.js API server that ingests " },
                    { text: "DOCX, PDF, LaTeX, and plain-text", bold: true },
                    { text: " resumes and round-trips polished drafts back to each input format." },
                ],
            },
            {
                segments: [
                    { text: "Designed a " },
                    { text: "multi-provider AI layer", bold: true },
                    { text: " supporting " },
                    { text: "10 backends", bold: true },
                    { text: " (OpenAI Responses, Anthropic Messages, Gemini, OpenRouter, Groq, Together, Mistral, local Ollama) plus " },
                    { text: "subscription-CLI providers", bold: true },
                    { text: " (Claude Code, Codex CLI) that route through existing subscriptions instead of per-token API billing." },
                ],
            },
            {
                segments: [
                    { text: "Implemented " },
                    { text: "fit scoring", bold: true },
                    { text: " across keyword coverage, bullet quality, structure, and concision; " },
                    { text: "4-category keyword-gap analysis", bold: true },
                    { text: " (experience, knowledge, required skills, technical tools); a " },
                    { text: "before/after line-level diff", bold: true },
                    { text: "; and a " },
                    { text: "deterministic local rewriter", bold: true },
                    { text: " as a fallback when AI providers fail." },
                ],
            },
            {
                segments: [
                    { text: "Built a " },
                    { text: "LaTeX export pipeline", bold: true },
                    { text: " with three resume templates (Jake's, Awesome-CV, Deedy) supporting " },
                    { text: "one-click Overleaf submission", bold: true },
                    { text: " via form POST and optional local PDF compile through " },
                    { text: "Tectonic", bold: true },
                    { text: "; " },
                    { text: "DOCX export preserves uploaded formatting", bold: true },
                    { text: " through direct OpenXML paragraph edits." },
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
                    { text: "Collaborated directly with physicians and staff to troubleshoot " },
                    { text: "EHR, scheduling, and clinical workflow issues", bold: true },
                    { text: " in a high-volume cardiovascular clinic." },
                ],
            },
            {
                segments: [
                    { text: "Led an " },
                    { text: "Electronic Health Record (EHR) migration", bold: true },
                    { text: ", ensuring accurate data transfer, validation, and integration with minimal disruption to daily operations." },
                ],
            },
            {
                segments: [
                    { text: "Identified patient flow bottlenecks during intake and testing workflows; proposed and implemented a revised " },
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
                    { text: " that preserved the simplicity of the clinic's existing process while enabling " },
                    { text: "concurrent scheduling", bold: true },
                    { text: " and improving visibility across staff." },
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
                    { text: "Reinforced " },
                    { text: "object-oriented programming and data-structure concepts", bold: true },
                    { text: ", improving student code quality and conceptual understanding." },
                ],
            },
            {
                segments: [
                    { text: "Guided " },
                    { text: "debugging and algorithmic problem-solving", bold: true },
                    { text: " with a focus on efficiency, correctness, and readability." },
                ],
            },
        ],
    },
];

export const RESUME_SKILLS = [
    { label: "Languages", value: "Python, Java, C++, JavaScript, TypeScript, SQL, HTML/CSS" },
    { label: "Frontend", value: "React, TypeScript, Vite, React Query, React Router, Tailwind CSS" },
    { label: "Backend", value: "Django, Django REST Framework, Node.js, REST APIs, JWT + CSRF auth" },
    { label: "Data & Storage", value: "PostgreSQL, Cloudflare R2 / S3-compatible object storage" },
    { label: "Tooling & Deployment", value: "Git, GitHub, Docker, Docker Compose, Render, Vercel, ESLint, Prettier" },
];
