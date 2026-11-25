import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { MoreLink } from "@/components/ui/more-link";

/**
 * A tilted wall of real screens from the finished cases, sliding in opposite directions as you scroll.
 * Replaces the tech-logo strip: it shows the work itself instead of the tools.
 * Every tile opens its case.
 */

type Tile = { src: string; alt: [string, string]; to: string; tag: string };

const PHONES: Tile[] = [
  { src: "/work/corte/resumen.webp", alt: ["Resumen de corte", "corte summary"], to: "/portafolio/corte", tag: "corte" },
  { src: "/work/corte/gasto.webp", alt: ["Agregar un gasto en corte", "Adding an expense in corte"], to: "/portafolio/corte", tag: "corte" },
  { src: "/work/corte/corte.webp", alt: ["Estado de cuenta en corte", "Statement in corte"], to: "/portafolio/corte", tag: "corte" },
  { src: "/work/corte/movimientos.webp", alt: ["Movimientos en corte", "Transactions in corte"], to: "/portafolio/corte", tag: "corte" },
  { src: "/work/corte/cuenta.webp", alt: ["Cuenta en corte", "Account in corte"], to: "/portafolio/corte", tag: "corte" },
];
const WIDE: Tile[] = [
  { src: "/work/tachado/panel.webp", alt: ["Página de Tachado", "Tachado website"], to: "/portafolio/tachado", tag: "Tachado" },
  { src: "/work/corte/corte-intro.jpg", alt: ["Intro de la marca corte", "corte brand intro"], to: "/portafolio/corte", tag: "corte" },
  { src: "/work/tachado/ofertas.webp", alt: ["Ofertas en Tachado", "Deals on Tachado"], to: "/portafolio/tachado", tag: "Tachado" },
  { src: "/work/corte/opengraph-image.png", alt: ["Portada del sitio de corte", "corte site cover"], to: "/portafolio/corte", tag: "corte" },
  { src: "/work/tachado/grafica.webp", alt: ["Historial de precios en Tachado", "Price history on Tachado"], to: "/portafolio/tachado", tag: "Tachado" },
  { src: "/work/corte/recorrido.jpg", alt: ["Recorrido por la app corte", "corte app walkthrough"], to: "/portafolio/corte", tag: "corte" },
];

function TileLink({ t, es, wide }: { t: Tile; es: boolean; wide?: boolean }) {
  return (
    <Link
      to={t.to}
      data-cursor={es ? "Ver caso" : "View case"}
      className={`group relative shrink-0 overflow-hidden border border-white/10 bg-[#0b0c0e] shadow-[0_30px_70px_-30px_rgba(11,11,13,0.55)] transition-transform duration-500 hover:-translate-y-2 ${
        wide ? "h-[150px] sm:h-[210px] md:h-[250px] aspect-[16/10] rounded-[14px] md:rounded-[18px]" : "h-[260px] sm:h-[340px] md:h-[400px] aspect-[9/19.5] rounded-[22px] md:rounded-[28px] p-1.5"
      }`}
    >
      <img
        src={t.src}
        alt={es ? t.alt[0] : t.alt[1]}
        loading="lazy"
        decoding="async"
        className={`block w-full h-full object-cover ${wide ? "object-top" : "rounded-[17px] md:rounded-[22px] object-top"}`}
      />
      <span className="absolute left-3 bottom-3 rounded-full bg-[#0B0B0D]/80 backdrop-blur px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#F2F0EA]/85 opacity-0 group-hover:opacity-100 transition-opacity">
        {t.tag}
      </span>
    </Link>
  );
}

const ScreensWall = () => {
  const { lang } = useLang();
  const es = lang === "es";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xa = useTransform(scrollYProgress, [0, 1], reduce ? ["-10%", "-10%"] : ["0%", "-28%"]);
  const xb = useTransform(scrollYProgress, [0, 1], reduce ? ["-18%", "-18%"] : ["-30%", "-4%"]);

  return (
    <section ref={ref} data-bp={es ? "Pantallas" : "Screens"} className="relative z-20 overflow-hidden py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center text-center gap-5">
        <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
          <span className="text-white/45">{es ? "Pantallas reales" : "Real screens"}</span>
          <span className="h-px w-10 bg-[linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)]" />
          <span className="text-white/45">corte · Tachado</span>
        </div>
        <ScrollRevealText
          as="h2"
          text={es ? "Así se ve lo que construyo, en línea y funcionando." : "This is what I build, live and working."}
          dim={0.16}
          className="justify-center font-heading font-semibold text-white text-3xl md:text-5xl leading-[1.08] -tracking-[0.045em] max-w-3xl"
        />
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <MoreLink to="/portafolio">{es ? "Ver los casos de estudio" : "See the case studies"}</MoreLink>
          <MoreLink to="/ejemplos-paginas-web">{es ? "Ver ejemplos antes y después" : "See before-and-after examples"}</MoreLink>
        </div>
      </div>

      {/* the wall, tipped back in space */}
      <div className="relative mt-14 md:mt-20 [perspective:1600px] [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex flex-col gap-5 md:gap-7 [transform:rotateX(14deg)_rotateZ(-5deg)] origin-center">
          <motion.div style={{ x: xa }} className="flex items-end gap-5 md:gap-7 w-max pl-[6vw] will-change-transform">
            {[...PHONES, ...PHONES, ...PHONES].map((t, i) => (
              <TileLink key={`p${i}`} t={t} es={es} />
            ))}
          </motion.div>
          <motion.div style={{ x: xb }} className="flex items-start gap-5 md:gap-7 w-max will-change-transform">
            {[...WIDE, ...WIDE].map((t, i) => (
              <TileLink key={`w${i}`} t={t} es={es} wide />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScreensWall;
