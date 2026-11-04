import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/brand/Logo";

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { label: t(translations.nav.home), href: "/" },
    { label: t(translations.nav.about), href: "/sobre-mi" },
    { label: t(translations.nav.projects), href: "/portafolio" },
    { label: t(translations.nav.services), href: "/servicios" },
    { label: t(translations.nav.contact), href: "/contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ThemeToggle = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? (lang === "es" ? "Cambiar a modo claro" : "Switch to light mode") : lang === "es" ? "Cambiar a modo oscuro" : "Switch to dark mode"}
      className={`w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-colors ${className}`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );

  const LangPill = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center rounded-full border border-white/15 p-0.5 text-[11px] font-semibold ${className}`}>
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-full transition-colors ${lang === l ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
        scrolled ? "bg-paper/75 backdrop-blur-xl border-white/[0.06]" : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 h-[72px] grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">
        <Link
          to="/"
          aria-label="Bencomo, inicio"
          className="w-fit"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          onFocus={() => setLogoHover(true)}
          onBlur={() => setLogoHover(false)}
        >
          <BrandLogo height={26} open={logoHover} title="Bencomo" />
        </Link>

        {/* Desktop links, centred */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                className={`relative px-3.5 py-2 text-[14px] transition-colors ${active ? "text-white" : "text-white/55 hover:text-white"}`}
              >
                {l.label as string}
                {active && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-white/70" />}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center justify-end gap-3">
          <ThemeToggle />
          <LangPill />
          <Link
            to="/contacto"
            className="text-[13px] font-semibold px-4 py-2 rounded-full bg-white text-black hover:bg-white/85 transition-colors"
          >
            {t(translations.nav.cta)}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden justify-self-end text-white p-2 -mr-2" aria-label="Abrir menú" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-paper/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`text-2xl font-medium py-1.5 ${pathname === l.href ? "text-white" : "text-white/55"}`}
                >
                  {l.label as string}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-5 mt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LangPill />
                </div>
                <Link
                  to="/contacto"
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold px-5 py-2.5 rounded-full bg-white text-black"
                >
                  {t(translations.nav.cta)}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
