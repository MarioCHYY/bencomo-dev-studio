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
  jobTitle: "Desarrollador web full stack",
  description: "Desarrollador full stack con ojo de diseñador en Culiacán, Sinaloa. Diseña y construye sitios, apps y sistemas a la medida, con marca incluida.",
  address: PLACE,
  sameAs: SAME_AS,
  knowsLanguage: ["es", "en"],
  knowsAbout: ["Desarrollo web", "Diseño web", "Diseño UI/UX", "Identidad de marca", "React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "Tailwind CSS"],
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
  name: "Mario Bencomo · Diseño y desarrollo web",
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
    name: "Servicios de diseño y desarrollo web",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": BIZ_ID }, areaServed: "MX" },
    })),
  },
};

const crumbs = (route) => {
  const parts = route.split("/").filter(Boolean);
  const list = [{ name: "Inicio", url: `${SITE}/` }];
  let acc = "";
  for (const p of parts) {
    acc += `/${p}`;
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
      g.push(business, { "@type": "ContactPage", ...page, about: { "@id": BIZ_ID }, breadcrumb: crumbs(route) });
      break;
    default:
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
  ]
    .map(([href, name]) => `<a href="${href}">${esc(name)}</a>`)
    .join(" · ");
  return (
    `<div class="seo-prerender" data-prerender>` +
    `<header><a href="/">Mario Bencomo</a><nav>${nav}</nav></header>` +
    `<main>${body}</main>` +
    `<footer><p>Mario Bencomo · Diseño y desarrollo web en Culiacán, Sinaloa, México.</p><p>${cases}</p><p><a href="/privacidad">Aviso de privacidad</a></p></footer>` +
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
  html = setMeta(html, "property", "og:type", route.startsWith("/portafolio/") ? "article" : route === "/sobre-mi" ? "profile" : "website");
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
    `    <link rel="canonical" href="${url}" />\n    <script type="application/ld+json">${graphFor(route)}</script>\n    ${PRERENDER_CSS}\n  </head>`,
  );
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${textFor(route)}</div>`);
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log("seo:", route, `(${(snapshots[route] || []).length} bloques de texto)`);
}

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
      const priority = route === "/" ? "1.0" : route.startsWith("/portafolio") || route === "/servicios" ? "0.9" : route === "/privacidad" ? "0.2" : "0.7";
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
