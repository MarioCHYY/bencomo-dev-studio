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
  Matrix4,
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
  Vector4,
  WebGLRenderer,
} from "three";

/**
 * Page-wide particle system.
 *
 * Hero: particles fly in and assemble the face (real depth) → a scan line swaps
 * the points for the photo on a displaced mesh → the head follows the cursor.
 *
 * Scroll: the face blows apart and the same particles travel down the page with
 * you, re-forming into one shape per section:
 *   0 face · 1 planet (about) · 2 wave field (work) · 3 torus knot (services) · 4 galaxy (cta)
 * The canvas is fixed to the viewport, so the morph is driven purely by scroll position.
 */

export type FaceSceneState = "loading" | "assembling" | "scanning" | "live" | "dispersing";

export interface FaceSceneOptions {
  container: HTMLElement; // fixed, full-viewport layer
  anchor: HTMLElement; // box the face sits in (old photo box)
  section?: HTMLElement; // hero section (kept for API compatibility)
  /** Elements whose vertical centre is where shapes 1..4 are fully formed. Missing ones are skipped. */
  getSections: () => (HTMLElement | null)[];
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
const ASPECT = 1024 / 1138;
const FACE_H = 1;
const FACE_W = FACE_H * ASPECT;
const DEPTH = 0.26;
const SHAPES = 4;

// Soft versions of the hero's RGB dots
const BLUE = new Color("#8fb0ff");
const RED = new Color("#ff9aa8");
const ICE = new Color("#e8eeff");
const GREEN = new Color("#a4efc8");

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
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const easeInOut = (x: number) => {
  x = clamp01(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

// ---------- section shapes (unit-sized, centred on the origin)
function planet(out: number[]) {
  if (Math.random() < 0.72) {
    // uniform sphere shell with a little thickness
    const yy = 1 - 2 * Math.random();
    const th = Math.random() * Math.PI * 2;
    const rad = 1 + (Math.random() - 0.5) * 0.04;
    const s = Math.sqrt(1 - yy * yy);
    out.push(Math.cos(th) * s * rad, yy * rad, Math.sin(th) * s * rad);
  } else {
    // flat ring, saturn style
    const th = Math.random() * Math.PI * 2;
    const rr = 1.45 + Math.pow(Math.random(), 0.7) * 0.55;
    out.push(Math.cos(th) * rr, (Math.random() - 0.5) * 0.03, Math.sin(th) * rr);
  }
}
function waveField(out: number[]) {
  out.push((Math.random() * 2 - 1) * 1.7, 0, (Math.random() * 2 - 1) * 1.0);
}
// two thin orbits that frame the services 3D render
function orbits(out: number[]) {
  const a = Math.random() * Math.PI * 2;
  const outer = Math.random() < 0.62;
  const r = (outer ? 1.0 : 0.78) + (Math.random() - 0.5) * 0.03;
  const x = Math.cos(a) * r, z = Math.sin(a) * r;
  const y = (Math.random() - 0.5) * 0.015;
  if (outer) out.push(x, y, z);
  else {
    // inner orbit tilted the other way
    const t = 0.5;
    out.push(x, y * Math.cos(t) - z * Math.sin(t), y * Math.sin(t) + z * Math.cos(t));
  }
}
function galaxy(out: number[]) {
  const arms = 3;
  const arm = Math.floor(Math.random() * arms);
  const r = Math.pow(Math.random(), 0.65) * 1.25;
  const spin = r * 3.1;
  const scatter = (1 - r / 1.4) * 0.18 + 0.04;
  const a = (arm / arms) * Math.PI * 2 + spin + (Math.random() - 0.5) * 0.5;
  out.push(
    Math.cos(a) * r + (Math.random() - 0.5) * scatter,
    (Math.random() - 0.5) * scatter * 0.6,
    Math.sin(a) * r + (Math.random() - 0.5) * scatter,
  );
}

export async function createFaceScene(opts: FaceSceneOptions): Promise<FaceSceneHandle> {
  const { container, anchor, getSections, reducedMotion = false, lowPower = false, onFrame } = opts;

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

  const root = new Group(); // face placement (follows the anchor box as the page scrolls)
  const rig = new Group(); // face rotation from the cursor
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
      if (lum < 0.05 && Math.random() < 0.55) continue;
      const u = (x + 0.5 + (Math.random() - 0.5) * 0.7) * cellU;
      const v = (y + 0.5 + (Math.random() - 0.5) * 0.7) * cellV;
      const d = dep[i] / 255;
      pos.push(localX(u), localY(v), localZ(d));
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const R = 1.4 + Math.random() * 2.4;
      start.push(R * Math.sin(ph) * Math.cos(th) * 1.6, R * Math.sin(ph) * Math.sin(th), Math.max(-2.6, Math.min(0.5, R * Math.cos(ph) * 0.8 - 0.6)));
      col.push(r, g, b);
      rnd.push(Math.random());
    }
  }
  const count = pos.length / 3;

  const s1: number[] = [], s2: number[] = [], s3: number[] = [], s4: number[] = [];
  for (let i = 0; i < count; i++) {
    planet(s1);
    waveField(s2);
    orbits(s3);
    galaxy(s4);
  }

  const pGeo = new BufferGeometry();
  pGeo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  pGeo.setAttribute("aStart", new Float32BufferAttribute(start, 3));
  pGeo.setAttribute("aColor", new Float32BufferAttribute(col, 3));
  pGeo.setAttribute("aRand", new Float32BufferAttribute(rnd, 1));
  pGeo.setAttribute("aS1", new Float32BufferAttribute(s1, 3));
  pGeo.setAttribute("aS2", new Float32BufferAttribute(s2, 3));
  pGeo.setAttribute("aS3", new Float32BufferAttribute(s3, 3));
  pGeo.setAttribute("aS4", new Float32BufferAttribute(s4, 3));

  const xf = [new Vector4(), new Vector4(), new Vector4(), new Vector4(), new Vector4()];
  const uniforms = {
    uTime: { value: 0 },
    uAssemble: { value: 0 },
    uScan: { value: 9 },
    uAfter: { value: 0 },
    uMorph: { value: 0 },
    uScatter: { value: 1 },
    uPR: { value: renderer.getPixelRatio() },
    uCell: { value: 3 },
    uShapeSize: { value: 2.2 },
    uShapeAlpha: { value: 0.6 },
    uKeep: { value: 0.35 }, // share of particles kept once they leave the face (cleaner shapes)
    uAspect: { value: 1 },
    uCamZ: { value: camera.position.z },
    uFace: { value: new Matrix4() },
    uXf: { value: xf }, // per shape: centre x, centre y, scale, tilt (rad)
    uMouse: { value: new Vector3() },
    uPointer: { value: new Vector3(0, 0, 0) }, // cursor on the z=0 plane (x, y) + repel radius
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
      attribute vec3 aS1;
      attribute vec3 aS2;
      attribute vec3 aS3;
      attribute vec3 aS4;
      uniform float uTime, uAssemble, uScan, uAfter, uMorph, uScatter, uPR, uCell, uShapeSize, uShapeAlpha, uCamZ, uKeep, uAspect;
      uniform mat4 uFace;
      uniform vec4 uXf[5];
      uniform vec3 uMouse;
      uniform vec3 uPointer;
      varying vec3 vCol;
      varying float vAlpha;
      varying float vAngle;
      varying float vStretch;

      mat3 rotY(float a){ float c=cos(a), s=sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
      mat3 rotX(float a){ float c=cos(a), s=sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }

      // The hero's RGB dot gradient, spread softly across the screen and drifting slowly. Pastel, not neon.
      vec3 field(vec2 ndc) {
        // mostly blue → violet, warming to pink/peach towards the bottom-right, mint at the bottom-left
        float d = clamp((ndc.x - ndc.y + 2.0) * 0.25 + sin(uTime * 0.15) * 0.04, 0.0, 1.0);
        vec3 c1 = vec3(0.50, 0.66, 1.00);
        vec3 c2 = vec3(0.68, 0.62, 1.00);
        vec3 c3 = vec3(1.00, 0.62, 0.74);
        vec3 c4 = vec3(1.00, 0.80, 0.58);
        vec3 col = d < 0.55 ? mix(c1, c2, d / 0.55) : (d < 0.8 ? mix(c2, c3, (d - 0.55) / 0.25) : mix(c3, c4, (d - 0.8) / 0.2));
        float g = clamp((-ndc.x - ndc.y) * 0.5, 0.0, 1.0);
        return mix(col, vec3(0.62, 0.95, 0.80), smoothstep(0.35, 1.0, g) * 0.55);
      }
      vec2 toNdc(vec3 w) {
        vec4 c = projectionMatrix * viewMatrix * vec4(w, 1.0);
        return c.xy / c.w;
      }

      vec3 place(int k, vec3 p, float spin) {
        vec4 x = uXf[k];
        p = rotY(spin + uMouse.x * 0.35) * p;
        p = rotX(x.w + uMouse.y * 0.18) * p;
        return vec3(x.x, x.y, 0.0) + p * x.z;
      }

      vec3 shapeWorld(int k) {
        if (k == 1) return place(1, aS1, uTime * 0.1);
        if (k == 2) {
          vec3 p = aS2;
          p.y = sin(p.x * 3.2 + uTime * 0.8) * 0.09 + cos(p.z * 4.1 + uTime * 0.6) * 0.07
              + sin((p.x + p.z) * 6.0 - uTime * 1.1) * 0.025;
          return place(2, p, 0.0);
        }
        if (k == 3) return place(3, aS3, uTime * 0.15);
        return place(4, aS4, -uTime * 0.06);
      }

      void main() {
        // ---- face (shape 0), in face-local space then into the world
        float t = clamp((uAssemble - aRand * 0.6), 0.0, 1.0);
        t = 1.0 - pow(1.0 - t, 3.0);
        vec3 fp = mix(aStart, position, t);
        float sw = 1.0 - t;
        float ang = sw * (2.2 + aRand * 1.5);
        fp.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * fp.xz;
        fp.y += sin(uTime * 0.7 + aRand * 31.0) * 0.12 * sw;
        fp += 0.0025 * vec3(sin(uTime * 1.7 + aRand * 60.0), cos(uTime * 1.3 + aRand * 40.0), sin(uTime * 1.1 + aRand * 20.0));
        vec3 faceW = (uFace * vec4(fp, 1.0)).xyz;

        // ---- scroll morph between consecutive shapes
        float m = clamp(uMorph, 0.0, 4.0);
        int k0 = int(floor(m));
        if (k0 > 3) k0 = 3;
        float f = m - float(k0);
        f = clamp(f * 1.45 - aRand * 0.45, 0.0, 1.0);
        f = f * f * (3.0 - 2.0 * f);

        vec3 A = k0 == 0 ? faceW : shapeWorld(k0);
        vec3 B = shapeWorld(k0 + 1);
        vec3 p = mix(A, B, f);
        float burst = sin(f * 3.14159);
        vec3 rd = normalize(aStart + vec3(0.001));
        p += rd * burst * uScatter * (0.35 + aRand * 0.9);
        p.y += burst * (aRand - 0.5) * uScatter * 0.5;

        float leaveFace = k0 == 0 ? smoothstep(0.0, 0.35, f) : 1.0;

        // ---- cursor pushes the field away (not the face)
        vec2 dP = p.xy - uPointer.xy;
        float rP = length(dP);
        float push = (1.0 - smoothstep(0.0, uPointer.z, rP)) * leaveFace;
        p.xy += (dP / max(rP, 1e-4)) * push * uPointer.z * 0.45;

        vec2 ndc = toNdc(p);
        vec3 fieldCol = field(ndc);

        // ---- colour + alpha
        float reveal = smoothstep(uScan - 0.012, uScan + 0.012, position.y);
        float band = 1.0 - smoothstep(0.0, 0.016, abs(position.y - uScan));
        float lum = dot(aColor, vec3(0.299, 0.587, 0.114));
        vec3 pre = fieldCol * (0.3 + lum * 1.9);
        vec3 post = aColor * 1.55 + fieldCol * 0.08;
        vec3 faceCol = mix(pre, post, reveal) + vec3(0.85, 0.9, 1.0) * band * 0.5;
        float twinkle = 0.6 + 0.4 * sin(uTime * 2.2 + aRand * 90.0);
        float faceAlpha = mix(0.8, mix(0.14, 0.06 * twinkle, uAfter), reveal) + band * 0.4;

        float keep = step(fract(aRand * 7.31), uKeep);
        vec3 shapeCol = fieldCol * (0.8 + 0.2 * twinkle);
        float shapeAlpha = mix(0.75, uShapeAlpha * twinkle, abs(f * 2.0 - 1.0));
        vCol = mix(faceCol, shapeCol, leaveFace);
        vAlpha = mix(faceAlpha, shapeAlpha * keep, leaveFace);

        // ---- dashes: point away from the cursor at rest, along the flight while moving
        vec2 pN = toNdc(vec3(uPointer.xy, 0.0));
        vec2 radial = (ndc - pN) * vec2(uAspect, 1.0);
        vec2 travel = (toNdc(B) - toNdc(A)) * vec2(uAspect, 1.0);
        vec2 dir = normalize(radial + 1e-4);
        if (length(travel) > 1e-4) dir = normalize(mix(dir, normalize(travel), clamp(burst * 1.6, 0.0, 1.0)));
        vAngle = atan(dir.y, dir.x);
        vStretch = mix(1.0, 2.6 + burst * 2.2, leaveFace);

        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float faceSize = uCell * (0.65 + aRand * 0.75) * (1.0 + band * 0.7) * (1.0 + sw * 0.8);
        float shapeSize = uShapeSize * (0.7 + aRand * 0.6) * vStretch;
        float s = mix(faceSize, shapeSize, leaveFace);
        gl_PointSize = min(s * uPR * (uCamZ / -mv.z), 24.0 * uPR);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vCol;
      varying float vAlpha;
      varying float vAngle;
      varying float vStretch;
      void main() {
        if (vAlpha < 0.003) discard;
        vec2 c = gl_PointCoord - 0.5;
        c.y = -c.y;
        float ca = cos(vAngle), sa = sin(vAngle);
        c = vec2(ca * c.x + sa * c.y, -sa * c.x + ca * c.y);
        float hw = 0.5 / vStretch;
        float dx = max(abs(c.x) - (0.5 - hw), 0.0);
        float d = length(vec2(dx, c.y));
        if (d > hw) discard;
        float a = smoothstep(hw, hw * 0.35, d);
        gl_FragColor = vec4(vCol, a * vAlpha);
      }
    `,
  });
  const points = new Points(pGeo, pMat);
  points.renderOrder = 2;
  points.frustumCulled = false;
  scene.add(points);

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
        c += uBlue * rim * 0.4 * smoothstep(0.02, 0.2, tex.a);
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
  rig.add(mesh);

  // ---------- scan line
  const scanMat = new MeshBasicMaterial({ color: 0xcfe0ff, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
  const scan = new Mesh(new PlaneGeometry(FACE_W * 1.5, 0.0035), scanMat);
  scan.position.z = 0.22;
  scan.renderOrder = 3;
  rig.add(scan);

  // ---------- orbit ring of dots around the head
  const ringPos: number[] = [];
  const ringCol: number[] = [];
  const RING_N = 220;
  for (let i = 0; i < RING_N; i++) {
    const a = (i / RING_N) * Math.PI * 2;
    ringPos.push(Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5);
    const c = new Color().setHSL((0.6 + i / RING_N) % 1, 0.65, 0.78);
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
  addDeco(new LineSegments(new EdgesGeometry(new IcosahedronGeometry(0.05, 0)), icoMat), icoMat, -0.35, 0.3, 0.12, 0.85);
  const torMat = new MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0 });
  addDeco(new Mesh(new TorusGeometry(0.026, 0.009, 8, 24), torMat), torMat, -0.32, -0.06, 0.2, 0.6);
  const octMat = new LineBasicMaterial({ color: ICE, transparent: true, opacity: 0 });
  addDeco(new LineSegments(new EdgesGeometry(new OctahedronGeometry(0.026, 0)), octMat), octMat, -0.46, -0.3, -0.05, 0.7);
  const boxMat = new LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0 });
  addDeco(new LineSegments(new EdgesGeometry(new BoxGeometry(0.032, 0.032, 0.032)), boxMat), boxMat, 0.28, 0.36, 0.1, 0.8);

  // ---------- layout
  let cw = 1, ch = 1, visH = 1, visW = 1, px2w = 1, narrow = false;
  let faceHpx = 1, faceWpx = 1;
  const resize = () => {
    cw = container.clientWidth || window.innerWidth;
    ch = container.clientHeight || window.innerHeight;
    renderer.setSize(cw, ch, false);
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    visW = visH * camera.aspect;
    px2w = visH / ch;
    narrow = cw < 1024;
    uniforms.uPR.value = renderer.getPixelRatio();

    // where each section shape lives on screen (world units, centre of viewport = 0,0)
    const u = Math.min(visH, visW * 0.9);
    if (narrow) {
      xf[1].set(0, visH * 0.05, u * 0.22, 0.35);
      xf[2].set(0, -visH * 0.3, visW * 0.6, 1.0);
      xf[3].set(0, visH * 0.2, u * 0.34, 1.25);
      xf[4].set(0, 0, u * 0.36, 1.05);
      uniforms.uShapeAlpha.value = 0.5;
      uniforms.uShapeSize.value = 1.9;
      uniforms.uKeep.value = 0.26;
    } else {
      xf[1].set(visW * 0.3, -visH * 0.06, u * 0.24, 0.38);
      xf[2].set(0, -visH * 0.32, visW * 0.5, 1.0);
      xf[3].set(visW * 0.24, -visH * 0.02, u * 0.33, 1.25);
      xf[4].set(0, -visH * 0.02, u * 0.42, 1.08);
      uniforms.uShapeAlpha.value = 0.62;
      uniforms.uShapeSize.value = 2.1;
      uniforms.uKeep.value = 0.3;
    }
    uniforms.uScatter.value = visH * 0.32;
    uniforms.uAspect.value = camera.aspect;
  };
  const placeFace = () => {
    const ar = anchor.getBoundingClientRect();
    faceHpx = narrow
      ? Math.min(ar.height * 1.05, (ar.width * 1.05) / ASPECT)
      : Math.min(ar.height * 1.02, (ar.width * 1.25) / ASPECT);
    faceWpx = faceHpx * ASPECT;
    const left = ar.left + (ar.width - faceWpx) / 2 + (narrow ? 0 : -ar.width * 0.02);
    const top = narrow ? ar.bottom - faceHpx * 0.98 : ar.bottom + ar.height * 0.14 - faceHpx;
    const headX = left + HEAD_U * faceWpx;
    const headY = top + HEAD_V * faceHpx;
    root.scale.setScalar(faceHpx * px2w);
    root.position.set((headX - cw / 2) * px2w, (ch / 2 - headY) * px2w, 0);
    uniforms.uCell.value = (faceHpx / rows) * 1.05;
    ringMat.size = 0.006 * faceHpx * px2w;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  window.addEventListener("resize", resize);

  // ---------- scroll → morph value
  const morphFromScroll = () => {
    const vh = window.innerHeight;
    const y = window.scrollY;
    const keys: number[] = [0];
    const els = getSections();
    for (let i = 0; i < SHAPES; i++) {
      const el = els[i];
      if (!el) break;
      const r = el.getBoundingClientRect();
      const k = y + r.top + Math.min(r.height, vh) / 2 - vh / 2;
      if (k <= keys[keys.length - 1]) break;
      keys.push(k);
    }
    // hold the face for the first bit of scroll so the hero can breathe
    const hold = vh * 0.06;
    if (y <= hold || keys.length < 2) return 0;
    for (let i = 0; i < keys.length - 1; i++) {
      const b = keys[i + 1];
      // after leaving the face, only fly during the last screen before the next section
      const a = i === 0 ? hold : Math.max(keys[i], b - vh * 1.1);
      if (y < b) {
        if (y < a) return i;
        const f = (y - a) / (b - a);
        return i + smooth(0.08, 0.92, f);
      }
    }
    return keys.length - 1;
  };

  // ---------- input
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  const ptr = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 };
  const onMove = (e: PointerEvent) => {
    ptr.tx = ((e.clientX / Math.max(1, cw)) * 2 - 1) * (visW / 2);
    ptr.ty = (1 - (e.clientY / Math.max(1, ch)) * 2) * (visH / 2);
    ptr.tr = e.pointerType === "mouse" ? visH * 0.11 : 0;
    target.x = Math.max(-1, Math.min(1, (e.clientX - window.innerWidth * 0.35) / (window.innerWidth * 0.45)));
    target.y = Math.max(-1, Math.min(1, (e.clientY - window.innerHeight * 0.45) / (window.innerHeight * 0.5)));
  };
  const onLeave = () => {
    target.x = 0;
    target.y = 0;
    ptr.tr = 0;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  // ---------- loop
  const clock = new Clock();
  let t0 = clock.getElapsedTime() - (reducedMotion ? 30 : 0);
  let raf = 0;
  let lastState: FaceSceneState = "loading";
  let lastPct = -1;
  let morph = 0;
  let lastTime = 0;

  const frame = () => {
    raf = 0;
    if (document.hidden) return;
    raf = requestAnimationFrame(frame);

    const time = clock.getElapsedTime();
    const dt = Math.min(1, Math.max(0, time - lastTime));
    lastTime = time;
    const t = time - t0;
    uniforms.uTime.value = reducedMotion ? 0 : time;

    // intro timeline
    const asm = clamp01((t - 0.2) / 2.6);
    uniforms.uAssemble.value = asm * 1.6;
    const sc = clamp01((t - 2.9) / 1.8);
    const top = HEAD_V + 0.02;
    const bottom = HEAD_V - 1 - 0.02;
    uniforms.uScan.value = sc <= 0 ? 9 : sc >= 1 ? -9 : top + (bottom - top) * easeInOut(sc);
    uniforms.uAfter.value = clamp01((t - 4.7) / 1.2);
    scan.position.y = uniforms.uScan.value;
    scanMat.opacity = sc > 0 && sc < 1 ? 0.85 : 0;

    // scroll morph (eased so fast flicks still look like a flight)
    const targetMorph = morphFromScroll();
    morph += (targetMorph - morph) * (reducedMotion ? 1 : 1 - Math.exp(-dt * 5.5));
    if (Math.abs(targetMorph - morph) < 0.0005) morph = targetMorph;
    // during the intro, keep the face until it has been built
    const m = asm < 1 ? Math.min(morph, 0.0) : morph;
    uniforms.uMorph.value = m;
    uniforms.uScatter.value = reducedMotion ? 0 : visH * 0.32;

    const faceOn = 1 - smooth(0.0, 0.3, m);
    meshUniforms.uFade.value = faceOn * faceOn;

    // face follows its box on the page
    placeFace();

    // cursor
    const k = reducedMotion ? 1 : 0.055;
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    const sway = reducedMotion ? 0 : Math.sin(time * 0.33) * 0.06;
    const spinIn = (1 - easeOut(asm)) * 0.9;
    rig.rotation.y = cur.x * 0.42 + sway + spinIn;
    rig.rotation.x = cur.y * 0.16;
    meshUniforms.uLight.value.set(cur.x * 1.2 + 0.25, -cur.y * 0.9 + 0.35, 1);
    uniforms.uMouse.value.set(cur.x, cur.y, 0);
    const pk = reducedMotion ? 1 : 1 - Math.exp(-dt * 9);
    ptr.x += (ptr.tx - ptr.x) * pk;
    ptr.y += (ptr.ty - ptr.y) * pk;
    ptr.r += (ptr.tr - ptr.r) * (1 - Math.exp(-dt * 4));
    uniforms.uPointer.value.set(ptr.x, ptr.y, reducedMotion ? 0 : ptr.r);

    // decorations around the head
    const dIn = easeOut((t - 2.3) / 1.4) * faceOn;
    ringMat.opacity = dIn * 0.7;
    ring.rotation.y = time * 0.22;
    ring.visible = dIn > 0.001;
    deco.forEach((d, i) => {
      d.obj.visible = dIn > 0.001;
      d.obj.scale.setScalar(Math.max(0.001, dIn));
      d.mat.opacity = dIn * d.max;
      d.obj.rotation.x = time * (0.32 + i * 0.07);
      d.obj.rotation.y = time * (0.41 + i * 0.05);
      d.obj.position.set(d.base.x, d.base.y + Math.sin(time * 0.8 + i * 1.7) * 0.012, d.base.z);
    });
    mesh.visible = meshUniforms.uFade.value > 0.001;

    root.updateMatrixWorld(true);
    uniforms.uFace.value.copy(rig.matrixWorld);

    renderer.render(scene, camera);

    if (onFrame) {
      const pct = Math.round((asm * 0.55 + sc * 0.45) * 100);
      const state: FaceSceneState = asm < 1 ? "assembling" : sc < 1 ? "scanning" : m > 0.02 ? "dispersing" : "live";
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
  const onVis = () => {
    if (!document.hidden) kick();
  };
  document.addEventListener("visibilitychange", onVis);
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
      window.removeEventListener("resize", resize);
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
