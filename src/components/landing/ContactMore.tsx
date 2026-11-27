import { MoreLink } from "@/components/ui/more-link";
import { Faqs, Section } from "./LandingUI";

/**
 * Below the contact form: what happens after someone writes, and the questions people ask before writing.
 * Only things that are true for every project: no prices, no delivery times.
 * The FAQ heading is the one the prerender looks for, so the answers also go to Google as FAQPage.
 */
const STEPS = [
  {
    t: { es: "Me escribes", en: "You write to me" },
    d: {
      es: "Por WhatsApp, por correo o con el formulario de arriba. Cuéntame de tu producto o de tu idea y qué quieres lograr; no necesitas saber de diseño ni de programación.",
      en: "On WhatsApp, by email or with the form above. Tell me about your product or your idea and what you want to achieve; you don't need to know about design or code.",
    },
  },
  {
    t: { es: "Te pregunto lo necesario", en: "I ask what I need" },
    d: {
      es: "Para entender tu proyecto: a quién le resuelves qué, en qué etapa estás y qué tienes ya (una idea, un prototipo, diseños o una versión que ya funciona).",
      en: "To understand your project: who you solve what for, what stage you're at and what you already have (an idea, a prototype, designs or a working version).",
    },
  },
  {
    t: { es: "Recibes una propuesta por escrito", en: "You get a written proposal" },
    d: {
      es: "Con el alcance, el precio y el plan de trabajo. Si te convence, empezamos; si no, no pasa nada.",
      en: "With the scope, the price and the work plan. If it works for you, we start; if not, no problem.",
    },
  },
];

const FAQS = [
  {
    q: { es: "¿Qué necesito para empezar?", en: "What do I need to get started?" },
    a: {
      es: "Solo contarme tu idea o tu producto y qué quieres lograr. Si tienes bocetos, un prototipo o una versión actual, mándamelos; si no, lo vemos juntos.",
      en: "Just tell me your idea or your product and what you want to achieve. If you have sketches, a prototype or a current version, send them; if not, we figure it out together.",
    },
  },
  {
    q: { es: "¿Cuánto cuesta?", en: "How much does it cost?" },
    a: {
      es: "Depende del alcance y de lo que necesites que haga. Después de entender tu proyecto te mando una propuesta por escrito con el precio y todo lo que incluye.",
      en: "It depends on the scope and what you need it to do. Once I understand your project I send you a written proposal with the price and everything it includes.",
    },
  },
  {
    q: { es: "¿Tú haces el diseño y también lo programas?", en: "Do you design it and also build it?" },
    a: {
      es: "Sí. Diseño la experiencia, la programo y, si hace falta, también la marca. Hablas con la misma persona de principio a fin.",
      en: "Yes. I design the experience, build it and, if needed, the brand too. You talk to the same person from start to finish.",
    },
  },
  {
    q: { es: "Ya tengo una app, ¿la puedes rediseñar?", en: "I already have an app, can you redesign it?" },
    a: {
      es: "Sí. Empiezo recorriendo los flujos principales y viendo dónde se atora la gente. Con eso te digo qué conviene mantener, qué cambiar y cómo lanzarlo sin perder a tus usuarios.",
      en: "Yes. I start by walking through the main flows and seeing where people get stuck. Then I tell you what's worth keeping, what to change and how to ship it without losing your users.",
    },
  },
  {
    q: { es: "¿Por dónde es mejor escribirte?", en: "What's the best way to reach you?" },
    a: {
      es: "Por donde te sea más cómodo: WhatsApp, correo o el formulario de esta página. Todos los mensajes los leo yo.",
      en: "Whatever is easiest for you: WhatsApp, email or the form on this page. I read every message myself.",
    },
  },
];

export default function ContactMore({ es }: { es: boolean }) {
  const L = (v: { es: string; en: string }) => (es ? v.es : v.en);
  return (
    <>
      <Section n="01" label={es ? "Qué pasa después" : "What happens next"} title={es ? "Después de que me escribes." : "After you write to me."}>
        <ol className="border-t border-white/[0.09]">
          {STEPS.map((s, i) => (
            <li key={s.t.es} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-6 border-b border-white/[0.09]">
              <span className="font-mono text-xs text-white pt-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-heading font-semibold text-white text-xl md:text-2xl -tracking-[0.03em]">{L(s.t)}</h3>
                <p className="mt-2 text-white/60 text-[15px] md:text-base leading-relaxed max-w-xl">{L(s.d)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section n="02" label={es ? "Preguntas" : "Questions"} title={es ? "Lo que suelen preguntarme." : "What people usually ask."}>
        <div className="flex flex-col gap-8">
          <Faqs items={FAQS.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <MoreLink to="/servicios">{es ? "Ver los servicios" : "See the services"}</MoreLink>
            <MoreLink to="/ejemplos-paginas-web">{es ? "Ver ejemplos antes y después" : "See before-and-after examples"}</MoreLink>
          </div>
        </div>
      </Section>
    </>
  );
}
