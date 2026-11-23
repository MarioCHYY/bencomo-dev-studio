/**
 * Reads the real text of every page (headings, paragraphs, list items) from a built copy of the site
 * and saves it to src/seo/snapshots.json. The build then puts that text inside each page's HTML, so
 * search engines and AI crawlers that don't run JavaScript still read what the page says.
 *
 * Run it again whenever page copy changes:
 *   npm run build && npx vite preview --port 4173   (in another terminal)
 *   node scripts/seo-snapshot.mjs http://localhost:4173
 * Needs Playwright with Chromium (npx playwright install chromium).
 */
import fs from "node:fs";
import { chromium } from "playwright";
import pages from "../src/seo/pages.json" with { type: "json" };

const base = process.argv[2] || "http://localhost:4173";
const browser = await chromium.launch();
const out = {};

for (const route of Object.keys(pages)) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    localStorage.setItem("lang", "es");
    sessionStorage.setItem("bencomo-intro-v2", "1");
  });
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  out[route] = await page.evaluate(() => {
    // sections that skip rendering off screen (content-visibility) would read as empty
    document.querySelectorAll(".cv-auto").forEach((e) => (e.style.contentVisibility = "visible"));
    const main = document.querySelector("main") || document.body;
    const TAGS = "h1,h2,h3,h4,p,li,blockquote,dt,dd,.sr-only,ul[data-seo-faq]";
    // live bits (the clock, today's sunset) are left out: they'd be stale in a saved copy
    const hidden = (el) => !!el.closest('[aria-hidden="true"],nav,header,footer,[data-bp-ui],[data-seo-skip]');
    const clean = (s) => s.replace(/\s+/g, " ").trim();
    const blocks = [];
    for (const el of main.querySelectorAll(TAGS)) {
      // the FAQ is an accordion (only one answer open): the build writes all of it from src/seo/faq.json
      if (el.matches("ul[data-seo-faq]")) {
        blocks.push({ t: "faq", x: "faq" });
        continue;
      }
      if (el.closest("[data-seo-faq]")) continue;
      if (el.classList.contains("sr-only")) {
        // a screen-reader copy of text drawn word by word: use it unless a heading/paragraph around it is taken already
        if (el.parentElement?.closest("h1,h2,h3,h4,p,li")) continue;
        if (hidden(el)) continue;
        const x = clean(el.textContent || "");
        if (x) blocks.push({ t: "p", x });
        continue;
      }
      if (hidden(el)) continue;
      if (el.tagName === "LI" && el.querySelector("h1,h2,h3,h4,p")) continue;
      if (el.tagName === "P" && el.closest("h1,h2,h3,h4")) continue;
      const sr = el.querySelector(":scope > .sr-only, :scope .sr-only");
      const x = clean(sr ? sr.textContent || "" : el.innerText || "");
      if (!x) continue;
      const t = el.tagName.toLowerCase();
      blocks.push({ t: t === "blockquote" || t === "dt" || t === "dd" ? "p" : t, x });
    }
    // drop repeats (the same line drawn twice for an effect)
    return blocks.filter((b, i) => !blocks.slice(0, i).some((p) => p.x === b.x));
  });
  console.log(route, out[route].length, "bloques");
  await page.close();
}
await browser.close();
fs.writeFileSync(new URL("../src/seo/snapshots.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
