export const PROJECTS_DATA = [
  {
    id: "careflow",
    name: "CareFlow",
    meta: "Healthcare Operations Platform | React, Django REST, PostgreSQL",
    role: "Full-stack product build",
    year: "2026",
    status: "Live demo",
    accent: "#0f766e",
    description:
      "A production-minded clinic workflow app for scheduling, patient registration, document management, and facility administration. CareFlow is organized around real product areas, synthetic demo data, facility-scoped access, and operational UI patterns that feel closer to a clinic workspace than a basic CRUD sample.",
    metrics: [
      { value: "8", label: "workflow areas" },
      { value: "Facility-scoped", label: "API access" },
      { value: "Synthetic", label: "demo data only" },
    ],
    quality: [
      {
        title: "Feature boundaries",
        body: "Scheduling, documents, admin, auth, patients, and permissions are separated into product-owned frontend and backend areas.",
      },
      {
        title: "Facility-scoped API",
        body: "Django REST endpoints keep clinic data and admin actions scoped to the selected facility.",
      },
      {
        title: "Secure auth",
        body: "Short-lived access tokens, HTTP-only refresh cookies, permission checks, and masked sensitive fields shape the auth boundary.",
      },
      {
        title: "Demo-safe data",
        body: "The public demo uses synthetic clinic records, so reviewers can explore workflows without exposing real patient data.",
      },
      {
        title: "Verified UI",
        body: "Browser QA and targeted frontend checks cover key scheduling, document, and admin workflows.",
      },
    ],
    highlights: [
      {
        title: "Configurable scheduling",
        body:
          "Facility-local appointment views with visit types, rooms, resources, blocks, and status configuration.",
      },
      {
        title: "Patient and document workflows",
        body:
          "Smart patient search, Quick Start registration, a modal Patient Hub, uploads, previews, downloads, and selected-document PDF export.",
      },
      {
        title: "Admin and permissions",
        body:
          "Organization and facility tools for staff, roles, permissions, appointment settings, document categories, and pharmacy preferences.",
      },
      {
        title: "Secure-by-default auth",
        body:
          "Short-lived access tokens, HTTP-only refresh cookies, masked sensitive fields, and permission-aware API boundaries.",
      },
    ],
    tech: ["React 19", "Django REST Framework", "PostgreSQL", "React Query", "Tailwind CSS v4", "Simple JWT"],
    github: "https://github.com/xinyiklin/careflow",
    live: "https://careflow.xinyiklin.com/",
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
