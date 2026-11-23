import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Opening a case from its card: a link inside [data-fx-expand] grows that card to fill the screen,
 * then fades into the case study, so the card becomes its cover. Every other link navigates as usual.
 * The growing box only animates transform-friendly properties of one plain element.
 */

const raf2 = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type Box = { rect: DOMRect; color: string; radius: string };

export default function PageTransition() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = useRef(pathname);
  path.current = pathname;
  const busy = useRef(false);
  const [box, setBox] = useState<Box | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ready = async (to: string) => {
      const t0 = performance.now();
      while (performance.now() - t0 < 3000) {
        if (path.current === to && !document.querySelector("[data-page-loader]")) break;
        await wait(30);
      }
      await raf2();
    };

    const run = async (to: string, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const cs = getComputedStyle(card);
      setBox({ rect, color: cs.backgroundColor || "#0B0B0D", radius: cs.borderTopLeftRadius || "36px" });
      await raf2();
      const el = boxRef.current;
      if (!el) return navigate(to);
      // grow with a scale (compositor) instead of width/height
      const sx = window.innerWidth / rect.width, sy = window.innerHeight / rect.height;
      const dx = -rect.left + (window.innerWidth - rect.width) / 2, dy = -rect.top + (window.innerHeight - rect.height) / 2;
      await animate(el, { x: dx, y: dy, scaleX: sx, scaleY: sy, borderRadius: "0px" }, { duration: 0.65, ease: [0.76, 0, 0.24, 1] });
      navigate(to);
      await ready(to.split(/[?#]/)[0]);
      window.scrollTo(0, 0);
      await animate(el, { opacity: 0 }, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      const card = a?.closest<HTMLElement>("[data-fx-expand]");
      if (!a || !card || !a.href || (a.target && a.target !== "_self")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (busy.current) return e.preventDefault();
      if (reduce) return;
      e.preventDefault();
      busy.current = true;
      run(url.pathname + url.search + url.hash, card)
        .catch(() => navigate(url.pathname))
        .finally(() => {
          busy.current = false;
          setBox(null);
        });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  if (!box) return null;
  const r = box.rect;
  return (
    <div className="fixed inset-0 z-[90]" aria-hidden="true">
      <div
        ref={boxRef}
        className="fixed will-change-transform"
        style={{ top: r.top, left: r.left, width: r.width, height: r.height, borderRadius: box.radius, backgroundColor: box.color, transformOrigin: "50% 50%" }}
      />
    </div>
  );
}
