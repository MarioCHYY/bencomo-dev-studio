import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand/Logo";
import { introPlays, markIntroOpen } from "@/lib/intro";

/**
 * Opening shot, once per visit: the screen starts closed like the two halves of the mark,
 * the mark appears in the middle, and when the page is ready the halves slip apart on the 34° cut
 * with the aurora glowing on their edges.
 * Everything that moves is a CSS transform on prebuilt layers, so the browser animates it off the
 * main thread and it stays smooth even while the page underneath is still starting up.
 */

const AURORA = "linear-gradient(90deg, transparent 4%, #8FB0FF 30%, #B7A8FF 45%, #FF9AB0 60%, #FFC48A 74%, transparent 96%)";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function IntroCut() {
  const [phase, setPhase] = useState<"cover" | "open" | "done">(introPlays ? "cover" : "done");

  useEffect(() => {
    document.documentElement.classList.remove("intro-boot");
    if (!introPlays) return;
    let alive = true;
    document.documentElement.style.overflow = "hidden";
    (async () => {
      const t0 = performance.now();
      // the mark gets its moment, and the page gets time to load behind the cover
      await wait(900);
      while (alive && performance.now() - t0 < 3200 && document.querySelector("[data-page-loader]")) await wait(40);
      try {
        await Promise.race([document.fonts.ready, wait(600)]);
      } catch {
        /* no font api */
      }
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (!alive) return;
      setPhase("open");
      document.documentElement.style.overflow = "";
      markIntroOpen();
      await wait(1300);
      if (alive) setPhase("done");
    })();
    return () => {
      alive = false;
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;
  const opened = phase === "open";
  const ease = "cubic-bezier(0.76, 0, 0.24, 1)";
  const half = (top: boolean) => ({
    transform: opened ? (top ? "translate3d(14vmax, -82vmax, 0)" : "translate3d(-14vmax, 82vmax, 0)") : "translate3d(0, 0, 0)",
    transition: `transform 1.15s ${ease}`,
    willChange: "transform",
  });

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{ pointerEvents: opened ? "none" : "auto" }} aria-hidden="true">
      {/* one big square turned to the angle of the cut; its two halves are the two pieces */}
      <div className="absolute left-1/2 top-1/2 w-[300vmax] h-[300vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[34deg]">
        <div className="absolute inset-x-0 top-0 h-1/2" style={half(true)}>
          <div className="absolute inset-0 bg-[#0B0B0D]" />
          <div className="absolute inset-x-0 bottom-0 h-[90px]" style={{ background: AURORA, opacity: 0.45, WebkitMaskImage: "linear-gradient(to top, black, transparent)", maskImage: "linear-gradient(to top, black, transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: AURORA }} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={half(false)}>
          <div className="absolute inset-0 bg-[#0B0B0D]" />
          <div className="absolute inset-x-0 top-0 h-[90px]" style={{ background: AURORA, opacity: 0.45, WebkitMaskImage: "linear-gradient(to bottom, black, transparent)", maskImage: "linear-gradient(to bottom, black, transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: AURORA }} />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ opacity: opened ? 0 : 1, transform: opened ? "scale(1.15)" : "none", transition: "opacity 0.45s ease 0.15s, transform 0.7s ease" }}>
          <div className="intro-mark">
            <BrandMark size={84} tone="light" open={opened} />
          </div>
        </div>
      </div>
    </div>
  );
}
