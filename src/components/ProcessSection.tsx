import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

/** How I work: three principles as numbered cards. */
const ProcessSection = () => {
  const { lang } = useLang();
  const es = lang === "es";

  const steps = es
    ? [
        { title: "Entender tu negocio", text: "Antes de diseñar nada, entiendo cómo funciona tu negocio, a quién le hablas y qué te está frenando hoy.", tag: "Descubrimiento" },
        { title: "Diseñar y construir", text: "Diseño la experiencia y la programo a la medida, mostrándote avances reales en cada etapa para que opines a tiempo.", tag: "Diseño + Código" },
        { title: "Lanzar y crecer", text: "Publico, mido y ajusto. Tu producto queda listo para crecer junto con tu negocio, no solo para el día del lanzamiento.", tag: "Lanzamiento" },
      ]
    : [
        { title: "Understand your business", text: "Before designing anything, I learn how your business works, who you talk to and what is holding you back today.", tag: "Discovery" },
        { title: "Design and build", text: "I design the experience and build it from scratch, showing you real progress at every stage so you can weigh in on time.", tag: "Design + Code" },
        { title: "Launch and grow", text: "I ship, measure and adjust. Your product is ready to grow with your business, not just for launch day.", tag: "Launch" },
      ];

  return (
    <section id="process" className="relative py-28 md:py-36">
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          index="02"
          label={es ? "Cómo trabajo" : "How I work"}
          title={es ? "Un proceso claro," : "A clear process,"}
          muted={es ? "sin sorpresas." : "no surprises."}
          intro={es ? "Tres principios que guían cada proyecto, desde la primera llamada hasta después del lanzamiento." : "Three principles behind every project, from the first call to well after launch."}
        />

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard max={5} lift={6} className="group h-full rounded-[22px]">
                <article className="relative h-full min-h-[340px] rounded-[22px] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-8 flex flex-col overflow-hidden transition-colors duration-500 group-hover:border-white/20">
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-4 font-heading font-bold text-[6.5rem] leading-none -tracking-[0.06em] text-white/[0.045] group-hover:text-white/[0.09] transition-colors duration-500 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-auto flex flex-col gap-4">
                    <h3 className="font-heading font-semibold text-white text-2xl -tracking-[0.02em]">{s.title}</h3>
                    <p className="text-white/55 text-[15px] leading-relaxed">{s.text}</p>
                    <span className="mt-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/35">
                      <span className="h-px w-10 bg-white/25 transition-all duration-500 group-hover:w-14 group-hover:bg-white/60" />
                      {s.tag}
                    </span>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
