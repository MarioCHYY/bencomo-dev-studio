import { MeshLambertMaterial, MeshStandardMaterial, PMREMGenerator, type Object3D, type Texture, type WebGLRenderer } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The reflections for the 3D models: three's studio room, blurred into an environment map.
 * The room is built from physically based materials, and each of those is one of the largest
 * shaders three has; Chrome on a Mac compiles them slowly and the whole page stalls while it does.
 * The room's walls and boxes are plain matte surfaces, so a Lambert material lights them the same
 * way with a shader a fraction of the size.
 */
export function lightEnvironment(renderer: WebGLRenderer): { texture: Texture; dispose: () => void } {
  const room = new RoomEnvironment();
  const swap = new Map<MeshStandardMaterial, MeshLambertMaterial>();
  room.traverse((o: Object3D) => {
    const mesh = o as Object3D & { material?: unknown };
    if (!(mesh.material instanceof MeshStandardMaterial)) return;
    const m = mesh.material;
    if (!swap.has(m)) swap.set(m, new MeshLambertMaterial({ color: m.color, side: m.side }));
    mesh.material = swap.get(m);
  });
  swap.forEach((_, m) => m.dispose());
  const pmrem = new PMREMGenerator(renderer);
  const target = pmrem.fromScene(room, 0.04);
  room.dispose();
  pmrem.dispose();
  return { texture: target.texture, dispose: () => target.dispose() };
}
