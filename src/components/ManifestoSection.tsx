import { useLang } from "@/i18n/LanguageContext";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

/** Big statement between the hero and About. Lights up word by word as you scroll. */
const ManifestoSection = () => {
  const { lang } = useLang();
  const text =
    lang === "es"
      ? "No solo escribo código. Diseño productos que se sienten vivos, desde el primer boceto hasta el último pixel, usando 3D, movimiento e IA donde de verdad hacen la diferencia."
      : "I don't just write code. I design products that feel alive, from the first sketch to the last pixel, using 3D, motion and AI where they make a real difference.";

  return (
    <section className="relative z-20 py-28 md:py-44">
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-[180px_minmax(0,1fr)] gap-6 md:gap-10">
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/40 pt-3">
          {lang === "es" ? "Manifiesto" : "Manifesto"}
        </span>
        <ScrollRevealText
          text={text}
          dim={0.12}
          className="font-heading font-bold text-white text-[2rem] leading-[1.12] md:text-5xl lg:text-[3.6rem] -tracking-[0.03em]"
        />
      </div>
    </section>
  );
};

export default ManifestoSection;
