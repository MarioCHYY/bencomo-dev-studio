import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/section-heading";
import { Starfield } from "@/components/ui/starfield";
import { BrandMark } from "@/components/brand/Logo";

const ease = [0.22, 1, 0.36, 1] as const;

const blobs = [
  "radial-gradient(circle at 30% 35%, rgba(143,176,255,0.55), transparent 55%), radial-gradient(circle at 75% 70%, rgba(183,168,255,0.4), transparent 55%)",
  "radial-gradient(circle at 65% 30%, rgba(183,168,255,0.5), transparent 55%), radial-gradient(circle at 30% 75%, rgba(255,154,176,0.42), transparent 55%)",
  "radial-gradient(circle at 40% 30%, rgba(255,154,176,0.48), transparent 55%), radial-gradient(circle at 70% 75%, rgba(255,196,138,0.42), transparent 55%)",
];

/**
 * "My work" while there are no case studies worth showing yet:
 * three veiled cards that drift with the aurora, and a way to start a project instead.
 * `page` renders it as the whole /portafolio page.
 */
const WorkComingSoon = ({ page = false }: { page?: boolean }) => {
  const { lang } = useLang();
  const es = lang === "es";

  const cards = es
    ? [
        { n: "01", kind: "Sitio web", hint: "Identidad y conversión" },
        { n: "02", kind: "Aplicación web", hint: "Producto a la medida" },
        { n: "03", kind: "Sistema para negocio", hint: "Procesos y datos" },
      ]
    : [
        { n: "01", kind: "Website", hint: "Identity and conversion" },
        { n: "02", kind: "Web application", hint: "Custom product" },
        { n: "03", kind: "Business system", hint: "Processes and data" },
      ];

  return (
    <section
      id="projects"
      className={`relative z-20 overflow-hidden ${page ? "min-h-[100svh] pt-36 md:pt-44 pb-28" : "theme-dark bg-paper py-28 md:py-36"}`}
    >
      {!page && <Starfield contained count={80} />}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          index="03"
          label={es ? "Mi trabajo" : "My work"}
          title={es ? "Casos de estudio," : "Case studies,"}
          muted={es ? "muy pronto." : "coming soon."}
          size={page ? "lg" : "lg"}
          intro={
            es
              ? "Estoy preparando proyectos que de verdad valga la pena mostrar, contados con su proceso completo. Mientras tanto, el mejor caso de estudio puede ser el tuyo."
              : "I'm preparing projects that are truly worth showing, told with their full process. Meanwhile, the best case study could be yours."
          }
          aside={
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/75">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7A8FF] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B7A8FF]" />
              </span>
              {es ? "Próximamente" : "Coming soon"}
            </span>
          }
        />

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="theme-dark group relative aspect-[4/5] md:aspect-[3/4] rounded-[24px] overflow-hidden border border-white/10 bg-[#0c0c0e]"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-[20%] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: blobs[i], animation: `aurora-drift ${14 + i * 3}s ease-in-out infinite`, animationDelay: `${-i * 4}s` }}
              />
              <div aria-hidden="true" className="absolute inset-0 backdrop-blur-[2px] bg-[linear-gradient(180deg,rgba(10,10,10,0.15),rgba(10,10,10,0.75))]" />
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                <BrandMark size={72} tone="light" className="opacity-25 group-hover:opacity-50 transition-opacity duration-700" open={false} />
              </div>

              <div className="relative h-full flex flex-col justify-between p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/50 tabular-nums">{es ? "Caso" : "Case"} {c.n}</span>
                  <span className="rounded-full border border-white/15 bg-black/30 backdrop-blur px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/70">
                    {es ? "Próximamente" : "Coming soon"}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading font-semibold text-white text-2xl -tracking-[0.02em]">{c.kind}</h3>
                  <p className="text-white/50 text-sm">{c.hint}</p>
                  <span className="relative mt-2 h-px w-full overflow-hidden bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                      style={{ animation: `soon-shimmer ${2.6 + i * 0.4}s ease-in-out infinite` }}
                    />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            {es ? "Cuéntame tu proyecto" : "Tell me about your project"}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/35 transition-colors"
          >
            {es ? "Ver lo que puedo construir" : "See what I can build"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkComingSoon;
