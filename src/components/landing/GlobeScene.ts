import {
  AdditiveBlending,
  BufferGeometry,
  Clock,
  Float32BufferAttribute,
  Group,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLOBE_LAND, GLOBE_N } from "./globeData";

/**
 * The Earth as ~26 thousand dots of land (real coastlines, Natural Earth 1:50m), turned so
 * Culiacán sits in front, with Mexico lit in the aurora and a pulse on the city.
 * It drifts slowly, leans toward the cursor, and only renders while on screen.
 */

export const CULIACAN = { lat: 24.8091, lon: -107.394 };
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const R = 1;

export interface GlobeHandle {
  dispose: () => void;
}

function decode() {
  const bin = atob(GLOBE_LAND);
  const pos: number[] = [];
  const mex: number[] = [];
  let i = -1;
  let k = 0;
  while (k < bin.length) {
    let v = 0;
    let shift = 0;
    let b: number;
    do {
      b = bin.charCodeAt(k++);
      v |= (b & 127) << shift;
      shift += 7;
    } while (b & 128);
    i += v >> 1;
    const y = 1 - (i / (GLOBE_N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = i * GOLDEN;
    // z is negated so east is to the right when the globe faces the camera
    pos.push(Math.cos(t) * r * R, y * R, -Math.sin(t) * r * R);
    mex.push(v & 1);
  }
  return { pos, mex };
}

/** lat/lon → the same sphere the dots live on */
const toXYZ = (lat: number, lon: number) => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return new Vector3(Math.cos(lo) * Math.cos(la) * R, Math.sin(la) * R, -Math.sin(lo) * Math.cos(la) * R);
};

const VERT = /* glsl */ `
  attribute float aMex;
  uniform float uSize;
  uniform float uPix;
  varying float vMex;
  varying float vFacing;
  varying float vLat;
  void main() {
    vMex = aMex;
    vLat = position.y;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // how much the dot faces the camera: dots on the far side fade away
    vec3 n = normalize(mat3(modelViewMatrix) * position);
    vFacing = clamp(dot(n, normalize(-mv.xyz)), -1.0, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPix * (aMex > 0.5 ? 1.45 : 1.0) * (2.4 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  uniform float uDark;
  uniform float uTime;
  varying float vMex;
  varying float vFacing;
  varying float vLat;
  vec3 aurora(float t) {
    vec3 a = vec3(0.561, 0.690, 1.0);   // #8FB0FF
    vec3 b = vec3(0.718, 0.659, 1.0);   // #B7A8FF
    vec3 c = vec3(1.0, 0.604, 0.690);   // #FF9AB0
    vec3 d = vec3(1.0, 0.769, 0.541);   // #FFC48A
    t = clamp(t, 0.0, 1.0) * 3.0;
    return t < 1.0 ? mix(a, b, t) : t < 2.0 ? mix(b, c, t - 1.0) : mix(c, d, t - 2.0);
  }
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, d);
    float face = smoothstep(-0.15, 0.55, vFacing);
    if (face < 0.01) discard;
    vec3 ink = vec3(0.043, 0.043, 0.051);
    vec3 base = mix(ink, aurora(0.5 - vLat * 0.6), uDark * 0.55 + 0.1);
    vec3 col = vMex > 0.5 ? aurora(0.62 + 0.25 * sin(uTime * 0.6 + vLat * 6.0)) : base;
    float alpha = (vMex > 0.5 ? 0.95 : mix(0.38, 0.55, uDark)) * soft * face;
    gl_FragColor = vec4(col, alpha);
  }
`;

const PIN_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uDark;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p) * 2.0;
    // a hot centre and two rings travelling outwards
    float core = smoothstep(0.16, 0.0, d);
    float r1 = fract(uTime * 0.45);
    float r2 = fract(uTime * 0.45 + 0.5);
    float ring = smoothstep(0.05, 0.0, abs(d - r1)) * (1.0 - r1) + smoothstep(0.05, 0.0, abs(d - r2)) * (1.0 - r2);
    float halo = smoothstep(0.6, 0.0, d) * 0.25;
    vec3 col = mix(vec3(1.0, 0.604, 0.690), vec3(1.0, 0.769, 0.541), core);
    float a = clamp(core + ring * 0.85 + halo, 0.0, 1.0);
    if (a < 0.01) discard;
    gl_FragColor = vec4(col, a);
  }
`;

export function createGlobe(
  host: HTMLElement,
  { reducedMotion, onPin }: { reducedMotion: boolean; onPin?: (x: number, y: number, visible: boolean) => void },
): GlobeHandle {
  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
  const pix = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(pix);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 20);
  camera.position.set(0, 0, 4);

  // tilt (outer) and spin (inner) put Culiacán facing the camera
  const tilt = new Group();
  const spin = new Group();
  tilt.add(spin);
  scene.add(tilt);
  const lo = (CULIACAN.lon * Math.PI) / 180;
  const la = (CULIACAN.lat * Math.PI) / 180;
  const restY = -Math.PI / 2 - lo;
  const restX = la;

  const { pos, mex } = decode();
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  geo.setAttribute("aMex", new Float32BufferAttribute(mex, 1));
  const isDark = () => document.documentElement.classList.contains("dark");
  const uniforms = { uSize: { value: 3.2 }, uPix: { value: pix }, uDark: { value: isDark() ? 1 : 0 }, uTime: { value: 0 } };
  const mat = new ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: isDark() ? AdditiveBlending : NormalBlending });
  spin.add(new Points(geo, mat));

  const pinPos = toXYZ(CULIACAN.lat, CULIACAN.lon).multiplyScalar(1.004);
  const pinGeo = new BufferGeometry();
  pinGeo.setAttribute("position", new Float32BufferAttribute([pinPos.x, pinPos.y, pinPos.z], 3));
  const pinMat = new ShaderMaterial({
    uniforms: { uTime: uniforms.uTime, uDark: uniforms.uDark },
    vertexShader: /* glsl */ `uniform float uPix; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv; gl_PointSize = 86.0 * ${pix.toFixed(2)} * (2.4 / -mv.z); }`,
    fragmentShader: PIN_FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
  spin.add(new Points(pinGeo, pinMat));

  // follow the theme without touching anything else
  let lastDark = isDark();
  const mo = new MutationObserver(() => {
    const d = isDark();
    if (d === lastDark) return;
    lastDark = d;
    uniforms.uDark.value = d ? 1 : 0;
    mat.blending = d ? AdditiveBlending : NormalBlending;
    mat.needsUpdate = true;
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole globe in frame on narrow boxes
    camera.position.z = w / h < 1 ? 4 / Math.max(0.62, w / h) : 4;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  // the cursor leans the globe a little
  const target = { x: 0, y: 0 };
  const lean = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  const onLeave = () => {
    target.x = target.y = 0;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerleave", onLeave);

  const clock = new Clock();
  let intro = reducedMotion ? 1 : 0;
  let raf = 0;
  let visible = false;
  const world = new Vector3();
  const frame = () => {
    raf = 0;
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    uniforms.uTime.value = t;
    // arrive: a turn and a half settling on Culiacán
    intro = Math.min(1, intro + dt / 2.4);
    const e = 1 - Math.pow(1 - intro, 4);
    lean.x += (target.x - lean.x) * Math.min(1, dt * 3);
    lean.y += (target.y - lean.y) * Math.min(1, dt * 3);
    const drift = reducedMotion ? 0 : Math.sin(t * 0.18) * 0.16;
    spin.rotation.y = restY + (1 - e) * 3.2 + drift + lean.x * 0.28;
    tilt.rotation.x = restX + lean.y * 0.18;
    tilt.rotation.z = -0.12;
    tilt.scale.setScalar(0.86 + 0.14 * e);
    renderer.render(scene, camera);

    if (onPin) {
      spin.updateMatrixWorld();
      world.copy(pinPos).applyMatrix4(spin.matrixWorld);
      const facing = world.clone().normalize().dot(camera.position.clone().sub(world).normalize()) > 0.2;
      world.project(camera);
      onPin((world.x * 0.5 + 0.5) * 100, (-world.y * 0.5 + 0.5) * 100, facing && e > 0.85);
    }
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
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      pinGeo.dispose();
      mat.dispose();
      pinMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
