import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth animated jumps (Lenis) for the pages that use it; scrolling itself stays native.
 * Skipped for reduced motion and on touch devices.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || touch) return;

    // The wheel and the trackpad scroll natively: the browser moves the page on its own thread,
    // right away and with the system's own inertia. Smoothing the wheel in JavaScript made the
    // page keep gliding for over a second after you stopped, which felt heavy. Lenis stays only
    // for the animated jumps (anchors, the services index, back to top).
    const lenis = new Lenis({
      smoothWheel: false,
      anchors: true,
    });
    // let page code (e.g. the services list) drive smooth jumps
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);
}

export default useSmoothScroll;
