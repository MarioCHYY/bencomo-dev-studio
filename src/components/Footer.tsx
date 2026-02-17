import { Github, Linkedin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="py-6 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground">
          <span className="text-primary mr-1">$</span>
          © 2026 Mario Héctor Bencomo Moreno
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/MarioCHYY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={14} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={14} />
          </a>
          <span className="text-[10px] text-muted-foreground/50">
            {t(translations.footer.builtWith)}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
