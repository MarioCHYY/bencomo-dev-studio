import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { Browser } from "@/components/work/CaseUI";

const ease = [0.22, 1, 0.36, 1] as const;
export const TACHADO = {
  yellow: "#FFD84D",
  red: "#CF2338",
  ink: "#151515",
  site: "https://tachado.mariobencomodev.com",
  bot: "https://t.me/Tachado_ofertas_bot",
  channel: "https://t.me/ofertas_tachado",
  code: "https://github.com/MarioCHYY/Amazon-Tracker-bot",
};

export function TachadoLogo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/work/tachado/avatar.webp" alt="" width={size} height={size} className="rounded-[22%]" />
      <span className="font-heading font-bold text-white -tracking-[0.03em]" style={{ fontSize: size * 0.78 }}>Tachado</span>
    </span>
  );
}

/** Tachado, shown big on the home and on /portafolio (same layout as corte's card) */
const TachadoCard = () => {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease }}
      className="theme-dark group relative overflow-hidden rounded-[24px] md:rounded-[36px] border border-white/10"
      style={{ backgroundColor: TACHADO.ink }}
    >
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(60% 70% at 78% 40%, rgba(255,216,77,0.14), transparent 70%)" }} />
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <TachadoLogo size={34} />
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60">{es ? "Caso 02 · 2026" : "Case 02 · 2026"}</span>
            </div>
            <h3 className="font-heading font-semibold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.02] -tracking-[0.04em]" style={{ textWrap: "balance" } as Record<string, string>}>
              {es ? "El precio tachado" : "The crossed-out price"}{" "}
              <span style={{ color: TACHADO.yellow }}>{es ? "no siempre dice la verdad." : "doesn't always tell the truth."}</span>
            </h3>
            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-md">
              {es
                ? "Bot de Telegram que guarda el historial de precios de Amazon México, avisa cuando baja lo que sigues y revisa si cada oferta es un descuento real o un precio inflado."
                : "A Telegram bot that keeps Amazon Mexico's price history, alerts you when what you follow drops, and checks whether each deal is a real discount or an inflated price."}
            </p>
            <ul className="flex flex-wrap gap-2">
              {(es ? ["Bot de Telegram", "Página web", "Python", "Next.js", "Datos"] : ["Telegram bot", "Website", "Python", "Next.js", "Data"]).map((t) => (
                <li key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75">{t}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/portafolio/tachado"
              className="group/b inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[#151515] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: TACHADO.yellow }}
            >
              {es ? "Ver caso de estudio" : "Read the case study"}
              <ArrowUpRight size={16} className="transition-transform group-hover/b:translate-x-0.5 group-hover/b:-translate-y-0.5" />
            </Link>
            <a href={TACHADO.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 hover:text-white hover:border-white/40 transition-colors">
              {es ? "Ver en vivo" : "See it live"}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* the site, with the price chart floating over it */}
        <div className="relative flex items-center min-h-[260px] sm:min-h-[360px]">
          <Browser src="/work/tachado/panel.webp" alt={es ? "Página de Tachado" : "Tachado website"} url="tachado.mariobencomodev.com" className="w-full transition-transform duration-700 group-hover:-translate-y-1" />
          <div className="absolute -bottom-2 -left-2 sm:left-[-6%] w-[52%] rounded-[12px] overflow-hidden border border-black/10 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-1">
            <img src="/work/tachado/grafica.webp" alt="" loading="lazy" className="block w-full" />
          </div>
          <img src="/work/tachado/avatar.webp" alt="" className="absolute -top-3 right-3 w-14 sm:w-20 rounded-[22%] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] rotate-6 transition-transform duration-700 group-hover:rotate-12" />
        </div>
      </div>
    </motion.article>
  );
};

export default TachadoCard;
