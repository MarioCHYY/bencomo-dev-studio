import { useEffect, useState } from "react";
import { skyAt, type Sky } from "@/lib/sun";

/**
 * The light of the sky over Culiacán, laid behind the whole site in real time.
 * - the last hour of daylight: a warm durazno/rosa glow that sinks towards the bottom, like the sun going down
 * - right after sunset: its afterglow fades out low on the screen
 * - at night: a cool azul/violeta moonlight rises and drifts across the top as the night goes on
 * - before and after sunrise: the warm light comes back from the other side
 * It updates every minute and eases between states over that minute, so the change is continuous.
 * Pure gradients on two fixed layers: only their opacity and position move.
 */
export default function SkyLight() {
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
  const sunX = sky.dawn > sky.golden && sky.dawn > sky.afterglow ? 22 : 78; // % from the left
  const sunY = sky.dawn > sky.golden && sky.dawn > sky.afterglow ? 108 - sky.dawn * 30 : 74 + sky.golden * 22 + (sky.afterglow > 0 ? 26 : 0); // % from the top; sinks as it sets
  // moon: rises on the left after dusk and crosses to the right by dawn
  const moonX = 12 + sky.nightProgress * 76;
  const moonY = 4 - Math.sin(sky.nightProgress * Math.PI) * 10;

  const ease = "opacity 60s linear, transform 60s linear";
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <div
        className="absolute left-0 top-0 w-[140vmax] h-[110vmax] rounded-full"
        style={{
          transform: `translate3d(calc(${sunX}vw - 70vmax), calc(${sunY}vh - 55vmax), 0)`,
          opacity: warm * (sky.night ? 0.55 : 1),
          background:
            "radial-gradient(closest-side, rgba(255,196,138,0.85), rgba(255,154,176,0.55) 40%, rgba(183,168,255,0.18) 70%, transparent)",
          transition: ease,
        }}
      />
      <div
        className="absolute left-0 top-0 w-[110vmax] h-[90vmax] rounded-full"
        style={{
          transform: `translate3d(calc(${moonX}vw - 55vmax), calc(${moonY}vh - 45vmax), 0)`,
          opacity: sky.moon * 0.75,
          background: "radial-gradient(closest-side, rgba(143,176,255,0.5), rgba(183,168,255,0.25) 45%, transparent)",
          transition: ease,
        }}
      />
    </div>
  );
}
