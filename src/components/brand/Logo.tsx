import { useId, type CSSProperties } from "react";

/**
 * Bencomo brand mark ("Corte"): a circle cut at 34°, its halves slipped apart
 * to let the aurora through. Geometry lives in a unit circle (r = 1).
 * Generated from the brand source files; keep numbers in sync with /brand.
 */

const TOP = "M0.8290 -0.5592A1 1 0 0 0 -0.8290 0.5592Z";
const BOTTOM = "M-0.8290 0.5592A1 1 0 0 0 0.8290 -0.5592Z";
const WORD = "M357.75 12.0Q298.5 12.0 249.0 -11.25Q199.5 -34.5 170.75 -79.0L184.25 -105.0V0.0H60.5V-757.0H191.75V-435.5L171.5 -463.25Q199.75 -506.75 248.0 -531.12Q296.25 -555.5 358.5 -555.5Q436.0 -555.5 498.12 -517.87Q560.25 -480.25 596.62 -416.12Q633 -352 633.0 -271.75Q633.0 -192.5 597.0 -127.87Q561.0 -63.25 498.87 -25.62Q436.75 12.0 357.75 12.0ZM343.25 -108.0Q388.25 -108.0 422.87 -129.0Q457.5 -150.0 477.12 -187.12Q496.75 -224.25 496.75 -271.75Q496.75 -319.5 477.12 -356.12Q457.5 -392.75 422.87 -414.12Q388.25 -435.5 343.25 -435.5Q299.75 -435.5 265.25 -414.5Q230.75 -393.5 211.25 -356.37Q191.75 -319.25 191.75 -271.75Q191.75 -224.25 211.25 -187.12Q230.75 -150.0 265.25 -129.0Q299.75 -108.0 343.25 -108.0ZM945.75 12.0Q861.75 12.0 798.62 -26.0Q735.5 -64.0 700.5 -128.75Q665.5 -193.5 665.5 -273.0Q665.5 -354.75 701.37 -418.37Q737.25 -482.0 798.37 -518.75Q859.5 -555.5 936.25 -555.5Q999.5 -555.5 1048.37 -534.75Q1097.25 -514.0 1131.12 -477.12Q1165.0 -440.25 1182.75 -392.5Q1200.5 -344.75 1200.5 -290.0Q1200.5 -275.5 1199.12 -260.75Q1197.75 -246.0 1194.25 -234.5H774.25V-334.5H1119.75L1057.5 -288.0Q1067.25 -334.0 1053.62 -370.0Q1040.0 -406 1009.37 -427.0Q978.75 -448.0 936.25 -448.0Q894.5 -448.0 862.87 -427.25Q831.25 -406.5 814.75 -367.12Q798.25 -327.75 801.75 -272.0Q797.5 -221.5 815.12 -183.37Q832.75 -145.25 867.12 -124.12Q901.5 -103.0 947.25 -103.0Q992.0 -103 1023.37 -122.0Q1054.75 -141.0 1073.0 -172.5L1179.0 -121.25Q1163.0 -82.25 1128.87 -52.12Q1094.75 -22.0 1048.12 -5.0Q1001.5 12.0 945.75 12.0ZM1254.5 0.0V-543.5H1378.25V-436.5L1368.0 -455.5Q1387.25 -505.25 1430.5 -530.37Q1473.75 -555.5 1531.5 -555.5Q1592.25 -555.5 1638.5 -529.5Q1684.75 -503.5 1710.87 -457.25Q1737.0 -411 1737.0 -350.02V0H1605.75V-319.0Q1605.75 -355.25 1592.0 -381.0Q1578.25 -406.75 1553.43 -421.12Q1528.61 -435.5 1496.30 -435.5Q1464.0 -435.5 1438.75 -421.12Q1413.5 -406.75 1399.62 -380.87Q1385.75 -355.0 1385.75 -319.0V0.0ZM2064.75 12.0Q1983.5 12.0 1919.37 -25.37Q1855.25 -62.75 1817.87 -127.37Q1780.5 -192.0 1780.5 -272.75Q1780.5 -353.5 1817.5 -417.62Q1854.5 -481.75 1919.0 -518.62Q1983.5 -555.5 2064.75 -555.5Q2123.0 -555.5 2173.0 -535.25Q2223.0 -515 2259.25 -479.25Q2295.5 -443.5 2311.75 -395.25L2197.25 -344.5Q2181.75 -386.0 2146.37 -410.75Q2111.0 -435.5 2064.75 -435.5Q2022.25 -435.5 1988.75 -414.62Q1955.25 -393.75 1936.0 -356.62Q1916.75 -319.5 1916.75 -271.75Q1916.75 -224.25 1936.0 -187.12Q1955.25 -150.0 1988.75 -129.0Q2022.25 -108.0 2064.75 -108.0Q2111.75 -108.0 2146.62 -132.75Q2181.5 -157.5 2197.25 -199.5L2311.75 -147.5Q2296.25 -101.75 2260.0 -65.5Q2223.75 -29.25 2173.75 -8.62Q2123.75 12.0 2064.75 12.0ZM2631.5 12.0Q2551.75 12.0 2486.37 -24.87Q2421.0 -61.75 2382.25 -126.0Q2343.5 -190.25 2343.5 -272.0Q2343.5 -354.25 2382.12 -418.0Q2420.75 -481.75 2486.0 -518.62Q2551.25 -555.5 2631.5 -555.5Q2711.75 -555.5 2776.62 -518.75Q2841.5 -482.0 2880.0 -418.25Q2918.5 -354.5 2918.5 -272.0Q2918.5 -190.0 2879.62 -125.75Q2840.75 -61.5 2775.87 -24.75Q2711.0 12 2631.5 12.0ZM2631.5 -108.0Q2675.75 -108.0 2709.5 -129.0Q2743.25 -150.0 2762.75 -187.25Q2782.25 -224.5 2782.25 -272.0Q2782.25 -319.5 2762.75 -356.12Q2743.25 -392.75 2709.5 -414.12Q2675.75 -435.5 2631.5 -435.5Q2587.25 -435.5 2553.12 -414.12Q2519.0 -392.75 2499.37 -356.12Q2479.75 -319.5 2479.75 -272.0Q2479.75 -224.5 2499.37 -187.25Q2519.0 -150 2553.12 -129.0Q2587.25 -108.0 2631.5 -108.0ZM2972.5 0.0V-543.5H3096.25V-418.25L3082.0 -438.5Q3096.5 -497.5 3141.87 -526.5Q3187.25 -555.5 3248.25 -555.5Q3314.75 -555.5 3365.87 -520.87Q3417.0 -486.25 3432.0 -428.75L3394.5 -425.5Q3419.75 -491.25 3469.62 -523.37Q3519.5 -555.5 3584.75 -555.5Q3642.5 -555.5 3688.0 -529.5Q3733.5 -503.5 3759.87 -457.25Q3786.25 -411.0 3786.25 -350.25V0.0H3655.0V-319Q3655.0 -355.25 3642.0 -381.0Q3629.0 -406.75 3605.75 -421.12Q3582.5 -435.5 3550.25 -435.5Q3519.0 -435.5 3495.12 -421.12Q3471.25 -406.75 3458.12 -380.87Q3445.0 -355 3445.0 -319V0H3313.75V-319.0Q3313.75 -355.25 3300.75 -381.0Q3287.75 -406.75 3264.5 -421.12Q3241.25 -435.5 3209.0 -435.5Q3177.5 -435.5 3153.75 -421.12Q3130.0 -406.75 3116.87 -380.87Q3103.75 -355.0 3103.75 -319.0V0.0ZM4117.5 12.0Q4037.75 12.0 3972.37 -24.87Q3907.0 -61.75 3868.25 -126.0Q3829.5 -190.25 3829.5 -272.0Q3829.5 -354.25 3868.12 -418.0Q3906.75 -481.75 3972.0 -518.62Q4037.25 -555.5 4117.5 -555.5Q4197.75 -555.5 4262.62 -518.75Q4327.5 -482.0 4366.0 -418.25Q4404.5 -354.5 4404.5 -272.0Q4404.5 -190.0 4365.62 -125.75Q4326.75 -61.5 4261.87 -24.75Q4197.0 12 4117.5 12.0ZM4117.5 -108.0Q4161.75 -108.0 4195.5 -129.0Q4229.25 -150.0 4248.75 -187.25Q4268.25 -224.5 4268.25 -272.0Q4268.25 -319.5 4248.75 -356.12Q4229.25 -392.75 4195.5 -414.12Q4161.75 -435.5 4117.5 -435.5Q4073.25 -435.5 4039.12 -414.12Q4005.0 -392.75 3985.37 -356.12Q3965.75 -319.5 3965.75 -272.0Q3965.75 -224.5 3985.37 -187.25Q4005.0 -150 4039.12 -129.0Q4073.25 -108.0 4117.5 -108.0Z";
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
