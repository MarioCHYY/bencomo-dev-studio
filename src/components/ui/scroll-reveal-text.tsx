import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { onIntroOpen } from "@/lib/intro";
import { createChaser } from "@/lib/chase";

type Segment = { text: string; className?: string };

interface ScrollRevealTextProps {
  /** plain text… */
  text?: string;
  /** …or several parts, each with its own final colour (e.g. a white line and a muted one) */
  segments?: Segment[];
  className?: string;
  as?: ElementType;
  /** opacity of words that haven't been reached yet */
  dim?: number;
  /** "scroll": lights up as it scrolls through the screen. "load": plays once when it first shows (page titles). */
  trigger?: "scroll" | "load";
  /** extra wait before a "load" title plays, in ms */
  delay?: number;
}

/**
 * Text that lights up word by word: each word rises from dim, flashes in the aurora for a moment
 * and settles into its own colour.
 * Performance: one number (--p) per block drives every word through CSS, so there is no per-word
 * JavaScript, no animation library and no extra layers; it only listens to scroll while on screen.
 */
export function ScrollRevealText({ text, segments, className, as: Tag = "p", dim = 0.16, trigger = "scroll", delay = 0 }: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [reduce, setReduce] = useState(false);
  const parts: Segment[] = segments ?? [{ text: text ?? "" }];
  const words = parts.flatMap((s) => s.text.split(/\s+/).filter(Boolean).map((w) => ({ w, cls: s.className })));
  const n = Math.max(1, words.length);
  const span = Math.min(6, Math.max(2.5, n * 0.25)); // how many words the glow trails behind
  const full = parts.map((s) => s.text).join(" ");

  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    // progress goes past 1 so the glow on the last words also fades out
    const end = (n + span + 1) / n;
    let last = -1;
    const set = (p: number) => {
      const v = Math.round(Math.max(0, Math.min(end, p)) * 1000) / 1000;
      if (v !== last) {
        last = v;
        el.style.setProperty("--p", String(v));
      }
    };
    set(0);

    if (trigger === "load") {
      let raf = 0, t0 = 0, timer = 0;
      const dur = Math.min(2200, Math.max(1100, n * 110));
      const tick = (t: number) => {
        if (!t0) t0 = t;
        const k = Math.min(1, (t - t0) / dur);
        set(end * (1 - Math.pow(1 - k, 2))); // ease out
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        timer = window.setTimeout(() => (raf = requestAnimationFrame(tick)), delay);
      };
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          start();
        }
      });
      const off = onIntroOpen(() => io.observe(el));
      return () => {
        off();
        io.disconnect();
        clearTimeout(timer);
        cancelAnimationFrame(raf);
      };
    }

    // scroll: from when the top enters low on the screen until it reaches ~40% from the top.
    // The words follow the scroll through a chaser, so a fast flick still shows the aurora passing.
    let raf = 0;
    const chase = createChaser(set, { range: end, upMs: Math.min(1500, Math.max(1000, n * 70)), downMs: 600 });
    const progress = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return Math.max(0, Math.min(end, (vh * 0.92 - r.top) / (vh * 0.52)));
    };
    const measure = () => {
      raf = 0;
      chase.to(progress());
    };
    // start dim: a title that's already on screen when the page opens still gets its sweep
    chase.jump(0);
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    let listening = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else if (!e.isIntersecting) {
          if (listening) window.removeEventListener("scroll", onScroll);
          listening = false;
          chase.jump(progress()); // off screen: settle at the right end (fully lit above, dim below)
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      chase.stop();
    };
  }, [reduce, trigger, n, span, delay]);

  if (reduce) {
    return (
      <Tag ref={ref} className={className}>
        {parts.map((s, i) => (
          <span key={i} className={s.className}>
            {i > 0 ? " " : ""}
            {s.text}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={cn("srt flex flex-wrap", className)} style={{ "--n": n, "--dim": dim, "--s": span } as CSSProperties}>
      <span className="sr-only">{full}</span>
      {words.map(({ w, cls }, i) => (
        <span key={i} aria-hidden="true" className="srt-w" style={{ "--i": i } as CSSProperties}>
          <span className={cn("srt-plain", cls)}>{w}</span>
          <span className="srt-glow">{w}</span>
        </span>
      ))}
    </Tag>
  );
}

export default ScrollRevealText;
