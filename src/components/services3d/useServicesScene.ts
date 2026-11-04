import { useEffect, useRef, useState, type RefObject } from "react";
import { useTheme } from "@/components/ThemeContext";
import type { ServicesSceneHandle } from "@/components/services3d/ServicesScene";

/**
 * Mounts the services 3D scene into `viewRef` and keeps it on the `active` model.
 * Rebuilt when the theme changes so the colours fit the page. Returns true when WebGL is unavailable.
 */
export function useServicesScene(viewRef: RefObject<HTMLElement>, active: number) {
  const { theme } = useTheme();
  const sceneRef = useRef<ServicesSceneHandle | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const [noGL, setNoGL] = useState(false);

  useEffect(() => {
    sceneRef.current?.setActive(active);
  }, [active]);

  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    let cancelled = false;
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    if (!ok) {
      setNoGL(true);
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("@/components/services3d/ServicesScene")
      .then(({ createServicesScene }) => createServicesScene(el, { reducedMotion, light: theme === "light" }))
      .then((h) => {
        if (cancelled) return h.dispose();
        sceneRef.current = h;
        h.setActive(activeRef.current);
      })
      .catch(() => !cancelled && setNoGL(true));
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [theme, viewRef]);

  return noGL;
}
