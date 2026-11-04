import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/section-heading";

/** Common questions, on a light band to break the rhythm of the dark page. */
const FaqSection = () => {
  const { lang } = useLang();
  const es = lang === "es";
  const [open, setOpen] = useState<number | null>(0);

  const items = es
    ? [
        { q: "¿Cuánto tiempo toma un proyecto?", a: "Depende del alcance. Antes de empezar definimos juntos qué incluye y te comparto un cronograma con fechas claras para cada entrega." },
        { q: "¿Qué tecnologías usas?", a: "Principalmente React, TypeScript, Node.js y Python, con Tailwind para la interfaz. Elijo la herramienta según lo que necesita tu proyecto, no al revés." },
        { q: "¿Puedes trabajar sobre un sitio o sistema que ya tengo?", a: "Sí. Reviso lo que tienes, te digo qué conviene mejorar y qué conviene rehacer, y trabajamos desde ahí." },
        { q: "¿Cómo es el proceso de trabajo?", a: "Empezamos con una llamada para entender tu negocio, definimos alcance y prioridades, y te muestro avances conforme construimos para que opines en cada etapa." },
        { q: "¿Qué pasa después del lanzamiento?", a: "Te acompaño con ajustes, mantenimiento y mejoras. Tu producto no se queda solo el día que sale." },
        { q: "¿Cómo se calcula el costo?", a: "Según el alcance y la complejidad. Después de la primera llamada te envío una propuesta con el precio y todo lo que incluye." },
      ]
    : [
        { q: "How long does a project take?", a: "It depends on the scope. Before we start we agree on what's included and I share a timeline with clear dates for every delivery." },
        { q: "What technologies do you use?", a: "Mainly React, TypeScript, Node.js and Python, with Tailwind for the interface. I pick the tool your project needs, not the other way around." },
        { q: "Can you work on a site or system I already have?", a: "Yes. I review what you have, tell you what's worth improving and what's worth rebuilding, and we take it from there." },
        { q: "What does working together look like?", a: "We start with a call to understand your business, agree on scope and priorities, and I show you progress as we build so you can weigh in at every stage." },
        { q: "What happens after launch?", a: "I stay on for fixes, maintenance and improvements. Your product isn't left alone the day it ships." },
        { q: "How is the cost calculated?", a: "By scope and complexity. After our first call I send you a proposal with the price and everything it includes." },
      ];

  return (
    <section id="faq" className="on-light relative z-20 bg-[#f4f4f6] text-[#0a0a0a] py-28 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <SectionHeading
          index="05"
          label={es ? "Preguntas frecuentes" : "FAQ"}
          title={es ? "Lo que suelen" : "What people"}
          muted={es ? "preguntarme." : "usually ask."}
          align="center"
          light
        />
        <ul className="mt-14 flex flex-col gap-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`rounded-2xl border bg-white transition-colors ${isOpen ? "border-black/15" : "border-black/[0.07] hover:border-black/15"}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-7 py-6"
                >
                  <span className="text-[17px] md:text-lg font-medium text-[#0a0a0a] -tracking-[0.01em]">{it.q}</span>
                  <Plus size={20} className={`shrink-0 text-black/50 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
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
                      <p className="px-6 md:px-7 pb-6 -mt-1 text-[15px] leading-relaxed text-black/60 max-w-2xl">{it.a}</p>
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
