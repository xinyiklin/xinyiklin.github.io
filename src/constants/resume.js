// Generated from the Typeset base resume by scripts/sync-resume.mjs
// (npm run resume:sync). Edit the source, not this file:
// ../role-fit-ai/apps/role-fit-ai/workspace/resumes/default.resume
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
            { segments: [{ text: "Built a full-stack healthcare app connecting clinic staff scheduling, patient records, and a patient booking portal." }] },
            { segments: [{ text: "Implemented duration-aware appointment conflict checks, re-run under a facility-row lock (select_for_update) in one transaction; patient bookings reject conflicts, while staff can confirm intentional overlaps." }] },
            { segments: [{ text: "Scoped backend access by patient and facility; bookings derive patient identity from the signed-in account." }] },
            { segments: [{ text: "Generated TypeScript types from the OpenAPI schema (240+ operations); CI fails on drift and runs 480+ tests." }] },
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
            { segments: [{ text: "Built a local-first job-application workspace that tailors resumes and cover letters with API and CLI AI providers, flags edits unsupported by the candidate's resume or profile, and applies only user-approved changes." }] },
            { segments: [{ text: "Benchmarked prompts and models on personal job applications with blinded pairwise judging by two model families and per-edit fact checks; 170+ offline evals run without network access." }] },
            { segments: [{ text: "Hardened the loopback-bound Node.js server started by an Electron companion, with Host/Origin checks against CSRF and DNS rebinding; the browser extension connects only after the user approves pairing." }] },
            { segments: [{ text: "Extracted shared document-engine and React editor packages in an npm-workspaces monorepo, powering RoleFit and the standalone Typeset resume editor with deterministic layout and PDF export." }] },
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
            { segments: [{ text: "Built a Node.js CLI and reusable agent skills that set up Claude Code and Codex across independent repositories, seeding, syncing, and auditing each project's agent guidance without overwriting local edits." }] },
            { segments: [{ text: "Generated Claude Code and Codex agents from shared role contracts for a plan–implement–verify workflow." }] },
            { segments: [{ text: "Pinned third-party skills to exact upstream revisions and SHA-256 content hashes, rejecting drifted content before installation; wrote 110+ filesystem regression tests and configured CI for Linux, Windows, and macOS." }] },
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
