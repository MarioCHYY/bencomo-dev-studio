import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { FaceSceneHandle, FaceSceneState } from "./FaceScene";

interface HeroFace3DProps {
  /** Hero <section> */
  sectionRef: RefObject<HTMLElement>;
  /** Box the face should fill (the old photo box) */
  anchorRef: RefObject<HTMLElement>;
  /** Called when WebGL is unavailable so the parent can show the static photo */
  onFail?: () => void;
}

const STATE_LABEL: Record<FaceSceneState, string> = {
  loading: "booting",
  assembling: "assembling mesh",
  scanning: "scanning texture",
  live: "live · tracking cursor",
  dispersing: "dispersing",
};

/** Sections where the particles re-form, in scroll order */
const SECTION_IDS = ["about", "projects", "services", "cta"];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroFace3D({ sectionRef, anchorRef, onFail }: HeroFace3DProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const ptsRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [hudOn, setHudOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const layer = layerRef.current;
    const section = sectionRef.current;
    const anchor = anchorRef.current;
    if (!layer || !section || !anchor) return;
    if (!hasWebGL()) {
      onFail?.();
      return;
    }

    let handle: FaceSceneHandle | null = null;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      window.matchMedia("(max-width: 767px)").matches ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;

    import("./FaceScene")
      .then(({ createFaceScene }) =>
        createFaceScene({
          container: layer,
          anchor,
          section,
          getSections: () => SECTION_IDS.map((id) => document.getElementById(id)),
          textureUrl: "/hero3d/face.webp",
          depthUrl: "/hero3d/depth.png",
          reducedMotion,
          lowPower,
          onFrame: ({ pct, state, points }) => {
            if (ptsRef.current) ptsRef.current.textContent = `${points.toLocaleString("en-US")} pts`;
            if (stateRef.current) stateRef.current.textContent = STATE_LABEL[state];
            if (pctRef.current) pctRef.current.textContent = `${pct}%`;
            if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
          },
        }),
      )
      .then((h) => {
        if (cancelled) {
          h.dispose();
          return;
        }
        handle = h;
        setHudOn(true);
      })
      .catch((err) => {
        console.warn("[HeroFace3D] fallback a foto estática:", err);
        if (!cancelled) onFail?.();
      });

    return () => {
      cancelled = true;
      handle?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return (
    <>
      {/* Page-wide canvas: fixed to the viewport, above section backgrounds, below content (z-20+) */}
      {mounted &&
        createPortal(
          <div ref={layerRef} className="fixed inset-0 z-[15] pointer-events-none" aria-hidden="true" />,
          document.body,
        )}

      {/* Readout under the face, desktop only */}
      <div
        aria-hidden="true"
        className={`hidden lg:flex absolute z-40 bottom-[7%] left-6 md:left-12 xl:left-[max(3rem,calc((100vw-80rem)/2+3rem))] w-[220px] flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7d8496] pointer-events-none transition-opacity duration-700 ${hudOn ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex justify-between gap-4">
          <span>face.recon</span>
          <span ref={ptsRef} className="text-white/90 tabular-nums">0 pts</span>
        </div>
        <span className="relative block h-px bg-white/10 overflow-hidden">
          <span
            ref={barRef}
            className="absolute inset-0 origin-left bg-[linear-gradient(90deg,#8fb0ff,#c9a8ff,#ff9aa8,#ffd99a)]"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
        <div className="flex justify-between gap-4">
          <span ref={stateRef} className="text-primary">booting</span>
          <span ref={pctRef} className="text-white/90 tabular-nums">0%</span>
        </div>
      </div>
    </>
  );
}
