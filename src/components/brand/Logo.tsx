import { useId, type CSSProperties } from "react";

/**
 * Bencomo brand mark ("Corte"): a circle cut at 34°, its halves slipped apart
 * to let the aurora through. Geometry lives in a unit circle (r = 1).
 * Generated from the brand source files; keep numbers in sync with /brand.
 */

const TOP = "M0.8290 -0.5592A1 1 0 0 0 -0.8290 0.5592Z";
const BOTTOM = "M-0.8290 0.5592A1 1 0 0 0 0.8290 -0.5592Z";
const WORD = "M358 12Q299 12 249 -11Q210 -29 184 -61V0H61V-757H192V-489Q215 -515 248 -531Q296 -556 359 -556Q436 -556 498.0 -518.0Q560 -480 596.5 -416.0Q633 -352 633 -272Q633 -193 597.0 -128.0Q561 -63 499.0 -25.5Q437 12 358 12ZM343 -108Q388 -108 423.0 -129.0Q458 -150 477.5 -187.0Q497 -224 497 -272Q497 -320 477.5 -356.5Q458 -393 423.0 -414.5Q388 -436 343 -436Q300 -436 265.5 -415.0Q231 -394 211.5 -356.5Q192 -319 192.0 -271.5Q192 -224 211.5 -187.0Q231 -150 265.5 -129.0Q300 -108 343 -108ZM946 12Q862 12 799.0 -26.0Q736 -64 701.0 -129.0Q666 -194 666 -273Q666 -355 701.5 -418.5Q737 -482 798.5 -519.0Q860 -556 936 -556Q1000 -556 1048.5 -535.0Q1097 -514 1131.0 -477.0Q1165 -440 1183.0 -392.5Q1201 -345 1201 -290Q1201 -276 1199.5 -261.0Q1198 -246 1194 -235H802Q804 -207 815 -183Q833 -145 867.5 -124.0Q902 -103 947 -103Q992 -103 1023.5 -122.0Q1055 -141 1073 -173L1179 -121Q1163 -82 1129.0 -52.0Q1095 -22 1048.5 -5.0Q1002 12 946 12ZM805 -335H1061Q1060 -353 1054 -370Q1040 -406 1009.5 -427.0Q979 -448 936 -448Q895 -448 863.0 -427.5Q831 -407 815 -367Q808 -352 805 -335ZM1255 0V-544H1378V-477Q1397 -511 1431 -530Q1474 -556 1532 -556Q1592 -556 1638.5 -530.0Q1685 -504 1711.0 -457.5Q1737 -411 1737 -350V0H1606V-319Q1606 -355 1592.0 -381.0Q1578 -407 1553.5 -421.5Q1529 -436 1496.5 -436.0Q1464 -436 1439.0 -421.5Q1414 -407 1400.0 -381.0Q1386 -355 1386 -319V0ZM2064.75 12.0Q1983.5 12.0 1919.37 -25.37Q1855.25 -62.75 1817.87 -127.37Q1780.5 -192.0 1780.5 -272.75Q1780.5 -353.5 1817.5 -417.62Q1854.5 -481.75 1919.0 -518.62Q1983.5 -555.5 2064.75 -555.5Q2123.0 -555.5 2173.0 -535.25Q2223 -515 2259.25 -479.25Q2295.5 -443.5 2311.75 -395.25L2197.25 -344.5Q2181.75 -386.0 2146.37 -410.75Q2111.0 -435.5 2064.75 -435.5Q2022.25 -435.5 1988.75 -414.62Q1955.25 -393.75 1936.0 -356.62Q1916.75 -319.5 1916.75 -271.75Q1916.75 -224.25 1936.0 -187.12Q1955.25 -150.0 1988.75 -129.0Q2022.25 -108.0 2064.75 -108.0Q2111.75 -108.0 2146.62 -132.75Q2181.5 -157.5 2197.25 -199.5L2311.75 -147.5Q2296.25 -101.75 2260.0 -65.5Q2223.75 -29.25 2173.75 -8.62Q2123.75 12.0 2064.75 12.0ZM2631.5 12.0Q2551.75 12.0 2486.37 -24.87Q2421.0 -61.75 2382.25 -126.0Q2343.5 -190.25 2343.5 -272.0Q2343.5 -354.25 2382.12 -418.0Q2420.75 -481.75 2486.0 -518.62Q2551.25 -555.5 2631.5 -555.5Q2711.75 -555.5 2776.62 -518.75Q2841.5 -482.0 2880.0 -418.25Q2918.5 -354.5 2918.5 -272.0Q2918.5 -190.0 2879.62 -125.75Q2840.75 -61.5 2775.87 -24.75Q2711 12 2631.5 12.0ZM2631.5 -108.0Q2675.75 -108.0 2709.5 -129.0Q2743.25 -150.0 2762.75 -187.25Q2782.25 -224.5 2782.25 -272.0Q2782.25 -319.5 2762.75 -356.12Q2743.25 -392.75 2709.5 -414.12Q2675.75 -435.5 2631.5 -435.5Q2587.25 -435.5 2553.12 -414.12Q2519.0 -392.75 2499.37 -356.12Q2479.75 -319.5 2479.75 -272.0Q2479.75 -224.5 2499.37 -187.25Q2519 -150 2553.12 -129.0Q2587.25 -108.0 2631.5 -108.0ZM2973 0V-544H3096V-477Q3113 -508 3142 -527Q3187 -556 3248 -556Q3315 -556 3366 -521Q3398 -499 3416 -468Q3438 -503 3470 -523Q3520 -556 3585 -556Q3643 -556 3688.5 -530.0Q3734 -504 3760.0 -457.5Q3786 -411 3786 -350V0H3655V-319Q3655 -355 3642.0 -381.0Q3629 -407 3606.0 -421.5Q3583 -436 3550 -436Q3519 -436 3495.0 -421.5Q3471 -407 3458.0 -381.0Q3445 -355 3445 -319V0H3314V-319Q3314 -355 3301.0 -381.0Q3288 -407 3264.5 -421.5Q3241 -436 3209 -436Q3178 -436 3154.0 -421.5Q3130 -407 3117.0 -381.0Q3104 -355 3104 -319V0ZM4117.5 12.0Q4037.75 12.0 3972.37 -24.87Q3907.0 -61.75 3868.25 -126.0Q3829.5 -190.25 3829.5 -272.0Q3829.5 -354.25 3868.12 -418.0Q3906.75 -481.75 3972.0 -518.62Q4037.25 -555.5 4117.5 -555.5Q4197.75 -555.5 4262.62 -518.75Q4327.5 -482.0 4366.0 -418.25Q4404.5 -354.5 4404.5 -272.0Q4404.5 -190.0 4365.62 -125.75Q4326.75 -61.5 4261.87 -24.75Q4197 12 4117.5 12.0ZM4117.5 -108.0Q4161.75 -108.0 4195.5 -129.0Q4229.25 -150.0 4248.75 -187.25Q4268.25 -224.5 4268.25 -272.0Q4268.25 -319.5 4248.75 -356.12Q4229.25 -392.75 4195.5 -414.12Q4161.75 -435.5 4117.5 -435.5Q4073.25 -435.5 4039.12 -414.12Q4005.0 -392.75 3985.37 -356.12Q3965.75 -319.5 3965.75 -272.0Q3965.75 -224.5 3985.37 -187.25Q4005 -150 4039.12 -129.0Q4073.25 -108.0 4117.5 -108.0Z";
// rest / hover offsets of the top half (the bottom half mirrors it)
const REST = [0.1102, -0.1407] as const;
const OPEN = [0.2094, -0.2618] as const;
const STOPS: [number, string][] = [[0, "#8FB0FF"], [0.4, "#B7A8FF"], [0.72, "#FF9AB0"], [1, "#FFC48A"]];

type Tone = "auto" | "light" | "dark";
// "auto" follows the page theme through --c-logo (bone on dark, ink on light)
const ink = (tone: Tone) => (tone === "auto" ? "rgb(var(--c-logo))" : tone === "light" ? "#F2F0EA" : "#0B0B0D");

function Aurora({ id }: { id: string }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="-0.9" y1="-0.9" x2="0.9" y2="0.9">
      {STOPS.map(([o, c]) => (
        <stop key={o} offset={o} stopColor={c} />
      ))}
    </linearGradient>
  );
}

const half = (x: number, y: number, driven = false): CSSProperties => ({
  transform: `translate(${x}px, ${y}px)`,
  transition: driven ? "none" : "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
});

/** The halves + aurora core, drawn in unit space. `open` slips them further. */
function MarkShapes({ id, fill, open, core = true }: { id: string; fill: string; open?: boolean | number; core?: boolean }) {
  // boolean: eased CSS transition; number (0..1): driven directly, e.g. by scroll
  const v = typeof open === "number" ? Math.max(0, Math.min(1, open)) : open ? 1 : 0;
  const x = REST[0] + (OPEN[0] - REST[0]) * v;
  const y = REST[1] + (OPEN[1] - REST[1]) * v;
  const driven = typeof open === "number";
  return (
    <>
      {core && <circle r="0.9" fill={`url(#${id})`} />}
      <path d={TOP} style={{ ...half(x, y, driven), fill }} />
      <path d={BOTTOM} style={{ ...half(-x, -y, driven), fill }} />
    </>
  );
}

export function BrandMark({ size = 32, tone = "auto", open, className = "", title }: { size?: number; tone?: Tone; open?: boolean | number; className?: string; title?: string }) {
  const id = `bc-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="-1.15 -1.15 2.3 2.3" width={size} height={size} className={className} overflow="visible" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <defs><Aurora id={id} /></defs>
      <MarkShapes id={id} fill={ink(tone)} open={open} />
    </svg>
  );
}

/** Mark + wordmark lockup. Height drives the size; hover slips the cut open. */
export function BrandLogo({ height = 28, tone = "auto", open, className = "", title = "Bencomo" }: { height?: number; tone?: Tone; open?: boolean | number; className?: string; title?: string }) {
  const id = `bc-${useId().replace(/:/g, "")}`;
  const vb = [0, -848.6, 5420.7, 940.2];
  return (
    <svg viewBox={vb.join(" ")} height={height} width={(height * vb[2]) / vb[3]} className={className} overflow="visible" role="img">
      <title>{title}</title>
      <defs><Aurora id={id} /></defs>
      <g transform="translate(388.34 -378.50) scale(408.780)">
        <MarkShapes id={id} fill={ink(tone)} open={open} />
      </g>
      <path transform="translate(1016.18 0)" d={WORD} style={{ fill: ink(tone) }} />
    </svg>
  );
}

/** Just the outlined wordmark, for huge typographic moments. */
export function BrandWordmark({ className = "", fill = "currentColor", stroke, strokeWidth }: { className?: string; fill?: string; stroke?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="60.5 -757.0 4344.0 769.0" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path d={WORD} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export default BrandLogo;
