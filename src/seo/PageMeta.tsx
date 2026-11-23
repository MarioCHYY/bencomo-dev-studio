import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import pages from "./pages.json";

/**
 * Keeps the tab title, description and canonical URL right while you move around the site
 * (the HTML from the server only knows the page you landed on), and the <html lang> in step
 * with the language switch. Same text as the static pages, from src/seo/pages.json.
 */
const SITE = "https://www.mariobencomodev.com";
type Meta = { title: string; description: string };

const setMeta = (selector: string, attr: string, value: string) => {
  document.querySelector(selector)?.setAttribute(attr, value);
};

export default function PageMeta() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang === "es" ? "es-MX" : "en";
  }, [lang]);

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
    const meta = (pages as Record<string, Meta>)[path];
    if (!meta) {
      document.title = "Página no encontrada · Mario Bencomo";
      return;
    }
    const url = SITE + (path === "/" ? "/" : path);
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('link[rel="canonical"]', "href", url);
  }, [pathname]);

  return null;
}
