import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Calendar, FileText, Pill, Receipt, Shield, X } from "lucide-react";
import careflowFavicon from "../assets/careflow-favicon.svg";

// CareFlow.app — an interactive, fake-data mock of the real clinic workspace.
// A left sidebar navigates between pages built from real DOM (not screenshots):
// Schedule (draggable appointment blocks -> details modal -> Patient hub), Refills (a working
// approve/deny inbox), and Admin (the security permission matrix). Light local
// state makes the buttons respond; there is no backend.

const NAV = [
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "billing", label: "Billing", icon: Receipt },
  { id: "refills", label: "Refills", icon: Pill },
  { id: "admin", label: "Admin", icon: Shield },
];

/* ---------- Schedule ---------- */

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const HOUR_PX = 54;
const SNAP_PX = HOUR_PX / 4; // snap dragging to a 15-minute grid
const PROVIDER = "MD Elliot Reed";
const DEFAULT_APPTS = [
  { id: "a1", start: 9, min: 45, who: "Demo Patient", type: "Threshold visit", room: "Exam A", status: "Checked in", tone: "teal" },
  { id: "a2", start: 10.25, min: 30, who: "Cole, Marcus", type: "Follow-up", room: "Exam B", status: "Scheduled", tone: "sky" },
  { id: "a3", start: 11.5, min: 30, who: "Smith, Grace", type: "New patient", room: "Exam A", status: "Scheduled", tone: "amber" },
  { id: "a4", start: 14, min: 30, who: "Nguyen, An", type: "Telehealth", room: "Virtual", status: "Scheduled", tone: "violet" },
  { id: "a5", start: 16, min: 45, who: "Okafor, Ben", type: "Follow-up", room: "Exam B", status: "Scheduled", tone: "rose" },
];

const clampN = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const fmtHour = (h) => `${h > 12 ? h - 12 : h}:00 ${h < 12 ? "AM" : "PM"}`;
function fmtTime(h) {
  const hr = Math.floor(h);
  const m = Math.round((h - hr) * 60);
  return `${((hr + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${hr < 12 ? "AM" : "PM"}`;
}
const fmtRange = (start, min) => `${fmtTime(start)} – ${fmtTime(start + min / 60)}`;

function Schedule({ onOpen }) {
  const [appts, setAppts] = useState(DEFAULT_APPTS);
  const trackRef = useRef(null);
  // Set true once a pointer drag actually moves, so the trailing click that
  // fires after the drag does not also open the modal.
  const movedRef = useRef(false);

  // Drag a block vertically to reschedule it, snapping to 15-minute steps and
  // clamping inside the day. Pointer delta is divided by the live stage scale so
  // dragging stays 1:1 even when the cinematic camera has the desktop scaled.
  const beginDrag = (id) => (e) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    const appt = appts.find((a) => a.id === id);
    const scale = track.getBoundingClientRect().height / track.offsetHeight || 1;
    const blockH = (appt.min / 60) * HOUR_PX;
    const maxTop = HOURS.length * HOUR_PX - blockH;
    const startY = e.clientY;
    const baseTop = (appt.start - HOURS[0]) * HOUR_PX;
    movedRef.current = false;
    document.body.classList.add("pj-grabbing");
    const move = (ev) => {
      const dy = (ev.clientY - startY) / scale;
      if (Math.abs(dy) > 4) movedRef.current = true;
      const top = Math.round(clampN(baseTop + dy, 0, maxTop) / SNAP_PX) * SNAP_PX;
      setAppts((list) => list.map((a) => (a.id === id ? { ...a, start: HOURS[0] + top / HOUR_PX } : a)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.classList.remove("pj-grabbing");
      // Clear the moved flag after any trailing click has fired (the click runs
      // before this macrotask). A pointer released off the block fires no click,
      // so without this a stale `true` could swallow a later keyboard activation.
      setTimeout(() => { movedRef.current = false; }, 0);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const handleClick = (appt) => () => {
    if (movedRef.current) { movedRef.current = false; return; }
    onOpen({ ...appt, provider: PROVIDER, time: fmtRange(appt.start, appt.min) });
  };

  return (
    <div className="cf-page">
      <div className="cf-page-head">
        <p className="cf-eyebrow">Schedule</p>
        <h3 className="cf-page-title">Clinic A</h3>
      </div>
      <div className="cf-day">
        <div className="cf-day-head">
          <span className="cf-day-gutter-sp" aria-hidden="true" />
          <span className="cf-day-colhead"><span className="cf-dot" aria-hidden="true" />{PROVIDER}</span>
        </div>
        <div className="cf-day-body">
          <div className="cf-day-times">
            {HOURS.map((h) => (
              <span key={h} style={{ height: HOUR_PX }}>{fmtHour(h)}</span>
            ))}
          </div>
          <div className="cf-day-col">
            <div className="cf-day-track" ref={trackRef} style={{ "--hour-px": `${HOUR_PX}px`, height: HOURS.length * HOUR_PX }}>
              {appts.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`cf-appt cf-appt--${a.tone}`}
                  style={{ top: (a.start - HOURS[0]) * HOUR_PX, height: (a.min / 60) * HOUR_PX }}
                  onPointerDown={beginDrag(a.id)}
                  onClick={handleClick(a)}
                >
                  <span className="cf-appt-time">{fmtRange(a.start, a.min)}</span>
                  <span className="cf-appt-who">{a.who}</span>
                  <span className="cf-appt-type">{a.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentModal({ appt, onClose, onPatient }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="cf-modal-backdrop" onClick={onClose}>
      <div className="cf-modal" role="dialog" aria-modal="true" aria-label="Appointment details" onClick={(e) => e.stopPropagation()}>
        <div className="cf-modal-head">
          <div>
            <p className="cf-eyebrow">Appointment</p>
            <h3 className="cf-modal-title">{appt.who}</h3>
          </div>
          <button type="button" className="cf-modal-close" onClick={onClose} aria-label="Close">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <dl className="cf-modal-rows">
          <div><dt>Time</dt><dd>{appt.time}</dd></div>
          <div><dt>Provider</dt><dd>{appt.provider}</dd></div>
          <div><dt>Visit type</dt><dd>{appt.type}</dd></div>
          <div><dt>Room</dt><dd>{appt.room}</dd></div>
          <div><dt>Status</dt><dd><span className={`cf-docs-status is-${appt.status === "Checked in" ? "done" : "new"}`}>{appt.status}</span></dd></div>
        </dl>
        <div className="cf-modal-foot">
          <button type="button" className="cf-btn cf-btn--ghost" onClick={onClose}>Close</button>
          <button type="button" className="cf-btn cf-btn--ok" onClick={onPatient}>Open patient hub →</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Documents ---------- */

const DOC_FILTERS = ["All", "Clinical", "Admin", "Insurance"];
const DOCS = [
  { id: 1, name: "Visit summary", type: "Clinical note", cat: "Clinical", date: "Jun 14, 2026", status: "Signed" },
  { id: 2, name: "A1C lab panel", type: "Lab result", cat: "Clinical", date: "Apr 28, 2026", status: "New" },
  { id: 3, name: "Progress note", type: "Clinical note", cat: "Clinical", date: "Apr 02, 2026", status: "Signed" },
  { id: 4, name: "Consent to treat", type: "Consent", cat: "Admin", date: "May 02, 2026", status: "Signed" },
  { id: 5, name: "Cardiology referral", type: "Referral", cat: "Admin", date: "Mar 19, 2026", status: "Pending" },
  { id: 6, name: "Insurance card", type: "Insurance", cat: "Insurance", date: "Jan 10, 2026", status: "Verified" },
];
const DOC_TONE = { Signed: "done", Verified: "done", New: "new", Pending: "pending" };

function Documents() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? DOCS : DOCS.filter((d) => d.cat === filter);
  return (
    <div className="cf-docs">
      <div className="cf-rf-toolbar">
        <h3 className="cf-page-title">Documents</h3>
        <div className="cf-rf-filters" role="group" aria-label="Filter documents">
          {DOC_FILTERS.map((f) => (
            <button key={f} type="button" className={f === filter ? "cf-chip is-active" : "cf-chip"} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="cf-docs-list">
        {shown.map((d) => (
          <div key={d.id} className="cf-docs-row">
            <span className="cf-docs-icon" aria-hidden="true"><FileText size={15} /></span>
            <div className="cf-docs-info">
              <span className="cf-docs-name">{d.name}</span>
              <span className="cf-docs-meta">{d.type} · {d.date}</span>
            </div>
            <span className={`cf-docs-status is-${DOC_TONE[d.status]}`}>{d.status}</span>
            <button type="button" className="cf-btn cf-btn--ghost">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Billing ---------- */

const BILL_FILTERS = ["All", "Paid", "Pending", "Denied"];
const BILLS = [
  { id: 1, patient: "Patient, Demo", payer: "MetroPlus Gold PPO", service: "Office visit", code: "99213", date: "Jun 14", amount: 120, status: "Paid" },
  { id: 2, patient: "Cole, Marcus", payer: "Aetna", service: "Lab panel", code: "80053", date: "Jun 11", amount: 64, status: "Pending" },
  { id: 3, patient: "Smith, Grace", payer: "Cigna", service: "Office visit", code: "99214", date: "Jun 09", amount: 180, status: "Pending" },
  { id: 4, patient: "Reed, Sam", payer: "UnitedHealth", service: "Procedure", code: "29826", date: "May 28", amount: 310, status: "Denied" },
  { id: 5, patient: "Ito, Hana", payer: "Self-pay", service: "Telehealth", code: "99421", date: "May 21", amount: 45, status: "Paid" },
];
const BILL_TONE = { Paid: "done", Pending: "pending", Denied: "denied" };
const money = (n) => `$${n.toFixed(2)}`;

function Billing() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? BILLS : BILLS.filter((b) => b.status === filter);
  const open = BILLS.filter((b) => b.status !== "Paid");
  const outstanding = open.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="cf-bill">
      <div className="cf-rf-toolbar">
        <h3 className="cf-page-title">Billing</h3>
        <div className="cf-rf-filters" role="group" aria-label="Filter claims">
          {BILL_FILTERS.map((f) => (
            <button key={f} type="button" className={f === filter ? "cf-chip is-active" : "cf-chip"} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <p className="cf-bill-sum">Outstanding <strong>{money(outstanding)}</strong> · {open.length} open claims</p>
      <div className="cf-bill-head">
        <span>Patient</span><span>Service</span><span className="cf-bill-amt-h">Amount</span><span>Status</span>
      </div>
      <div className="cf-bill-list">
        {shown.map((b) => (
          <div key={b.id} className="cf-bill-row">
            <div className="cf-rf-cell">
              <span className="cf-rf-strong">{b.patient}</span>
              <span className="cf-rf-note">{b.payer}</span>
            </div>
            <div className="cf-rf-cell">
              <span className="cf-rf-strong">{b.service}</span>
              <span className="cf-rf-note">{b.code} · {b.date}</span>
            </div>
            <span className="cf-bill-amount">{money(b.amount)}</span>
            <span className={`cf-docs-status is-${BILL_TONE[b.status]}`}>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Patient hub ---------- */

const PT_TABS = ["Registration", "Insurance", "Documents", "Medications", "Refills", "Clinical"];
const PT_FIELDS = [
  ["First name", "Demo"],
  ["Last name", "Patient"],
  ["Date of birth", "05/15/1985"],
  ["Gender", "Female"],
  ["Sex at birth", "Male"],
  ["Pronouns", "she/her"],
  ["Preferred language", "English"],
  ["SSN", "•••-••-1824"],
];

function PatientHub({ onBack }) {
  return (
    <div className="cf-pt">
      <aside className="cf-pt-rail">
        <span className="cf-pt-avatar" aria-hidden="true">DP</span>
        <p className="cf-pt-name">Patient, Demo J.</p>
        <p className="cf-pt-mrn">MRN 100</p>
        <span className="cf-pt-badge">● Active · she/her</span>
        <dl className="cf-pt-meta">
          <div><dt>DOB</dt><dd>05/15/1985</dd></div>
          <div><dt>Cell</dt><dd>(555) 011-0001</dd></div>
          <div><dt>PCP</dt><dd>Nadia Solano</dd></div>
          <div><dt>Insurance</dt><dd>MetroPlus Gold PPO</dd></div>
        </dl>
      </aside>
      <div className="cf-pt-main">
        <button type="button" className="cf-back" onClick={onBack}>
          <ArrowLeft size={14} aria-hidden="true" /> Schedule
        </button>
        <div className="cf-pt-tabs" role="tablist" aria-label="Patient record">
          {PT_TABS.map((t, i) => (
            <span key={t} className={i === 0 ? "cf-pt-tab is-active" : "cf-pt-tab"} role="tab" aria-selected={i === 0}>
              {t}
            </span>
          ))}
        </div>
        <p className="cf-pt-section">Identity &amp; demographics</p>
        <div className="cf-pt-grid">
          {PT_FIELDS.map(([label, value]) => (
            <label key={label} className="cf-field">
              <span className="cf-field-label">{label}</span>
              <span className="cf-field-input">{value}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Refills ---------- */

const RF_FILTERS = ["Pending", "All", "Approved", "Denied"];
const RF_SEED = [
  { id: 1, who: "Patient, Demo", note: "Running low before my next visit.", med: "Metformin ER", dose: "500 mg · Twice daily", rx: "Elliot Reed", pharmacy: "Clinic A Pharmacy", status: "Pending", when: "1:16 PM" },
  { id: 2, who: "Cole, Marcus", note: "Lost my bottle while traveling.", med: "Lisinopril", dose: "10 mg · Once daily", rx: "Nadia Solano", pharmacy: "Eastside Rx", status: "Pending", when: "11:02 AM" },
  { id: 3, who: "Ito, Hana", note: "Auto-refill request.", med: "Atorvastatin", dose: "20 mg · Nightly", rx: "Elliot Reed", pharmacy: "Clinic A Pharmacy", status: "Approved", when: "Yesterday" },
];

function Refills() {
  const [rows, setRows] = useState(RF_SEED);
  const [filter, setFilter] = useState("Pending");
  const set = (id, status) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  const shown = filter === "All" ? rows : rows.filter((r) => r.status === filter);
  const counts = (s) => rows.filter((r) => r.status === s).length;

  return (
    <div className="cf-rf">
      <div className="cf-rf-toolbar">
        <h3 className="cf-page-title">Refills</h3>
        <div className="cf-rf-filters" role="group" aria-label="Filter refills">
          {RF_FILTERS.map((f) => (
            <button key={f} type="button" className={f === filter ? "cf-chip is-active" : "cf-chip"} onClick={() => setFilter(f)}>
              {f}
              {f !== "All" && <span className="cf-chip-count">{counts(f)}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="cf-rf-head">
        <span>Patient</span><span>Medication</span><span>Prescriber</span><span>Status</span><span />
      </div>
      <div className="cf-rf-list">
        {shown.map((r) => (
          <div key={r.id} className="cf-rf-row">
            <div className="cf-rf-cell">
              <span className="cf-rf-strong">{r.who}</span>
              <span className="cf-rf-note">{r.note}</span>
            </div>
            <div className="cf-rf-cell">
              <span className="cf-rf-strong">{r.med}</span>
              <span className="cf-rf-note">{r.dose}</span>
            </div>
            <div className="cf-rf-cell">
              <span>{r.rx}</span>
              <span className="cf-rf-note">{r.pharmacy}</span>
            </div>
            <div className="cf-rf-cell">
              <span className={`cf-status cf-status--${r.status.toLowerCase()}`}>{r.status}</span>
              <span className="cf-rf-note">{r.when}</span>
            </div>
            <div className="cf-rf-actions">
              {r.status === "Pending" ? (
                <>
                  <button type="button" className="cf-btn cf-btn--ok" onClick={() => set(r.id, "Approved")}>Approve</button>
                  <button type="button" className="cf-btn cf-btn--no" onClick={() => set(r.id, "Denied")}>Deny</button>
                </>
              ) : (
                <button type="button" className="cf-btn cf-btn--ghost" onClick={() => set(r.id, "Pending")}>Undo</button>
              )}
            </div>
          </div>
        ))}
        {!shown.length && <p className="cf-rf-empty">No {filter.toLowerCase()} requests.</p>}
      </div>
    </div>
  );
}

/* ---------- Admin: security ---------- */

const PERM_ROLES = ["Admin", "Member", "Owner"];
const PERM_GROUPS = [
  {
    name: "Organization profile",
    rows: [
      { id: "org.profile.view", label: "View organization details", def: ["Allow", "Allow", "Allow"] },
      { id: "org.profile.update", label: "Edit organization details", def: ["Allow", "Block", "Allow"] },
    ],
  },
  {
    name: "User management",
    rows: [
      { id: "org.users.view", label: "View organization users", def: ["Allow", "Allow", "Allow"] },
      { id: "org.users.manage", label: "Invite and manage users", sensitive: true, def: ["Allow", "Block", "Allow"] },
    ],
  },
  {
    name: "Pharmacies & payers",
    rows: [
      { id: "org.pharmacies.manage", label: "Manage pharmacies list", sensitive: true, def: ["Allow", "Block", "Allow"] },
    ],
  },
];

function Admin() {
  const [grants, setGrants] = useState(() => {
    const g = {};
    for (const grp of PERM_GROUPS) for (const r of grp.rows) PERM_ROLES.forEach((role, i) => (g[`${r.id}:${role}`] = r.def[i]));
    return g;
  });
  const toggle = (key) => setGrants((g) => ({ ...g, [key]: g[key] === "Allow" ? "Block" : "Allow" }));

  return (
    <div className="cf-perm">
      <div className="cf-perm-head">
        <span className="cf-perm-org">Security · CareFlow Demo Organization</span>
        <div className="cf-perm-roles">
          {PERM_ROLES.map((role) => (
            <span key={role} className="cf-perm-role">{role}</span>
          ))}
        </div>
      </div>
      {PERM_GROUPS.map((grp) => (
        <div key={grp.name} className="cf-perm-group">
          <p className="cf-perm-group-name">{grp.name}</p>
          {grp.rows.map((r) => (
            <div key={r.id} className="cf-perm-row">
              <div className="cf-perm-label">
                <span>{r.label}</span>
                <span className="cf-perm-code">{r.sensitive && <em className="cf-perm-flag">sensitive</em>}{r.id}</span>
              </div>
              <div className="cf-perm-cells">
                {PERM_ROLES.map((role) => {
                  const key = `${r.id}:${role}`;
                  const val = grants[key];
                  return (
                    <button
                      key={role}
                      type="button"
                      className={val === "Allow" ? "cf-grant is-allow" : "cf-grant is-block"}
                      onClick={() => toggle(key)}
                      aria-label={`${role}: ${r.label} — ${val}`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------- App shell ---------- */

export default function CareFlowDemo() {
  const [page, setPage] = useState("schedule");
  const [modalAppt, setModalAppt] = useState(null);
  const go = (id) => { setModalAppt(null); setPage(id); };

  return (
    <div className="cf-app">
      <aside className="cf-side">
        <div className="cf-side-brand">
          <img className="cf-brand-logo" src={careflowFavicon} alt="" aria-hidden="true" />
          CareFlow
        </div>
        <nav className="cf-nav" aria-label="CareFlow">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={page === id ? "cf-nav-item is-active" : "cf-nav-item"}
              aria-current={page === id ? "page" : undefined}
              onClick={() => go(id)}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="cf-main">
        {page === "schedule" && <Schedule onOpen={setModalAppt} />}
        {page === "documents" && <Documents />}
        {page === "billing" && <Billing />}
        {page === "refills" && <Refills />}
        {page === "admin" && <Admin />}
        {page === "patient" && <PatientHub onBack={() => setPage("schedule")} />}
      </div>

      {modalAppt && (
        <AppointmentModal appt={modalAppt} onClose={() => setModalAppt(null)} onPatient={() => { setModalAppt(null); setPage("patient"); }} />
      )}
    </div>
  );
}
