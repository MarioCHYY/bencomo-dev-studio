import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Search } from "lucide-react";

/**
 * "From Google to your WhatsApp": three small mock screens telling what a website does for a
 * business — someone searches, finds the page, sends a message. A made-up bakery, clearly
 * labelled as an example; nothing here claims a real client or a result.
 */

const ease = [0.22, 1, 0.36, 1] as const;

function Step({ n, title, text, delay, children }: { n: string; title: string; text: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
      className="flex flex-col gap-5"
    >
      {/* the screen: a drawing, so it's hidden from screen readers and search engines */}
      <div aria-hidden="true" className="theme-dark relative aspect-[4/5] rounded-[28px] border border-white/[0.09] bg-[#0B0B0D] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(143,176,255,0.14), transparent 70%)" }} />
        <div className="relative h-full p-5 md:p-6 flex flex-col">{children}</div>
      </div>
      <div className="flex gap-4">
        <span className="font-mono text-xs text-white pt-1 tabular-nums">{n}</span>
        <div>
          <h3 className="font-heading font-semibold text-white text-xl md:text-2xl -tracking-[0.03em]">{title}</h3>
          <p className="mt-1.5 text-white/60 text-[15px] leading-relaxed">{text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LocalJourney({ es }: { es: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const L = (a: string, b: string) => (es ? a : b);

  return (
    <div ref={ref} className="relative">
      {/* the aurora thread running through the three steps (wide screens) */}
      <div aria-hidden="true" className="hidden lg:block absolute left-[8%] right-[8%] top-[42%] h-px bg-white/[0.08]" />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: line }}
        className="hidden lg:block absolute left-[8%] right-[8%] top-[42%] h-[2px] origin-left bg-[linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)]"
      />

      <div className="relative grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
        {/* 1 — Google */}
        <Step n="01" delay={0} title={L("Te buscan", "They search")} text={L("Alguien en Culiacán busca lo que vendes y tu página aparece con tu nombre, tu descripción y tu imagen.", "Someone in Culiacán searches for what you sell and your site shows up with your name, description and image.")}>
          <div className="flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2.5 text-[13px] text-white/80">
            <Search size={14} className="text-white/50" />
            {L("pasteles por encargo culiacán", "custom cakes culiacán")}
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="rounded-2xl border border-[#B7A8FF]/40 bg-white/[0.04] p-4 shadow-[0_0_40px_-12px_rgba(183,168,255,0.45)]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[linear-gradient(135deg,#FF9AB0,#FFC48A)]" />
                <div className="leading-tight">
                  <p className="text-[11px] text-white/80">{L("Pastelería Ejemplo", "Example Bakery")}</p>
                  <p className="text-[10px] text-white/40">pasteleriaejemplo.com</p>
                </div>
              </div>
              <p className="mt-2.5 text-[15px] font-semibold text-[#8FB0FF] leading-snug">{L("Pasteles por encargo en Culiacán · Pastelería Ejemplo", "Custom cakes in Culiacán · Example Bakery")}</p>
              <p className="mt-1.5 text-[12px] text-white/55 leading-relaxed">{L("Pasteles para cumpleaños, bodas y eventos. Pide el tuyo por WhatsApp…", "Cakes for birthdays, weddings and events. Order yours on WhatsApp…")}</p>
            </div>
            {[0.55, 0.4].map((o) => (
              <div key={o} className="rounded-2xl bg-white/[0.03] p-4 flex flex-col gap-2" style={{ opacity: o }}>
                <span className="h-2 w-1/3 rounded-full bg-white/20" />
                <span className="h-2.5 w-4/5 rounded-full bg-white/25" />
                <span className="h-2 w-full rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </Step>

        {/* 2 — the website */}
        <Step n="02" delay={0.12} title={L("Ven tu página", "They see your site")} text={L("Carga rápido en su celular, entienden qué ofreces en segundos y tienen el botón de WhatsApp a la mano.", "It loads fast on their phone, they get what you offer in seconds and the WhatsApp button is right there.")}>
          <div className="mx-auto h-full aspect-[9/17] max-w-full rounded-[26px] border border-white/15 bg-[#121417] p-2">
            <div className="h-full rounded-[20px] overflow-hidden bg-[#F2F0EA] flex flex-col">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[10px] font-semibold text-[#0B0B0D]">{L("Pastelería Ejemplo", "Example Bakery")}</span>
                <span className="w-3.5 h-2 flex flex-col justify-between">
                  <span className="h-px bg-[#0B0B0D]" />
                  <span className="h-px bg-[#0B0B0D]" />
                </span>
              </div>
              <div className="mx-3 rounded-xl aspect-[4/3] bg-[linear-gradient(135deg,#FFC48A,#FF9AB0_55%,#B7A8FF)]" />
              <div className="px-3 pt-3 flex flex-col gap-1.5">
                <p className="text-[13px] font-semibold leading-tight text-[#0B0B0D] -tracking-[0.02em]">{L("Pasteles hechos para tu día.", "Cakes made for your day.")}</p>
                <span className="h-1.5 w-full rounded-full bg-[#0B0B0D]/10" />
                <span className="h-1.5 w-3/4 rounded-full bg-[#0B0B0D]/10" />
              </div>
              <div className="px-3 pt-3 grid grid-cols-2 gap-2">
                {[
                  [L("Cumpleaños", "Birthdays"), "linear-gradient(135deg,#B7A8FF,#8FB0FF)"],
                  [L("Eventos", "Events"), "linear-gradient(135deg,#FFC48A,#FF9AB0)"],
                ].map(([t, bg]) => (
                  <div key={t} className="rounded-lg bg-white p-1.5">
                    <span className="block aspect-square rounded-md" style={{ background: bg }} />
                    <span className="block mt-1 text-[9px] font-semibold text-[#0B0B0D]">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto p-3">
                <span className="flex items-center justify-center gap-1.5 rounded-full bg-[#0B0B0D] py-2 text-[10px] font-semibold text-[#F2F0EA]">
                  <MessageCircle size={11} />
                  {L("Escríbenos por WhatsApp", "Message us on WhatsApp")}
                </span>
              </div>
            </div>
          </div>
        </Step>

        {/* 3 — WhatsApp */}
        <Step n="03" delay={0.24} title={L("Te escriben", "They message you")} text={L("Un toque y el chat se abre con el mensaje ya escrito. Llegan sabiendo qué quieren.", "One tap and the chat opens with the message already written. They arrive knowing what they want.")}>
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.08]">
            <span className="w-8 h-8 rounded-full bg-[linear-gradient(135deg,#FF9AB0,#FFC48A)]" />
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-white">{L("Pastelería Ejemplo", "Example Bakery")}</p>
              <p className="text-[11px] text-white/45">{L("en línea", "online")}</p>
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-2.5">
            <span className="self-center rounded-full bg-white/[0.06] px-3 py-1 text-[10px] text-white/45">{L("Desde tu página web", "From your website")}</span>
            <div className="self-end max-w-[85%] rounded-2xl rounded-br-md bg-[#B7A8FF] px-3.5 py-2.5 text-[13px] text-[#0B0B0D] leading-snug">
              {L("Hola, vi su página. ¿Tienen pastel de chocolate para el sábado?", "Hi, I saw your website. Do you have a chocolate cake for Saturday?")}
              <span className="block text-right text-[9px] text-[#0B0B0D]/55 mt-0.5">11:42 ✓✓</span>
            </div>
            <div className="self-start max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.08] px-3.5 py-2.5 text-[13px] text-white/85 leading-snug">
              {L("¡Hola! Sí, claro. ¿Para cuántas personas?", "Hi! Yes, of course. For how many people?")}
            </div>
          </div>
        </Step>
      </div>

      <p className="mt-8 text-xs text-white/35">{L("Ejemplo ilustrativo con un negocio inventado.", "Illustrative example with a made-up business.")}</p>
    </div>
  );
}
