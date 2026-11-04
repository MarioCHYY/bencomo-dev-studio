import { useEffect, useRef } from "react";

/**
 * A soft ring that trails the mouse and grows over links and buttons.
 * The real cursor stays visible; this is decoration only. Desktop mouse only.
 */
export function CursorFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current, dot = dotRef.current;
    if (!fine || reduce || !ring || !dot) return;
    let x = -100, y = -100, rx = -100, ry = -100, s = 1, ts = 1, o = 0, to = 0;
    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      s += (ts - s) * 0.15;
      o += (to - o) * 0.12;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`;
      ring.style.opacity = o.toFixed(3);
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = o.toFixed(3);
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      to = 1;
      const el = e.target as HTMLElement | null;
      ts = el && el.closest("a, button, [role='button'], input, textarea, select") ? 2.2 : 1;
    };
    const leave = () => (to = 0);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] w-9 h-9 rounded-full border border-white/40 mix-blend-difference opacity-0 hidden md:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference opacity-0 hidden md:block"
      />
    </>
  );
}

export default CursorFollower;
