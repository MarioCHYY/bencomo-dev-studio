/**
 * Extra content for the one-page-per-service routes (/servicios/:id) and the Culiacán page (/diseno-ui-ux-culiacan).
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
  /** real screens that show this service (corte and Tachado only); left empty when none fits, and the invented example shows it instead */
  shots: Shot[];
  /** a real flow drawn step by step (automatización: how Tachado works) */
  flow?: { title: L; text: L }[];
  /** steps specific to this service; the general three are used when missing */
  process?: { title: L; text: L }[];
  /** the problem someone has today and what changes with this service */
  solves: { problem: L; fix: L }[];
  /** concrete things this service can be */
  can: { title: L; text: L }[];
  /** what helps me to have from you before starting */
  need: L[];
  /** what's left out or can't be promised, said plainly */
  notIncluded: L[];
  /** notes on /notas that go deeper into this service */
  notes: string[];
  how: L[];
  faqs: { q: L; a: L }[];
  /** a real project, only where it truly shows this service */
  caseRef?: CaseRef;
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
      { src: "/work/tachado/panel.webp", kind: "wide", url: "tachado.mariobencomodev.com", caption: { es: "El sitio de Tachado: qué hace el producto, en la primera pantalla.", en: "Tachado's site: what the product does, on the first screen." } },
      { src: "/work/tachado/ofertas.webp", kind: "wide", url: "tachado.mariobencomodev.com/ofertas", caption: { es: "Más abajo, el producto se explica con sus propios datos: cada oferta con su historial.", en: "Further down, the product explains itself with its own data: each deal with its history." } },
    ],
    intro: {
      es: "El sitio es lo primero que ve un cliente, un inversionista o alguien que oyó de tu app. En segundos tiene que entender qué resuelves y para quién, y saber qué hacer después: registrarse, descargarla o agendar una demo. Lo diseño con la identidad de tu producto y lo programo para que cargue rápido y Google lo entienda.",
      en: "Your site is the first thing a customer, an investor or someone who heard about your app sees. In seconds they have to understand what you solve and for whom, and know what to do next: sign up, download it or book a demo. I design it with your product's identity and build it to load fast and be understood by Google.",
    },
    solves: [
      { problem: { es: "La gente entra a tu sitio y no entiende qué hace tu producto.", en: "People land on your site and don't get what your product does." }, fix: { es: "Una primera pantalla que dice qué resuelves, para quién y qué hacer después, con el producto a la vista.", en: "A first screen that says what you solve, for whom and what to do next, with the product in view." } },
      { problem: { es: "Tu sitio se ve de una marca y tu app de otra.", en: "Your site looks like one brand and your app like another." }, fix: { es: "El sitio usa la identidad del producto: quien pasa de uno al otro siente que es lo mismo.", en: "The site uses the product's identity: going from one to the other feels like the same thing." } },
      { problem: { es: "Explicas lo mismo una y otra vez en llamadas y mensajes.", en: "You explain the same thing over and over in calls and messages." }, fix: { es: "Funciones, planes y preguntas frecuentes escritas una vez, en un lugar al que puedes mandar a cualquiera.", en: "Features, plans and FAQs written once, in one place you can send anyone to." } },
      { problem: { es: "Google no muestra tu producto, o lo muestra con un título y una imagen que no son.", en: "Google doesn't show your product, or shows it with the wrong title and image." }, fix: { es: "Cada página con su título, descripción, imagen para compartir y datos estructurados.", en: "Every page with its own title, description, share image and structured data." } },
      { problem: { es: "En celular se ve apretado o tarda en cargar.", en: "On phones it looks cramped or loads slowly." }, fix: { es: "Diseñado primero para celular, con imágenes ligeras y sin cargar lo que no se ve.", en: "Designed phone-first, with light images and nothing loaded that isn't on screen." } },
    ],
    can: [
      { title: { es: "Página de lanzamiento", en: "Launch page" }, text: { es: "Una sola página para presentar el producto y juntar la lista de espera o los primeros registros.", en: "One page to introduce the product and gather the waitlist or first sign-ups." } },
      { title: { es: "Sitio completo del producto", en: "Full product site" }, text: { es: "Qué hace, cómo funciona, planes, preguntas y contacto, cada cosa en su página.", en: "What it does, how it works, plans, questions and contact, each on its own page." } },
      { title: { es: "Página de precios", en: "Pricing page" }, text: { es: "Planes lado a lado, con la diferencia entre uno y otro clara a la primera.", en: "Plans side by side, with the difference between them clear at first glance." } },
      { title: { es: "Páginas por función o por cliente", en: "Pages per feature or customer type" }, text: { es: "Una página para cada cosa que hace tu producto o cada tipo de cliente, que puede aparecer en su propia búsqueda.", en: "A page for each thing your product does or each kind of customer, which can show up in its own search." } },
      { title: { es: "Novedades y notas", en: "Updates and articles" }, text: { es: "Un espacio para contar lo nuevo del producto o escribir sobre tu tema, que ayuda a que te encuentren.", en: "A place to share what's new in the product or write about your field, which helps people find you." } },
      { title: { es: "Página de descarga", en: "Download page" }, text: { es: "Para una app instalable o de tienda: enlaces claros según el dispositivo de quien la visita.", en: "For an installable or store app: clear links depending on the visitor's device." } },
    ],
    need: [
      { es: "Una frase de qué hace tu producto y para quién, aunque sea un borrador.", en: "One sentence on what your product does and for whom, even as a draft." },
      { es: "Acceso a la app o capturas actuales, para enseñarla tal como es.", en: "Access to the app or current screenshots, to show it as it really is." },
      { es: "Tu logo y lo que tengas de marca. Si todavía no hay, lo resolvemos junto con el sitio.", en: "Your logo and whatever brand you have. If there's none yet, we work it out with the site." },
      { es: "El dominio a tu nombre, o lo compramos a tu nombre.", en: "The domain in your name, or we buy it in your name." },
    ],
    notIncluded: [
      { es: "Testimonios, logos de clientes o cifras que no existan: el sitio usa solo lo real de tu producto.", en: "Testimonials, client logos or numbers that don't exist: the site only uses what's real about your product." },
      { es: "Un lugar asegurado en Google: dejo la base bien hecha; lo demás depende de la competencia y de lo que publiques.", en: "A guaranteed spot on Google: I leave a solid base; the rest depends on competition and what you publish." },
      { es: "Términos y aviso de privacidad: los redacta o revisa un abogado.", en: "Terms and privacy policy: a lawyer writes or reviews them." },
    ],
    notes: ["por-que-tu-app-se-ve-amateur", "onboarding-de-tu-app"],
    how: [
      {
        es: "Empiezo por el mensaje: qué problema resuelves, para quién y por qué tú. Con eso decido qué va en la primera pantalla y qué acción importa más.",
        en: "I start with the message: what problem you solve, for whom and why you. That decides what goes on the first screen and which action matters most.",
      },
      {
        es: "Luego diseño y programo el sitio con la identidad de tu producto, rápido en celular y listo para Google: títulos, descripciones, sitemap y datos estructurados, como en este mismo sitio.",
        en: "Then I design and build the site with your product's identity, fast on phones and ready for Google: titles, descriptions, sitemap and structured data, like this very site.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Puede incluir el registro o la app?", en: "Can it include sign-up or the app itself?" },
        a: { es: "El sitio es la cara pública. Si también necesitas la app o el registro, los diseño y programo con la misma identidad para que se sientan un solo producto.", en: "The site is the public face. If you also need the app or the sign-up, I design and build them with the same identity so they feel like one product." },
      },
      {
        q: { es: "¿Va a salir en Google?", en: "Will it show up on Google?" },
        a: { es: "Lo dejo preparado para que Google lo entienda y lo muestre. Posicionarse toma semanas y depende también de lo que publiques después.", en: "I leave it ready for Google to understand and show it. Ranking takes weeks and also depends on what you publish afterwards." },
      },
      COST,
    ],
    caseRef: "tachado",
    related: ["ui-ux", "aplicaciones-web", "prototipos-funcionales"],
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
      es: "Es lo que más disfruto hacer. Una buena interfaz no se nota: la gente entiende qué hacer sin pensarlo y se queda porque se siente bien usarla. Diseño pantallas para apps y productos digitales con ese objetivo, y como también programo, lo que diseño se construye tal cual.",
      en: "It's what I enjoy most. A good interface goes unnoticed: people know what to do without thinking and stay because it feels good to use. I design screens for apps and digital products with that goal, and since I also code, what I design gets built as is.",
    },
    solves: [
      { problem: { es: "Tus usuarios se pierden o le preguntan a soporte cómo se usa.", en: "Your users get lost or ask support how it works." }, fix: { es: "Flujos ordenados por lo que la persona quiere lograr, con un camino claro en cada pantalla.", en: "Flows organised around what people want to get done, with a clear path on every screen." } },
      { problem: { es: "El registro pide demasiado antes de enseñar algo.", en: "Sign-up asks for too much before showing anything." }, fix: { es: "Un primer uso que enseña para qué sirve la app antes de pedir datos.", en: "A first run that shows what the app is for before asking for details." } },
      { problem: { es: "Cada pantalla parece de una app distinta.", en: "Every screen looks like a different app." }, fix: { es: "Un sistema de diseño: los mismos colores, textos y componentes en todo el producto.", en: "A design system: the same colours, type and components across the whole product." } },
      { problem: { es: "Tu equipo programa sin diseño y decide sobre la marcha.", en: "Your team codes without a design and decides on the fly." }, fix: { es: "Pantallas resueltas antes de programar, con todos sus estados: vacío, cargando, error y listo.", en: "Screens solved before coding, with all their states: empty, loading, error and done." } },
      { problem: { es: "Lo que se construyó no se parece a lo que se diseñó.", en: "What got built doesn't look like what was designed." }, fix: { es: "Reviso la implementación pantalla por pantalla, porque también programo.", en: "I review the build screen by screen, because I code too." } },
    ],
    can: [
      { title: { es: "Flujos y arquitectura", en: "Flows and architecture" }, text: { es: "El mapa de pantallas y el camino de cada tarea, antes de dibujar nada.", en: "The map of screens and the path of each task, before drawing anything." } },
      { title: { es: "Wireframes navegables", en: "Clickable wireframes" }, text: { es: "Pantallas en gris que se recorren y se corrigen mientras cambiar es barato.", en: "Grey screens you click through and fix while change is cheap." } },
      { title: { es: "Onboarding y primer uso", en: "Onboarding and first run" }, text: { es: "Lo que ve alguien la primera vez que abre tu app, que decide si se queda.", en: "What someone sees the first time they open your app, which decides whether they stay." } },
      { title: { es: "Diseño de todas las pantallas", en: "Every screen designed" }, text: { es: "En Figma, para celular y escritorio, con sus estados y textos reales.", en: "In Figma, for phone and desktop, with their states and real copy." } },
      { title: { es: "Sistema de diseño", en: "Design system" }, text: { es: "Colores, tipografía, componentes y reglas para que tu equipo diseñe lo siguiente sin mí.", en: "Colours, type, components and rules so your team can design what's next without me." } },
      { title: { es: "Pruebas con usuarios", en: "User testing" }, text: { es: "Le pido a unas cuantas personas hacer tareas reales con el prototipo y veo dónde se atoran.", en: "I ask a few people to do real tasks with the prototype and watch where they get stuck." } },
      { title: { es: "Revisión de accesibilidad", en: "Accessibility review" }, text: { es: "Contraste, tamaño de letra y de botones, para que la use más gente sin batallar.", en: "Contrast, text and button sizes, so more people can use it without struggling." } },
    ],
    need: [
      { es: "Quién usa tu producto hoy, o a quién se lo quieres vender.", en: "Who uses your product today, or who you want to sell it to." },
      { es: "Lo que ya exista: la app, el archivo de Figma o capturas.", en: "Whatever already exists: the app, the Figma file or screenshots." },
      { es: "Algunas personas de tu público para las pruebas, si las tienes; si no, vemos cómo conseguirlas.", en: "A few people from your audience for testing, if you have them; if not, we figure out how to find them." },
      { es: "Una persona de tu lado que decida cuando haya dos caminos.", en: "One person on your side who decides when there are two paths." },
    ],
    notIncluded: [
      { es: "Copiar la interfaz de otra app: sirve de referencia, pero el diseño se hace para tu producto y tu gente.", en: "Copying another app's interface: it's a reference, but the design is made for your product and your people." },
      { es: "Asegurar que la gente use tu producto: el diseño quita estorbos, pero la idea también tiene que resolver algo.", en: "Guaranteeing people will use your product: design removes friction, but the idea has to solve something too." },
    ],
    notes: ["onboarding-de-tu-app", "sistema-de-diseno"],
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
      {
        q: { es: "¿También haces sistemas de diseño?", en: "Do you build design systems too?" },
        a: { es: "Sí. Si tu producto ya tiene pantallas hechas por distintas personas, ordeno colores, tipografía, componentes y sus reglas de uso en Figma para que todo se vea de la misma app y diseñar lo siguiente sea más rápido.", en: "Yes. If your product has screens made by different people, I organise colours, type, components and their rules in Figma so everything looks like one app and designing the next thing is faster." },
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
      es: "Cuando tu idea necesita que la gente cree una cuenta, guarde información o pague, lo que necesitas es una app web. La diseño y la programo completa, empezando por un MVP: lo mínimo que resuelve el problema principal, para lanzar pronto y crecer con lo que te digan tus usuarios.",
      en: "When your idea needs people to create an account, save information or pay, what you need is a web app. I design and build all of it, starting with an MVP: the least that solves the main problem, so you launch soon and grow with what your users tell you.",
    },
    solves: [
      { problem: { es: "Tienes la idea validada pero nadie que la construya completa.", en: "Your idea is validated but nobody to build all of it." }, fix: { es: "Diseño y código de la misma persona: de la primera pantalla a la base de datos.", en: "Design and code from the same person: from the first screen to the database." } },
      { problem: { es: "Te propusieron construir todo de una vez.", en: "Someone proposed building everything at once." }, fix: { es: "Un MVP con lo que resuelve el problema principal; lo demás se decide con lo que hagan tus usuarios.", en: "An MVP with what solves the main problem; the rest is decided by what your users do." } },
      { problem: { es: "Tu primera versión se hizo a las prisas y ya no aguanta cambios.", en: "Your first version was rushed and can't take changes anymore." }, fix: { es: "Una base ordenada, con TypeScript y una base de datos bien pensada, sobre la cual seguir construyendo.", en: "A tidy base, with TypeScript and a well-planned database, to keep building on." } },
      { problem: { es: "Necesitas cuentas, pagos y un panel y no sabes por dónde empezar.", en: "You need accounts, payments and an admin panel and don't know where to start." }, fix: { es: "Registro, inicio de sesión, cobros y panel de administración conectados desde el principio.", en: "Sign-up, log-in, payments and admin panel wired together from the start." } },
    ],
    can: [
      { title: { es: "Cuentas de usuario", en: "User accounts" }, text: { es: "Registro, inicio de sesión, recuperar contraseña y perfil.", en: "Sign-up, log-in, password recovery and profile." } },
      { title: { es: "Cobros y suscripciones", en: "Payments and subscriptions" }, text: { es: "Pagos únicos o planes mensuales con un proveedor de pagos.", en: "One-off payments or monthly plans with a payment provider." } },
      { title: { es: "App instalable", en: "Installable app" }, text: { es: "Se instala desde el navegador y se abre como app, sin pasar por tiendas, como corte.", en: "Installs from the browser and opens like an app, no app stores, like corte." } },
      { title: { es: "Panel de administración", en: "Admin panel" }, text: { es: "Para que tu equipo vea usuarios, pagos y datos sin tocar la base de datos.", en: "So your team sees users, payments and data without touching the database." } },
      { title: { es: "Correos y notificaciones", en: "Emails and notifications" }, text: { es: "Los avisos que la app manda sola: bienvenida, confirmaciones, cambios.", en: "The alerts the app sends on its own: welcome, confirmations, changes." } },
      { title: { es: "Medición de uso", en: "Usage tracking" }, text: { es: "Saber qué usa la gente y dónde abandona, para decidir la siguiente versión.", en: "Knowing what people use and where they drop off, to decide the next version." } },
    ],
    need: [
      { es: "El problema principal y quién lo tiene.", en: "The main problem and who has it." },
      { es: "Lo que ya validaste: entrevistas, un prototipo o gente interesada.", en: "What you've already validated: interviews, a prototype or interested people." },
      { es: "Las cuentas de los servicios que use la app a tu nombre: hosting, pagos y correo.", en: "The accounts for the services the app uses, in your name: hosting, payments and email." },
      { es: "Alguien que pruebe cada entrega y diga si va.", en: "Someone who tries each delivery and gives the go-ahead." },
    ],
    notIncluded: [
      { es: "Todo lo que se te ocurra en la primera versión: el MVP lleva lo esencial y lo demás espera a tus usuarios.", en: "Everything you can think of in the first version: the MVP carries the essentials and the rest waits for your users." },
      { es: "Que la primera versión sea la definitiva: un MVP está hecho para cambiar con lo que aprendas.", en: "The first version being the final one: an MVP is made to change with what you learn." },
    ],
    notes: ["prototipo-o-mvp", "valida-tu-idea-de-app"],
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
    related: ["prototipos-funcionales", "herramientas-internas", "sitios-web"],
  },
  {
    id: "herramientas-internas",
    shots: [],
    intro: {
      es: "Toda app tiene una parte que el usuario no ve: el panel donde tu equipo da de alta clientes, revisa pagos, atiende soporte y sigue los números. Casi siempre se hace al final y a las prisas. La diseño con el mismo cuidado que la app, para que tu equipo trabaje rápido y sin tocar la base de datos.",
      en: "Every app has a part users never see: the panel where your team onboards customers, reviews payments, handles support and follows the numbers. It's usually built last and in a hurry. I design it with the same care as the app, so your team works fast and never touches the database.",
    },
    solves: [
      { problem: { es: "Para cambiar un plan o devolver un pago alguien escribe una consulta en la base de datos.", en: "Changing a plan or refunding a payment means someone writing a database query." }, fix: { es: "Un botón con su confirmación, sus permisos y el registro de quién lo hizo.", en: "A button with its confirmation, its permissions and a record of who did it." } },
      { problem: { es: "Soporte abre cinco pantallas para entender el caso de un cliente.", en: "Support opens five screens to understand one customer's case." }, fix: { es: "La ficha completa del cliente: cuenta, plan, pagos e historial en un solo lugar.", en: "The customer's full profile: account, plan, payments and history in one place." } },
      { problem: { es: "Todos en el equipo pueden hacer todo.", en: "Everyone on the team can do everything." }, fix: { es: "Roles y permisos: soporte ve y ayuda; solo quien debe puede reembolsar o borrar.", en: "Roles and permissions: support can see and help; only the right people can refund or delete." } },
      { problem: { es: "Nadie sabe quién cambió qué ni cuándo.", en: "Nobody knows who changed what, or when." }, fix: { es: "Un registro de cada cambio, con la persona y la hora.", en: "A log of every change, with the person and the time." } },
      { problem: { es: "Los números del producto viven en varios servicios.", en: "The product's numbers live in several services." }, fix: { es: "Las métricas que importan juntas, junto con lo que hay que atender hoy.", en: "The metrics that matter together, next to what needs attention today." } },
    ],
    can: [
      { title: { es: "Búsqueda de clientes", en: "Customer search" }, text: { es: "Por nombre, correo o número de cuenta, desde cualquier pantalla.", en: "By name, email or account number, from any screen." } },
      { title: { es: "Ficha de cliente", en: "Customer profile" }, text: { es: "Todo de una persona con las acciones que más usa tu equipo a un clic.", en: "Everything about one person, with your team's most-used actions one click away." } },
      { title: { es: "Planes, pagos y reembolsos", en: "Plans, payments and refunds" }, text: { es: "Cambiar un plan, reintentar un cobro o devolverlo, con confirmación.", en: "Change a plan, retry a charge or refund it, with confirmation." } },
      { title: { es: "Revisión de contenido", en: "Content review" }, text: { es: "Una fila de lo que suben tus usuarios para aprobar, rechazar o marcar.", en: "A queue of what your users upload, to approve, reject or flag." } },
      { title: { es: "Panel de métricas", en: "Metrics dashboard" }, text: { es: "Altas, bajas, ingresos y uso del producto, con lo importante primero.", en: "Sign-ups, churn, revenue and product usage, with what matters first." } },
      { title: { es: "Funciones por cliente", en: "Per-customer features" }, text: { es: "Activar algo nuevo solo para unos cuantos y probarlo antes de abrirlo a todos.", en: "Turn something new on for a few customers and test it before opening it to everyone." } },
    ],
    need: [
      { es: "Las tareas que tu equipo repite y dónde se atora hoy.", en: "The tasks your team repeats and where it gets stuck today." },
      { es: "Un acceso de prueba a tu base de datos o a tu API para empezar, no a producción.", en: "Test access to your database or API to start with, not production." },
      { es: "Quién va a usar el panel y qué puede hacer cada persona.", en: "Who will use the panel and what each person can do." },
      { es: "Alguien del equipo que lo pruebe con casos reales.", en: "Someone on the team to test it with real cases." },
    ],
    notIncluded: [
      { es: "Cambiar de proveedor de pagos o de correo: el panel se conecta con los que ya usas.", en: "Switching payment or email providers: the panel connects to the ones you already use." },
      { es: "Herramientas para un negocio sin producto digital: este panel es la parte interna de una app.", en: "Tools for a business with no digital product: this panel is the inside of an app." },
    ],
    notes: ["sistema-de-diseno", "por-que-tu-app-se-ve-amateur"],
    how: [
      {
        es: "Empiezo por las tareas que tu equipo repite cada día y las ordeno por frecuencia: lo que se hace diario queda a un clic, lo raro puede vivir más adentro.",
        en: "I start with the tasks your team repeats every day and sort them by frequency: the daily ones stay one click away, the rare ones can live deeper.",
      },
      {
        es: "Lo construyo sobre tu misma base de datos o tu API, con roles y permisos por persona y un registro de quién cambió qué, para que todo se pueda rastrear.",
        en: "I build it on your own database or API, with roles and permissions per person and a log of who changed what, so everything can be traced.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Se conecta con mi app actual?", en: "Does it connect to my current app?" },
        a: { es: "Sí. Trabajo sobre la misma base de datos o la API de tu producto; si algo no se puede, te lo digo en la primera llamada.", en: "Yes. I work on your product's own database or API; if something can't be done, I tell you on the first call." },
      },
      {
        q: { es: "¿Mi equipo va a saber usarlo?", en: "Will my team know how to use it?" },
        a: { es: "La idea es que sí, sin manual: diseño cada pantalla para su tarea y la ajusto con lo que tu equipo me diga mientras lo prueba.", en: "That's the goal, without a manual: I design each screen for its task and adjust it with what your team tells me while testing." },
      },
      COST,
    ],
    related: ["aplicaciones-web", "automatizacion", "ui-ux"],
  },
  {
    id: "rediseno-web",
    shots: [],
    intro: {
      es: "Si tu producto creció a base de parches, se siente viejo o tus usuarios se atoran en los mismos lugares, no siempre hay que empezar de cero. Reviso lo que tienes, te digo qué conviene mejorar y qué rehacer, y lo rediseño cuidando a quienes ya lo usan.",
      en: "If your product grew through patches, feels old or your users get stuck in the same places, you don't always have to start over. I review what you have, tell you what's worth improving and what to redo, and redesign it with care for the people already using it.",
    },
    solves: [
      { problem: { es: "Tu app creció a parches y cada sección se ve distinta.", en: "Your app grew through patches and every section looks different." }, fix: { es: "Un sistema de diseño que une todo y evita que vuelva a pasar.", en: "A design system that ties everything together and keeps it from happening again." } },
      { problem: { es: "La gente abandona siempre en el mismo paso.", en: "People always drop off at the same step." }, fix: { es: "Un diagnóstico de ese paso y un flujo nuevo, probado antes de lanzarlo.", en: "A diagnosis of that step and a new flow, tested before launch." } },
      { problem: { es: "Tu producto maduró pero su diseño sigue siendo el de la primera versión.", en: "Your product matured but its design is still the first version's." }, fix: { es: "Una interfaz a la altura de lo que hoy hace tu producto.", en: "An interface that matches what your product does today." } },
      { problem: { es: "Te da miedo cambiar algo que tus usuarios ya conocen.", en: "You're afraid to change something your users already know." }, fix: { es: "Cambios por etapas que respetan lo que ya funciona.", en: "Changes in stages that respect what already works." } },
      { problem: { es: "Se siente lento o se ve mal en celular.", en: "It feels slow or looks bad on phones." }, fix: { es: "Revisión de rendimiento y un diseño pensado para pantallas chicas.", en: "A performance review and a design made for small screens." } },
    ],
    can: [
      { title: { es: "Diagnóstico de usabilidad", en: "Usability review" }, text: { es: "Recorro los flujos principales y te entrego qué falla y por qué, ordenado por importancia.", en: "I walk the main flows and hand you what fails and why, sorted by importance." } },
      { title: { es: "Rediseño de un flujo", en: "One flow redesigned" }, text: { es: "Solo el registro, el pago o la búsqueda, si ahí está el problema.", en: "Just sign-up, checkout or search, if that's where the problem is." } },
      { title: { es: "Rediseño completo", en: "Full redesign" }, text: { es: "Toda la interfaz, con nueva jerarquía, navegación y componentes.", en: "The whole interface, with new hierarchy, navigation and components." } },
      { title: { es: "Sistema de diseño desde lo que ya existe", en: "Design system from what exists" }, text: { es: "Ordeno los componentes que ya tienes en lugar de tirarlos.", en: "I organise the components you already have instead of throwing them away." } },
      { title: { es: "Mejoras de rendimiento", en: "Performance improvements" }, text: { es: "Imágenes, carga y animaciones que hacen lenta la app.", en: "The images, loading and animations that make the app slow." } },
      { title: { es: "Lanzamiento por etapas", en: "Staged rollout" }, text: { es: "Sección por sección, midiendo antes de cambiar lo siguiente.", en: "Section by section, measuring before changing the next one." } },
    ],
    need: [
      { es: "Acceso a la app y, si existen, sus datos de uso.", en: "Access to the app and, if they exist, its usage data." },
      { es: "Lo que más pregunta o reclama la gente a soporte.", en: "What people ask or complain about most to support." },
      { es: "Quién programa hoy el producto, para cuidar juntos cómo se implementa el cambio.", en: "Who builds the product today, so we look after how the change is implemented together." },
    ],
    notIncluded: [
      { es: "Cambiar todo por cambiar: si algo funciona y tus usuarios lo conocen, se queda.", en: "Changing everything for the sake of it: if something works and your users know it, it stays." },
      { es: "Prometer que va a subir un número: el diagnóstico dice dónde está el problema y medimos después del cambio.", en: "Promising a number will go up: the diagnosis shows where the problem is and we measure after the change." },
    ],
    notes: ["redisenar-sin-perder-usuarios", "por-que-tu-app-se-ve-amateur"],
    how: [
      {
        es: "Empiezo con un diagnóstico: recorro los flujos principales, veo dónde se atora la gente y qué dicen tus datos y tu soporte. Te lo explico sin tecnicismos.",
        en: "I start with a diagnosis: I walk through the main flows, see where people get stuck and what your data and support say. I explain it without jargon.",
      },
      {
        es: "Con eso propongo los nuevos flujos y el diseño, y armo un sistema de diseño para que no vuelva a crecer a parches. Lo que ya funciona y tus usuarios conocen se respeta.",
        en: "From there I propose the new flows and design, and set up a design system so it doesn't grow through patches again. What already works and your users know stays.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Mis usuarios se van a perder con el cambio?", en: "Will my users get lost with the change?" },
        a: { es: "Lo cuido: mantengo lo que ya aprendieron cuando funciona, y podemos lanzar el rediseño por partes para medir antes de cambiar todo.", en: "I take care of that: I keep what they've already learned when it works, and we can ship the redesign in parts to measure before changing everything." },
      },
      {
        q: { es: "¿Tengo que cambiar de tecnología?", en: "Do I have to change technology?" },
        a: { es: "No necesariamente. Según el diagnóstico te digo si conviene ajustar el código actual o rehacer partes, y por qué.", en: "Not necessarily. Based on the diagnosis I tell you whether to adjust the current code or rebuild parts, and why." },
      },
      COST,
    ],
    related: ["ui-ux", "prototipos-funcionales", "aplicaciones-web"],
  },
  {
    id: "prototipos-funcionales",
    shots: [
      { src: "/work/corte/cuenta.webp", kind: "phone", caption: { es: "1. Das de alta la tarjeta y a quién la usa.", en: "1. You add the card and who uses it." } },
      { src: "/work/corte/gasto.webp", kind: "phone", caption: { es: "2. Registras un gasto y de quién es.", en: "2. You log an expense and whose it is." } },
      { src: "/work/corte/movimientos.webp", kind: "phone", caption: { es: "3. Se acomoda en su fecha de corte.", en: "3. It lands in its statement period." } },
      { src: "/work/corte/corte.webp", kind: "phone", caption: { es: "4. Cada quien ve cuánto paga y cuándo.", en: "4. Everyone sees what they pay and when." } },
    ],
    intro: {
      es: "Antes de invertir en construir todo, conviene saber si tu idea funciona. Hago demos navegables que se sienten como el producto real, para que las pruebes con usuarios o las presentes a inversionistas.",
      en: "Before investing in building everything, it's worth knowing whether your idea works. I make clickable demos that feel like the real product, so you can test them with users or pitch them to investors.",
    },
    solves: [
      { problem: { es: "Quieres saber si la idea funciona antes de pagar todo el desarrollo.", en: "You want to know if the idea works before paying for full development." }, fix: { es: "Un prototipo navegable para probarla con personas reales antes de programarla.", en: "A clickable prototype to test it with real people before building it." } },
      { problem: { es: "Explicar tu producto con diapositivas no convence.", en: "Explaining your product with slides doesn't convince." }, fix: { es: "Una demo que inversionistas o socios abren en su celular y pueden tocar.", en: "A demo investors or partners open on their phone and can actually touch." } },
      { problem: { es: "Tu equipo discute en abstracto cómo debería funcionar algo.", en: "Your team argues in the abstract about how something should work." }, fix: { es: "Un recorrido concreto sobre el cual opinar, en lugar de que cada quien se lo imagine distinto.", en: "A concrete journey to react to, instead of everyone picturing it differently." } },
      { problem: { es: "No sabes qué entra en la primera versión.", en: "You don't know what goes into the first version." }, fix: { es: "Probar el recorrido principal deja claro qué es esencial y qué puede esperar.", en: "Testing the main journey makes clear what's essential and what can wait." } },
    ],
    can: [
      { title: { es: "Prototipo en Figma", en: "Figma prototype" }, text: { es: "Pantallas enlazadas que se recorren como la app real, ideal para pruebas con usuarios.", en: "Linked screens you move through like the real app, ideal for user testing." } },
      { title: { es: "Prototipo en código", en: "Coded prototype" }, text: { es: "Cuando tiene que sentirse real: escribir, filtrar, animaciones y datos de ejemplo.", en: "When it has to feel real: typing, filtering, animations and sample data." } },
      { title: { es: "Demo para inversionistas", en: "Investor demo" }, text: { es: "Un enlace que se abre en cualquier celular, con el recorrido que quieres contar.", en: "A link that opens on any phone, with the journey you want to tell." } },
      { title: { es: "Guion de prueba", en: "Test script" }, text: { es: "Qué tareas pedirle a cada persona, qué preguntar y qué observar.", en: "Which tasks to give each person, what to ask and what to watch for." } },
      { title: { es: "Resumen de lo que se aprendió", en: "Summary of findings" }, text: { es: "Dónde se atoraron, qué entendieron y qué cambiar antes de programar.", en: "Where they got stuck, what they understood and what to change before coding." } },
      { title: { es: "Dos versiones de un flujo", en: "Two versions of a flow" }, text: { es: "Para comparar cuál se entiende mejor antes de elegir.", en: "To compare which one is clearer before choosing." } },
    ],
    need: [
      { es: "La idea en tus palabras y el recorrido que más te importa probar.", en: "The idea in your words and the journey you most want to test." },
      { es: "A quién se lo vas a enseñar: usuarios, inversionistas o tu equipo.", en: "Who you'll show it to: users, investors or your team." },
      { es: "Datos de ejemplo parecidos a los reales, para que se sienta verdadero.", en: "Sample data close to the real thing, so it feels true." },
    ],
    notIncluded: [
      { es: "Cuentas reales, pagos ni servidor: eso ya es el MVP.", en: "Real accounts, payments or a server: that's already the MVP." },
      { es: "Decirte de antemano si la idea va a funcionar: el prototipo existe para averiguarlo con personas reales.", en: "Telling you up front whether the idea will work: the prototype exists to find out with real people." },
    ],
    notes: ["valida-tu-idea-de-app", "prototipo-o-mvp"],
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
    related: ["ui-ux", "aplicaciones-web", "rediseno-web"],
  },
  {
    id: "automatizacion",
    flow: [
      { title: { es: "Cada cierto tiempo", en: "On a schedule" }, text: { es: "Una tarea programada arranca sola; nadie tiene que acordarse.", en: "A scheduled job starts on its own; nobody has to remember." } },
      { title: { es: "Revisa lo que sigue cada persona", en: "Checks what each person follows" }, text: { es: "Consulta el precio actual de cada producto que alguien pidió vigilar.", en: "Looks up the current price of every product someone asked to watch." } },
      { title: { es: "Guarda el historial", en: "Saves the history" }, text: { es: "Cada revisión se suma a la gráfica del producto.", en: "Every check is added to the product's chart." } },
      { title: { es: "Compara con lo normal", en: "Compares with the usual" }, text: { es: "Decide si la baja es real o si solo cambió el precio «antes».", en: "Decides whether the drop is real or only the “was” price changed." } },
      { title: { es: "Avisa por el bot", en: "Alerts through the bot" }, text: { es: "Si de verdad bajó, el bot de Telegram le escribe a esa persona.", en: "If it really dropped, the Telegram bot messages that person." } },
    ],
    shots: [
      { src: "/work/tachado/grafica.webp", kind: "wide", caption: { es: "El historial que esa tarea va guardando, sin que nadie lo capture.", en: "The history that job keeps saving, with nobody typing it in." } },
    ],
    intro: {
      es: "En un producto digital hay trabajo que nadie debería hacer a mano: mandar el correo de bienvenida, avisar cuando algo cambia, cobrar la renovación o pasarle datos a otro servicio. Lo diseño como parte del producto, con el mismo cuidado que una pantalla, y lo programo para que corra solo.",
      en: "A digital product has work nobody should do by hand: sending the welcome email, alerting when something changes, charging the renewal or handing data to another service. I design it as part of the product, with the same care as a screen, and build it to run on its own.",
    },
    solves: [
      { problem: { es: "Alguien de tu equipo hace a mano lo que la app podría hacer sola.", en: "Someone on your team does by hand what the app could do itself." }, fix: { es: "Flujos que se disparan por una acción del usuario o a una hora programada.", en: "Flows triggered by a user action or at a scheduled time." } },
      { problem: { es: "Un pago falla y nadie se entera hasta que el cliente se queja.", en: "A payment fails and nobody notices until the customer complains." }, fix: { es: "Webhooks que escuchan al proveedor de pagos y avisan a tiempo al usuario y a tu equipo.", en: "Webhooks that listen to the payment provider and alert the user and your team in time." } },
      { problem: { es: "Tus usuarios no se enteran cuando pasa algo importante en su cuenta.", en: "Your users don't find out when something important happens in their account." }, fix: { es: "Correos y notificaciones que salen solos en el momento justo.", en: "Emails and notifications that go out on their own at the right moment." } },
      { problem: { es: "Una integración falla en silencio.", en: "An integration fails silently." }, fix: { es: "Un registro de cada ejecución y un aviso al equipo cuando algo no salió.", en: "A log of every run and an alert to the team when something didn't go through." } },
      { problem: { es: "Tu app y otro servicio no se hablan.", en: "Your app and another service don't talk to each other." }, fix: { es: "Una integración por API para que la información pase sola, sin copiar y pegar.", en: "An API integration so information flows on its own, no copy and paste." } },
    ],
    can: [
      { title: { es: "Correos automáticos", en: "Automatic emails" }, text: { es: "Bienvenida, confirmaciones, cambios de plan y avisos de cuenta.", en: "Welcome, confirmations, plan changes and account notices." } },
      { title: { es: "Pagos y suscripciones", en: "Payments and subscriptions" }, text: { es: "Renovaciones, pagos fallidos y cambios de plan que la app procesa sola.", en: "Renewals, failed payments and plan changes the app handles on its own." } },
      { title: { es: "Tareas programadas", en: "Scheduled jobs" }, text: { es: "Revisar, calcular y guardar datos cada cierto tiempo, como el historial de precios de Tachado.", en: "Checking, calculating and saving data on a schedule, like Tachado's price history." } },
      { title: { es: "Notificaciones", en: "Notifications" }, text: { es: "En la app, push o por un bot, cuando algo cambia para esa persona.", en: "In-app, push or through a bot, when something changes for that person." } },
      { title: { es: "Servicios externos por API", en: "Outside services via API" }, text: { es: "Mapas, almacenamiento, correo o el sistema de otra empresa conectados a tu producto.", en: "Maps, storage, email or another company's system connected to your product." } },
      { title: { es: "Alertas para tu equipo", en: "Alerts for your team" }, text: { es: "Cuando algo falla o necesita a una persona, el aviso llega solo.", en: "When something breaks or needs a person, the alert arrives on its own." } },
    ],
    need: [
      { es: "La lista de lo que hoy alguien hace a mano dentro del producto.", en: "The list of what someone does by hand inside the product today." },
      { es: "Accesos de prueba a los servicios que hay que conectar.", en: "Test access to the services that need connecting." },
      { es: "Quién recibe el aviso cuando algo falla.", en: "Who gets the alert when something breaks." },
    ],
    notIncluded: [
      { es: "Conectar servicios que no tienen API o no lo permiten: si no hay una forma estable, te lo digo antes de empezar.", en: "Connecting services with no API or that don't allow it: if there's no stable way, I tell you before starting." },
      { es: "Automatizar algo que todavía cambia cada semana: primero se define cómo debe funcionar y luego se automatiza.", en: "Automating something that still changes every week: first we define how it should work, then we automate it." },
    ],
    notes: [],
    how: [
      {
        es: "Tachado es un ejemplo: la página y el bot de Telegram comparten los mismos datos. Una tarea programada revisa los productos que sigue cada persona, guarda su historial y, cuando el precio baja de verdad, el bot le avisa sin que nadie intervenga.",
        en: "Tachado is an example: the website and the Telegram bot share the same data. A scheduled job checks the products each person follows, saves their history and, when a price really drops, the bot alerts them with no one stepping in.",
      },
      {
        es: "Cada flujo lo dibujo antes de programarlo: qué lo dispara, qué pasa si un servicio externo no responde y qué ve el usuario mientras tanto. Así una automatización no se vuelve una caja negra que nadie sabe revisar.",
        en: "I map every flow before coding it: what triggers it, what happens if an outside service doesn't answer and what users see meanwhile. That way an automation doesn't become a black box nobody knows how to check.",
      },
    ],
    faqs: [
      {
        q: { es: "¿Qué servicios se pueden conectar a mi app?", en: "Which services can be connected to my app?" },
        a: { es: "Los que tengan una API documentada: pagos, correo, notificaciones, mapas, almacenamiento o tu propio backend. En la primera llamada revisamos cuáles necesitas.", en: "Any with documented APIs: payments, email, notifications, maps, storage or your own backend. On the first call we go over which ones you need." },
      },
      {
        q: { es: "¿Qué pasa si un servicio externo se cae?", en: "What if an outside service goes down?" },
        a: { es: "Cada integración reintenta, deja registro y avisa al equipo, y el usuario ve un mensaje claro en lugar de un error.", en: "Each integration retries, keeps a log and alerts the team, and users see a clear message instead of an error." },
      },
      COST,
    ],
    caseRef: "tachado",
    related: ["aplicaciones-web", "inteligencia-artificial", "prototipos-funcionales"],
  },
  {
    id: "inteligencia-artificial",
    shots: [],
    intro: {
      es: "La IA aporta cuando resuelve una tarea concreta dentro de tu producto: encontrar algo escribiéndolo como lo dirías, resumir lo que el usuario subió o llenar un formulario a partir de un texto. La integro en tu app y diseño la experiencia alrededor, que es donde se gana o se pierde la confianza.",
      en: "AI helps when it solves a concrete task inside your product: finding something by typing it the way you'd say it, summarising what a user uploaded or filling in a form from a text. I bring it into your app and design the experience around it, which is where trust is won or lost.",
    },
    solves: [
      { problem: { es: "Tu búsqueda solo encuentra si escribes la palabra exacta.", en: "Your search only works with the exact word." }, fix: { es: "Una búsqueda que entiende las cosas como las dirías, y te enseña cómo lo entendió.", en: "A search that understands things the way you'd say them, and shows how it understood." } },
      { problem: { es: "Tus usuarios llenan formularios largos con información que ya tienen escrita.", en: "Your users fill long forms with information they already have written down." }, fix: { es: "La app lee el texto o el documento y llena los campos; la persona solo revisa.", en: "The app reads the text or document and fills the fields; the person just checks." } },
      { problem: { es: "Agregaste IA y nadie la usa.", en: "You added AI and nobody uses it." }, fix: { es: "La función vive dentro de la tarea, no en una burbuja aparte que hay que adivinar para qué sirve.", en: "The feature lives inside the task, not in a separate bubble people have to figure out." } },
      { problem: { es: "La IA contesta muy segura cosas que no son.", en: "The AI confidently answers things that aren't true." }, fix: { es: "Limitada a los datos de tu producto y mostrando lo que entendió, para que se pueda corregir.", en: "Limited to your product's data and showing what it understood, so it can be corrected." } },
      { problem: { es: "Tu equipo revisa a mano cada cosa que suben los usuarios.", en: "Your team reviews by hand everything users upload." }, fix: { es: "Clasificación y resumen automáticos, con una persona que aprueba lo dudoso.", en: "Automatic sorting and summaries, with a person approving the doubtful ones." } },
    ],
    can: [
      { title: { es: "Búsqueda en lenguaje natural", en: "Natural-language search" }, text: { es: "Escribir lo que buscas como lo dirías y que la app lo convierta en filtros.", en: "Typing what you want the way you'd say it, and the app turning it into filters." } },
      { title: { es: "Llenar formularios por ti", en: "Forms filled for you" }, text: { es: "A partir de un texto, una foto o un documento, con todo editable antes de guardar.", en: "From a text, a photo or a document, with everything editable before saving." } },
      { title: { es: "Resúmenes", en: "Summaries" }, text: { es: "De documentos, historiales o comentarios largos, dentro de la pantalla donde se necesitan.", en: "Of documents, histories or long comments, inside the screen where they're needed." } },
      { title: { es: "Clasificar y etiquetar", en: "Sorting and tagging" }, text: { es: "Ordenar lo que suben tus usuarios por tema, urgencia o tipo.", en: "Sorting what your users upload by topic, urgency or type." } },
      { title: { es: "Sugerencias en el flujo", en: "In-flow suggestions" }, text: { es: "Proponer un título, una descripción o el siguiente paso, que la persona acepta o cambia.", en: "Suggesting a title, a description or the next step, which people accept or change." } },
      { title: { es: "Pruebas con casos reales", en: "Testing with real cases" }, text: { es: "Un conjunto de ejemplos de tu producto para medir si responde bien antes y después de cada cambio.", en: "A set of examples from your product to check it answers well before and after each change." } },
    ],
    need: [
      { es: "La tarea concreta que la IA tiene que resolver.", en: "The specific task AI has to solve." },
      { es: "Ejemplos reales de lo que van a escribir o subir tus usuarios.", en: "Real examples of what your users will type or upload." },
      { es: "Qué datos puede usar y cuáles no.", en: "Which data it can use and which it can't." },
      { es: "Una cuenta del proveedor de IA a tu nombre, para que veas lo que cuesta.", en: "An account with the AI provider in your name, so you see what it costs." },
    ],
    notIncluded: [
      { es: "Entrenar un modelo propio desde cero: uso modelos existentes con tus datos y tus instrucciones.", en: "Training your own model from scratch: I use existing models with your data and instructions." },
      { es: "Una IA que nunca se equivoque: por eso diseño cómo se ve y cómo se corrige un error.", en: "An AI that's never wrong: that's why I design how a mistake looks and how it gets fixed." },
      { es: "Un asistente de conversación genérico: la IA va dentro de una tarea de tu producto.", en: "A generic chat assistant: the AI lives inside a task in your product." },
    ],
    notes: ["por-que-tu-app-se-ve-amateur"],
    how: [
      {
        es: "Primero defino con qué información trabaja y qué no debe hacer, para que responda con los datos de tu producto y no invente.",
        en: "First I define what information it works with and what it must not do, so it answers with your product's data and doesn't make things up.",
      },
      {
        es: "Después diseño la interfaz: qué ve el usuario mientras procesa, cómo le muestra lo que hizo y cómo lo corrige o lo deshace. La pruebo con casos reales antes de lanzarla.",
        en: "Then I design the interface: what users see while it works, how it shows what it did and how they correct or undo it. I test it with real cases before launch.",
      },
    ],
    faqs: [
      {
        q: { es: "¿La IA puede equivocarse?", en: "Can the AI get things wrong?" },
        a: { es: "Sí. Por eso la limito a la información de tu producto, la pruebo con casos reales y diseño la pantalla para que el usuario vea qué hizo y lo pueda corregir.", en: "Yes. That's why I limit it to your product's information, test it with real cases and design the screen so users see what it did and can correct it." },
      },
      {
        q: { es: "¿Qué modelo de IA usas?", en: "Which AI model do you use?" },
        a: { es: "El que convenga para tu caso por calidad, costo y velocidad. Te explico las opciones en la primera llamada.", en: "Whichever fits your case on quality, cost and speed. I walk you through the options on the first call." },
      },
      COST,
    ],
    related: ["automatizacion", "ui-ux", "aplicaciones-web"],
  },
];

export const servicePage = (id: string) => SERVICE_PAGES.find((p) => p.id === id);

/* ------------------------------------------------------------------ /diseno-ui-ux-culiacan */

export const LOCAL = {
  kinds: [
    {
      id: "sitios-web",
      title: { es: "El sitio de tu producto", en: "Your product's website" },
      text: { es: "Que explique en segundos qué resuelves y lleve a registrarse, descargar o agendar una demo.", en: "One that explains in seconds what you solve and leads to sign-up, download or a demo." },
    },
    {
      id: "ui-ux",
      title: { es: "Diseño UI/UX de tu app", en: "UI/UX design for your app" },
      text: { es: "Flujos, wireframes, prototipo y sistema de diseño para que tu producto se entienda sin manual.", en: "Flows, wireframes, prototype and design system so your product makes sense without a manual." },
    },
    {
      id: "prototipos-funcionales",
      title: { es: "Prototipo para validar tu idea", en: "A prototype to validate your idea" },
      text: { es: "Una demo navegable para probar con usuarios o presentar a inversionistas antes de programar.", en: "A clickable demo to test with users or pitch to investors before coding." },
    },
    {
      id: "aplicaciones-web",
      title: { es: "Tu MVP, diseñado y programado", en: "Your MVP, designed and built" },
      text: { es: "La primera versión con lo esencial: cuentas, datos y pagos, lista para usuarios reales.", en: "The first version with the essentials: accounts, data and payments, ready for real users." },
    },
    {
      id: "rediseno-web",
      title: { es: "Rediseño de tu producto", en: "Redesign of your product" },
      text: { es: "Si tu app creció a parches o la gente se atora, una nueva versión sin empezar de cero.", en: "If your app grew through patches or people get stuck, a new version without starting over." },
    },
  ],
  includes: [
    { es: "Una investigación corta: quién lo va a usar y dónde se atora", en: "Short research: who will use it and where they get stuck" },
    { es: "Flujos y wireframes antes de diseñar en detalle", en: "Flows and wireframes before detailed design" },
    { es: "Diseño en Figma que puedes revisar y comentar", en: "Design in Figma you can review and comment on" },
    { es: "Sistema de diseño: colores, tipografía y componentes", en: "Design system: colours, type and components" },
    { es: "Pensado primero para celular", en: "Designed phone-first" },
    { es: "Revisión de que lo construido sea igual al diseño", en: "A check that what's built matches the design" },
    { es: "Acompañamiento con ajustes después del lanzamiento", en: "Support with adjustments after launch" },
  ],
  why: [
    {
      title: { es: "Diseño y código, la misma persona", en: "Design and code, the same person" },
      text: { es: "Lo que ves en el diseño es lo que se construye. Sin teléfono descompuesto entre diseñador y programador.", en: "What you see in the design is what gets built. No broken telephone between designer and developer." },
    },
    {
      title: { es: "Tratas directo conmigo", en: "You deal with me directly" },
      text: { es: "Sin intermediarios: me explicas tu idea a mí y te muestro avances reales en cada etapa.", en: "No middlemen: you explain your idea to me and I show you real progress at every stage." },
    },
    {
      title: { es: "Desde Culiacán", en: "From Culiacán" },
      text: { es: "Mismo horario y mismo contexto para platicar tu producto sin juntas a deshoras.", en: "Same time zone and context to talk through your product without odd-hour calls." },
    },
  ],
  faqs: [
    COST,
    {
      q: { es: "¿Necesito tener la idea muy definida?", en: "Does my idea need to be fully defined?" },
      a: { es: "No. Si apenas es una idea, empezamos por ordenar el problema y el recorrido principal del usuario; eso ya se vuelve un prototipo que puedes probar.", en: "No. If it's just an idea, we start by framing the problem and the user's main journey; that already becomes a prototype you can test." },
    },
    {
      q: { es: "¿Cuánto tarda?", en: "How long does it take?" },
      a: { es: "Depende del alcance. Antes de empezar definimos juntos qué incluye y te comparto un cronograma con fechas claras para cada entrega.", en: "It depends on the scope. Before starting we define what's included together and I share a timeline with clear dates for each delivery." },
    },
    {
      q: { es: "Ya tengo programadores, ¿puedo contratar solo el diseño?", en: "I already have developers, can I hire just the design?" },
      a: { es: "Sí. Te entrego el diseño y el sistema listos para que tu equipo los construya, o me sumo a programar si lo necesitas.", en: "Yes. I hand over the design and system ready for your team to build, or I join in coding if you need it." },
    },
    {
      q: { es: "¿Qué pasa después del lanzamiento?", en: "What happens after launch?" },
      a: { es: "Te acompaño con ajustes y mejoras según lo que te digan tus primeros usuarios.", en: "I stay with you for adjustments and improvements based on what your first users tell you." },
    },
  ],
};
