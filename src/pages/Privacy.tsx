import { Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useLang } from "@/i18n/LanguageContext";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Footer = lazy(() => import("@/components/Footer"));

const EMAIL = "mariobencomo057@gmail.com";
const UPDATED = { es: "4 de noviembre de 2026", en: "November 4, 2026" };
const AURORA = "linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)";

type Block = { h: string; p: (string | JSX.Element)[] };

const mail = <a href={`mailto:${EMAIL}`} className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{EMAIL}</a>;

const ES: Block[] = [
  { h: "Formulario de contacto", p: [<>Cuando me escribes desde el formulario recibo tu nombre, tu correo, el tipo de proyecto que elijas (opcional) y tu mensaje. Se envían con Web3Forms, un servicio que solo transmite el mensaje a mi correo de Gmail; este sitio no los guarda en ningún servidor propio. Los uso únicamente para responderte y, si lo pides, enviarte una propuesta o cotización. No los vendo ni los comparto con nadie más.</>] },
  { h: "Contacto y enlaces externos", p: ["Si me contactas por WhatsApp, correo, LinkedIn, Instagram o GitHub, uso lo que compartas solo para atender tu consulta. Esas plataformas tienen sus propias políticas de privacidad."] },
  { h: "Preferencias en tu navegador", p: ["Este sitio no usa cookies de rastreo ni herramientas de analítica. Solo guarda en tu navegador el idioma y el tema (claro u oscuro) que elijas; puedes borrarlos cuando quieras. Las animaciones y modelos 3D corren en tu propio dispositivo y no envían información. Algunos íconos se cargan desde jsDelivr, un servicio público de archivos."] },
  { h: "Consultas sobre tu información", p: [<>Puedes pedirme acceder, corregir o borrar la información que me enviaste, oponerte a su uso o retirar tu consentimiento (derechos ARCO). Escríbeme a {mail} con tu nombre y el correo con el que me contactaste. Te respondo en máximo 20 días hábiles y, si procede, lo aplico en los 15 días hábiles siguientes. Si no llegamos a trabajar juntos y me lo pides, borro tu mensaje.</>] },
  { h: "Responsable y cambios", p: [<>El responsable de tus datos es Mario Bencomo, desarrollador independiente en Culiacán, Sinaloa, México ({mail}). Si este aviso cambia, publicaré aquí la nueva versión con su fecha. Al enviar el formulario aceptas este aviso.</>] },
];

const EN: Block[] = [
  { h: "Contact form", p: [<>When you write to me through the form I receive your name, your email, the type of project you pick (optional) and your message. They're sent with Web3Forms, a service that only relays the message to my Gmail inbox; this site doesn't store them on any server of its own. I use them only to reply and, if you ask, to send you a proposal or quote. I don't sell or share them with anyone else.</>] },
  { h: "Contact and external links", p: ["If you reach me on WhatsApp, email, LinkedIn, Instagram or GitHub, I use what you share only to handle your inquiry. Those platforms have their own privacy policies."] },
  { h: "Preferences in your browser", p: ["This site uses no tracking cookies and no analytics tools. It only keeps the language and theme (light or dark) you choose in your browser; you can clear them anytime. The animations and 3D models run on your own device and send nothing. Some icons load from jsDelivr, a public file service."] },
  { h: "Questions about your information", p: [<>You can ask me to access, correct or delete what you sent me, to object to its use, or to withdraw your consent (ARCO rights). Write to {mail} with your name and the email you contacted me from. I'll answer within 20 business days and, if applicable, act on it within the following 15 business days. If we don't end up working together and you ask, I delete your message.</>] },
  { h: "Who is responsible, and changes", p: [<>The person responsible for your data is Mario Bencomo, an independent developer in Culiacán, Sinaloa, Mexico ({mail}). If this notice changes, I'll publish the new version here with its date. By sending the form you accept this notice.</>] },
];

const Privacy = () => {
  useSmoothScroll();
  const { lang } = useLang();
  const es = lang === "es";
  const blocks = es ? ES : EN;
  useEffect(() => {
    window.scrollTo(0, 0); // braces: newer Chrome returns a promise from scrollTo
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative z-20 pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
            <span className="text-white">{es ? "Aviso de privacidad" : "Privacy notice"}</span>
            <span className="h-px w-10" style={{ background: AURORA }} />
            <span className="text-white/45">{es ? `Actualizado el ${UPDATED.es}` : `Updated ${UPDATED.en}`}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-8 font-heading font-semibold text-white text-4xl md:text-6xl leading-[1.02] -tracking-[0.04em]"
            style={{ textWrap: "balance" } as Record<string, string>}
          >
            {es ? "Tus datos," : "Your data,"} <span className="text-white/35">{es ? "en claro." : "made clear."}</span>
          </motion.h1>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            {es
              ? "Lo corto: solo recibo lo que tú me escribes, lo uso para responderte y no hay rastreo. Aquí el detalle, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
              : "The short version: I only receive what you write to me, I use it to reply, and there's no tracking. Here are the details, under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties."}
          </p>

          <div className="mt-14 border-t border-white/10">
            {blocks.map((b, i) => (
              <section key={b.h} className="grid md:grid-cols-[3rem_1fr] gap-x-6 gap-y-3 py-8 border-b border-white/10">
                <span className="font-mono text-xs text-white/40 pt-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-3">
                  <h2 className="font-heading font-semibold text-white text-xl md:text-2xl -tracking-[0.02em]">{b.h}</h2>
                  {b.p.map((p, j) => (
                    <p key={j} className="text-white/60 text-[15px] md:text-base leading-relaxed">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Privacy;
