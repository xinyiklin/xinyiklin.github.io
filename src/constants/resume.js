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
        stack: "React 19, TypeScript, Django REST Framework, PostgreSQL, React Query, Tailwind CSS v4",
        link: { label: "careflow.xinyiklin.com", href: "https://careflow.xinyiklin.com" },
        bullets: [
            {
                segments: [
                    { text: "Built and deployed a " },
                    { text: "React + Django REST", bold: true },
                    { text: " clinic platform spanning 14 domain apps, 45+ PostgreSQL models, and 60+ endpoints for scheduling, charting, billing, and patient records." },
                ],
            },
            {
                segments: [
                    { text: "Implemented clinician and patient workflows with " },
                    { text: "React Query", bold: true },
                    { text: " state management across 100+ mutations, cache invalidation paths, RBAC, audit logging, encrypted SSNs, JWT auth, and CSRF protection." },
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
        ],
    },
    {
        name: "RoleFit AI",
        stack: "React 19, TypeScript, Vite, Node.js, LLM APIs, LaTeX/Tectonic",
        link: null,
        bullets: [
            {
                segments: [
                    { text: "Built a " },
                    { text: "local-first React + Node.js", bold: true },
                    { text: " job-prep app with a structured WYSIWYG resume editor, Tectonic PDF compilation, and a multi-view application tracker; applied React.lazy code-splitting to cut initial JS from 906 kB to " },
                    { text: "480 kB", bold: true },
                    { text: "." },
                ],
            },
            {
                segments: [
                    { text: "Implemented a provider adapter layer for " },
                    { text: "12 AI backends", bold: true },
                    { text: " (hosted, local, and CLI) with schema-validated section-scoped edit suggestions, per-bucket fit scoring, and a deterministic local rewriter fallback." },
                ],
            },
            {
                segments: [
                    { text: "Hardened prompt/data paths with prompt-injection fencing, SSRF-protected job import, DOCX zip-slip validation, a 3-detector grounded-output sanitizer, and " },
                    { text: "38 offline regression evals", bold: true },
                    { text: " against fabricated skill claims." },
                ],
            },
        ],
    },
    {
        name: "Catch the Ball",
        stack: "C++17, OpenGL, GLFW, CMake",
        link: { label: "github.com/xinyiklin/catch-the-ball", href: "https://github.com/xinyiklin/catch-the-ball" },
        bullets: [
            {
                segments: [
                    { text: "Built a C++17 game engine course project with separate engine and game modules, GLFW window/input handling, OpenGL rendering, shaders, sprites, and CMake build configuration." },
                ],
            },
            {
                segments: [
                    { text: "Implemented menu state, keyboard controls, score tracking, collision detection, boundary checks, and increasing ball speed for a playable arcade-style game loop." },
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
                    { text: "Guided students through " },
                    { text: "algorithmic problem-solving", bold: true },
                    { text: ", correctness checks, and readable implementation patterns for introductory Java assignments." },
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
    { label: "Tooling & Cloud", value: "Git, Docker, CMake, OpenGL, GLFW, Render, Vercel, Cloudflare R2" },
];
