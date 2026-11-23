import { useEffect, useRef, useState } from "react";
import { DraftingCompass, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

/**
 * "Blueprint mode": one button draws the site's own construction lines over it, like an architect's plan.
 * The 12-column grid the layout really uses, rulers on the edges, every section boxed and named with its
 * live size, and an inspector that measures whatever is under the cursor (size, padding, type).
 * Nothing here is made up: it's all read from the page as it is.
 */

const BLUE = "#8FB0FF";
const VIOLET = "#B7A8FF";
const PINK = "#FF9AB0";
const PEACH = "#FFC48A";
const INK = "#0B0B0D";
const BONE = "#F2F0EA";

const SECTION_NAMES: Record<string, [string, string]> = {
  about: ["Sobre mí", "About"],
  process: ["Proceso", "Process"],
  projects: ["Mi trabajo", "My work"],
  services: ["Servicios", "Services"],
  faq: ["Preguntas", "FAQ"],
  cta: ["Llamado", "Call to action"],
  contact: ["Contacto", "Contact"],
};

export default function BlueprintMode() {
  const { lang } = useLang();
  const es = lang === "es";
  const [on, setOn] = useState(false);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOn(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("fx-blueprint", on);
    if (!on) return;
    const cv = cvRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    let mx = -1, my = -1;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOn(false);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);

    const light = () => !document.documentElement.classList.contains("dark");
    const mono = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";

    const tag = (text: string, x: number, y: number, bg: string, fg: string) => {
      ctx.font = mono;
      const tw = ctx.measureText(text).width;
      const px = Math.min(Math.max(x, 2), w - tw - 14);
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(px, y, tw + 12, 18, 4);
      ctx.fill();
      ctx.fillStyle = fg;
      ctx.fillText(text, px + 6, y + 12.5);
    };

    const nameOf = (el: HTMLElement, i: number) => {
      const n = el.dataset.bp || (el.id && SECTION_NAMES[el.id]?.[es ? 0 : 1]) || el.getAttribute("aria-label");
      if (n) return n;
      if (el.tagName === "FOOTER") return es ? "Pie" : "Footer";
      if (el.tagName === "NAV") return es ? "Navegación" : "Navigation";
      return i === 0 ? (es ? "Portada" : "Hero") : es ? "Sección" : "Section";
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
      const lt = light();
      const line = lt ? "rgba(11,11,13,0.35)" : "rgba(143,176,255,0.55)";
      const faint = lt ? "rgba(143,176,255,0.09)" : "rgba(143,176,255,0.06)";

      // 12 columns, the same container every section uses (max-w-7xl, px-6 / md:px-8)
      const cols = w < 768 ? 4 : 12;
      const pad = w < 768 ? 24 : 32;
      const cw = Math.min(1280, w);
      const x0 = (w - cw) / 2 + pad;
      const inner = cw - pad * 2;
      const gut = w < 768 ? 16 : 24;
      const colW = (inner - gut * (cols - 1)) / cols;
      for (let i = 0; i < cols; i++) {
        const cx = x0 + i * (colW + gut);
        ctx.fillStyle = faint;
        ctx.fillRect(cx, 0, colW, h);
      }
      ctx.strokeStyle = line;
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0 + 0.5, 0);
      ctx.lineTo(x0 + 0.5, h);
      ctx.moveTo(x0 + inner - 0.5, 0);
      ctx.lineTo(x0 + inner - 0.5, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // sections
      const secs = Array.from(document.querySelectorAll<HTMLElement>("main section, main footer, footer")).filter(
        (s) => !s.parentElement?.closest("section, footer") && s.offsetHeight > 40,
      );
      const seen = new Set<HTMLElement>();
      let idx = 0;
      secs.forEach((s) => {
        if (seen.has(s)) return;
        seen.add(s);
        const r = s.getBoundingClientRect();
        const i = idx++;
        if (r.bottom < 0 || r.top > h) return;
        ctx.strokeStyle = [BLUE, VIOLET, PINK, PEACH][i % 4];
        ctx.globalAlpha = 0.9;
        ctx.setLineDash([6, 5]);
        ctx.strokeRect(r.left + 4.5, r.top + 0.5, r.width - 9, r.height - 1);
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        const label = `§ ${String(i + 1).padStart(2, "0")} · ${nameOf(s, i)} · ${Math.round(r.width)} × ${Math.round(r.height)}`;
        const ly = r.top + 8 >= 84 ? r.top + 8 : r.bottom > 150 ? 84 : -1;
        if (ly >= 0) tag(label, r.left + 26, ly, [BLUE, VIOLET, PINK, PEACH][i % 4], INK);
      });

      // inspector: whatever is under the cursor
      if (mx >= 0) {
        const el = document.elementFromPoint(mx, my) as HTMLElement | null;
        if (el && !el.closest("[data-bp-ui]") && el !== document.body && el !== document.documentElement) {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          const pt = parseFloat(cs.paddingTop), pr = parseFloat(cs.paddingRight), pb = parseFloat(cs.paddingBottom), pl = parseFloat(cs.paddingLeft);
          // padding, shaded
          ctx.fillStyle = "rgba(255,196,138,0.22)";
          ctx.fillRect(r.left, r.top, r.width, pt);
          ctx.fillRect(r.left, r.bottom - pb, r.width, pb);
          ctx.fillRect(r.left, r.top + pt, pl, r.height - pt - pb);
          ctx.fillRect(r.right - pr, r.top + pt, pr, r.height - pt - pb);
          ctx.strokeStyle = PINK;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(r.left + 0.5, r.top + 0.5, r.width - 1, r.height - 1);
          ctx.lineWidth = 1;
          // crosshair to the edges of the screen
          ctx.strokeStyle = lt ? "rgba(11,11,13,0.25)" : "rgba(242,240,234,0.22)";
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(0, r.top + 0.5);
          ctx.lineTo(w, r.top + 0.5);
          ctx.moveTo(0, r.bottom - 0.5);
          ctx.lineTo(w, r.bottom - 0.5);
          ctx.moveTo(r.left + 0.5, 0);
          ctx.lineTo(r.left + 0.5, h);
          ctx.moveTo(r.right - 0.5, 0);
          ctx.lineTo(r.right - 0.5, h);
          ctx.stroke();
          ctx.setLineDash([]);
          const hasText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent?.trim());
          const t = el.tagName.toLowerCase();
          const size = `${Math.round(r.width)} × ${Math.round(r.height)}`;
          const type = hasText ? ` · ${Math.round(parseFloat(cs.fontSize))}/${Math.round(parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2)} · ${cs.fontWeight}` : "";
          const padT = pt || pr || pb || pl ? ` · pad ${Math.round(pt)} ${Math.round(pr)} ${Math.round(pb)} ${Math.round(pl)}` : "";
          const below = r.bottom + 26 < h;
          tag(`${t} · ${size}${type}${padT}`, r.left, below ? r.bottom + 6 : r.top - 24, INK, BONE);
        }
      }

      // rulers
      const rs = 18;
      ctx.fillStyle = lt ? "rgba(242,240,234,0.92)" : "rgba(11,11,13,0.9)";
      ctx.fillRect(0, 0, w, rs);
      ctx.fillRect(0, 0, rs, h);
      ctx.strokeStyle = lt ? "rgba(11,11,13,0.35)" : "rgba(242,240,234,0.35)";
      ctx.fillStyle = lt ? "rgba(11,11,13,0.6)" : "rgba(242,240,234,0.6)";
      ctx.font = "500 8px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.beginPath();
      for (let x = 0; x < w; x += 8) {
        const major = x % 80 === 0;
        ctx.moveTo(x + 0.5, rs);
        ctx.lineTo(x + 0.5, rs - (major ? 8 : x % 40 === 0 ? 5 : 3));
        if (major && x > 0) ctx.fillText(String(x), x + 3, 8);
      }
      const sy = window.scrollY;
      const first = Math.ceil(sy / 8) * 8;
      for (let y = first; y < sy + h; y += 8) {
        const vy = y - sy;
        const major = y % 80 === 0;
        ctx.moveTo(rs, vy + 0.5);
        ctx.lineTo(rs - (major ? 8 : y % 40 === 0 ? 5 : 3), vy + 0.5);
        if (major && vy > rs + 6) {
          ctx.save();
          ctx.translate(8, vy - 3);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(String(y), 0, 0);
          ctx.restore();
        }
      }
      ctx.stroke();
      if (mx >= 0) {
        ctx.fillStyle = PINK;
        ctx.fillRect(mx - 0.5, 0, 1, rs);
        ctx.fillRect(0, my - 0.5, rs, 1);
      }
      ctx.fillStyle = lt ? INK : BONE;
      ctx.fillRect(0, 0, rs, rs);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("fx-blueprint");
    };
  }, [on, es]);

  return (
    <>
      {on && <canvas ref={cvRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[85]" />}
      <button
        data-bp-ui
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        aria-label={es ? "Ver planos del sitio" : "Show the site blueprint"}
        className={`group fixed z-[86] left-[max(0.75rem,env(safe-area-inset-left))] bottom-[max(0.75rem,env(safe-area-inset-bottom))] inline-flex items-center h-8 rounded-full border text-[10px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${
          on
            ? "gap-2 px-3 border-transparent bg-[#0B0B0D] text-[#F2F0EA]"
            : "px-2 border-white/10 bg-paper/60 text-white/40 opacity-60 hover:opacity-100 hover:text-white hover:border-white/30 focus-visible:opacity-100"
        }`}
        style={on ? { boxShadow: "0 0 0 1px #8FB0FF, 0 10px 30px -10px rgba(143,176,255,0.6)" } : undefined}
      >
        {on ? <X size={13} /> : <DraftingCompass size={14} />}
        {/* quiet by default: just the compass; the words slide out on hover */}
        <span
          className={
            on
              ? ""
              : "max-w-0 overflow-hidden whitespace-nowrap transition-[max-width,margin] duration-300 group-hover:max-w-[7rem] group-hover:ml-2 group-focus-visible:max-w-[7rem] group-focus-visible:ml-2"
          }
        >
          {on ? (es ? "Cerrar planos" : "Close blueprint") : es ? "Ver planos" : "Blueprint"}
        </span>
      </button>
      {on && (
        <div data-bp-ui className="fixed z-[86] right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] rounded-xl bg-[#0B0B0D] text-[#F2F0EA] px-4 py-3 font-mono text-[10px] leading-relaxed shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] max-w-[240px] pointer-events-none">
          <div className="text-[#8FB0FF] tracking-[0.14em] uppercase mb-1">{es ? "Modo planos" : "Blueprint mode"}</div>
          {es ? "Retícula de 12 columnas · reglas en px · pasa el cursor sobre cualquier cosa para medirla." : "12-column grid · rulers in px · hover anything to measure it."}
        </div>
      )}
    </>
  );
}
