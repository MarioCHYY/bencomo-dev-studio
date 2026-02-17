import { Github, Linkedin, ArrowUp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border/20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] text-muted-foreground/50 font-display tracking-wider">
          © 2026 Mario Héctor Bencomo Moreno
        </span>
        <div className="flex items-center gap-5">
          <a href="https://github.com/MarioCHYY" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-primary hover:neon-text transition-all">
            <Github size={14} />
          </a>
          <a href="https://www.linkedin.com/in/mario-bencomo-4998273aa/" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-primary hover:neon-text transition-all">
            <Linkedin size={14} />
          </a>
          <span className="text-[10px] text-muted-foreground/30 font-display tracking-wider">
            {t(translations.footer.builtWith)}
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-muted-foreground/30 hover:text-primary transition-colors"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
