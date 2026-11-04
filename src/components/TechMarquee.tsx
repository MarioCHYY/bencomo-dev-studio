import { useEffect, useRef } from "react";

const skills = [
  { name: "React", icon: "react-original" },
  { name: "TypeScript", icon: "typescript-original" },
  { name: "JavaScript", icon: "javascript-original" },
  { name: "Node.js", icon: "nodejs-original" },
  { name: "Python", icon: "python-original" },
  { name: "Tailwind CSS", icon: "tailwindcss-original" },
  { name: "Git", icon: "git-original" },
  { name: "Docker", icon: "docker-original" },
  { name: "Java", icon: "java-original" },
  { name: "Figma", icon: "figma-original" },
];

const iconUrl = (icon: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.split("-")[0]}/${icon}.svg`;

/**
 * Tech stack as a 3D carousel: the logos orbit around an invisible axis,
 * the front ones big and bright, the back ones small and dim.
 * Drag (or swipe) to spin it; it slows down while hovered.
 */
const TechMarquee = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = skills.length;
    let angle = 0;
    let vel = reduce ? 0 : 0.0035;
    let base = vel;
    let hover = false;
    let drag = false;
    let lastX = 0;
    let raf = 0;
    let visible = false;

    const layout = () => {
      const w = stage.clientWidth;
      const R = Math.min(520, Math.max(170, w * 0.42));
      for (let i = 0; i < n; i++) {
        const el = itemsRef.current[i];
        if (!el) continue;
        const a = angle + (i / n) * Math.PI * 2;
        const x = Math.sin(a) * R;
        const z = Math.cos(a) * R * 0.45;
        const y = Math.cos(a) * R * 0.12; // front sits lower: the orbit is seen from slightly above
        const depth = (Math.cos(a) + 1) / 2; // 0 back → 1 front
        const s = 0.7 + depth * 0.3;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${s.toFixed(3)})`;
        el.style.opacity = (0.18 + depth * 0.82).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.45 ? `blur(${((0.45 - depth) * 4).toFixed(1)}px)` : "none";
      }
    };

    const loop = () => {
      raf = 0;
      if (!visible) return;
      const target = hover && !drag ? base * 0.25 : base;
      if (!drag) vel += (target - vel) * 0.04;
      angle += vel;
      layout();
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(stage);

    const down = (e: PointerEvent) => {
      drag = true;
      lastX = e.clientX;
      stage.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      vel = dx * 0.004;
    };
    const up = () => {
      drag = false;
      base = reduce ? 0 : Math.sign(vel || 1) * 0.0035;
    };
    const enter = () => (hover = true);
    const leave = () => (hover = false);
    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    window.addEventListener("resize", layout);
    layout();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <div className="relative z-20 w-full mt-16 border-t border-b dark:border-white/[0.04] border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 pt-8 flex items-center justify-between gap-4">
        <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-primary/80">Stack · {skills.length} tools</span>
        <span className="hidden sm:block text-[10px] font-mono tracking-[0.22em] uppercase text-white/30">Drag to spin ↔</span>
      </div>

      <div
        ref={stageRef}
        className="relative h-[230px] sm:h-[260px] cursor-grab active:cursor-grabbing select-none touch-pan-y"
        style={{ perspective: "1200px" }}
      >
        {/* orbit ellipse */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[calc(50%-20px)] w-[84%] max-w-[1040px] aspect-[1/0.12] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/20 shadow-[0_0_40px_rgba(51,133,255,0.12)_inset]"
        />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 w-[60%] h-20 -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-3xl rounded-full" />

        <div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d" }}>
          {skills.map((s, i) => (
            <div
              key={s.name}
              ref={(el) => (itemsRef.current[i] = el)}
              className="absolute -left-[46px] -top-[56px] w-[92px] flex flex-col items-center gap-3 group will-change-transform"
            >
              <div className="h-[72px] w-[72px] rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_10px_40px_-12px_rgba(51,133,255,0.45)] group-hover:border-primary/60 group-hover:bg-primary/10 transition-colors duration-300">
                <img
                  src={iconUrl(s.icon)}
                  alt={s.name}
                  draggable={false}
                  loading="lazy"
                  className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(51,133,255,0.9)] transition-all duration-300"
                />
              </div>
              <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/50 group-hover:text-primary transition-colors whitespace-nowrap">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
