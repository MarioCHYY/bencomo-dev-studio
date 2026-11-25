import { Suspense, lazy, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MoreLink } from "@/components/ui/more-link";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { servicePage } from "@/content/servicePages";
import { CaseProof, Cards, CheckList, Faqs, Hero, Prose, Section, StepList, Shots, Steps, serviceLinks, whatsapp } from "@/components/landing/LandingUI";
import { useServicesScene } from "@/components/services3d/useServicesScene";
import NotFound from "./NotFound";
import { scrollToTop } from "@/lib/scrollTop";

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
      <span
        aria-hidden="true"
        className="absolute right-5 lg:right-7 top-3 lg:top-5 font-heading font-bold text-[7rem] lg:text-[10rem] -tracking-[0.06em] leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--c-fg)/0.09)] select-none tabular-nums"
      >
        {num}
      </span>
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
        kicker={es ? "Servicio · Culiacán y todo México" : "Service · Culiacán and all of Mexico"}
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

      {/* told like a case study: what I do, what it looks like, what you get */}
      <Section n="01" label={es ? "Lo que hago" : "What I do"} title={es ? "Cómo lo resuelvo." : "How I solve it."}>
        <div className="flex flex-col gap-6">
          <p className="text-white/85 text-xl md:text-2xl font-light leading-snug -tracking-[0.01em] max-w-2xl">{L(item.description)}</p>
          <Prose paragraphs={page.how.map(L)} />
        </div>
      </Section>

      <Section n="02" label={es ? "Cómo se ve" : "What it looks like"} title={es ? "Pantallas reales, en línea." : "Real screens, live."}>
        <div className="flex flex-col gap-8">
          <Shots shots={page.shots} es={es} />
          <CaseProof refs={[page.caseRef]} es={es} />
          {["sitios-web", "ui-ux", "rediseno-web"].includes(page.id) && (
            <MoreLink to="/ejemplos-paginas-web">{es ? "Ver ejemplos: página genérica contra diseñada" : "See examples: generic page versus designed"}</MoreLink>
          )}
        </div>
      </Section>

      <Section n="03" label={es ? "Lo que recibes" : "What you get"} title={es ? "Qué incluye." : "What's included."}>
        <CheckList items={deliverables} />
      </Section>

      <Section n="04" label={es ? "Para quién" : "Who it's for"} title={es ? "Te sirve si…" : "It's for you if…"}>
        <Cards items={page.forWho.map((f) => ({ title: L(f.title), text: L(f.text) }))} />
      </Section>

      <Section n="05" label={es ? "Proceso" : "Process"} title={page.process ? (es ? "Así diseño." : "How I design.") : es ? "Un proceso claro, sin sorpresas." : "A clear process, no surprises."}>
        {page.process ? <StepList steps={page.process.map((p) => ({ title: L(p.title), text: L(p.text) }))} /> : <Steps es={es} />}
      </Section>

      <Section n="06" label={es ? "Preguntas" : "Questions"} title={es ? "Lo que suelen preguntarme." : "What people usually ask."}>
        <Faqs items={page.faqs.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
      </Section>

      <Section n="07" label={es ? "También hago" : "I also do"} title={es ? "Otros servicios." : "Other services."}>
        <Cards
          items={[
            ...serviceLinks(page.related, es),
            {
              title: es ? "Diseño de páginas web en Culiacán" : "Web design in Culiacán",
              text: es ? "Todo lo que incluye una página para tu negocio, en un solo lugar." : "Everything a website for your business includes, in one place.",
              to: "/diseno-web-culiacan",
            },
          ]}
        />
      </Section>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default ServiceDetail;
