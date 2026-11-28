/**
 * Whether the browser is drawing without the graphics card.
 * It happens when the card's driver is missing or the browser turned it off (Chrome then reports
 * "Microsoft Basic Render Driver" or "SwiftShader"); everything is drawn by the processor, which
 * is slow at it. In that case the 3D and the stars keep moving, but they redraw fewer times a
 * second and with less work per frame. With a graphics card nothing changes.
 * Decided once per visit.
 */
const KEY = "bencomo-no-gpu";

function detect(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return saved === "1";
  } catch {
    /* storage blocked: just test */
  }
  let soft = false;
  try {
    // a context that refuses to be created when the browser would have to draw in software
    const strict = document.createElement("canvas").getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (!strict) {
      soft = !!document.createElement("canvas").getContext("webgl");
    } else {
      const info = strict.getExtension("WEBGL_debug_renderer_info");
      const name = info ? String(strict.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
      soft = /swiftshader|basic render|llvmpipe|softpipe|software/i.test(name);
      strict.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    soft = false;
  }
  try {
    sessionStorage.setItem(KEY, soft ? "1" : "0");
  } catch {
    /* fine */
  }
  return soft;
}

export const noGpu = detect();

/** without a graphics card the 3D redraws at most this often (seconds between frames: 24 a second) */
export const SOFT_FRAME = 1 / 24;
