import { useState } from "react";
import { MoreLink } from "@/components/ui/more-link";
import Compare from "./Compare";

/**
 * The before/after comparison as a block that can live on any page: three made-up businesses,
 * tabs to switch between them and the slider. The full write-up is on /ejemplos-paginas-web.
 */
const ITEMS = [
  {
    id: "marejada",
    name: "Marejada",
    kind: { es: "Mariscos", en: "Seafood" },
    idea: {
      es: "La carta con precios y el botón para pedir, en lugar de «Bienvenidos a…» y emojis.",
      en: "The menu with prices and an order button, instead of “Welcome to…” and emojis.",
    },
  },
  {
    id: "molar",
    name: "Molar",
    kind: { es: "Dentista", en: "Dentist" },
    idea: {
      es: "Una agenda para sacar cita en tres toques y precios a la vista, en lugar de «tecnología de punta».",
      en: "Booking in three taps and prices in view, instead of “cutting-edge technology”.",
    },
  },
  {
    id: "fierro",
    name: "Fierro",
    kind: { es: "Gimnasio", en: "Gym" },
    idea: {
      es: "El horario de hoy con lugares libres y planes claros, en lugar de «¡Transforma tu vida! 💪🔥».",
      en: "Today's schedule with open spots and clear plans, instead of “Transform your life! 💪🔥”.",
    },
  },
];

/** `note`: the small "made-up businesses" line under it (the home says it in its own bridge instead) */
export default function CompareShowcase({ es, note = true }: { es: boolean; note?: boolean }) {
  const [i, setI] = useState(0);
  const ex = ITEMS[i];
  return (
    <div className="flex flex-col gap-5">
      <div role="tablist" aria-label={es ? "Ejemplos" : "Examples"} className="flex flex-wrap gap-2">
        {ITEMS.map((it, k) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${k === i ? "bg-white text-black" : "border border-white/15 text-white/65 hover:text-white hover:border-white/40"}`}
          >
            {it.kind[es ? "es" : "en"]}
          </button>
        ))}
      </div>
      {/* keyed so each example starts centered and does its little sweep */}
      <Compare key={ex.id} id={ex.id} name={ex.name} es={es} />
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pt-1">
        <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
          <span className="text-white font-medium">{ex.name}.</span> {ex.idea[es ? "es" : "en"]}
        </p>
        <MoreLink to="/ejemplos-paginas-web">{es ? "Ver los 3 ejemplos completos" : "See all 3 examples"}</MoreLink>
      </div>
      {note && <p className="text-[12px] text-white/40">{es ? "Negocios inventados para el ejemplo." : "Businesses made up for the example."}</p>}
    </div>
  );
}
