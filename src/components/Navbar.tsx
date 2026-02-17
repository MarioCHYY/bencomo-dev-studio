import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t(translations.nav.about), href: "#about", emoji: "🛏️" },
    { label: t(translations.nav.projects), href: "#projects", emoji: "🖥️" },
    { label: t(translations.nav.skills), href: "#skills", emoji: "📚" },
    { label: t(translations.nav.services), href: "#services", emoji: "🖼️" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-card/90 backdrop-blur-md border-b border-border/40 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 py-3">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg group">
          <span className="text-xl">🏠</span>
          <span className="pop-gradient-text">Mario</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-full hover:bg-muted/60 transition-all duration-200 font-medium flex items-center gap-1.5"
            >
              <span className="text-sm">{l.emoji}</span>
              {l.label}
            </a>
          ))}

          <div className="w-px h-5 bg-border mx-2" />

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
          >
            {lang === "en" ? "🇪🇸 ES" : "🇺🇸 EN"}
          </button>

          <a
            href="#contact"
            className="text-sm font-display font-semibold px-5 py-2 bg-primary text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ml-2 flex items-center gap-1.5"
          >
            📱 {t(translations.nav.cta)}
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-1">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/98 backdrop-blur-md border-t border-border/30"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 flex items-center gap-2 font-medium"
                >
                  <span>{l.emoji}</span> {l.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-border/20 mt-2">
                <button
                  onClick={() => setLang(lang === "en" ? "es" : "en")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-muted text-muted-foreground"
                >
                  {lang === "en" ? "🇪🇸 ES" : "🇺🇸 EN"}
                </button>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="text-sm font-display font-semibold px-4 py-2 bg-primary text-primary-foreground rounded-full"
                >
                  📱 {t(translations.nav.cta)}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
