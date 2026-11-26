import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/section-heading";
// the questions live in a JSON file so the build can also write them into the page HTML and its structured data
import faq from "@/seo/faq.json";

/** Common questions, on a light band to break the rhythm of the dark page. */
const FaqSection = () => {
  const { lang } = useLang();
  const es = lang === "es";
  const [open, setOpen] = useState<number | null>(0);

  const items = es ? faq.es : faq.en;

  return (
    <section id="faq" className="cv-auto theme-flip bg-paper relative z-20 py-28 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <SectionHeading
          index="06"
          label={es ? "Preguntas frecuentes" : "FAQ"}
          title={es ? "Lo que suelen" : "What people"}
          muted={es ? "preguntarme." : "usually ask."}
          align="center"
        />
        <ul data-seo-faq className="mt-14 flex flex-col gap-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`rounded-2xl border bg-white/[0.04] transition-colors ${isOpen ? "border-white/25" : "border-white/10 hover:border-white/25"}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-7 py-6"
                >
                  <span className="text-[17px] md:text-lg font-medium text-white -tracking-[0.01em]">{it.q}</span>
                  <Plus size={20} className={`shrink-0 text-white/50 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-7 pb-6 -mt-1 text-[15px] leading-relaxed text-white/60 max-w-2xl">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqSection;
