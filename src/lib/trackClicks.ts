/**
 * Counts taps on the WhatsApp links (and the email link) as Vercel Analytics events, with the page
 * they came from. One listener for the whole site, so every WhatsApp button counts, old and new.
 * Custom events show up in Vercel only on its paid plans; on the free plan this does nothing.
 */
declare global {
  interface Window {
    va?: (cmd: "event", data: { name: string; data?: Record<string, string> }) => void;
  }
}

export function trackContactClicks() {
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const name = /wa\.me|whatsapp\.com/.test(href) ? "WhatsApp" : href.startsWith("mailto:") ? "Correo" : null;
      if (!name) return;
      try {
        window.va?.("event", { name, data: { pagina: location.pathname } });
      } catch {
        /* analytics never gets in the way of the click */
      }
    },
    { capture: true, passive: true },
  );
}
