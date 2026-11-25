import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { AURORA } from "@/components/landing/LandingUI";

/** drag (or use the arrow keys) to move the line between the generic page and the designed one */
export default function Compare({ id, name, es }: { id: string; name: string; es: boolean }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const touched = useRef(false);
  const dragging = useRef(false);
  const follow = (x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };

  // the first time it shows up, the line sweeps a little so it's obvious it moves
  useEffect(() => {
    if (!seen || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctl = animate(50, [70, 32, 50], {
      duration: 1.8,
      ease: "easeInOut",
      delay: 0.2,
      onUpdate: (v) => {
        if (!touched.current) setPos(v);
      },
    });
    return () => ctl.stop();
  }, [seen]);

  const label = es ? "Genérica" : "Generic";
  const label2 = es ? "Diseñada" : "Designed";

  const jump = (to: number) => {
    touched.current = true;
    animate(pos, to, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setPos,
    });
  };
  const chip = (to: number, text: string, on: boolean) => (
    <button
      type="button"
      onClick={() => jump(to)}
      aria-pressed={on}
      className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${on ? "bg-white text-black" : "border border-white/15 text-white/70 hover:text-white hover:border-white/40"}`}
    >
      {text}
    </button>
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        className="relative w-full overflow-hidden rounded-[18px] border border-white/[0.1] bg-black select-none aspect-[1440/900] cursor-ew-resize has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#B7A8FF]"
        style={{ touchAction: "pan-y" }}
        // drag anywhere on the picture (mouse, finger or pen); vertical swipes still scroll the page
        onPointerDown={(e) => {
          dragging.current = true;
          touched.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          follow(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && follow(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img
          src={`/ejemplos/${id}-despues-desk.webp`}
          alt={
            es
              ? `Versión diseñada de la página de ${name}`
              : `Designed version of the ${name} page`
          }
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <img
          src={`/ejemplos/${id}-antes-desk.webp`}
          alt={
            es
              ? `Versión genérica de la página de ${name}`
              : `Generic version of the ${name} page`
          }
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <span
          className="absolute left-3 top-3 md:left-4 md:top-4 rounded-full bg-black/70 backdrop-blur px-3 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-white/90"
          style={{ opacity: pos > 12 ? 1 : 0 }}
        >
          {label}
        </span>
        <span
          className="absolute right-3 top-3 md:right-4 md:top-4 rounded-full px-3 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-black"
          style={{ background: AURORA, opacity: pos < 88 ? 1 : 0 }}
        >
          {label2}
        </span>
        <div
          className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_24px_rgba(0,0,0,0.5)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black shadow-lg">
            <ChevronsLeftRight size={20} />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => {
            touched.current = true;
            setPos(Number(e.target.value));
          }}
          aria-label={
            es
              ? `Comparar la versión genérica y la diseñada de ${name}`
              : `Compare the generic and designed versions of ${name}`
          }
          className="sr-only"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {chip(100, label, pos > 97)}
        {chip(50, es ? "Las dos" : "Both", pos > 40 && pos < 60)}
        {chip(0, label2, pos < 3)}
        <span className="ml-auto text-[13px] text-white/40 hidden sm:block">
          {es ? "O arrastra la línea." : "Or drag the line."}
        </span>
      </div>
    </div>
  );
}
