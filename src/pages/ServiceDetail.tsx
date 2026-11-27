import { Suspense, lazy, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MoreLink } from "@/components/ui/more-link";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { servicePage } from "@/content/servicePages";
import { appExampleFor } from "@/content/appExamples";
import { note, titleText } from "@/content/notes";
import { inLang } from "@/content/notes-en";
import AppExampleBlock from "@/components/landing/AppExampleBlock";
import { BeforeStart, CanGrid, CaseProof, Cards, CheckList, Faqs, Flow, Hero, ProblemList, Prose, Section, StepList, Shots, Steps, serviceLinks, whatsapp } from "@/components/landing/LandingUI";
import { useServicesScene } from "@/components/services3d/useServicesScene";
import NotFound from "./NotFound";
import { scrollToTop } from "@/lib/scrollTop";
import { OutlineNumber } from "@/components/ui/outline-number";

/** the same 3D model this service has on /servicios, on its own stage */
function ServiceStage({ index, label }: { index: number; label: string }) {
  const view = useRef<HTMLDivElement>(null);
  const noGL = useServicesScene(view, index);
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="relative w-full aspect-square sm:aspect-[5/4] lg:aspect-[4/5] rounded-[28px] lg:rounded-[32px] overflow-hidden border border-white/[0.08] bg-sand">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(60% 55% at 50% 52%, rgba(143,176,255,0.20), rgba(183,168,255,0.10) 45%, transparent 75%)" }}
      />
      <OutlineNumber value={num} className="absolute right-5 lg:right-7 top-3 lg:top-5 font-heading font-bold text-[7rem] lg:text-[10rem] -tracking-[0.01em] leading-none" />
      <div ref={view} className="absolute inset-0" role="img" aria-label={label} />
      {noGL && <div className="absolute inset-0 flex items-center justify-center text-white/40 font-mono text-xs tracking-[0.2em] uppercase">{label}</div>}
      <div className="absolute left-5 lg:left-7 bottom-5 lg:bottom-6 font-mono text-[11px] tracking-[0.2em] uppercase text-white/45 tabular-nums">
        <span className="text-white">{num}</span> / 08
      </div>
    </div>
  );
}

const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

/** /servicios/:id — one service, explained in full, so it can be found on Google on its own. */
const ServiceDetail = () => {
  useSmoothScroll();
  const { id = "" } = useParams();
  // going from one service to another keeps this page mounted, so jump up by hand
  useEffect(() => {
    scrollToTop();
  }, [id]);
  const { lang } = useLang();
  const es = lang === "es";
  const index = translations.services.items.findIndex((i) => i.id === id);
  const item = translations.services.items[index];
  const page = servicePage(id);
  if (!item || !page) return <NotFound />;
  // the invented app that explains this service, if it has one
  const ex = appExampleFor(page.id);
  const hasLook = page.shots.length > 0 || !!page.flow;
  // sections are numbered in the order they appear, skipping the ones this service doesn't have
  const order = ["does", "solves", "can", ...(hasLook ? ["look"] : []), ...(ex ? ["example"] : []), "get", "process", "start", "faq", "more"];
  const n = (k: string) => String(order.indexOf(k) + 1).padStart(2, "0");
  // the notes that go deeper into this service, in the page's language
  const notes = page.notes
    .map((slug) => note(slug))
    .filter((x): x is NonNullable<typeof x> => !!x)
    .map((x) => inLang(x, es));
  const examplesLink = ["sitios-web", "ui-ux", "rediseno-web"].includes(page.id) ? (
    <MoreLink to="/ejemplos-paginas-web">{es ? "Ver ejemplos: página genérica contra diseñada" : "See examples: generic page versus designed"}</MoreLink>
  ) : null;

  const L = (v: { es: string; en: string }) => (es ? v.es : v.en);
  const title = L(item.title);
  const deliverables = es ? item.deliverables.es : item.deliverables.en;

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <Hero
        es={es}
        crumbs={[
          { to: "/", label: es ? "Inicio" : "Home" },
          { to: "/servicios", label: es ? "Servicios" : "Services" },
          { label: title },
        ]}
        kicker={es ? "Servicio · Para fundadores y equipos de producto" : "Service · For founders and product teams"}
        title={
          <>
            {title}
            <span className="block text-white/35">{L(item.subtitle)}</span>
          </>
        }
        intro={L(page.intro)}
        wa={whatsapp(es ? `Hola Mario, me interesa: ${title}.` : `Hi Mario, I'm interested in: ${title}.`)}
        aside={<ServiceStage key={id} index={index} label={title} />}
      />

      {/* what it is, what it fixes, what it can be, then what it looks like: real screens where they fit, an invented example where they don't */}
      <Section n={n("does")} label={es ? "Lo que hago" : "What I do"} title={es ? "Cómo lo resuelvo." : "How I solve it."}>
        <div className="flex flex-col gap-6">
          <p className="text-white/85 text-xl md:text-2xl font-light leading-snug -tracking-[0.01em] max-w-2xl">{L(item.description)}</p>
          <Prose paragraphs={page.how.map(L)} />
        </div>
      </Section>

      <Section n={n("solves")} label={es ? "Qué resuelve" : "What it fixes"} title={es ? "Si hoy te pasa esto…" : "If this happens to you today…"}>
        <ProblemList
          es={es}
          items={page.solves.map((x) => ({
            problem: L(x.problem),
            fix: L(x.fix),
          }))}
        />
      </Section>

      <Section n={n("can")} label={es ? "Qué se puede hacer" : "What it can be"} title={es ? "Lo que puedo hacer en tu producto." : "What I can build into your product."}>
        <CanGrid items={page.can.map((c) => ({ title: L(c.title), text: L(c.text) }))} />
      </Section>

      {hasLook && (
        <Section
          n={n("look")}
          label={es ? "Cómo se ve" : "What it looks like"}
          title={page.flow ? (es ? "Un flujo real, paso a paso." : "A real flow, step by step.") : es ? "Pantallas reales, en línea." : "Real screens, live."}
        >
          <div className="flex flex-col gap-10">
            {page.flow && (
              <Flow
                steps={page.flow.map((f) => ({
                  title: L(f.title),
                  text: L(f.text),
                }))}
              />
            )}
            {page.shots.length > 0 && <Shots shots={page.shots} es={es} />}
            {page.caseRef && <CaseProof refs={[page.caseRef]} es={es} />}
            {examplesLink && !ex && examplesLink}
          </div>
        </Section>
      )}

      {ex && (
        <Section n={n("example")} label={es ? "Antes y después" : "Before and after"} title={es ? ex.title.es : ex.title.en}>
          <div className="flex flex-col gap-10">
            <AppExampleBlock ex={ex} es={es} />
            {examplesLink}
          </div>
        </Section>
      )}

      <Section n={n("get")} label={es ? "Lo que recibes" : "What you get"} title={es ? "Qué incluye." : "What's included."}>
        <CheckList items={deliverables} />
      </Section>

      <Section
        n={n("process")}
        label={es ? "Proceso" : "Process"}
        title={page.process ? (es ? "Así diseño." : "How I design.") : es ? "Un proceso claro, sin sorpresas." : "A clear process, no surprises."}
      >
        {page.process ? (
          <StepList
            steps={page.process.map((p) => ({
              title: L(p.title),
              text: L(p.text),
            }))}
          />
        ) : (
          <Steps es={es} />
        )}
      </Section>

      <Section n={n("start")} label={es ? "Antes de arrancar" : "Before we start"} title={es ? "Lo que me ayuda tener, y lo que queda fuera." : "What helps to have, and what's left out."}>
        <BeforeStart es={es} need={page.need.map(L)} out={page.notIncluded.map(L)} />
      </Section>

      <Section n={n("faq")} label={es ? "Preguntas" : "Questions"} title={es ? "Lo que suelen preguntarme." : "What people usually ask."}>
        <Faqs items={page.faqs.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
      </Section>

      <Section
        n={n("more")}
        label={es ? "Sigue leyendo" : "Keep reading"}
        title={notes.length ? (es ? "Notas y otros servicios." : "Notes and other services.") : es ? "Otros servicios." : "Other services."}
      >
        <div className="flex flex-col gap-10">
          {notes.length > 0 && <h3 className="-mb-6 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">{es ? "Notas" : "Notes"}</h3>}
          {notes.length > 0 && (
            <Cards
              items={notes.map((nt) => ({
                title: titleText(nt),
                text: nt.title.find(([k]) => k === "G")?.[1] ?? nt.lead,
                to: `/notas/${nt.slug}`,
              }))}
            />
          )}
          {notes.length > 0 && <h3 className="-mb-6 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">{es ? "Servicios" : "Services"}</h3>}
          <Cards
            items={[
              ...serviceLinks(page.related, es),
              {
                title: es ? "Diseño UI/UX y apps en Culiacán" : "UI/UX design and apps in Culiacán",
                text: es ? "Para fundadores y equipos de producto que quieren diseño y código de la misma persona." : "For founders and product teams who want design and code from the same person.",
                to: "/diseno-ui-ux-culiacan",
              },
            ]}
          />
        </div>
      </Section>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default ServiceDetail;
