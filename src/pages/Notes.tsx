import { Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { MoreLink } from "@/components/ui/more-link";
import { scrollToTop } from "@/lib/scrollTop";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";
import { Crumbs, Kicker } from "@/components/landing/LandingUI";
import { NOTES } from "@/content/notes";
import NoteCard from "@/components/landing/NoteCard";
import NotesStage from "@/components/landing/NotesStage";

const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const ease = [0.22, 1, 0.36, 1] as const;

/** /notas — the index of the design notes */
const Notes = () => {
  useSmoothScroll();
  useEffect(() => {
    scrollToTop();
  }, []);
  const { lang } = useLang();
  const es = lang === "es";
  const [first, ...rest] = NOTES;

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <section className="relative z-20 pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-center">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col gap-5"
            >
              <Crumbs
                items={[
                  { to: "/", label: es ? "Inicio" : "Home" },
                  { label: es ? "Notas de diseño" : "Design notes" },
                ]}
              />
              <Kicker
                label={es ? "Para fundadores y equipos de producto" : "For founders and product teams"}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className="font-heading font-semibold text-white text-[2.7rem] sm:text-6xl md:text-7xl lg:text-[4.6rem] leading-[0.98] -tracking-[0.05em]"
            >
              {es ? "Notas de" : "Design"}
              <span className="[word-spacing:0.08em]"> </span>
              <span className="font-serif-display font-normal italic -tracking-[0.01em] text-[1.1em]">
                {es ? "diseño." : "notes."}
              </span>
              <span className="block text-white/35">
                {es ? "Sin tecnicismos." : "No jargon."}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              {es
                ? "Cómo validar una idea, diseñar los primeros minutos de una app y hacer que tu producto se vea y se sienta sólido, explicado para quien está construyendo uno. Cada dato viene con su fuente."
                : "How to validate an idea, design an app's first minutes and make your product look and feel solid, explained for people building one. Every figure comes with its source."}
            </motion.p>
          </div>
          {/* the blog's own 3D: every note, as a card in a slowly turning ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
          >
            <NotesStage
              es={es}
              label={
                es
                  ? "Las notas de diseño, como tarjetas que giran en un anillo"
                  : "The design notes, as cards turning in a ring"
              }
              className="w-full max-w-[600px] mx-auto aspect-[5/4] lg:aspect-square lg:-my-8"
            />
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 border-t border-white/[0.08] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-3 md:gap-4">
          <NoteCard n={first} es={es} big />
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {rest.map((n, i) => (
              // with an odd number of notes the last one takes the whole row, so the grid never has a hole
              <div
                key={n.slug}
                className={`flex ${rest.length % 2 === 1 && i === rest.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <NoteCard n={n} es={es} />
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-wrap gap-x-7 gap-y-3">
            <MoreLink to="/ejemplos-paginas-web">
              {es
                ? "Ver ejemplos antes y después"
                : "See before-and-after examples"}
            </MoreLink>
            <MoreLink to="/servicios/rediseno-web">
              {es ? "Rediseño web" : "Website redesign"}
            </MoreLink>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Notes;
