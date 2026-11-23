import { useEffect, useRef } from "react";

/** fine film grain, as a tiny SVG noise tile */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/**
 * A soft aurora light that follows the cursor across dark surfaces, with a film grain on top,
 * as if you were lighting the page with a lamp.
 * - default: fills its positioned parent (cards, dark bands). Only lights up while that surface is dark.
 * - `fixed`: covers the whole page behind the content, only on the dark theme.
 * On touch screens the light drifts on its own, slowly.
 */
export default function AuroraLamp({ fixed = false, strength = 1 }: { fixed?: boolean; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let dark = true;
    const readTheme = () => {
      if (fixed) dark = document.documentElement.classList.contains("dark");
      else {
        const v = getComputedStyle(el).getPropertyValue("--c-fg").trim().split(/\s+/).map(Number);
        dark = v.length === 3 ? v[0] + v[1] + v[2] > 300 : true;
      }
      el.style.display = dark ? "" : "none";
    };
    readTheme();
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let tx = 0.7, ty = 0.3, x = 0.7, y = 0.3, on = fine ? 0 : 0.6, ton = fine ? 0 : 0.6;
    let raf = 0;
    let inView = true;
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) kick();
    });
    io.observe(el);

    const frame = (time: number) => {
      raf = 0;
      if (!inView || document.hidden || !dark) return;
      if (!fine && !reduce) {
        const t = time / 1000;
        tx = 0.5 + 0.32 * Math.sin(t * 0.21);
        ty = 0.45 + 0.28 * Math.sin(t * 0.17 + 1.3);
      }
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      on += (ton - on) * 0.08;
      el.style.setProperty("--lx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--ly", `${(y * 100).toFixed(2)}%`);
      el.style.setProperty("--lo", (on * strength).toFixed(3));
      const moving = Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(ton - on) > 0.001;
      if (moving || (!fine && !reduce)) raf = requestAnimationFrame(frame);
    };
    function kick() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      ton = inside ? 1 : 0;
      if (inside) {
        tx = (e.clientX - r.left) / r.width;
        ty = (e.clientY - r.top) / r.height;
      }
      kick();
    };
    const onLeave = () => {
      ton = 0;
      kick();
    };
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    kick();
    return () => {
      mo.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fixed, strength]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? "fixed inset-0 z-[-1]" : "absolute inset-0 z-[1] rounded-[inherit]"} overflow-hidden`}
      style={{ ["--lx" as string]: "70%", ["--ly" as string]: "30%", ["--lo" as string]: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--lo)",
          background:
            "radial-gradient(520px circle at var(--lx) var(--ly), rgba(183,168,255,0.16), rgba(143,176,255,0.08) 38%, transparent 70%)," +
            "radial-gradient(300px circle at calc(var(--lx) + 6%) calc(var(--ly) + 8%), rgba(255,154,176,0.12), transparent 70%)," +
            "radial-gradient(240px circle at calc(var(--lx) - 5%) calc(var(--ly) + 10%), rgba(255,196,138,0.08), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ opacity: 0.06, backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
      />
    </div>
  );
}
