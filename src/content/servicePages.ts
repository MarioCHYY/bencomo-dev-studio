/**
 * Extra content for the one-page-per-service routes (/servicios/:id) and the Culiacán landing page.
 * The title, subtitle, description and deliverables of each service come from translations.ts
 * (the same text as /servicios); this file adds who it's for, how it's done, its questions and a
 * related case. Only things Mario actually does: no prices, delivery times or results promised.
 */

type L = { es: string; en: string };
export type CaseRef = "corte" | "tachado";

/** a real screen from a live project, shown under "Cómo se ve" */
export interface Shot {
  src: string;
  kind: "phone" | "wide";
  caption: L;
  url?: string;
}

export interface ServicePage {
  id: string;
  intro: L;
  /** real screens related to this service (corte and Tachado only) */
  shots: Shot[];
  /** steps specific to this service; the general three are used when missing */
  process?: { title: L; text: L }[];
  forWho: { title: L; text: L }[];
  how: L[];
  faqs: { q: L; a: L }[];
  caseRef: CaseRef;
  related: string[];
}

const COST: { q: L; a: L } = {
  q: { es: "¿Cuánto cuesta?", en: "How much does it cost?" },
  a: {
    es: "Depende del alcance y de lo que necesites que haga. Después de una primera llamada te mando una propuesta por escrito con el precio y todo lo que incluye.",
    en: "It depends on the scope and what you need it to do. After a first call I send you a written proposal with the price and everything it includes.",
  },
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    id: "sitios-web",
    shots: [
      { src: "/work/corte/opengraph-image.png", kind: "wide", caption: { es: "Portada del sitio de corte: una idea, una frase y la app en la mano.", en: "corte's site cover: one idea, one line and the app in hand." } },
      { src: "/work/tachado/panel.webp", kind: "wide", url: "tachado.mariobencomodev.com", caption: { es: "La página de Tachado: el precio inflado, tachado de verdad.", en: "Tachado's website: the inflated price, actually crossed out." } },
    ],
    intro: {
      es: "Un sitio que se ve como tu negocio y no como una plantilla. Lo diseño a partir de tu marca, lo programo desde cero y lo dejo listo para que la gente te encuentre en Google y te escriba.",
      en: "A site that looks like your business, not like a template. I design it from your brand, build it from scratch and leave it ready for people to find you on Google and get in touch.",
    },
    forWho: [
      {
        title: { es: "Negocios sin página", en: "Businesses without a website" },
        text: { es: "Si hoy dependes solo de redes sociales y quieres un lugar propio donde explicar qué haces y recibir mensajes.", en: "If you rely only on social media and want a place of your own to explain what you do and receive messages." },
      },
      {
        title: { es: "Páginas que no te representan", en: "Sites that don't represent you" },
        text: { es: "Si tu sitio actual se ve genérico o viejo y no transmite la calidad de lo que ofreces.", en: "If your current site looks generic or dated and doesn't reflect the quality of what you offer." },
      },
      {
        title: { es: "Profesionistas y marcas personales", en: "Professionals and personal brands" },
        text: { es: "Doctores, abogados, consultores o creativos que necesitan una presencia seria y fácil de encontrar.", en: "Doctors, lawyers, consultants or creatives who need a serious presence that's easy to find." },
      },
    ],
    how: [
      {
        es: "Empiezo por entender a quién le hablas y qué quieres que haga quien entra: llamarte, escribirte por WhatsApp, agendar o comprar. Con eso defino la estructura y el diseño, para que cada sección lleve a ese paso.",
        en: "I start by understanding who you're talking to and what you want visitors to do: call you, message you on WhatsApp, book or buy. That shapes the structure and the design, so every section leads to that step.",
      },
      {
        es: "Después lo programo a la medida, sin plantillas pesadas: carga rápido, se ve bien en cualquier celular y lleva lo que Google necesita para entenderlo, como títulos, descripciones, mapa del sitio y datos estructurados.",
        en: "Then I build it to measure, without heavy templates: it loads fast, looks right on any phone and carries what Google needs to understand it, like titles, descriptions, a sitemap and structured data.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Necesito tener logo y colores antes de empezar?", en: "Do I need a logo and colors before we start?" },
        a: { es: "No. Si ya tienes marca, diseño a partir de ella; si no, la podemos definir juntos como parte del proyecto.", en: "No. If you already have a brand I design from it; if not, we can define it together as part of the project." },
      },
      {
        q: { es: "¿Mi página va a aparecer en Google?", en: "Will my site show up on Google?" },
        a: {
          es: "La dejo preparada para que Google la entienda y la muestre: títulos, descripciones, velocidad y mapa del sitio. Posicionarse toma semanas y también ayuda tener tu Perfil de Negocio de Google.",
          en: "I leave it ready for Google to understand and show it: titles, descriptions, speed and a sitemap. Ranking takes weeks, and having a Google Business Profile helps too.",
        },
      },
      COST,
    ],
    caseRef: "corte",
    related: ["rediseno-web", "ui-ux", "prototipos-funcionales"],
  },
  {
    id: "ui-ux",
    process: [
      { title: { es: "Entender a quien lo va a usar", en: "Understand who will use it" }, text: { es: "Quién es, qué quiere lograr y dónde se atora hoy. Sin esto, cualquier pantalla bonita es una apuesta.", en: "Who they are, what they want to get done and where they get stuck today. Without this, any pretty screen is a gamble." } },
      { title: { es: "Ordenar antes de decorar", en: "Organise before decorating" }, text: { es: "Arquitectura de la información y flujos: qué va primero, qué se agrupa y qué sobra.", en: "Information architecture and flows: what comes first, what goes together and what's left out." } },
      { title: { es: "Wireframes navegables", en: "Clickable wireframes" }, text: { es: "Pantallas en gris que ya se pueden recorrer. Se prueban y se corrigen cuando cambiar algo todavía es barato.", en: "Grey screens you can already click through. They're tested and fixed while changing things is still cheap." } },
      { title: { es: "Diseño visual y sistema", en: "Visual design and system" }, text: { es: "Colores, tipografía, componentes y estados (vacío, cargando, error) para que todo se sienta del mismo producto.", en: "Colours, type, components and states (empty, loading, error) so everything feels like one product." } },
      { title: { es: "De Figma a código", en: "From Figma to code" }, text: { es: "Como también programo, reviso que lo construido se vea y se mueva igual que el diseño, hasta el último detalle.", en: "Since I also code, I make sure what's built looks and moves exactly like the design, down to the last detail." } },
    ],
    shots: [
      { src: "/work/corte/resumen.webp", kind: "phone", caption: { es: "Resumen: cuánto debe cada quien, sin hacer cuentas.", en: "Summary: what each person owes, no maths." } },
      { src: "/work/corte/gasto.webp", kind: "phone", caption: { es: "Agregar un gasto: lo mínimo para no estorbar.", en: "Adding an expense: the bare minimum, out of the way." } },
      { src: "/work/corte/movimientos.webp", kind: "phone", caption: { es: "Movimientos ordenados por corte, como en el estado de cuenta.", en: "Transactions grouped by statement, like the bank's." } },
    ],
    intro: {
      es: "Es lo que más disfruto hacer. Una buena interfaz no se nota: la gente entiende qué hacer sin pensarlo y se queda porque se siente bien usarla. Diseño pantallas para apps, plataformas y sistemas con ese objetivo, y como también programo, lo que diseño se construye tal cual.",
      en: "It's what I enjoy most. A good interface goes unnoticed: people know what to do without thinking and stay because it feels good to use. I design screens for apps, platforms and systems with that goal, and since I also code, what I design gets built as is.",
    },
    forWho: [
      {
        title: { es: "Apps o plataformas nuevas", en: "New apps or platforms" },
        text: { es: "Si vas a construir un producto y quieres el diseño resuelto antes de programar.", en: "If you're about to build a product and want the design solved before coding." },
      },
      {
        title: { es: "Sistemas que nadie entiende", en: "Systems nobody understands" },
        text: { es: "Si tu equipo o tus clientes se pierden, se equivocan o te preguntan cómo se usa.", en: "If your team or your clients get lost, make mistakes or keep asking how it works." },
      },
      {
        title: { es: "Equipos sin diseñador", en: "Teams without a designer" },
        text: { es: "Si ya tienes quien programe pero necesitas las pantallas y un sistema de diseño claro.", en: "If you already have developers but need the screens and a clear design system." },
      },
    ],
    how: [
      {
        es: "Primero ordeno la información y los flujos: qué ve el usuario, en qué orden y qué decide en cada paso. Lo pruebo en wireframes navegables antes de cuidar colores y detalles.",
        en: "First I organize the information and the flows: what users see, in what order and what they decide at each step. I test it with clickable wireframes before polishing colors and details.",
      },
      {
        es: "Luego defino el sistema de diseño (colores, tipografía y componentes) para que todas las pantallas se sientan parte del mismo producto y sea fácil crecerlo.",
        en: "Then I define the design system (colors, type and components) so every screen feels part of the same product and it's easy to grow.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Entregas solo el diseño o también lo programas?", en: "Do you deliver only the design or build it too?" },
        a: { es: "Las dos cosas. Puedo entregarte el diseño listo para que lo programe tu equipo, o diseñarlo y construirlo yo.", en: "Either. I can hand over the design ready for your team to build, or design it and build it myself." },
      },
      {
        q: { es: "¿En qué herramienta diseñas?", en: "What tool do you design in?" },
        a: { es: "En Figma, así que puedes revisar, comentar y compartir cada pantalla desde tu navegador.", en: "Figma, so you can review, comment on and share every screen from your browser." },
      },
      COST,
    ],
    caseRef: "corte",
    related: ["prototipos-funcionales", "aplicaciones-web", "sitios-web"],
  },
  {
    id: "aplicaciones-web",
    shots: [
      { src: "/work/corte/corte.webp", kind: "phone", caption: { es: "El estado de cuenta por persona: cuánto y para cuándo.", en: "The statement per person: how much and by when." } },
      { src: "/work/corte/cuenta.webp", kind: "phone", caption: { es: "La cuenta: tarjetas, personas y fechas en un solo lugar.", en: "The account: cards, people and dates in one place." } },
      { src: "/work/corte/resumen.webp", kind: "phone", caption: { es: "Resumen: cuánto debe cada quien, sin hacer cuentas.", en: "Summary: what each person owes, no maths." } },
    ],
    intro: {
      es: "Cuando una página no alcanza y necesitas que la gente inicie sesión, guarde información o haga operaciones, lo que necesitas es una aplicación web. La diseño y la programo completa: lo que ve el usuario, la lógica y la base de datos.",
      en: "When a website isn't enough and people need to sign in, save information or carry out operations, what you need is a web app. I design and build all of it: what users see, the logic and the database.",
    },
    forWho: [
      {
        title: { es: "Ideas con usuarios y datos", en: "Ideas with users and data" },
        text: { es: "Plataformas donde tus clientes se registran, consultan o hacen operaciones.", en: "Platforms where your clients sign up, look things up or carry out operations." },
      },
      {
        title: { es: "Paneles internos", en: "Internal dashboards" },
        text: { es: "Para ver y administrar la información de tu negocio en un solo lugar.", en: "To see and manage your business's information in one place." },
      },
      {
        title: { es: "Procesos que viven en Excel", en: "Processes living in Excel" },
        text: { es: "Cuando una hoja de cálculo ya no alcanza y se presta a errores.", en: "When a spreadsheet is no longer enough and invites mistakes." },
      },
    ],
    how: [
      {
        es: "Trabajo principalmente con React, TypeScript y Node.js o Python, con bases de datos como PostgreSQL. Elijo la herramienta según lo que necesita tu proyecto, no al revés.",
        en: "I mainly work with React, TypeScript and Node.js or Python, with databases like PostgreSQL. I pick the tool for what your project needs, not the other way around.",
      },
      {
        es: "corte es un ejemplo: una app instalable que reparte los gastos de una tarjeta de crédito entre varias personas, con su fecha de corte y sus meses sin intereses. Está en línea y se puede usar hoy.",
        en: "corte is an example: an installable app that splits a credit card's expenses between several people, with its statement date and interest-free installments. It's live and you can use it today.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Funciona en celular?", en: "Does it work on phones?" },
        a: { es: "Sí. La diseño pensando primero en el celular y, si el proyecto lo necesita, se puede instalar como app desde el navegador, como corte.", en: "Yes. I design it phone-first and, if the project needs it, it can be installed as an app from the browser, like corte." },
      },
      {
        q: { es: "¿Dónde vive la aplicación?", en: "Where does the app live?" },
        a: { es: "La publico en servicios de hosting en la nube y te la entrego con el despliegue listo para producción.", en: "I publish it on cloud hosting and hand it over with deployment ready for production." },
      },
      COST,
    ],
    caseRef: "corte",
    related: ["sistemas-negocios", "ui-ux", "prototipos-funcionales"],
  },
  {
    id: "sistemas-negocios",
    shots: [
      { src: "/work/tachado/grafica.webp", kind: "wide", caption: { es: "El historial de precios que Tachado guarda de cada producto.", en: "The price history Tachado keeps for every product." } },
      { src: "/work/tachado/ofertas.webp", kind: "wide", url: "tachado.mariobencomodev.com/ofertas", caption: { es: "Ofertas revisadas solas: cuáles son reales y cuáles están infladas.", en: "Deals checked automatically: which are real and which are inflated." } },
    ],
    intro: {
      es: "Cotizaciones que se arman a mano, inventario en una libreta, cobros que se pierden en WhatsApp. Construyo sistemas que ordenan esos procesos para que tu negocio funcione con menos trabajo manual y menos errores.",
      en: "Quotes put together by hand, inventory in a notebook, payments lost in WhatsApp chats. I build systems that bring order to those processes so your business runs with less manual work and fewer mistakes.",
    },
    forWho: [
      {
        title: { es: "Negocios que cotizan seguido", en: "Businesses that quote often" },
        text: { es: "Para generar cotizaciones y reportes al instante en lugar de armarlos uno por uno.", en: "To generate quotes and reports instantly instead of building them one by one." },
      },
      {
        title: { es: "Inventario o pedidos", en: "Inventory or orders" },
        text: { es: "Para saber qué tienes, qué salió y qué falta sin contar a mano.", en: "To know what you have, what went out and what's missing without counting by hand." },
      },
      {
        title: { es: "Cobros en línea", en: "Online payments" },
        text: { es: "Para recibir pagos y llevar el control de quién ya pagó.", en: "To take payments and keep track of who has paid." },
      },
    ],
    how: [
      {
        es: "Antes de programar reviso contigo cómo funciona el proceso hoy y dónde se pierde el tiempo. El sistema se diseña alrededor de tu operación, no al revés.",
        en: "Before coding, I go through how the process works today and where time gets lost. The system is designed around how you operate, not the other way around.",
      },
      {
        es: "Te entrego un panel fácil de usar y te muestro avances en cada etapa para que lo pruebes con tu equipo antes de que esté terminado.",
        en: "You get an easy-to-use dashboard, and I show you progress at every stage so your team can try it before it's finished.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Se puede conectar con lo que ya uso?", en: "Can it connect to what I already use?" },
        a: { es: "En muchos casos sí: hojas de cálculo, formularios o servicios de pago. Lo revisamos en la primera llamada y, si algo no se puede, te lo digo desde el principio.", en: "Often yes: spreadsheets, forms or payment services. We look at it on the first call, and if something can't be done I tell you up front." },
      },
      {
        q: { es: "¿Mi equipo va a saber usarlo?", en: "Will my team know how to use it?" },
        a: { es: "La idea es que sí, sin manual: diseño cada pantalla para que sea clara y la ajusto con lo que tu equipo me diga mientras lo prueba.", en: "That's the goal, without a manual: I design every screen to be clear and adjust it with what your team tells me while testing." },
      },
      COST,
    ],
    caseRef: "tachado",
    related: ["automatizacion", "aplicaciones-web", "ui-ux"],
  },
  {
    id: "rediseno-web",
    shots: [
      { src: "/work/tachado/panel.webp", kind: "wide", url: "tachado.mariobencomodev.com", caption: { es: "La página de Tachado: el precio inflado, tachado de verdad.", en: "Tachado's website: the inflated price, actually crossed out." } },
      { src: "/work/corte/corte-intro.jpg", kind: "wide", caption: { es: "La marca de corte: logo, color y movimiento pensados juntos.", en: "corte's brand: logo, colour and motion designed together." } },
    ],
    intro: {
      es: "Si tu página se ve anticuada, carga lento o no te trae mensajes, no siempre hay que empezar de cero. Reviso lo que tienes, te digo qué conviene mejorar y qué conviene rehacer, y la transformo.",
      en: "If your site looks dated, loads slowly or doesn't bring you messages, you don't always have to start over. I review what you have, tell you what's worth improving and what's worth redoing, and transform it.",
    },
    forWho: [
      {
        title: { es: "Páginas que se ven viejas", en: "Sites that look old" },
        text: { es: "Diseños de hace años que ya no transmiten lo que tu negocio es hoy.", en: "Designs from years ago that no longer reflect what your business is today." },
      },
      {
        title: { es: "Lentas o rotas en celular", en: "Slow or broken on phones" },
        text: { es: "Si tarda en abrir o se ve mal en el teléfono, mucha gente se va antes de leerla.", en: "If it's slow to open or looks wrong on a phone, many people leave before reading it." },
      },
      {
        title: { es: "Páginas que nadie encuentra", en: "Sites nobody finds" },
        text: { es: "Si no apareces en Google ni cuando te buscan por tu nombre.", en: "If you don't show up on Google even when people search your name." },
      },
    ],
    how: [
      {
        es: "Empiezo con un diagnóstico: diseño, estructura, velocidad, cómo se ve en celular y qué tanto la entiende Google. Te lo explico sin tecnicismos.",
        en: "I start with a diagnosis: design, structure, speed, how it looks on phones and how well Google understands it. I explain it without jargon.",
      },
      {
        es: "Con eso propongo la nueva estructura y el diseño, y mejoro la velocidad y el SEO básico. Lo que ya funciona y tiene valor, como tus textos o tu marca, se conserva.",
        en: "From there I propose the new structure and design, and improve speed and basic SEO. What already works and has value, like your copy or your brand, stays.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Pierdo lo que ya tengo en Google?", en: "Will I lose what I already have on Google?" },
        a: { es: "Cuido que las direcciones importantes se mantengan o redirijan a su nueva versión, para no perder lo que ya habías ganado.", en: "I make sure important addresses stay or redirect to their new version, so you don't lose what you'd already earned." },
      },
      {
        q: { es: "¿Sirve si mi página está en WordPress, Wix u otra plataforma?", en: "Does it work if my site is on WordPress, Wix or another platform?" },
        a: { es: "Sí, puedo revisarla. Según el diagnóstico te digo si conviene ajustarla o rehacerla, y por qué.", en: "Yes, I can review it. Based on the diagnosis I tell you whether it's worth adjusting or rebuilding, and why." },
      },
      COST,
    ],
    caseRef: "tachado",
    related: ["sitios-web", "ui-ux", "aplicaciones-web"],
  },
  {
    id: "prototipos-funcionales",
    shots: [
      { src: "/work/corte/recorrido.jpg", kind: "wide", caption: { es: "Recorrido por la app de corte, de principio a fin.", en: "A walk through the corte app, start to finish." } },
      { src: "/work/corte/gasto.webp", kind: "phone", caption: { es: "Agregar un gasto: lo mínimo para no estorbar.", en: "Adding an expense: the bare minimum, out of the way." } },
      { src: "/work/corte/movimientos.webp", kind: "phone", caption: { es: "Movimientos ordenados por corte, como en el estado de cuenta.", en: "Transactions grouped by statement, like the bank's." } },
    ],
    intro: {
      es: "Antes de invertir en construir todo, conviene saber si tu idea funciona. Hago demos navegables que se sienten como el producto real, para que las pruebes con clientes o las presentes a inversionistas.",
      en: "Before investing in building everything, it's worth knowing whether your idea works. I make clickable demos that feel like the real product, so you can test them with clients or pitch them to investors.",
    },
    forWho: [
      {
        title: { es: "Emprendedores con una idea", en: "Founders with an idea" },
        text: { es: "Para mostrar cómo funcionaría tu producto sin construirlo completo.", en: "To show how your product would work without building all of it." },
      },
      {
        title: { es: "Inversionistas o socios", en: "Investors or partners" },
        text: { es: "Una demo que se puede tocar convence más que una presentación.", en: "A demo you can touch convinces more than a slide deck." },
      },
      {
        title: { es: "Empresas que van a invertir en software", en: "Companies about to invest in software" },
        text: { es: "Para validar el flujo con usuarios reales antes de pagar el desarrollo final.", en: "To validate the flow with real users before paying for the final build." },
      },
    ],
    how: [
      {
        es: "Definimos el recorrido más importante del usuario y lo hago navegable de principio a fin, con un diseño cercano a como se vería el producto final.",
        en: "We define the user's most important journey and I make it clickable end to end, with a design close to how the final product would look.",
      },
      {
        es: "Con lo que te digan quienes lo prueben hago ajustes rápidos, y la base queda lista para pasar al desarrollo completo si decides seguir.",
        en: "With what testers tell you I make quick adjustments, and the base is ready to move into full development if you decide to go ahead.",
      },
    ],
    faqs: [
      {
        q: { es: "¿El prototipo ya es una app que funciona?", en: "Is the prototype a working app?" },
        a: { es: "Simula el producto real: se navega, se toca y responde, pero no tiene toda la lógica detrás. Por eso es más rápido de hacer que el producto completo.", en: "It simulates the real product: you can navigate, tap and get responses, but it doesn't have all the logic behind it. That's why it's quicker to make than the full product." },
      },
      {
        q: { es: "¿Se aprovecha después?", en: "Is it reused afterwards?" },
        a: { es: "Sí. El diseño y la estructura sirven como base para construir el producto completo.", en: "Yes. The design and structure are the base for building the full product." },
      },
      COST,
    ],
    caseRef: "corte",
    related: ["ui-ux", "aplicaciones-web", "sitios-web"],
  },
  {
    id: "automatizacion",
    shots: [
      { src: "/work/tachado/ofertas.webp", kind: "wide", url: "tachado.mariobencomodev.com/ofertas", caption: { es: "Ofertas revisadas solas: cuáles son reales y cuáles están infladas.", en: "Deals checked automatically: which are real and which are inflated." } },
      { src: "/work/tachado/grafica.webp", kind: "wide", caption: { es: "El historial de precios que Tachado guarda de cada producto.", en: "The price history Tachado keeps for every product." } },
    ],
    intro: {
      es: "Copiar datos de un lado a otro, armar el mismo reporte cada semana, revisar páginas a mano. Esas tareas se pueden automatizar para que se hagan solas, sin errores y a cualquier hora.",
      en: "Copying data from one place to another, building the same report every week, checking websites by hand. Those tasks can be automated so they run on their own, without mistakes, at any hour.",
    },
    forWho: [
      {
        title: { es: "Reportes hechos a mano", en: "Reports made by hand" },
        text: { es: "Para que se generen solos con la información al día.", en: "So they generate themselves with up-to-date information." },
      },
      {
        title: { es: "Información que revisas seguido", en: "Information you check often" },
        text: { es: "Precios, disponibilidad o datos de otras páginas que hoy alguien revisa a mano.", en: "Prices, availability or data from other sites that someone checks by hand today." },
      },
      {
        title: { es: "Programas que no se hablan", en: "Apps that don't talk to each other" },
        text: { es: "Para que lo que entra en uno, como un formulario o una venta, llegue solo al otro.", en: "So what comes into one, like a form or a sale, reaches the other on its own." },
      },
    ],
    how: [
      {
        es: "Tachado es un ejemplo: un bot que revisa precios de Amazon México de forma automática, guarda su historial y avisa por Telegram cuando algo baja de verdad.",
        en: "Tachado is an example: a bot that checks Amazon Mexico prices automatically, keeps their history and sends a Telegram alert when something truly drops.",
      },
      {
        es: "Empiezo por identificar qué tarea te quita más tiempo, la automatizo y te muestro cómo revisar que todo siga funcionando.",
        en: "I start by finding the task that costs you the most time, automate it and show you how to check that everything keeps working.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Qué se puede automatizar?", en: "What can be automated?" },
        a: { es: "Casi cualquier tarea repetitiva que siga reglas claras: mover datos, generar reportes, revisar información o mandar avisos. En la primera llamada vemos cuál conviene primero.", en: "Almost any repetitive task with clear rules: moving data, generating reports, checking information or sending alerts. On the first call we see which one to start with." },
      },
      {
        q: { es: "¿Tengo que cambiar los programas que ya uso?", en: "Do I have to change the apps I already use?" },
        a: { es: "Normalmente no. La idea es conectar lo que ya usas; si algo no se puede conectar, te lo digo desde el principio.", en: "Usually not. The idea is to connect what you already use; if something can't be connected, I tell you up front." },
      },
      COST,
    ],
    caseRef: "tachado",
    related: ["inteligencia-artificial", "sistemas-negocios", "aplicaciones-web"],
  },
  {
    id: "inteligencia-artificial",
    shots: [
      { src: "/work/tachado/ofertas.webp", kind: "wide", url: "tachado.mariobencomodev.com/ofertas", caption: { es: "Ofertas revisadas solas: cuáles son reales y cuáles están infladas.", en: "Deals checked automatically: which are real and which are inflated." } },
      { src: "/work/tachado/grafica.webp", kind: "wide", caption: { es: "El historial de precios que Tachado guarda de cada producto.", en: "The price history Tachado keeps for every product." } },
    ],
    intro: {
      es: "La inteligencia artificial sirve cuando resuelve algo concreto: contestar las preguntas de siempre, resumir documentos largos u ordenar información. La integro en tu negocio con ese enfoque práctico.",
      en: "AI is useful when it solves something concrete: answering the usual questions, summarizing long documents or organizing information. I bring it into your business with that practical focus.",
    },
    forWho: [
      {
        title: { es: "Las mismas preguntas todos los días", en: "The same questions every day" },
        text: { es: "Un asistente que responde a tus clientes con la información de tu negocio.", en: "An assistant that answers your clients with your business's information." },
      },
      {
        title: { es: "Documentos largos", en: "Long documents" },
        text: { es: "Para resumir, buscar o sacar lo importante de textos que nadie tiene tiempo de leer.", en: "To summarize, search or pull out what matters from texts nobody has time to read." },
      },
      {
        title: { es: "Contenido que se repite", en: "Repetitive content" },
        text: { es: "Descripciones, respuestas o textos que sigues escribiendo con el mismo formato.", en: "Descriptions, replies or texts you keep writing in the same format." },
      },
    ],
    how: [
      {
        es: "Lo más importante es darle a la IA instrucciones precisas y la información correcta de tu negocio, para que responda como tú lo harías y no invente.",
        en: "What matters most is giving the AI precise instructions and your business's correct information, so it answers the way you would and doesn't make things up.",
      },
      {
        es: "Lo conecto con lo que ya usas y lo pruebo con casos reales antes de que lo vean tus clientes.",
        en: "I connect it to what you already use and test it with real cases before your clients see it.",
      },
    ],
    faqs: [
      {
        q: { es: "¿La IA puede equivocarse?", en: "Can the AI get things wrong?" },
        a: { es: "Sí, por eso la limito a la información de tu negocio, la pruebo con preguntas reales y definimos qué casos debe pasarte a ti.", en: "Yes, which is why I limit it to your business's information, test it with real questions and define which cases it should hand over to you." },
      },
      {
        q: { es: "¿Necesito saber de tecnología para usarla?", en: "Do I need to know tech to use it?" },
        a: { es: "No. Te la entrego funcionando y te explico cómo actualizar la información cuando cambie algo de tu negocio.", en: "No. I hand it over working and explain how to update the information when something in your business changes." },
      },
      COST,
    ],
    caseRef: "tachado",
    related: ["automatizacion", "sistemas-negocios", "aplicaciones-web"],
  },
];

export const servicePage = (id: string) => SERVICE_PAGES.find((p) => p.id === id);

/* ------------------------------------------------------------------ /diseno-web-culiacan */

export const LOCAL = {
  kinds: [
    {
      id: "ui-ux",
      title: { es: "Diseño UI/UX de tu app o sistema", en: "UI/UX design for your app or system" },
      text: { es: "Pantallas que la gente entiende sin manual: flujos, wireframes, prototipo y sistema de diseño.", en: "Screens people understand without a manual: flows, wireframes, prototype and design system." },
    },
    {
      id: "sitios-web",
      title: { es: "Página o sitio para tu negocio", en: "A website for your business" },
      text: { es: "Desde una sola página con lo esencial hasta un sitio de varias secciones, con tu marca y WhatsApp a un clic.", en: "From a single page with the essentials to a multi-section site, with your brand and WhatsApp one tap away." },
    },
    {
      id: "rediseno-web",
      title: { es: "Rediseño de tu página actual", en: "Redesign of your current site" },
      text: { es: "Si ya tienes página pero se ve vieja, carga lento o nadie la encuentra.", en: "If you already have a site but it looks old, loads slowly or nobody finds it." },
    },
    {
      id: "aplicaciones-web",
      title: { es: "App o sistema a la medida", en: "A custom app or system" },
      text: { es: "Cuando necesitas usuarios, datos o procesos: cotizaciones, inventario, pedidos o paneles.", en: "When you need users, data or processes: quotes, inventory, orders or dashboards." },
    },
  ],
  includes: [
    { es: "Diseño a la medida con tu marca, sin plantillas", en: "Custom design with your brand, no templates" },
    { es: "Adaptada a celular, que es donde te van a ver", en: "Built for phones, where people will see you" },
    { es: "Carga rápida", en: "Fast loading" },
    { es: "Lista para Google: títulos, descripciones, mapa del sitio y datos estructurados", en: "Ready for Google: titles, descriptions, sitemap and structured data" },
    { es: "Botón de WhatsApp y formulario de contacto", en: "WhatsApp button and contact form" },
    { es: "Vista previa para compartir en WhatsApp y redes", en: "Link preview for WhatsApp and social media" },
    { es: "Acompañamiento con ajustes después del lanzamiento", en: "Support with adjustments after launch" },
  ],
  why: [
    {
      title: { es: "Diseño y código, la misma persona", en: "Design and code, the same person" },
      text: { es: "Lo que ves en el diseño es lo que se construye. Sin teléfono descompuesto entre diseñador y programador.", en: "What you see in the design is what gets built. No broken telephone between designer and developer." },
    },
    {
      title: { es: "Tratas directo conmigo", en: "You deal with me directly" },
      text: { es: "Sin intermediarios: me explicas tu negocio a mí y te muestro avances reales en cada etapa.", en: "No middlemen: you explain your business to me and I show you real progress at every stage." },
    },
    {
      title: { es: "Desde Culiacán", en: "From Culiacán" },
      text: { es: "Mismo horario, mismo contexto. Conozco cómo se mueven los negocios aquí.", en: "Same time zone, same context. I know how businesses move here." },
    },
  ],
  faqs: [
    COST,
    {
      q: { es: "¿Cuánto tarda en estar lista?", en: "How long does it take?" },
      a: { es: "Depende del alcance. Antes de empezar definimos juntos qué incluye y te comparto un cronograma con fechas claras para cada entrega.", en: "It depends on the scope. Before starting we define what's included together and I share a timeline with clear dates for each delivery." },
    },
    {
      q: { es: "¿Mi página va a salir en Google?", en: "Will my site show up on Google?" },
      a: {
        es: "La dejo preparada para que Google la entienda y la muestre. Posicionarse toma semanas y ayuda mucho tener tu Perfil de Negocio de Google; si quieres, te oriento para crearlo.",
        en: "I leave it ready for Google to understand and show it. Ranking takes weeks, and a Google Business Profile helps a lot; if you want, I'll guide you through setting one up.",
      },
    },
    {
      q: { es: "Ya tengo página, ¿la tengo que tirar?", en: "I already have a site, do I have to throw it away?" },
      a: { es: "No necesariamente. Reviso lo que tienes, te digo qué conviene mejorar y qué conviene rehacer, y trabajamos desde ahí.", en: "Not necessarily. I review what you have, tell you what's worth improving and what's worth redoing, and we work from there." },
    },
    {
      q: { es: "¿Qué pasa después de que se publica?", en: "What happens after it's published?" },
      a: { es: "Te acompaño con ajustes, mantenimiento y mejoras. Tu página no se queda sola el día que sale.", en: "I stay with you for adjustments, maintenance and improvements. Your site isn't left alone on launch day." },
    },
  ],
};
