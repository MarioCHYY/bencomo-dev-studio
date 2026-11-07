import { Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useLang } from "@/i18n/LanguageContext";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { AURORA, Browser, Chapter, P, ease } from "@/components/work/CaseUI";
import { TACHADO, TachadoLogo } from "@/components/work/TachadoCard";

const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const CaseTachado = () => {
  useSmoothScroll();
  const { lang } = useLang();
  const es = lang === "es";
  useEffect(() => {
    window.scrollTo(0, 0); // braces: newer Chrome returns a promise from scrollTo
  }, []);

  const meta = es
    ? [
        ["Rol", "Producto, diseño y desarrollo"],
        ["Tipo", "Bot de Telegram + página web"],
        ["Año", "2026"],
        ["Stack", "Python · SQLite · Next.js · Postgres"],
      ]
    : [
        ["Role", "Product, design and development"],
        ["Type", "Telegram bot + website"],
        ["Year", "2026"],
        ["Stack", "Python · SQLite · Next.js · Postgres"],
      ];

  const features = es
    ? [
        "Pegas un link de Amazon y lo sigue cada hora; con precio objetivo opcional.",
        "Cada aviso llega con la gráfica del historial y botones para cambiar el objetivo o dejar de seguirlo.",
        "Avisa cuando algo se agota, cuando vuelve y cuando es el precio más bajo registrado.",
        "Cazador de ofertas: eliges una categoría y cada 3 horas manda las mejores, sin repetir y sin las infladas.",
        "Avisos al momento o en resumen diario, con horario de silencio por la noche.",
        "Canal público que publica en goteo los descuentos verificados del día.",
      ]
    : [
        "Paste an Amazon link and it checks it every hour, with an optional target price.",
        "Every alert comes with the price-history chart and buttons to change the target or stop following.",
        "It tells you when something sells out, comes back, or hits its lowest recorded price.",
        "Deal hunter: pick a category and every 3 hours it sends the best deals, no repeats and no inflated ones.",
        "Alerts right away or as a daily digest, with quiet hours at night.",
        "A public channel that posts the day's verified discounts at a steady drip.",
      ];

  const verdicts = es
    ? [
        { t: "Real", c: "#2E8B57", d: "Cuesta 8 % o más por debajo de lo normal: la mediana de sus precios de los últimos 30 días." },
        { t: "Inflado", c: TACHADO.red, d: "Amazon anuncia 5 % o más de descuento, pero cuesta lo de siempre. Estos nunca se mandan." },
        { t: "Según Amazon", c: "#9A8F5C", d: "Todavía no hay historial suficiente (3 precios en 5 días). Lo dice tal cual en el mensaje." },
      ]
    : [
        { t: "Real", c: "#2E8B57", d: "It costs 8% or more below normal: the median of its prices over the last 30 days." },
        { t: "Inflated", c: TACHADO.red, d: "Amazon advertises 5% off or more, but it costs what it always does. These are never sent." },
        { t: "Per Amazon", c: "#9A8F5C", d: "Not enough history yet (3 prices in 5 days). The message says so plainly." },
      ];

  const inside = es
    ? [
        ["Bloqueos sin congelar el bot", "Si Amazon responde con un bloqueo o captcha, el bot hace pausas crecientes (10, 20, 40… hasta 120 min) y sigue con lo demás. Avisa al administrador cuando empieza y cuando se recupera."],
        ["Una consulta a la vez", "Todas pasan por un solo candado con una pausa al azar de 8 a 16 segundos; si alguien espera en el chat, baja a 2. Cada producto se revisa una vez aunque lo sigan varias personas."],
        ["Alarma si Amazon cambia su página", "Si varias páginas seguidas no se pueden leer sin que haya bloqueo, el bot avisa para ajustar el lector antes de que se note."],
        ["Pruebas sin internet", "Usan HTML real de Amazon guardado y una API de Telegram falsa, así que prueban el bot completo: comandos, botones, avisos, silencio, resumen, canal y bloqueos."],
        ["Corre en casa, a propósito", "Amazon bloquea mucho más rápido las IP de la nube que una conexión residencial. El bot consulta desde casa y la página solo lee una base pública."],
        ["Privacidad por diseño", "En la página solo aparece lo que encontró el cazador o lo que alguien pidió revisar. Lo que cada persona sigue en privado nunca se publica."],
      ]
    : [
        ["Blocks without freezing the bot", "If Amazon answers with a block or captcha, the bot backs off in growing pauses (10, 20, 40… up to 120 min) and keeps doing everything else. It tells the admin when it starts and when it recovers."],
        ["One request at a time", "Every request goes through a single lock with a random 8–16 second pause; if someone is waiting in the chat, it drops to 2. Each product is checked once, however many people follow it."],
        ["An alarm if Amazon changes its page", "If several pages in a row can't be read without a block, the bot warns so the reader can be fixed before anyone notices."],
        ["Tests without internet", "They use real saved Amazon HTML and a fake Telegram API, so they test the whole bot: commands, buttons, alerts, quiet hours, digests, channel and blocks."],
        ["It runs at home, on purpose", "Amazon blocks cloud IPs much faster than a home connection. The bot fetches from home and the website only reads a public database."],
        ["Privacy by design", "The site only shows what the hunter found or what someone asked to check. What each person follows privately is never published."],
      ];

  const stack = ["Python", "pyTelegramBotAPI", "BeautifulSoup", "matplotlib", "SQLite", "PostgreSQL (Neon)", "Next.js", "Vercel", "pytest", "launchd"];

  return (
    <main className="min-h-screen">
      <Starfield />
      <Navbar />

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative z-20 pt-32 md:pt-40 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Link to="/portafolio" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors">
            <ArrowLeft size={15} /> {es ? "Mi trabajo" : "My work"}
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mt-10 flex flex-col gap-8">
            <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
              <span className="text-white">{es ? "Caso de estudio 02" : "Case study 02"}</span>
              <span className="h-px w-10" style={{ background: AURORA }} />
              <span className="text-white/45">Tachado</span>
            </div>
            <h1 className="font-heading font-semibold text-white text-5xl md:text-7xl lg:text-[5.4rem] leading-[0.98] -tracking-[0.05em] max-w-5xl" style={{ textWrap: "balance" } as Record<string, string>}>
              {es ? "El precio tachado" : "The crossed-out price"} <span className="text-white/35">{es ? "no siempre dice la verdad." : "doesn't always tell the truth."}</span>
            </h1>
            <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">
              {es
                ? "Tachado es un bot de Telegram que guarda el historial de precios de Amazon México, avisa cuando baja lo que sigues y revisa si cada oferta es un descuento real o un precio “antes” inflado. Con una página pública para revisar cualquier producto."
                : "Tachado is a Telegram bot that keeps Amazon Mexico's price history, alerts you when what you follow drops, and checks whether each deal is a real discount or an inflated “was” price. With a public website to check any product."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={TACHADO.site} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-brand text-black px-6 py-3.5 text-sm font-semibold hover:bg-brand/90 transition-colors">
                {es ? "Ver la página" : "Visit the site"} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={TACHADO.bot} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 hover:text-white hover:border-white/40 transition-colors">
                {es ? "Abrir el bot" : "Open the bot"} <ArrowUpRight size={15} />
              </a>
              <a href={TACHADO.channel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 hover:text-white hover:border-white/40 transition-colors">
                {es ? "Canal de ofertas" : "Deals channel"} <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>

          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {meta.map(([k, v]) => (
              <div key={k} className="py-5 pr-4 border-b border-white/10 lg:border-b-0">
                <dt className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">{k}</dt>
                <dd className="mt-2 text-white/85 text-sm md:text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------------- cover */}
      <section className="relative z-20 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="theme-dark relative overflow-hidden rounded-[24px] md:rounded-[36px] border border-white/10 p-6 sm:p-10 md:p-16"
            style={{ backgroundColor: TACHADO.ink }}
          >
            <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(55% 60% at 50% 30%, rgba(255,216,77,0.16), transparent 70%)" }} />
            <div className="relative flex justify-center"><TachadoLogo size={40} /></div>
            <div className="relative mt-10 md:mt-12 max-w-5xl mx-auto">
              <Browser src="/work/tachado/panel.webp" alt={es ? "Portada de la página de Tachado" : "Tachado website home"} url="tachado.mariobencomodev.com" />
            </div>
          </motion.div>
        </div>
      </section>

      <Chapter n="01" kicker={es ? "El problema" : "The problem"} title={es ? "¿Descuento real o precio inflado?" : "A real discount, or an inflated price?"}>
        <P>
          {es
            ? "Amazon muestra descuentos contra un precio tachado. A veces ese precio es lo que el producto costaba la semana pasada, y a veces es un “precio de lista” sugerido que casi nadie pagó. Desde la página no hay forma de saber cuál es."
            : "Amazon shows discounts against a crossed-out price. Sometimes that price is what the product cost last week, and sometimes it's a suggested “list price” almost nobody paid. From the page there's no way to tell which."}
        </P>
        <P>
          {es
            ? "Tachado guarda lo que cada producto ha costado de verdad y compara contra eso."
            : "Tachado keeps what each product has really cost and compares against that."}
        </P>
      </Chapter>

      <Chapter n="02" kicker={es ? "Qué hace" : "What it does"} title={es ? "Todo pasa en tu Telegram." : "It all happens in your Telegram."}>
        <ul className="grid sm:grid-cols-2 gap-x-8 border-t border-white/10">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 py-4 border-b border-white/10 text-[15px] text-white/75 leading-relaxed">
              <Check size={16} className="mt-1 shrink-0 text-white" />
              {f}
            </li>
          ))}
        </ul>
        <div className="theme-dark overflow-hidden rounded-[16px] md:rounded-[22px] border border-white/10 bg-white">
          <img src="/work/tachado/grafica.webp" alt={es ? "Gráfica del historial de precio que llega con cada aviso" : "Price-history chart sent with every alert"} loading="lazy" className="block w-full" />
        </div>
        <p className="text-white/45 text-sm">{es ? "La gráfica que llega con cada aviso: historial, tu precio objetivo y el mínimo registrado." : "The chart that comes with every alert: history, your target price and the lowest recorded."}</p>
      </Chapter>

      <Chapter n="03" kicker={es ? "El veredicto" : "The verdict"} title={es ? "Cómo decide si una oferta es real." : "How it decides if a deal is real."}>
        <P>
          {es
            ? "Guarda cada precio que ve. “Lo normal” es la mediana de los últimos 30 días, y con eso cada oferta recibe uno de tres veredictos:"
            : "It stores every price it sees. “Normal” is the median of the last 30 days, and with that each deal gets one of three verdicts:"}
        </P>
        <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
          {verdicts.map((v) => (
            <div key={v.t} className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5 md:p-6">
              <span className="inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: v.c }}>{v.t}</span>
              <p className="mt-4 text-white/65 text-[15px] leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
        <P>
          {es
            ? "Además distingue entre el precio “Anterior” (lo que costaba de verdad) y el “Precio de lista” del fabricante, y lo aclara en cada mensaje."
            : "It also tells apart Amazon's “previous” price (what it really cost) from the manufacturer's “list price”, and says which in every message."}
        </P>
      </Chapter>

      <Chapter n="04" kicker={es ? "La página" : "The website"} title={es ? "Revisa cualquier producto." : "Check any product."}>
        <P>
          {es
            ? "Una página pública donde pegas cualquier link de Amazon y ves su historial y si el descuento de hoy es real. Si el bot todavía no lo conoce, puedes pedir que lo revise y en unos minutos ya tiene sus datos. También muestra los descuentos reales del día y los inflados."
            : "A public site where you paste any Amazon link and see its history and whether today's discount is real. If the bot doesn't know it yet, you can ask it to check and within minutes it has the data. It also shows the day's real discounts and the inflated ones."}
        </P>
        <Browser src="/work/tachado/ofertas.webp" alt={es ? "Descuentos reales del día en la página de Tachado" : "Today's real discounts on the Tachado site"} url="tachado.mariobencomodev.com/ofertas" />
      </Chapter>

      <Chapter n="05" kicker={es ? "Por dentro" : "Under the hood"} title={es ? "Amable con Amazon, confiable para ti." : "Gentle with Amazon, reliable for you."}>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {inside.map(([h, d]) => (
            <div key={h} className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5 md:p-6">
              <p className="font-heading font-semibold text-white text-lg -tracking-[0.02em]">{h}</p>
              <p className="mt-2 text-white/60 text-[15px] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        {/* how the pieces talk */}
        <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5 md:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 text-[13px]">
            {[
              [es ? "Bot" : "Bot", es ? "en casa · consulta Amazon" : "at home · fetches Amazon"],
              ["Postgres", es ? "base pública" : "public database"],
              [es ? "Página" : "Website", es ? "Vercel · solo lee" : "Vercel · read-only"],
            ].map(([h, d], i) => (
              <div key={h} className="contents">
                {i > 0 && <span className="self-center text-white/40 rotate-90 sm:rotate-0">{i === 1 ? "→" : "←"}</span>}
                <div className="flex-1 rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="font-semibold text-white">{h}</p>
                  <p className="text-white/50 text-xs mt-0.5">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/55 text-sm leading-relaxed">
            {es
              ? "El bot sube precios cada minuto. Cuando alguien pide revisar un producto desde la página, deja una solicitud en la base y el bot la atiende en unos minutos."
              : "The bot uploads prices every minute. When someone asks the site to check a product, it leaves a request in the database and the bot handles it within minutes."}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <li key={s} className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/75">{s}</li>
          ))}
        </ul>
        <a href={TACHADO.code} target="_blank" rel="noopener noreferrer" className="group w-fit inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors">
          {es ? "Ver el código en GitHub" : "See the code on GitHub"}
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Chapter>

      <Chapter n="06" kicker={es ? "Marca" : "Brand"} title={es ? "Un signo de pesos, tachado." : "A peso sign, struck through."}>
        <P>
          {es
            ? "El nombre y el logo dicen lo mismo: un signo de pesos con una raya roja encima, como el precio tachado que el bot revisa. Amarillo de etiqueta de oferta, rojo de tachón y tipografía Archivo condensada para los precios."
            : "The name and the logo say the same thing: a peso sign with a red strike across it, like the crossed-out price the bot checks. Sale-tag yellow, strike-through red and condensed Archivo type for prices."}
        </P>
        <div className="flex flex-wrap items-center gap-4">
          <img src="/work/tachado/avatar.webp" alt={es ? "Logo de Tachado" : "Tachado logo"} loading="lazy" className="w-28 md:w-36 rounded-[22%] border border-white/10" />
          <img src="/work/tachado/avatar-canal.webp" alt={es ? "Logo del canal de ofertas" : "Deals channel logo"} loading="lazy" className="w-28 md:w-36 rounded-[22%] border border-white/10" />
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            [TACHADO.yellow, es ? "Etiqueta" : "Tag"],
            [TACHADO.red, es ? "Tachón" : "Strike"],
            ["#F4F4F1", es ? "Papel" : "Paper"],
          ].map(([c, n]) => (
            <span key={c} className="inline-flex items-center gap-2 rounded-full border border-white/12 pl-1.5 pr-3.5 py-1.5 text-[13px] text-white/75">
              <span className="w-6 h-6 rounded-full border border-white/15" style={{ backgroundColor: c }} />
              {n} <span className="font-mono text-white/40 text-xs">{c}</span>
            </span>
          ))}
        </div>
      </Chapter>

      <section className="relative z-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-wrap items-center justify-between gap-4">
          <Link to="/portafolio" className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors">
            <ArrowLeft size={15} /> {es ? "Volver a Mi trabajo" : "Back to My work"}
          </Link>
          <Link to="/portafolio/corte" className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors">
            {es ? "Caso anterior: corte" : "Previous case: corte"} <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <Suspense fallback={null}>
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default CaseTachado;
