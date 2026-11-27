// After `vite build`: one HTML file per page, ready for search engines and link previews.
// A single-page app sends the same empty HTML for every URL; crawlers and chat apps that don't run
// JavaScript would see nothing. For each route this writes dist/<route>/index.html with:
//   - its own title, description, canonical URL and preview image (WhatsApp, LinkedIn, X…)
//   - structured data (JSON-LD) describing who Mario is, what he offers and what each page is
//   - the page's real text (from src/seo/snapshots.json), which React replaces as soon as it loads
// plus sitemap.xml, robots.txt and a 404.html that Vercel serves with a real 404 status.
// Vercel serves these static files directly (see vercel.json).
import fs from "node:fs";
import path from "node:path";

// read as plain files (works on any Node version Vercel picks)
const json = (p) => JSON.parse(fs.readFileSync(new URL(p, import.meta.url), "utf8"));
const pages = json("../src/seo/pages.json");
const snapshots = json("../src/seo/snapshots.json");
const faq = json("../src/seo/faq.json");

const SITE = "https://www.mariobencomodev.com";
const dist = path.resolve("dist");
const base = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (p) => SITE + (p === "/" ? "/" : p);
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
};

/* ------------------------------------------------------------------ structured data */

const PERSON_ID = `${SITE}/#mario`;
const SITE_ID = `${SITE}/#website`;
const BIZ_ID = `${SITE}/#estudio`;
const SAME_AS = ["https://www.linkedin.com/in/mario-bencomo-4998273aa/", "https://github.com/MarioCHYY", "https://www.instagram.com/mario_bencomo06"];
const PLACE = { "@type": "PostalAddress", addressLocality: "Culiacán", addressRegion: "Sinaloa", addressCountry: "MX" };

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Mario Bencomo",
  url: `${SITE}/sobre-mi`,
  image: `${SITE}/about/mario-frente.webp`,
  jobTitle: "Diseñador UI/UX y desarrollador de apps",
  description: "Diseñador UI/UX y desarrollador full stack. Diseña y construye apps y productos digitales para fundadores, startups y equipos: prototipos, MVP, rediseño de producto y sistemas de diseño.",
  address: PLACE,
  sameAs: SAME_AS,
  knowsLanguage: ["es", "en"],
  knowsAbout: ["Diseño UI/UX", "Diseño de producto", "Diseño de interfaces", "Prototipos", "MVP", "Sistemas de diseño", "Figma", "Desarrollo de aplicaciones web", "React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "Tailwind CSS"],
};

const website = { "@type": "WebSite", "@id": SITE_ID, url: `${SITE}/`, name: "Mario Bencomo", inLanguage: "es-MX", publisher: { "@id": PERSON_ID } };

// the services, read from the services page itself: each h2 with the two lines under it
const services = [];
{
  const blocks = snapshots["/servicios"] || [];
  blocks.forEach((b, i) => {
    if (b.t !== "h2" || b.x.startsWith("¿")) return;
    const lines = [];
    for (let j = i + 1; j < blocks.length && blocks[j].t === "p" && lines.length < 2; j++) lines.push(blocks[j].x);
    services.push({ name: b.x, description: lines.join(" ") });
  });
}

const business = {
  "@type": "ProfessionalService",
  "@id": BIZ_ID,
  name: "Mario Bencomo · Diseño UI/UX y desarrollo de apps",
  url: `${SITE}/`,
  image: `${SITE}/og/home.jpg`,
  logo: `${SITE}/icon-512.png`,
  description: pages["/"].description,
  telephone: "+52 667 496 2484",
  address: PLACE,
  areaServed: [
    { "@type": "City", name: "Culiacán" },
    { "@type": "Country", name: "México" },
  ],
  founder: { "@id": PERSON_ID },
  knowsLanguage: ["es", "en"],
  sameAs: SAME_AS,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de diseño UI/UX y desarrollo de apps",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": BIZ_ID }, areaServed: "MX" },
    })),
  },
};

// ---- speed: each page preloads its own code and the fonts its first screen uses, so the browser
// fetches them in parallel with the main bundle instead of one after the other
const manifestPath = path.join(dist, ".vite", "manifest.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const PAGE_SRC = [
  ["/notas/", "src/pages/NoteDetail.tsx"],
  ["/servicios/", "src/pages/ServiceDetail.tsx"],
  ["/portafolio/corte", "src/pages/CaseCorte.tsx"],
  ["/portafolio/tachado", "src/pages/CaseTachado.tsx"],
  ["/portafolio", "src/pages/Portfolio.tsx"],
  ["/servicios", "src/pages/Services.tsx"],
  ["/notas", "src/pages/Notes.tsx"],
  ["/diseno-ui-ux-culiacan", "src/pages/UiUxCuliacan.tsx"],
  ["/ejemplos-paginas-web", "src/pages/Ejemplos.tsx"],
  ["/sobre-mi", "src/pages/About.tsx"],
  ["/contacto", "src/pages/Contact.tsx"],
  ["/privacidad", "src/pages/Privacy.tsx"],
];
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry);
const inEntry = new Set();
(function walk(k) {
  const m = manifest[k];
  if (!m || inEntry.has(m.file)) return;
  inEntry.add(m.file);
  (m.imports || []).forEach(walk);
})(entryKey);
const fontFile = (needle) => {
  const f = fs.readdirSync(path.join(dist, "assets")).find((n) => n.includes(needle) && n.endsWith(".woff2"));
  return f ? `/assets/${f}` : null;
};
const SANS_FONT = fontFile("plus-jakarta-sans-latin-wght-normal");
function preloadsFor(route) {
  const src = route === "/" ? "src/pages/Index.tsx" : PAGE_SRC.find(([r]) => (r.endsWith("/") ? route.startsWith(r) : route === r))?.[1];
  const files = [];
  const seen = new Set();
  (function walk(k) {
    const m = manifest[k];
    if (!m || seen.has(k)) return;
    seen.add(k);
    if (!inEntry.has(m.file)) files.push(m.file);
    (m.imports || []).forEach(walk);
  })(src);
  let out = files.map((f) => `    <link rel="modulepreload" crossorigin href="/${f}" />
`).join("");
  if (SANS_FONT) out += `    <link rel="preload" as="font" type="font/woff2" crossorigin href="${SANS_FONT}" />\n`;
  out += `    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/instrument-serif-latin-400-italic.woff2" />\n`;
  return out;
}

// the sources listed under each note, read straight from src/content/notes.ts
const notesSrc = fs.readFileSync(new URL("../src/content/notes.ts", import.meta.url), "utf8");
const noteSources = (route) => {
  const slug = route.split("/").pop();
  const start = notesSrc.indexOf(`slug: "${slug}"`);
  if (start < 0) return [];
  const next = notesSrc.indexOf("slug: ", start + 6);
  const chunk = notesSrc.slice(start, next < 0 ? undefined : next);
  return [...chunk.matchAll(/url: "(https?:[^"]+)"/g)].map((m) => m[1]);
};

const crumbs = (route) => {
  const parts = route.split("/").filter(Boolean);
  const list = [{ name: "Inicio", url: `${SITE}/` }];
  let acc = "";
  for (const p of parts) {
    acc += `/${p}`;
    // "/herramientas" has no page of its own: skip it in the trail
    if (!pages[acc] && acc !== route) continue;
    list.push({ name: pages[acc]?.name ?? p, url: abs(acc) });
  }
  return {
    "@type": "BreadcrumbList",
    itemListElement: list.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
  };
};

const caseWork = (route, extra) => ({
  "@type": "CreativeWork",
  "@id": `${abs(route)}#caso`,
  name: pages[route].name,
  headline: (snapshots[route] || []).find((b) => b.t === "h1")?.x ?? pages[route].title,
  description: pages[route].description,
  url: abs(route),
  image: SITE + pages[route].image,
  inLanguage: "es-MX",
  creator: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
  ...extra,
});

// the questions on a page, read from its own text: every h3 + answer under the "Lo que suelen preguntarme" heading
const faqFrom = (route) => {
  const blocks = snapshots[route] || [];
  const start = blocks.findIndex((b) => b.t === "h2" && b.x.startsWith("Lo que suelen preguntarme"));
  if (start < 0) return [];
  const out = [];
  for (let i = start + 1; i < blocks.length && blocks[i].t !== "h2"; i++) {
    if (blocks[i].t === "h3" && blocks[i + 1]?.t === "p") out.push({ q: blocks[i].x, a: blocks[i + 1].x });
  }
  return out;
};
const faqPage = (route, list) =>
  list.length
    ? [{ "@type": "FAQPage", "@id": `${abs(route)}#preguntas`, mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
    : [];
const AREA = [
  { "@type": "City", name: "Culiacán" },
  { "@type": "Country", name: "México" },
];

function graphFor(route) {
  const p = pages[route];
  const page = {
    "@id": `${abs(route)}#pagina`,
    url: abs(route),
    name: p.title,
    description: p.description,
    inLanguage: "es-MX",
    isPartOf: { "@id": SITE_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: SITE + p.image, width: 1200, height: 630 },
  };
  const g = [website, person];
  switch (route) {
    case "/":
      g.push(business, { "@type": "WebPage", ...page, about: { "@id": BIZ_ID } }, {
        "@type": "FAQPage",
        "@id": `${SITE}/#preguntas`,
        mainEntity: faq.es.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      });
      break;
    case "/sobre-mi":
      g.push({ "@type": "ProfilePage", ...page, mainEntity: { "@id": PERSON_ID }, breadcrumb: crumbs(route) });
      break;
    case "/portafolio":
      g.push({
        "@type": "CollectionPage",
        ...page,
        breadcrumb: crumbs(route),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: ["/portafolio/corte", "/portafolio/tachado"].map((r, i) => ({ "@type": "ListItem", position: i + 1, url: abs(r), name: pages[r].name })),
        },
      });
      break;
    case "/portafolio/corte":
      g.push(
        { "@type": "WebPage", ...page, breadcrumb: crumbs(route), mainEntity: { "@id": `${abs(route)}#caso` } },
        caseWork(route, { genre: "Caso de estudio", dateCreated: "2026", keywords: "app para repartir gastos, tarjeta de crédito, gastos compartidos, Next.js, TypeScript, PostgreSQL, diseño UI/UX, marca" }),
      );
      break;
    case "/portafolio/tachado":
      g.push(
        { "@type": "WebPage", ...page, breadcrumb: crumbs(route), mainEntity: { "@id": `${abs(route)}#caso` } },
        caseWork(route, { genre: "Caso de estudio", dateCreated: "2026", keywords: "bot de Telegram, historial de precios, Amazon México, ofertas, Python, SQLite, Next.js" }),
      );
      break;
    case "/servicios":
      g.push(business, { "@type": "WebPage", ...page, about: { "@id": BIZ_ID }, breadcrumb: crumbs(route) });
      break;
    case "/contacto":
      g.push(business, { "@type": "ContactPage", ...page, about: { "@id": BIZ_ID }, breadcrumb: crumbs(route) }, ...faqPage(route, faqFrom(route)));
      break;
    case "/diseno-ui-ux-culiacan":
      g.push(
        business,
        { "@type": "WebPage", ...page, about: { "@id": `${abs(route)}#servicio` }, breadcrumb: crumbs(route) },
        {
          "@type": "Service",
          "@id": `${abs(route)}#servicio`,
          name: "Diseño UI/UX y desarrollo de apps en Culiacán",
          serviceType: "Diseño UI/UX y desarrollo de aplicaciones",
          description: p.description,
          provider: { "@id": BIZ_ID },
          areaServed: AREA,
          url: abs(route),
        },
        ...faqPage(route, faqFrom(route)),
      );
      break;
    case "/notas":
      g.push({
        "@type": "Blog",
        ...page,
        breadcrumb: crumbs(route),
        author: { "@id": PERSON_ID },
        blogPost: Object.keys(pages)
          .filter((r) => r.startsWith("/notas/"))
          .map((r) => ({ "@type": "BlogPosting", headline: pages[r].name, url: abs(r), datePublished: pages[r].date, author: { "@id": PERSON_ID } })),
      });
      break;
    case "/ejemplos-paginas-web":
      g.push({
        "@type": "CollectionPage",
        ...page,
        breadcrumb: crumbs(route),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            ["Marejada", "Restaurante de mariscos", "marejada"],
            ["Molar", "Consultorio dental", "molar"],
            ["Fierro", "Gimnasio de box", "fierro"],
          ].map(([name, genre, id], i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CreativeWork",
              name: `${name}: rediseño de ejemplo (${genre.toLowerCase()})`,
              genre: "Diseño web de ejemplo",
              image: `${SITE}/ejemplos/${id}-despues-desk.webp`,
              creator: { "@id": PERSON_ID },
              inLanguage: "es-MX",
            },
          })),
        },
      });
      break;
    default:
      if (route.startsWith("/notas/")) {
        g.push(
          { "@type": "WebPage", ...page, breadcrumb: crumbs(route), mainEntity: { "@id": `${abs(route)}#nota` } },
          {
            "@type": "BlogPosting",
            "@id": `${abs(route)}#nota`,
            headline: p.name,
            description: p.description,
            url: abs(route),
            image: SITE + p.image,
            datePublished: p.date,
            dateModified: p.date,
            inLanguage: "es-MX",
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
            isPartOf: { "@id": `${abs("/notas")}#pagina` },
            mainEntityOfPage: { "@id": `${abs(route)}#pagina` },
            citation: noteSources(route),
          },
        );
        break;
      }
      if (route.startsWith("/servicios/")) {
        g.push(
          business,
          { "@type": "WebPage", ...page, about: { "@id": `${abs(route)}#servicio` }, breadcrumb: crumbs(route) },
          {
            "@type": "Service",
            "@id": `${abs(route)}#servicio`,
            name: p.name,
            serviceType: p.name,
            description: p.description,
            provider: { "@id": BIZ_ID },
            areaServed: AREA,
            url: abs(route),
          },
          ...faqPage(route, faqFrom(route)),
        );
        break;
      }
      g.push({ "@type": "WebPage", ...page, breadcrumb: crumbs(route) });
  }
  // "</" can't appear inside a <script> block
  return JSON.stringify({ "@context": "https://schema.org", "@graph": g }).replace(/</g, "\\u003c");
}

/* ------------------------------------------------------------------ the page's text, for crawlers */

const NAV = [
  ["/", "Inicio"],
  ["/sobre-mi", "Sobre mí"],
  ["/portafolio", "Mi trabajo"],
  ["/servicios", "Servicios"],
  ["/notas", "Notas"],
  ["/contacto", "Contacto"],
];

function textFor(route) {
  const blocks = snapshots[route] || [];
  let body = "";
  let list = false;
  const close = () => {
    if (list) body += "</ul>";
    list = false;
  };
  for (const b of blocks) {
    if (b.t === "li") {
      if (!list) body += "<ul>";
      list = true;
      body += `<li>${esc(b.x)}</li>`;
      continue;
    }
    close();
    if (b.t === "faq") body += faq.es.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("");
    else body += `<${b.t}>${esc(b.x)}</${b.t}>`;
  }
  close();
  const nav = NAV.map(([href, name]) => `<a href="${href}">${esc(name)}</a>`).join(" · ");
  const cases = [
    ["/portafolio/corte", "corte, caso de estudio"],
    ["/portafolio/tachado", "Tachado, caso de estudio"],
    ["/diseno-ui-ux-culiacan", "Diseño UI/UX y desarrollo de apps en Culiacán"],
    ["/ejemplos-paginas-web", "Ejemplos de páginas web: antes y después"],
  ]
    .map(([href, name]) => `<a href="${href}">${esc(name)}</a>`)
    .join(" · ");
  return (
    `<div class="seo-prerender" data-prerender>` +
    `<header><a href="/">Mario Bencomo</a><nav>${nav}</nav></header>` +
    `<main>${body}</main>` +
    `<footer><p>Mario Bencomo · Diseño UI/UX y desarrollo de apps y productos digitales.</p><p>${cases}</p><p><a href="/privacidad">Aviso de privacidad</a></p></footer>` +
    `</div>`
  );
}

// the saved text only exists for crawlers and no-JavaScript visitors; everyone else sees React's page,
// which replaces it on load, so it stays invisible meanwhile instead of flashing unstyled
const PRERENDER_CSS = `<style>.seo-prerender{opacity:0}</style><noscript><style>.seo-prerender{opacity:1;max-width:44rem;margin:0 auto;padding:6rem 1.5rem;font-family:system-ui,sans-serif;line-height:1.6}</style></noscript>`;

/* ------------------------------------------------------------------ write the pages */

for (const [route, p] of Object.entries(pages)) {
  const url = abs(route);
  const image = SITE + p.image;
  let html = base.replace(/<title>[^<]*<\/title>/i, `<title>${esc(p.title)}</title>`);
  html = setMeta(html, "name", "description", p.description);
  html = setMeta(html, "name", "robots", "index, follow, max-image-preview:large");
  html = setMeta(html, "property", "og:title", p.title);
  html = setMeta(html, "property", "og:description", p.description);
  html = setMeta(html, "property", "og:type", route.startsWith("/portafolio/") || route.startsWith("/notas/") ? "article" : route === "/sobre-mi" ? "profile" : "website");
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:image:width", "1200");
  html = setMeta(html, "property", "og:image:height", "630");
  html = setMeta(html, "property", "og:image:alt", p.title);
  html = setMeta(html, "property", "og:site_name", "Mario Bencomo");
  html = setMeta(html, "property", "og:locale", "es_MX");
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", p.title);
  html = setMeta(html, "name", "twitter:description", p.description);
  html = setMeta(html, "name", "twitter:image", image);
  html = html.replace(/<link rel="canonical"[^>]*>/i, "");
  html = html.replace(
    "</head>",
    `${preloadsFor(route)}    <link rel="canonical" href="${url}" />\n    <script type="application/ld+json">${graphFor(route)}</script>\n    ${PRERENDER_CSS}\n  </head>`,
  );
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${textFor(route)}</div>`);
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log("seo:", route, `(${(snapshots[route] || []).length} bloques de texto)`);
}

// done with the build manifest: it isn't something to publish
fs.rmSync(path.join(dist, ".vite"), { recursive: true, force: true });

// 404: the app shell (React shows its "not found" page), marked so it's never indexed
{
  let html = base.replace(/<title>[^<]*<\/title>/i, "<title>Página no encontrada · Mario Bencomo</title>");
  html = setMeta(html, "name", "robots", "noindex, follow");
  html = setMeta(html, "name", "description", "Esta página no existe. Vuelve al inicio para ver el trabajo de Mario Bencomo.");
  html = html.replace(/<meta property="og:url"[^>]*>\s*/i, "");
  fs.writeFileSync(path.join(dist, "404.html"), html);
}

// sitemap with every page and its preview image
{
  const urls = Object.entries(pages)
    .map(([route, p]) => {
      const priority = route === "/" ? "1.0" : route === "/diseno-ui-ux-culiacan" || route === "/ejemplos-paginas-web" || route.startsWith("/portafolio") || route.startsWith("/servicios") ? "0.9" : route === "/privacidad" ? "0.2" : "0.7";
      return `  <url>\n    <loc>${abs(route)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n    <image:image><image:loc>${SITE + p.image}</image:loc></image:image>\n  </url>`;
    })
    .join("\n");
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
  );
  fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  console.log("seo: sitemap.xml, robots.txt, 404.html");
}
