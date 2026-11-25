import type { TitleSeg } from "@/content/notes";

/**
 * A note's title in the site's voice: solid words, soft grey words, the serif accent,
 * and an optional grey line underneath. The space before the serif is a touch wider,
 * because the sans is set tight and the italic would otherwise touch it.
 */
export default function NoteTitle({ segs }: { segs: TitleSeg[] }) {
  const inline = segs.filter(([s]) => s !== "G");
  const sub = segs.find(([s]) => s === "G");
  return (
    <>
      {inline.map(([s, t], i) => (
        <span key={i}>
          {i > 0 && <span className={s === "i" || inline[i - 1][0] === "i" ? "[word-spacing:0.08em]" : undefined}> </span>}
          {s === "i" ? (
            <span className="font-serif-display font-normal italic -tracking-[0.01em] text-[1.08em]">{t}</span>
          ) : s === "g" ? (
            <span className="text-white/35">{t}</span>
          ) : (
            t
          )}
        </span>
      ))}
      {sub && <span className="block text-white/35">{sub[1]}</span>}
    </>
  );
}
