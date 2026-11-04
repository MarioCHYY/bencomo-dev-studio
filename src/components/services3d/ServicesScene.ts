import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  Clock,
  Color,
  CylinderGeometry,
  DoubleSide,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Scene,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * One small 3D render per service. The scene shows one model at a time and
 * cross-fades (scale + spin + fade) to the next when `setActive` changes.
 * Look: Ink satin "clay" with aurora accents. Only brand colours:
 * Ink #0B0B0D, Bone #F2F0EA and the aurora (#8FB0FF #B7A8FF #FF9AB0 #FFC48A).
 * `light` switches the lines/dots that float in open space from Bone to Ink so they
 * stay visible on the light page; things drawn on top of the dark devices stay Bone.
 */

export interface ServicesSceneHandle {
  setActive: (i: number) => void;
  dispose: () => void;
}

const PASTEL = {
  blue: new Color("#8fb0ff"),
  violet: new Color("#b7a8ff"),
  pink: new Color("#ff9ab0"),
  peach: new Color("#ffc48a"),
};
const BONE = new Color("#f2f0ea");
const INK = new Color("#0b0b0d");
/** colour of lines and dots floating in open space; set per scene (Bone on dark, Ink on light) */
let LINE = BONE;
/** opacity multiplier for those lines (ink reads stronger than bone) */
let LINE_K = 1;
let LIGHT = false;
/** Ink clay shades (neutral, no navy): deep on the light page, lifted on the dark one so it separates from the ground */
const CLAY_LIGHT = ["#0b0b0d", "#111114", "#16161a", "#1c1c21", "#232328"];
const CLAY_DARK = ["#1a1a1f", "#202026", "#26262d", "#2d2d35", "#34343d"];
let CLAY = CLAY_DARK;

/** `still`: the frame shown when the visitor prefers reduced motion */
type Model = { root: Group; update: (t: number, k: number) => void; mats: Material[]; still?: number };

function clay(color = CLAY[2], rough = 0.42, metal = 0.25) {
  return new MeshStandardMaterial({ color, roughness: rough, metalness: metal, transparent: true });
}
function glow(color: Color, opacity = 1) {
  return new MeshBasicMaterial({ color, transparent: true, opacity });
}
function edges(geo: BufferGeometry, color: Color, opacity = 0.6) {
  const m = new LineBasicMaterial({ color, transparent: true, opacity });
  return { line: new LineSegments(new EdgesGeometry(geo, 30), m), mat: m };
}
function gradientPlane(w: number, h: number, top: Color, bottom: Color, opacity = 0.9) {
  const g = new PlaneGeometry(w, h, 1, 8);
  const pos = g.attributes.position;
  const cols: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const f = (pos.getY(i) + h / 2) / h;
    const c = bottom.clone().lerp(top, f);
    cols.push(c.r, c.g, c.b);
  }
  g.setAttribute("color", new Float32BufferAttribute(cols, 3));
  const m = new MeshBasicMaterial({ vertexColors: true, transparent: true, opacity });
  return { mesh: new Mesh(g, m), mat: m };
}

// ---------------------------------------------------------------- timeline helpers
// Every model plays a short looping "film" that tells what the service does.
// `t` handed to update() is the time since that model became active, so each story starts at its first frame.
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const eOut = (x: number) => 1 - Math.pow(1 - x, 3);
const eInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eBack = (x: number) => {
  if (x <= 0) return 0;
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
/** rises over [a,b], falls over [c,d] */
const env = (t: number, a: number, b: number, c: number, d: number) => Math.min(eOut(seg(t, a, b)), 1 - eInOut(seg(t, c, d)));
/** set a material's opacity on top of its base and the scene cross-fade `k` */
function op(m: Material | Material[], a: number, k: number) {
  const mm = Array.isArray(m) ? m : [m];
  mm.forEach((x) => {
    const o = Math.min(1, ((x.userData.base as number) ?? 1) * k * a);
    (x as MeshBasicMaterial).opacity = o;
    x.visible = o > 0.004; // an invisible piece must not keep writing depth and cut holes in what's behind
  });
}
/** scale along x keeping the left edge fixed (bars that "type" in) */
function growX(o: Object3D, s: number, left: number, w: number) {
  const v = Math.max(0.001, s);
  o.visible = s > 0.003;
  o.scale.x = v;
  o.position.x = left + (w * v) / 2;
}
const pop = (o: Object3D, s: number) => {
  o.visible = s > 0.003;
  o.scale.setScalar(Math.max(0.001, s));
};

/** mouse pointer: Ink on the light page, Bone on the dark one, outlined in the other */
function cursor() {
  const s = new Shape();
  const pts = [[0, 0], [0, -0.26], [0.065, -0.2], [0.11, -0.3], [0.15, -0.285], [0.105, -0.185], [0.19, -0.185]];
  s.moveTo(0, 0);
  pts.slice(1).forEach(([x, y]) => s.lineTo(x, y));
  s.closePath();
  const geo = new ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: false });
  const fill = glow(LIGHT ? INK : BONE, 1);
  const m = new Mesh(geo, fill);
  const e = edges(geo, LIGHT ? BONE : INK, 0.9);
  m.add(e.line);
  m.renderOrder = 10;
  return { m, mats: [fill, e.mat] };
}
function ripple(color: Color = PASTEL.violet) {
  const mat = glow(color, 1);
  const m = new Mesh(new TorusGeometry(0.08, 0.007, 8, 48), mat);
  return { m, mat };
}

// ---------------------------------------------------------------- models
/** 01 · Websites: the page builds itself, gets clicked, then opens up into its layers */
function websites(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const frame = clay(CLAY[1]);
  mats.push(frame);
  root.add(new Mesh(new RoundedBoxGeometry(2.4, 1.6, 0.06, 4, 0.06), frame));
  const bar = new Mesh(new RoundedBoxGeometry(2.4, 0.18, 0.07, 3, 0.04), clay(CLAY[3]));
  bar.position.set(0, 0.71, 0.01);
  mats.push(bar.material as Material);
  root.add(bar);
  [PASTEL.pink, PASTEL.peach, PASTEL.blue].forEach((c, i) => {
    const dot = new Mesh(new SphereGeometry(0.025, 12, 12), glow(c));
    dot.position.set(-1.08 + i * 0.08, 0.71, 0.05);
    mats.push(dot.material as Material);
    root.add(dot);
  });
  const hero = gradientPlane(2.05, 0.62, PASTEL.violet, PASTEL.blue, 0.85);
  hero.mesh.position.set(0, 0.22, 0);
  mats.push(hero.mat);
  const title = new Mesh(new RoundedBoxGeometry(1.0, 0.09, 0.02, 2, 0.02), glow(BONE, 0.95));
  title.position.set(-0.45, 0.36, 0);
  const sub = new Mesh(new RoundedBoxGeometry(0.7, 0.045, 0.02, 2, 0.02), glow(BONE, 0.6));
  sub.position.set(-0.6, 0.23, 0);
  const btn = new Mesh(new RoundedBoxGeometry(0.42, 0.12, 0.04, 3, 0.05), glow(PASTEL.blue));
  btn.position.set(-0.74, 0.05, 0);
  mats.push(title.material as Material, sub.material as Material, btn.material as Material);
  const layers: { o: Object3D; z: number }[] = [
    { o: hero.mesh, z: 0.18 },
    { o: title, z: 0.34 },
    { o: sub, z: 0.3 },
    { o: btn, z: 0.42 },
  ];
  const cards: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const card = new Mesh(new RoundedBoxGeometry(0.62, 0.42, 0.04, 3, 0.04), clay(CLAY[4], 0.35, 0.3));
    card.position.set(-0.68 + i * 0.68, -0.42, 0);
    mats.push(card.material as Material);
    cards.push(card);
    layers.push({ o: card, z: 0.22 + i * 0.06 });
  }
  layers.forEach((l) => root.add(l.o));
  const cur = cursor();
  const rip = ripple(PASTEL.blue);
  mats.push(...cur.mats, rip.mat);
  root.add(cur.m, rip.m);
  root.rotation.set(-0.12, 0.42, 0.02);
  const P = 9;
  return {
    root,
    mats,
    still: 6.6,
    update: (L, k) => {
      const t = L % P;
      const out = 1 - eInOut(seg(t, 8.2, 8.9));
      growX(hero.mesh, eInOut(seg(t, 0.3, 1.1)), -1.025, 2.05);
      op(hero.mat, out, k);
      growX(title, eOut(seg(t, 1.0, 1.55)), -0.95, 1.0);
      growX(sub, eOut(seg(t, 1.35, 1.9)), -0.95, 0.7);
      op([title.material as Material, sub.material as Material], out, k);
      const press = Math.sin(Math.PI * seg(t, 4.45, 4.75));
      pop(btn, eBack(seg(t, 1.9, 2.4)) * (1 + press * 0.18));
      op(btn.material as Material, out, k);
      cards.forEach((c, i) => {
        const a = eOut(seg(t, 2.3 + i * 0.22, 2.9 + i * 0.22));
        c.position.y = -0.42 - (1 - a) * 0.45;
        op(c.material as Material, a * out, k);
      });
      // explode into layers, then fold back
      const sep = env(t, 5.3, 6.3, 7.0, 7.9);
      layers.forEach((l, i) => (l.o.position.z = 0.04 + l.z * sep * 2.4 + Math.sin(L * 1.3 + i) * 0.006));
      // pointer comes in and clicks the button
      const cm = eInOut(seg(t, 3.1, 4.4));
      cur.m.position.set(lerp(1.35, -0.72, cm), lerp(-1.0, 0.05, cm), btn.position.z + 0.08);
      pop(cur.m, 1 - press * 0.15);
      op(cur.mats, env(t, 3.0, 3.3, 5.0, 5.4), k);
      const r = seg(t, 4.6, 5.3);
      rip.m.position.set(btn.position.x, btn.position.y, btn.position.z + 0.04);
      pop(rip.m, 0.6 + r * 3.2);
      op(rip.mat, r > 0 && r < 1 ? 1 - r : 0, k);
      root.rotation.y = 0.42 + sep * 0.55 + Math.sin(L * 0.35) * 0.06;
      root.rotation.x = -0.12 - sep * 0.12;
    },
  };
}

/** 02 · UI/UX: three screens go from wireframe to colour, one gets tapped and chosen */
function uiux(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const tints: [Color, Color][] = [
    [PASTEL.blue, PASTEL.violet],
    [PASTEL.violet, PASTEL.pink],
    [PASTEL.pink, PASTEL.peach],
  ];
  type Phone = { g: Group; scr: { mesh: Mesh; mat: Material }; blocks: { m: Mesh; w: number; x: number }[]; cta: Mesh };
  const phones: Phone[] = [];
  tints.forEach(([a, b]) => {
    const g = new Group();
    const body = new Mesh(new RoundedBoxGeometry(0.78, 1.6, 0.08, 6, 0.12), clay(CLAY[1], 0.3, 0.45));
    mats.push(body.material as Material);
    g.add(body);
    const scr = gradientPlane(0.68, 1.46, a, b, 0.35);
    scr.mesh.position.z = 0.045;
    mats.push(scr.mat);
    g.add(scr.mesh);
    const blocks: Phone["blocks"] = [];
    for (let r = 0; r < 4; r++) {
      const w = r === 0 ? 0.56 : 0.42 - r * 0.04;
      const x = r === 0 ? 0 : -0.07;
      const blk = new Mesh(new RoundedBoxGeometry(w, r === 0 ? 0.32 : 0.07, 0.01, 2, 0.02), glow(BONE, r === 0 ? 0.3 : 0.75));
      blk.position.set(x, 0.45 - r * 0.22 - (r ? 0.08 : 0), 0.06);
      mats.push(blk.material as Material);
      g.add(blk);
      blocks.push({ m: blk, w, x });
    }
    const cta = new Mesh(new RoundedBoxGeometry(0.5, 0.11, 0.02, 2, 0.05), glow(PASTEL.blue));
    cta.position.set(0, -0.55, 0.06);
    mats.push(cta.material as Material);
    g.add(cta);
    phones.push({ g, scr, blocks, cta });
    root.add(g);
  });
  const cur = cursor();
  const rip = ripple(PASTEL.pink);
  mats.push(...cur.mats, rip.mat);
  root.add(cur.m, rip.m);
  const P = 9;
  return {
    root,
    mats,
    still: 6.2,
    update: (L, k) => {
      const t = L % P;
      const out = 1 - eInOut(seg(t, 8.1, 8.8));
      const spread = env(t, 0.1, 1.0, 7.7, 8.6);
      const focus = env(t, 4.9, 5.7, 7.2, 7.9);
      phones.forEach((p, i) => {
        const d = i - 1;
        const s = i * 0.18;
        p.g.position.set(d * 0.8 * spread * (1 + focus * 0.12), Math.sin(L * 1.1 + i * 1.2) * 0.04, -Math.abs(d) * 0.35 * spread + (d === 0 ? focus * 0.4 : -focus * 0.15));
        p.g.rotation.y = d * -0.38 * spread * (1 + focus * 0.5);
        // wireframe: grey bars type in
        p.blocks.forEach((b, r) => growX(b.m, eOut(seg(t, 1.0 + s + r * 0.12, 1.45 + s + r * 0.12)), b.x - b.w / 2, b.w));
        // colour floods the screen from the bottom
        const fill = eInOut(seg(t, 2.0 + s, 2.8 + s));
        p.scr.mesh.scale.y = Math.max(0.001, fill);
        p.scr.mesh.position.y = -0.73 * (1 - fill);
        op(p.scr.mat, fill * out, k);
        op(p.blocks.map((b) => b.m.material as Material), (0.35 + 0.65 * fill) * out, k);
        const press = d === 0 ? Math.sin(Math.PI * seg(t, 4.35, 4.6)) : 0;
        pop(p.cta, eBack(seg(t, 2.8 + s, 3.2 + s)) * (1 + press * 0.2));
        op(p.cta.material as Material, out, k);
      });
      const mid = phones[1].g.position;
      const cm = eInOut(seg(t, 3.3, 4.3));
      const press = Math.sin(Math.PI * seg(t, 4.35, 4.6));
      cur.m.position.set(lerp(1.3, mid.x + 0.02, cm), lerp(-1.2, mid.y - 0.57, cm), mid.z + 0.16);
      pop(cur.m, 1 - press * 0.15);
      op(cur.mats, env(t, 3.2, 3.5, 4.9, 5.3), k);
      const r = seg(t, 4.45, 5.1);
      rip.m.position.set(mid.x, mid.y - 0.55, mid.z + 0.1);
      pop(rip.m, 0.6 + r * 3);
      op(rip.mat, r > 0 && r < 1 ? 1 - r : 0, k);
      root.rotation.y = Math.sin(L * 0.3) * 0.12;
    },
  };
}

/** 03 · Web apps: a request leaves the interface, the server works, the database answers, data comes back */
function webapps(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const dbMat = clay(CLAY[2], 0.38, 0.35);
  mats.push(dbMat);
  const db = new Group();
  const rings: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const c = new Mesh(new CylinderGeometry(0.42, 0.42, 0.22, 48), dbMat);
    c.position.y = i * 0.27;
    db.add(c);
    const ring = new Mesh(new TorusGeometry(0.425, 0.01, 8, 64), glow([PASTEL.blue, PASTEL.violet, PASTEL.pink][i], 0.9));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * 0.27 + 0.11;
    mats.push(ring.material as Material);
    rings.push(ring);
    db.add(ring);
  }
  db.position.set(-0.95, -0.3, 0);
  root.add(db);
  const server = new Mesh(new RoundedBoxGeometry(0.7, 0.9, 0.5, 4, 0.06), clay(CLAY[2], 0.35, 0.4));
  server.position.set(0.95, 0, 0);
  mats.push(server.material as Material);
  root.add(server);
  const leds: Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const led = new Mesh(new BoxGeometry(0.44, 0.03, 0.01), glow(i % 2 ? PASTEL.peach : PASTEL.blue, 0.9));
    led.position.set(0.95, 0.3 - i * 0.18, 0.26);
    mats.push(led.material as Material);
    leds.push(led);
    root.add(led);
  }
  const ui = new Mesh(new RoundedBoxGeometry(0.8, 0.55, 0.04, 3, 0.05), clay(CLAY[3], 0.3, 0.3));
  ui.position.set(0, 0.85, -0.2);
  mats.push(ui.material as Material);
  root.add(ui);
  const uiGlow = gradientPlane(0.7, 0.45, PASTEL.violet, PASTEL.blue, 0.5);
  uiGlow.mesh.position.set(0, 0.85, -0.17);
  mats.push(uiGlow.mat);
  root.add(uiGlow.mesh);
  const rows: { m: Mesh; w: number }[] = [];
  [0.5, 0.36, 0.44].forEach((w, r) => {
    const m = new Mesh(new RoundedBoxGeometry(w, 0.05, 0.01, 2, 0.02), glow(BONE, 0.95));
    m.position.set(-0.28 + w / 2, 0.98 - r * 0.12, -0.15);
    mats.push(m.material as Material);
    rows.push({ m, w });
    root.add(m);
  });
  // ui -> server, server -> db, db -> ui
  const curves = [
    new CatmullRomCurve3([new Vector3(0, 0.85, -0.15), new Vector3(0.55, 0.9, 0.2), new Vector3(0.95, 0.45, 0)]),
    new CatmullRomCurve3([new Vector3(0.95, -0.45, 0), new Vector3(0, -0.85, 0.3), new Vector3(-0.95, -0.42, 0)]),
    new CatmullRomCurve3([new Vector3(-0.95, 0.35, 0), new Vector3(-0.4, 1.0, 0.2), new Vector3(0, 0.85, -0.15)]),
  ];
  const tubeMats = curves.map((c) => {
    const m = glow(LINE, 0.16 * LINE_K);
    mats.push(m);
    root.add(new Mesh(new TubeGeometry(c, 40, 0.008, 6, false), m));
    return m;
  });
  const cols = [PASTEL.violet, PASTEL.peach, PASTEL.pink];
  const trails = curves.map((_, ci) =>
    Array.from({ length: 4 }, (_, j) => {
      const m = new Mesh(new SphereGeometry(0.045 - j * 0.008, 12, 12), glow(cols[ci]));
      mats.push(m.material as Material);
      root.add(m);
      return m;
    }),
  );
  // [start, end] of each leg
  const legs: [number, number][] = [
    [0.6, 1.8],
    [2.8, 4.0],
    [4.9, 6.1],
  ];
  root.scale.setScalar(0.95);
  const P = 8;
  return {
    root,
    mats,
    still: 6.7,
    update: (L, k) => {
      const t = L % P;
      op(uiGlow.mat, 0.6 + 0.4 * env(t, 0, 0.25, 0.5, 0.9) + 0.4 * env(t, 6.0, 6.3, 6.8, 7.6), k);
      legs.forEach(([a, b], ci) => {
        const f = eInOut(seg(t, a, b));
        trails[ci].forEach((m, j) => {
          const g = f - j * 0.045;
          m.position.copy(curves[ci].getPointAt(clamp01(g)));
          op(m.material as Material, f > 0 && g > 0 && f < 1 ? 1 - j * 0.2 : 0, k);
        });
        op(tubeMats[ci], 1 + 2.2 * env(t, a - 0.1, a + 0.1, b, b + 0.4), k);
      });
      // server thinks
      leds.forEach((led, i) => op(led.material as Material, 0.35 + 0.65 * env(t, 1.8 + i * 0.15, 1.95 + i * 0.15, 2.4 + i * 0.15, 2.75 + i * 0.15), k));
      server.scale.setScalar(1 + 0.03 * env(t, 1.8, 2.0, 2.6, 2.9));
      // database rings light bottom to top
      rings.forEach((r, i) => {
        const a = env(t, 4.0 + i * 0.15, 4.15 + i * 0.15, 4.6 + i * 0.15, 5.0 + i * 0.15);
        r.scale.setScalar(1 + 0.12 * a);
        op(r.material as Material, 0.45 + 0.55 * a, k);
      });
      // data lands in the interface
      rows.forEach((r, i) => {
        growX(r.m, eOut(seg(t, 6.1 + i * 0.15, 6.5 + i * 0.15)), -0.28, r.w);
        op(r.m.material as Material, 1 - eInOut(seg(t, 7.4, 7.9)), k);
      });
      root.rotation.y = 0.3 + Math.sin(L * 0.3) * 0.2;
      root.rotation.x = -0.1;
    },
  };
}

/** 04 · Business systems: the dashboard fills with data, the trend draws itself, the KPI counts up */
function systems(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const base = new Mesh(new RoundedBoxGeometry(2.4, 0.08, 1.4, 4, 0.04), clay(CLAY[1]));
  base.position.y = -0.6;
  mats.push(base.material as Material);
  root.add(base);
  const grid = new LineSegments(new EdgesGeometry(new PlaneGeometry(2.2, 1.2, 8, 4)), new LineBasicMaterial({ color: BONE, transparent: true, opacity: 0.1 }));
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -0.555;
  mats.push(grid.material as Material);
  root.add(grid);
  const cols = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach, PASTEL.violet, PASTEL.blue];
  const H = [0.5, 0.78, 0.66, 1.0, 0.9, 1.3];
  const bars: Mesh[] = [];
  cols.forEach((c, i) => {
    const m = new MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.1, emissive: c, emissiveIntensity: LIGHT ? 0.12 : 0.25, transparent: true });
    const b = new Mesh(new RoundedBoxGeometry(0.22, 1, 0.22, 3, 0.04), m);
    b.position.set(-0.85 + i * 0.34, 0, 0.1);
    mats.push(m);
    bars.push(b);
    root.add(b);
  });
  // trend line over the bars
  const pts = H.map((h, i) => new Vector3(-0.85 + i * 0.34, -0.56 + h + 0.16, 0.1));
  const trendGeo = new TubeGeometry(new CatmullRomCurve3(pts), 80, 0.012, 6, false);
  const trendMat = glow(LINE, 0.85 * LINE_K);
  mats.push(trendMat);
  root.add(new Mesh(trendGeo, trendMat));
  const total = trendGeo.index ? trendGeo.index.count : 0;
  const dots = pts.map((p, i) => {
    const m = new Mesh(new SphereGeometry(0.035, 12, 12), glow(cols[i]));
    m.position.copy(p);
    mats.push(m.material as Material);
    root.add(m);
    return m;
  });
  const card = new Group();
  const cardBody = new Mesh(new RoundedBoxGeometry(0.9, 0.42, 0.04, 3, 0.05), clay(CLAY[3], 0.3, 0.3));
  mats.push(cardBody.material as Material);
  card.add(cardBody);
  const kpi = new Mesh(new RoundedBoxGeometry(0.5, 0.08, 0.01, 2, 0.02), glow(PASTEL.peach, 0.95));
  kpi.position.set(-0.1, 0.06, 0.03);
  const kpi2 = new Mesh(new RoundedBoxGeometry(0.3, 0.04, 0.01, 2, 0.02), glow(BONE, 0.6));
  kpi2.position.set(-0.2, -0.07, 0.03);
  mats.push(kpi.material as Material, kpi2.material as Material);
  card.add(kpi, kpi2);
  root.add(card);
  root.rotation.set(0.32, -0.5, 0);
  const P = 8;
  return {
    root,
    mats,
    still: 5,
    update: (L, k) => {
      const t = L % P;
      const out = 1 - eInOut(seg(t, 6.6, 7.4));
      bars.forEach((b, i) => {
        const h = H[i] * Math.max(0.02, eBack(seg(t, 0.2 + i * 0.12, 0.9 + i * 0.12)) * out) * (1 + 0.025 * Math.sin(L * 2 + i));
        b.scale.y = h;
        b.position.y = -0.56 + h / 2;
      });
      const draw = eInOut(seg(t, 1.4, 2.6));
      trendGeo.setDrawRange(0, Math.floor((total * draw) / 6) * 6);
      op(trendMat, out, k);
      dots.forEach((d, i) => {
        pop(d, eBack(seg(t, 1.4 + (i / 5) * 1.1, 1.7 + (i / 5) * 1.1)) * (1 + 0.25 * env(t, 1.6 + (i / 5) * 1.1, 1.75 + (i / 5) * 1.1, 1.9 + (i / 5) * 1.1, 2.2 + (i / 5) * 1.1)));
        op(d.material as Material, out, k);
      });
      const ca = eOut(seg(t, 2.4, 3.0));
      card.position.set(0.55, lerp(1.25, 0.8, ca), -0.3);
      op([cardBody.material as Material, kpi.material as Material, kpi2.material as Material], ca * out, k);
      growX(kpi, eOut(seg(t, 2.8, 3.8)), -0.35, 0.5);
      growX(kpi2, eOut(seg(t, 3.1, 3.7)), -0.35, 0.3);
      root.rotation.y = -0.5 + Math.sin(L * 0.3) * 0.18;
    },
  };
}

/** 05 · Redesign: the old wire shell gets scanned and comes out solid, then shines */
function redesign(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const geo = new IcosahedronGeometry(0.95, 1);
  const cutNew = new Plane(new Vector3(-1, 0, 0), 0);
  const cutOld = new Plane(new Vector3(1, 0, 0), 0);
  // DoubleSide so the cut face shows the inside of the shell instead of a hole
  const solid = new MeshStandardMaterial({ color: CLAY[3], roughness: 0.25, metalness: 0.5, flatShading: true, clippingPlanes: [cutNew], transparent: true, side: DoubleSide });
  const wire = new MeshBasicMaterial({ color: LINE, wireframe: true, transparent: true, opacity: 0.35 * LINE_K, clippingPlanes: [cutOld] });
  mats.push(solid, wire);
  const wireMesh = new Mesh(geo, wire);
  root.add(new Mesh(geo, solid), wireMesh);
  const rimMat = glow(PASTEL.violet, 0.95);
  const sweep = new Mesh(new TorusGeometry(1.08, 0.01, 8, 96), rimMat);
  sweep.rotation.y = Math.PI / 2;
  mats.push(rimMat);
  root.add(sweep);
  const halo = new Mesh(new PlaneGeometry(0.012, 2.4), glow(PASTEL.violet, 0.5));
  mats.push(halo.material as Material);
  root.add(halo);
  // the "after" moment: an aurora ring and sparks around the finished piece
  const shineGroup = new Group();
  const shineRing = new Mesh(new TorusGeometry(1.28, 0.008, 8, 120), glow(PASTEL.pink, 0.8));
  shineRing.rotation.x = Math.PI / 2.3;
  mats.push(shineRing.material as Material);
  shineGroup.add(shineRing);
  const sparks = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach, PASTEL.blue, PASTEL.pink].map((c) => {
    const m = new Mesh(new SphereGeometry(0.035, 12, 12), glow(c));
    mats.push(m.material as Material);
    shineGroup.add(m);
    return m;
  });
  const scene = new Group();
  scene.add(shineGroup);
  const holder = new Group();
  holder.add(root, scene);
  const P = 8;
  const cutAt = (t: number) => {
    if (t < 1.3) return -1.12;
    if (t < 3.3) return lerp(-1.12, 1.12, eInOut(seg(t, 1.3, 3.3)));
    if (t < 6.2) return 1.12;
    return lerp(1.12, -1.12, eInOut(seg(t, 6.2, 7.6)));
  };
  return {
    root: holder,
    mats,
    still: 4.6,
    update: (L, k) => {
      const t = L % P;
      const x = cutAt(t);
      cutNew.constant = x;
      cutOld.constant = -x;
      const sweeping = Math.sin(Math.PI * seg(t, 1.3, 3.3)) + Math.sin(Math.PI * seg(t, 6.2, 7.6));
      sweep.position.x = x;
      sweep.scale.setScalar(Math.max(0.05, Math.sqrt(Math.max(0, 1 - (x / 1.08) ** 2))));
      halo.position.x = x;
      op(rimMat, sweeping, k);
      op(halo.material as Material, sweeping, k);
      // the old one flickers a little, like something that needs fixing
      op(wire, 0.8 + 0.2 * Math.sin(L * 19) * (1 - seg(t, 1.3, 2.0)), k);
      wireMesh.position.x = Math.sin(L * 31) * 0.006 * (1 - seg(t, 1.3, 2.0));
      const shine = env(t, 3.2, 3.8, 5.8, 6.3);
      shineRing.scale.setScalar(0.85 + 0.15 * eBack(seg(t, 3.2, 3.8)));
      shineRing.rotation.z = L * 0.5;
      op(shineRing.material as Material, shine, k);
      sparks.forEach((s, i) => {
        const a = L * 0.9 + (i / sparks.length) * Math.PI * 2;
        s.position.set(Math.cos(a) * 1.3, Math.sin(a * 2) * 0.25, Math.sin(a) * 1.3);
        pop(s, 0.4 + 0.6 * shine);
        op(s.material as Material, shine, k);
      });
      root.rotation.y = L * 0.25;
      root.rotation.x = 0.25;
      // keep the cut in world space while the object spins
      const c = Math.cos(root.rotation.y);
      const s = Math.sin(root.rotation.y);
      cutNew.normal.set(-c, 0, s);
      cutOld.normal.set(c, 0, -s);
    },
  };
}

/** 06 · Prototypes: a finger walks through the app; each tap travels to the next screen */
function prototypes(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const phone = new Mesh(new RoundedBoxGeometry(0.8, 1.6, 0.08, 6, 0.12), clay(CLAY[1], 0.3, 0.45));
  mats.push(phone.material as Material);
  root.add(phone);
  const scr = gradientPlane(0.7, 1.46, PASTEL.violet, PASTEL.blue, 0.22);
  scr.mesh.position.z = 0.045;
  mats.push(scr.mat);
  root.add(scr.mesh);
  const flashMat = glow(PASTEL.blue, 0.55);
  const flash = new Mesh(new PlaneGeometry(0.7, 1.46), flashMat);
  flash.position.z = 0.047;
  mats.push(flashMat);
  root.add(flash);
  const pos = [
    new Vector3(-1.25, 0.6, 0.2),
    new Vector3(1.2, 0.5, 0.3),
    new Vector3(-1.1, -0.45, 0.4),
    new Vector3(1.15, -0.55, 0.1),
    new Vector3(0, 1.15, 0.2),
  ];
  const cs = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach, PASTEL.blue];
  const taps = [new Vector3(-0.15, 0.4, 0.08), new Vector3(0.18, 0.15, 0.08), new Vector3(-0.12, -0.15, 0.08), new Vector3(0.14, -0.42, 0.08), new Vector3(0, 0.6, 0.08)];
  const nodes: Mesh[] = [];
  const lineMats: Material[] = [];
  const travellers: Mesh[] = [];
  pos.forEach((p, i) => {
    const n = new Mesh(new RoundedBoxGeometry(0.36, 0.24, 0.05, 3, 0.05), clay(CLAY[3], 0.3, 0.3));
    n.position.copy(p);
    mats.push(n.material as Material);
    const dot = new Mesh(new SphereGeometry(0.035, 12, 12), glow(cs[i]));
    dot.position.set(-0.11, 0, 0.04);
    const bar1 = new Mesh(new BoxGeometry(0.14, 0.025, 0.005), glow(BONE, 0.7));
    bar1.position.set(0.04, 0.03, 0.03);
    const bar2 = new Mesh(new BoxGeometry(0.1, 0.02, 0.005), glow(BONE, 0.4));
    bar2.position.set(0.02, -0.03, 0.03);
    mats.push(dot.material as Material, bar1.material as Material, bar2.material as Material);
    n.add(dot, bar1, bar2);
    nodes.push(n);
    root.add(n);
    const lm = new LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.6 * LINE_K });
    lineMats.push(lm);
    mats.push(lm);
    root.add(new LineSegments(new BufferGeometry().setFromPoints([new Vector3(0, 0, 0.05), p]), lm));
    const tr = new Mesh(new SphereGeometry(0.04, 12, 12), glow(cs[i]));
    mats.push(tr.material as Material);
    travellers.push(tr);
    root.add(tr);
  });
  const cur = cursor();
  const rip = ripple(PASTEL.violet);
  mats.push(...cur.mats, rip.mat);
  root.add(cur.m, rip.m);
  const STEP = 1.5, S0 = 0.6;
  const P = S0 + STEP * pos.length + 1.0;
  return {
    root,
    mats,
    still: S0 + STEP * 1 + 0.8,
    update: (L, k) => {
      const t = L % P;
      const j = Math.max(0, Math.min(pos.length - 1, Math.floor((t - S0 + 0.6) / STEP)));
      // pointer glides between tap points
      const s0 = S0 + j * STEP;
      const prev = j === 0 ? new Vector3(0.9, -1.0, 0.1) : taps[j - 1];
      const m = eInOut(seg(t, s0 - 0.6, s0 - 0.1));
      const press = Math.sin(Math.PI * seg(t, s0 - 0.08, s0 + 0.15));
      cur.m.position.set(lerp(prev.x, taps[j].x, m), lerp(prev.y, taps[j].y, m), 0.14);
      pop(cur.m, 1 - press * 0.15);
      op(cur.mats, env(t, 0, 0.4, P - 1.0, P - 0.6), k);
      const r = seg(t, s0, s0 + 0.55);
      rip.m.position.copy(taps[j]);
      pop(rip.m, 0.5 + r * 2.4);
      op(rip.mat, r > 0 && r < 1 ? 1 - r : 0, k);
      pos.forEach((p, i) => {
        const si = S0 + i * STEP;
        const hl = env(t, si + 0.05, si + 0.25, si + 1.0, si + 1.4);
        op(lineMats[i], 0.25 + 0.75 * hl, k);
        const f = eInOut(seg(t, si + 0.1, si + 0.7));
        travellers[i].position.lerpVectors(taps[i], p, f);
        op(travellers[i].material as Material, f > 0 && f < 1 ? 1 : 0, k);
        const hit = env(t, si + 0.65, si + 0.8, si + 0.95, si + 1.4);
        nodes[i].position.y = p.y + Math.sin(L * 1.3 + i) * 0.04;
        pop(nodes[i], 1 + hit * 0.28);
      });
      // the screen changes colour on each tap
      flashMat.color.copy(cs[j]);
      op(flashMat, env(t, s0 + 0.05, s0 + 0.25, s0 + 0.7, s0 + 1.3), k);
      root.rotation.y = Math.sin(L * 0.3) * 0.25;
    },
  };
}

function gearShape(teeth: number, rOut: number, rIn: number) {
  const s = new Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      [rIn, a],
      [rOut, a + step * 0.15],
      [rOut, a + step * 0.45],
      [rIn, a + step * 0.6],
    ];
    pts.forEach(([r, ang], j) => {
      const x = Math.cos(ang) * r, y = Math.sin(ang) * r;
      if (i === 0 && j === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
  }
  s.closePath();
  const hole = new Shape();
  hole.absarc(0, 0, rIn * 0.35, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

/** 07 · Automation: raw tasks ride in, pass under the machine and come out done, in colour */
function automation(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const specs = [
    { teeth: 14, r: 0.62, x: -0.48, y: 0.22, c: CLAY[3], acc: PASTEL.blue, dir: 1 },
    { teeth: 10, r: 0.45, x: 0.58, y: 0.42, c: CLAY[2], acc: PASTEL.pink, dir: -1.4 },
    { teeth: 8, r: 0.36, x: 0.3, y: -0.5, c: CLAY[4], acc: PASTEL.peach, dir: -1.75 },
  ];
  const gears: { m: Mesh; dir: number }[] = [];
  specs.forEach((g) => {
    const geo = new ExtrudeGeometry(gearShape(g.teeth, g.r, g.r * 0.8), { depth: 0.14, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2, curveSegments: 6 });
    geo.center();
    const mat = clay(g.c, 0.35, 0.55);
    const m = new Mesh(geo, mat);
    m.position.set(g.x, g.y, 0);
    const e = edges(geo, g.acc, 0.5);
    m.add(e.line);
    mats.push(mat, e.mat);
    gears.push({ m, dir: g.dir });
    root.add(m);
  });
  const belt = new Mesh(new RoundedBoxGeometry(3.0, 0.05, 0.36, 2, 0.02), clay(CLAY[1]));
  belt.position.set(0, -1.2, 0.25);
  mats.push(belt.material as Material);
  root.add(belt);
  const beamMat = glow(PASTEL.violet, 0.8);
  const beam = new Mesh(new PlaneGeometry(0.03, 0.42), beamMat);
  beam.position.set(0.05, -0.92, 0.25);
  mats.push(beamMat);
  root.add(beam);
  const cols = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach, PASTEL.blue];
  const items = cols.map((c) => {
    const g = new Group();
    const rawGeo = new RoundedBoxGeometry(0.17, 0.17, 0.17, 2, 0.03);
    const raw = new Mesh(rawGeo, clay(CLAY[4], 0.4, 0.3));
    const re = edges(rawGeo, LINE, 0.5 * LINE_K);
    raw.add(re.line);
    const done = new Mesh(new RoundedBoxGeometry(0.17, 0.17, 0.17, 2, 0.03), glow(c, 0.95));
    mats.push(raw.material as Material, re.mat, done.material as Material);
    g.add(raw, done);
    root.add(g);
    return { g, raw, rawMats: [raw.material as Material, re.mat], done };
  });
  root.rotation.set(-0.15, 0.35, 0);
  root.position.y = 0.1;
  let ang = 0;
  let last = 0;
  return {
    root,
    mats,
    still: 3.2,
    update: (L, k) => {
      const dt = Math.max(0, Math.min(0.1, L - last));
      last = L;
      let near = 0;
      items.forEach((it, i) => {
        const p = ((L * 0.15 + i / items.length) % 1) * 2 - 1;
        const x = p * 1.45;
        const done = seg(x, -0.02, 0.1);
        const hit = Math.max(0, 1 - Math.abs(x - 0.05) / 0.14);
        near = Math.max(near, hit);
        it.g.position.set(x, -1.06 + hit * 0.06, 0.25);
        it.g.rotation.set(0, done * Math.PI * 0.5 + (1 - done) * 0.3, 0);
        const edgeFade = Math.max(0.001, 1 - Math.abs(p) ** 6);
        pop(it.g, edgeFade * (1 + hit * 0.25));
        op(it.rawMats, 1 - done, k);
        op(it.done.material as Material, done, k);
      });
      op(beamMat, 0.25 + 0.75 * near, k);
      beam.scale.x = 1 + near * 2;
      ang += dt * (0.6 + near * 1.6);
      gears.forEach((g) => (g.m.rotation.z = ang * g.dir));
      root.rotation.y = 0.35 + Math.sin(L * 0.3) * 0.15;
    },
  };
}

/** 08 · AI: a question goes in, the network lights up layer by layer, an answer bubble types itself out */
function ai(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const layers = [4, 6, 6, 3];
  const nodes: Vector3[][] = [];
  const nodeMeshes: Mesh[][] = [];
  const cs = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach];
  layers.forEach((n, li) => {
    const col: Vector3[] = [];
    const meshes: Mesh[] = [];
    for (let i = 0; i < n; i++) {
      const p = new Vector3((li - 1.5) * 0.7, (i - (n - 1) / 2) * 0.3, Math.sin(i * 1.7 + li) * 0.15);
      col.push(p);
      const m = new Mesh(
        new SphereGeometry(LIGHT ? 0.07 : 0.06, 24, 24),
        new MeshStandardMaterial({ color: cs[li], emissive: cs[li], emissiveIntensity: LIGHT ? 0 : 0.5, roughness: LIGHT ? 0.75 : 0.3, metalness: 0, envMapIntensity: LIGHT ? 0.15 : 1, transparent: true }),
      );
      m.position.copy(p);
      mats.push(m.material as Material);
      meshes.push(m);
      root.add(m);
    }
    nodes.push(col);
    nodeMeshes.push(meshes);
  });
  const gapMats: Material[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    const seg2: number[] = [];
    const col2: number[] = [];
    nodes[li].forEach((a) =>
      nodes[li + 1].forEach((b) => {
        seg2.push(a.x, a.y, a.z, b.x, b.y, b.z);
        const c1 = cs[li], c2 = cs[li + 1];
        col2.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
      }),
    );
    const lg = new BufferGeometry();
    lg.setAttribute("position", new Float32BufferAttribute(seg2, 3));
    lg.setAttribute("color", new Float32BufferAttribute(col2, 3));
    const lm = new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: LIGHT ? 0.35 : 0.18 });
    mats.push(lm);
    gapMats.push(lm);
    root.add(new LineSegments(lg, lm));
  }
  // signals per gap
  const pulses: { m: Mesh; a: Vector3; b: Vector3; gap: number }[] = [];
  for (let gap = 0; gap < layers.length - 1; gap++) {
    for (let i = 0; i < 6; i++) {
      const a = nodes[gap][i % nodes[gap].length];
      const b = nodes[gap + 1][(i * 3 + gap) % nodes[gap + 1].length];
      const m = new Mesh(new SphereGeometry(0.028, 8, 8), glow(LIGHT ? cs[gap + 1] : BONE));
      mats.push(m.material as Material);
      root.add(m);
      pulses.push({ m, a, b, gap });
    }
  }
  // the question coming in
  const inputs = nodes[0].map((p, i) => {
    const m = new Mesh(new SphereGeometry(0.035, 10, 10), glow(LINE, 0.9));
    mats.push(m.material as Material);
    root.add(m);
    return { m, to: p, from: new Vector3(-1.9, p.y * 0.4 + (i - 1.5) * 0.05, 0.3) };
  });
  // the answer bubble
  const bubble = new Group();
  const body = new Mesh(new RoundedBoxGeometry(1.0, 0.6, 0.06, 4, 0.1), clay(CLAY[3], 0.3, 0.3));
  const tail = new Mesh(new BoxGeometry(0.12, 0.12, 0.05), clay(CLAY[3], 0.3, 0.3));
  tail.rotation.z = Math.PI / 4;
  tail.position.set(-0.42, -0.26, 0);
  mats.push(body.material as Material, tail.material as Material);
  bubble.add(body, tail);
  const lines = [0.72, 0.58, 0.42].map((w, r) => {
    const m = new Mesh(new RoundedBoxGeometry(w, 0.055, 0.01, 2, 0.025), glow(r === 0 ? PASTEL.peach : BONE, r === 0 ? 1 : 0.75));
    m.position.set(-0.38 + w / 2, 0.14 - r * 0.13, 0.04);
    mats.push(m.material as Material);
    bubble.add(m);
    return { m, w };
  });
  const typing = [0, 1, 2].map((i) => {
    const m = new Mesh(new SphereGeometry(0.035, 10, 10), glow(BONE, 0.9));
    m.position.set(-0.1 + i * 0.1, 0, 0.05);
    mats.push(m.material as Material);
    bubble.add(m);
    return m;
  });
  bubble.position.set(1.75, 0.55, 0.25);
  root.add(bubble);
  const core = new Mesh(new TorusGeometry(1.3, 0.006, 8, 120), glow(PASTEL.violet, 0.35));
  core.rotation.x = Math.PI / 2.4;
  mats.push(core.material as Material);
  root.add(core);
  root.scale.setScalar(0.86);
  root.position.x = -0.32;
  const P = 8;
  const L0 = 0.8, GAP = 0.6;
  return {
    root,
    mats,
    still: 5.4,
    update: (L, k) => {
      const t = L % P;
      inputs.forEach((it, i) => {
        const f = eOut(seg(t, 0.05 + i * 0.08, 0.75 + i * 0.08));
        it.m.position.lerpVectors(it.from, it.to, f);
        op(it.m.material as Material, f > 0 && f < 0.98 ? 1 : 0, k);
      });
      nodeMeshes.forEach((meshes, li) => {
        const a0 = L0 + li * GAP;
        const a = li === layers.length - 1 ? env(t, a0, a0 + 0.15, 6.2, 6.8) : env(t, a0, a0 + 0.15, a0 + 0.55, a0 + 1.1);
        meshes.forEach((m, i) => {
          pop(m, 1 + a * 0.5 + 0.06 * Math.sin(L * 2.2 + i));
          if (!LIGHT) (m.material as MeshStandardMaterial).emissiveIntensity = 0.5 + a * 1.2;
        });
      });
      gapMats.forEach((m, gap) => {
        const a0 = L0 + gap * GAP;
        op(m, 0.6 + 1.8 * env(t, a0 + 0.05, a0 + 0.2, a0 + 0.6, a0 + 1.0), k);
      });
      pulses.forEach((p, i) => {
        const a0 = L0 + p.gap * GAP + (i % 6) * 0.03;
        const f = seg(t, a0 + 0.05, a0 + 0.6);
        p.m.position.lerpVectors(p.a, p.b, eInOut(f));
        op(p.m.material as Material, f > 0 && f < 1 ? 1 : 0, k);
      });
      // answer
      const bIn = eBack(seg(t, 2.9, 3.3)) * (1 - eInOut(seg(t, 6.6, 7.2)));
      pop(bubble, Math.max(0.001, bIn));
      bubble.position.y = 0.55 + Math.sin(L * 1.2) * 0.03;
      const thinking = env(t, 3.1, 3.3, 3.75, 3.9);
      typing.forEach((d, i) => {
        d.position.y = Math.max(0, Math.sin(L * 9 - i * 0.8)) * 0.04;
        op(d.material as Material, thinking, k);
      });
      lines.forEach((l, i) => growX(l.m, eOut(seg(t, 3.9 + i * 0.35, 4.5 + i * 0.35)), -0.38, l.w));
      core.rotation.z = L * 0.2;
      root.rotation.y = Math.sin(L * 0.3) * 0.18;
    },
  };
}

// ---------------------------------------------------------------- scene
export async function createServicesScene(container: HTMLElement, opts: { reducedMotion?: boolean; light?: boolean } = {}): Promise<ServicesSceneHandle> {
  const reduce = !!opts.reducedMotion;
  LIGHT = !!opts.light;
  LINE = LIGHT ? INK : BONE;
  LINE_K = LIGHT ? 0.75 : 1;
  CLAY = LIGHT ? CLAY_LIGHT : CLAY_DARK;
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.localClippingEnabled = true;
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  container.appendChild(canvas);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.1, 6.2);

  scene.add(new AmbientLight(0xffffff, LIGHT ? 0.45 : 0.25));
  const key = new DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 4, 5);
  scene.add(key);
  const l1 = new PointLight(PASTEL.blue, 6, 10);
  l1.position.set(-3, 1.5, 2.5);
  const l2 = new PointLight(PASTEL.pink, 5, 10);
  l2.position.set(3, -1.5, 2);
  scene.add(l1, l2);


  const models = [websites(), uiux(), webapps(), systems(), redesign(), prototypes(), automation(), ai()];
  const stage = new Group();
  scene.add(stage);
  const vis = models.map(() => 0);
  models.forEach((m) => {
    m.root.visible = false;
    m.mats.forEach((mt) => {
      mt.userData.base = (mt as MeshBasicMaterial).opacity ?? 1;
      mt.transparent = true;
    });
    stage.add(m.root);
  });
  let active = 0;
  // each story starts from its first frame when its model comes in
  const startAt = models.map(() => 0);
  let started = false;

  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const fit = Math.min(1, camera.aspect / 1.05);
    stage.scale.setScalar(fit);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const pointer = { x: 0, y: 0, cx: 0, cy: 0 };
  // gentle tilt toward the mouse, measured from the model's centre against the whole window
  // and clamped, so a pointer far away (over the text, the other side of the screen) can't flip it
  const clamp1 = (v: number) => Math.max(-1, Math.min(1, v));
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = container.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    pointer.x = clamp1((e.clientX - cx) / (window.innerWidth * 0.5));
    pointer.y = clamp1((e.clientY - cy) / (window.innerHeight * 0.5));
  };
  const onLeave = () => {
    pointer.x = 0;
    pointer.y = 0;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("blur", onLeave);

  let visible = true;
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) kick();
  });
  io.observe(container);

  const clock = new Clock();
  let last = 0;
  let raf = 0;
  const frame = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();
    const dt = Math.min(0.1, t - last);
    last = t;
    models.forEach((m, i) => {
      const target = i === active ? 1 : 0;
      vis[i] += (target - vis[i]) * (reduce ? 1 : 1 - Math.exp(-dt * 6));
      const v = vis[i];
      m.root.visible = v > 0.01;
      if (!m.root.visible) return;
      const e = v * v * (3 - 2 * v);
      stage.children[i].scale.setScalar(0.72 + e * 0.28);
      stage.children[i].position.y = (1 - e) * (i === active ? -0.4 : 0.4);
      m.mats.forEach((mt) => {
        (mt as MeshBasicMaterial).opacity = (mt.userData.base as number) * e;
        mt.visible = e > 0.004;
      });
      m.update(reduce ? (m.still ?? 2) : t - startAt[i], e);
    });
    pointer.cx += (pointer.x - pointer.cx) * 0.06;
    pointer.cy += (pointer.y - pointer.cy) * 0.06;
    stage.rotation.y = pointer.cx * 0.28;
    stage.rotation.x = pointer.cy * 0.1;
    renderer.render(scene, camera);
  };
  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }
  const onVis = () => !document.hidden && kick();
  document.addEventListener("visibilitychange", onVis);
  kick();

  return {
    setActive(i: number) {
      const next = Math.max(0, Math.min(models.length - 1, i));
      if (next !== active || !started) startAt[next] = clock.getElapsedTime();
      started = true;
      active = next;
      kick();
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        const a = o as unknown as { geometry?: BufferGeometry; material?: Material | Material[] };
        a.geometry?.dispose();
        if (Array.isArray(a.material)) a.material.forEach((m) => m.dispose());
        else a.material?.dispose();
      });
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
