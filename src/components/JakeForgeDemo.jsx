import { useState } from "react";
import { FileCode2, FileDown, Printer } from "lucide-react";
import { PROJECT_LINKS } from "../constants/projects";

// JakeForge — an interactive, fake-data mock of the Jake's-style resume editor.
// The sidebar mirrors the real app's controls (exports, spacing presets,
// heading case, zoom); the page is the real resume condensed into the Jake
// template layout and editable directly on the page, like the live app. The
// export buttons link to the live app, where the real pipelines run.

// Spacing presets set the document's rhythm via CSS custom properties, the
// same lever the real app's Compact/Normal/Relaxed presets pull.
const JF_SPACING = {
  Compact: { "--jf-lh": 1.28, "--jf-sec": "0.34rem", "--jf-entry": "0.22rem" },
  Normal: { "--jf-lh": 1.42, "--jf-sec": "0.55rem", "--jf-entry": "0.34rem" },
  Relaxed: { "--jf-lh": 1.58, "--jf-sec": "0.8rem", "--jf-entry": "0.5rem" },
};
const JF_CASES = [
  { id: "sc", label: "Small caps" },
  { id: "upper", label: "Uppercase" },
  { id: "plain", label: "Normal" },
];
const JF_ZOOMS = [80, 90, 100, 110, 125];

// Mirrors src/constants/resume.js (the LaTeX source of truth) — same section
// order, condensed to one tight line per bullet for the demo. Keep in sync if
// resume.js changes.
const JF_RESUME = {
  name: "Xinyi Lin",
  contact: ["xinyiklin@gmail.com", "linkedin.com/in/xinyiklin", "github.com/xinyiklin", "New York, NY"],
  sections: [
    {
      heading: "Education",
      entries: [
        { title: "Hunter College, CUNY", side: "May 2024", sub: "B.A. in Computer Science · Daedalus Honors Scholar", subSide: "New York, NY", bullets: [] },
      ],
    },
    {
      heading: "Technical Skills",
      entries: [
        { title: "Languages", sub: "Python, C++, JavaScript, TypeScript, SQL, HTML/CSS", skill: true },
        { title: "Tooling & Cloud", sub: "Git, Docker, AWS (Amplify, RDS, EC2), Render, Cloudflare R2", skill: true },
      ],
    },
    {
      heading: "Projects",
      entries: [
        {
          title: "CareFlow",
          side: "careflow.xinyiklin.com",
          sub: "React 19 · Django REST · PostgreSQL · AWS",
          bullets: ["Clinic platform: 10+ apps, 45+ models, 250+ endpoints, 400+ Django tests in CI."],
        },
        {
          title: "RoleFit AI",
          side: "xinyiklin.com/rolefit-ai",
          sub: "React 19 · Node.js · LLM APIs",
          bullets: ["Local-first resume tailor that scores fit to a posting without inventing experience."],
        },
        {
          title: "JakeForge",
          side: "jakeforge.xinyiklin.com",
          sub: "React 19 · Node.js · Docker · AWS EC2",
          bullets: ["This editor: LaTeX/Tectonic export pipeline, DOCX import, Dockerized EC2 deploy."],
        },
      ],
    },
    {
      heading: "Experience",
      entries: [
        {
          title: "Clinic Operations & IT Assistant",
          side: "Mar 2023 – Present",
          sub: "Colden Heart Center",
          subSide: "Queens, NY",
          bullets: [
            "Translated recurring EHR, scheduling, and clinical workflow issues into practical requirements.",
            "Revised the room-assignment process, reducing patient wait times by over 50%.",
          ],
        },
        {
          title: "Teaching Assistant — Intro Java",
          side: "Jul – Aug 2022",
          sub: "Hunter College",
          subSide: "New York, NY",
          bullets: ["Supported intro Java students through labs, code reviews, and debugging."],
        },
      ],
    },
  ],
};

const JF_EXPORTS = [
  { label: "PDF · LaTeX", icon: FileDown },
  { label: "LaTeX source", icon: FileCode2 },
  { label: "Clean PDF", icon: Printer },
];
const JF_SPACING_OPTS = Object.keys(JF_SPACING).map((k) => ({ id: k, label: k }));
const JF_LIVE = PROJECT_LINKS.jakeforge.live;

function Seg({ options, value, onChange, label }) {
  return (
    <div className="jf-seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={o.id === value ? "jf-seg-btn is-active" : "jf-seg-btn"}
          aria-pressed={o.id === value}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function JakeForgeDemo() {
  const [preset, setPreset] = useState("Normal");
  const [hCase, setHCase] = useState("sc");
  const [zoom, setZoom] = useState(100);
  // Bumping the key remounts the contentEditable page, restoring the original
  // content after destructive edits (React never rewrites the edited subtree).
  const [docKey, setDocKey] = useState(0);

  return (
    <div className="jf-app">
      <aside className="jf-side">
        <div className="jf-group">
          <p className="jf-group-head">Export</p>
          {JF_EXPORTS.map(({ label, icon: Icon }) => (
            <a key={label} className="jf-export" href={JF_LIVE} target="_blank" rel="noreferrer">
              <Icon size={13} aria-hidden="true" /> {label}
            </a>
          ))}
        </div>
        <div className="jf-group">
          <p className="jf-group-head">Spacing</p>
          <Seg options={JF_SPACING_OPTS} value={preset} onChange={setPreset} label="Spacing preset" />
        </div>
        <div className="jf-group">
          <p className="jf-group-head">Headings</p>
          <Seg options={JF_CASES} value={hCase} onChange={setHCase} label="Heading case" />
        </div>
        <div className="jf-group">
          <p className="jf-group-head">Zoom</p>
          <select className="jf-zoom-select" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} aria-label="Page zoom">
            {JF_ZOOMS.map((z) => (
              <option key={z} value={z}>{z}%</option>
            ))}
          </select>
        </div>
        <p className="jf-hint">Click the page to edit</p>
        <button type="button" className="jf-reset" onClick={() => setDocKey((k) => k + 1)}>
          Reset page
        </button>
      </aside>

      <div className="jf-doc-wrap">
        <div
          key={docKey}
          className={`jf-doc jf-case-${hCase}`}
          style={{ ...JF_SPACING[preset], zoom: zoom / 100 }}
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          role="textbox"
          aria-multiline="true"
          aria-label="Editable resume page"
        >
          <h3 className="jf-name">{JF_RESUME.name}</h3>
          <p className="jf-contact">{JF_RESUME.contact.join("  |  ")}</p>
          {JF_RESUME.sections.map((sec) => (
            <section key={sec.heading} className="jf-sec">
              <h4 className="jf-sec-title">{sec.heading}</h4>
              {sec.entries.map((e) =>
                e.skill ? (
                  <p key={e.title} className="jf-skill">
                    <strong>{e.title}:</strong> {e.sub}
                  </p>
                ) : (
                  <div key={e.title} className="jf-entry">
                    <div className="jf-line">
                      <strong>{e.title}</strong>
                      {e.side && <span className="jf-side-txt">{e.side}</span>}
                    </div>
                    {e.sub && (
                      <div className="jf-line jf-line--sub">
                        <em>{e.sub}</em>
                        {e.subSide && <span className="jf-side-txt">{e.subSide}</span>}
                      </div>
                    )}
                    {!!e.bullets?.length && (
                      <ul className="jf-bullets">
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
