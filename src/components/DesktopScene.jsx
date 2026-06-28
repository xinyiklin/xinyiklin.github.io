import { useCallback, useEffect, useRef, useState } from "react";
import Main from "../sections/Main";
import Projects from "../sections/Projects";
import { NAME } from "../constants/app";

// On wide, motion-allowed viewports the page opens with a FULL-SCREEN loading
// splash. After loading it reveals the full hero, holds it briefly, then zooms
// into the framed macOS-style desktop "window app" (the chrome fades in as it
// zooms). The hero is the desktop wallpaper; the apps start closed (open from
// the dock). The desktop is the landing; scrolling continues to Contacts.
// Mobile + reduced-motion get the flat layout (see App.jsx).

// Total scroll-lock = BOOT + PAUSE + SETTLE = 4000ms (4s intro lock). There is no
// sticky pin; after the lock releases the desktop scrolls normally to Contacts.
const BOOT_MS = 1600; // full-screen loading duration
const PAUSE_MS = 1200; // hold on the full hero before zooming into the desktop
// The zoom is a 3s ease-out, visually settled within ~1.2s; release the lock (and
// cue the typewriter) then, not at the mathematical end of the transition.
const SETTLE_MS = 1200;

function DesktopScene() {
  const [booting, setBooting] = useState(true); // splash mounted
  const [leaving, setLeaving] = useState(false); // splash fading out
  const [revealed, setRevealed] = useState(false); // full hero shown (splash gone)
  const [framed, setFramed] = useState(false); // zoomed into the framed desktop
  const [settled, setSettled] = useState(false); // intro done: lock released, desktop live
  const framedRef = useRef(false);
  const settledRef = useRef(false); // zoom settled — scroll lock released + typewriter cued
  const skippedRef = useRef(false); // skip() ran once — don't re-enter
  const restoreRef = useRef("");
  const timersRef = useRef([]);
  const abortRef = useRef(null);

  // Once the zoom has visually settled (SETTLE_MS after it starts): release the
  // scroll lock and cue the hero typewriter so it types only after the desktop
  // has arrived, not the instant the zoom starts. Flipping `settled` also makes
  // the desktop interactive (see `inert` below) at the SAME moment the scroll
  // lock lifts, so the Resume overlay can't be opened while we still hold the
  // body.overflow lock (which `settle` would then clobber out from under it).
  const settle = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;
    setSettled(true);
    document.body.style.overflow = restoreRef.current; // unlock scroll
    window.dispatchEvent(new Event("desktop-settled")); // cue the hero typewriter
  }, []);

  // After loading: reveal the full hero and fade the splash out.
  const dismissSplash = useCallback(() => {
    setRevealed(true);
    setLeaving(true);
    timersRef.current.push(window.setTimeout(() => setBooting(false), 550));
  }, []);

  // After the hold: zoom into the framed desktop. Scroll stays LOCKED until the
  // zoom looks settled (SETTLE_MS), so it can't be scrolled away mid-zoom.
  const toFramed = useCallback(() => {
    if (framedRef.current) return;
    framedRef.current = true;
    setFramed(true);
    abortRef.current?.abort(); // intro is over — detach the skip listeners
    timersRef.current.push(window.setTimeout(settle, SETTLE_MS));
  }, [settle]);

  // Any input (or the Fast boot button) jumps straight to the settled desktop.
  // Idempotent: activating the focused button with Enter fires both the global
  // keydown listener AND the button's onClick, so a second skip() must NOT re-run
  // (it would clear the settle timer that the first toFramed() scheduled, and
  // toFramed early-returns on re-entry, so settle would never fire -> stuck lock).
  const skip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    timersRef.current.forEach((t) => window.clearTimeout(t));
    dismissSplash();
    toFramed();
  }, [dismissSplash, toFramed]);

  useEffect(() => {
    restoreRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock scroll through the intro
    window.scrollTo(0, 0);

    // One controller removes all skip listeners at once — on intro end (toFramed)
    // or on unmount — so they never linger and fire on every later scroll/click.
    const controller = new AbortController();
    abortRef.current = controller;
    const { signal } = controller;

    const t1 = window.setTimeout(dismissSplash, BOOT_MS);
    const t2 = window.setTimeout(toFramed, BOOT_MS + PAUSE_MS);
    timersRef.current = [t1, t2];

    window.addEventListener("wheel", skip, { passive: true, signal });
    window.addEventListener("touchstart", skip, { passive: true, signal });
    window.addEventListener("keydown", skip, { signal });
    window.addEventListener("pointerdown", skip, { signal });
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      controller.abort();
      // Restore the lock only if we still own it (intro not finished). Once settled
      // we've already unlocked, so don't clobber another owner of body.overflow
      // (e.g. an open ResumeOverlay).
      if (!settledRef.current) document.body.style.overflow = restoreRef.current;
    };
  }, [dismissSplash, toFramed, skip]);

  const stageClass = `desk-stage${revealed ? " is-revealed" : ""}${framed ? " is-framed" : ""}`;

  return (
    <>
      {/* Until the intro settles (scroll lock released), keep the whole desktop
          inert: out of the tab order and the accessibility tree, so the boot
          status isn't announced alongside the hidden desktop's controls AND the
          Resume overlay can't open while we still hold the body.overflow lock. */}
      <section className="desk-scene" aria-label="Desktop" inert={settled ? undefined : ""}>
        <div className="desk-pin">
          <div className={stageClass}>
            {/* Hero is the desktop wallpaper, behind the chrome. No `home`/
                `projects` ids: nothing links to them. The only in-page jump is
                the About window's "Get in touch" -> Contacts (id="contacts"),
                which lives outside this stage. */}
            <div className="desk-wallpaper">
              <Main sectionId={null} deferTyping />
            </div>
            <Projects sectionId={null} cinematic />
          </div>
        </div>
      </section>

      {booting && (
        <div className={`boot${leaving ? " is-leaving" : ""}`} role="status" aria-label="Starting up">
          <div className="boot-stage">
            <img className="boot-logo" src="/favicon.svg" alt="" aria-hidden="true" width="84" height="84" />
            <span className="boot-name">{NAME}</span>
            <span className="boot-bar" aria-hidden="true">
              <span className="boot-bar-fill" style={{ "--boot-ms": `${BOOT_MS}ms` }} />
            </span>
          </div>
          <button type="button" className="boot-skip" onClick={skip}>
            Fast boot
          </button>
        </div>
      )}
    </>
  );
}

export default DesktopScene;
