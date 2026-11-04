import { Github, Linkedin, ArrowUp, Instagram, Mail, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { t } = useLang();

  const socialLinks = [
    { icon: Github, href: "https://github.com/MarioCHYY", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mario-bencomo-4998273aa/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/mario_bencomo06?igsh=MXhjYXR2YnQwc3FodA%3D%3D&utm_source=qr", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/526674962484?text=Hola%20Mario,%20me%20gustaría%20hablar%20sobre%20un%20proyecto.", label: "WhatsApp" },
    { icon: Mail, href: "mailto:mariobencomo057@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative z-20 overflow-hidden border-t border-white/[0.05]">
      {/* Signature wordmark: outlined, fills with light on hover */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 select-none" aria-hidden="true">
        <div className="group relative font-heading font-extrabold uppercase leading-[0.85] -tracking-[0.04em] text-[17vw] lg:text-[13.5rem] whitespace-nowrap text-center">
          <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] transition-all duration-700">
            Bencomo
          </span>
          <span
            className="absolute inset-0 block text-transparent bg-clip-text bg-gradient-to-b from-primary/70 via-primary/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700"
            style={{ WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%)", maskImage: "linear-gradient(to bottom, black 30%, transparent 95%)" }}
          >
            Bencomo
          </span>
        </div>
      </div>

      <div className="relative py-8 px-4 sm:px-6 md:px-12 bg-[#030303]/80 backdrop-blur-md border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-white/25 font-normal tracking-widest uppercase">
            {t(translations.footer.copyright)}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-white/30 hover:text-primary hover:-translate-y-0.5 hover:drop-shadow-[0_0_10px_rgba(51,133,255,0.8)] transition-all p-1.5"
                aria-label={link.label}
              >
                <link.icon size={15} />
              </a>
            ))}
            <span className="text-[10px] text-white/25 font-normal tracking-widest uppercase ml-2">
              {t(translations.footer.builtWith)}
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-white/40 hover:text-white bg-white/5 hover:bg-primary border border-white/10 hover:border-primary p-2 rounded-full transition-all hover:shadow-[0_0_20px_rgba(51,133,255,0.6)]"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
