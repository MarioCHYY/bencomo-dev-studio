import { useLang } from "@/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/section-heading";
import { Starfield } from "@/components/ui/starfield";
import CompareShowcase from "@/components/landing/CompareShowcase";

/**
 * Home: right after "Diseño, código y marca. Hechos por la misma persona.", the proof of it —
 * a generic page against a designed one, live, to drag.
 * It sits on its own sand band (like Services), so the page reads in clear blocks:
 * statement → comparison (band) → case studies → services (band).
 */
export default function CompareSection() {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <section data-bp={es ? "Antes y después" : "Before and after"} className="bg-sand relative z-20 overflow-hidden py-24 md:py-32">
      <Starfield contained count={70} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-12 md:gap-14">
        <SectionHeading
          index="03"
          label={es ? "Antes y después" : "Before and after"}
          title={
            <>
              <span className="text-white/35">{es ? "Página genérica contra" : "A generic page versus"}</span> {es ? "página" : "a"}
              <span className="[word-spacing:0.08em]"> </span>
              <span className="font-serif-display font-normal italic -tracking-[0.01em] text-[1.1em]">{es ? "diseñada." : "designed one."}</span>
            </>
          }
          intro={
            es
              ? "El mismo negocio, dos páginas. De un lado, la que sale de cualquier plantilla o de pedirle a una IA «hazme una página». Del otro, la que yo diseñaría. Arrastra la línea."
              : "The same business, two websites. On one side, the one you get from any template or from asking an AI to “make me a website”. On the other, the one I'd design. Drag the line."
          }
        />
        <CompareShowcase es={es} />
      </div>
    </section>
  );
}
