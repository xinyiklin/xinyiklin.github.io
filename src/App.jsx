import Main from "./sections/Main";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Footer from "./components/Footer";
import DesktopScene from "./components/DesktopScene";
import ResumeOverlay from "./components/ResumeOverlay";
import { useReducedMotion, useMediaQuery, WIDE_QUERY } from "./hooks/useMotion";
import { useCallback, useEffect, useState } from "react";

function App() {
    const reduced = useReducedMotion();
    const wide = useMediaQuery(WIDE_QUERY);
    // The boot + camera intro only runs on wide viewports with motion allowed;
    // mobile and reduced-motion get the plain stacked layout (no intro).
    const cinematic = wide && !reduced;

    // The navbar is gone, but the About window's Resume button still opens the
    // overlay via the `open-resume` event, so keep that wiring at the app root.
    const [resumeOpen, setResumeOpen] = useState(false);
    const closeResume = useCallback(() => setResumeOpen(false), []);
    useEffect(() => {
        const open = () => setResumeOpen(true);
        window.addEventListener("open-resume", open);
        return () => window.removeEventListener("open-resume", open);
    }, []);
    useEffect(() => {
        // The site has no hash navigation; the only in-page jump (Get in touch ->
        // Contacts) scrolls directly. Keep scroll restoration manual so a reload
        // always lands at the top (and the cinematic intro starts cleanly) rather
        // than the browser restoring a prior position.
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        let frame = 0;

        const updateCursorGlow = (event) => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                root.style.setProperty("--cursor-x", `${event.clientX}px`);
                root.style.setProperty("--cursor-y", `${event.clientY}px`);
                root.classList.add("has-cursor-glow");
                frame = 0;
            });
        };

        window.addEventListener("pointermove", updateCursorGlow, { passive: true });

        return () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
            window.removeEventListener("pointermove", updateCursorGlow);
            root.classList.remove("has-cursor-glow");
        };
    }, []);

    return (
        <>
            <div className="site-cursor-glow" aria-hidden="true" />

            <main className="d-flex flex-column">
                {cinematic ? (
                    <DesktopScene />
                ) : (
                    <>
                        <Main />
                        <Projects />
                    </>
                )}
                <Contacts />
            </main>

            <Footer />
            <ResumeOverlay open={resumeOpen} onClose={closeResume} />
        </>
    );
}

export default App;
