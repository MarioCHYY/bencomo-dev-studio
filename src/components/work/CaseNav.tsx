import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * The case's own bar, like the local nav on Apple's product pages: once you're past the opening,
 * a slim bar slides in under the main navigation with the project's name, its chapters (the one you're
 * reading is marked; click to jump) and a button to see it live.
 */
export interface CaseChapter {
  id: string;
  label: string;
}

type LenisLike = { scrollTo: (target: HTMLElement | number, o?: { offset?: number; duration?: number }) => void };

export default function CaseNav({
  name,
  chapters,
  live,
  accent,
  accentInk = "#0B0B0D",
}: {
  name: ReactNode;
  chapters: CaseChapter[];
  live: { href: string; label: string };
  accent: string;
  accentInk?: string;
}) {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(-1);
  const raf = useRef(0);

  useEffect(() => {
    const measure = () => {
      raf.current = 0;
      const els = chapters.map((c) => document.getElementById(c.id));
      const first = els[0];
      setShown(!!first && first.getBoundingClientRect().top < window.innerHeight * 0.85);
      let a = -1;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < 170) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -128, duration: 1.2 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 128, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed left-0 right-0 top-[72px] z-40 border-b border-white/[0.07] bg-paper/90 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 h-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0">{name}</span>
          {/* on phones there's no room for every chapter: show the one you're in */}
          <span className="md:hidden truncate text-[13px] text-white/50">{active >= 0 ? chapters[active].label : ""}</span>
        </div>
        <nav className="hidden md:flex items-center gap-1" aria-label="Capítulos">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => jump(c.id)}
              aria-current={i === active ? "true" : undefined}
              className={`px-3 py-1.5 text-[13px] rounded-full transition-colors ${i === active ? "text-white" : "text-white/50 hover:text-white"}`}
            >
              {c.label}
            </button>
          ))}
        </nav>
        <a
          href={live.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: accent, color: accentInk }}
        >
          {live.label} <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}
