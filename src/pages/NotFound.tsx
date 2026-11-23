import Navbar from "@/components/Navbar";
import { MoreLink } from "@/components/ui/more-link";
import { useLang } from "@/i18n/LanguageContext";

/** A page that doesn't exist: said plainly, with the way back. The server answers it with a 404 (dist/404.html). */
const NotFound = () => {
  const { lang } = useLang();
  const es = lang === "es";

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative z-20 min-h-[100svh] flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 md:px-8 flex flex-col gap-7">
          <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
            <span className="font-mono text-white tabular-nums">404</span>
            <span className="h-px w-10 bg-[linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)]" />
            <span className="text-white/45">{es ? "Página no encontrada" : "Page not found"}</span>
          </div>
          <h1 className="font-heading font-semibold text-white text-5xl md:text-7xl leading-[0.98] -tracking-[0.05em] max-w-3xl" style={{ textWrap: "balance" } as Record<string, string>}>
            {es ? "Esta página " : "This page "}
            <span className="text-white/35">{es ? "no existe, o ya se movió." : "doesn't exist, or it moved."}</span>
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <MoreLink to="/">{es ? "Volver al inicio" : "Back to home"}</MoreLink>
            <MoreLink to="/portafolio">{es ? "Ver mi trabajo" : "See my work"}</MoreLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
