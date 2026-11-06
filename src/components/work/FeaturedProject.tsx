import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;
export const CORTE = { lime: "#C6F432", ink: "#121417", site: "https://corte.mariobencomodev.com", app: "https://app.corte.mariobencomodev.com" };

/** corte's own mark (lime card cut in two) + its wordmark set in the site's heading font */
export function CorteLogo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src="/work/corte/corte-app-icon.svg" alt="" width={size} height={size} className="rounded-[22%]" />
      <span className="font-heading font-semibold text-white -tracking-[0.03em]" style={{ fontSize: size * 0.82 }}>corte</span>
    </span>
  );
}

/** A phone screenshot in a slim frame */
export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[22px] md:rounded-[30px] border border-white/15 bg-[#0b0c0e] p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="block w-full rounded-[17px] md:rounded-[24px]" />
    </div>
  );
}

/** The first real case study, shown big on the home and on /portafolio */
const FeaturedProject = () => {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease }}
      className="theme-dark group relative overflow-hidden rounded-[24px] md:rounded-[36px] border border-white/10"
      style={{ backgroundColor: CORTE.ink }}
    >
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(60% 70% at 78% 40%, rgba(198,244,50,0.16), transparent 70%)` }} />
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <CorteLogo size={34} />
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60">{es ? "Caso 01 · 2026" : "Case 01 · 2026"}</span>
            </div>
            <h3 className="font-heading font-semibold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.02] -tracking-[0.04em]" style={{ textWrap: "balance" } as Record<string, string>}>
              {es ? "La tarjeta es de una." : "The card is one person's."} <span style={{ color: CORTE.lime }}>{es ? "Las compras son de todos." : "The purchases are everyone's."}</span>
            </h3>
            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-md">
              {es
                ? "App para repartir gastos de la casa y controlar la tarjeta de crédito que todos usan: fecha de corte, fecha límite y meses sin intereses, sin hacer cuentas a mano."
                : "An app to split household expenses and keep track of the credit card everyone uses: statement dates, due dates and interest-free installments, without doing the math by hand."}
            </p>
            <ul className="flex flex-wrap gap-2">
              {(es ? ["Producto", "Diseño UI/UX", "Marca", "Next.js", "PostgreSQL"] : ["Product", "UI/UX design", "Brand", "Next.js", "PostgreSQL"]).map((t) => (
                <li key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75">{t}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/portafolio/corte"
              className="group/b inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[#121417] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: CORTE.lime }}
            >
              {es ? "Ver caso de estudio" : "Read the case study"}
              <ArrowUpRight size={16} className="transition-transform group-hover/b:translate-x-0.5 group-hover/b:-translate-y-0.5" />
            </Link>
            <a href={CORTE.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 hover:text-white hover:border-white/40 transition-colors">
              {es ? "Ver en vivo" : "See it live"}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* three screens fanned out */}
        <div className="relative h-[340px] sm:h-[460px] lg:h-[540px]">
          <Phone src="/work/corte/corte.webp" alt="" className="absolute left-[4%] top-[12%] w-[34%] -rotate-[7deg] opacity-80 transition-transform duration-700 group-hover:-translate-x-2 group-hover:-rotate-[9deg]" />
          <Phone src="/work/corte/gasto.webp" alt="" className="absolute right-[4%] top-[12%] w-[34%] rotate-[7deg] opacity-80 transition-transform duration-700 group-hover:translate-x-2 group-hover:rotate-[9deg]" />
          <Phone src="/work/corte/resumen.webp" alt={es ? "Pantalla de resumen de corte" : "corte summary screen"} className="absolute left-1/2 top-0 w-[38%] -translate-x-1/2 transition-transform duration-700 group-hover:-translate-y-2" />
        </div>
      </div>
    </motion.article>
  );
};

export default FeaturedProject;
