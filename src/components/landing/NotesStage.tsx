import { useEffect, useRef, useState } from "react";
import type { NotesHandle } from "./NotesScene";

/** The blog's 3D: the notes as a ring of cards. With `focus`, that note's card turns to the front. */
export default function NotesStage({ focus = null, es = true, label, className = "" }: { focus?: number | null; es?: boolean; label: string; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const handle = useRef<NotesHandle | null>(null);
  const focusRef = useRef(focus);
  focusRef.current = focus;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    handle.current?.focus(focus);
  }, [focus]);

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
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("./NotesScene")
      .then(({ createNotes }) => {
        if (cancelled) return;
        handle.current = createNotes(el, { reducedMotion, focus: focusRef.current, es });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      handle.current?.dispose();
      handle.current = null;
    };
  }, [es]);

  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(183,168,255,0.16),rgba(255,154,176,0.07)_45%,transparent_70%)]" />
      <div ref={host} className="absolute inset-0" role="img" aria-label={label} />
      {failed && <div className="absolute inset-0 flex items-center justify-center font-code text-xs text-white/45">{label}</div>}
    </div>
  );
}
