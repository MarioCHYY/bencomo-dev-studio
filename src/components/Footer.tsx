import { Github, Linkedin, ArrowUp, Heart } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border/30">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>© 2026 Mario Bencomo</span>
          <span className="text-primary">•</span>
          <span className="font-handwriting text-base text-primary/70">{t({ en: "Made with love", es: "Hecho con amor" })} 💖</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/MarioCHYY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/mario-bencomo-4998273aa/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-secondary transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-muted/60"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
