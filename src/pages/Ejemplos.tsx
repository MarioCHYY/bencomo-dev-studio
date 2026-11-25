import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronsLeftRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { scrollToTop } from "@/lib/scrollTop";
import { Starfield } from "@/components/ui/starfield";
import { MoreLink } from "@/components/ui/more-link";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";
import {
  Hero,
  Kicker,
  Section,
  Cards,
  whatsapp,
  AURORA,
} from "@/components/landing/LandingUI";

const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

type T = { es: string; en: string };

/**
 * /ejemplos-paginas-web — three invented businesses, each shown twice: the page you get from any template
 * or from asking an AI for "a website" (same layout for all three, only the emojis change), and the one I'd design.
 * Everything here talks about design only: the businesses, prices and hours are made up and say so.
 */
const EXAMPLES: {
  id: string;
  name: string;
  kind: T;
  idea: T;
  changes: T[];
  fullH: number;
}[] = [
  {
    id: "marejada",
    name: "Marejada",
    kind: { es: "Restaurante de mariscos", en: "Seafood restaurant" },
    idea: {
      es: "Una carta de barra, no una plantilla: el antojo y el precio a la vista desde el primer segundo.",
      en: "A bar menu, not a template: the craving and the price in view from the first second.",
    },
    changes: [
      {
        es: "«Bienvenidos a…» se volvió «Aguachile que pica como debe»: el título dice qué vendes y por qué ese y no otro.",
        en: "“Welcome to…” became “Aguachile with the right kick”: the headline says what you sell and why this one.",
      },
      {
        es: "La carta, con precio y nivel de picor, aparece en la primera pantalla, como el ticket de la barra.",
        en: "The menu, with prices and heat level, sits on the first screen, like the ticket at the bar.",
      },
      {
        es: "Una sola acción principal, pedir por WhatsApp, y el horario de hoy siempre arriba.",
        en: "One main action, ordering on WhatsApp, and today's hours always at the top.",
      },
      {
        es: "Letra con carácter y los colores del mar y del chile, en lugar del degradado morado de siempre.",
        en: "Type with character and the colors of the sea and chili, instead of the usual purple gradient.",
      },
    ],
    fullH: 2234,
  },
  {
    id: "molar",
    name: "Molar",
    kind: { es: "Consultorio dental", en: "Dental clinic" },
    idea: {
      es: "Con un dentista, el diseño tiene que quitar el miedo, no presumir tecnología.",
      en: "For a dentist, the design has to take the fear away, not show off technology.",
    },
    changes: [
      {
        es: "Habla del miedo del paciente, que es lo que lo frena, y no de «tecnología de punta».",
        en: "It talks about the patient's fear, which is what holds them back, not about “cutting-edge technology”.",
      },
      {
        es: "La agenda es parte del diseño: día, hora libre y motivo, en tres toques.",
        en: "Booking is part of the design: day, free slot and reason, in three taps.",
      },
      {
        es: "Precio «desde» y duración de cada tratamiento: la primera duda, contestada antes de que la pregunten.",
        en: "A starting price and duration for each treatment: the first question, answered before it's asked.",
      },
      {
        es: "Verde menta y durazno: se ve limpio sin parecer hospital.",
        en: "Mint green and peach: clean without looking like a hospital.",
      },
    ],
    fullH: 2161,
  },
  {
    id: "fierro",
    name: "Fierro",
    kind: { es: "Gimnasio de box", en: "Boxing gym" },
    idea: {
      es: "Un gimnasio se elige por el ambiente, así que la página tiene que transmitirlo.",
      en: "People pick a gym for its vibe, so the page has to carry it.",
    },
    changes: [
      {
        es: "Una promesa concreta (aquí te corrigen la técnica) en lugar de «¡Transforma tu vida! 💪🔥».",
        en: "A concrete promise (here they fix your technique) instead of “Transform your life! 💪🔥”.",
      },
      {
        es: "El horario de hoy con los lugares libres: la página contesta «¿a qué hora hay clase?».",
        en: "Today's schedule with open spots: the page answers “when's the next class?”.",
      },
      {
        es: "Planes que se comparan de un vistazo, con el recomendado resaltado.",
        en: "Plans you can compare at a glance, with the recommended one highlighted.",
      },
      {
        es: "Negro, verde ácido y letra pesada: se siente gimnasio, no consultorio.",
        en: "Black, acid green and heavy type: it feels like a gym, not a clinic.",
      },
    ],
    fullH: 2013,
  },
];

const TEMPLATE_TELLS: T[] = [
  {
    es: "«Bienvenidos a» + el nombre del negocio",
    en: "“Welcome to” + the business name",
  },
  {
    es: "El degradado morado-azul de siempre",
    en: "The same old purple-blue gradient",
  },
  { es: "Un emoji en cada título", en: "An emoji in every heading" },
  {
    es: "«Calidad, confianza y compromiso»",
    en: "“Quality, trust and commitment”",
  },
  {
    es: "«Somos líderes…», sin decir en qué",
    en: "“We're leaders…” without saying in what",
  },
  {
    es: "Un botón de «Contáctanos» que no dice para qué",
    en: "A “Contact us” button that doesn't say what for",
  },
];

const COMMON: { title: T; text: T }[] = [
  {
    title: {
      es: "Un mensaje que solo podría ser de ese negocio",
      en: "A message only that business could say",
    },
    text: {
      es: "Si cambias el nombre y el título sigue funcionando para cualquier otro, es plantilla. Los tres títulos de la derecha no se pueden intercambiar.",
      en: "If you swap the name and the headline still works for anyone else, it's a template. None of the three headlines on the right could be swapped.",
    },
  },
  {
    title: {
      es: "Lo que el cliente viene a buscar, arriba",
      en: "What the customer came for, up top",
    },
    text: {
      es: "Precios, horario y lugares libres. La página genérica habla de sí misma; la diseñada contesta.",
      en: "Prices, hours and open spots. The generic page talks about itself; the designed one answers.",
    },
  },
  {
    title: { es: "Una acción principal, clara", en: "One clear main action" },
    text: {
      es: "Pedir, agendar o reservar. Un solo botón importante que dice exactamente qué pasa al tocarlo.",
      en: "Order, book or reserve. One important button that says exactly what happens when you tap it.",
    },
  },
  {
    title: {
      es: "Letra y color con intención",
      en: "Type and color with intent",
    },
    text: {
      es: "Cada giro tiene su propio tono: cálido para la marisquería, tranquilo para el dentista, pesado para el gimnasio.",
      en: "Each business has its own tone: warm for the seafood spot, calm for the dentist, heavy for the gym.",
    },
  },
  {
    title: {
      es: "Pensada primero para celular",
      en: "Designed for the phone first",
    },
    text: {
      es: "Ahí la van a ver casi todos. Los botones quedan al alcance del pulgar y nada se corta.",
      en: "That's where almost everyone will see it. Buttons stay within thumb reach and nothing gets cut off.",
    },
  },
];

/** drag (or use the arrow keys) to move the line between the generic page and the designed one */
function Compare({ id, name, es }: { id: string; name: string; es: boolean }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const touched = useRef(false);
  const dragging = useRef(false);
  const follow = (x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };

  // the first time it shows up, the line sweeps a little so it's obvious it moves
  useEffect(() => {
    if (!seen || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctl = animate(50, [70, 32, 50], {
      duration: 1.8,
      ease: "easeInOut",
      delay: 0.2,
      onUpdate: (v) => {
        if (!touched.current) setPos(v);
      },
    });
    return () => ctl.stop();
  }, [seen]);

  const label = es ? "Genérica" : "Generic";
  const label2 = es ? "Diseñada" : "Designed";

  const jump = (to: number) => {
    touched.current = true;
    animate(pos, to, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setPos,
    });
  };
  const chip = (to: number, text: string, on: boolean) => (
    <button
      type="button"
      onClick={() => jump(to)}
      aria-pressed={on}
      className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${on ? "bg-white text-black" : "border border-white/15 text-white/70 hover:text-white hover:border-white/40"}`}
    >
      {text}
    </button>
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        className="relative w-full overflow-hidden rounded-[18px] border border-white/[0.1] bg-black select-none aspect-[1440/900] cursor-ew-resize has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#B7A8FF]"
        style={{ touchAction: "pan-y" }}
        // drag anywhere on the picture (mouse, finger or pen); vertical swipes still scroll the page
        onPointerDown={(e) => {
          dragging.current = true;
          touched.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          follow(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && follow(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img
          src={`/ejemplos/${id}-despues-desk.webp`}
          alt={
            es
              ? `Versión diseñada de la página de ${name}`
              : `Designed version of the ${name} page`
          }
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <img
          src={`/ejemplos/${id}-antes-desk.webp`}
          alt={
            es
              ? `Versión genérica de la página de ${name}`
              : `Generic version of the ${name} page`
          }
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <span
          className="absolute left-3 top-3 md:left-4 md:top-4 rounded-full bg-black/70 backdrop-blur px-3 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-white/90"
          style={{ opacity: pos > 12 ? 1 : 0 }}
        >
          {label}
        </span>
        <span
          className="absolute right-3 top-3 md:right-4 md:top-4 rounded-full px-3 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-black"
          style={{ background: AURORA, opacity: pos < 88 ? 1 : 0 }}
        >
          {label2}
        </span>
        <div
          className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_24px_rgba(0,0,0,0.5)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black shadow-lg">
            <ChevronsLeftRight size={20} />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => {
            touched.current = true;
            setPos(Number(e.target.value));
          }}
          aria-label={
            es
              ? `Comparar la versión genérica y la diseñada de ${name}`
              : `Compare the generic and designed versions of ${name}`
          }
          className="sr-only"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {chip(100, label, pos > 97)}
        {chip(50, es ? "Las dos" : "Both", pos > 40 && pos < 60)}
        {chip(0, label2, pos < 3)}
        <span className="ml-auto text-[13px] text-white/40 hidden sm:block">
          {es ? "O arrastra la línea." : "Or drag the line."}
        </span>
      </div>
    </div>
  );
}

function Phone({
  src,
  alt,
  label,
  designed,
}: {
  src: string;
  alt: string;
  label: string;
  designed?: boolean;
}) {
  return (
    <figure className="flex flex-col items-center gap-3 min-w-0">
      <div className="w-full max-w-[260px] rounded-[30px] border border-white/[0.12] bg-black p-[6px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <img
          src={src}
          alt={alt}
          width={585}
          height={1266}
          loading="lazy"
          decoding="async"
          className="block w-full rounded-[24px]"
        />
      </div>
      <figcaption
        className={`text-xs font-semibold tracking-wide ${designed ? "text-white" : "text-white/45"}`}
      >
        {label}
      </figcaption>
    </figure>
  );
}

function Example({
  ex,
  n,
  es,
}: {
  ex: (typeof EXAMPLES)[number];
  n: string;
  es: boolean;
}) {
  const [open, setOpen] = useState(false);
  const L = (v: T) => (es ? v.es : v.en);
  return (
    <section className="relative z-20 py-16 md:py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-10 md:gap-14">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6 lg:gap-16 items-end">
          <div className="flex flex-col gap-5">
            <Kicker n={n} label={L(ex.kind)} />
            <h2 className="font-heading font-semibold text-white text-4xl md:text-6xl -tracking-[0.05em] leading-[1]">
              {ex.name}
            </h2>
          </div>
          <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-xl">
            {L(ex.idea)}
          </p>
        </div>

        <div data-reveal>
          <Compare id={ex.id} name={ex.name} es={es} />
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-12 lg:gap-16 items-start">
          <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-[560px] w-full mx-auto lg:mx-0">
            <Phone
              src={`/ejemplos/${ex.id}-antes-mob.webp`}
              alt={
                es
                  ? `${ex.name}, versión genérica en celular`
                  : `${ex.name}, generic version on a phone`
              }
              label={es ? "Genérica, en celular" : "Generic, on a phone"}
            />
            <Phone
              src={`/ejemplos/${ex.id}-despues-mob.webp`}
              alt={
                es
                  ? `${ex.name}, versión diseñada en celular`
                  : `${ex.name}, designed version on a phone`
              }
              label={es ? "Diseñada, en celular" : "Designed, on a phone"}
              designed
            />
          </div>
          <div className="flex flex-col gap-6 min-w-0">
            <h3 className="font-heading font-semibold text-white text-2xl md:text-3xl -tracking-[0.03em]">
              {es ? "Qué cambié y por qué" : "What I changed and why"}
            </h3>
            <ol className="border-t border-white/[0.09]">
              {ex.changes.map((c, i) => (
                <li
                  key={c.es}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 py-5 border-b border-white/[0.09]"
                >
                  <span className="font-mono text-xs text-white pt-1 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white/75 text-base md:text-lg leading-relaxed">
                    {L(c)}
                  </p>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="self-start inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-white/50 transition-colors"
            >
              {open
                ? es
                  ? "Ocultar la página completa"
                  : "Hide the full page"
                : es
                  ? "Ver la versión diseñada completa"
                  : "See the full designed page"}
            </button>
          </div>
        </div>

        {open && (
          <div
            data-lenis-prevent
            className="max-h-[80vh] overflow-y-auto rounded-[18px] border border-white/[0.1] bg-black"
          >
            <img
              src={`/ejemplos/${ex.id}-despues-full.webp`}
              alt={
                es
                  ? `Página completa de ${ex.name}, versión diseñada`
                  : `Full ${ex.name} page, designed version`
              }
              width={1440}
              height={ex.fullH}
              decoding="async"
              className="block w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}

const Ejemplos = () => {
  useSmoothScroll();
  useEffect(() => {
    scrollToTop();
  }, []);
  const { lang } = useLang();
  const es = lang === "es";
  const L = (v: T) => (es ? v.es : v.en);

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />
      <Hero
        es={es}
        crumbs={[
          { to: "/", label: es ? "Inicio" : "Home" },
          { label: es ? "Ejemplos de páginas web" : "Website examples" },
        ]}
        kicker={es ? "Antes y después" : "Before and after"}
        title={
          <>
            <span className="text-white/35">
              {es ? "Página genérica contra" : "A generic page versus"}
            </span>{" "}
            {es ? "página" : "a page"}{" "}
            {/* the one word in the serif, underlined by the aurora stroke that draws itself (same as the Culiacán page) */}
            <span className="relative inline-block whitespace-nowrap">
              <span className="font-serif-display font-normal italic text-[1.12em] -tracking-[0.01em] pr-[0.05em]">
                {es ? "diseñada." : "designed."}
              </span>
              <svg
                viewBox="0 0 270 24"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute left-[-2%] w-[104%] -bottom-[0.1em] h-[0.24em] overflow-visible"
              >
                <defs>
                  <linearGradient id="ej-swash" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8FB0FF" />
                    <stop offset="0.4" stopColor="#B7A8FF" />
                    <stop offset="0.72" stopColor="#FF9AB0" />
                    <stop offset="1" stopColor="#FFC48A" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M3 15 C 52 5, 104 4, 150 9 S 232 20, 267 7"
                  fill="none"
                  stroke="url(#ej-swash)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.7,
                  }}
                />
              </svg>
            </span>
          </>
        }
        intro={
          es
            ? "Tres negocios inventados, de tres giros distintos. De un lado, la página que sale de cualquier plantilla o de pedirle a una IA «hazme una página». Del otro, la que yo diseñaría. Arrastra la línea y compara."
            : "Three made-up businesses in three different fields. On one side, the page you get from any template or from asking an AI to “make me a website”. On the other, the one I'd design. Drag the line and compare."
        }
        wa={whatsapp(
          es
            ? "Hola Mario, vi tus ejemplos de páginas web y quiero una para mi negocio."
            : "Hi Mario, I saw your website examples and I'd like one for my business.",
        )}
      />

      <Section
        n="01"
        label={es ? "La plantilla de siempre" : "The usual template"}
        title={
          es
            ? "Las tres genéricas son la misma página."
            : "The three generic pages are the same page."
        }
      >
        <div className="flex flex-col gap-8">
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
            {es
              ? "Un restaurante, un dentista y un gimnasio, y la misma estructura. Solo cambian el nombre, el color del degradado y los emojis. Así se ve casi cualquier página hecha en automático:"
              : "A restaurant, a dentist and a gym, with the same structure. Only the name, the gradient color and the emojis change. This is what almost any auto-made page looks like:"}
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {EXAMPLES.map((ex) => (
              <img
                key={ex.id}
                src={`/ejemplos/${ex.id}-antes-desk.webp`}
                alt={
                  es
                    ? `Versión genérica de ${ex.name}`
                    : `Generic version of ${ex.name}`
                }
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full rounded-[10px] border border-white/[0.1]"
              />
            ))}
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 border-t border-white/[0.09]">
            {TEMPLATE_TELLS.map((t) => (
              <li
                key={t.es}
                className="py-4 border-b border-white/[0.09] text-white/75 text-base md:text-lg"
              >
                {L(t)}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {EXAMPLES.map((ex, i) => (
        <Example
          key={ex.id}
          ex={ex}
          n={String(i + 2).padStart(2, "0")}
          es={es}
        />
      ))}

      <Section
        n="05"
        label={es ? "Lo que tienen en común" : "What they share"}
        title={
          es
            ? "Por qué las de la derecha sí venden."
            : "Why the ones on the right actually sell."
        }
      >
        <div className="flex flex-col gap-10">
          <Cards
            items={COMMON.map((c) => ({ title: L(c.title), text: L(c.text) }))}
          />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={whatsapp(
                es
                  ? "Hola Mario, mi página se parece a las genéricas. ¿Me ayudas a rediseñarla?"
                  : "Hi Mario, my site looks like the generic ones. Can you help me redesign it?",
              )}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand text-black px-6 py-3.5 text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              {es
                ? "Mi página se parece a la genérica"
                : "My site looks like the generic one"}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <MoreLink to="/servicios/rediseno-web">
              {es ? "Rediseño web" : "Website redesign"}
            </MoreLink>
            <MoreLink to="/servicios/ui-ux">
              {es ? "Diseño UI/UX" : "UI/UX design"}
            </MoreLink>
          </div>
          <p className="text-[13px] text-white/40 max-w-2xl">
            {es
              ? "Marejada, Molar y Fierro son negocios inventados para este ejemplo. Sus precios, horarios y nombres de coaches también son inventados."
              : "Marejada, Molar and Fierro are businesses made up for this example. Their prices, hours and coach names are made up too."}
          </p>
        </div>
      </Section>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Ejemplos;
