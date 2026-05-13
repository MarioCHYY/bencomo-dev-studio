import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useTheme } from "@/components/ThemeContext";

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t(translations.nav.about), href: "#about" },
    { label: t(translations.nav.projects), href: "#projects" },
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
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12 py-4">
        <a href="#" className="flex items-center transition-opacity duration-300 hover:opacity-80">
          <img 
            src="/logo-mb.png" 
            alt="Mario Bencomo" 
            className="h-10 md:h-12 w-auto object-contain dark:invert transition-all duration-500" 
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-normal dark:text-white/[0.35] text-[#505060] hover:text-[#0A0A0A] dark:hover:text-white/80 px-3 py-2 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}

          <div className="w-px h-4 dark:bg-white/10 bg-black/10 mx-2" />

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-[10px] font-bold px-2 py-1 dark:text-white/[0.35] text-[#505060] hover:text-[#0A0A0A] dark:hover:text-white/80 transition-all tracking-widest"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          
          {/* Theme toggle temporarily disabled
          <button
            onClick={toggleTheme}
            className="p-2 ml-1 rounded-full dark:text-white/[0.35] text-[#505060] hover:text-[#0A0A0A] dark:hover:text-white/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          */}

          <a
            href="#contact"
            className="text-sm font-medium px-8 py-3 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 ml-4"
          >
            {t(translations.nav.cta)}
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden dark:text-white text-[#0A0A0A] p-2 -mr-1" aria-label="Toggle menu">
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
            className="md:hidden overflow-hidden bg-[#F8F8F8] dark:bg-[#050505]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm dark:text-white/[0.35] text-[#505060] hover:text-[#0A0A0A] dark:hover:text-white/80 transition-colors py-2"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t dark:border-white/10 border-black/10 mt-2">
                <div className="flex gap-4">
                  <button
                    onClick={() => setLang(lang === "en" ? "es" : "en")}
                    className="text-xs font-bold dark:text-white/[0.35] text-[#505060] hover:text-[#0A0A0A] dark:hover:text-white/80 transition-all"
                  >
                    {lang === "en" ? "ES" : "EN"}
                  </button>
                  {/* Theme toggle temporarily disabled
                  <button
                    onClick={toggleTheme}
                    className="text-xs font-bold dark:text-white/[0.35] text-[#505060] hover:text-[#0A0A0A] dark:hover:text-white/80 transition-all"
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                  </button>
                  */}
                </div>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium px-7 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300"
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
