import { Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { scrollToTop } from "@/lib/scrollTop";
import { MoreLink } from "@/components/ui/more-link";
import GlobeCuliacan from "@/components/landing/GlobeCuliacan";
import CompareShowcase from "@/components/landing/CompareShowcase";
import LocalJourney from "@/components/landing/LocalJourney";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";
import { LOCAL } from "@/content/servicePages";
import { Cards, CheckList, Crumbs, Faqs, Kicker, Section, Steps, whatsapp } from "@/components/landing/LandingUI";

const CTASection = lazy(() => import("@/components/CTASection"));
const ScreensWall = lazy(() => import("@/components/ScreensWall"));
const ease = [0.22, 1, 0.36, 1] as const;
const Footer = lazy(() => import("@/components/Footer"));

/** /diseno-web-culiacan — the page for people in Culiacán looking for someone to make their website. */
const WebDesignCuliacan = () => {
  useSmoothScroll();
  useEffect(() => {
    scrollToTop();
  }, []);
  const { lang } = useLang();
  const es = lang === "es";
  const L = (v: { es: string; en: string }) => (es ? v.es : v.en);

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative z-20 pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] top-[10%] w-[60vw] max-w-[820px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,196,138,0.12),rgba(255,154,176,0.06)_40%,transparent_68%)]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-12 lg:gap-14 items-end">
          <div className="flex flex-col gap-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex flex-col gap-5">
              <Crumbs items={[{ to: "/", label: es ? "Inicio" : "Home" }, { label: es ? "Diseño web en Culiacán" : "Web design in Culiacán" }]} />
              <Kicker label={es ? "Para negocios de Culiacán, Sinaloa" : "For businesses in Culiacán, Sinaloa"} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className="font-heading font-semibold text-white text-[2.7rem] sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[0.98] -tracking-[0.05em]"
              style={{ textWrap: "balance" } as Record<string, string>}
            >
              {es ? "Diseño de páginas web" : "Web design"}{" "}
              <span className="text-white/35">{es ? "en" : "in"}</span>{" "}
              {/* the one word in the serif, underlined by the aurora stroke that draws itself */}
              <span className="relative inline-block whitespace-nowrap">
                <span className="font-serif-display font-normal italic text-[1.12em] -tracking-[0.01em] pr-[0.05em]">Culiacán.</span>
                <svg viewBox="0 0 270 24" preserveAspectRatio="none" aria-hidden="true" className="absolute left-[-2%] w-[104%] -bottom-[0.1em] h-[0.24em] overflow-visible">
                  <defs>
                    <linearGradient id="cln-swash" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#8FB0FF" />
                      <stop offset="0.4" stopColor="#B7A8FF" />
                      <stop offset="0.72" stopColor="#FF9AB0" />
                      <stop offset="1" stopColor="#FFC48A" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M3 15 C 52 5, 104 4, 150 9 S 232 20, 267 7"
                    fill="none"
                    stroke="url(#cln-swash)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease, delay: 0.7 }}
                  />
                </svg>
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }} className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">
              {es
                ? "Diseño y programo páginas web para negocios de Culiacán: con tu marca, rápidas, adaptadas a celular y listas para que te encuentren en Google y te escriban por WhatsApp. Del primer boceto al lanzamiento, con la misma persona."
                : "I design and build websites for businesses in Culiacán: with your brand, fast, made for phones and ready for people to find you on Google and message you on WhatsApp. From the first sketch to launch, with the same person."}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 }} className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={whatsapp(es ? "Hola Mario, quiero una página web para mi negocio." : "Hi Mario, I'd like a website for my business.")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand text-black px-6 py-3.5 text-sm font-semibold hover:bg-brand/90 transition-colors"
              >
                {es ? "Escríbeme por WhatsApp" : "Message me on WhatsApp"}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <MoreLink to="/portafolio">{es ? "Ver casos de estudio" : "See case studies"}</MoreLink>
            </motion.div>
          </div>

          {/* the world, turned to Culiacán */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease, delay: 0.2 }} className="relative">
            <GlobeCuliacan es={es} className="w-full max-w-[560px] mx-auto aspect-square lg:-my-10" />
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- how a website brings clients */}
      <section className="relative z-20 py-16 md:py-24 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-6 max-w-3xl">
            <Kicker n="01" label={es ? "Para qué sirve" : "What it's for"} />
            <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl lg:text-6xl -tracking-[0.045em] leading-[1.02]" style={{ textWrap: "balance" } as Record<string, string>}>
              {es ? "De Google a tu WhatsApp," : "From Google to your WhatsApp,"} <span className="text-white/35">{es ? "en tres toques." : "in three taps."}</span>
            </h2>
          </div>
          <LocalJourney es={es} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- generic vs designed, live */}
      <section className="relative z-20 py-16 md:py-24 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-10 md:gap-14">
          <div className="flex flex-col gap-6 max-w-3xl">
            <Kicker n="02" label={es ? "Antes y después" : "Before and after"} />
            <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl lg:text-6xl -tracking-[0.045em] leading-[1.02]" style={{ textWrap: "balance" } as Record<string, string>}>
              <span className="text-white/35">{es ? "Página genérica contra" : "A generic page versus"}</span> {es ? "página" : "a"}
              <span className="[word-spacing:0.08em]"> </span>
              <span className="font-serif-display font-normal italic -tracking-[0.01em] text-[1.1em]">{es ? "diseñada." : "designed one."}</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              {es
                ? "Así se ve la diferencia entre una página hecha en automático y una pensada para que te escriban. Arrastra la línea."
                : "This is the difference between an auto-made page and one designed to get people to message you. Drag the line."}
            </p>
          </div>
          <CompareShowcase es={es} />
        </div>
      </section>

      <Section n="03" label={es ? "Qué hago" : "What I do"} title={es ? "Lo que puedo hacer por tu negocio." : "What I can do for your business."}>
        <Cards items={LOCAL.kinds.map((k) => ({ title: L(k.title), text: L(k.text), to: `/servicios/${k.id}` }))} />
      </Section>

      <Section n="04" label={es ? "Qué incluye" : "What's included"} title={es ? "Toda página que hago lleva esto." : "Every site I make includes this."}>
        <CheckList items={LOCAL.includes.map(L)} />
      </Section>

      <Section n="05" label={es ? "Por qué conmigo" : "Why me"} title={es ? "Diseño, código y marca. Hechos por la misma persona." : "Design, code and brand. Made by the same person."}>
        <Cards items={LOCAL.why.map((w) => ({ title: L(w.title), text: L(w.text) }))} />
      </Section>

      <Section n="06" label={es ? "Cómo trabajo" : "How I work"} title={es ? "Un proceso claro, sin sorpresas." : "A clear process, no surprises."}>
        <Steps es={es} />
      </Section>

      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ScreensWall />
      </Suspense>

      <Section n="07" label={es ? "Preguntas" : "Questions"} title={es ? "Lo que suelen preguntarme." : "What people usually ask."}>
        <Faqs items={LOCAL.faqs.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
      </Section>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default WebDesignCuliacan;
