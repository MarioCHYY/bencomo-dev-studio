import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { PHASE_LABEL, skyAt } from "@/lib/sun";

/** The time right now in Culiacán (Sinaloa runs on America/Mazatlan), ticking live. */
/** `bare`: just the time, for places that already say where */
export default function LocalTime({ className = "", bare = false }: { className?: string; bare?: boolean }) {
  const { lang } = useLang();
  const es = lang === "es";
  const fmt = () =>
    new Intl.DateTimeFormat(es ? "es-MX" : "en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Mazatlan" }).format(new Date());
  const [now, setNow] = useState(fmt);
  useEffect(() => {
    setNow(fmt());
    // tick right on the minute
    let iv = 0;
    const t = window.setTimeout(() => {
      setNow(fmt());
      iv = window.setInterval(() => setNow(fmt()), 60_000);
    }, 60_000 - (Date.now() % 60_000) + 50);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [es]);

  if (bare) return <span className={`tabular-nums ${className}`}>{now}</span>;
  return (
    <span className={`inline-flex items-center gap-2 tabular-nums ${className}`}>
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full bg-[#FFC48A] animate-ping opacity-50" />
        <span className="relative w-1.5 h-1.5 rounded-full bg-[#FFC48A]" />
      </span>
      {es ? `${now} en Culiacán · ${PHASE_LABEL[skyAt().phase][0]}` : `${now} in Culiacán · ${PHASE_LABEL[skyAt().phase][1]}`}
    </span>
  );
}
