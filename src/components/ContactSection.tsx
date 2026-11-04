import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";
import { BrandMark } from "@/components/brand/Logo";

const ease = [0.22, 1, 0.36, 1] as const;
const EMAIL = "mariobencomo057@gmail.com";
const AURORA = "linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)";

const channels = [
  { name: "WhatsApp", handle: "+52 667 496 2484", href: "https://wa.me/526674962484?text=Hola%20Mario,%20me%20gustaría%20hablar%20sobre%20un%20proyecto." },
  { name: "LinkedIn", handle: "Mario Bencomo", href: "https://www.linkedin.com/in/mario-bencomo-4998273aa/" },
  { name: "Instagram", handle: "@mario_bencomo06", href: "https://www.instagram.com/mario_bencomo06" },
  { name: "GitHub", handle: "@MarioCHYY", href: "https://github.com/MarioCHYY" },
];

/** Live time in Culiacán, so people know when to expect an answer. */
function useLocalTime(locale: string) {
  const fmt = () =>
    new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: "America/Mazatlan" }).format(new Date());
  const [now, setNow] = useState(fmt);
  useEffect(() => {
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 30_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  return now;
}

/**
 * /contacto: the simplest page of the site. A headline, a short form on the left
 * and every direct way to reach me on the right.
 */
const ContactSection = () => {
  const { toast } = useToast();
  const { lang } = useLang();
  const es = lang === "es";
  const now = useLocalTime(es ? "es-MX" : "en-US");

  const needs = es
    ? ["Sitio web", "Aplicación web", "Sistema para negocio", "Rediseño", "Otro"]
    : ["Website", "Web app", "Business system", "Redesign", "Other"];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [need, setNeed] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // braces: newer Chrome returns a promise from scrollTo, which React would treat as a cleanup
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById("contact-email");
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: es ? "Por favor llena tu nombre, correo y mensaje" : "Please fill in your name, email and message", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const data = new FormData(e.currentTarget);
      data.append("access_key", "977d23ee-f351-477b-9546-231c99b20a08");
      data.append("subject", `Nuevo mensaje desde mariobencomodev.com${need ? ` · ${need}` : ""}`);
      data.append("from_name", "mariobencomodev.com");
      if (need) data.append("servicio", need);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || "");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setNeed(null);
    } catch (err) {
      toast({
        title: es ? "No se pudo enviar" : "Couldn't send it",
        description:
          (err instanceof Error && err.message) ||
          (es ? "Inténtalo de nuevo o escríbeme directo por WhatsApp o correo." : "Try again or reach me directly on WhatsApp or email."),
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full bg-transparent border-0 border-b border-white/15 focus:border-white focus:outline-none focus:ring-0 py-3 text-lg text-white placeholder:text-white/30 transition-colors rounded-none";
  const label = "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45";

  return (
    <section id="contact" className="relative z-20 pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* ---------- headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
        >
          <span className="text-white">{es ? "Contacto" : "Contact"}</span>
          <span className="h-px w-10" style={{ background: AURORA }} />
          <span className="text-white/45">{es ? "Empecemos por una conversación" : "It starts with a conversation"}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
          className="mt-8 font-heading font-semibold text-white text-5xl md:text-7xl lg:text-[5.4rem] leading-[0.98] -tracking-[0.05em] max-w-4xl"
          style={{ textWrap: "balance" } as Record<string, string>}
        >
          {es ? "Hablemos de" : "Let's talk about"} <span className="text-white/35">{es ? "tu proyecto." : "your project."}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
          className="mt-6 text-white/60 text-lg md:text-xl leading-relaxed max-w-xl"
        >
          {es
            ? "Cuéntame tu proyecto y te respondo con una propuesta clara y un plan de trabajo."
            : "Tell me about your project and I'll respond with a clear proposal and work plan."}
        </motion.p>

        <div className="mt-16 md:mt-20 grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-16 lg:gap-24 items-start">
          {/* ---------- form */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease }}
                  className="flex flex-col items-start gap-6 py-6"
                  role="status"
                >
                  <SentMark />
                  <h2 className="font-heading font-semibold text-white text-3xl md:text-4xl -tracking-[0.03em]">
                    {es ? "¡Mensaje enviado!" : "Message sent!"}
                  </h2>
                  <p className="text-white/60 text-lg max-w-md leading-relaxed">
                    {es ? "Gracias por escribirme. Ya lo tengo en mi bandeja y te respondo pronto." : "Thanks for reaching out. It's in my inbox and I'll get back to you soon."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors"
                  >
                    {es ? "Enviar otro mensaje" : "Send another message"}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-10" noValidate>
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                  <fieldset className="flex flex-col gap-4">
                    <legend className={label}>{es ? "¿Qué necesitas?" : "What do you need?"}</legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {needs.map((n) => {
                        const on = need === n;
                        return (
                          <button
                            key={n}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setNeed(on ? null : n)}
                            className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors border ${
                              on ? "bg-white text-black border-white" : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="grid sm:grid-cols-2 gap-10 sm:gap-8">
                    <label className="flex flex-col gap-1">
                      <span className={label}>{es ? "Tu nombre" : "Your name"}</span>
                      <input
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={es ? "¿Cómo te llamas?" : "What's your name?"}
                        className={field}
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className={label}>{es ? "Tu correo" : "Your email"}</span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={es ? "nombre@correo.com" : "name@email.com"}
                        className={field}
                        required
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1">
                    <span className={label}>{es ? "Tu mensaje" : "Your message"}</span>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={es ? "Cuéntame qué quieres construir, para cuándo y cualquier detalle que ayude." : "Tell me what you want to build, by when, and any detail that helps."}
                      className={`${field} resize-none leading-relaxed`}
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={sending}
                    className="group w-fit inline-flex items-center gap-3 rounded-full bg-brand text-black pl-7 pr-2 py-2 text-base font-semibold hover:bg-brand/90 disabled:opacity-60 transition-colors"
                  >
                    {sending ? (es ? "Enviando…" : "Sending…") : es ? "Enviar mensaje" : "Send message"}
                    <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowUpRight size={18} className={`transition-transform ${sending ? "animate-pulse" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
                    </span>
                  </button>
                  <p className="-mt-4 text-xs text-white/45 leading-relaxed max-w-md">
                    {es ? "Al enviar aceptas el " : "By sending you accept the "}
                    <Link to="/privacidad" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                      {es ? "aviso de privacidad" : "privacy notice"}
                    </Link>
                    {es ? ". Solo uso tus datos para responderte." : ". I only use your data to reply."}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ---------- direct channels */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/75">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8FB0FF] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8FB0FF]" />
                </span>
                {es ? "Disponible para nuevos proyectos" : "Open to new projects"}
              </span>
              <p className="text-white/50 text-sm">
                {es ? `Culiacán, México · son las ${now} aquí (hora del Pacífico)` : `Culiacán, Mexico · it's ${now} here (Pacific time)`}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className={label}>{es ? "O escríbeme directo" : "Or reach me directly"}</span>
              <div className="flex flex-wrap items-center gap-3">
                <a id="contact-email" href={`mailto:${EMAIL}`} className="font-heading font-medium text-white text-xl md:text-2xl -tracking-[0.02em] break-all hover:text-white/80 transition-colors">
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:border-white/40 transition-colors"
                  aria-live="polite"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? (es ? "Copiado" : "Copied") : es ? "Copiar" : "Copy"}
                </button>
              </div>
            </div>

            <ul className="border-t border-white/10">
              {channels.map((ch) => (
                <li key={ch.name}>
                  <a href={ch.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4 border-b border-white/10">
                    <span className="font-heading font-medium text-white text-xl -tracking-[0.02em] transition-transform duration-300 group-hover:translate-x-2">{ch.name}</span>
                    <span className="flex items-center gap-3 text-white/45 group-hover:text-white transition-colors">
                      <span className="text-sm">{ch.handle}</span>
                      <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

/** The mark slips open once the message is on its way. */
function SentMark() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 250);
    return () => clearTimeout(id);
  }, []);
  return <BrandMark size={64} tone="auto" open={open} />;
}

export default ContactSection;
