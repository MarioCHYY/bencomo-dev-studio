// After `vite build`: write one HTML file per page with its own title, description and preview image,
// so links shared on WhatsApp, LinkedIn, X, iMessage… show the right card. Those apps don't run
// JavaScript, they only read the HTML the server sends, which in a single-page app is the same for
// every URL. Vercel serves dist/<route>/index.html before falling back to the SPA rewrite.
import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.mariobencomodev.com";
const dist = path.resolve("dist");
const base = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const pages = {
  "/": {
    title: "Mario Bencomo · Diseño y desarrollo web",
    description: "Diseño y construyo productos digitales que se sienten vivos: sitios, apps y sistemas, con marca incluida. Desde Culiacán.",
    image: "/og/home.jpg",
  },
  "/sobre-mi": {
    title: "Sobre mí · Mario Bencomo",
    description: "Hola, soy Mario: desarrollador full stack con ojo de diseñador. Cómo trabajo, mi trayectoria y con qué construyo.",
    image: "/og/sobre-mi.jpg",
  },
  "/portafolio": {
    title: "Mi trabajo · Mario Bencomo",
    description: "Proyectos reales contados con su proceso: el problema, las decisiones y lo que hay por dentro.",
    image: "/og/portafolio.jpg",
  },
  "/portafolio/corte": {
    title: "corte · Caso de estudio · Mario Bencomo",
    description: "La tarjeta es de una, las compras son de todos: una app para repartir gastos y controlar la tarjeta de crédito que usa toda la casa.",
    image: "/og/corte.jpg",
  },
  "/portafolio/tachado": {
    title: "Tachado · Caso de estudio · Mario Bencomo",
    description: "Un bot de Telegram que guarda el historial de precios de Amazon México y revisa si cada oferta es un descuento real o un precio inflado.",
    image: "/og/tachado.jpg",
  },
  "/servicios": {
    title: "Servicios · Mario Bencomo",
    description: "Sitios web, apps y sistemas a la medida, con diseño y marca. Lo que puedo construir para ti.",
    image: "/og/servicios.jpg",
  },
  "/contacto": {
    title: "Contacto · Mario Bencomo",
    description: "Cuéntame de tu proyecto y te respondo.",
    image: "/og/contacto.jpg",
  },
  "/privacidad": {
    title: "Aviso de privacidad · Mario Bencomo",
    description: "Qué datos se recogen en este sitio, para qué y cómo pedir que se borren.",
    image: "/og/privacidad.jpg",
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
};

for (const [route, p] of Object.entries(pages)) {
  const url = SITE + (route === "/" ? "" : route);
  const image = SITE + p.image;
  let html = base.replace(/<title>[^<]*<\/title>/i, `<title>${esc(p.title)}</title>`);
  html = setMeta(html, "name", "description", p.description);
  html = setMeta(html, "property", "og:title", p.title);
  html = setMeta(html, "property", "og:description", p.description);
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
  html = html.replace("</head>", `    <link rel="canonical" href="${url}" />\n  </head>`);
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log("meta:", route);
}
