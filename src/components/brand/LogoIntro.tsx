import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/Logo";

const KEY = "bencomo-intro-seen";
const TOTAL = 2900; // ms until the overlay starts leaving
const AURORA = "linear-gradient(90deg, transparent 0%, #8FB0FF 28%, #B7A8FF 46%, #FF9AB0 66%, #FFC48A 82%, transparent 100%)";

function shouldPlay() {
  if (typeof window === "undefined") return false;
  if (window.location.pathname !== "/") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

/**
 * Brand opening: a line of light cuts the screen, the circle takes the hit and
 * its halves slip apart, then the wordmark wipes in. Once per session, skippable.
 */
const LogoIntro = () => {
  const [show, setShow] = useState(shouldPlay);
  const [open, setOpen] = useState(true);
  const small = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode: fine */
    }
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const settle = window.setTimeout(() => setOpen(false), 1150);
    const end = window.setTimeout(() => setShow(false), TOTAL);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.clearTimeout(settle);
      window.clearTimeout(end);
      window.removeEventListener("keydown", onKey);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          role="presentation"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050506] cursor-pointer"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* glow that blooms on impact */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(183,168,255,0.38), rgba(255,154,176,0.14) 28%, transparent 60%)" }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0, 1, 0.45], scale: [0.4, 0.4, 1, 1.15] }}
            transition={{ duration: 2.2, times: [0, 0.3, 0.42, 1], ease: "easeOut" }}
          />

          {/* impact flash */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,240,250,0.55), transparent 55%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 0] }}
            transition={{ duration: 1.3, times: [0, 0.55, 0.62, 1], delay: 0.45, ease: "easeOut" }}
          />

          {/* the cut */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[2px] w-[170vmax] origin-center"
            style={{ x: "-50%", y: "-50%", rotate: -34, background: AURORA, boxShadow: "0 0 24px 2px rgba(183,168,255,0.45)" }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.45, 1], ease: "easeOut", delay: 0.2 }}
          />

          {/* logo: mark first, then the word wipes in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, clipPath: "inset(-20% 85% -20% 0%)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(-20% 0% -20% 0%)" }}
            transition={{
              opacity: { duration: 0.2, delay: 0.85 },
              scale: { duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] },
              clipPath: { duration: 0.9, delay: 1.45, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <BrandLogo height={small ? 58 : 120} open={open} title="Bencomo" />
          </motion.div>

          <motion.span
            className="absolute bottom-10 text-[11px] font-semibold tracking-[0.3em] text-white/40 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            Saltar
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoIntro;
