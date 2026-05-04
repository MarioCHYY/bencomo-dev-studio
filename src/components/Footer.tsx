import { Github, Linkedin, ArrowUp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="py-8 px-6 md:px-12 border-t dark:border-[rgba(255,255,255,0.05)] border-[rgba(0,0,0,0.05)] dark:bg-[#030303]/80 bg-[#F8F8F8]/80 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] dark:text-[rgba(255,255,255,0.2)] text-black/40 font-normal tracking-widest uppercase transition-colors duration-500">
          © 2026 Mario Héctor Bencomo Moreno
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/MarioCHYY"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-[rgba(255,255,255,0.2)] text-black/40 hover:text-primary transition-colors"
          >
            <Github size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/mario-bencomo-4998273aa/"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-[rgba(255,255,255,0.2)] text-black/40 hover:text-primary transition-colors"
          >
            <Linkedin size={14} />
          </a>
          <span className="text-[10px] dark:text-[rgba(255,255,255,0.2)] text-black/40 font-normal tracking-widest uppercase transition-colors duration-500">
            {t(translations.footer.builtWith)}
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="dark:text-[rgba(255,255,255,0.2)] text-black/40 hover:text-primary transition-colors dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 p-2 rounded-full"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
