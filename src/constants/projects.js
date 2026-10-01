export const PROJECT_LINKS = {
  careflow: {
    github: "https://github.com/xinyiklin/careflow",
    live: "https://careflow.xinyiklin.com/",
    // Both portals offer "Continue with Demo" on their sign-in pages.
    demos: [
      { label: "Clinician", href: "https://clinician.xinyiklin.com/" },
      { label: "Patient", href: "https://patient.xinyiklin.com/" },
    ],
  },
  rolefit: {
    github: "https://github.com/xinyiklin/rolefit-ai",
    live: "https://rolefit.xinyiklin.com/",
  },
  typeset: {
    // Typeset's source moved into the RoleFit AI monorepo; the standalone
    // typeset repository is retired and no longer builds the live app.
    github: "https://github.com/xinyiklin/rolefit-ai",
    live: "https://typeset.xinyiklin.com/",
  },
};
