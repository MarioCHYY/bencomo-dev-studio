import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MoreLink } from "@/components/ui/more-link";
import { translations } from "@/i18n/translations";
import type { CaseRef } from "@/content/servicePages";

/**
 * Building blocks for the pages made to be found on Google (one per service, and the Culiacán page).
 * Same visual language as the rest of the site: numbered kickers with the aurora rule, big tight
 * headings, hairline lists. Everything is plain text in the page (no accordions), so search engines read it all.
 */

export const AURORA = "linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)";
const ease = [0.22, 1, 0.36, 1] as const;
const WA = "https://wa.me/526674962484?text=";
export const whatsapp = (text: string) => WA + encodeURIComponent(text);

export function Kicker({ n, label }: { n?: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
      {n && <span className="font-mono text-white tabular-nums">{n}</span>}
      <span className="h-px w-10" style={{ background: AURORA }} />
      <span className="text-white/45">{label}</span>
    </div>
  );
}

export function Crumbs({ items }: { items: { to?: string; label: string }[] }) {
  return (
    <nav aria-label="Ruta" className="text-[12px] text-white/45">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.to ? (
              <Link to={c.to} className="hover:text-white transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="text-white/70" aria-current="page">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Hero({
  crumbs,
  kicker,
  title,
  intro,
  wa,
  es,
  aside,
}: {
  crumbs: { to?: string; label: string }[];
  kicker: string;
  title: ReactNode;
  intro: string;
  wa: string;
  es: boolean;
  /** something to show beside the words on wide screens (a 3D stage, an image…) */
  aside?: ReactNode;
}) {
  const ctas = (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 rounded-full bg-brand text-black px-6 py-3.5 text-sm font-semibold hover:bg-brand/90 transition-colors"
      >
        {es ? "Escríbeme por WhatsApp" : "Message me on WhatsApp"}
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <MoreLink to="/portafolio">{es ? "Ver casos de estudio" : "See case studies"}</MoreLink>
    </div>
  );
  const head = (
    <>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex flex-col gap-5">
        <Crumbs items={crumbs} />
        <Kicker label={kicker} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
        className={`font-heading font-semibold text-white text-[2.6rem] sm:text-6xl md:text-7xl leading-[0.98] -tracking-[0.05em] max-w-5xl ${aside ? "lg:text-[4.4rem]" : "lg:text-[5.2rem]"}`}
        style={{ textWrap: "balance" } as Record<string, string>}
      >
        {title}
      </motion.h1>
    </>
  );

  if (aside) {
    return (
      <section className="relative z-20 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          <div className="flex flex-col gap-8">
            {head}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }} className="flex flex-col gap-8">
              <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">{intro}</p>
              {ctas}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease, delay: 0.2 }}>
            {aside}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-20 pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-8">
        {head}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 lg:gap-16 items-end"
        >
          <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">{intro}</p>
          <div className="lg:justify-self-end">{ctas}</div>
        </motion.div>
      </div>
    </section>
  );
}

export function Section({ n, label, title, children, id }: { n: string; label: string; title: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="relative z-20 py-16 md:py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 lg:gap-20">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          <Kicker n={n} label={label} />
          <h2 className="font-heading font-semibold text-white text-3xl md:text-5xl -tracking-[0.04em] leading-[1.05]" style={{ textWrap: "balance" } as Record<string, string>}>
            {title}
          </h2>
        </div>
        <div data-reveal className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="border-t border-white/[0.09]">
      {items.map((d) => (
        <li key={d} className="flex items-start gap-3 py-4 border-b border-white/[0.09] text-base md:text-lg text-white/80">
          <Check size={17} className="mt-1 shrink-0 text-white" />
          {d}
        </li>
      ))}
    </ul>
  );
}

export function Cards({ items }: { items: { title: string; text: string; to?: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
      {items.map((c, i) => {
        // with an odd number of cards the last one takes the whole row, so the grid never has a hole
        const wide = items.length % 2 === 1 && i === items.length - 1 ? "sm:col-span-2" : "";
        const body = (
          <>
            <h3 className="font-heading font-semibold text-white text-xl md:text-2xl -tracking-[0.03em] leading-tight">{c.title}</h3>
            <p className="mt-3 text-white/60 text-[15px] md:text-base leading-relaxed">{c.text}</p>
            {c.to && <ArrowUpRight size={16} className="absolute top-6 right-6 text-white/30 transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
          </>
        );
        const cls = `group relative rounded-[22px] border border-white/[0.09] bg-white/[0.02] p-6 md:p-7 transition-colors ${wide}`;
        return c.to ? (
          <Link key={c.title} to={c.to} className={`${cls} hover:border-white/25 pr-12`}>
            {body}
          </Link>
        ) : (
          <div key={c.title} className={cls}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      {paragraphs.map((p) => (
        <p key={p} className="text-white/70 text-lg md:text-xl leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}

/** questions and answers, all open: easier to scan and every answer is in the page */
export function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-white/[0.09]">
      {items.map((f) => (
        <div key={f.q} className="py-6 border-b border-white/[0.09]">
          <h3 className="font-heading font-semibold text-white text-lg md:text-xl -tracking-[0.02em]">{f.q}</h3>
          <p className="mt-2 text-white/60 text-[15px] md:text-base leading-relaxed max-w-2xl">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

/** the three steps from the home page, word for word */
export function Steps({ es }: { es: boolean }) {
  const steps = es
    ? [
        ["Entender el problema", "Antes de diseñar nada, entiendo a quién le resuelves qué, cómo lo hace hoy y en qué paso se atora."],
        ["Diseñar y construir", "Diseño la experiencia y la programo a la medida, mostrándote avances reales en cada etapa para que opines a tiempo."],
        ["Lanzar y aprender", "Publico, mido y ajusto. Tu producto queda listo para crecer con lo que te digan tus usuarios, no solo para el día del lanzamiento."],
      ]
    : [
        ["Understand the problem", "Before designing anything, I learn who you solve what for, how they do it today and at which step they get stuck."],
        ["Design and build", "I design the experience and build it to measure, showing you real progress at every stage so you can weigh in on time."],
        ["Launch and learn", "I ship, measure and adjust. Your product is ready to grow with what your users tell you, not just for launch day."],
      ];
  return (
    <ol className="border-t border-white/[0.09]">
      {steps.map(([t, d], i) => (
        <li key={t} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-6 border-b border-white/[0.09]">
          <span className="font-mono text-xs text-white pt-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-heading font-semibold text-white text-xl md:text-2xl -tracking-[0.03em]">{t}</h3>
            <p className="mt-2 text-white/60 text-[15px] md:text-base leading-relaxed max-w-xl">{d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const CASES: Record<CaseRef, { to: string; img: string; name: string; line: [string, string]; tags: [string, string] }> = {
  corte: {
    to: "/portafolio/corte",
    img: "/work/corte/opengraph-image.webp",
    name: "corte",
    line: [
      "App para repartir los gastos de la casa y controlar la tarjeta de crédito que todos usan: fecha de corte, fecha límite y meses sin intereses.",
      "An app to split household expenses and keep the shared credit card under control: statement date, due date and interest-free installments.",
    ],
    tags: ["Producto · Diseño UI/UX · Marca · Desarrollo", "Product · UI/UX design · Brand · Development"],
  },
  tachado: {
    to: "/portafolio/tachado",
    img: "/work/tachado/panel.webp",
    name: "Tachado",
    line: [
      "Bot de Telegram que guarda el historial de precios de Amazon México y revisa si cada oferta es un descuento real o un precio inflado.",
      "A Telegram bot that keeps Amazon Mexico's price history and checks whether each deal is a real discount or an inflated price.",
    ],
    tags: ["Bot · Página web · Datos · Automatización", "Bot · Website · Data · Automation"],
  },
};

export function CaseProof({ refs, es }: { refs: CaseRef[]; es: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {refs.map((r) => {
        const c = CASES[r];
        return (
          <Link key={r} to={c.to} data-cursor={es ? "Ver caso" : "View case"} className="group theme-dark relative block overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0B0B0D]">
            <div className="aspect-[1200/630] overflow-hidden">
              <img src={c.img} alt={`${c.name}: ${es ? c.line[0] : c.line[1]}`} loading="lazy" className="h-full w-full object-cover object-left-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
            </div>
            <div className="p-6 md:p-7">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/45">{es ? c.tags[0] : c.tags[1]}</p>
              <h3 className="mt-2 font-heading font-semibold text-white text-2xl -tracking-[0.03em]">{c.name}</h3>
              <p className="mt-2 text-white/60 text-[15px] leading-relaxed">{es ? c.line[0] : c.line[1]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                {es ? "Ver el caso completo" : "See the full case"}
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** links to other services, by id, with their titles from translations.ts */
export function serviceLinks(ids: string[], es: boolean) {
  const items = translations.services.items;
  return ids
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean)
    .map((i) => ({ title: es ? i!.title.es : i!.title.en, text: es ? i!.subtitle.es : i!.subtitle.en, to: `/servicios/${i!.id}` }));
}

/** real screens from live projects: phones side by side (four make a journey, two per row on phones), wide screens in a browser frame */
export function Shots({ shots, es }: { shots: import("@/content/servicePages").Shot[]; es: boolean }) {
  const phones = shots.filter((s) => s.kind === "phone");
  const wides = shots.filter((s) => s.kind === "wide");
  return (
    <div className="flex flex-col gap-10">
      {phones.length > 0 && (
        <div className={`grid gap-3 md:gap-5 ${phones.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"}`}>
          {phones.map((s, i) => (
            <motion.figure
              key={s.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="flex flex-col gap-3 min-w-0"
            >
              <div className="rounded-[18px] md:rounded-[26px] border border-white/15 bg-[#0b0c0e] p-1 md:p-1.5 shadow-[0_30px_70px_-30px_rgba(11,11,13,0.55)]">
                <img src={s.src} alt={es ? s.caption.es : s.caption.en} loading="lazy" className="block w-full rounded-[14px] md:rounded-[21px]" />
              </div>
              <figcaption className="text-[12px] md:text-sm text-white/55 leading-snug">{es ? s.caption.es : s.caption.en}</figcaption>
            </motion.figure>
          ))}
        </div>
      )}
      {wides.map((s) => (
        <figure key={s.src} className="flex flex-col gap-3">
          <div data-reveal className="overflow-hidden rounded-[14px] md:rounded-[18px] border border-white/15 bg-[#0b0c0e] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#FF9AB0]" />
              <span className="w-2 h-2 rounded-full bg-[#FFC48A]" />
              <span className="w-2 h-2 rounded-full bg-[#8FB0FF]" />
              {s.url && <span className="ml-3 truncate font-mono text-[10px] text-[#F2F0EA]/40">{s.url}</span>}
            </div>
            <img src={s.src} alt={es ? s.caption.es : s.caption.en} loading="lazy" className="block w-full" />
          </div>
          <figcaption className="text-sm text-white/55">{es ? s.caption.es : s.caption.en}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** a numbered list of steps (title + text) */
export function StepList({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="border-t border-white/[0.09]">
      {steps.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-6 border-b border-white/[0.09]">
          <span className="font-mono text-xs text-white pt-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-heading font-semibold text-white text-xl md:text-2xl -tracking-[0.03em]">{s.title}</h3>
            <p className="mt-2 text-white/60 text-[15px] md:text-base leading-relaxed max-w-xl">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** what someone is dealing with today, and what changes: one row each, problem on the left */
export function ProblemList({ items, es }: { items: { problem: string; fix: string }[]; es: boolean }) {
  return (
    <div className="border-t border-white/[0.09]">
      <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 py-3 font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">
        <span>{es ? "Hoy" : "Today"}</span>
        <span>{es ? "Lo que cambia" : "What changes"}</span>
      </div>
      <ul>
        {items.map((it) => (
          <li key={it.problem} className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 md:gap-10 py-6 border-t border-white/[0.09]">
            <p className="text-white/50 text-base md:text-lg leading-relaxed">{it.problem}</p>
            <p className="flex gap-3 text-white text-base md:text-lg leading-relaxed">
              <ArrowUpRight size={18} className="mt-1 shrink-0 rotate-45 text-white/40" aria-hidden="true" />
              <span>{it.fix}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** concrete things a service can be: a compact, scannable grid */
export function CanGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="grid sm:grid-cols-2 border-t border-white/[0.09]">
      {items.map((c, i) => (
        <li key={c.title} className={`py-6 border-b border-white/[0.09] sm:pr-8 ${i % 2 === 1 ? "sm:pl-8 sm:border-l" : ""}`}>
          <h3 className="font-heading font-semibold text-white text-lg md:text-xl -tracking-[0.02em]">{c.title}</h3>
          <p className="mt-2 text-white/60 text-[15px] leading-relaxed">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** a real flow, step by step, joined by a line */
export function Flow({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-0">
      {steps.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 pb-7 last:pb-0">
          {i < steps.length - 1 && <span aria-hidden="true" className="absolute left-[1.375rem] top-11 bottom-0 w-px bg-white/15" />}
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] font-mono text-xs text-white tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-2">
            <h3 className="font-heading font-semibold text-white text-lg md:text-xl -tracking-[0.02em]">{s.title}</h3>
            <p className="mt-1.5 text-white/60 text-[15px] md:text-base leading-relaxed max-w-xl">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** two short lists side by side: what helps to have before starting, and what's left out */
export function BeforeStart({ need, out, es }: { need: string[]; out: string[]; es: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-10">
      <div className="min-w-0">
        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 pb-3">{es ? "Lo que me ayuda tener" : "What helps to have"}</h3>
        <ol className="border-t border-white/[0.09]">
          {need.map((t, i) => (
            <li key={t} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2 py-4 border-b border-white/[0.09]">
              <span className="font-mono text-xs text-white pt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-white/80 text-base leading-relaxed">{t}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="min-w-0">
        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 pb-3">{es ? "Lo que queda fuera" : "What's left out"}</h3>
        <ul className="border-t border-white/[0.09]">
          {out.map((t) => (
            <li key={t} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2 py-4 border-b border-white/[0.09]">
              <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 bg-white/40" />
              <p className="text-white/60 text-base leading-relaxed">{t}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
