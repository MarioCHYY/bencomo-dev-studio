import {
  AdditiveBlending,
  NormalBlending,
  BufferGeometry,
  Clock,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

/**
 * Hero sculpture: one cloud of dots that keeps changing shape.
 * sphere → torus knot → cube → double helix → diamond → ring → …
 * Dots are tinted with the soft RGB palette of the old hero dots and dimmed with depth.
 */

export interface MorphSceneHandle {
  dispose: () => void;
}

export const SHAPE_COUNT = 6;

const TAU = Math.PI * 2;
const rnd = () => Math.random();

function sphere(i: number, n: number): [number, number, number] {
  const y = 1 - (2 * (i + 0.5)) / n;
  const r = Math.sqrt(1 - y * y);
  const a = i * 2.399963229728653; // golden angle
  return [Math.cos(a) * r, y, Math.sin(a) * r];
}
function knot(): [number, number, number] {
  const t = rnd() * TAU;
  const p = 2, q = 3;
  const R = 0.55 + 0.25 * Math.cos(q * t);
  const c = [R * Math.cos(p * t), R * Math.sin(p * t), 0.25 * Math.sin(q * t)];
  // tube around the curve
  const t2 = t + 0.001;
  const R2 = 0.55 + 0.25 * Math.cos(q * t2);
  const d = [R2 * Math.cos(p * t2) - c[0], R2 * Math.sin(p * t2) - c[1], 0.25 * Math.sin(q * t2) - c[2]];
  const dl = Math.hypot(d[0], d[1], d[2]);
  const T = d.map((v) => v / dl);
  let N = [-T[1], T[0], 0];
  const nl = Math.hypot(N[0], N[1], N[2]) || 1;
  N = N.map((v) => v / nl);
  const B = [T[1] * N[2] - T[2] * N[1], T[2] * N[0] - T[0] * N[2], T[0] * N[1] - T[1] * N[0]];
  const a = rnd() * TAU;
  const tube = 0.16;
  return [
    c[0] + (N[0] * Math.cos(a) + B[0] * Math.sin(a)) * tube,
    c[1] + (N[1] * Math.cos(a) + B[1] * Math.sin(a)) * tube,
    c[2] + (N[2] * Math.cos(a) + B[2] * Math.sin(a)) * tube,
  ];
}
function cube(): [number, number, number] {
  const f = Math.floor(rnd() * 6);
  const u = rnd() * 2 - 1, v = rnd() * 2 - 1;
  const s = 0.68;
  const p: [number, number, number] =
    f === 0 ? [1, u, v] : f === 1 ? [-1, u, v] : f === 2 ? [u, 1, v] : f === 3 ? [u, -1, v] : f === 4 ? [u, v, 1] : [u, v, -1];
  // soften the edges a little
  const l = Math.hypot(p[0], p[1], p[2]);
  return [((p[0] * 0.85 + (p[0] / l) * 0.15 * 1.3)) * s, ((p[1] * 0.85 + (p[1] / l) * 0.15 * 1.3)) * s, ((p[2] * 0.85 + (p[2] / l) * 0.15 * 1.3)) * s];
}
function helix(): [number, number, number] {
  const h = rnd();
  const y = (h - 0.5) * 2.1;
  const a = h * TAU * 2.3;
  const r = 0.42;
  if (rnd() < 0.82) {
    const off = rnd() < 0.5 ? 0 : Math.PI;
    const j = 0.025;
    return [Math.cos(a + off) * r + (rnd() - 0.5) * j, y + (rnd() - 0.5) * j, Math.sin(a + off) * r + (rnd() - 0.5) * j];
  }
  // rungs
  const k = Math.round(h * 22) / 22;
  const yy = (k - 0.5) * 2.1;
  const aa = k * TAU * 2.3;
  const s = rnd() * 2 - 1;
  return [Math.cos(aa) * r * s, yy, Math.sin(aa) * r * s];
}
function diamond(i: number, n: number): [number, number, number] {
  const [x, y, z] = sphere(i, n);
  const l = Math.abs(x) + Math.abs(y) * 0.8 + Math.abs(z);
  return [(x / l) * 1.0, (y / l) * 1.15, (z / l) * 1.0];
}
function ring(): [number, number, number] {
  const a = rnd() * TAU, b = rnd() * TAU;
  const R = 0.78, r = 0.2;
  return [(R + r * Math.cos(b)) * Math.cos(a), r * Math.sin(b), (R + r * Math.cos(b)) * Math.sin(a)];
}

export async function createMorphScene(
  container: HTMLElement,
  opts: { reducedMotion?: boolean; lowPower?: boolean; onShape?: (i: number) => void; getScroll?: () => number } = {},
): Promise<MorphSceneHandle> {
  const { reducedMotion = false, lowPower = false, onShape, getScroll } = opts;
  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 5.2);

  const N = lowPower ? 7000 : 15000;
  const shapes: number[][] = Array.from({ length: SHAPE_COUNT }, () => []);
  const rand: number[] = [];
  for (let i = 0; i < N; i++) {
    shapes[0].push(...sphere(i, N));
    shapes[1].push(...knot());
    shapes[2].push(...cube());
    shapes[3].push(...helix());
    shapes[4].push(...diamond(i, N));
    shapes[5].push(...ring());
    rand.push(rnd());
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(shapes[0], 3));
  shapes.forEach((s, k) => geo.setAttribute(`aP${k}`, new Float32BufferAttribute(s, 3)));
  geo.setAttribute("aRand", new Float32BufferAttribute(rand, 1));

  const uniforms = {
    uTime: { value: 0 },
    uFrom: { value: 0 },
    uTo: { value: 1 },
    uMix: { value: 0 },
    uPR: { value: renderer.getPixelRatio() },
    uSize: { value: lowPower ? 2.2 : 2.0 },
    uMouse: { value: new Vector2() },
    uFade: { value: 1 },
    uLight: { value: 0 },
  };

  const mat = new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute vec3 aP0; attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3; attribute vec3 aP4; attribute vec3 aP5;
      attribute float aRand;
      uniform float uTime, uFrom, uTo, uMix, uPR, uSize, uFade, uLight;
      uniform vec2 uMouse;
      varying vec3 vCol;
      varying float vA;

      vec3 shape(float k) {
        if (k < 0.5) return aP0;
        if (k < 1.5) return aP1;
        if (k < 2.5) return aP2;
        if (k < 3.5) return aP3;
        if (k < 4.5) return aP4;
        return aP5;
      }
      mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
      mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }

      void main() {
        // staggered morph with a little swirl and bloom in the middle of the change
        float f = clamp(uMix * 1.5 - aRand * 0.5, 0.0, 1.0);
        f = f * f * (3.0 - 2.0 * f);
        vec3 a = shape(uFrom), b = shape(uTo);
        vec3 p = mix(a, b, f);
        float mid = sin(f * 3.14159);
        p = rotY(mid * (1.2 + aRand)) * p;
        p *= 1.0 + mid * (0.18 + aRand * 0.25);
        // breathing
        p += 0.012 * vec3(sin(uTime * 1.3 + aRand * 50.0), cos(uTime * 1.1 + aRand * 30.0), sin(uTime * 0.9 + aRand * 70.0));

        p = rotY(uTime * 0.18 + uMouse.x * 0.5) * p;
        p = rotX(0.28 + uMouse.y * 0.3) * p;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float depth = clamp((p.z + 1.2) / 2.4, 0.0, 1.0); // 0 back → 1 front
        gl_PointSize = uSize * uPR * (0.6 + aRand * 0.7) * (5.2 / -mv.z) * mix(1.0, 1.25, uLight); // a bit bigger on Bone

        // soft RGB, the old hero dots in pastel: blue top-left → violet → pink → peach bottom-right
        float d = clamp((p.x - p.y) * 0.35 + 0.5, 0.0, 1.0);
        vec3 c1 = vec3(0.56, 0.69, 1.0), c2 = vec3(0.72, 0.66, 1.0), c3 = vec3(1.0, 0.64, 0.76), c4 = vec3(1.0, 0.8, 0.6);
        vec3 col = d < 0.5 ? mix(c1, c2, d / 0.5) : (d < 0.8 ? mix(c2, c3, (d - 0.5) / 0.3) : mix(c3, c4, (d - 0.8) / 0.2));
        vec3 cDark = mix(vec3(1.0), col, 0.55 + aRand * 0.3);
        // light theme: the same aurora hues, saturated (pow) so they read on Bone instead of turning grey;
        // dots further back get a touch deeper for depth
        vec3 cLight = pow(col, vec3(2.3)) * (0.72 + 0.28 * depth) * (0.9 + 0.1 * aRand);
        vCol = mix(cDark, cLight, uLight);
        vA = (0.12 + depth * 0.78) * (0.7 + 0.3 * sin(uTime * 2.0 + aRand * 80.0)) * uFade * mix(1.0, 1.3, uLight);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vCol;
      varying float vA;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float r = length(c);
        if (r > 0.5) discard;
        gl_FragColor = vec4(vCol, smoothstep(0.5, 0.1, r) * vA);
      }
    `,
  });
  // on the light theme: dark, normally-blended dots (additive light disappears on white)
  const root = document.documentElement;
  const applyTheme = () => {
    const light = !root.classList.contains("dark");
    uniforms.uLight.value = light ? 1 : 0;
    mat.blending = light ? NormalBlending : AdditiveBlending;
    mat.needsUpdate = true;
  };
  applyTheme();
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
  const points = new Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);

  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // keep the sculpture fitting the shorter side
    const s = Math.min(1, camera.aspect / 1.0);
    points.scale.setScalar((w < 640 ? 0.95 : 1.18) * s);
    uniforms.uPR.value = renderer.getPixelRatio();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const mouse = { x: 0, y: 0, cx: 0, cy: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) kick();
  });
  io.observe(container);

  const HOLD = 3.4, MORPH = 1.8, CYCLE = HOLD + MORPH;
  const clock = new Clock();
  let raf = 0;
  let lastShape = -1;
  const frame = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();
    uniforms.uTime.value = reducedMotion ? 0 : t;
    if (reducedMotion) {
      uniforms.uFrom.value = 0;
      uniforms.uTo.value = 0;
      uniforms.uMix.value = 0;
    } else {
      const step = Math.floor(t / CYCLE);
      const local = t - step * CYCLE;
      const from = step % SHAPE_COUNT;
      const to = (step + 1) % SHAPE_COUNT;
      uniforms.uFrom.value = from;
      uniforms.uTo.value = to;
      uniforms.uMix.value = local < HOLD ? 0 : (local - HOLD) / MORPH;
      const showing = local < HOLD + MORPH * 0.5 ? from : to;
      if (showing !== lastShape) {
        lastShape = showing;
        onShape?.(showing);
      }
    }
    mouse.cx += (mouse.x - mouse.cx) * 0.05;
    mouse.cy += (mouse.y - mouse.cy) * 0.05;
    uniforms.uMouse.value.set(mouse.cx, mouse.cy);
    const sc = getScroll ? getScroll() : 0; // 0 → 1 while the hero leaves
    uniforms.uFade.value = 1 - sc * 0.85;
    points.rotation.z = sc * 0.3;
    points.position.y = sc * 0.4;
    renderer.render(scene, camera);
  };
  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }
  const onVis = () => !document.hidden && kick();
  document.addEventListener("visibilitychange", onVis);
  kick();

  return {
    dispose() {
      themeObserver.disconnect();
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
