import { useEffect, useRef } from "react";

/**
 * Very quiet background of drifting dots behind the whole page.
 * Plain 2D canvas, ~120 dots, parallax with scroll. Paused when the tab is hidden.
 */
export function Starfield({ count = 120 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    const stars = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8, // depth: bigger, brighter and faster when close
      tw: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      raf = 0;
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      const t = reduce ? 0 : time / 1000;
      for (const s of stars) {
        const y = (((s.y * h - sy * 0.08 * s.z - t * 4 * s.z) % h) + h) % h;
        const x = s.x * w + Math.sin(t * 0.1 + s.tw) * 6 * s.z;
        const a = (0.15 + s.z * 0.45) * (0.7 + 0.3 * Math.sin(t * 1.3 + s.tw));
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 0.5 + s.z * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onScroll = () => {
      if (reduce && !raf) raf = requestAnimationFrame(draw);
    };
    const onVis = () => {
      if (!document.hidden && !raf) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1]" />;
}

export default Starfield;
