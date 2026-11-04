import { useEffect, useRef } from "react";

/** Aurora tints used for the dots on the light theme (a touch deeper than the logo so they read on white). */
const AURORA = ["104,136,235", "142,116,238", "232,104,146", "232,150,84"];

/**
 * Very quiet background of drifting dots.
 * - default: fixed behind the whole page, with scroll parallax.
 * - `contained`: fills its (positioned) parent, for dark bands that cover the page background.
 * Colours follow the theme of wherever the canvas sits: white dots on dark grounds,
 * soft aurora-coloured dots on light ones. Paused when the tab is hidden.
 */
export function Starfield({ count = 120, contained = false, className = "" }: { count?: number; contained?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    let light = false;
    const stars = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8, // depth: bigger, brighter and faster when close
      tw: Math.random() * Math.PI * 2,
      c: AURORA[i % AURORA.length],
    }));

    const readTheme = () => {
      // the canvas inherits --c-fg from its section, so a dark band reads as dark even on the light theme
      const v = getComputedStyle(cv).getPropertyValue("--c-fg").trim().split(/\s+/).map(Number);
      light = v.length === 3 ? v[0] + v[1] + v[2] < 300 : false;
    };

    const resize = () => {
      if (contained && cv.parentElement) {
        const r = cv.parentElement.getBoundingClientRect();
        w = r.width;
        h = r.height;
      } else {
        w = window.innerWidth;
        h = window.innerHeight;
      }
      cv.width = Math.max(1, w * dpr);
      cv.height = Math.max(1, h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      raf = 0;
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      const sy = contained ? 0 : window.scrollY;
      const t = reduce ? 0 : time / 1000;
      for (const s of stars) {
        const y = (((s.y * h - sy * 0.08 * s.z - t * 4 * s.z) % h) + h) % h;
        const x = s.x * w + Math.sin(t * 0.1 + s.tw) * 6 * s.z;
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.3 + s.tw);
        if (light) {
          const a = (0.16 + s.z * 0.42) * pulse;
          const r = 0.8 + s.z * 1.5;
          ctx.fillStyle = `rgba(${s.c},${(a * 0.22).toFixed(3)})`; // soft halo
          ctx.beginPath();
          ctx.arc(x, y, r * 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${s.c},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const a = (0.15 + s.z * 0.45) * pulse;
          ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.5 + s.z * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    readTheme();
    resize();
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const mo = new MutationObserver(() => {
      readTheme();
      kick();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const ro = contained && cv.parentElement ? new ResizeObserver(() => { resize(); kick(); }) : null;
    if (ro && cv.parentElement) ro.observe(cv.parentElement);
    window.addEventListener("resize", resize);
    const onScroll = () => {
      if (reduce) kick();
    };
    const onVis = () => {
      if (!document.hidden) kick();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    kick();
    return () => {
      mo.disconnect();
      ro?.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count, contained]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${contained ? "absolute inset-0 z-0" : "fixed inset-0 z-[-1]"} ${className}`}
    />
  );
}

export default Starfield;
