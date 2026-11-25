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
 * the idea of its note (a struck-out "Bienvenidos", the swatches, the 10 seconds, the menu, the
 * WhatsApp button, the viewfinder, the logo in its corner, the "Aa").
 * On /notas the ring turns slowly; on a note, it turns to bring that note's card to the front.
 * Leans toward the cursor, follows the theme, and only renders while on screen.
 */

export interface NotesHandle {
  focus: (i: number | null) => void;
  dispose: () => void;
}

const N = 8;
const CW = 512; // card texture size
const CH = 640;
const AURORA = ["#8FB0FF", "#B7A8FF", "#FF9AB0", "#FFC48A"];
const TEXT = {
  es: {
    kickers: ["Credibilidad", "Color", "Primera impresión", "Restaurantes", "Contacto", "Fotografía", "Marca", "Tipografía"],
    welcome: "Bienvenidos a…",
    dish: ["Aguachile", "que pica."],
    chat: "Hola, quiero cotizar",
    button: "Cotiza por WhatsApp",
    brand: "tu marca",
  },
  en: {
    kickers: ["Credibility", "Color", "First impression", "Restaurants", "Contact", "Photography", "Brand", "Typography"],
    welcome: "Welcome to…",
    dish: ["Aguachile", "with a kick."],
    chat: "Hi, I'd like a quote",
    button: "Quote on WhatsApp",
    brand: "your brand",
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
      // "Bienvenidos a…", struck out
      fit(c, T.welcome, CW - 140, 50, (px) => `700 ${px}px ${SANS}`);
      c.textAlign = "center";
      c.fillStyle = p.soft;
      c.fillText(T.welcome, cx, cy - 40);
      c.fillStyle = aurora(c, 70, CW - 70);
      c.fillRect(70, cy - 57, CW - 140, 7);
      c.fillStyle = p.ink;
      c.font = `italic 400 64px ${SERIF}`;
      c.fillText(T.dish[0], cx, cy + 66);
      c.fillText(T.dish[1], cx, cy + 128);
      break;
    }
    case 1: {
      const cols = ["#0C2B3A", "#FF5A3C", "#F3EADB", "#C9E356"];
      cols.forEach((col, k) => {
        c.fillStyle = col;
        rr(c, 70 + k * 96, cy - 120, 84, 240, 22);
        c.fill();
      });
      break;
    }
    case 2: {
      c.lineWidth = 6;
      c.strokeStyle = p.line;
      c.beginPath();
      c.arc(cx, cy, 150, 0, Math.PI * 2);
      c.stroke();
      c.strokeStyle = aurora(c, cx - 150, cx + 150);
      c.lineCap = "round";
      c.beginPath();
      c.arc(cx, cy, 150, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.3);
      c.stroke();
      c.fillStyle = p.ink;
      c.font = `italic 400 150px ${SERIF}`;
      c.textAlign = "center";
      c.fillText("10 s", cx, cy + 48);
      break;
    }
    case 3: {
      const rows: [string, string][] = [
        ["Aguachile", "$180"],
        ["Ceviche", "$160"],
        ["Tostada", "$95"],
        ["Coctel", "$170"],
      ];
      rows.forEach(([a, b], k) => {
        const y = cy - 105 + k * 72;
        c.fillStyle = p.ink;
        c.font = `500 34px ${SANS}`;
        c.textAlign = "left";
        c.fillText(a, 64, y);
        const from = 64 + c.measureText(a).width + 18;
        c.textAlign = "right";
        c.font = `italic 400 42px ${SERIF}`;
        c.fillText(b, CW - 64, y);
        const to = CW - 64 - c.measureText(b).width - 18;
        // dotted leader, like a printed menu
        c.fillStyle = p.soft;
        for (let x = from; x < to; x += 14) c.fillRect(x, y - 9, 5, 3);
      });
      break;
    }
    case 4: {
      c.fillStyle = p.line;
      rr(c, 150, cy - 130, 300, 96, 32);
      c.fill();
      c.fillStyle = p.ink;
      fit(c, T.chat, 250, 28, (px) => `500 ${px}px ${SANS}`);
      c.textAlign = "left";
      c.fillText(T.chat, 178, cy - 72);
      c.fillStyle = p.ink;
      rr(c, 64, cy + 10, CW - 128, 104, 52);
      c.fill();
      c.fillStyle = aurora(c, 120, 150);
      c.beginPath();
      c.arc(128, cy + 62, 13, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = p.card;
      fit(c, T.button, CW - 64 - 160 - 36, 34, (px) => `700 ${px}px ${SANS}`);
      c.fillText(T.button, 160, cy + 74);
      break;
    }
    case 5: {
      c.lineWidth = 6;
      c.lineCap = "round";
      const x0 = 90, y0 = cy - 140, x1 = CW - 90, y1 = cy + 140, L = 54;
      [
        [x0, y0 + L, x0, y0, x0 + L, y0],
        [x1 - L, y0, x1, y0, x1, y0 + L],
        [x0, y1 - L, x0, y1, x0 + L, y1],
        [x1 - L, y1, x1, y1, x1, y1 - L],
      ].forEach(([a, b, cc, d, e, f]) => {
        c.beginPath();
        c.moveTo(a, b);
        c.lineTo(cc, d);
        c.lineTo(e, f);
        c.stroke();
      });
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, 90);
      g.addColorStop(0, "#FFC48A");
      g.addColorStop(0.65, "#FF9AB0");
      g.addColorStop(1, "rgba(255,154,176,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(cx, cy, 90, 0, Math.PI * 2);
      c.fill();
      break;
    }
    case 6: {
      c.strokeStyle = p.line;
      c.lineWidth = 3;
      rr(c, 56, cy - 150, CW - 112, 300, 26);
      c.stroke();
      c.beginPath();
      c.moveTo(56, cy - 70);
      c.lineTo(CW - 56, cy - 70);
      c.stroke();
      // the logo, top-left, ringed in aurora
      c.strokeStyle = aurora(c, 76, 250);
      c.lineWidth = 4;
      rr(c, 74, cy - 136, 168, 52, 14);
      c.stroke();
      c.fillStyle = aurora(c, 90, 120);
      rr(c, 88, cy - 124, 28, 28, 8);
      c.fill();
      c.fillStyle = p.ink;
      fit(c, T.brand, 104, 24, (px) => `700 ${px}px ${SANS}`);
      c.textAlign = "left";
      c.fillText(T.brand, 126, cy - 101);
      c.fillStyle = p.line;
      [0.8, 0.6, 0.7].forEach((w, k) => {
        rr(c, 84, cy - 30 + k * 44, (CW - 168) * w, 18, 9);
        c.fill();
      });
      break;
    }
    case 7: {
      c.textAlign = "center";
      c.font = `italic 400 190px ${SERIF}`;
      c.fillText("Aa", cx, cy + 10);
      c.font = `600 110px ${SANS}`;
      c.fillText("Aa", cx, cy + 140);
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
