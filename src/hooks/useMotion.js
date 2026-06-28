import { useEffect, useRef, useState } from "react";

// Shared motion hooks. Observer / matchMedia based (no scroll listeners); they
// degrade to no-ops under prefers-reduced-motion or on the server.

// The single breakpoint that gates the cinematic intro (App.jsx) and the
// floating window manager (Projects.jsx). Shared so the two gates can't drift.
export const WIDE_QUERY = "(min-width: 992px)";

// Reduced-motion is just a media-query subscription; reuse useMediaQuery so the
// matchMedia lifecycle lives in one place.
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// Adds `inView = true` once the element first crosses into the viewport, then
// disconnects (one-shot, no re-trigger). Returns [ref, inView].
export function useInView({ threshold = 0, rootMargin = "0px 0px -12% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  return [ref, inView];
}

// Tracks a CSS media query and re-renders when it flips. Used to gate the
// floating-desktop window manager and the cinematic boot/zoom scene on width.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
}
