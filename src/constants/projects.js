export const PROJECTS_DATA = [
  {
    id: "careflow",
    name: "CareFlow",
    meta: "Clinical Workflow Management • React, Django, PostgreSQL",
    description:
      "A full-stack healthcare workflow platform built to manage scheduling, patient records, and facility-level configurations. Designed with a focus on data integrity, responsive UI, and real-world clinical workflows.",
    highlights: [
      "Interactive day-view scheduler with real-time updates",
      "Modal-driven CRUD workflows for patients and appointments",
      "Facility-based configuration for statuses, visit types, and metadata",
      "Optimized server-state handling using React Query",
    ],
    tech: ["React", "Django", "PostgreSQL", "React Query", "Tailwind CSS"],
    github: "https://github.com/xinyiklin/careflow",
    live: "https://careflow.xinyiklin.com/",
    sectionId: "#projects"
  },
  {
    id: "catch-the-ball",
    name: "Catch the Ball",
    meta: "Game Engine Development • C++, OpenGL, GLFW",
    description:
      "A simple 2D game engine created as a course project for Hunter College. Features real-time paddle movement, dynamic physics-based ball falling, and score tracking with increasing difficulty.",
    highlights: [
      "Developed responsive paddle controls using GLFW keyboard input handling",
      "Implemented dynamic ball movement and collision logic with C++17",
      "Integrated OpenGL and STB libraries for real-time graphics rendering",
      "Built a cross-platform compilation pipeline using CMake"
    ],
    tech: ["C++", "OpenGL", "GLFW", "CMake", "STB"],
    github: "https://github.com/xinyiklin/catch-the-ball",
    live: null,
    sectionId: "#projects"
  },
  {
    id: "personal-portfolio",
    name: "Portfolio",
    meta: "Personal Branding • React, Bootstrap, Vite",
    description:
      "A high-performance personal portfolio designed to showcase software engineering projects. Built with a focus on clean UI, SEO, and fast load times.",
    highlights: [
      "Custom adaptive SVG favicon with light/dark mode detection",
      "Centralized state management for project gallery",
      "Responsive navigation with custom-styled dropdowns",
      "Optimized for mobile-first user experience",
    ],
    tech: ["React", "Bootstrap", "Vite", "Lucide React"],
    github: "https://github.com/xinyiklin/xinyiklin.github.io",
    live: "https://xinyiklin.com",
    sectionId: "#projects"
  }
];
