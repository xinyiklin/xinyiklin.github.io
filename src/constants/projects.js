export const PROJECTS_DATA = [
  {
    id: "careflow",
    name: "CareFlow",
    tagline: "EHR-style clinic workspace, built end to end.",
    meta: "Clinic Workflow Platform | React, Django REST, PostgreSQL",
    role: "Full-stack build",
    year: "2026",
    status: "Live demo",
    accent: "#0f766e",
    description:
      "A practice-grade demo for clinic operations: scheduling, patient records, clinical charting, billing, documents, and facility administration. Synthetic data only. Facility-scoped APIs. SSN encrypted at rest.",
    areas: [
      "Scheduling",
      "Patient hub",
      "Clinical charting",
      "Documents",
      "Medications",
      "Allergies",
      "Billing",
      "Facility admin",
    ],
    metrics: [
      { value: "8", label: "feature areas" },
      { value: "Facility-scoped", label: "API access" },
      { value: "SSN encrypted", label: "at rest" },
    ],
    quality: [
      {
        title: "Feature boundaries",
        body: "Scheduling, patient hub, clinical charting, billing, documents, admin, auth, and permissions are separated into clear product areas.",
      },
      {
        title: "Facility-scoped API",
        body: "Django REST endpoints keep clinic data, audit events, and admin actions scoped to the active facility.",
      },
      {
        title: "Secure auth",
        body: "Short-lived access tokens, HTTP-only refresh cookies, CSRF on cookie-backed routes, and a permission matrix at org and facility scope.",
      },
      {
        title: "Demo-safe data",
        body: "Synthetic clinic records, SSN encrypted with Fernet, masked sensitive fields, and audit events for sensitive mutations.",
      },
      {
        title: "Verified UI",
        body: "Browser QA covers scheduling, patient hub, charting, documents, billing, and admin workflows.",
      },
    ],
    highlights: [
      {
        title: "Configurable scheduling",
        body:
          "Facility-local calendars with visit types, rooms, resources, blocks, reschedule guards, heatmap, and per-day interval customization.",
      },
      {
        title: "Patient hub and charting",
        body:
          "Smart search, Quick Start registration, masked SSN reveal, medications and allergies, SOAP progress notes per encounter, and a patient timeline.",
      },
      {
        title: "Billing and documents",
        body:
          "Encounter-linked superbills backed by a CPT catalog, organization fee schedules with payer overrides, patient-scoped uploads, and combined PDF export.",
      },
      {
        title: "Admin, permissions, hardening",
        body:
          "Staff, roles, payers, pharmacies, and fee schedules under org and facility admin; permission matrix; audit events; SSN encrypted at rest.",
      },
    ],
    tech: ["React 19", "Vite", "Django", "Django REST Framework", "PostgreSQL", "React Query", "Tailwind CSS", "Material UI", "Simple JWT"],
    github: "https://github.com/xinyiklin/careflow",
    live: "https://careflow.xinyiklin.com/",
    sectionId: "#projects"
  },
  {
    id: "role-fit-ai",
    name: "RoleFit AI",
    tagline: "Local-first resume tailoring, without invented experience.",
    role: "Full-stack build",
    year: "2026",
    status: "Source available",
    accent: "#7c3aed",
    description:
      "A local-first web app that scores a resume against a target job description and drafts a polished version without inventing employers, dates, metrics, or tools. AI is optional; a deterministic local rewrite is the offline fallback.",
    notes: [
      {
        title: "Local-first by design",
        body:
          "Paste a job link and description, then upload or auto-load a base resume from a local workspace. Personal data stays on disk, out of any repo or remote service.",
      },
      {
        title: "Score, polish, review",
        body:
          "Quantifies keyword fit, bullet quality, action verbs, metrics, and section structure. Strict review surfaces recruiter-style audit notes. A deterministic local rewrite stands in when the AI call cannot run.",
      },
      {
        title: "ATS-friendly export",
        body:
          "Three LaTeX templates render the polished draft into a single-page PDF or .tex. Copy plain text for in-app editing, or hand the .tex to a local Tectonic install for an offline PDF.",
      },
    ],
    tech: ["React 19", "TypeScript", "Vite", "Node", "Multi-provider AI", "LaTeX templates"],
    github: "https://github.com/xinyiklin/rolefit-ai",
    live: null,
    sectionId: "#projects"
  },
  {
    id: "catch-the-ball",
    name: "Catch the Ball",
    meta: "Game Engine Development | C++, OpenGL, GLFW",
    role: "Graphics and gameplay systems",
    year: "Course project",
    status: "Source available",
    accent: "#c2410c",
    description:
      "A compact 2D arcade game built in C++ with OpenGL rendering and GLFW input. The project focuses on the fundamentals that make games feel responsive: frame updates, collision checks, keyboard control, score state, and a repeatable CMake build.",
    metrics: [
      { value: "C++17", label: "core language" },
      { value: "OpenGL", label: "rendering layer" },
      { value: "CMake", label: "build pipeline" },
    ],
    highlights: [
      {
        title: "Responsive controls",
        body:
          "Mapped GLFW keyboard input to smooth paddle movement for immediate game feedback.",
      },
      {
        title: "Gameplay loop",
        body:
          "Implemented ball movement, collision checks, scoring, and increasing challenge in C++17.",
      },
      {
        title: "Rendering pipeline",
        body:
          "Used OpenGL and STB assets for real-time 2D graphics with clear frame-by-frame updates.",
      },
      {
        title: "Portable setup",
        body:
          "Kept the project buildable through a CMake pipeline instead of relying on IDE-specific setup.",
      },
    ],
    tech: ["C++", "OpenGL", "GLFW", "CMake", "STB"],
    github: "https://github.com/xinyiklin/catch-the-ball",
    live: null,
    sectionId: "#projects"
  },
  {
    id: "personal-portfolio",
    name: "Portfolio",
    meta: "Personal Branding | React, Bootstrap, Vite",
    role: "Frontend presentation system",
    year: "2026",
    status: "Live site",
    accent: "#4f46e5",
    description:
      "A fast personal portfolio for presenting software engineering work with focused project narratives, accessible navigation, and lightweight React components. The site keeps the content easy to scan while giving each project room to explain the engineering decisions behind it.",
    metrics: [
      { value: "Vite", label: "frontend tooling" },
      { value: "Responsive", label: "mobile-first layout" },
      { value: "SEO", label: "clean metadata path" },
    ],
    highlights: [
      {
        title: "Project-first content",
        body:
          "Centralized project data keeps navigation, carousel state, and case-study copy aligned.",
      },
      {
        title: "Fast React surface",
        body:
          "Vite and reusable components keep the site quick to build, preview, and deploy.",
      },
      {
        title: "Accessible navigation",
        body:
          "Top navigation, project switching, and external actions are structured for keyboard and screen-reader use.",
      },
      {
        title: "Personal branding",
        body:
          "Custom favicon, resume link, contact paths, and concise copy support recruiter review.",
      },
    ],
    tech: ["React", "Bootstrap", "Vite", "Lucide React"],
    github: "https://github.com/xinyiklin/xinyiklin.github.io",
    live: "https://xinyiklin.com",
    sectionId: "#projects"
  }
];
