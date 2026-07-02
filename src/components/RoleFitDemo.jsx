import { useMemo, useState } from "react";

// RoleFit AI — an interactive, fake-data mock of the local-first resume tailor.
// A left rail switches between four pages: Resume (a tailoring workspace with a
// live fit score), Materials (the source documents it draws from), Applications
// (a tracked pipeline), and Analytics (a small summary). No backend, no invented
// experience — the numbers are illustrative and derived in-component.

const RF_NAV = [
  { group: "Draft", items: [{ n: "01", id: "resume", label: "Resume" }, { n: "02", id: "materials", label: "Materials" }] },
  { group: "Track", items: [{ n: "03", id: "applications", label: "Applications" }, { n: "04", id: "analytics", label: "Analytics" }] },
];

const MODES = ["Tailor", "Include", "Off"];
const ZOOMS = [80, 90, 100, 110, 125, 150];

// Mirrors src/constants/resume.js (the LaTeX source of truth), condensed to one
// tight line per bullet for the demo. Keep in sync if resume.js changes.
const RESUME = {
  name: "Xinyi Lin",
  contact: ["xinyiklin@gmail.com", "linkedin.com/in/xinyiklin", "github.com/xinyiklin", "New York, NY"],
  sections: [
    {
      id: "education",
      heading: "Education",
      entries: [
        { title: "Hunter College, CUNY", side: "New York, NY", sub: "B.A. in Computer Science · Daedalus Honors Scholar", date: "May 2024", bullets: [] },
      ],
    },
    {
      id: "skills",
      heading: "Technical Skills",
      entries: [
        { title: "Languages", sub: "Python, C++, JavaScript, TypeScript, SQL, HTML/CSS", bullets: [] },
        { title: "Frontend", sub: "React, Vite, React Query, React Router, Tailwind CSS", bullets: [] },
        { title: "Backend & Data", sub: "Django REST, Node.js, REST APIs, OpenAPI, JWT/CSRF, PostgreSQL", bullets: [] },
        { title: "Testing & Quality", sub: "Django TestCase, GitHub Actions CI, ESLint, TypeScript, regression evals", bullets: [] },
        { title: "Tooling & Cloud", sub: "Git, Docker, AWS (Amplify, RDS, EC2), Render, Cloudflare R2", bullets: [] },
      ],
    },
    {
      id: "projects",
      heading: "Projects",
      entries: [
        {
          title: "CareFlow",
          sub: "React 19 · Django REST · PostgreSQL · AWS",
          date: "careflow.xinyiklin.com",
          bullets: [
            "Built and deployed a React + Django clinic platform: 10+ apps, 45+ models, 250+ endpoints, with the frontend on AWS Amplify and PostgreSQL on Amazon RDS.",
            "Role-based access scoped to org/facility, audit logging, Fernet-encrypted SSNs, and 400+ Django tests in CI.",
          ],
        },
        {
          title: "RoleFit AI",
          sub: "React 19 · Node.js · LLM APIs",
          date: "xinyiklin.com/rolefit-ai",
          bullets: [
            "Local-first resume tailor that scores fit to a posting without inventing experience — structured editor + Tectonic PDF export.",
            "Recruiter-style review engine over 10+ AI backends with grounded-output guards and 120+ anti-fabrication eval probes.",
          ],
        },
        {
          title: "JakeForge",
          sub: "React 19 · Node.js · Docker · AWS EC2",
          date: "jakeforge.xinyiklin.com",
          bullets: ["Jake's-style resume editor forked from RoleFit AI: LaTeX/Tectonic export, DOCX import, Dockerized EC2 deploy via GitHub Actions."],
        },
      ],
    },
    {
      id: "experience",
      heading: "Experience",
      entries: [
        {
          title: "Clinic Operations & IT Assistant",
          side: "Queens, NY",
          sub: "Colden Heart Center",
          date: "Mar 2023 – Present",
          bullets: [
            "Translated recurring EHR, scheduling, and clinical workflow issues into practical requirements for physicians and staff.",
            "Led an EHR migration — data transfer, validation, and workflow continuity across clinic systems.",
            "Revised the room-assignment process, reducing patient wait times by over 50%.",
          ],
        },
        {
          title: "Teaching Assistant — Intro Java",
          side: "New York, NY",
          sub: "Hunter College",
          date: "Jul – Aug 2022",
          bullets: ["Supported intro Java students through labs, code reviews, and debugging — OOP, data structures, algorithms."],
        },
      ],
    },
  ],
};

function Segmented({ value, onChange }) {
  return (
    <span className="rf-seg" role="group" aria-label="Section mode">
      {MODES.map((m) => (
        <button
          key={m}
          type="button"
          className={m === value ? "rf-seg-btn is-active" : "rf-seg-btn"}
          aria-pressed={m === value}
          onClick={() => onChange(m)}
        >
          {m}
        </button>
      ))}
    </span>
  );
}

/* ---------- Resume workspace ---------- */

function ResumeView({ modes, setMode, score, tier }) {
  const [zoom, setZoom] = useState(100);
  return (
    <>
      <div className="rf-toolbar">
        <span className="rf-tool-status">Resume <span className="rf-pill is-ready">● ready</span></span>
        <span className="rf-tool-status">Job <span className="rf-pill is-set">● software engineer</span></span>
        <div className="rf-tool-spacer" />
        <label className="rf-zoom">
          <span className="rf-zoom-label">Zoom</span>
          <select className="rf-zoom-select" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} aria-label="Resume zoom">
            {ZOOMS.map((z) => (<option key={z} value={z}>{z}%</option>))}
          </select>
        </label>
        <div className="rf-fit" aria-label={`Fit score ${score} of 100`}>
          <span className="rf-fit-num">{score}</span>
          <span className={`rf-fit-tier rf-fit-tier--${tier}`}>{tier}</span>
        </div>
        <button type="button" className="rf-tool-btn">Polish</button>
        <button type="button" className="rf-tool-btn rf-tool-btn--solid">Apply</button>
      </div>

      <div className="rf-doc-wrap">
        <div className="rf-doc" style={{ zoom: zoom / 100 }}>
          <h3 className="rf-doc-name">{RESUME.name}</h3>
          <p className="rf-doc-contact">{RESUME.contact.join("  ·  ")}</p>
          {RESUME.sections.map((sec) => {
            const mode = modes[sec.id];
            return (
              <section key={sec.id} className={`rf-sec is-${mode.toLowerCase()}`}>
                <div className="rf-sec-head">
                  <h4 className="rf-sec-title">{sec.heading}</h4>
                  <Segmented value={mode} onChange={(m) => setMode(sec.id, m)} />
                </div>
                {mode !== "Off" && sec.id === "skills" &&
                  sec.entries.map((e, i) => (
                    <p key={i} className="rf-skill"><strong>{e.title}:</strong> {e.sub}</p>
                  ))}
                {mode !== "Off" && sec.id !== "skills" &&
                  sec.entries.map((e, i) => (
                    <div key={i} className="rf-entry">
                      <div className="rf-entry-line">
                        <strong>{e.title}</strong>
                        {e.side && <span className="rf-entry-side">{e.side}</span>}
                      </div>
                      {(e.sub || e.date) && (
                        <div className="rf-entry-line rf-entry-line--sub">
                          <em>{e.sub}</em>
                          {e.date && <span className="rf-entry-side">{e.date}</span>}
                        </div>
                      )}
                      {!!e.bullets.length && (
                        <ul className="rf-entry-bullets">
                          {e.bullets.map((b, j) => (
                            <li key={j} className={mode === "Tailor" ? "is-tailored" : ""}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------- Materials ---------- */

const RF_MATERIALS = [
  { id: "master", title: "Master résumé", meta: "PDF · 18 bullets parsed", tag: "Source" },
  { id: "jd", title: "Job description", meta: "Software Engineer · pasted", tag: "Target" },
  { id: "notes", title: "Brag doc", meta: "12 accomplishments", tag: "Source" },
  { id: "cover", title: "Cover letter", meta: "Draft · 1 version", tag: "Output" },
];

function Materials() {
  const [on, setOn] = useState({ master: true, jd: true, notes: true, cover: false });
  return (
    <div className="rf-page">
      <div className="rf-page-head">
        <p className="rf-eyebrow">Draft</p>
        <h3 className="rf-page-title">Materials</h3>
      </div>
      <div className="rf-mat-list">
        {RF_MATERIALS.map((m) => (
          <div key={m.id} className="rf-mat-card">
            <div className="rf-mat-info">
              <span className="rf-mat-title">{m.title}</span>
              <span className="rf-mat-meta">{m.meta}</span>
            </div>
            <span className={`rf-tag rf-tag--${m.tag.toLowerCase()}`}>{m.tag}</span>
            <button
              type="button"
              className={on[m.id] ? "rf-mat-toggle is-on" : "rf-mat-toggle"}
              aria-pressed={on[m.id]}
              onClick={() => setOn((s) => ({ ...s, [m.id]: !s[m.id] }))}
            >
              {on[m.id] ? "In tailoring" : "Off"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Applications ---------- */

const APP_FILTERS = ["All", "Applied", "Interview", "Offer"];
const RF_APPS = [
  { id: 1, co: "Vitals Inc", role: "Software Engineer", status: "Offer", fit: 91, date: "Jun 12" },
  { id: 2, co: "Acme Health", role: "Frontend Engineer", status: "Interview", fit: 86, date: "Jun 20" },
  { id: 3, co: "Northwind Clinic", role: "Full-Stack Engineer", status: "Applied", fit: 78, date: "Jun 24" },
  { id: 4, co: "MedLoop", role: "React Engineer", status: "Rejected", fit: 64, date: "May 30" },
];

function Applications() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? RF_APPS : RF_APPS.filter((a) => a.status === filter);
  return (
    <div className="rf-page">
      <div className="rf-page-head rf-page-head--row">
        <div>
          <p className="rf-eyebrow">Track</p>
          <h3 className="rf-page-title">Applications</h3>
        </div>
        <div className="rf-chips" role="group" aria-label="Filter applications">
          {APP_FILTERS.map((f) => (
            <button key={f} type="button" className={f === filter ? "rf-chip is-active" : "rf-chip"} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="rf-table">
        <div className="rf-tr rf-tr--head">
          <span>Company</span><span>Status</span><span>Fit</span><span>Applied</span>
        </div>
        {shown.map((a) => (
          <div key={a.id} className="rf-tr">
            <div className="rf-td">
              <span className="rf-td-strong">{a.co}</span>
              <span className="rf-td-sub">{a.role}</span>
            </div>
            <span className={`rf-tag rf-tag--${a.status.toLowerCase()}`}>{a.status}</span>
            <span className="rf-td-fit">{a.fit}</span>
            <span className="rf-td-sub">{a.date}</span>
          </div>
        ))}
        {!shown.length && <p className="rf-empty">No {filter.toLowerCase()} applications.</p>}
      </div>
    </div>
  );
}

/* ---------- Analytics ---------- */

const RF_STATS = [
  { label: "Applications", value: "12" },
  { label: "Response rate", value: "50%" },
  { label: "Interviews", value: "3" },
  { label: "Avg fit", value: "79" },
];
const RF_BARS = [
  { label: "Applied", value: 6, tone: "applied" },
  { label: "Interview", value: 3, tone: "interview" },
  { label: "Offer", value: 2, tone: "offer" },
  { label: "Rejected", value: 1, tone: "rejected" },
];

function Analytics() {
  const max = Math.max(...RF_BARS.map((b) => b.value));
  return (
    <div className="rf-page">
      <div className="rf-page-head">
        <p className="rf-eyebrow">Track</p>
        <h3 className="rf-page-title">Analytics</h3>
      </div>
      <div className="rf-stats">
        {RF_STATS.map((s) => (
          <div key={s.label} className="rf-stat">
            <span className="rf-stat-num">{s.value}</span>
            <span className="rf-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="rf-bars-title">Pipeline by stage</p>
      <div className="rf-bars">
        {RF_BARS.map((b) => (
          <div key={b.label} className="rf-bar-row">
            <span className="rf-bar-label">{b.label}</span>
            <span className="rf-bar-track">
              <span className={`rf-bar-fill rf-bar-fill--${b.tone}`} style={{ width: `${(b.value / max) * 100}%` }} />
            </span>
            <span className="rf-bar-val">{b.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- App shell ---------- */

export default function RoleFitDemo() {
  const [tab, setTab] = useState("resume");
  const [modes, setModes] = useState({ education: "Include", experience: "Tailor", projects: "Tailor", skills: "Include" });
  const setMode = (id, m) => setModes((s) => ({ ...s, [id]: m }));

  // Fit score: tailored sections weigh most, included sections add, off sections
  // subtract a little. Purely illustrative — derived, not fetched.
  const score = useMemo(() => {
    let s = 58;
    for (const id in modes) s += modes[id] === "Tailor" ? 11 : modes[id] === "Include" ? 4 : -6;
    return Math.max(0, Math.min(99, s));
  }, [modes]);
  const tier = score >= 80 ? "strong" : score >= 65 ? "ready" : "thin";

  return (
    <div className="rf-app">
      <aside className="rf-rail">
        {RF_NAV.map((g) => (
          <div key={g.group} className="rf-rail-group">
            <p className="rf-rail-head">{g.group}</p>
            {g.items.map(({ n, id, label }) => (
              <button
                key={id}
                type="button"
                className={tab === id ? "rf-rail-item is-active" : "rf-rail-item"}
                aria-current={tab === id ? "page" : undefined}
                onClick={() => setTab(id)}
              >
                <em className="rf-rail-num">{n}</em>
                {label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <div className="rf-main">
        {tab === "resume" && <ResumeView modes={modes} setMode={setMode} score={score} tier={tier} />}
        {tab === "materials" && <Materials />}
        {tab === "applications" && <Applications />}
        {tab === "analytics" && <Analytics />}
      </div>
    </div>
  );
}
