import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import TechMarquee from "./TechMarquee";
import { FlipLink } from "@/components/ui/flip-links";
import { useNavigate } from "react-router-dom";
import { TiltCard } from "@/components/ui/tilt-card";
import { CountUp } from "@/components/ui/count-up";

const AboutSection = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const a = translations.about;

  const stats = [
    { value: "10+", label: { en: "Developed Projects", es: "Proyectos creados" } },
    { value: "2+", label: { en: "Years of Experience", es: "Años aprendiendo y construyendo" } },
    { value: "100%", label: { en: "Commitment", es: "Intención en cada detalle" } },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="w-full h-px dark:bg-white/[0.05] bg-black/[0.05] absolute top-0 left-0 right-0" />

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[11px] text-primary font-medium tracking-[0.16em] uppercase">{t(a.label)}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white -tracking-[0.03em]">
            {t(a.title)}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 14 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <TiltCard
            max={4}
            lift={10}
            className="group rounded-2xl border border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-primary/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.28)] transition-[border-color,box-shadow] duration-500 bg-black/45 backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl">
              {/* Photo */}
              <div className="relative w-full md:w-[35%] min-h-[200px] md:min-h-[280px] overflow-hidden shrink-0">
                <img
                  src="/gallery/sobre_mi_home.webp"
                  alt="Mario Bencomo"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.04] group-hover:scale-[1.09] transition-transform duration-[1200ms] ease-out"
                />
                {/* scanlines + cold light, same language as the hero */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px)" }}
                />
                <div className="hidden md:block absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, rgba(0,0,0,0.85))" }} />
                <div className="md:hidden absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 70%)" }} />
                <span className="absolute left-4 bottom-4 text-[9px] font-mono tracking-[0.22em] uppercase text-white/60 bg-black/40 backdrop-blur px-2 py-1 rounded">
                  Culiacán · MX
                </span>
              </div>

              {/* Text + stats */}
              <div className="relative flex flex-col justify-center gap-5 p-6 md:p-8 flex-1" style={{ transform: "translateZ(30px)" }}>
                <p className="text-[#A0A5B0] font-light leading-[1.75] text-sm lg:text-base max-w-2xl">
                  {lang === "es"
                    ? "Desarrollo productos digitales donde el diseño y el código trabajan juntos. Creo experiencias modernas con un enfoque obsesivo por los detalles."
                    : "I develop digital products where design and code work together. I create modern experiences with an obsessive focus on details."}
                </p>

                <div
                  className="flex items-center gap-2 group/link w-fit cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/sobre-mi");
                    window.scrollTo(0, 0);
                  }}
                >
                  <FlipLink href="/sobre-mi" className="text-primary font-bold text-sm md:text-base uppercase tracking-wider">
                    {lang === "es" ? "Conoce mi historia" : "Read my story"}
                  </FlipLink>
                  <ArrowUpRight size={18} className="text-primary transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-4 border-t border-white/[0.06]">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col justify-center items-start text-left group/stat">
                      <CountUp
                        value={stat.value}
                        className="inline-block text-2xl sm:text-3xl md:text-5xl font-heading font-extrabold text-primary mb-1 tabular-nums [text-shadow:0_0_24px_rgba(51,141,255,0.45)] group-hover/stat:scale-105 transition-transform duration-300 origin-left"
                      />
                      <div className="text-[10px] text-white/60 uppercase tracking-[0.2em] font-medium">
                        {lang === "es" ? stat.label.es : stat.label.en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <TechMarquee />
    </section>
  );
};

export default AboutSection;
