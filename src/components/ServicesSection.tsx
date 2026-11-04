import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Globe, Monitor, Server, Briefcase, RefreshCw, Smartphone, Bot, Sparkles, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { Link } from "react-router-dom";
import { TiltCard } from "@/components/ui/tilt-card";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

const icons = [Globe, Monitor, Server, Briefcase, RefreshCw, Smartphone, Bot, Sparkles];

const ServicesSection = () => {
  const { t } = useLang();
  const s = translations.services;
  const gridRef = useRef<HTMLDivElement>(null);
  const amp = useMotionValue(0);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    amp.set(wide && !reduce ? 1 : 0);
  }, [amp]);
  // columns drift at different speeds while you scroll past them
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const drift = (px: number) => ([p, a]: number[]) => (1 - 2 * p) * px * a;
  const colY = [
    useTransform([scrollYProgress, amp], drift(40)),
    useTransform([scrollYProgress, amp], drift(90)),
    useTransform([scrollYProgress, amp], drift(20)),
    useTransform([scrollYProgress, amp], drift(70)),
  ];

  return (
    <section id="services" className="section-padding relative">
      <div className="relative z-20 max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[11px] text-primary font-medium tracking-[0.16em] uppercase">{t(s.label)}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white -tracking-[0.03em]">
            {t(s.title)}
          </h2>
          <ScrollRevealText
            className="text-[#C9CDD6] mt-4 text-base md:text-lg lg:text-xl max-w-xl font-light leading-relaxed"
            text={t(s.subtitle) as string}
          />
        </motion.div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:pb-16" style={{ perspective: 1400 }}>
          {s.items.map((service, i) => {
            const Icon = icons[i] || Globe;
            return (
              <motion.div
                key={service.id || i}
                initial={{ opacity: 0, y: 50, rotateX: 28, rotateY: i % 2 ? -8 : 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: (i % 4) * 0.08 + Math.floor(i / 4) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
                style={{ y: colY[i % 4] }}
              >
                <Link to={`/servicios#${service.id}`} className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <TiltCard
                    max={10}
                    className="group h-full rounded-2xl bg-white/[0.025] backdrop-blur-md border border-white/[0.07] hover:bg-white/[0.04] transition-colors duration-500"
                  >
                    <div className="relative h-full flex flex-col p-6 lg:p-7" style={{ transform: "translateZ(24px)" }}>
                      <div className="flex items-start justify-between mb-7">
                        <div className="relative w-14 h-14 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10 group-hover:border-primary/40 shadow-[0_10px_30px_-14px_rgba(51,133,255,0.5)] group-hover:shadow-[0_14px_40px_-10px_rgba(51,133,255,0.7)] transition-shadow duration-500">
                          <Icon size={26} strokeWidth={1.5} className="text-white/80 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
                          <span aria-hidden="true" className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)] opacity-40" />
                        </div>
                        <ArrowUpRight size={18} className="text-white/20 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <h3 className="text-base lg:text-lg font-heading font-extrabold mb-3 text-white">
                        {t(service.title)}
                      </h3>
                      <p className="text-sm text-[#A0A5B0] leading-[1.6] font-light">
                        {t(service.description)}
                      </p>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
