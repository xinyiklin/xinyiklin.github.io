// Resume content mirrors the Typeset .resume source (general SDE resume,
// ../role-fit-ai/apps/role-fit-ai/workspace/resumes/general-sde.resume).
// RoleFit is canonical; update its general resume first, then sync this mirror.

export const RESUME_HEADER = {
    name: "Xinyi (Kevin) Lin",
    location: "Queens, NY",
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
                    { text: "Built a clinic platform where three React clients share one " },
                    { text: "Django REST backend" },
                    { text: ", generating their TypeScript API types from " },
                    { text: "240+ documented OpenAPI operations" },
                    { text: " so contract drift fails the build instead of production." },
                ],
            },
            {
                segments: [
                    { text: "Scoped every clinician and patient workflow to an " },
                    { text: "organization and facility" },
                    { text: ", logged sensitive actions, encrypted SSNs with Fernet, and kept " },
                    { text: "refresh tokens in HTTP-only cookies" },
                    { text: " behind CSRF protection." },
                ],
            },
            {
                segments: [
                    { text: "Gated merges in " },
                    { text: "GitHub Actions" },
                    { text: " on lint, typecheck, build, migration, and API-contract drift across all four apps, backed by " },
                    { text: "480+ Django tests" },
                    { text: " covering auth, validation, and facility isolation." },
                ],
            },
        ],
    },
    {
        name: "RoleFit AI",
        stack: "TypeScript, React 19, Node.js, Electron, typed IPC, OpenAI and Claude APIs, agent CLIs",
        links: [
            { label: "rolefit.xinyiklin.com", href: "https://rolefit.xinyiklin.com" },
        ],
        bullets: [
            {
                segments: [
                    { text: "Built a " },
                    { text: "local-first workbench" },
                    { text: " that tailors a resume to a job posting in the browser, served by a loopback Node server with an Electron companion that keeps provider credentials off the browser and HTTP boundaries." },
                ],
            },
            {
                segments: [
                    { text: "Made the AI layer " },
                    { text: "provider-agnostic across five backends" },
                    { text: " (three account-backed agent CLIs plus the OpenAI and Claude APIs), so each of five prompt stages picks its own model and reasoning effort without pipeline changes." },
                ],
            },
            {
                segments: [
                    { text: "Kept generated text honest by fencing job-posting input against " },
                    { text: "prompt injection" },
                    { text: " and dropping any suggestion the resume does not support, with " },
                    { text: "105+ offline evals" },
                    { text: " exercising the pipeline without network access." },
                ],
            },
            {
                segments: [
                    { text: "Shipped a paired " },
                    { text: "browser extension" },
                    { text: " that imports a posting from the page in view, an application tracker for the lifecycle that follows, and macOS and Windows desktop builds as checksum-covered releases." },
                ],
            },
        ],
    },
    {
        name: "Typeset",
        stack: "React 19, TypeScript, Vite, pdf-lib, npm workspaces, Docker, AWS EC2, GitHub Actions",
        links: [
            { label: "typeset.xinyiklin.com", href: "https://typeset.xinyiklin.com" },
        ],
        bullets: [
            {
                segments: [
                    { text: "Built a " },
                    { text: "WYSIWYG resume editor" },
                    { text: " on a deterministic typesetting engine with " },
                    { text: "client-side PDF export" },
                    { text: "; 1,266,912 shaping checks verify editor/PDF shaping parity across 36 font faces." },
                ],
            },
            {
                segments: [
                    { text: "Made the rendered page directly editable over a structured document model with undo/redo history, autosave, and a strict versioned " },
                    { text: ".resume" },
                    { text: " format that rejects malformed input instead of guessing." },
                ],
            },
            {
                segments: [
                    { text: "Extracted the engine and editor into shared " },
                    { text: "npm workspace packages" },
                    { text: " that now power both Typeset and RoleFit, and shipped Typeset to " },
                    { text: "AWS EC2" },
                    { text: " with Docker and GitHub Actions." },
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
                    { text: "Turn recurring " },
                    { text: "EHR, scheduling, and clinical workflow problems" },
                    { text: " into concrete requirements and troubleshooting steps for physicians and staff at a high-volume cardiovascular clinic." },
                ],
            },
            {
                segments: [
                    { text: "Led an " },
                    { text: "EHR migration" },
                    { text: " end to end, coordinating data transfer, validation checks, staff workflow continuity, and production troubleshooting across clinic systems." },
                ],
            },
            {
                segments: [
                    { text: "Cut patient wait times by over 50%" },
                    { text: " by tracing intake and testing bottlenecks and redesigning room assignments around them." },
                ],
            },
        ],
    },
];

export const RESUME_SKILLS = [
    { label: "Languages", value: "Python, TypeScript, JavaScript, C++, SQL, HTML/CSS" },
    { label: "Frameworks & Runtime", value: "React, Django REST Framework, Node.js, Electron, REST APIs, OpenAPI" },
    { label: "Data & Cloud", value: "PostgreSQL, AWS (Amplify, EC2), Render, Cloudflare R2" },
    { label: "Testing & Quality", value: "Django TestCase, GitHub Actions CI, ESLint, TypeScript typecheck" },
    { label: "AI Tooling", value: "Claude Code, OpenAI Codex, Antigravity" },
    { label: "Tooling", value: "Git, Docker, Vite, React Query, React Router, Tailwind CSS" },
];
