import { useEffect, useRef, useState } from "react";

// Shared motion hooks. Used by the Projects and Skills sections so the
// scroll-reveal and 3D-tilt behavior stays identical across the page. All
// effects are pointer/observer based (no scroll listeners) and degrade to
// no-ops under prefers-reduced-motion.

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
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

// Pointer-driven 3D tilt. Writes tilt angles, a cursor-follow glow position, a
// hover scale, and a 0/1 "active" flag as CSS custom properties on the target;
// the CSS reads them to rotate the surface in perspective (and optionally float
// inner layers forward for parallax). Returns { ref, onPointerMove,
// onPointerLeave } to spread onto the tilt surface.
export function useTilt(reduced, { max = 9, axisRatio = 1, scale = 1.02 } = {}) {
  const ref = useRef(null);

  const onPointerMove = (event) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${((px - 0.5) * max * axisRatio).toFixed(2)}deg`);
    el.style.setProperty("--glow-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--glow-y", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--tilt-active", "1");
    el.style.setProperty("--tilt-scale", String(scale));
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--glow-x", "50%");
    el.style.setProperty("--glow-y", "0%");
    el.style.setProperty("--tilt-active", "0");
    el.style.setProperty("--tilt-scale", "1");
  };

  return { ref, onPointerMove, onPointerLeave };
}
