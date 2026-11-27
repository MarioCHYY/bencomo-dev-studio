import {
  CanvasTexture,
  Clock,
  Color,
  Group,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from "three";

/**
 * The blog's own 3D: the design notes as a ring of cards floating in space, each one drawn with
 * the idea of its note (five testers and the one who gets it, prototype → MVP → product, the steps
 * to the first "got it", the small grey button next to the right one, the system's swatches and
 * parts, the old screen behind the new one).
 * On /notas the ring turns slowly; on a note, it turns to bring that note's card to the front.
 * Leans toward the cursor, follows the theme, and only renders while on screen.
 */

export interface NotesHandle {
  focus: (i: number | null) => void;
  dispose: () => void;
}

const N = 6;
const CW = 512; // card texture size
const CH = 640;
const AURORA = ["#8FB0FF", "#B7A8FF", "#FF9AB0", "#FFC48A"];
const TEXT = {
  es: {
    kickers: ["Validación", "MVP", "Onboarding", "Interfaz", "Sistemas", "Rediseño"],
    people: "5 personas",
    stages: ["Prototipo", "MVP", "Producto"],
    aha: "ah, ya.",
    small: "aceptar",
    big: "Guardar gasto",
  },
  en: {
    kickers: ["Validation", "MVP", "Onboarding", "Interface", "Systems", "Redesign"],
    people: "5 people",
    stages: ["Prototype", "MVP", "Product"],
    aha: "got it.",
    small: "ok",
    big: "Save expense",
  },
};
type Copy = (typeof TEXT)["es"];

type Pal = { card: string; ink: string; soft: string; line: string };
const palette = (dark: boolean): Pal =>
  dark
    ? { card: "#17171B", ink: "#F2F0EA", soft: "rgba(242,240,234,0.45)", line: "rgba(242,240,234,0.12)" }
    : { card: "#FBFAF6", ink: "#0B0B0D", soft: "rgba(11,11,13,0.45)", line: "rgba(11,11,13,0.10)" };

function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function aurora(c: CanvasRenderingContext2D, x0: number, x1: number) {
  const g = c.createLinearGradient(x0, 0, x1, 0);
  AURORA.forEach((col, i) => g.addColorStop(i / 3, col));
  return g;
}

/** sets the font at `size`, shrinking it until `text` fits in `max` pixels (English runs longer) */
function fit(c: CanvasRenderingContext2D, text: string, max: number, size: number, font: (px: number) => string) {
  let px = size;
  c.font = font(px);
  while (px > 12 && c.measureText(text).width > max) {
    px -= 1;
    c.font = font(px);
  }
}

const SANS = '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif';
const SERIF = '"Instrument Serif", Georgia, serif';

/** the back of every card: the same paper, the aurora hairline, nothing written */
function drawBack(p: Pal): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = CW;
  cv.height = CH;
  const c = cv.getContext("2d")!;
  rr(c, 4, 4, CW - 8, CH - 8, 44);
  c.fillStyle = p.card;
  c.fill();
  c.lineWidth = 2;
  c.strokeStyle = p.line;
  c.stroke();
  c.save();
  rr(c, 4, 4, CW - 8, CH - 8, 44);
  c.clip();
  c.fillStyle = aurora(c, 0, CW);
  c.fillRect(0, CH - 8, CW, 4);
  c.restore();
  return cv;
}

/** one card: the frame, the drawing of its idea, and its label */
function drawCard(i: number, p: Pal, T: Copy): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = CW;
  cv.height = CH;
  const c = cv.getContext("2d")!;
  c.clearRect(0, 0, CW, CH);
  rr(c, 4, 4, CW - 8, CH - 8, 44);
  c.fillStyle = p.card;
  c.fill();
  c.lineWidth = 2;
  c.strokeStyle = p.line;
  c.stroke();
  // aurora hairline on top
  c.save();
  rr(c, 4, 4, CW - 8, CH - 8, 44);
  c.clip();
  c.fillStyle = aurora(c, 0, CW);
  c.fillRect(0, 4, CW, 4);
  c.restore();

  // label
  c.fillStyle = p.soft;
  c.font = `600 26px ${SANS}`;
  c.textBaseline = "alphabetic";
  c.fillText(T.kickers[i].toUpperCase().split("").join(String.fromCharCode(8202)), 44, 76);
  c.textAlign = "right";
  c.fillStyle = p.ink;
  c.font = `500 26px ui-monospace, "JetBrains Mono", monospace`;
  c.fillText(String(i + 1).padStart(2, "0"), CW - 44, 76);
  c.textAlign = "left";

  const cx = CW / 2;
  const cy = 340;
  c.fillStyle = p.ink;
  c.strokeStyle = p.ink;
  switch (i) {
    case 0: {
      // five testers; the one who gets it, in aurora with a check
      const r = 34, gap = 86, x0 = cx - gap * 2;
      for (let k = 0; k < 5; k++) {
        const x = x0 + k * gap;
        const hit = k === 3;
        c.fillStyle = hit ? aurora(c, x - r, x + r) : p.line;
        c.beginPath();
        c.arc(x, cy - 70, r, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(x, cy + 18, r * 1.35, Math.PI, 0);
        c.fill();
      }
      c.strokeStyle = p.card;
      c.lineWidth = 7;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.beginPath();
      c.moveTo(x0 + 3 * gap - 14, cy - 70);
      c.lineTo(x0 + 3 * gap - 3, cy - 58);
      c.lineTo(x0 + 3 * gap + 16, cy - 84);
      c.stroke();
      c.fillStyle = p.ink;
      c.textAlign = "center";
      fit(c, T.people, CW - 120, 70, (px) => `italic 400 ${px}px ${SERIF}`);
      c.fillText(T.people, cx, cy + 150);
      break;
    }
    case 1: {
      // three phones, from a dashed sketch to a solid product
      const w = 104, h = 196, gap = 34, x0 = cx - (w * 3 + gap * 2) / 2, y = cy - 140;
      for (let k = 0; k < 3; k++) {
        const x = x0 + k * (w + gap);
        c.lineWidth = 4;
        c.setLineDash(k === 0 ? [10, 9] : []);
        c.strokeStyle = k === 2 ? p.ink : p.soft;
        rr(c, x, y, w, h, 20);
        c.stroke();
        c.setLineDash([]);
        if (k === 1) {
          c.fillStyle = p.line;
          [0.7, 0.5, 0.6].forEach((ww, j) => {
            rr(c, x + 16, y + 34 + j * 30, (w - 32) * ww, 14, 7);
            c.fill();
          });
        }
        if (k === 2) {
          c.fillStyle = p.ink;
          rr(c, x, y, w, h, 20);
          c.fill();
          c.fillStyle = aurora(c, x + 14, x + w - 14);
          rr(c, x + 14, y + h - 46, w - 28, 26, 13);
          c.fill();
        }
        c.fillStyle = k === 2 ? p.ink : p.soft;
        c.textAlign = "center";
        fit(c, T.stages[k], w + gap - 6, 24, (px) => `600 ${px}px ${SANS}`);
        c.fillText(T.stages[k], x + w / 2, y + h + 46);
      }
      break;
    }
    case 2: {
      // three steps to the first "got it"
      const xs = [cx - 150, cx, cx + 150], y = cy - 40;
      c.strokeStyle = p.line;
      c.lineWidth = 6;
      c.beginPath();
      c.moveTo(xs[0], y);
      c.lineTo(xs[2], y);
      c.stroke();
      xs.forEach((x, k) => {
        c.fillStyle = k === 2 ? aurora(c, x - 34, x + 34) : p.ink;
        c.beginPath();
        c.arc(x, y, k === 2 ? 34 : 18, 0, Math.PI * 2);
        c.fill();
      });
      c.fillStyle = p.ink;
      c.textAlign = "center";
      fit(c, T.aha, CW - 120, 92, (px) => `italic 400 ${px}px ${SERIF}`);
      c.fillText(T.aha, cx, cy + 110);
      break;
    }
    case 3: {
      // the tiny low-contrast button, and the right one
      c.textAlign = "center";
      c.strokeStyle = p.line;
      c.lineWidth = 2;
      rr(c, cx - 50, cy - 130, 100, 34, 8);
      c.stroke();
      c.fillStyle = p.line;
      c.font = `500 18px ${SANS}`;
      c.fillText(T.small, cx, cy - 107);
      c.fillStyle = p.ink;
      rr(c, 64, cy - 10, CW - 128, 104, 52);
      c.fill();
      c.fillStyle = p.card;
      fit(c, T.big, CW - 200, 36, (px) => `700 ${px}px ${SANS}`);
      c.fillText(T.big, cx, cy + 54);
      c.fillStyle = aurora(c, 64, CW - 64);
      c.fillRect(110, cy + 130, CW - 220, 5);
      break;
    }
    case 4: {
      // the system: swatches, a button, a switch and a field
      AURORA.forEach((col, k) => {
        c.fillStyle = col;
        c.beginPath();
        c.arc(cx - 135 + k * 90, cy - 120, 32, 0, Math.PI * 2);
        c.fill();
      });
      c.fillStyle = p.ink;
      rr(c, 70, cy - 46, 190, 64, 32);
      c.fill();
      c.fillStyle = p.line;
      rr(c, 300, cy - 40, 104, 52, 26);
      c.fill();
      c.fillStyle = aurora(c, 352, 400);
      c.beginPath();
      c.arc(378, cy - 14, 20, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = p.soft;
      c.lineWidth = 3;
      rr(c, 70, cy + 54, CW - 140, 64, 16);
      c.stroke();
      c.fillStyle = p.line;
      rr(c, 94, cy + 78, 160, 16, 8);
      c.fill();
      break;
    }
    case 5: {
      // the old screen, dashed, behind the new one
      c.strokeStyle = p.soft;
      c.lineWidth = 3;
      c.setLineDash([10, 9]);
      rr(c, 70, cy - 150, 250, 300, 24);
      c.stroke();
      c.setLineDash([]);
      c.fillStyle = p.ink;
      rr(c, 190, cy - 110, 250, 300, 24);
      c.fill();
      c.fillStyle = aurora(c, 214, 416);
      rr(c, 214, cy - 84, 202, 8, 4);
      c.fill();
      c.fillStyle = p.card;
      [0.8, 0.55, 0.7].forEach((w, k) => {
        rr(c, 214, cy - 44 + k * 40, 202 * w, 16, 8);
        c.globalAlpha = 0.35;
        c.fill();
        c.globalAlpha = 1;
      });
      c.fillStyle = p.card;
      rr(c, 214, cy + 124, 202, 44, 22);
      c.fill();
      break;
    }
  }
  return cv;
}

export function createNotes(host: HTMLElement, opts: { reducedMotion: boolean; focus: number | null; es: boolean }): NotesHandle {
  const { reducedMotion } = opts;
  const T = opts.es ? TEXT.es : TEXT.en;
  const pix = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(pix);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 8);

  const tilt = new Group();
  const ring = new Group();
  tilt.add(ring);
  scene.add(tilt);

  const R = 2.05;
  const STEP = (Math.PI * 2) / N;
  const geo = new PlaneGeometry(1.5, 1.875);
  const isDark = () => document.documentElement.classList.contains("dark");

  const backTex = new CanvasTexture(drawBack(palette(isDark())));
  backTex.colorSpace = SRGBColorSpace;
  const backMats: MeshBasicMaterial[] = [];
  const cards = Array.from({ length: N }, (_, i) => {
    const tex = new CanvasTexture(drawCard(i, palette(isDark()), T));
    tex.colorSpace = SRGBColorSpace;
    tex.minFilter = LinearFilter;
    tex.anisotropy = 4;
    const mat = new MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.02, depthWrite: true });
    const m = new Mesh(geo, mat);
    const a = i * STEP;
    m.position.set(Math.sin(a) * R, (i % 2 ? 0.16 : -0.16), Math.cos(a) * R);
    m.rotation.y = a;
    m.userData = { a, bob: i * 1.7 };
    // its back, so the far side of the ring is there too, blank
    const backMat = new MeshBasicMaterial({ map: backTex, transparent: true, alphaTest: 0.02 });
    backMats.push(backMat);
    const back = new Mesh(geo, backMat);
    back.rotation.y = Math.PI;
    m.add(back);
    ring.add(m);
    return { m, mat, tex, backMat };
  });

  // repaint the cards when the fonts arrive and when the theme flips
  const repaint = () => {
    const p = palette(isDark());
    cards.forEach(({ tex }, i) => {
      tex.image = drawCard(i, p, T);
      tex.needsUpdate = true;
    });
    backTex.image = drawBack(p);
    backTex.needsUpdate = true;
  };
  document.fonts?.ready.then(repaint).catch(() => {});
  let lastDark = isDark();
  const mo = new MutationObserver(() => {
    const d = isDark();
    if (d === lastDark) return;
    lastDark = d;
    repaint();
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // narrow boxes: step back so the ring fits side to side
    camera.position.z = w / h < 1.1 ? 8 / Math.max(0.6, w / h / 1.1) : 8;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  const target = { x: 0, y: 0 };
  const lean = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const onLeave = () => {
    target.x = target.y = 0;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerleave", onLeave);

  let focus = opts.focus;
  let angle = focus != null ? -focus * STEP + 2.4 : 0.6; // start a little off and turn into place
  const dim = new Color();
  const paperTint = new Color(0.95, 0.94, 0.92);
  const clock = new Clock();
  let raf = 0;
  let visible = false;
  let intro = reducedMotion ? 1 : 0;

  const frame = () => {
    raf = 0;
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    intro = Math.min(1, intro + dt / 1.6);
    const e = 1 - Math.pow(1 - intro, 3);

    if (focus != null) {
      // bring the note's card to the front, by the shortest way round
      let goal = -focus * STEP;
      while (goal - angle > Math.PI) goal -= Math.PI * 2;
      while (goal - angle < -Math.PI) goal += Math.PI * 2;
      angle += (goal - angle) * Math.min(1, dt * 2.2);
    } else if (!reducedMotion) {
      angle -= dt * 0.16;
    }
    lean.x += (target.x - lean.x) * Math.min(1, dt * 3);
    lean.y += (target.y - lean.y) * Math.min(1, dt * 3);

    ring.rotation.y = angle + lean.x * 0.22 + (focus != null && !reducedMotion ? Math.sin(t * 0.35) * 0.05 : 0);
    tilt.rotation.x = 0.2 + lean.y * 0.1;
    tilt.rotation.z = -0.06;
    tilt.scale.setScalar(0.82 + 0.18 * e);

    const dark = lastDark;
    cards.forEach(({ m, mat, backMat }, i) => {
      // how much the card faces the viewer: the ones behind fade into the page
      const world = m.userData.a + ring.rotation.y;
      const facing = Math.cos(world);
      const f = Math.max(0, facing);
      const k = 0.28 + 0.72 * Math.pow(f, 1.4);
      if (dark) dim.setScalar(k);
      else dim.setScalar(1).lerp(paperTint, 1 - k);
      mat.color.copy(dim);
      mat.opacity = 0.35 + 0.65 * Math.pow((facing + 1) / 2, 1.2);
      // the backs are seen on the far side of the ring: keep them quiet
      const kb = 0.22 + 0.3 * Math.max(0, -facing);
      if (dark) backMat.color.setScalar(kb);
      else backMat.color.setScalar(1).lerp(paperTint, 1 - kb);
      backMat.opacity = 0.5;
      const isFocus = focus === i;
      const s = isFocus ? 1 + 0.08 * f : 1;
      m.scale.setScalar(s);
      m.position.y = (i % 2 ? 0.16 : -0.16) + (reducedMotion ? 0 : Math.sin(t * 0.8 + m.userData.bob) * 0.05);
      m.renderOrder = Math.round(facing * 100);
    });

    renderer.render(scene, camera);
    if (visible) raf = requestAnimationFrame(frame);
  };
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible && !raf) {
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    }
  });
  io.observe(host);

  return {
    focus(i) {
      focus = i;
    },
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cards.forEach(({ mat, tex, backMat }) => {
        mat.dispose();
        tex.dispose();
        backMat.dispose();
      });
      backTex.dispose();
      geo.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
