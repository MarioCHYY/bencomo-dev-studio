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
 * sphere with a nucleus (idea) → Bézier curve with handles (design) → lattice (structure) → double helix (code)
 * → squircle (product) → vortex (launch) → the Bencomo mark → …
 * Dots are tinted with the soft RGB palette of the old hero dots and dimmed with depth.
 */

export interface MorphSceneHandle {
  dispose: () => void;
}

export const SHAPE_COUNT = 7; // 6 stages + the brand mark as a signature at the end of the loop

const TAU = Math.PI * 2;
const rnd = () => Math.random();
const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5; // soft bell, -1..1
type V3 = [number, number, number];
function dir(): V3 {
  const u = rnd() * 2 - 1, a = rnd() * TAU, r = Math.sqrt(1 - u * u);
  return [Math.cos(a) * r, u, Math.sin(a) * r];
}

/** 01 Idea: the sphere, with a bright nucleus forming inside it — the idea taking shape */
function idea(i: number, n: number): V3 {
  if (rnd() < 0.24) {
    // nucleus: a dense glow in the middle
    const d = dir();
    const r = Math.abs(gauss()) * 0.26;
    return [d[0] * r, d[1] * r, d[2] * r];
  }
  // the sphere's surface, evenly spread (golden angle)
  const y = 1 - (2 * (i + 0.5)) / n;
  const r = Math.sqrt(1 - y * y);
  const a = i * 2.399963229728653;
  return [Math.cos(a) * r * 0.95, y * 0.95, Math.sin(a) * r * 0.95];
}

/** 02 Design: a Bézier curve with its handles, the way it looks while drawing with the pen tool */
function bezier(): V3 {
  const P: [number, number][] = [[-0.95, -0.42], [-0.32, 0.92], [0.32, -0.92], [0.95, 0.42]];
  const z = () => gauss() * 0.03;
  const r = rnd();
  if (r < 0.58) {
    // the curve, as a thin tube
    const t = rnd(), u = 1 - t;
    const x = u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0];
    const y = u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1];
    const a = rnd() * TAU, w = 0.028;
    return [x + Math.cos(a) * w, y + Math.sin(a) * w, Math.sin(a) * w * 1.5];
  }
  if (r < 0.74) {
    // handle lines from each anchor to its control point
    const [a, b] = rnd() < 0.5 ? [P[0], P[1]] : [P[3], P[2]];
    const t = rnd();
    return [a[0] + (b[0] - a[0]) * t + gauss() * 0.006, a[1] + (b[1] - a[1]) * t + gauss() * 0.006, z()];
  }
  if (r < 0.88) {
    // anchors: small square outlines on the ends of the curve
    const c = rnd() < 0.5 ? P[0] : P[3];
    const h = 0.075, e = rnd() * 8 - 4; // walk around the square's 4 sides
    const side = Math.floor((e + 4) / 2), f = ((e + 4) % 2) - 1;
    const q = side === 0 ? [f * h, -h] : side === 1 ? [h, f * h] : side === 2 ? [-f * h, h] : [-h, -f * h];
    return [c[0] + q[0], c[1] + q[1], z()];
  }
  // control points: small round dots at the end of each handle
  const c = rnd() < 0.5 ? P[1] : P[2];
  const a = rnd() * TAU, rr = Math.sqrt(rnd()) * 0.06;
  return [c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr, z()];
}

/** 03 Structure: a lattice — dots strung along the lines of a perfect 3D grid */
function lattice(): V3 {
  const n = 4; // 5 x 5 x 5 nodes
  const s = 0.62;
  const k = () => (Math.floor(rnd() * (n + 1)) / n) * 2 - 1;
  if (rnd() < 0.18) {
    // nodes, a touch denser
    return [k() * s + gauss() * 0.012, k() * s + gauss() * 0.012, k() * s + gauss() * 0.012];
  }
  const along = rnd() * 2 - 1;
  const axis = Math.floor(rnd() * 3);
  const p: V3 = axis === 0 ? [along, k(), k()] : axis === 1 ? [k(), along, k()] : [k(), k(), along];
  return [p[0] * s, p[1] * s, p[2] * s];
}

/** 04 Code: the double helix — DNA is literally a code */
function helix(): V3 {
  const h = rnd();
  const y = (h - 0.5) * 2.1;
  const a = h * TAU * 2.3;
  const r = 0.42;
  if (rnd() < 0.82) {
    const off = rnd() < 0.5 ? 0 : Math.PI;
    const j = 0.025;
    return [Math.cos(a + off) * r + (rnd() - 0.5) * j, y + (rnd() - 0.5) * j, Math.sin(a + off) * r + (rnd() - 0.5) * j];
  }
  const k = Math.round(h * 22) / 22;
  const yy = (k - 0.5) * 2.1;
  const aa = k * TAU * 2.3;
  const s = rnd() * 2 - 1;
  return [Math.cos(aa) * r * s, yy, Math.sin(aa) * r * s];
}

/** 05 Product: a squircle — the rounded square of an app icon, as a solid, finished object */
function squircle(): V3 {
  const S = 0.78, D = 0.2, e = 5;
  const sq = (a: number) => {
    // point on the superellipse |x|^e + |y|^e = S^e
    const c = Math.cos(a), s = Math.sin(a);
    return [Math.sign(c) * Math.pow(Math.abs(c), 2 / e) * S, Math.sign(s) * Math.pow(Math.abs(s), 2 / e) * S];
  };
  if (rnd() < 0.72) {
    // front / back faces
    let x = 0, y = 0;
    do {
      x = (rnd() * 2 - 1) * S;
      y = (rnd() * 2 - 1) * S;
    } while (Math.pow(Math.abs(x / S), e) + Math.pow(Math.abs(y / S), e) > 1);
    return [x, y, rnd() < 0.5 ? D : -D];
  }
  // the rounded rim
  const [x, y] = sq(rnd() * TAU);
  return [x, y, (rnd() * 2 - 1) * D];
}

/** 06 Launch: a vortex opening upwards, with dots breaking free from the top */
function vortex(): V3 {
  if (rnd() < 0.14) {
    const a = rnd() * TAU, r = 0.25 + rnd() * 0.85;
    return [Math.cos(a) * r, 0.62 + rnd() * 0.4, Math.sin(a) * r];
  }
  const h = rnd();
  const y = -1.15 + h * 1.8;
  const r = 0.08 + 0.8 * Math.pow(h, 1.6);
  const arm = Math.floor(rnd() * 3);
  const a = h * TAU * 2.2 + (arm * TAU) / 3;
  const j = 0.03 + h * 0.05;
  return [Math.cos(a) * r + gauss() * j, y + gauss() * j, Math.sin(a) * r + gauss() * j];
}

/** Signature: the Bencomo mark — a disc cut at 34°, halves slipped apart, the cut glowing between them */
function mark(): V3 {
  if (rnd() < 0.22) {
    for (;;) {
      const a = rnd() * TAU, r = Math.sqrt(rnd()) * 0.92;
      const x = Math.cos(a) * r, y = Math.sin(a) * r;
      if (Math.abs(0.829 * y - 0.559 * x) < 0.12) return [x, y, -0.08 + gauss() * 0.03];
    }
  }
  let x = 0, y = 0;
  do {
    x = rnd() * 2 - 1;
    y = rnd() * 2 - 1;
  } while (x * x + y * y > 1);
  const s = 0.829 * y - 0.559 * x > 0 ? 1 : -1;
  return [(x + s * 0.18) * 0.85, (y + s * 0.23) * 0.85, gauss() * 0.07];
}

export async function createMorphScene(
  container: HTMLElement,
  opts: { reducedMotion?: boolean; lowPower?: boolean; onShape?: (i: number) => void; getScroll?: () => number } = {},
): Promise<MorphSceneHandle> {
  const { reducedMotion = false, lowPower = false, onShape, getScroll } = opts;
  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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
    shapes[0].push(...idea(i, N));
    shapes[1].push(...bezier());
    shapes[2].push(...lattice());
    shapes[3].push(...helix());
    shapes[4].push(...squircle());
    shapes[5].push(...vortex());
    shapes[6].push(...mark());
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
    // the cursor in the canvas (NDC), how hard it pushes, the canvas aspect and the reach of the push
    uPointer: { value: new Vector2(9, 9) },
    uPush: { value: 0 },
    uAspect: { value: 1 },
    uReach: { value: 0.3 },
    uFade: { value: 1 },
    uLight: { value: 0 },
    uSpin: { value: 0 },
    uFace: { value: 0 },
  };

  const mat = new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute vec3 aP0; attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3; attribute vec3 aP4; attribute vec3 aP5; attribute vec3 aP6;
      attribute float aRand;
      uniform float uTime, uFrom, uTo, uMix, uPR, uSize, uFade, uLight, uSpin;
      uniform vec2 uMouse;
      uniform vec2 uPointer;
      uniform float uPush, uAspect, uReach;
      uniform float uFace;
      varying vec3 vCol;
      varying float vA;

      vec3 shape(float k) {
        if (k < 0.5) return aP0;
        if (k < 1.5) return aP1;
        if (k < 2.5) return aP2;
        if (k < 3.5) return aP3;
        if (k < 4.5) return aP4;
        if (k < 5.5) return aP5;
        return aP6;
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

        p = rotY(uSpin + uMouse.x * 0.5) * p;
        p = rotX(mix(0.28, 0.06, uFace) + uMouse.y * 0.3) * p;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        // the cursor takes the shape apart: dots near it on screen are blown outwards (each at its own
        // angle and depth, so it scatters instead of making a clean hole) and fall back once it moves on
        if (uPush > 0.001) {
          vec4 cl = projectionMatrix * mv;
          vec2 dv = (cl.xy / cl.w - uPointer) * vec2(uAspect, 1.0);
          float dist = length(dv);
          float f = (1.0 - smoothstep(0.0, uReach, dist)) * uPush;
          if (f > 0.0) {
            float a = (aRand - 0.5) * 1.4;
            vec2 dir = dist > 1e-4 ? dv / dist : vec2(cos(aRand * 6.283), sin(aRand * 6.283));
            dir = mat2(cos(a), sin(a), -sin(a), cos(a)) * dir;
            f = f * f * (3.0 - 2.0 * f);
            mv.xy += dir * f * (0.16 + aRand * 0.36);
            mv.z += (aRand - 0.5) * f * 0.7;
          }
        }
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
  // the <html> class also changes for other reasons (smooth scroll, cursor…): only react to the theme itself.
  // Blending is render state, so switching it needs no shader rebuild (needsUpdate used to recompile
  // the program on every class change, which made the dots stutter).
  let lastLight: boolean | null = null;
  const applyTheme = () => {
    const light = !root.classList.contains("dark");
    if (light === lastLight) return;
    lastLight = light;
    uniforms.uLight.value = light ? 1 : 0;
    mat.blending = light ? NormalBlending : AdditiveBlending;
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
    uniforms.uAspect.value = camera.aspect;
    // keep the sculpture fitting the shorter side
    const s = Math.min(1, camera.aspect / 1.0);
    points.scale.setScalar((w < 640 ? 0.95 : 1.18) * s);
    uniforms.uPR.value = renderer.getPixelRatio();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const mouse = { x: 0, y: 0, cx: 0, cy: 0 };
  // pointer over the sculpture, for taking it apart (works with mouse and with a finger moving on it)
  const ptr = { x: 9, y: 9, cx: 9, cy: 9, over: false, push: 0, speed: 0, lastX: 0, lastY: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    const r = canvas.getBoundingClientRect();
    // a little margin around the canvas so it starts to react just before you reach it
    const m = 40;
    ptr.over = e.clientX > r.left - m && e.clientX < r.right + m && e.clientY > r.top - m && e.clientY < r.bottom + m;
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    ptr.speed = Math.min(1, ptr.speed + Math.hypot(nx - ptr.x, ny - ptr.y) * 2);
    if (ptr.cx > 5) {
      ptr.cx = nx;
      ptr.cy = ny;
    }
    ptr.x = nx;
    ptr.y = ny;
    kick();
  };
  const onLeave = () => {
    ptr.over = false;
    kick();
  };
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("pointercancel", onLeave);
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
  // flat shapes (Bézier curve, app icon, mark) stop spinning and sway facing you, so they never turn edge-on
  const FLAT = new Set([1, 4, 6]);
  let spin = 0, face = 0, lastT = 0;
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
    const dt = Math.min(0.1, t - lastT);
    lastT = t;
    if (!reducedMotion) {
      face += ((FLAT.has(lastShape) ? 1 : 0) - face) * Math.min(1, dt * 2.5);
      spin += dt * 0.18 * (1 - face);
      if (face > 0.01) {
        const target = Math.round(spin / TAU) * TAU;
        spin += (target - spin) * Math.min(1, dt * 2.2) * face;
      }
    }
    uniforms.uSpin.value = spin + Math.sin(t * 0.55) * 0.42 * face;
    uniforms.uFace.value = face;
    mouse.cx += (mouse.x - mouse.cx) * 0.05;
    mouse.cy += (mouse.y - mouse.cy) * 0.05;
    uniforms.uMouse.value.set(mouse.cx, mouse.cy);
    // the hole trails the cursor a little and grows when you move fast
    ptr.cx += (ptr.x - ptr.cx) * Math.min(1, dt * 12);
    ptr.cy += (ptr.y - ptr.cy) * Math.min(1, dt * 12);
    // resting on the shape only nudges the dots; moving the mouse is what scatters them,
    // and once it stops they gather back in
    const want = ptr.over && !reducedMotion ? 0.3 + 0.7 * Math.min(1, ptr.speed * 1.6) : 0;
    ptr.push += (want - ptr.push) * Math.min(1, dt * (want > ptr.push ? 9 : 2.2));
    ptr.speed *= Math.max(0, 1 - dt * 2.5);
    uniforms.uPointer.value.set(ptr.cx, ptr.cy);
    uniforms.uPush.value = ptr.push;
    uniforms.uReach.value = 0.17 + ptr.speed * 0.1;
    const sc = getScroll ? getScroll() : 0; // 0 → 1 while the hero leaves
    uniforms.uFade.value = 1 - sc * 0.85;
    // leaving the hero: the camera moves in towards the dots, as if going into the piece
    const zoom = Math.min(1, sc / 0.6);
    camera.position.z = 5.2 - (reducedMotion ? 0 : zoom * zoom * 2.3);
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
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointercancel", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
