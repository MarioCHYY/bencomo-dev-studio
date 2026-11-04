import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { CountUp } from "@/components/ui/count-up";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { SectionHeading } from "@/components/ui/section-heading";

const stack = [
  { name: "React", icon: "react/react-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "JavaScript", icon: "javascript/javascript-original" },
  { name: "Node.js", icon: "nodejs/nodejs-original" },
  { name: "Python", icon: "python/python-original" },
  { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
  { name: "Docker", icon: "docker/docker-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "Java", icon: "java/java-original" },
  { name: "Figma", icon: "figma/figma-original" },
];

const AboutSection = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const es = lang === "es";
  const a = translations.about;

  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const stats = [
    { value: "10+", label: es ? "Proyectos creados" : "Projects built" },
    { value: "2+", label: es ? "Años construyendo" : "Years building" },
    { value: "100%", label: es ? "Intención en cada detalle" : "Intent in every detail" },
  ];

  const statement = es
    ? "No solo escribo código. Diseño productos que se sienten vivos, del primer boceto al último pixel."
    : "I don't just write code. I design products that feel alive, from the first sketch to the last pixel.";

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading index="01" label={t(a.title)} />

        <div className="mt-12 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-start">
          {/* portrait */}
          <motion.figure
            ref={photoRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rgb-glow rounded-[28px]"
          >
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 bg-[#0a0b10]">
              <motion.img
                style={{ y: imgY }}
                src="/gallery/sobre_mi_home.webp"
                alt="Mario Bencomo"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover scale-[1.16]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <figcaption className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-heading font-bold text-white text-lg leading-tight">Mario Bencomo</p>
                  <p className="text-white/60 text-xs">Full Stack Developer</p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">Culiacán · MX</span>
              </figcaption>
            </div>
          </motion.figure>

          {/* copy */}
          <div className="flex flex-col gap-10 lg:pt-4 min-w-0">
            <ScrollRevealText
              as="h2"
              text={statement}
              dim={0.14}
              className="font-heading font-bold text-white text-3xl md:text-[2.75rem] leading-[1.12] -tracking-[0.02em]"
            />

            <p className="text-[#A0A5B0] font-light text-base md:text-lg leading-relaxed max-w-2xl">{t(a.p1)}</p>

            <dl className="grid grid-cols-3 border-t border-white/10">
              {stats.map((s, i) => (
                <div key={s.label} className={`pt-6 pr-4 ${i ? "pl-4 md:pl-6 border-l border-white/10" : ""}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="flex flex-col gap-2">
                    <CountUp value={s.value} className="font-heading font-extrabold text-white text-3xl md:text-5xl tabular-nums" />
                    <span className="text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.18em] leading-snug">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40">Stack</span>
              <ul className="flex flex-wrap gap-2">
                {stack.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-2 pr-3.5 py-1.5 text-[13px] text-white/70 hover:text-white hover:border-white/25 transition-colors"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${s.icon}.svg`}
                      alt=""
                      loading="lazy"
                      className="w-4 h-4 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition"
                    />
                    {s.name}
                  </motion.li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                navigate("/sobre-mi");
                window.scrollTo(0, 0);
              }}
              className="group w-fit inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors"
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
