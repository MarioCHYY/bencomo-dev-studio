/**
 * The sun over Culiacán, Sinaloa (24.81° N, 107.39° W, America/Mazatlan, UTC−7 all year).
 * Sunrise and sunset come from the NOAA solar equations, good to about a minute,
 * so the site goes dark when the sun really sets there and lights up when it really rises.
 */

const LAT = 24.8091;
const LNG = -107.394;
const rad = Math.PI / 180;

/** sunrise and sunset (ms since epoch) for the Culiacán calendar day that contains `at` */
export function sunTimes(at: number): { rise: number; set: number } {
  // the calendar day in Culiacán
  const local = new Date(at - 7 * 3600_000);
  const y = local.getUTCFullYear(), m = local.getUTCMonth(), d = local.getUTCDate();
  const doy = Math.floor((Date.UTC(y, m, d) - Date.UTC(y, 0, 1)) / 86400_000) + 1;
  const g = ((2 * Math.PI) / 365) * (doy - 1 + 0.5); // fractional year at local noon
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const cosH = Math.cos(90.833 * rad) / (Math.cos(LAT * rad) * Math.cos(decl)) - Math.tan(LAT * rad) * Math.tan(decl);
  const ha = Math.acos(Math.max(-1, Math.min(1, cosH))) / rad;
  const noonUtcMin = 720 - 4 * LNG - eqt;
  const day0 = Date.UTC(y, m, d); // 00:00 UTC of that calendar date
  return { rise: day0 + (noonUtcMin - 4 * ha) * 60_000, set: day0 + (noonUtcMin + 4 * ha) * 60_000 };
}

export type SkyPhase = "dawn" | "day" | "sunset" | "dusk" | "night";

export interface Sky {
  /** the sun is down: the site wears its night (dark) theme */
  night: boolean;
  phase: SkyPhase;
  /** 0..1 — warm light of the hour before sunset (golden hour), the sun sinking */
  golden: number;
  /** 0..1 — the glow left right after sunset */
  afterglow: number;
  /** 0..1 — moonlight, rising after dusk and fading before dawn */
  moon: number;
  /** 0..1 — how far the night has gone (moves the moonlight across the sky) */
  nightProgress: number;
  /** 0..1 — warm light before and just after sunrise */
  dawn: number;
  /** next moment the theme changes (sunrise or sunset), ms */
  nextChange: number;
}

const H = 3600_000;
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};

export function skyAt(now = Date.now()): Sky {
  const today = sunTimes(now);
  const yesterday = sunTimes(now - 24 * H);
  const tomorrow = sunTimes(now + 24 * H);
  const night = now < today.rise || now >= today.set;
  // the night we're in: from the last sunset to the next sunrise
  const lastSet = now < today.rise ? yesterday.set : today.set;
  const nextRise = now < today.rise ? today.rise : tomorrow.rise;

  const golden = !night ? smooth(1 - (today.set - now) / H) : 0; // last hour of daylight
  const afterglow = night && now >= lastSet ? smooth(1 - (now - lastSet) / (0.75 * H)) : 0;
  const moonIn = smooth((now - lastSet - 0.25 * H) / H);
  const moonOut = smooth((nextRise - now - 0.25 * H) / (0.75 * H));
  const moon = night ? Math.min(moonIn, moonOut) : 0;
  const nightProgress = night ? clamp((now - lastSet) / (nextRise - lastSet)) : 0;
  const dawn = night ? smooth(1 - (nextRise - now) / (0.75 * H)) : smooth(1 - (now - today.rise) / H);

  let phase: SkyPhase = "day";
  if (night) phase = afterglow > 0.05 ? "dusk" : dawn > 0.05 ? "dawn" : "night";
  else if (golden > 0.02) phase = "sunset";
  else if (dawn > 0.05) phase = "dawn";

  return { night, phase, golden, afterglow, moon, nightProgress, dawn, nextChange: night ? nextRise : today.set };
}

export const PHASE_LABEL: Record<SkyPhase, [string, string]> = {
  dawn: ["amaneciendo", "sunrise"],
  day: ["de día", "daytime"],
  sunset: ["atardeciendo", "sunset"],
  dusk: ["anocheciendo", "dusk"],
  night: ["de noche", "night"],
};
