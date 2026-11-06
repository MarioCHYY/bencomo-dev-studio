import { Suspense, lazy, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Starfield } from "@/components/ui/starfield";
import { useLang } from "@/i18n/LanguageContext";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { CORTE, CorteLogo, Phone } from "@/components/work/FeaturedProject";

const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const ease = [0.22, 1, 0.36, 1] as const;
const AURORA = "linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)";

function Chapter({ n, kicker, title, children }: { n: string; kicker: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="relative z-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] gap-8 lg:gap-20">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
            <span className="font-mono text-white tabular-nums">{n}</span>
            <span className="h-px w-10" style={{ background: AURORA }} />
            <span className="text-white/45">{kicker}</span>
          </div>
          <h2 className="font-heading font-semibold text-white text-3xl md:text-[2.6rem] leading-[1.05] -tracking-[0.04em]" style={{ textWrap: "balance" } as Record<string, string>}>
            {title}
          </h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease }} className="min-w-0 flex flex-col gap-6">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

const P = ({ children }: { children: ReactNode }) => <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">{children}</p>;

const CaseCorte = () => {
  useSmoothScroll();
  const { lang } = useLang();
  const es = lang === "es";
  useEffect(() => {
    window.scrollTo(0, 0); // braces: newer Chrome returns a promise from scrollTo
  }, []);

  const meta = es
    ? [
        ["Rol", "Producto, diseño, marca y desarrollo"],
        ["Tipo", "App web instalable + sitio"],
        ["Año", "2026"],
        ["Stack", "Next.js · TypeScript · PostgreSQL"],
      ]
    : [
        ["Role", "Product, design, brand and development"],
        ["Type", "Installable web app + website"],
        ["Year", "2026"],
        ["Stack", "Next.js · TypeScript · PostgreSQL"],
      ];

  const features = es
    ? [
        "Cada cargo cae solo en su fecha de corte; lo que se compra un día después ya entra al siguiente mes.",
        "Compras a 3–24 meses sin intereses: cada mensualidad aparece en el corte que le toca.",
        "Gastos compartidos (igual, por montos o porcentaje), personales o regalos.",
        "Estado de cuenta por persona: cuánto depositar al titular y para cuándo, y cuánto ya pagó.",
        "Saldos del grupo y las transferencias mínimas para quedar a mano.",
        "Grupos con invitación por link y personas sin cuenta que luego reclaman su lugar.",
      ]
    : [
        "Each charge lands on its statement date by itself; anything bought a day after the cut goes to next month.",
        "3–24 month interest-free purchases: each installment shows up on the statement it belongs to.",
        "Shared expenses (equal, by amounts or by percentage), personal ones or gifts.",
        "A statement per person: how much to deposit to the cardholder and by when, and what they've already paid.",
        "Group balances and the fewest transfers to settle up.",
        "Groups with invite links, and people without an account who claim their spot later.",
      ];

  const screens = [
    { src: "/work/corte/resumen.webp", t: es ? "Resumen" : "Summary", d: es ? "Cuánto le debes al titular y para cuándo." : "What you owe the cardholder, and by when." },
    { src: "/work/corte/corte.webp", t: es ? "Corte por persona" : "Statement per person", d: es ? "Lo que le toca a cada quien, con su desglose." : "Each person's share, itemized." },
    { src: "/work/corte/gasto.webp", t: es ? "Agregar gasto" : "Add an expense", d: es ? "Contado o a meses, y entre quiénes se divide." : "Paid in full or in installments, and who splits it." },
    { src: "/work/corte/movimientos.webp", t: es ? "Movimientos" : "Activity", d: es ? "Gastos y pagos del grupo por mes." : "The group's expenses and payments by month." },
    { src: "/work/corte/cuenta.webp", t: es ? "Cuenta" : "Account", d: es ? "Perfil, grupos, sesiones e instalar en el celular." : "Profile, groups, sessions and install on your phone." },
  ];

  const inside = es
    ? [
        ["Reglas de negocio puras y probadas", "Cortes, mensualidades, divisiones y saldos viven en un módulo sin React ni base de datos, con pruebas automáticas para cada regla."],
        ["Dinero en centavos enteros", "Nunca se usan decimales: los centavos que sobran al dividir se reparten siempre igual, así el total siempre cuadra."],
        ["Inicio de sesión propio", "Sesiones con cookies httpOnly, contraseñas con scrypt e inicio con Google (OAuth 2.0 con PKCE) escrito sin librerías."],
        ["Base de datos sin fricción", "PostgreSQL con Drizzle ORM; en desarrollo corre PGlite dentro del proyecto, y en producción una base real con migraciones automáticas."],
        ["Instalable en el celular", "Funciona como app desde la pantalla de inicio, con una página de respaldo cuando no hay conexión."],
        ["Sitio aparte, 100 % estático", "La página que presenta el producto es un sitio separado, rápido y sin servidor, con regla del corte interactiva y centro de ayuda."],
      ]
    : [
        ["Pure, tested business rules", "Statements, installments, splits and balances live in a module with no React and no database, with automated tests for every rule."],
        ["Money in whole cents", "No decimals ever: leftover cents from a split are always assigned the same way, so totals always add up."],
        ["Its own sign-in", "httpOnly cookie sessions, scrypt passwords and Google sign-in (OAuth 2.0 with PKCE) written without libraries."],
        ["A database with no friction", "PostgreSQL with Drizzle ORM; in development it runs PGlite inside the project, in production a real database with automatic migrations."],
        ["Installable on your phone", "It works as an app from the home screen, with a fallback page when you're offline."],
        ["A separate, 100% static site", "The page that presents the product is a separate site, fast and serverless, with an interactive statement-date ruler and a help center."],
      ];

  const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "PostgreSQL", "Drizzle ORM", "PGlite", "Zod", "Vitest", "OAuth 2.0 + PKCE"];

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
              <span className="text-white">{es ? "Caso de estudio 01" : "Case study 01"}</span>
              <span className="h-px w-10" style={{ background: AURORA }} />
              <span className="text-white/45">corte</span>
            </div>
            <h1 className="font-heading font-semibold text-white text-5xl md:text-7xl lg:text-[5.4rem] leading-[0.98] -tracking-[0.05em] max-w-5xl" style={{ textWrap: "balance" } as Record<string, string>}>
              {es ? "La tarjeta es de una." : "The card is one person's."} <span className="text-white/35">{es ? "Las compras son de todos." : "The purchases are everyone's."}</span>
            </h1>
            <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">
              {es
                ? "corte es una app para repartir gastos entre familia, roomies o amigos, con algo que las apps conocidas no hacen: controlar la tarjeta de crédito que todos usan, con su fecha de corte, su fecha límite y sus meses sin intereses."
                : "corte is an app to split expenses with family, roommates or friends, with something the well-known apps don't do: keep track of the credit card everyone uses, with its statement date, due date and interest-free installments."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={CORTE.site} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-brand text-black px-6 py-3.5 text-sm font-semibold hover:bg-brand/90 transition-colors">
                {es ? "Ver el sitio" : "Visit the site"} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={CORTE.app} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 hover:text-white hover:border-white/40 transition-colors">
                {es ? "Probar la app" : "Try the app"} <ArrowUpRight size={15} />
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
            className="theme-dark relative overflow-hidden rounded-[24px] md:rounded-[36px] border border-white/10 px-6 pt-10 md:pt-16"
            style={{ backgroundColor: CORTE.ink }}
          >
            <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(55% 60% at 50% 30%, rgba(198,244,50,0.18), transparent 70%)" }} />
            <div className="relative flex justify-center"><CorteLogo size={40} /></div>
            <div className="relative mt-10 md:mt-14 flex items-end justify-center gap-3 md:gap-6 -mb-[12%]">
              {screens.slice(0, 5).map((s, i) => (
                <Phone key={s.src} src={s.src} alt={s.t} className={`w-[30%] sm:w-[19%] max-w-[230px] ${i === 2 ? "-translate-y-[6%]" : i === 1 || i === 3 ? "-translate-y-[2%]" : "translate-y-[3%] hidden sm:block"}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Chapter n="01" kicker={es ? "El problema" : "The problem"} title={es ? "Todos usan la tarjeta de una persona." : "Everyone uses one person's card."}>
        <P>
          {es
            ? "En muchas casas en México todos usan la tarjeta del mismo titular: para la luz, el súper, compras personales, regalos y cosas a meses. Cuando llega el estado de cuenta, el titular tiene que calcular a mano cuánto le debe cada quien y cobrarlo antes de la fecha límite, porque si no se paga el total, el banco cobra intereses."
            : "In many Mexican households everyone uses the same cardholder's card: for electricity, groceries, personal purchases, gifts and installment buys. When the statement arrives, the cardholder has to work out by hand what each person owes and collect it before the due date, because anything left unpaid accrues interest."}
        </P>
        <P>
          {es
            ? "Y hay detalles que lo complican: lo que se compra un día después del corte ya no entra en ese mes, y las compras a meses se cobran un pedazo en cada corte. Las apps de gastos compartidos no entienden nada de esto."
            : "And details make it harder: anything bought a day after the cut-off goes to next month, and installment purchases get charged a piece on every statement. Shared-expense apps don't understand any of this."}
        </P>
      </Chapter>

      <Chapter n="02" kicker={es ? "La solución" : "The solution"} title={es ? "corte hace esas cuentas solo." : "corte does that math by itself."}>
        <P>
          {es
            ? "Cada cargo cae en su corte, se reparte entre quien corresponde y cada persona ve cuánto depositar y para cuándo. El titular deja de perseguir a todos con una calculadora."
            : "Every charge lands on its statement, gets split between the right people, and each person sees how much to deposit and by when. The cardholder stops chasing everyone with a calculator."}
        </P>
        <ul className="grid sm:grid-cols-2 gap-x-8 border-t border-white/10">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 py-4 border-b border-white/10 text-[15px] text-white/75 leading-relaxed">
              <Check size={16} className="mt-1 shrink-0 text-white" />
              {f}
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ---------------------------------------------------------------- screens */}
      <section className="relative z-20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
            <span className="font-mono text-white tabular-nums">03</span>
            <span className="h-px w-10" style={{ background: AURORA }} />
            <span className="text-white/45">{es ? "Pantallas" : "Screens"}</span>
          </div>
          <h2 className="mt-5 font-heading font-semibold text-white text-3xl md:text-[2.6rem] leading-[1.05] -tracking-[0.04em] max-w-2xl" style={{ textWrap: "balance" } as Record<string, string>}>
            {es ? "Pensada para el celular," : "Designed for the phone,"} <span className="text-white/35">{es ? "donde se usa." : "where it's used."}</span>
          </h2>
          <div className="mt-10 -mx-6 md:mx-0 px-6 md:px-0 flex md:grid md:grid-cols-5 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4">
            {screens.map((s, i) => (
              <motion.figure
                key={s.src}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.06 }}
                className="snap-start shrink-0 w-[62%] sm:w-[40%] md:w-auto flex flex-col gap-4"
              >
                <Phone src={s.src} alt={s.t} />
                <figcaption>
                  <p className="font-heading font-semibold text-white text-base -tracking-[0.01em]">{s.t}</p>
                  <p className="mt-1 text-white/55 text-sm leading-snug">{s.d}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <Chapter n="04" kicker={es ? "Recorrido" : "Walkthrough"} title={es ? "Cómo funciona, en video." : "How it works, on video."}>
        <div className="theme-dark relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/10" style={{ backgroundColor: CORTE.ink }}>
          <video className="block w-full aspect-video" src="/work/corte/recorrido.mp4" poster="/work/corte/recorrido.jpg" controls playsInline preload="none" />
        </div>
        <p className="text-white/45 text-sm">{es ? "Recorrido completo por la app · 3 min, con audio." : "Full tour of the app · 3 min, with audio."}</p>
      </Chapter>

      <Chapter n="05" kicker={es ? "Por dentro" : "Under the hood"} title={es ? "Que las cuentas siempre cuadren." : "So the numbers always add up."}>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {inside.map(([h, d]) => (
            <div key={h} className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5 md:p-6">
              <p className="font-heading font-semibold text-white text-lg -tracking-[0.02em]">{h}</p>
              <p className="mt-2 text-white/60 text-[15px] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <ul className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <li key={s} className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/75">{s}</li>
          ))}
        </ul>
      </Chapter>

      <Chapter n="06" kicker={es ? "Marca" : "Brand"} title={es ? "Una identidad que se explica sola." : "An identity that explains itself."}>
        <P>
          {es
            ? "El logo es una tarjeta cortada en diagonal: la fecha de corte que parte el mes en dos. Verde lima sobre gris casi negro, tipografía Space Grotesk para títulos e Inter para la interfaz."
            : "The logo is a card cut diagonally: the statement date that splits the month in two. Lime green on near-black grey, Space Grotesk for headlines and Inter for the interface."}
        </P>
        <div className="theme-dark overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/10">
          <img src="/work/corte/opengraph-image.png" alt={es ? "Imagen de marca de corte" : "corte brand image"} loading="lazy" className="block w-full" />
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            ["#C6F432", es ? "Lima" : "Lime"],
            ["#121417", es ? "Tinta" : "Ink"],
            ["#F2F2EE", es ? "Papel" : "Paper"],
          ].map(([c, n]) => (
            <span key={c} className="inline-flex items-center gap-2 rounded-full border border-white/12 pl-1.5 pr-3.5 py-1.5 text-[13px] text-white/75">
              <span className="w-6 h-6 rounded-full border border-white/15" style={{ backgroundColor: c }} />
              {n} <span className="font-mono text-white/40 text-xs">{c}</span>
            </span>
          ))}
        </div>
      </Chapter>

      <section className="relative z-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Link to="/portafolio" className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/25 hover:border-white pb-1 transition-colors">
            <ArrowLeft size={15} /> {es ? "Volver a Mi trabajo" : "Back to My work"}
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

export default CaseCorte;
