import Compare from "@/components/landing/Compare";
import type { AppExample } from "@/content/appExamples";

/** one phone screenshot in a thin bezel, with its caption */
function Phone({ src, alt, label, designed }: { src: string; alt: string; label: string; designed?: boolean }) {
  return (
    <figure className="flex flex-col items-center gap-3 min-w-0">
      <div className="w-full max-w-[240px] rounded-[30px] border border-white/[0.12] bg-black p-[6px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <img src={src} alt={alt} width={585} height={1266} loading="lazy" decoding="async" className="block w-full rounded-[24px]" />
      </div>
      <figcaption className={`text-xs font-semibold tracking-wide ${designed ? "text-white" : "text-white/45"}`}>{label}</figcaption>
    </figure>
  );
}

/**
 * An invented app, generic versus designed, laid out like the examples on /ejemplos-paginas-web:
 * the idea, the slider on desktop, both versions on a phone and what changed. Used on the service it explains.
 */
export default function AppExampleBlock({ ex, es }: { ex: AppExample; es: boolean }) {
  const L = (v: { es: string; en: string }) => (es ? v.es : v.en);
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">
        <span className="text-white font-medium">{ex.name}.</span> {L(ex.idea)}
      </p>
      <div data-reveal>
        <Compare id={ex.id} name={ex.name} es={es} app />
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-12 lg:gap-16 items-start">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-[520px] w-full mx-auto lg:mx-0">
          <Phone
            src={`/ejemplos/${ex.id}-antes-mob.webp`}
            alt={es ? `${ex.name}, versión genérica en celular` : `${ex.name}, generic version on a phone`}
            label={es ? "Genérica, en celular" : "Generic, on a phone"}
          />
          <Phone
            src={`/ejemplos/${ex.id}-despues-mob.webp`}
            alt={es ? `${ex.name}, versión diseñada en celular` : `${ex.name}, designed version on a phone`}
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
              <li key={c.es} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 py-5 border-b border-white/[0.09]">
                <span className="font-mono text-xs text-white pt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-white/75 text-base md:text-lg leading-relaxed">{L(c)}</p>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-white/40">
            {es
              ? `${ex.name} es una app inventada para este ejemplo, igual que sus cifras y precios.`
              : `${ex.name} is an app made up for this example, and so are its figures and prices.`}
          </p>
        </div>
      </div>
    </div>
  );
}
