// Resume content mirrors the Typeset .resume source (general SDE resume,
// ../role-fit-ai/apps/role-fit-ai/workspace/resumes/general-sde.resume).
// RoleFit is canonical; update its general resume first, then sync this mirror.
// Section order follows the source: Skills, Projects, Experience, Education.
// The source's phone number is intentionally left off this public site.

export const RESUME_HEADER = {
    name: "Xinyi (Kevin) Lin",
    location: "Queens, NY",
    links: [
        { label: "xinyiklin@gmail.com", href: "mailto:xinyiklin@gmail.com" },
        { label: "linkedin.com/in/xinyiklin", href: "https://www.linkedin.com/in/xinyiklin" },
        { label: "github.com/xinyiklin", href: "https://github.com/xinyiklin" },
    ],
};

export const RESUME_SKILLS = [
    { label: "Languages", value: "Python, TypeScript, JavaScript, SQL, Java" },
    { label: "Frontend", value: "React, React Query, HTML/CSS, Tailwind CSS" },
    { label: "Backend & Data", value: "Django, Django REST Framework, Node.js, PostgreSQL, REST APIs, OpenAPI" },
    { label: "Cloud & DevOps", value: "AWS (Amplify, EC2), Docker, GitHub Actions" },
    { label: "Development & Testing", value: "Git, Django TestCase, Codex, Claude Code" },
];

export const RESUME_PROJECTS = [
    {
        name: "CareFlow",
        dates: "Apr 2026 – Present",
        stack: "React, TypeScript, Django REST Framework, PostgreSQL",
        links: [
            { label: "careflow.xinyiklin.com", href: "https://careflow.xinyiklin.com" },
        ],
        bullets: [
            { segments: [{ text: "Built a full-stack healthcare app inspired by clinic workflows, connecting staff scheduling, patient records, and a patient booking portal." }] },
            { segments: [{ text: "Implemented duration-aware appointment conflict checks with transactional database locking, allowing staff-confirmed overlaps while rejecting conflicting patient bookings." }] },
            { segments: [{ text: "Enforced backend permissions and patient/facility-scoped access checks for booking workflows." }] },
            { segments: [{ text: "Generated TypeScript types from Django OpenAPI schemas; CI fails on API contract drift and runs 480+ Django tests against PostgreSQL." }] },
        ],
    },
    {
        name: "Machine Bootstrap",
        dates: "Jul 2026 – Present",
        stack: "Node.js, JavaScript, GitHub Actions",
        links: [
            { label: "github.com/xinyiklin/machine-bootstrap", href: "https://github.com/xinyiklin/machine-bootstrap" },
        ],
        bullets: [
            { segments: [{ text: "Built a Node.js CLI that standardizes Claude Code and Codex setup across repositories from shared workflows." }] },
            { segments: [{ text: "Added pre-installation checks and non-overwriting installs that preserve customized files; wrote 90+ filesystem regression tests and configured CI for Linux, Windows, and macOS." }] },
        ],
    },
    {
        name: "RoleFit AI",
        dates: "May 2026 – Present",
        stack: "React, TypeScript, Node.js, Electron, LLM APIs",
        links: [
            { label: "rolefit.xinyiklin.com", href: "https://rolefit.xinyiklin.com" },
        ],
        bullets: [
            { segments: [{ text: "Built a local-first workspace that tailors resumes and cover letters with API and CLI AI providers, flags edits unsupported by the candidate's resume or profile, and applies changes only after user approval." }] },
            { segments: [{ text: "Benchmarked prompts and models on real job applications with blinded pairwise judging by two model families and per-edit fact checks; 140+ offline evals run without network access." }] },
            { segments: [{ text: "Extracted shared document-engine and React editor packages in an npm-workspaces monorepo, powering RoleFit and the standalone Typeset resume editor with deterministic layout and PDF export." }] },
        ],
    },
];

export const RESUME_EXPERIENCE = [
    {
        role: "Clinic Operations & IT Assistant",
        org: "Colden Heart Center",
        location: "Queens, NY",
        dates: "Mar 2023 – Present",
        bullets: [
            { segments: [{ text: "Led an EHR migration, coordinating data transfer, validation checks, and staff workflow continuity." }] },
            { segments: [{ text: "Troubleshoot EHR and scheduling issues with physicians and staff, translating workflow problems into requirements and explaining fixes to non-technical users." }] },
            { segments: [{ text: "Redesigned room assignments to address intake and testing bottlenecks and improve patient flow." }] },
        ],
    },
    {
        role: "Undergraduate Teaching Assistant",
        org: "Hunter College",
        location: "New York, NY",
        dates: "Jul 2022 – Aug 2022",
        bullets: [
            { segments: [{ text: "Supported Java and object-oriented programming instruction through office hours and debugging guidance." }] },
        ],
    },
];

export const RESUME_EDUCATION = [
    {
        school: "City University of New York, Hunter College",
        degree: "Bachelor of Arts in Computer Science, Daedalus Honors Scholar",
        location: "New York, NY",
        dates: "May 2024",
    },
];
