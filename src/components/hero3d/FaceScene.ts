import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  Clock,
  Color,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LinearFilter,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  Texture,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

/**
 * Hero face reconstruction.
 * Timeline: particles fly in and assemble the face (with real depth) → a scan line
 * sweeps down and swaps the points for the photo mapped on a displaced mesh →
 * the head follows the cursor, a light rig follows it too → on scroll the face
 * turns back into particles and blows apart.
 */

export type FaceSceneState = "loading" | "assembling" | "scanning" | "live" | "dispersing";

export interface FaceSceneOptions {
  container: HTMLElement; // where the canvas goes (covers the whole hero)
  anchor: HTMLElement; // box the face should sit in (old photo box)
  section: HTMLElement; // hero section, used for scroll progress + visibility
  textureUrl: string;
  depthUrl: string;
  reducedMotion?: boolean;
  lowPower?: boolean;
  onFrame?: (info: { pct: number; state: FaceSceneState; points: number }) => void;
}

export interface FaceSceneHandle {
  dispose: () => void;
  replay: () => void;
}

// Face layout in the source image (uv, v from top)
const HEAD_U = 0.56;
const HEAD_V = 0.36;
const ASPECT = 1024 / 1138; // texture width / height
const FACE_H = 1;
const FACE_W = FACE_H * ASPECT;
const DEPTH = 0.26;

const BLUE = new Color("#3385ff");
const RED = new Color("#ff3d5a");
const ICE = new Color("#dbe6ff");

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    img.src = src;
  });
}

function sample(img: HTMLImageElement, w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true });
  if (!g) throw new Error("Canvas 2D no disponible");
  g.drawImage(img, 0, 0, w, h);
  return g.getImageData(0, 0, w, h).data;
}

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const easeInOut = (x: number) => {
  x = clamp01(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export async function createFaceScene(opts: FaceSceneOptions): Promise<FaceSceneHandle> {
  const { container, anchor, section, reducedMotion = false, lowPower = false, onFrame } = opts;

  const [texImg, depthImg] = await Promise.all([loadImage(opts.textureUrl), loadImage(opts.depthUrl)]);

  const renderer = new WebGLRenderer({ antialias: !lowPower, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 1.75));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const root = new Group(); // placement on the page (scale + position)
  const rig = new Group(); // rotation from the cursor
  root.add(rig);
  scene.add(root);

  // ---------- sample texture + depth on a grid
  const cols = lowPower ? 132 : 196;
  const rows = Math.round(cols / ASPECT);
  const tex = sample(texImg, cols, rows);
  const dep = sample(depthImg, cols, rows);

  const localX = (u: number) => (u - HEAD_U) * FACE_W;
  const localY = (v: number) => (HEAD_V - v) * FACE_H;
  const localZ = (d: number) => (d - 0.55) * DEPTH;

  // ---------- particles
  const pos: number[] = [];
  const start: number[] = [];
  const col: number[] = [];
  const rnd: number[] = [];
  const cellU = 1 / cols;
  const cellV = 1 / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const a = tex[i + 3] / 255;
      if (a < 0.12) continue;
      const r = tex[i] / 255, g = tex[i + 1] / 255, b = tex[i + 2] / 255;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 0.05 && Math.random() < 0.55) continue; // keep the black shirt sparse
      const u = (x + 0.5 + (Math.random() - 0.5) * 0.7) * cellU;
      const v = (y + 0.5 + (Math.random() - 0.5) * 0.7) * cellV;
      const d = dep[i] / 255;
      pos.push(localX(u), localY(v), localZ(d));

      // start somewhere on a wide shell around the head, some from behind the camera plane
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const R = 1.4 + Math.random() * 2.4;
      start.push(R * Math.sin(ph) * Math.cos(th) * 1.6, R * Math.sin(ph) * Math.sin(th), Math.max(-2.6, Math.min(0.5, R * Math.cos(ph) * 0.8 - 0.6)));
      col.push(r, g, b);
      rnd.push(Math.random());
    }
  }
  const count = pos.length / 3;

  const pGeo = new BufferGeometry();
  pGeo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  pGeo.setAttribute("aStart", new Float32BufferAttribute(start, 3));
  pGeo.setAttribute("aColor", new Float32BufferAttribute(col, 3));
  pGeo.setAttribute("aRand", new Float32BufferAttribute(rnd, 1));

  const uniforms = {
    uTime: { value: 0 },
    uAssemble: { value: 0 },
    uScan: { value: 9 },
    uDisperse: { value: 0 },
    uAfter: { value: 0 },
    uPR: { value: renderer.getPixelRatio() },
    uCell: { value: 3 },
    uCamZ: { value: camera.position.z },
    uBlue: { value: BLUE },
    uRed: { value: RED },
    uIce: { value: ICE },
  };

  const pMat = new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute vec3 aStart;
      attribute vec3 aColor;
      attribute float aRand;
      uniform float uTime, uAssemble, uScan, uDisperse, uAfter, uPR, uCell, uCamZ;
      uniform vec3 uBlue, uRed, uIce;
      varying vec3 vCol;
      varying float vAlpha;

      void main() {
        float t = clamp((uAssemble - aRand * 0.6), 0.0, 1.0);
        t = 1.0 - pow(1.0 - t, 3.0);
        vec3 p = mix(aStart, position, t);

        // swirl while travelling
        float sw = 1.0 - t;
        float ang = sw * (2.2 + aRand * 1.5);
        p.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p.xz;
        p.y += sin(uTime * 0.7 + aRand * 31.0) * 0.12 * sw;

        // tiny idle shimmer
        p += 0.0025 * vec3(sin(uTime * 1.7 + aRand * 60.0), cos(uTime * 1.3 + aRand * 40.0), sin(uTime * 1.1 + aRand * 20.0));

        // blow apart on scroll
        vec3 dir = normalize(vec3(position.xy, position.z + 0.35) + 1e-4);
        float dd = uDisperse * uDisperse;
        p += dir * dd * (0.6 + aRand * 1.6);
        p.y += dd * (aRand - 0.35) * 0.9;
        p.x += sin(aRand * 80.0 + uTime) * dd * 0.12;

        float reveal = smoothstep(uScan - 0.012, uScan + 0.012, position.y);
        float band = 1.0 - smoothstep(0.0, 0.016, abs(position.y - uScan));
        float lum = dot(aColor, vec3(0.299, 0.587, 0.114));

        vec3 tint = aRand > 0.9 ? uRed : (aRand > 0.83 ? uIce : uBlue);
        vec3 pre = tint * (0.3 + lum * 2.6);
        vec3 post = aColor * 1.6 + uBlue * 0.2;
        float back = smoothstep(0.0, 0.35, uDisperse);
        vCol = mix(pre, mix(post, pre, back), reveal) + vec3(0.45, 0.6, 1.0) * band;

        float twinkle = 0.55 + 0.45 * sin(uTime * 2.6 + aRand * 90.0);
        float live = mix(0.16, 0.07 * twinkle, uAfter);
        vAlpha = mix(0.85, mix(live, 0.8, back), reveal) + band * 0.45;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float s = uCell * (0.65 + aRand * 0.75) * (1.0 + band * 0.7) * (1.0 + sw * 0.8);
        gl_PointSize = min(s * uPR * (uCamZ / -mv.z), 14.0 * uPR);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vCol;
      varying float vAlpha;
      void main() {
        vec2 d = gl_PointCoord - 0.5;
        float r = length(d);
        if (r > 0.5) discard;
        float a = smoothstep(0.5, 0.05, r);
        gl_FragColor = vec4(vCol, a * vAlpha);
      }
    `,
  });
  const points = new Points(pGeo, pMat);
  points.renderOrder = 2;
  points.frustumCulled = false;

  // ---------- photo on a depth-displaced mesh
  const mGeo = new PlaneGeometry(FACE_W, FACE_H, cols - 1, rows - 1);
  const mPos = mGeo.attributes.position;
  const mUv = mGeo.attributes.uv;
  for (let i = 0; i < mPos.count; i++) {
    const u = mUv.getX(i);
    const v = 1 - mUv.getY(i);
    const gx = Math.min(cols - 1, Math.round(u * (cols - 1)));
    const gy = Math.min(rows - 1, Math.round(v * (rows - 1)));
    const d = dep[(gy * cols + gx) * 4] / 255;
    mPos.setXYZ(i, localX(u), localY(v), localZ(d) - 0.004);
  }
  mGeo.computeVertexNormals();

  const map = new Texture(texImg);
  map.minFilter = LinearFilter;
  map.generateMipmaps = false;
  map.needsUpdate = true;

  const meshUniforms = {
    map: { value: map },
    uScan: uniforms.uScan,
    uTime: uniforms.uTime,
    uFade: { value: 1 },
    uBlue: { value: BLUE },
    uLight: { value: new Vector3(0.4, 0.3, 1) },
  };
  const mMat = new ShaderMaterial({
    uniforms: meshUniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vPos;
      varying vec3 vN;
      void main() {
        vUv = uv;
        vPos = position;
        vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D map;
      uniform float uScan, uFade, uTime;
      uniform vec3 uBlue, uLight;
      varying vec2 vUv;
      varying vec3 vPos;
      varying vec3 vN;
      void main() {
        vec4 tex = texture2D(map, vUv);
        float a = tex.a * smoothstep(uScan - 0.012, uScan + 0.012, vPos.y);
        vec3 n = normalize(vN);
        float key = max(dot(n, normalize(uLight)), 0.0);
        float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.4);
        vec3 c = tex.rgb * (0.9 + key * 0.3);
        c += uBlue * rim * 0.55 * smoothstep(0.02, 0.2, tex.a);
        c *= 1.0 - step(0.5, fract(vPos.y * 320.0 - uTime * 0.6)) * 0.035;
        float band = 1.0 - smoothstep(0.0, 0.014, abs(vPos.y - uScan));
        c += vec3(0.45, 0.65, 1.0) * band * 0.7;
        gl_FragColor = vec4(c, a * uFade);
      }
    `,
  });
  const mesh = new Mesh(mGeo, mMat);
  mesh.renderOrder = 1;
  mesh.frustumCulled = false;

  rig.add(mesh, points);

  // ---------- scan line
  const scanMat = new MeshBasicMaterial({ color: 0xcfe0ff, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
  const scan = new Mesh(new PlaneGeometry(FACE_W * 1.5, 0.0035), scanMat);
  scan.position.z = 0.22;
  scan.renderOrder = 3;
  rig.add(scan);

  // ---------- orbit ring of dots
  const ringPos: number[] = [];
  const ringCol: number[] = [];
  const RING_N = 220;
  for (let i = 0; i < RING_N; i++) {
    const a = (i / RING_N) * Math.PI * 2;
    ringPos.push(Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5);
    const c = i % 11 === 0 ? RED : i % 5 === 0 ? ICE : BLUE;
    ringCol.push(c.r, c.g, c.b);
  }
  const ringGeo = new BufferGeometry();
  ringGeo.setAttribute("position", new Float32BufferAttribute(ringPos, 3));
  ringGeo.setAttribute("color", new Float32BufferAttribute(ringCol, 3));
  const ringMat = new PointsMaterial({ size: 0.008, vertexColors: true, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
  const ring = new Points(ringGeo, ringMat);
  ring.rotation.set(0.38, 0, -0.22);
  ring.position.set(-0.02, 0.02, 0.05);
  rig.add(ring);

  // ---------- floating wireframe details
  const deco: { obj: LineSegments | Mesh; base: Vector3; mat: LineBasicMaterial | MeshBasicMaterial; max: number }[] = [];
  const addDeco = (obj: LineSegments | Mesh, mat: LineBasicMaterial | MeshBasicMaterial, x: number, y: number, z: number, max: number) => {
    obj.position.set(x, y, z);
    obj.scale.setScalar(0.001);
    deco.push({ obj, base: obj.position.clone(), mat, max });
    rig.add(obj);
  };
  const icoMat = new LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0 });
  addDeco(new LineSegments(new EdgesGeometry(new IcosahedronGeometry(0.05, 0)), icoMat), icoMat, -0.42, 0.22, 0.12, 0.85);
  const torMat = new MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0 });
  addDeco(new Mesh(new TorusGeometry(0.026, 0.009, 8, 24), torMat), torMat, -0.32, -0.06, 0.2, 0.6);
  const octMat = new LineBasicMaterial({ color: ICE, transparent: true, opacity: 0 });
  addDeco(new LineSegments(new EdgesGeometry(new OctahedronGeometry(0.026, 0)), octMat), octMat, -0.18, 0.44, -0.05, 0.7);
  const boxMat = new LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0 });
  addDeco(new LineSegments(new EdgesGeometry(new BoxGeometry(0.032, 0.032, 0.032)), boxMat), boxMat, -0.3, -0.4, 0.16, 0.8);

  // ---------- layout: map the anchor box to world units
  let visH = 1;
  const layout = () => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (!cw || !ch) return;
    renderer.setSize(cw, ch, false);
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    const px2w = visH / ch;

    const cr = container.getBoundingClientRect();
    const ar = anchor.getBoundingClientRect();
    const narrow = cw < 1024;
    // face height in CSS px. Desktop matches the old photo crop: bigger than the box,
    // shoulders running below the fold. Mobile: fill the width, shoulders on the bottom edge.
    const faceHpx = narrow
      ? Math.min(ar.height * 1.05, (ar.width * 1.05) / ASPECT)
      : Math.min(ar.height * 1.02, (ar.width * 1.25) / ASPECT);
    const faceWpx = faceHpx * ASPECT;
    const left = ar.left - cr.left + (ar.width - faceWpx) / 2 + (narrow ? 0 : -ar.width * 0.02);
    const top = narrow ? ar.bottom - cr.top - faceHpx * 0.98 : ar.bottom - cr.top + ar.height * 0.14 - faceHpx;
    const headX = left + HEAD_U * faceWpx;
    const headY = top + HEAD_V * faceHpx;

    root.scale.setScalar(faceHpx * px2w);
    root.position.set((headX - cw / 2) * px2w, (ch / 2 - headY) * px2w, 0);
    uniforms.uCell.value = (faceHpx / rows) * 1.05;
    uniforms.uPR.value = renderer.getPixelRatio();
    ringMat.size = 0.006 * faceHpx * px2w;
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(container);
  ro.observe(anchor);
  window.addEventListener("resize", layout);

  // ---------- input
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    const ar = anchor.getBoundingClientRect();
    const cx = ar.left + ar.width / 2;
    const cy = ar.top + ar.height * 0.42;
    target.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.45)));
    target.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.5)));
  };
  const onLeave = () => {
    target.x = 0;
    target.y = 0;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  // ---------- visibility
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
  });
  io.observe(section);
  const onVis = () => {
    if (!document.hidden) kick();
  };
  document.addEventListener("visibilitychange", onVis);

  // ---------- timeline
  const clock = new Clock();
  let t0 = clock.getElapsedTime() - (reducedMotion ? 30 : 0);
  let raf = 0;
  let lastState: FaceSceneState = "loading";
  let lastPct = -1;

  const frame = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(frame);

    const time = clock.getElapsedTime();
    const t = time - t0;
    uniforms.uTime.value = time;

    const asm = clamp01((t - 0.2) / 2.6);
    uniforms.uAssemble.value = asm * 1.6;

    const sc = clamp01((t - 2.9) / 1.8);
    const top = HEAD_V + 0.02;
    const bottom = HEAD_V - 1 - 0.02;
    uniforms.uScan.value = sc <= 0 ? 9 : sc >= 1 ? -9 : top + (bottom - top) * easeInOut(sc);
    uniforms.uAfter.value = clamp01((t - 4.7) / 1.2);
    scan.position.y = uniforms.uScan.value;
    scanMat.opacity = sc > 0 && sc < 1 ? 0.85 : 0;

    // scroll progress through the hero
    const sr = section.getBoundingClientRect();
    const prog = clamp01((-sr.top - sr.height * 0.06) / Math.max(1, sr.height * 0.8));
    const disp = reducedMotion ? 0 : prog * prog * (3 - 2 * prog);
    uniforms.uDisperse.value = disp;
    meshUniforms.uFade.value = 1 - clamp01(disp * 2.2);

    // decorations
    const dIn = easeOut((t - 2.3) / 1.4);
    ringMat.opacity = dIn * 0.7 * (1 - disp);
    ring.rotation.y = time * 0.22;
    ring.scale.setScalar(1 + disp * 0.9);
    deco.forEach((d, i) => {
      d.obj.scale.setScalar(Math.max(0.001, dIn * (1 + disp * 0.6)));
      d.mat.opacity = dIn * d.max * (1 - disp * 0.7);
      d.obj.rotation.x = time * (0.32 + i * 0.07);
      d.obj.rotation.y = time * (0.41 + i * 0.05);
      d.obj.position.set(
        d.base.x * (1 + disp * 0.8),
        d.base.y + Math.sin(time * 0.8 + i * 1.7) * 0.012 + disp * 0.15,
        d.base.z,
      );
    });

    // head follows the cursor, light rig follows harder
    const k = reducedMotion ? 1 : 0.055;
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    const sway = reducedMotion ? 0 : Math.sin(time * 0.33) * 0.06;
    const spinIn = (1 - easeOut(asm)) * 0.9;
    rig.rotation.y = cur.x * 0.42 + sway + spinIn;
    rig.rotation.x = cur.y * 0.16;
    meshUniforms.uLight.value.set(cur.x * 1.2 + 0.25, -cur.y * 0.9 + 0.35, 1);

    renderer.render(scene, camera);

    if (onFrame) {
      const pct = Math.round((asm * 0.55 + sc * 0.45) * 100);
      const state: FaceSceneState = asm < 1 ? "assembling" : sc < 1 ? "scanning" : disp > 0.04 ? "dispersing" : "live";
      if (pct !== lastPct || state !== lastState) {
        lastPct = pct;
        lastState = state;
        onFrame({ pct, state, points: count });
      }
    }
  };
  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }
  kick();

  return {
    replay() {
      t0 = clock.getElapsedTime() - (reducedMotion ? 30 : 0);
      kick();
    },
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        const anyO = o as unknown as { geometry?: BufferGeometry; material?: { dispose: () => void } };
        anyO.geometry?.dispose();
        anyO.material?.dispose();
      });
      map.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
