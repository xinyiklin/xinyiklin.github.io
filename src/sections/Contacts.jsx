import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { EMAIL, GITHUB, LINKEDIN, LOCATION, AVAILABILITY } from "../constants/app";

const CHANNELS = [
  {
    Icon: FaEnvelope,
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    cta: "Say hello",
    external: false,
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    handle: "in/xinyiklin",
    href: LINKEDIN,
    cta: "Connect",
    external: true,
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    handle: "xinyiklin",
    href: GITHUB,
    cta: "View work",
    external: true,
  },
];

function Contacts() {
  return (
    <section id="contacts" className="contact-section">
      <div className="container position-relative">
        <div className="text-center mb-5">
          <span className="contact-avail-badge mb-4 d-inline-flex align-items-center gap-2">
            <span className="contact-pulse" aria-hidden="true" />
            Open to work
          </span>

          <h2 className="contact-heading">Let's Work Together</h2>

          <p className="contact-sub">
            Open to full-time software engineering roles and willing to
            relocate for the right team.
          </p>
        </div>

        <div className="contact-cards">
          {CHANNELS.map(({ Icon, label, handle, href, cta, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="contact-channel-card"
              aria-label={`${label}: ${handle}`}
            >
              <div className="contact-channel-icon">
                <Icon />
              </div>
              <p className="contact-channel-label">{label}</p>
              <p className="contact-channel-handle">{handle}</p>
              <span className="contact-channel-cta">{cta} →</span>
            </a>
          ))}
        </div>

        <p className="contact-location text-center mt-5 mb-0">
          {LOCATION} · {AVAILABILITY}
        </p>
      </div>
    </section>
  );
}

export default Contacts;
