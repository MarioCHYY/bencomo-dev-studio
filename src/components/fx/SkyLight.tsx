import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import { skyAt, type Sky } from "@/lib/sun";

/**
 * The background behind the whole site: the page colour, three soft cold lights (dark theme only)
 * and the light of the sky over Culiacán in real time.
 * - the last hour of daylight: a warm durazno/rosa glow that sinks towards the bottom, like the sun going down
 * - right after sunset: its afterglow fades out low on the screen
 * - at night: a cool azul/violeta moonlight rises and drifts across the top as the night goes on
 * - before and after sunrise: the warm light comes back from the other side
 *
 * Everything is painted as gradients on one fixed layer that only changes once a minute.
 * It used to be two fixed layers with six oversized children, the sky ones gliding with a
 * 60-second transition that never ended; on a computer drawing without its graphics card
 * (Chrome with the generic Windows driver) recompositing that every frame held the whole page
 * at about 30 frames a second. One still layer costs almost nothing, and the sky moves so
 * slowly that a step each minute looks the same.
 */
export default function SkyLight() {
  const { theme } = useTheme();
  const [sky, setSky] = useState<Sky>(() => skyAt());
  useEffect(() => {
    const tick = () => setSky(skyAt());
    const iv = window.setInterval(tick, 60_000);
    const onVis = () => !document.hidden && tick();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // sun: golden hour going down on the right, afterglow staying low; dawn coming up on the left
  const warm = Math.max(sky.golden, sky.afterglow * 0.85, sky.dawn);
  const dawn = sky.dawn > sky.golden && sky.dawn > sky.afterglow;
  const sunX = dawn ? 22 : 78; // % of the width
  const sunY = dawn ? 108 - sky.dawn * 30 : 74 + sky.golden * 22 + (sky.afterglow > 0 ? 26 : 0); // % of the height; sinks as it sets
  const sunO = warm * (sky.night ? 0.55 : 1);
  // moon: rises on the left after dusk and crosses to the right by dawn
  const moonX = 12 + sky.nightProgress * 76;
  const moonY = 4 - Math.sin(sky.nightProgress * Math.PI) * 10;
  const moonO = sky.moon * 0.75;

  const a = (v: number) => +v.toFixed(4);
  const layers: string[] = [];
  // the sky, on top (the same ellipses as before: closest-side of a 140x110 and a 110x90 vmax box)
  if (sunO > 0.002)
    layers.push(
      `radial-gradient(70vmax 55vmax at ${sunX}vw ${sunY}vh, rgba(255,196,138,${a(0.85 * sunO)}), rgba(255,154,176,${a(0.55 * sunO)}) 40%, rgba(183,168,255,${a(0.18 * sunO)}) 70%, transparent)`,
    );
  if (moonO > 0.002)
    layers.push(
      `radial-gradient(55vmax 45vmax at ${moonX}vw ${moonY}vh, rgba(143,176,255,${a(0.5 * moonO)}), rgba(183,168,255,${a(0.25 * moonO)}) 45%, transparent)`,
    );
  // the three cold lights of the dark theme: key light top right, fill bottom left, a faint centre
  if (theme === "dark")
    layers.push(
      `radial-gradient(circle 707px at calc(110vw - 500px) calc(500px - 20vh), rgba(180,210,255,${a(0.08 * 0.6)}) 0%, transparent 60%)`,
      `radial-gradient(circle 566px at calc(400px - 20vw) calc(110vh - 400px), rgba(200,220,255,${a(0.04 * 0.4)}) 0%, transparent 60%)`,
      `radial-gradient(circle 849px at 40vw 30vh, rgba(255,255,255,${a(0.03 * 0.3)}) 0%, transparent 70%)`,
    );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] bg-paper dark:bg-[#050505] transition-colors duration-500"
      style={{ backgroundImage: layers.length ? layers.join(", ") : undefined }}
    />
  );
}
