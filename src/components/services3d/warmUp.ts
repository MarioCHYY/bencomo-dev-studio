import type { Camera, Group, Material, Mesh, Object3D, Scene, WebGLRenderer } from "three";

/**
 * Gets every service model ready before anyone scrolls to it. three.js compiles a model's
 * shaders and uploads its geometry the first time it draws it, and each model only draws when
 * its service comes up, so every switch froze the page right in the middle of a scroll.
 * Here the shaders are compiled in the background where the browser can, then every model is
 * drawn once into an empty scissor box, so nothing shows, while the page is still settling.
 *
 * Materials with clipping planes are left to that draw: three only knows their clipping state
 * while rendering, so compiling them ahead would build a second, unused shader.
 */
export async function warmUp(renderer: WebGLRenderer, scene: Scene, camera: Camera, roots: Group[]) {
  const was = roots.map((r) => r.visible);
  roots.forEach((r) => (r.visible = true));
  try {
    const ahead: Object3D[] = [];
    roots.forEach((r) =>
      r.traverse((o) => {
        const m = (o as Mesh).material as Material | Material[] | undefined;
        if (!m) return;
        const mats = Array.isArray(m) ? m : [m];
        if (mats.every((x) => !x.clippingPlanes?.length)) ahead.push(o);
      }),
    );
    await Promise.all(ahead.map((o) => renderer.compileAsync(o, camera, scene)));
    renderer.setScissorTest(true);
    renderer.setScissor(0, 0, 0, 0);
    renderer.render(scene, camera);
  } catch {
    // warming up is only a head start: the first real frame does the same work
  } finally {
    renderer.setScissorTest(false);
    roots.forEach((r, i) => (r.visible = was[i]));
  }
}
