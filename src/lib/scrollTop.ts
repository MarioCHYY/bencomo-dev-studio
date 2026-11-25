/** jump to the top of the page right away (also moves Lenis, so smooth scroll doesn't drift back) */
export function scrollToTop() {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean; force?: boolean }) => void } }).__lenis;
  lenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}
