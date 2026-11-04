import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { SectionHeading } from "@/components/ui/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

/** Home "About": a short teaser (portrait, a point of view, one paragraph); the full story lives on /sobre-mi. */
const AboutSection = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const es = lang === "es";
  const a = translations.about;

  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const statement = es
    ? "No solo escribo código. Diseño productos que se sienten vivos, del primer boceto al último pixel."
    : "I don't just write code. I design products that feel alive, from the first sketch to the last pixel.";

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          index="01"
          label={t(a.title)}
          title={es ? "Desarrollador con" : "A developer with"}
          muted={es ? "ojo de diseñador." : "a designer's eye."}
        />

        <div className="mt-14 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-start">
          {/* portrait: stays in view while the story scrolls */}
          <motion.figure
            ref={photoRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="relative lg:sticky lg:top-28 rgb-glow rounded-[28px]"
          >
            <div className="theme-dark relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 bg-[#0B0B0D]">
              <motion.img
                style={{ y: imgY }}
                src="/gallery/sobre_mi_home.webp"
                alt="Mario Bencomo"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover scale-[1.14]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-white/85">
                <MapPin size={12} /> Culiacán, MX
              </span>
              <figcaption className="absolute left-5 right-5 bottom-5">
                <p className="font-heading font-semibold text-white text-xl leading-tight -tracking-[0.02em]">Mario Bencomo</p>
                <p className="text-white/60 text-sm">Full Stack Developer · UI/UX</p>
              </figcaption>
            </div>
          </motion.figure>

          <div className="flex flex-col gap-12 min-w-0">
            <ScrollRevealText
              as="h3"
              text={statement}
              dim={0.14}
              className="font-heading font-semibold text-white text-3xl md:text-[2.5rem] leading-[1.12] -tracking-[0.04em]"
            />

            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-2xl">{t(a.p1)}</p>

            <button
              type="button"
              onClick={() => {
                navigate("/sobre-mi");
                window.scrollTo(0, 0);
              }}
              className="group w-fit inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              {es ? "Conoce mi historia" : "Read my story"}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
