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
    { label: t(translations.nav.projects), href: "#projects" },
    { label: t(translations.nav.skills), href: "#skills" },
    { label: t(translations.nav.experience), href: "#experience" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <a href="#" className="flex items-center gap-2 text-primary font-mono text-sm font-bold group">
          <Terminal size={14} className="group-hover:glow-text transition-all" />
          <span className="glow-text">MB</span>
          <span className="text-muted-foreground/30 text-xs hidden sm:inline">// dev</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-muted-foreground hover:text-primary px-3 py-2 transition-colors duration-200 font-mono relative group"
            >
              {l.label}
              <span className="absolute bottom-0 left-3 right-3 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}

          <div className="w-px h-4 bg-border/30 mx-2" />

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-[10px] font-mono px-2 py-1 text-muted-foreground hover:text-primary transition-all tracking-widest"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <a
            href="#contact"
            className="text-xs font-mono px-5 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ml-2"
          >
            {t(translations.nav.cta)}
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary p-1">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-t border-border/30"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono py-2"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-border/20 mt-2">
                <button
                  onClick={() => setLang(lang === "en" ? "es" : "en")}
                  className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-all"
                >
                  [{lang === "en" ? "ES" : "EN"}]
                </button>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="text-xs font-mono px-4 py-2 bg-primary text-primary-foreground"
                >
                  {t(translations.nav.cta)}
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
