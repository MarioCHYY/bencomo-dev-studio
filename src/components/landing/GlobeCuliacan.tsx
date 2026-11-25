import { useEffect, useRef, useState } from "react";
import type { GlobeHandle } from "./GlobeScene";

/** The dotted Earth turned to Culiacán, with a label that follows the city's pulse. */
export default function GlobeCuliacan({ es, className = "" }: { es: boolean; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    if (!ok) {
      setFailed(true);
      return;
    }
    let handle: GlobeHandle | null = null;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("./GlobeScene")
      .then(({ createGlobe }) => {
        if (cancelled) return;
        handle = createGlobe(el, {
          reducedMotion,
          // the label is moved by hand every frame (no React re-render)
          onPin: (x, y, visible) => {
            const l = label.current;
            if (!l) return;
            l.style.left = `${x}%`;
            l.style.top = `${y}%`;
            l.style.opacity = visible ? "1" : "0";
          },
        });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      handle?.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* atmosphere */}
      <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(183,168,255,0.16),rgba(143,176,255,0.07)_45%,transparent_70%)]" />
      <div ref={host} className="absolute inset-0" role="img" aria-label={es ? "El mundo en puntos, girado hacia Culiacán, Sinaloa" : "The world in dots, turned toward Culiacán, Sinaloa"} />
      <div ref={label} aria-hidden="true" className="pointer-events-none absolute opacity-0 transition-opacity duration-700" style={{ left: "50%", top: "50%" }}>
        {/* hangs under the pulse, centred, so it fits on any width */}
        <div className="absolute left-0 top-0 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
          <span className="mt-4 w-px h-6 bg-[linear-gradient(180deg,transparent,#FF9AB0)]" />
          <span className="rounded-full border border-white/15 bg-paper/70 backdrop-blur-sm px-3 py-1.5 leading-none">
            <span className="text-[13px] font-semibold text-white">Culiacán</span>
            <span className="ml-2 font-code text-[10px] text-white/50">24.81° N · 107.39° {es ? "O" : "W"}</span>
          </span>
        </div>
      </div>
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-center font-code text-xs text-white/45">
          Culiacán · 24.81° N · 107.39° {es ? "O" : "W"}
        </div>
      )}
    </div>
  );
}
