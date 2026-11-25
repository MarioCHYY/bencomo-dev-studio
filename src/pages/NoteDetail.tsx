import { Suspense, lazy, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { MoreLink } from "@/components/ui/more-link";
import { scrollToTop } from "@/lib/scrollTop";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";
import {
  AURORA,
  Crumbs,
  Kicker,
  whatsapp,
} from "@/components/landing/LandingUI";
import Compare from "@/components/landing/Compare";
import { NOTES, note, titleText, type Block, type Note } from "@/content/notes";
import NotesStage from "@/components/landing/NotesStage";
import NoteTitle from "@/components/landing/NoteTitle";
import NoteCard from "@/components/landing/NoteCard";

const NotFound = lazy(() => import("./NotFound"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const ease = [0.22, 1, 0.36, 1] as const;

const fmtDate = (iso: string, es: boolean) =>
  new Date(iso + "T12:00:00").toLocaleDateString(es ? "es-MX" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const anchor = (h: string) =>
  h
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const COMPARE_NAMES: Record<string, string> = {
  marejada: "Marejada",
  molar: "Molar",
  fierro: "Fierro",
};

function Body({ b }: { b: Block }) {
  if ("p" in b)
    return (
      <p className="text-white/75 text-[17px] md:text-lg leading-[1.75]">
        {b.p}
      </p>
    );
  if ("ul" in b)
    return (
      <ul className="flex flex-col gap-3">
        {b.ul.map((x) => (
          <li
            key={x}
            className="relative pl-6 text-white/75 text-[17px] md:text-lg leading-[1.7]"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.72em] w-2.5 h-px"
              style={{ background: AURORA }}
            />
            {x}
          </li>
        ))}
      </ul>
    );
  if ("ol" in b)
    return (
      <ol className="flex flex-col gap-4">
        {b.ol.map((x, i) => (
          <li
            key={x}
            className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 text-white/75 text-[17px] md:text-lg leading-[1.7]"
          >
            <span className="font-mono text-xs text-white pt-[0.45em] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{x}</span>
          </li>
        ))}
      </ol>
    );
  if ("fact" in b)
    return (
      <figure className="relative my-2 rounded-[22px] border border-white/[0.09] bg-white/[0.02] p-6 md:p-8 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: AURORA }}
        />
        <div className="font-serif-display italic text-white text-6xl md:text-7xl leading-none -tracking-[0.01em]">
          {b.fact.n}
        </div>
        <figcaption className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          {b.fact.text}{" "}
          <a
            href={`#fuente-${b.fact.src + 1}`}
            className="text-white/45 hover:text-white text-sm whitespace-nowrap underline decoration-white/20 underline-offset-4"
          >
            Fuente {b.fact.src + 1}
          </a>
        </figcaption>
      </figure>
    );
  if ("tip" in b)
    return (
      <p className="relative pl-5 text-white text-lg md:text-xl leading-snug font-medium -tracking-[0.01em]">
        <span
          aria-hidden="true"
          className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
          style={{ background: AURORA }}
        />
        {b.tip}
      </p>
    );
  if ("swatches" in b)
    return (
      <div className="flex flex-col gap-3">
        {b.swatches.map((s) => (
          <div
            key={s.name}
            className="grid sm:grid-cols-[180px_minmax(0,1fr)] gap-4 items-center rounded-[20px] border border-white/[0.09] p-4 md:p-5"
          >
            <div className="flex h-14 rounded-xl overflow-hidden">
              {s.colors.map((c, i) => (
                <span
                  key={c}
                  title={c}
                  className="h-full"
                  style={{
                    background: c,
                    flex: i === 0 ? 3 : i === 1 ? 2 : 1.4,
                  }}
                />
              ))}
            </div>
            <div>
              <div className="font-heading font-semibold text-white text-lg -tracking-[0.02em]">
                {s.name}
              </div>
              <p className="text-white/60 text-[15px] leading-relaxed">
                {s.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  if ("timeline" in b)
    return (
      <ol className="grid sm:grid-cols-3 gap-3">
        {b.timeline.map((x) => (
          <li
            key={x.t}
            className="rounded-[20px] border border-white/[0.09] bg-white/[0.02] p-5 md:p-6 flex flex-col gap-2"
          >
            <span className="font-serif-display italic text-white text-5xl leading-none">
              {x.t}
            </span>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/55 mt-2">
              {x.label}
            </span>
            <span className="text-white/65 text-[15px] leading-relaxed">
              {x.text}
            </span>
          </li>
        ))}
      </ol>
    );
  if ("compare" in b)
    return (
      <div className="my-2 flex flex-col gap-3">
        <Compare id={b.compare} name={COMPARE_NAMES[b.compare]} es />
        <p className="text-[13px] text-white/45">
          {COMPARE_NAMES[b.compare]}, un negocio inventado: versión genérica
          contra versión diseñada.
        </p>
      </div>
    );
  if ("link" in b) return <MoreLink to={b.link.to}>{b.link.label}</MoreLink>;
  return null;
}

const NoteDetail = () => {
  useSmoothScroll();
  const { slug } = useParams();
  const n = note(slug);
  const { lang } = useLang();
  const es = lang === "es";
  useEffect(() => {
    scrollToTop();
  }, [slug]);

  if (!n)
    return (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    );

  const related = n.related.map((s) => note(s)).filter(Boolean) as Note[];

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <article>
        {/* a div, not <header>: the SEO snapshot leaves headers out as site chrome */}
        <div className="relative z-20 pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-8 items-center">
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
                    {
                      to: "/notas",
                      label: es ? "Notas de diseño" : "Design notes",
                    },
                    { label: titleText(n) },
                  ]}
                />
                <Kicker label={n.kicker} />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.05 }}
                className="font-heading font-semibold text-white text-[2.5rem] sm:text-6xl md:text-7xl leading-[1] -tracking-[0.05em] max-w-5xl"
                style={{ textWrap: "balance" } as Record<string, string>}
              >
                <NoteTitle segs={n.title} />
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.15 }}
                className="flex flex-col gap-6 max-w-3xl"
              >
                <p className="text-white/70 text-xl md:text-2xl font-light leading-snug -tracking-[0.01em]">
                  {n.lead}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/50">
                  <img
                    src="/about/mario-frente.webp"
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover object-[50%_25%]"
                  />
                  <span className="text-white/80 font-medium">
                    Mario Bencomo
                  </span>
                  {/* date and reading time travel together, so a narrow screen never starts a line with a dot */}
                  <span className="whitespace-nowrap">
                    <time dateTime={n.date}>{fmtDate(n.date, es)}</time>
                    <span aria-hidden="true"> · </span>
                    {es ? `${n.read} min de lectura` : `${n.read} min read`}
                  </span>
                </div>
                {!es && (
                  <p className="text-[13px] text-white/50">
                    This note is only available in Spanish.
                  </p>
                )}
              </motion.div>
            </div>
            {/* the blog's 3D, turned so this note's card is in front (wide screens only: on a phone, straight to reading) */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
            >
              <NotesStage
                focus={NOTES.findIndex((x) => x.slug === n.slug)}
                label={titleText(n)}
                className="w-full aspect-[4/5] -my-6"
              />
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 border-t border-white/[0.08]">
          <div
            className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] gap-12 lg:gap-20"
            lang="es-MX"
          >
            <nav
              aria-label="En esta nota"
              className="hidden lg:flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start"
            >
              <Kicker label="En esta nota" />
              <ol className="flex flex-col gap-2.5 border-l border-white/[0.09]">
                {n.sections.map((s) => (
                  <li key={s.h}>
                    <a
                      href={`#${anchor(s.h)}`}
                      className="block pl-4 -ml-px border-l border-transparent hover:border-white text-[14px] leading-snug text-white/55 hover:text-white transition-colors"
                    >
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 max-w-[44rem] flex flex-col gap-14 md:gap-16">
              {n.sections.map((s) => (
                <section
                  key={s.h}
                  id={anchor(s.h)}
                  className="scroll-mt-28 flex flex-col gap-6"
                >
                  <h2
                    className="font-heading font-semibold text-white text-2xl md:text-[2.1rem] -tracking-[0.04em] leading-[1.1]"
                    style={{ textWrap: "balance" } as Record<string, string>}
                  >
                    {s.h}
                  </h2>
                  {s.body.map((b, i) => (
                    <Body key={i} b={b} />
                  ))}
                </section>
              ))}

              <section className="flex flex-col gap-5 pt-10 border-t border-white/[0.09]">
                <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/55">
                  Fuentes
                </h2>
                <ol className="flex flex-col gap-3">
                  {n.sources.map((s, i) => (
                    <li
                      key={s.url}
                      id={`fuente-${i + 1}`}
                      className="scroll-mt-28 grid grid-cols-[2rem_minmax(0,1fr)] gap-2 text-[15px] leading-relaxed"
                    >
                      <span className="font-mono text-xs text-white/55 pt-1 tabular-nums">
                        {i + 1}
                      </span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white underline decoration-white/20 underline-offset-4 break-words"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>

              <aside className="rounded-[26px] border border-white/[0.1] bg-white/[0.02] p-6 md:p-8 flex flex-col sm:flex-row gap-6 sm:items-center">
                <img
                  src="/about/mario-frente.webp"
                  alt="Mario Bencomo"
                  width={88}
                  height={88}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover object-[50%_25%] shrink-0"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-white/75 text-base leading-relaxed">
                    Soy{" "}
                    <Link
                      to="/sobre-mi"
                      className="text-white underline decoration-[#B7A8FF] underline-offset-4"
                    >
                      Mario Bencomo
                    </Link>
                    , diseñador UI/UX y desarrollador web en Culiacán. Diseño y
                    programo páginas para negocios que quieren verse como lo que
                    son.
                  </p>
                  <a
                    href={whatsapp(
                      `Hola Mario, leí tu nota "${titleText(n)}" y quiero que revises mi página.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="group self-start inline-flex items-center gap-2 rounded-full bg-brand text-black px-5 py-3 text-sm font-semibold hover:bg-brand/90 transition-colors"
                  >
                    Que revise mi página
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="relative z-20 border-t border-white/[0.08] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-10">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em]">
                {es ? "Otras notas" : "More notes"}
              </h2>
              <MoreLink to="/notas">{es ? "Ver todas" : "See all"}</MoreLink>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {related.map((r) => (
                <NoteCard key={r.slug} n={r} es={es} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default NoteDetail;
