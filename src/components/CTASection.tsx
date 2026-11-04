import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { SectionHeading } from "@/components/ui/section-heading";

const EMAIL = "mariobencomo057@gmail.com";

const channels = [
  { name: "WhatsApp", handle: "+52 667 496 2484", href: "https://wa.me/526674962484?text=Hola%20Mario,%20me%20gustaría%20hablar%20sobre%20un%20proyecto." },
  { name: "LinkedIn", handle: "Mario Bencomo", href: "https://www.linkedin.com/in/mario-bencomo-4998273aa/" },
  { name: "GitHub", handle: "@MarioCHYY", href: "https://github.com/MarioCHYY" },
  { name: "Instagram", handle: "@mario_bencomo06", href: "https://www.instagram.com/mario_bencomo06" },
];

/** Closing section: one big line, one clear action, and every way to reach me. */
const CTASection = () => {
  const { t, lang } = useLang();
  const es = lang === "es";
  const c = translations.ctaSection;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const r = document.createRange();
      const el = document.getElementById("cta-email");
      if (el) {
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden pt-28 md:pt-40 pb-24">
      {/* soft RGB horizon, same palette as the hero dots */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(143,176,255,0.18),rgba(183,168,255,0.08)_40%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_40%_at_78%_100%,rgba(255,154,176,0.10),transparent_70%)]" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading index="04" label={es ? "Contacto" : "Contact"} />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-heading font-extrabold text-white text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] -tracking-[0.035em] max-w-5xl"
          style={{ textWrap: "balance" } as Record<string, string>}
        >
          {t(c.title)}
        </motion.h2>
        <p className="mt-6 text-[#A0A5B0] font-light text-lg md:text-xl max-w-2xl">{t(c.subtitle)}</p>

        <div className="mt-14 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-start">
          {/* primary action + email */}
          <div className="flex flex-col gap-6">
            <a
              href="/contacto"
              className="group w-fit inline-flex items-center gap-3 rounded-full bg-white text-black pl-7 pr-2 py-2 text-base font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              {t(c.button)}
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                <ArrowUpRight size={18} />
              </span>
            </a>
            <div className="flex items-center gap-3 text-white/60">
              <span id="cta-email" className="font-mono text-sm md:text-base select-all">{EMAIL}</span>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:border-white/40 transition-colors"
                aria-live="polite"
              >
                {copied ? <Check size={13} className="text-[#9fe8c4]" /> : <Copy size={13} />}
                {copied ? (es ? "Copiado" : "Copied") : es ? "Copiar" : "Copy"}
              </button>
            </div>
          </div>

          {/* channels */}
          <ul className="border-t border-white/10">
            {channels.map((ch, i) => (
              <motion.li
                key={ch.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <a
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 border-b border-white/10"
                >
                  <span className="font-heading font-bold text-white text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2">{ch.name}</span>
                  <span className="flex items-center gap-3 text-white/45 group-hover:text-white transition-colors">
                    <span className="text-sm hidden sm:inline">{ch.handle}</span>
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
