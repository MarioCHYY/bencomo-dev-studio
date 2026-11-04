import { useEffect, useRef, useState } from "react";
import { animate, useMotionValueEvent, useScroll } from "framer-motion";
import { Github, Linkedin, ArrowUp, Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { Starfield } from "@/components/ui/starfield";
import { BrandLogo, BrandMark, BrandWordmark } from "@/components/brand/Logo";

const Footer = () => {
  const { t } = useLang();
  const n = translations.nav;
  // the cut in the big mark opens once you reach the very bottom of the page (after a short pause),
  // slowly enough to be seen; it closes again when you scroll back up
  const bigRef = useRef<HTMLDivElement>(null);
  const [slip, setSlip] = useState(0);
  const [atBottom, setAtBottom] = useState(false);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => setAtBottom((was) => (was ? v > 0.97 : v > 0.995)));
  const slipRef = useRef(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctl = animate(slipRef.current, atBottom ? 1 : 0, {
      delay: atBottom ? 0.45 : 0,
      duration: reduce ? 0 : atBottom ? 1.4 : 0.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        slipRef.current = v;
        setSlip(v);
      },
    });
    return () => ctl.stop();
  }, [atBottom]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/MarioCHYY", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mario-bencomo-4998273aa/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/mario_bencomo06", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/526674962484", label: "WhatsApp" },
    { icon: Mail, href: "mailto:mariobencomo057@gmail.com", label: "Email" },
  ];
  const nav = [
    { label: t(n.home), to: "/" },
    { label: t(n.about), to: "/sobre-mi" },
    { label: t(n.projects), to: "/portafolio" },
    { label: t(n.services), to: "/servicios" },
    { label: t(n.contact), to: "/contacto" },
    { label: t({ en: "Privacy", es: "Privacidad" }), to: "/privacidad" },
  ];

  return (
    <footer className="relative z-20 overflow-hidden border-t border-white/[0.08] bg-paper dark:bg-[#0B0B0D]">
      <Starfield contained count={60} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-10 flex flex-col gap-14">
        <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-10 items-start">
          <div className="flex flex-col gap-3">
            <BrandLogo height={30} title="Bencomo" />
            <p className="text-white/45 text-sm max-w-xs leading-relaxed">{t(translations.footer.shortText)}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {nav.map((l) => (
              <Link key={l.to} to={l.to} className="text-white/50 hover:text-white transition-colors w-fit">
                {l.label as string}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* outlined wordmark: the real logo, always fits the width exactly */}
        <div ref={bigRef} className="relative select-none flex items-end gap-[2.2%]" aria-hidden="true">
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="footer-wordmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: "rgb(var(--c-fg))", stopOpacity: 0.2 }} />
                <stop offset="1" style={{ stopColor: "rgb(var(--c-fg))", stopOpacity: 0.01 }} />
              </linearGradient>
            </defs>
          </svg>
          <BrandMark tone="auto" open={slip} className="w-[13%] h-auto shrink-0 -mb-[1%] opacity-80" />
          <BrandWordmark className="w-full h-auto text-white/[0.09]" fill="url(#footer-wordmark)" stroke="currentColor" strokeWidth={3} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.14em] uppercase text-white/30">
          <span className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
            <span>{t(translations.footer.copyright)}</span>
            <Link to="/privacidad" className="hover:text-white transition-colors">{t({ en: "Privacy notice", es: "Aviso de privacidad" })}</Link>
          </span>
          <div className="flex items-center gap-4">
            <span>{t(translations.footer.builtWith)}</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
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
