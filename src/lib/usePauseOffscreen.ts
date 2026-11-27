import { useEffect, type RefObject } from "react";

/**
 * Marks an element with `data-offscreen` while it's out of view (with some margin), and a CSS rule
 * in index.css pauses every CSS animation inside it. Looping decorations (the flowing aurora text,
 * the drifting blobs, the turning glow) otherwise keep the browser repainting while nobody sees them.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement>, margin = "200px") {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.removeAttribute("data-offscreen");
        else el.setAttribute("data-offscreen", "");
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeAttribute("data-offscreen");
    };
  }, [ref, margin]);
}

export default usePauseOffscreen;
