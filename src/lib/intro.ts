/**
 * The opening cut plays once per visit (per browser tab), when the site is first opened.
 * Components that want to start with it (the hero copy) wait for "open".
 */
const KEY = "bencomo-intro-v2";

function decide(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(KEY) === "1") return false;
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode: just play it */
  }
  return true;
}

export const introPlays = decide();
let open = !introPlays;
const subs = new Set<() => void>();

export const isIntroOpen = () => open;
export function markIntroOpen() {
  if (open) return;
  open = true;
  subs.forEach((f) => f());
  subs.clear();
}
export function onIntroOpen(f: () => void) {
  if (open) {
    f();
    return () => undefined;
  }
  subs.add(f);
  return () => {
    subs.delete(f);
  };
}
