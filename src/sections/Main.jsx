import Container from "react-bootstrap/Container";
import Typewriter from "typewriter-effect";
import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaPython } from "react-icons/fa";
import { SiDjango, SiPostgresql, SiCplusplus } from "react-icons/si";
import { EMAIL, GITHUB, LINKEDIN, NAME, RESUME } from "../constants/app";

const TECH = [
  { label: "React",      Icon: FaReact,      delay: "0s"    },
  { label: "Django",     Icon: SiDjango,     delay: "0.5s"  },
  { label: "PostgreSQL", Icon: SiPostgresql, delay: "1.0s"  },
  { label: "Python",     Icon: FaPython,     delay: "1.5s"  },
  { label: "C++",        Icon: SiCplusplus,  delay: "2.0s"  },
];

function Main() {
  const sectionRef = useRef(null);
  const glowRef   = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow    = glowRef.current;
    if (!section || !glow) return;

    const onMove = (e) => {
      const { left, top } = section.getBoundingClientRect();
      glow.style.background = `radial-gradient(700px circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(20,184,166,0.12), transparent 65%)`;
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-section min-vh-100 d-flex align-items-center"
    >
      <div ref={glowRef} className="hero-glow"    aria-hidden="true" />
      <div className="hero-blob hero-blob-a"      aria-hidden="true" />
      <div className="hero-blob hero-blob-b"      aria-hidden="true" />

      <Container className="hero-content text-center">
        <p className="hero-kicker mb-3">Software Engineer · Full-Time Roles</p>

        <h1 className="hero-title">{NAME}</h1>

        <Typewriter
          options={{
            cursor: "|",
            delay: 50,
            deleteSpeed: 26,
            loop: true,
            skipAddStyles: true,
            wrapperClassName: "lead typewriter",
            cursorClassName: "typewriter-cursor",
          }}
          onInit={(tw) => {
            tw
              .typeString("React + Django.")
              .pauseFor(700)
              .deleteAll()
              .typeString("Healthcare workflow software.")
              .pauseFor(700)
              .deleteAll()
              .typeString("Clear data. Clean UI.")
              .start();
          }}
        />

        <p className="hero-subtitle mt-4">
          I build React and Django applications for healthcare workflows,
          with practical interfaces and PostgreSQL-backed data models.
        </p>

        <div className="hero-stack mt-5">
          {TECH.map(({ label, Icon, delay }) => (
            <span key={label} className="hero-chip" style={{ "--chip-delay": delay }}>
              <Icon className="hero-chip-icon" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        <div className="hero-actions mt-4">
          <a
            className="btn hero-primary-btn btn-md mx-2"
            href="#projects"
            role="button"
            aria-label="View my projects"
          >
            View Projects
          </a>
          <a
            className="btn hero-secondary-btn btn-md mx-2"
            href={RESUME}
            target="_blank"
            rel="noreferrer"
            role="button"
            aria-label="View my resume"
          >
            Resume
          </a>
        </div>

        <div className="hero-socials mt-3 d-flex justify-content-center gap-4">
          <a href={GITHUB}  target="_blank" rel="noreferrer" aria-label="My GitHub"   className="hero-social-link"><FaGithub   /></a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="My LinkedIn" className="hero-social-link"><FaLinkedin /></a>
          <a href={`mailto:${EMAIL}`}        aria-label="My email"                    className="hero-social-link"><FaEnvelope /></a>
        </div>
      </Container>
    </section>
  );
}

export default Main;
