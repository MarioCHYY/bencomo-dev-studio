import type { Camera, Group, Scene, WebGLRenderer } from "three";

/**
 * Gets every service model ready before anyone scrolls to it. three.js compiles a model's
 * shaders and uploads its geometry the first time it draws it, and each model only draws when
 * its service comes up, so every switch froze the page for a few hundred milliseconds right in
 * the middle of a scroll. Here all of them are compiled (in parallel where the browser can) and
 * drawn once into an empty scissor box, so nothing shows, while the page is still loading.
 */
export async function warmUp(renderer: WebGLRenderer, scene: Scene, camera: Camera, roots: Group[]) {
  const was = roots.map((r) => r.visible);
  roots.forEach((r) => (r.visible = true));
  try {
    await renderer.compileAsync(scene, camera);
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
