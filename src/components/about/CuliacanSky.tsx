import { useEffect, useState } from "react";
import { PHASE_LABEL, skyAt, sunTimes } from "@/lib/sun";

/**
 * "From Culiacán", live: the time there, and the sun (or the moon) on its arc across the sky,
 * from today's real sunrise to sunset (or from sunset to the next sunrise at night).
 * Same NOAA numbers that switch the site between day and night.
 */

const H = 3600_000;
const R = 84;
const CX = 100;
const CY = 92;

export default function CuliacanSky({ es }: { es: boolean }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    let iv = 0;
    const t = window.setTimeout(() => {
      setNow(Date.now());
      iv = window.setInterval(() => setNow(Date.now()), 60_000);
    }, 60_000 - (Date.now() % 60_000) + 50);
    const onVis = () => !document.hidden && setNow(Date.now());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const sky = skyAt(now);
  const today = sunTimes(now);
  // the stretch of sky we're in: today's daylight, or tonight (last sunset → next sunrise)
  const from = sky.night ? (now < today.rise ? sunTimes(now - 24 * H).set : today.set) : today.rise;
  const to = sky.night ? (now < today.rise ? today.rise : sunTimes(now + 24 * H).rise) : today.set;
  const t = Math.max(0, Math.min(1, (now - from) / (to - from)));
  const a = Math.PI * (1 - t);
  const bx = CX + R * Math.cos(a);
  const by = CY - R * Math.sin(a);

  const fmt = (ms: number) =>
    new Intl.DateTimeFormat(es ? "es-MX" : "en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Mazatlan" }).format(new Date(ms));
  const phase = PHASE_LABEL[sky.phase][es ? 0 : 1];
  const line = sky.night
    ? es
      ? `Amanece a las ${fmt(to)}`
      : `Sunrise at ${fmt(to)}`
    : es
      ? `El sol se mete a las ${fmt(to)}`
      : `Sunset at ${fmt(to)}`;
  const arc = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;
  const body = sky.night ? "#F2F0EA" : "#FFC48A";
  const glow = sky.night ? "rgba(183,168,255,0.55)" : "rgba(255,196,138,0.6)";

  return (
    <div data-seo-skip className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
      {/* the light of the hour, coming from where the sun or moon is */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-[2s]"
        style={{
          background: `radial-gradient(70% 60% at ${(bx / 200) * 100}% ${(by / 110) * 55 + 5}%, ${sky.night ? "rgba(183,168,255,0.16)" : "rgba(255,196,138,0.2)"}, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center justify-between gap-2 text-[10px] md:text-[11px] font-semibold tracking-[0.16em] uppercase">
        <span className="text-white/70">{es ? "Desde Culiacán" : "From Culiacán"}</span>
        <span className="hidden sm:inline text-white/45 normal-case tracking-normal font-medium">{phase}</span>
      </div>

      <svg viewBox="0 0 200 104" className="relative w-full max-h-[46%] overflow-visible" role="img" aria-label={`${es ? "Hora en Culiacán" : "Time in Culiacán"}: ${fmt(now)}, ${phase}. ${line}.`}>
        <defs>
          <linearGradient id="sky-trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8FB0FF" />
            <stop offset="0.5" stopColor={sky.night ? "#B7A8FF" : "#FF9AB0"} />
            <stop offset="1" stopColor={sky.night ? "#B7A8FF" : "#FFC48A"} />
          </linearGradient>
        </defs>
        <line x1="4" x2="196" y1={CY} y2={CY} stroke="currentColor" className="text-white/20" strokeWidth="1" strokeDasharray="2 4" />
        <path d={arc} fill="none" stroke="currentColor" className="text-white/15" strokeWidth="1.2" />
        <path d={arc} fill="none" stroke="url(#sky-trail)" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray={`${t} 1`} />
        <circle cx={bx} cy={by} r="13" fill={glow} opacity="0.35" />
        <circle cx={bx} cy={by} r="6" fill={body} style={{ filter: `drop-shadow(0 0 6px ${glow})` }} />
        {sky.night && <circle cx={bx + 2.6} cy={by - 1.8} r="4.6" fill="#0B0B0D" />}
        <text x={CX - R} y={CY + 11} textAnchor="middle" className="fill-white/45" fontSize="8.5">{fmt(from)}</text>
        <text x={CX + R} y={CY + 11} textAnchor="middle" className="fill-white/45" fontSize="8.5">{fmt(to)}</text>
      </svg>

      <div className="relative">
        <p className="font-heading font-semibold text-white text-2xl md:text-[2rem] leading-none -tracking-[0.04em] tabular-nums">{fmt(now)}</p>
        <p className="mt-1.5 text-white/60 text-xs md:text-sm">{line}</p>
      </div>
    </div>
  );
}
