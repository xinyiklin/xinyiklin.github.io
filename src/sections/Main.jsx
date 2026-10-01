import { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { FaReact, FaPython } from "react-icons/fa";
import { SiDjango, SiPostgresql, SiTypescript } from "react-icons/si";
import { NAME } from "../constants/app";
import { useReducedMotion } from "../hooks/useMotion";

const TECH = [
  { label: "React",      Icon: FaReact,      delay: "0s"    },
  { label: "Django",     Icon: SiDjango,     delay: "0.5s"  },
  { label: "PostgreSQL", Icon: SiPostgresql, delay: "1.0s"  },
  { label: "Python",     Icon: FaPython,     delay: "1.5s"  },
  { label: "TypeScript", Icon: SiTypescript, delay: "2.0s"  },
];

function Main({ sectionId = "home", deferTyping = false }) {
  const reduced = useReducedMotion();
  const typewriterRef = useRef(null);

  // In the cinematic path the hero is the desktop wallpaper; hold the typewriter
  // until the zoom settles (DesktopScene fires `desktop-settled`) so it starts
  // typing only once the desktop has finished arriving, not behind the splash.
  useEffect(() => {
    if (reduced) {
      typewriterRef.current = null;
      return undefined;
    }
    if (!deferTyping) return undefined;
    const start = () => typewriterRef.current?.start();
    window.addEventListener("desktop-settled", start);
    return () => window.removeEventListener("desktop-settled", start);
  }, [deferTyping, reduced]);

  return (
    <section
      id={sectionId ?? undefined}
      className="hero-section min-vh-100 d-flex align-items-center"
    >
      <div className="hero-blob hero-blob-a"      aria-hidden="true" />
      <div className="hero-blob hero-blob-b"      aria-hidden="true" />

      <div className="container hero-content text-center">
        <p className="hero-kicker mb-3">Software Engineer · Full-Time Roles</p>

        <h1 className="hero-title">{NAME}</h1>

        {reduced ? (
          <div className="Typewriter">
            <span className="lead typewriter">Healthcare workflow software.</span>
          </div>
        ) : (
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
              typewriterRef.current = tw;
              const phrases = [
                "TypeScript, React, Django.",
                "Healthcare workflow software.",
                "Local-first AI tooling.",
              ];
              const pauseFor = (s) => 700 + s.length * 50;
              phrases.reduce(
                (chain, phrase) =>
                  chain
                    .typeString(phrase)
                    .pauseFor(pauseFor(phrase))
                    .deleteChars(phrase.length),
                tw
              );
              // Cinematic path waits for `desktop-settled`; otherwise start now.
              if (!deferTyping) tw.start();
            }}
          />
        )}

        <p className="hero-subtitle mt-4">
          I build full-stack software for healthcare workflows, from React and
          TypeScript interfaces to Django APIs and PostgreSQL data models.
        </p>

        <div className="hero-actions mt-4">
          <button
            type="button"
            className="hero-btn hero-btn--solid"
            onClick={() => window.dispatchEvent(new Event("open-resume"))}
          >
            Resume
          </button>
          <button
            type="button"
            className="hero-btn"
            onClick={() => document.getElementById("contacts")?.scrollIntoView()}
          >
            Get in touch
          </button>
        </div>

        <div className="hero-stack mt-5">
          {TECH.map(({ label, Icon, delay }) => (
            <span key={label} className="hero-chip" style={{ "--chip-delay": delay }}>
              <Icon className="hero-chip-icon" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Main;
