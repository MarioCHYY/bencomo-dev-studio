import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, GraduationCap, Briefcase, Award } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryImages } from "./galleryImages";
import { SpotifyCoverflow } from "./ui/spotify-coverflow";

const spotifyTracks = [
  "6SQLk9HSNketfgs2AyIiMs", "2IOFZdYYkFxEHVz1w34PoL", "45S5WTQEGOB1VHr1Q4FuPl", "6UelLqGlWMcVH1E5c4H7lY",
  "3jjujdWJ72nww5eGnfs2E7", "4jAIqgrPjKLTY9Gbez25Qb", "1ZMiCix7XSAbfAJlEZWMCp", "6VzcQuzTNTMFnJ6rBSaLH9",
  "33bURv895AN4FkBvgFo2dx", "1IF5UcqRO42D12vYwceOY6", "5Ohxk2dO5COHF1krpoPigN", "4B1rpPmQXwj78wk6aIGwwU",
  "5Lbsc65org0b85kNsPkluY", "33SNO8AaciGbNaQFkxvPrW", "7gtG45ieyQzKtNKobfLd49", "3xClevycpBON8bkyxFbAna",
  "0tV6LXuVzJR4yifqwQuNwN", "6GteP2UCnpHRWSZTL63QHe", "0QPdjsMOUhwouq1NS3HwfQ", "0VV0AMmgLBUhzuFedr3F3e",
  "028i7HBfp8uE5epmx5ieMA", "56k68P3bFQvnKw89hizJFZ", "1sA1DhT0bLyeICf8NalPS7", "0i4qKfuKJ3juUsEwnJAxk3",
  "7s7v5EoNLD6TwDu4Nw51Oy", "3QuRLv8zkIYH31O5VgEpmo", "3i058E8uxTsYqJ5NWZzqSj", "6uvh0In7u1Xn4HgxOfAn8O",
  "0rzaRSujxA0bKyjJl6vHYq", "6qj02zSeEJGWZ4c0dn5QzJ", "1mw0RgNXIpYRyyCdBQbLgA", "5LYMamLv12UPbemOaTPyeV",
  "1qEmFfgcLObUfQm0j1W2CK", "4j6kId9QIqhoXvqHKgSKa0", "4Dvkj6JhhA12EX05fT7y2e", "51Zw1cKDgkad0CXv23HCMU",
  "35TyJIMR3xRouUuo2sjS6v", "69w5X6uTrOaWM32IetSzvO", "2NcQic8JxdjAlAHuNbOIRE",
];

const storyImages = [1, 2, 3, 4, 5].map((n) => `/gallery/story_${n}.webp`);
const ease = [0.22, 1, 0.36, 1] as const;

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Full "About me" page: a point of view, the story, how I think, the path so far, and life off the keyboard. */
const AboutPageContent = () => {
  const { t, lang } = useLang();
  const es = lang === "es";
  const a = translations.aboutPage;
  const exp = translations.experience;
  const edu = translations.education;
  const responsibilities = t(exp.responsibilities) as unknown as string[];
  const certs = ((edu as any).certifications ?? []) as any[];

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % storyImages.length), 4200);
    return () => clearInterval(id);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const timeline = [
    {
      kind: es ? "Experiencia" : "Experience",
      Icon: Briefcase,
      when: t(exp.period) as string,
      title: t(exp.role) as string,
      place: t(exp.type) as string,
      body: responsibilities,
    },
    {
      kind: es ? "Educación" : "Education",
      Icon: GraduationCap,
      when: t(edu.degree.period) as string,
      title: t(edu.degree.title) as string,
      place: t(edu.degree.institution) as string,
      body: [t(edu.degree.focus) as string],
    },
    ...certs.map((c) => ({
      kind: es ? "Certificación" : "Certification",
      Icon: Award,
      when: t(c.period) as string,
      title: t(c.title) as string,
      place: t(c.institution) as string,
      body: [t(c.focus) as string],
    })),
  ];

  const facts = [t(a.curious1), t(a.curious2), t(a.curious3), t(a.curious4)] as string[];

  return (
    <div className="relative z-20 overflow-x-clip">
      {/* 1 · Hero */}
      <section ref={heroRef} className="relative pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-14 lg:gap-20 items-center">
          <div className="flex flex-col gap-10 min-w-0">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="w-fit text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45"
            >
              {t(a.heroBadge)}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.08 }}
              className="font-heading font-semibold text-white text-[2.9rem] sm:text-7xl lg:text-[6.4rem] leading-[0.98] -tracking-[0.05em]"
              style={{ textWrap: "balance" } as Record<string, string>}
            >
              {es ? "Más allá" : "Beyond"}
              <br />
              <span className="text-white/35">{es ? "del código." : "the code."}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="max-w-xl text-xl md:text-2xl text-white/75 leading-snug -tracking-[0.01em] italic"
            >
              {t(a.heroQuote)}
            </motion.p>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
            className="relative rgb-glow rounded-[28px] justify-self-center lg:justify-self-end w-full max-w-md"
          >
            <div className="theme-dark relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 bg-[#0a0b10]">
              <motion.img style={{ y: heroImgY }} src="/gallery/sobre_mi_hero.webp" alt="Mario Bencomo" className="absolute inset-0 h-full w-full object-cover scale-[1.12]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(0_0_0/0.65)] via-transparent to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[rgb(255_255_255/0.2)] bg-[rgb(0_0_0/0.4)] backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-[#fff]">
                <MapPin size={12} /> Culiacán, MX
              </span>
            </div>
          </motion.figure>
        </div>

        {/* lead: three beats */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-20 md:mt-28 grid md:grid-cols-3 gap-10 md:gap-12">
          {[a.heroP1, a.heroP2, a.heroP3].map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="border-t border-white/15 pt-6 flex flex-col gap-4">
              <span className="font-mono text-xs text-white/35 tabular-nums">0{i + 1}</span>
              <p className="text-white/60 text-[15px] md:text-base leading-relaxed">{t(p)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 2 · Story */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading index="01" label={t(a.storyLabel)} title={es ? "Quién está" : "Who's"} muted={es ? "detrás del código." : "behind the code."} />
          <div className="mt-14 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-start">
            <Reveal className="lg:sticky lg:top-28">
              <div className="theme-dark relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 bg-[#0a0b10]">
                {storyImages.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Mario Bencomo ${i + 1}`}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover object-[center_40%] transition-all duration-[1200ms] ease-out ${slide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                  />
                ))}
                <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
                  {storyImages.map((_, i) => (
                    <span key={i} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${slide === i ? "bg-[#fff]" : "bg-[rgb(255_255_255/0.3)]"}`} />
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col gap-8 min-w-0">
              <Reveal>
                <p className="font-heading font-semibold text-white text-2xl md:text-[2rem] leading-[1.2] -tracking-[0.03em]">{t(a.storyP1)}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="text-white/55 text-base md:text-lg leading-relaxed">{t(a.storyP2)}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-white/55 text-base md:text-lg leading-relaxed">{t(a.storyP3)}</p>
              </Reveal>
              <Reveal delay={0.12}>
                <dl className="grid sm:grid-cols-3 border-t border-white/10">
                  {[
                    { k: es ? "Base" : "Based in", v: t(translations.about.location.title) as string },
                    { k: es ? "Rol" : "Role", v: t(translations.about.role.title) as string },
                    { k: es ? "Modalidad" : "Availability", v: es ? "Remoto disponible" : "Remote available" },
                  ].map((f, i) => (
                    <div key={f.k} className={`py-5 sm:pr-4 ${i ? "sm:pl-6 sm:border-l border-white/10" : ""}`}>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-white/35">{f.k}</dt>
                      <dd className="mt-1.5 text-white font-medium">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Philosophy + way of working */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading index="02" label={es ? "Cómo pienso" : "How I think"} title={es ? "Una forma de" : "A way of"} muted={es ? "mirar el trabajo." : "looking at the work."} />
          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {[
              { label: t(a.philosophyLabel), text: t(a.philosophyText), big: true },
              { label: t(a.workLabel), text: t(a.workP1), big: false },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article className="h-full min-h-[320px] rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 md:p-10 flex flex-col justify-between gap-10">
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">{c.label as string}</span>
                  <p className={`font-heading font-semibold text-white leading-[1.15] -tracking-[0.03em] ${c.big ? "text-3xl md:text-[2.4rem]" : "text-xl md:text-2xl text-white/80"}`}>
                    {c.text as string}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Path */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            index="03"
            label={es ? "Trayectoria" : "Path"}
            title={es ? "Lo que he hecho" : "What I've done"}
            muted={es ? "y lo que sigo aprendiendo." : "and keep learning."}
          />
          <ol className="mt-14 border-t border-white/10">
            {timeline.map((it, i) => (
              <motion.li
                key={`${it.title}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease }}
                className="grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-x-12 gap-y-4 py-9 border-b border-white/10"
              >
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">
                    <it.Icon size={13} /> {it.kind}
                  </span>
                  <span className="text-sm text-white/45">{it.when}</span>
                </div>
                <div className="flex flex-col gap-3 min-w-0">
                  <h3 className="font-heading font-semibold text-white text-xl md:text-2xl -tracking-[0.02em]">{it.title}</h3>
                  <p className="text-white/50 text-sm">{it.place}</p>
                  {it.body.length > 1 ? (
                    <ul className="mt-2 flex flex-col gap-2.5">
                      {it.body.map((b, j) => (
                        <li key={j} className="flex gap-3 text-white/60 text-[15px] leading-relaxed">
                          <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-white/60 text-[15px] leading-relaxed max-w-2xl">{it.body[0]}</p>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
          <Link
            to="/portafolio"
            className="group mt-10 w-fit inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            {t(a.expButton)}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {/* 5 · Off the keyboard */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            index="04"
            label={es ? "Fuera del teclado" : "Off the keyboard"}
            title={es ? "Lo que alimenta" : "What feeds"}
            muted={es ? "el trabajo." : "the work."}
            intro={(t(a.offKeyboardText) as string)}
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {facts.map((f) => (
              <li key={f} className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[15px] text-white/70">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8 mb-4">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">{es ? "Canciones favoritas" : "Favorite songs"}</span>
          </div>
          <SpotifyCoverflow tracks={spotifyTracks} />
        </div>

        <div className="mt-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 mb-6 flex items-end justify-between gap-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">{es ? "Galería" : "Gallery"}</span>
            <span className="text-sm text-white/40 hidden sm:block">{es ? "Un vistazo a mi día a día." : "A look at my day to day."}</span>
          </div>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: "110s" }}>
              {[0, 1].map((k) => (
                <div key={k} className="flex gap-4 md:gap-5 pr-4 md:pr-5 shrink-0" aria-hidden={k === 1 ? true : undefined}>
                  {galleryImages.map((src, i) => (
                    <div key={`${k}-${i}`} className="group relative shrink-0 w-[240px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                      <img src={src} alt={k === 0 ? `Mario Bencomo ${i + 1}` : ""} loading="lazy" className="h-full w-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageContent;
