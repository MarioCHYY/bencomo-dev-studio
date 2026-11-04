import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
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

const ease = [0.22, 1, 0.36, 1] as const;

/** Home "About": who I am in one scroll: portrait, a point of view, three principles, numbers, stack. */
const AboutSection = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const es = lang === "es";
  const a = translations.about;

  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const principles = es
    ? [
        { n: "01", title: "Entender primero", text: "No empiezo escribiendo código. Primero entiendo el problema, hago bocetos y pienso en la experiencia que quiero crear." },
        { n: "02", title: "Menos es más", text: "Una interfaz limpia no es solo estética: es respetar el tiempo de quien la usa." },
        { n: "03", title: "Diseño con base técnica", text: "No entiendo el desarrollo sin visión estética, ni el diseño sin una base sólida que lo haga real." },
      ]
    : [
        { n: "01", title: "Understand first", text: "I don't start by writing code. I understand the problem, sketch, and think about the experience I want to create." },
        { n: "02", title: "Less is more", text: "A clean interface isn't just aesthetics: it respects the time of whoever uses it." },
        { n: "03", title: "Design with a technical base", text: "I don't understand development without a clear aesthetic vision, nor design without a solid base to make it real." },
      ];

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

            {/* three principles */}
            <ol className="border-t border-white/10">
              {principles.map((p, i) => (
                <motion.li
                  key={p.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                  className="group grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_14rem_1fr] gap-x-4 gap-y-2 py-6 border-b border-white/10"
                >
                  <span className="font-mono text-xs text-white/35 pt-1 tabular-nums">{p.n}</span>
                  <h4 className="font-heading font-semibold text-white text-lg -tracking-[0.02em] group-hover:translate-x-1 transition-transform duration-500">{p.title}</h4>
                  <p className="col-start-2 md:col-start-auto text-white/50 text-[15px] leading-relaxed">{p.text}</p>
                </motion.li>
              ))}
            </ol>

            <dl className="grid grid-cols-3">
              {stats.map((s, i) => (
                <div key={s.label} className={`pr-4 ${i ? "pl-4 md:pl-8 border-l border-white/10" : ""}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="flex flex-col gap-2">
                    <CountUp value={s.value} className="font-heading font-semibold text-white text-4xl md:text-6xl -tracking-[0.05em] tabular-nums" />
                    <span className="text-[10px] md:text-[11px] text-white/45 uppercase tracking-[0.18em] leading-snug">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/35">{es ? "Con qué construyo" : "What I build with"}</span>
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
