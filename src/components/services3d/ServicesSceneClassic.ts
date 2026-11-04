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
 * Classic (ambient) version, used by the home page section: each model just floats and loops gently.
 * The /servicios page uses ServicesScene.ts, where every model plays a full story.
 *
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

type Model = { root: Group; update: (t: number, k: number) => void; mats: Material[] };

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

// ---------------------------------------------------------------- models
function websites(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const frame = clay(CLAY[1]);
  mats.push(frame);
  const win = new Mesh(new RoundedBoxGeometry(2.4, 1.6, 0.06, 4, 0.06), frame);
  root.add(win);
  const bar = new Mesh(new RoundedBoxGeometry(2.4, 0.18, 0.07, 3, 0.04), clay(CLAY[3]));
  bar.position.set(0, 0.71, 0.01);
  mats.push(bar.material as Material);
  root.add(bar);
  [PASTEL.pink, PASTEL.peach, PASTEL.peach].forEach((c, i) => {
    const dot = new Mesh(new SphereGeometry(0.025, 12, 12), glow(c));
    dot.position.set(-1.08 + i * 0.08, 0.71, 0.05);
    mats.push(dot.material as Material);
    root.add(dot);
  });
  // layers that float out of the window
  const layers: { o: Object3D; z: number }[] = [];
  const hero = gradientPlane(2.05, 0.62, PASTEL.violet, PASTEL.blue, 0.85);
  hero.mesh.position.set(0, 0.22, 0);
  mats.push(hero.mat);
  layers.push({ o: hero.mesh, z: 0.18 });
  const title = new Mesh(new RoundedBoxGeometry(1.0, 0.09, 0.02, 2, 0.02), glow(BONE, 0.95));
  title.position.set(-0.45, 0.3, 0);
  mats.push(title.material as Material);
  layers.push({ o: title, z: 0.34 });
  const btn = new Mesh(new RoundedBoxGeometry(0.42, 0.12, 0.04, 3, 0.05), glow(PASTEL.blue));
  btn.position.set(-0.74, 0.1, 0);
  mats.push(btn.material as Material);
  layers.push({ o: btn, z: 0.42 });
  for (let i = 0; i < 3; i++) {
    const card = new Mesh(new RoundedBoxGeometry(0.62, 0.42, 0.04, 3, 0.04), clay(CLAY[4], 0.35, 0.3));
    card.position.set(-0.68 + i * 0.68, -0.42, 0);
    mats.push(card.material as Material);
    layers.push({ o: card, z: 0.22 + i * 0.06 });
  }
  layers.forEach((l) => root.add(l.o));
  root.rotation.set(-0.12, 0.42, 0.02);
  return {
    root,
    mats,
    update: (t) => {
      const sep = 0.55 + Math.sin(t * 0.9) * 0.45; // layers breathe in and out of the page
      layers.forEach((l, i) => (l.o.position.z = 0.05 + l.z * sep * 1.6 + Math.sin(t * 1.3 + i) * 0.01));
      root.rotation.y = 0.42 + Math.sin(t * 0.35) * 0.18;
    },
  };
}

function uiux(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const phones: Group[] = [];
  const tints: [Color, Color][] = [
    [PASTEL.blue, PASTEL.violet],
    [PASTEL.violet, PASTEL.pink],
    [PASTEL.pink, PASTEL.peach],
  ];
  tints.forEach(([a, b], i) => {
    const g = new Group();
    const body = new Mesh(new RoundedBoxGeometry(0.78, 1.6, 0.08, 6, 0.12), clay(CLAY[1], 0.3, 0.45));
    mats.push(body.material as Material);
    g.add(body);
    const scr = gradientPlane(0.68, 1.46, a, b, 0.25);
    scr.mesh.position.z = 0.045;
    mats.push(scr.mat);
    g.add(scr.mesh);
    // UI blocks on screen
    for (let r = 0; r < 4; r++) {
      const blk = new Mesh(new RoundedBoxGeometry(r === 0 ? 0.56 : 0.42 - r * 0.04, r === 0 ? 0.32 : 0.07, 0.01, 2, 0.02), glow(BONE, r === 0 ? 0.25 : 0.7));
      blk.position.set(r === 0 ? 0 : -0.07, 0.45 - r * 0.22 - (r ? 0.08 : 0), 0.06);
      mats.push(blk.material as Material);
      g.add(blk);
    }
    const cta = new Mesh(new RoundedBoxGeometry(0.5, 0.11, 0.02, 2, 0.05), glow(PASTEL.blue));
    cta.position.set(0, -0.55, 0.06);
    mats.push(cta.material as Material);
    g.add(cta);
    g.position.set((i - 1) * 0.72, 0, -Math.abs(i - 1) * 0.35);
    g.rotation.y = (i - 1) * -0.38;
    phones.push(g);
    root.add(g);
  });
  return {
    root,
    mats,
    update: (t) => {
      phones.forEach((p, i) => {
        p.position.y = Math.sin(t * 1.1 + i * 1.2) * 0.06;
        p.rotation.y = (i - 1) * -0.38 + Math.sin(t * 0.5) * 0.06;
      });
      root.rotation.y = Math.sin(t * 0.3) * 0.25;
    },
  };
}

function webapps(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const dbMat = clay(CLAY[2], 0.38, 0.35);
  mats.push(dbMat);
  const db = new Group();
  for (let i = 0; i < 3; i++) {
    const c = new Mesh(new CylinderGeometry(0.42, 0.42, 0.22, 48), dbMat);
    c.position.y = i * 0.27;
    db.add(c);
    const ring = new Mesh(new TorusGeometry(0.425, 0.008, 8, 64), glow([PASTEL.blue, PASTEL.violet, PASTEL.pink][i]));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * 0.27 + 0.11;
    mats.push(ring.material as Material);
    db.add(ring);
  }
  db.position.set(-0.95, -0.3, 0);
  root.add(db);
  const server = new Mesh(new RoundedBoxGeometry(0.7, 0.9, 0.5, 4, 0.06), clay(CLAY[2], 0.35, 0.4));
  server.position.set(0.95, 0, 0);
  mats.push(server.material as Material);
  root.add(server);
  for (let i = 0; i < 4; i++) {
    const led = new Mesh(new BoxGeometry(0.44, 0.03, 0.01), glow(i % 2 ? PASTEL.peach : PASTEL.blue, 0.85));
    led.position.set(0.95, 0.3 - i * 0.18, 0.26);
    mats.push(led.material as Material);
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
  // data paths
  const curves = [
    new CatmullRomCurve3([new Vector3(-0.95, 0.35, 0), new Vector3(-0.4, 1.0, 0.2), new Vector3(0, 0.85, -0.15)]),
    new CatmullRomCurve3([new Vector3(0, 0.85, -0.15), new Vector3(0.55, 0.9, 0.2), new Vector3(0.95, 0.45, 0)]),
    new CatmullRomCurve3([new Vector3(0.95, -0.45, 0), new Vector3(0, -0.85, 0.3), new Vector3(-0.95, -0.42, 0)]),
  ];
  const tubeMat = glow(LINE, 0.18 * LINE_K);
  mats.push(tubeMat);
  curves.forEach((c) => root.add(new Mesh(new TubeGeometry(c, 40, 0.008, 6, false), tubeMat)));
  const packets: { m: Mesh; c: CatmullRomCurve3; o: number }[] = [];
  curves.forEach((c, ci) => {
    for (let k = 0; k < 3; k++) {
      const m = new Mesh(new SphereGeometry(0.035, 12, 12), glow([PASTEL.pink, PASTEL.peach, PASTEL.peach][ci]));
      mats.push(m.material as Material);
      root.add(m);
      packets.push({ m, c, o: k / 3 });
    }
  });
  root.scale.setScalar(0.95);
  return {
    root,
    mats,
    update: (t) => {
      packets.forEach((p) => p.m.position.copy(p.c.getPointAt((t * 0.28 + p.o) % 1)));
      root.rotation.y = 0.35 + Math.sin(t * 0.3) * 0.25;
      root.rotation.x = -0.1;
    },
  };
}

function systems(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const base = new Mesh(new RoundedBoxGeometry(2.4, 0.08, 1.4, 4, 0.04), clay(CLAY[1]));
  base.position.y = -0.6;
  mats.push(base.material as Material);
  root.add(base);
  const grid = new LineSegments(
    new EdgesGeometry(new PlaneGeometry(2.2, 1.2, 8, 4)),
    new LineBasicMaterial({ color: BONE, transparent: true, opacity: 0.1 }),
  );
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -0.555;
  mats.push(grid.material as Material);
  root.add(grid);
  const cols = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach, PASTEL.peach, PASTEL.blue];
  const bars: Mesh[] = [];
  cols.forEach((c, i) => {
    const m = new MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.1, emissive: c, emissiveIntensity: LIGHT ? 0.12 : 0.25, transparent: true });
    const b = new Mesh(new RoundedBoxGeometry(0.22, 1, 0.22, 3, 0.04), m);
    b.position.set(-0.85 + i * 0.34, 0, 0.1);
    mats.push(m);
    bars.push(b);
    root.add(b);
  });
  // floating KPI card
  const card = new Mesh(new RoundedBoxGeometry(0.9, 0.42, 0.04, 3, 0.05), clay(CLAY[3], 0.3, 0.3));
  card.position.set(0.55, 0.75, -0.3);
  mats.push(card.material as Material);
  root.add(card);
  const kpi = new Mesh(new RoundedBoxGeometry(0.5, 0.08, 0.01, 2, 0.02), glow(PASTEL.peach, 0.9));
  kpi.position.set(0.45, 0.8, -0.27);
  mats.push(kpi.material as Material);
  root.add(kpi);
  root.rotation.set(0.32, -0.5, 0);
  return {
    root,
    mats,
    update: (t) => {
      bars.forEach((b, i) => {
        const h = 0.35 + (0.5 + 0.5 * Math.sin(t * 1.2 + i * 0.9)) * (0.5 + i * 0.12);
        b.scale.y = h;
        b.position.y = -0.56 + h / 2;
      });
      root.rotation.y = -0.5 + Math.sin(t * 0.3) * 0.25;
    },
  };
}

function redesign(): Model {
  const root = new Group();
  const mats: Material[] = [];
  // old = wireframe, new = satin; a plane sweeps across and swaps one for the other
  const geo = new IcosahedronGeometry(0.95, 1);
  const cutNew = new Plane(new Vector3(-1, 0, 0), 0);
  const cutOld = new Plane(new Vector3(1, 0, 0), 0);
  // DoubleSide so the cut face shows the inside of the shell instead of a hole
  const solid = new MeshStandardMaterial({ color: CLAY[3], roughness: 0.25, metalness: 0.5, flatShading: true, clippingPlanes: [cutNew], transparent: true, side: DoubleSide });
  const wire = new MeshBasicMaterial({ color: LINE, wireframe: true, transparent: true, opacity: 0.35 * LINE_K, clippingPlanes: [cutOld] });
  mats.push(solid, wire);
  root.add(new Mesh(geo, solid), new Mesh(geo, wire));
  const rimMat = glow(PASTEL.violet, 0.9);
  const sweep = new Mesh(new TorusGeometry(1.08, 0.008, 8, 96), rimMat);
  sweep.rotation.y = Math.PI / 2;
  mats.push(rimMat);
  root.add(sweep);
  const halo = new Mesh(new PlaneGeometry(0.012, 2.4), glow(PASTEL.violet, 0.5));
  mats.push(halo.material as Material);
  root.add(halo);
  return {
    root,
    mats,
    update: (t) => {
      const x = Math.sin(t * 0.7) * 1.05;
      cutNew.constant = x;
      cutOld.constant = -x;
      sweep.position.x = x;
      sweep.scale.setScalar(Math.max(0.05, Math.sqrt(Math.max(0, 1 - (x / 1.08) ** 2))));
      halo.position.x = x;
      root.rotation.y = t * 0.25;
      root.rotation.x = 0.25;
      // keep the cut in world space while the object spins
      const c = Math.cos(root.rotation.y);
      const s = Math.sin(root.rotation.y);
      cutNew.normal.set(-c, 0, s);
      cutOld.normal.set(c, 0, -s);
    },
  };
}

function prototypes(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const phone = new Mesh(new RoundedBoxGeometry(0.8, 1.6, 0.08, 6, 0.12), clay(CLAY[1], 0.3, 0.45));
  mats.push(phone.material as Material);
  root.add(phone);
  const scr = gradientPlane(0.7, 1.46, PASTEL.peach, PASTEL.blue, 0.22);
  scr.mesh.position.z = 0.045;
  mats.push(scr.mat);
  root.add(scr.mesh);
  // flow nodes around the phone
  const nodes: Mesh[] = [];
  const pos = [
    new Vector3(-1.25, 0.6, 0.2),
    new Vector3(-1.1, -0.45, 0.4),
    new Vector3(1.2, 0.5, 0.3),
    new Vector3(1.15, -0.55, 0.1),
    new Vector3(0, 1.15, 0.2),
  ];
  const cs = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach, PASTEL.peach];
  const lineMat = new LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.35 * LINE_K });
  mats.push(lineMat);
  pos.forEach((p, i) => {
    const n = new Mesh(new RoundedBoxGeometry(0.36, 0.24, 0.05, 3, 0.05), clay(CLAY[3], 0.3, 0.3));
    n.position.copy(p);
    mats.push(n.material as Material);
    const dot = new Mesh(new SphereGeometry(0.035, 12, 12), glow(cs[i]));
    dot.position.set(-0.11, 0, 0.04);
    mats.push(dot.material as Material);
    n.add(dot);
    nodes.push(n);
    root.add(n);
    const g = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0.05), p]);
    root.add(new LineSegments(g, lineMat));
  });
  const tap = new Mesh(new TorusGeometry(0.08, 0.01, 8, 32), glow(BONE));
  tap.position.set(0.1, -0.2, 0.07);
  mats.push(tap.material as Material);
  root.add(tap);
  return {
    root,
    mats,
    update: (t, k) => {
      nodes.forEach((n, i) => {
        n.position.y = pos[i].y + Math.sin(t * 1.3 + i) * 0.05;
        n.scale.setScalar(1 + Math.max(0, Math.sin(t * 2 - i * 1.2)) * 0.12);
      });
      const p = (t * 0.8) % 1;
      tap.scale.setScalar(0.6 + p * 1.8);
      (tap.material as MeshBasicMaterial).opacity = (1 - p) * k;
      root.rotation.y = Math.sin(t * 0.35) * 0.35;
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

function automation(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const specs = [
    { teeth: 14, r: 0.62, x: -0.48, y: 0.12, c: CLAY[3], acc: PASTEL.blue, dir: 1 },
    { teeth: 10, r: 0.45, x: 0.58, y: 0.32, c: CLAY[2], acc: PASTEL.pink, dir: -1.4 },
    { teeth: 8, r: 0.36, x: 0.3, y: -0.6, c: CLAY[4], acc: PASTEL.peach, dir: -1.75 },
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
  // conveyor of tasks
  const items: Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const b = new Mesh(new RoundedBoxGeometry(0.16, 0.16, 0.16, 2, 0.03), glow([PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach, PASTEL.peach][i], 0.9));
    mats.push(b.material as Material);
    items.push(b);
    root.add(b);
  }
  root.rotation.set(-0.15, 0.35, 0);
  return {
    root,
    mats,
    update: (t) => {
      gears.forEach((g) => (g.m.rotation.z = t * 0.6 * g.dir));
      items.forEach((b, i) => {
        const p = ((t * 0.18 + i / items.length) % 1) * 2 - 1;
        b.position.set(p * 1.4, -1.05, 0.25);
        b.rotation.set(t + i, t * 0.7, 0);
        b.scale.setScalar(Math.max(0.001, 1 - Math.abs(p) ** 6));
      });
      root.rotation.y = 0.35 + Math.sin(t * 0.3) * 0.2;
    },
  };
}

function ai(): Model {
  const root = new Group();
  const mats: Material[] = [];
  const layers = [4, 6, 6, 3];
  const nodes: Vector3[][] = [];
  const nodeMeshes: Mesh[] = [];
  const cs = [PASTEL.blue, PASTEL.violet, PASTEL.pink, PASTEL.peach];
  layers.forEach((n, li) => {
    const col: Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const p = new Vector3((li - 1.5) * 0.75, (i - (n - 1) / 2) * 0.32, Math.sin(i * 1.7 + li) * 0.15);
      col.push(p);
      const m = new Mesh(new SphereGeometry(LIGHT ? 0.07 : 0.06, 24, 24), new MeshStandardMaterial({ color: cs[li], emissive: cs[li], emissiveIntensity: LIGHT ? 0 : 0.6, roughness: LIGHT ? 0.75 : 0.3, metalness: 0, envMapIntensity: LIGHT ? 0.15 : 1, transparent: true }));
      m.position.copy(p);
      mats.push(m.material as Material);
      nodeMeshes.push(m);
      root.add(m);
    }
    nodes.push(col);
  });
  const seg: number[] = [];
  const segCol: number[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    nodes[li].forEach((a) =>
      nodes[li + 1].forEach((b) => {
        seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
        const c1 = cs[li], c2 = cs[li + 1];
        segCol.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
      }),
    );
  }
  const lg = new BufferGeometry();
  lg.setAttribute("position", new Float32BufferAttribute(seg, 3));
  lg.setAttribute("color", new Float32BufferAttribute(segCol, 3));
  const lm = new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: LIGHT ? 0.5 : 0.22 });
  mats.push(lm);
  root.add(new LineSegments(lg, lm));
  // signals travelling through the network
  const pulses: { m: Mesh; a: Vector3; b: Vector3; o: number }[] = [];
  for (let i = 0; i < 14; i++) {
    const li = i % (layers.length - 1);
    const a = nodes[li][i % nodes[li].length];
    const b = nodes[li + 1][(i * 3) % nodes[li + 1].length];
    const m = new Mesh(new SphereGeometry(0.025, 8, 8), glow(LIGHT ? PASTEL.violet : BONE));
    mats.push(m.material as Material);
    root.add(m);
    pulses.push({ m, a, b, o: i / 14 });
  }
  const core = new Mesh(new TorusGeometry(1.35, 0.006, 8, 120), glow(PASTEL.violet, 0.4));
  core.rotation.x = Math.PI / 2.4;
  mats.push(core.material as Material);
  root.add(core);
  return {
    root,
    mats,
    update: (t) => {
      pulses.forEach((p) => {
        const f = (t * 0.6 + p.o) % 1;
        p.m.position.lerpVectors(p.a, p.b, f);
      });
      nodeMeshes.forEach((m, i) => m.scale.setScalar(1 + Math.max(0, Math.sin(t * 2.2 + i * 0.7)) * 0.35));
      core.rotation.z = t * 0.2;
      root.rotation.y = Math.sin(t * 0.35) * 0.45;
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
  const onMove = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

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
      m.update(reduce ? 1.2 : t, e);
    });
    pointer.cx += (pointer.x - pointer.cx) * 0.06;
    pointer.cy += (pointer.y - pointer.cy) * 0.06;
    stage.rotation.y = pointer.cx * 0.35;
    stage.rotation.x = pointer.cy * 0.15;
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
      active = Math.max(0, Math.min(models.length - 1, i));
      kick();
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
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
