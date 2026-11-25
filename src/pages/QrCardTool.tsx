import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import { scrollToTop } from "@/lib/scrollTop";
import { Starfield } from "@/components/ui/starfield";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageContext";
import { Cards, Crumbs, Faqs, Kicker, Section } from "@/components/landing/LandingUI";
import qrcode from "@/vendor/qrcode-generator";

const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

/**
 * /herramientas/tarjeta-qr — a free design tool: a business types its WhatsApp number and name, picks one
 * of three styles (Hueso, Tinta, Aurora) and a format (counter card or Instagram story), and downloads a
 * well-designed piece with its QR code. The wa.me link is there too, as a side note. Everything happens in
 * the browser; nothing is sent anywhere. Business owners find it on Google and see what Mario designs.
 */

const ease = [0.22, 1, 0.36, 1] as const;
const INK = "#0B0B0D";
const BONE = "#F2F0EA";
const STOPS = ["#8FB0FF", "#B7A8FF", "#FF9AB0", "#FFC48A"];
const FONT = '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif';

const COUNTRIES: { code: string; name: [string, string]; digits?: number }[] = [
  { code: "52", name: ["México", "Mexico"], digits: 10 },
  { code: "1", name: ["Estados Unidos / Canadá", "United States / Canada"], digits: 10 },
  { code: "57", name: ["Colombia", "Colombia"], digits: 10 },
  { code: "54", name: ["Argentina", "Argentina"] },
  { code: "56", name: ["Chile", "Chile"], digits: 9 },
  { code: "51", name: ["Perú", "Peru"], digits: 9 },
  { code: "593", name: ["Ecuador", "Ecuador"], digits: 9 },
  { code: "502", name: ["Guatemala", "Guatemala"], digits: 8 },
  { code: "503", name: ["El Salvador", "El Salvador"], digits: 8 },
  { code: "504", name: ["Honduras", "Honduras"], digits: 8 },
  { code: "506", name: ["Costa Rica", "Costa Rica"], digits: 8 },
  { code: "507", name: ["Panamá", "Panama"], digits: 8 },
  { code: "34", name: ["España", "Spain"], digits: 9 },
];

/** the dark/light pattern of a QR code for some text */
function qrMatrix(text: string) {
  qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];
  const q = qrcode(0, "M");
  q.addData(text, "Byte");
  q.make();
  const n = q.getModuleCount();
  return { n, dark: (r: number, c: number) => q.isDark(r, c) };
}

function drawQR(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color = INK) {
  const { n, dark } = qrMatrix(text);
  const cell = size / n;
  ctx.fillStyle = color;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (dark(r, c)) ctx.fillRect(x + c * cell, y + r * cell, Math.ceil(cell), Math.ceil(cell));
}

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

export type CardStyle = "hueso" | "tinta" | "aurora";
export type CardFormat = "mostrador" | "story";

const STYLES: { id: CardStyle; name: [string, string]; swatch: string }[] = [
  { id: "hueso", name: ["Hueso", "Bone"], swatch: `linear-gradient(180deg, ${BONE} 70%, #FF9AB0 70%, #FFC48A)` },
  { id: "tinta", name: ["Tinta", "Ink"], swatch: `radial-gradient(circle at 50% 60%, #B7A8FF, ${INK} 62%)` },
  { id: "aurora", name: ["Aurora", "Aurora"], swatch: `linear-gradient(135deg, ${STOPS.join(",")})` },
];

/**
 * the piece itself, drawn at print size: 1080 × 1350 (counter card) or 1080 × 1920 (story).
 * Contrast stays dark-on-light around the code in every style, so phones read it easily.
 */
function drawCard(
  canvas: HTMLCanvasElement,
  o: { link: string; name: string; tagline: string; phone: string; es: boolean; style: CardStyle; format: CardFormat },
) {
  const W = 1080;
  const H = o.format === "story" ? 1920 : 1350;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const dark = o.style === "tinta";
  const fg = dark ? BONE : INK;
  // the story centres the same layout and leaves room for Instagram's own bars
  const oy = o.format === "story" ? 285 : 0;

  // background
  if (o.style === "aurora") {
    const g = ctx.createLinearGradient(0, 0, W, H);
    STOPS.forEach((s, i) => g.addColorStop(i / (STOPS.length - 1), s));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.fillStyle = dark ? INK : BONE;
    ctx.fillRect(0, 0, W, H);
  }
  if (o.style === "tinta") {
    // aurora light coming from behind the code
    const glow = (x: number, y: number, r: number, c: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, c);
      g.addColorStop(1, "rgba(11,11,13,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };
    glow(W * 0.3, oy + 560, 620, "rgba(143,176,255,0.32)");
    glow(W * 0.72, oy + 760, 620, "rgba(255,154,176,0.28)");
  }
  if (o.style !== "aurora") {
    const g = ctx.createLinearGradient(0, 0, W, 0);
    STOPS.forEach((s, i) => g.addColorStop(i / (STOPS.length - 1), s));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, 14);
  }

  ctx.textAlign = "center";
  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.6;
  ctx.font = `600 30px ${FONT}`;
  ctx.fillText((o.es ? "ESCANEA Y ESCRÍBENOS" : "SCAN AND MESSAGE US").split("").join(String.fromCharCode(8202)), W / 2, oy + 130);
  ctx.globalAlpha = 1;

  const title = o.name.trim() || (o.es ? "Escríbenos por WhatsApp" : "Message us on WhatsApp");
  let size = 88;
  ctx.font = `600 ${size}px ${FONT}`;
  while (ctx.measureText(title).width > W - 160 && size > 40) {
    size -= 4;
    ctx.font = `600 ${size}px ${FONT}`;
  }
  const tag = o.tagline.trim();
  ctx.fillText(title, W / 2, oy + (tag ? 222 : 240));
  if (tag) {
    ctx.globalAlpha = 0.7;
    let ts = 36;
    ctx.font = `500 ${ts}px ${FONT}`;
    while (ctx.measureText(tag).width > W - 200 && ts > 22) {
      ts -= 2;
      ctx.font = `500 ${ts}px ${FONT}`;
    }
    ctx.fillText(tag, W / 2, oy + 280);
    ctx.globalAlpha = 1;
  }

  const box = 620;
  const bx = (W - box) / 2;
  const by = oy + 340;
  ctx.save();
  if (o.style === "aurora") {
    ctx.shadowColor = "rgba(11,11,13,0.25)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 20;
  }
  ctx.fillStyle = dark ? BONE : "#FFFFFF";
  roundRect(ctx, bx, by, box, box, 44);
  ctx.fill();
  ctx.restore();
  const pad = 56;
  drawQR(ctx, o.link, bx + pad, by + pad, box - pad * 2);

  ctx.fillStyle = fg;
  ctx.font = `600 54px ${FONT}`;
  ctx.fillText(o.phone, W / 2, by + box + 105);
  ctx.font = `500 30px ${FONT}`;
  ctx.globalAlpha = 0.65;
  ctx.fillText(o.es ? "Apunta la cámara de tu celular al código" : "Point your phone's camera at the code", W / 2, by + box + 160);
  ctx.globalAlpha = 0.4;
  ctx.font = `500 22px ${FONT}`;
  ctx.fillText("mariobencomodev.com", W / 2, H - (o.format === "story" ? 240 : 50));
  ctx.globalAlpha = 1;
}

function download(canvas: HTMLCanvasElement, file: string) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = file;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const pretty = (code: string, num: string) => {
  if (code === "52" && num.length === 10) return `+52 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
  if (code === "1" && num.length === 10) return `+1 (${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;
  return `+${code} ${num}`;
};

const QrCardTool = () => {
  useSmoothScroll();
  useEffect(() => {
    scrollToTop();
  }, []);
  const { lang } = useLang();
  const es = lang === "es";
  const [code, setCode] = useState("52");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [style, setStyle] = useState<CardStyle>("tinta");
  const [format, setFormat] = useState<CardFormat>("mostrador");
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLCanvasElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const country = COUNTRIES.find((c) => c.code === code)!;
  // digits only; if someone pasted the country code too, drop it
  let num = number.replace(/\D/g, "");
  if (country.digits && num.length > country.digits && num.startsWith(code)) num = num.slice(code.length);
  const valid = num.length >= 7 && (!country.digits || num.length === country.digits);
  const link = useMemo(() => (valid ? `https://wa.me/${code}${num}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ""}` : ""), [valid, code, num, message]);
  const phone = pretty(code, num);

  useEffect(() => {
    const c = cardRef.current;
    if (!c || !link) return;
    let cancelled = false;
    // wait for the site font so the card isn't drawn in a fallback face
    (document.fonts?.ready ?? Promise.resolve()).then(() => !cancelled && drawCard(c, { link, name, tagline, phone, es, style, format }));
    return () => {
      cancelled = true;
    };
  }, [link, name, tagline, phone, es, style, format]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      linkRef.current?.select();
    }
  };

  const downloadQR = () => {
    const c = document.createElement("canvas");
    c.width = c.height = 1024;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1024, 1024);
    drawQR(ctx, link, 64, 64, 896);
    download(c, `whatsapp-qr-${code}${num}.png`);
  };

  const field = "w-full rounded-2xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-colors";
  const label = "text-[11px] font-semibold tracking-[0.18em] uppercase text-white/55";
  const L = (a: string, b: string) => (es ? a : b);
  const pill = (on: boolean) =>
    `inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${on ? "border-white bg-white text-black" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`;

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />

      {/* ------------------------------------------------------------ hero + tool */}
      <section className="relative z-20 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex flex-col gap-5">
            <Crumbs items={[{ to: "/", label: L("Inicio", "Home") }, { label: L("Herramientas", "Tools") }, { label: L("Tarjeta QR de WhatsApp", "WhatsApp QR card") }]} />
            <Kicker label={L("Herramienta de diseño gratis", "Free design tool")} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
            className="font-heading font-semibold text-white text-[2.5rem] sm:text-6xl md:text-7xl leading-[0.98] -tracking-[0.05em] max-w-5xl"
            style={{ textWrap: "balance" } as Record<string, string>}
          >
            {L("Diseña la tarjeta QR", "Design the QR card")} <span className="text-white/35">{L("de tu negocio.", "for your business.")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }} className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">
            {L(
              "Tu código de WhatsApp en una pieza bien diseñada: elige un estilo, escribe el nombre de tu negocio y descárgala lista para el mostrador o para tus historias de Instagram. Gratis y sin registrarte.",
              "Your WhatsApp code in a well-designed piece: pick a style, type your business name and download it ready for the counter or your Instagram stories. Free, no sign-up.",
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="mt-4 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 lg:gap-10 items-start"
          >
            {/* the form */}
            <div className="rounded-[28px] border border-white/[0.09] bg-white/[0.02] p-5 md:p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className={label}>{L("Estilo", "Style")}</span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={L("Estilo", "Style")}>
                  {STYLES.map((s) => (
                    <button key={s.id} type="button" role="radio" aria-checked={style === s.id} onClick={() => setStyle(s.id)} className={pill(style === s.id)}>
                      <span className="w-5 h-5 rounded-full border border-black/10" style={{ background: s.swatch }} />
                      {es ? s.name[0] : s.name[1]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className={label}>{L("Formato", "Format")}</span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={L("Formato", "Format")}>
                  {(
                    [
                      ["mostrador", L("Tarjeta de mostrador", "Counter card"), "4:5"],
                      ["story", L("Historia de Instagram", "Instagram story"), "9:16"],
                    ] as [CardFormat, string, string][]
                  ).map(([id, t, r]) => (
                    <button key={id} type="button" role="radio" aria-checked={format === id} onClick={() => setFormat(id)} className={pill(format === id)}>
                      {t}
                      <span className="font-code text-[11px] opacity-60">{r}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/[0.08]" />

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className={label}>{L("Nombre de tu negocio", "Business name")}</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder={L("Ej. Tacos El Güero", "E.g. Joe's Tacos")} className={field} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={label}>{L("Frase corta (opcional)", "Short line (optional)")}</span>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={48} placeholder={L("Ej. Pedidos para llevar", "E.g. Orders to go")} className={field} />
                </label>
              </div>
              <div className="grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-4">
                <label className="flex flex-col gap-2">
                  <span className={label}>{L("País", "Country")}</span>
                  <select value={code} onChange={(e) => setCode(e.target.value)} className={`${field} appearance-none`}>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code} className="text-black">
                        {es ? c.name[0] : c.name[1]} (+{c.code})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className={label}>{L("Número de WhatsApp", "WhatsApp number")}</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder={code === "52" ? "667 123 4567" : L("Tu número", "Your number")}
                    className={field}
                  />
                </label>
              </div>
              {number && !valid && (
                <p className="-mt-3 text-sm text-[#FF9AB0]">
                  {country.digits
                    ? L(`Para ${country.name[0]} son ${country.digits} dígitos, sin el +${code}.`, `${country.name[1]} numbers have ${country.digits} digits, without the +${code}.`)
                    : L("Revisa el número.", "Check the number.")}
                </p>
              )}
              <label className="flex flex-col gap-2">
                <span className={label}>{L("Mensaje que verá tu cliente (opcional)", "Message your client will see (optional)")}</span>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={L("Hola, quiero información sobre…", "Hi, I'd like information about…")}
                  className={`${field} resize-none`}
                />
              </label>

              {/* the plain link, as a bonus */}
              <div className="flex flex-col gap-2">
                <span className={label}>{L("Tu link de WhatsApp", "Your WhatsApp link")}</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    ref={linkRef}
                    readOnly
                    aria-label={L("Tu link de WhatsApp", "Your WhatsApp link")}
                    value={link || L("Escribe tu número para crear el link", "Type your number to create the link")}
                    className={`${field} font-mono text-sm ${link ? "" : "text-white/35"}`}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                  <button
                    type="button"
                    disabled={!link}
                    onClick={copy}
                    className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 text-white px-5 py-3.5 text-sm font-semibold disabled:opacity-40 hover:border-white/50 transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? L("Copiado", "Copied") : L("Copiar", "Copy")}
                  </button>
                </div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                {L("Todo se genera en tu navegador: tu número no se envía ni se guarda en ningún lado.", "Everything is generated in your browser: your number isn't sent or stored anywhere.")}
              </p>
            </div>

            {/* the card */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              <div className={`relative mx-auto w-full rounded-[28px] overflow-hidden border border-white/[0.09] bg-[#F2F0EA] transition-[max-width] duration-500 ${format === "story" ? "aspect-[9/16] max-w-[340px]" : "aspect-[4/5] max-w-[520px]"}`}>
                <canvas ref={cardRef} className={`absolute inset-0 w-full h-full ${link ? "" : "hidden"}`} aria-label={L("Tarjeta con el código QR de WhatsApp", "Card with the WhatsApp QR code")} role="img" />
                {!link && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-[#0B0B0D]/45">
                    <div className="w-1/2 aspect-square rounded-3xl border-2 border-dashed border-[#0B0B0D]/20" />
                    <p className="text-sm font-medium">{L("Escribe tu número y aquí aparece tu tarjeta", "Type your number and your card shows up here")}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-[520px] mx-auto">
                <button
                  type="button"
                  disabled={!link}
                  onClick={() => cardRef.current && download(cardRef.current, `tarjeta-qr-${style}-${format}.png`)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand text-black px-4 py-3.5 text-sm font-semibold disabled:opacity-40 hover:bg-brand/90 transition-colors"
                >
                  <Download size={16} />
                  {L("Descargar tarjeta", "Download card")}
                </button>
                <button
                  type="button"
                  disabled={!link}
                  onClick={downloadQR}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 text-white px-4 py-3.5 text-sm font-semibold disabled:opacity-40 hover:border-white/50 transition-colors"
                >
                  <Download size={16} />
                  {L("Solo el QR", "QR only")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section n="01" label={L("Diseño", "Design")} title={L("Detalles que hacen que sí la escaneen.", "Details that get it scanned.")}>
        <Cards
          items={
            es
              ? [
                  { title: "Contraste primero", text: "El código va oscuro sobre fondo claro en los tres estilos. Es lo que mejor leen las cámaras, aunque la tarjeta sea oscura o de colores." },
                  { title: "Un llamado que diga qué pasa", text: "“Escanea y escríbenos” le dice a la gente qué va a pasar. Un QR sin contexto se ignora." },
                  { title: "Aire alrededor del código", text: "El margen blanco alrededor del QR no es decoración: sin él, muchas cámaras no lo encuentran." },
                  { title: "Del tamaño correcto", text: "Impresa, procura que el código mida al menos 3 cm por lado y colócala donde la gente se detiene: caja, mesa o entrada." },
                ]
              : [
                  { title: "Contrast first", text: "The code is dark on a light background in all three styles. It's what cameras read best, even when the card is dark or colourful." },
                  { title: "A line that says what happens", text: "“Scan and message us” tells people what will happen. A QR with no context gets ignored." },
                  { title: "Room around the code", text: "The white margin around the QR isn't decoration: without it, many cameras can't find it." },
                  { title: "The right size", text: "Printed, keep the code at least 3 cm per side and place it where people stop: the register, tables or the entrance." },
                ]
          }
        />
      </Section>

      <Section n="02" label={L("Dónde ponerla", "Where to use it")} title={L("Donde tus clientes ya te buscan.", "Where your clients already look for you.")}>
        <Cards
          items={
            es
              ? [
                  { title: "Mostrador, mesas o empaque", text: "La tarjeta impresa junto a la caja: escanean y te escriben para pedir o preguntar." },
                  { title: "Historias de Instagram", text: "El formato vertical está hecho para subirse tal cual y dejarse en destacadas." },
                  { title: "Bio de Instagram y Facebook", text: "Copia tu link de WhatsApp y pégalo en tu perfil para que te escriban directo." },
                  { title: "Perfil de Negocio de Google", text: "Agrega el link como contacto para que te escriban desde Maps." },
                ]
              : [
                  { title: "Counter, tables or packaging", text: "The printed card by the register: they scan it and message you to order or ask." },
                  { title: "Instagram stories", text: "The vertical format is made to be posted as is and kept in your highlights." },
                  { title: "Instagram and Facebook bio", text: "Copy your WhatsApp link and paste it in your profile so people message you directly." },
                  { title: "Google Business Profile", text: "Add the link as a contact so people can message you from Maps." },
                ]
          }
        />
      </Section>

      <Section n="03" label={L("Preguntas", "Questions")} title={L("Lo que suelen preguntarme.", "What people usually ask.")}>
        <Faqs
          items={
            es
              ? [
                  { q: "¿Es gratis?", a: "Sí, completamente. No necesitas registrarte ni dejar tus datos." },
                  { q: "¿Guardan mi número?", a: "No. La tarjeta, el QR y el link se generan en tu navegador; nada se envía a ningún servidor." },
                  { q: "¿Puedo imprimirla?", a: "Sí. La tarjeta se descarga en alta resolución (1080 × 1350 px), suficiente para imprimirla en tamaño media carta o más chica." },
                  { q: "¿Por qué el código lleva el 52 antes de mi número?", a: "WhatsApp necesita el código del país para saber a qué número abrir el chat. En México es 52 y se escribe sin el signo +." },
                  { q: "¿Funciona con WhatsApp Business?", a: "Sí. El código y el link son los mismos para WhatsApp normal y WhatsApp Business." },
                ]
              : [
                  { q: "Is it free?", a: "Yes, completely. No sign-up and no personal data needed." },
                  { q: "Do you store my number?", a: "No. The card, the QR and the link are generated in your browser; nothing is sent to any server." },
                  { q: "Can I print it?", a: "Yes. The card downloads in high resolution (1080 × 1350 px), enough to print it at half-letter size or smaller." },
                  { q: "Why does the code have 52 before my number?", a: "WhatsApp needs the country code to know which number to open the chat with. Mexico's is 52, written without the + sign." },
                  { q: "Does it work with WhatsApp Business?", a: "Yes. The code and the link are the same for regular WhatsApp and WhatsApp Business." },
                ]
          }
        />
      </Section>

      <Section n="04" label={L("Siguiente paso", "Next step")} title={L("¿Y si todo tu negocio se viera así de bien?", "What if your whole business looked this good?")}>
        <Cards
          items={[
            {
              title: L("Diseño UI/UX", "UI/UX design"),
              text: L("Pantallas para tu app o sistema que la gente entiende sin manual.", "Screens for your app or system that people understand without a manual."),
              to: "/servicios/ui-ux",
            },
            {
              title: L("Diseño de páginas web en Culiacán", "Web design in Culiacán"),
              text: L("Una página con tu marca, lista para Google y con WhatsApp a un clic.", "A site with your brand, ready for Google, with WhatsApp one tap away."),
              to: "/diseno-web-culiacan",
            },
          ]}
        />
      </Section>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default QrCardTool;
