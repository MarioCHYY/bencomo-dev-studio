/**
 * After a new deploy, a tab that was already open still points to the previous build's chunks,
 * which Vercel no longer serves, so the next lazy page fails with "Failed to fetch dynamically
 * imported module". Loading the page again picks up the new build. We do it once: if the
 * page reloaded for this less than 15 s ago, we don't try again (no reload loops).
 */
const KEY = "bencomo-chunk-reload";

export function isChunkError(error: unknown): boolean {
  const msg = String((error as { message?: string } | null)?.message ?? error ?? "");
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i.test(msg);
}

/** Reloads the page if it hasn't just done so. Returns true when a reload is under way. */
export function reloadOnce(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0);
    if (Date.now() - last < 15000) return false;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

/** Vite fires this when a chunk's preload fails; reloading beats showing an error. */
export function listenForStaleChunks() {
  window.addEventListener("vite:preloadError", (e) => {
    if (reloadOnce()) e.preventDefault();
  });
}
