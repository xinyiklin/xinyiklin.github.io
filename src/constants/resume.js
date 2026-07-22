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
                    { text: "Designed and deployed a clinic platform with two React clients, a Django REST backend, PostgreSQL, and " },
                    { text: "240+ documented OpenAPI operations", bold: true },
                    { text: "; generated shared TypeScript API contracts to prevent client-server drift." },
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
                    { text: " across two React apps and the Django backend, running lint, typecheck, build, and migration gates plus " },
                    { text: "480+ Django tests", bold: true },
                    { text: " for auth, validation, and facility isolation." },
                ],
            },
        ],
    },
    {
        name: "RoleFit AI",
        stack: "TypeScript, React 19, Node.js, Electron, IPC, CLI process orchestration",
        links: [{ label: "rolefit.xinyiklin.com", href: "https://rolefit.xinyiklin.com" }],
        bullets: [
            {
                segments: [
                    { text: "Designed a browser-primary local application with a loopback Node server and Electron companion, separating resume and job orchestration, provider management, and deterministic document rendering across explicit trust boundaries." },
                ],
            },
            {
                segments: [
                    { text: "Integrated three provider-owned CLI sessions plus optional OpenAI and Claude API connections through " },
                    { text: "typed IPC", bold: true },
                    { text: "; encrypted API keys with OS safeStorage and isolated provider credentials from browser and HTTP boundaries." },
                ],
            },
            {
                segments: [
                    { text: "Hardened a fail-closed " },
                    { text: "Distill - Tailor - Review", bold: true },
                    { text: " workflow with prompt-injection fencing, grounded-output sanitization, request cancellation, and " },
                    { text: "30+ offline regression evals", bold: true },
                    { text: "." },
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
                    { text: " on a deterministic typesetting engine with " },
                    { text: "client-side PDF export", bold: true },
                    { text: "; 633,456 shaping checks verify identical font metrics across the editor and PDF for 18 font faces." },
                ],
            },
            {
                segments: [
                    { text: "Implemented direct editing on the engine-rendered page with a structured document model, full undo/redo history, and a strict versioned " },
                    { text: ".resume", bold: true },
                    { text: " file format with autosave." },
                ],
            },
            {
                segments: [
                    { text: "Extracted the engine and editor into shared " },
                    { text: "npm workspace packages", bold: true },
                    { text: " powering Typeset and RoleFit, then deployed Typeset with " },
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
                    { text: "Translate recurring " },
                    { text: "EHR, scheduling, and clinical workflow issues", bold: true },
                    { text: " into concrete requirements and troubleshooting steps for physicians and staff in a high-volume cardiovascular clinic." },
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
                    { text: "Redesigned room assignments after analyzing intake and testing bottlenecks, " },
                    { text: "reducing patient wait times by over 50%", bold: true },
                    { text: " and improving clinic throughput." },
                ],
            },
        ],
    },
];

export const RESUME_SKILLS = [
    { label: "Languages", value: "Python, TypeScript, JavaScript, C++, SQL, HTML/CSS" },
    { label: "Frameworks & Runtime", value: "React, Django REST Framework, Node.js, Electron, REST APIs, OpenAPI" },
    { label: "Data & Cloud", value: "PostgreSQL, AWS (Amplify, RDS, EC2), Cloudflare R2, Render" },
    { label: "Testing & Quality", value: "Django TestCase, GitHub Actions CI, ESLint, TypeScript typecheck, regression evals" },
    { label: "Tooling", value: "Git, Docker, Vite, React Query, React Router, Tailwind CSS" },
];
