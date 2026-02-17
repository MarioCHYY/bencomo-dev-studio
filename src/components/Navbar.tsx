import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t(translations.nav.about), href: "#about" },
    { label: t(translations.nav.education), href: "#education" },
    { label: t(translations.nav.experience), href: "#experience" },
    { label: t(translations.nav.projects), href: "#projects" },
    { label: t(translations.nav.skills), href: "#skills" },
    { label: t(translations.nav.services), href: "#services" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-2 text-primary glow-text font-mono text-sm font-bold">
          <Terminal size={16} />
          <span>mario.dev</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 font-mono"
            >
              <span className="text-primary/50 mr-1">./</span>
              {l.label}
            </a>
          ))}

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-xs font-mono px-2 py-1 border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all"
          >
            [{lang === "en" ? "ES" : "EN"}]
          </button>

          <a
            href="#contact"
            className="text-xs font-mono px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all glow"
          >
            {t(translations.nav.cta)}
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary">
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
            className="md:hidden bg-background/98 backdrop-blur-sm border-t border-border/50"
          >
            <div className="flex flex-col gap-3 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  <span className="text-primary/50 mr-1">$</span> {l.label}
                </a>
              ))}
              <button
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className="text-xs font-mono px-2 py-1 border border-border text-muted-foreground hover:text-primary transition-all w-fit"
              >
                [{lang === "en" ? "ES" : "EN"}]
              </button>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-xs font-mono px-4 py-1.5 border border-primary text-primary text-center"
              >
                {t(translations.nav.cta)}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
