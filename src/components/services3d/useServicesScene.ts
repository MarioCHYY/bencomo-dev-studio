import { useEffect, useRef, useState, type RefObject } from "react";
import { useTheme } from "@/components/ThemeContext";
import type { ServicesSceneHandle } from "@/components/services3d/ServicesScene";
import { translations } from "@/i18n/translations";

/**
 * The scenes hold one model per service in this fixed order. The services list can change
 * (order, services added or removed), so each service finds its model by id, not by position.
 */
const MODEL_ORDER = ["sitios-web", "ui-ux", "aplicaciones-web", "herramientas-internas", "rediseno-web", "prototipos-funcionales", "automatizacion", "inteligencia-artificial"];
const modelFor = (i: number) => {
  const m = MODEL_ORDER.indexOf(translations.services.items[i]?.id ?? "");
  return m < 0 ? 0 : m;
};

/**
 * Mounts the services 3D scene into `viewRef` and keeps it on the `active` model.
 * Rebuilt when the theme changes so the colours fit the page. Returns true when WebGL is unavailable.
 */
export function useServicesScene(viewRef: RefObject<HTMLElement>, active: number, variant: "story" | "classic" = "story") {
  const { theme } = useTheme();
  const sceneRef = useRef<ServicesSceneHandle | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const [noGL, setNoGL] = useState(false);

  useEffect(() => {
    sceneRef.current?.setActive(modelFor(active));
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
    // story: full looping films (/servicios); classic: gentle ambient loops (home)
    const load = variant === "classic" ? import("@/components/services3d/ServicesSceneClassic") : import("@/components/services3d/ServicesScene");
    load
      .then(({ createServicesScene }) => createServicesScene(el, { reducedMotion, light: theme === "light" }))
      .then((h) => {
        if (cancelled) return h.dispose();
        sceneRef.current = h;
        h.setActive(modelFor(activeRef.current));
      })
      .catch(() => !cancelled && setNoGL(true));
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [theme, viewRef, variant]);

  return noGL;
}
