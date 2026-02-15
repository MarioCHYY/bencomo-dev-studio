import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold text-gradient font-mono">
          {"<MB />"}
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-xs font-mono px-3 py-1.5 rounded-lg border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t(translations.nav.cta)}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { setLang(lang === "en" ? "es" : "en"); }}
                className="text-xs font-mono px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-primary transition-all w-fit"
              >
                {lang === "en" ? "ES" : "EN"}
              </button>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-sm font-medium px-5 py-2 rounded-lg bg-primary text-primary-foreground text-center"
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
