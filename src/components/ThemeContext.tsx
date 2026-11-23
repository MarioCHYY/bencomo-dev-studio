import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { skyAt } from "@/lib/sun";

export type Theme = "light" | "dark";
/** a manual pick lasts until the sun next rises or sets, then the sky takes over again */
const MANUAL = "bencomo-theme-manual";

interface ThemeContextType {
  theme: Theme;
  /** true while the theme follows the sun over Culiacán */
  auto: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const readManual = (): Theme | null => {
  try {
    const raw = localStorage.getItem(MANUAL);
    if (!raw) return null;
    const { theme, until } = JSON.parse(raw) as { theme: Theme; until: number };
    if (Date.now() < until && (theme === "light" || theme === "dark")) return theme;
    localStorage.removeItem(MANUAL);
  } catch {
    /* private mode */
  }
  return null;
};
const skyTheme = (): Theme => (skyAt().night ? "dark" : "light");

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0B0B0D" : "#F2F0EA");
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [manual, setManual] = useState<Theme | null>(readManual);
  const [sky, setSky] = useState<Theme>(skyTheme);
  const theme = manual ?? sky;

  // follow the sun: check every half minute (and when the tab comes back)
  useEffect(() => {
    const tick = () => {
      setSky(skyTheme());
      setManual(readManual());
    };
    const iv = window.setInterval(tick, 30_000);
    const onVis = () => !document.hidden && tick();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    apply(theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    try {
      if (t === skyTheme()) localStorage.removeItem(MANUAL);
      else localStorage.setItem(MANUAL, JSON.stringify({ theme: t, until: skyAt().nextChange }));
    } catch {
      /* private mode */
    }
    setManual(t === skyTheme() ? null : t);
  }, []);
  const toggleTheme = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme, setTheme]);

  return <ThemeContext.Provider value={{ theme, auto: manual === null, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
