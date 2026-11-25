import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AURORA } from "@/components/landing/LandingUI";
import type { Note } from "@/content/notes";
import { inLang } from "@/content/notes-en";
import NoteTitle from "./NoteTitle";

/** a design note in a list: kicker, title with the serif ending, the lead */
export default function NoteCard({
  n: original,
  es,
  big,
}: {
  n: Note;
  es: boolean;
  big?: boolean;
}) {
  const n = inLang(original, es);
  return (
    <Link
      to={`/notas/${n.slug}`}
      className="group relative w-full rounded-[24px] border border-white/[0.09] bg-white/[0.02] p-6 md:p-8 flex flex-col gap-5 hover:border-white/25 transition-colors overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: AURORA }}
      />
      <div className="flex items-center justify-between gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
        <span>{n.kicker}</span>
        <span className="tracking-normal normal-case font-medium">
          {n.read} min
        </span>
      </div>
      <h3
        className={`font-heading font-semibold text-white -tracking-[0.04em] leading-[1.05] ${big ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}
        style={{ textWrap: "balance" } as Record<string, string>}
      >
        <NoteTitle segs={n.title} />
      </h3>
      <p className="text-white/60 text-[15px] md:text-base leading-relaxed line-clamp-3">
        {n.lead}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-white">
        {es ? "Leer la nota" : "Read the note"}
        <ArrowUpRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
