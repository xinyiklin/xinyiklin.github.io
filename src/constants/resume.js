// Resume content mirrors the Typeset .resume source (general SDE resume,
// ../role-fit-ai/apps/role-fit-ai/job-search-workspace/base-resume-general-sde.resume).
// Keep this file and the .resume in sync when content changes.

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
                    { text: " clinic platform with " },
                    { text: "250+ API endpoints", bold: true },
                    { text: " for scheduling, charting, billing, and patient records — frontend on " },
                    { text: "AWS Amplify", bold: true },
                    { text: ", PostgreSQL on " },
                    { text: "Amazon RDS", bold: true },
                    { text: "." },
                ],
            },
            {
                segments: [
                    { text: "Implemented clinician and patient workflows with " },
                    { text: "role-based access", bold: true },
                    { text: " scoped to org and facility, audit logging on sensitive actions, and Fernet-encrypted SSNs." },
                ],
            },
            {
                segments: [
                    { text: "Maintained " },
                    { text: "GitHub Actions CI", bold: true },
                    { text: " across two React apps and the Django backend, running lint, typecheck, and migration checks plus " },
                    { text: "400+ Django tests", bold: true },
                    { text: " for auth, validation, and facility isolation." },
                ],
            },
        ],
    },
    {
        name: "RoleFit AI",
        stack: "React 19, TypeScript, Vite, Node.js, LLM APIs, WebExtensions",
        links: [{ label: "xinyiklin.com/rolefit-ai", href: "https://xinyiklin.com/rolefit-ai/" }],
        bullets: [
            {
                segments: [
                    { text: "Built an " },
                    { text: "AI resume-tailoring workbench", bold: true },
                    { text: " on the Typeset engine that grounds every suggested edit in the user's real experience and surfaces it as reviewable diffs — enforced by prompt-injection fencing, output sanitization, and an " },
                    { text: "offline anti-fabrication eval suite", bold: true },
                    { text: "." },
                ],
            },
            {
                segments: [
                    { text: "Designed a " },
                    { text: "recruiter-style review engine", bold: true },
                    { text: " that scores resume-to-role fit and refuses to score above what the resume evidences, across " },
                    { text: "10+ hosted, local, and CLI AI providers", bold: true },
                    { text: "." },
                ],
            },
            {
                segments: [
                    { text: "Shipped a companion " },
                    { text: "Chrome/Firefox extension", bold: true },
                    { text: " that scores any job posting against the base resume in-page and imports it in one click." },
                ],
            },
        ],
    },
    {
        name: "Typeset",
        stack: "React 19, TypeScript, Vite, pdf-lib, npm workspaces, Docker, AWS EC2, GitHub Actions",
        links: [{ label: "typeset.xinyiklin.com", href: "https://typeset.xinyiklin.com" }],
        bullets: [
            {
                segments: [
                    { text: "Built a " },
                    { text: "WYSIWYG resume editor", bold: true },
                    { text: " on a from-scratch " },
                    { text: "deterministic typesetting engine", bold: true },
                    { text: " with " },
                    { text: "client-side PDF export", bold: true },
                    { text: "; the editor and the exported PDF render glyph-identically, verified by an automated font-parity suite." },
                ],
            },
            {
                segments: [
                    { text: "Implemented direct editing on the engine-rendered page — structured document model, full undo/redo history, and a strict versioned " },
                    { text: ".resume", bold: true },
                    { text: " file format with autosave." },
                ],
            },
            {
                segments: [
                    { text: "Extracted the engine and editor into shared " },
                    { text: "npm workspace packages", bold: true },
                    { text: " powering two production apps, deployed with " },
                    { text: "Docker + GitHub Actions", bold: true },
                    { text: " to " },
                    { text: "AWS EC2", bold: true },
                    { text: "." },
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
];

export const RESUME_SKILLS = [
    { label: "Languages", value: "Python, C++, JavaScript, TypeScript, SQL, HTML/CSS" },
    { label: "Frontend", value: "React, Vite, React Query, React Router, Tailwind CSS" },
    { label: "Backend & Data", value: "Django REST Framework, Node.js, REST APIs, OpenAPI, JWT/CSRF auth, PostgreSQL" },
    { label: "Testing & Quality", value: "Django TestCase, GitHub Actions CI, ESLint, TypeScript typecheck, regression evals" },
    { label: "Tooling & Cloud", value: "Git, Docker, AWS (Amplify, RDS, EC2), Render, Cloudflare R2" },
];
