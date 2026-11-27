/**
 * Invented apps, each shown twice: the screen you get from a template or from asking an AI
 * for "an app" (purple gradient, emojis, everything the same weight), and the one I'd design.
 * Each one lives on the service it explains, and two of them inside a note:
 * - Alcancía (onboarding)       → /servicios/ui-ux and the onboarding note
 * - Órbita (SaaS dashboard)      → /servicios/rediseno-web and the "looks amateur" note
 * - Cancha (bookings MVP)        → /servicios/aplicaciones-web
 * - Órbita, its internal panel   → /servicios/herramientas-internas
 * - Cancha, searching with AI    → /servicios/inteligencia-artificial
 * The products, numbers, prices and the club are made up, and the page says so.
 * Images: /ejemplos/{id}-{antes|despues}-{desk|mob}.webp
 */
type L = { es: string; en: string };

export interface AppExample {
  id: string;
  name: string;
  service: string;
  kind: L;
  title: L;
  idea: L;
  changes: L[];
}

export const APP_EXAMPLES: AppExample[] = [
  {
    id: "alcancia",
    name: "Alcancía",
    service: "ui-ux",
    kind: { es: "Onboarding de una app de ahorro", en: "Onboarding for a savings app" },
    title: { es: "Un registro genérico contra un onboarding diseñado.", en: "A generic sign-up versus a designed onboarding." },
    idea: {
      es: "Antes de pedir una cuenta, la app le enseña a la persona para qué le sirve: en un paso ya ve su meta y cuándo la alcanza.",
      en: "Before asking for an account, the app shows people what it's for: in one step they already see their goal and when they'll reach it.",
    },
    changes: [
      {
        es: "Ocho campos y unos términos antes de ver nada se volvieron una sola pregunta: ¿para qué quieres ahorrar?",
        en: "Eight fields and a terms checkbox before seeing anything became a single question: what are you saving for?",
      },
      {
        es: "La respuesta se convierte en algo concreto al instante: tu meta, cuánto guardas por semana y en cuántas semanas llegas.",
        en: "The answer turns into something concrete right away: your goal, how much you save each week and how many weeks it takes.",
      },
      {
        es: "La cuenta se crea al final, solo con el correo, cuando la persona ya sabe qué gana con la app.",
        en: "The account comes at the end, with just an email, once people know what they get from the app.",
      },
      {
        es: "Un paso de tres a la vista y un solo botón por pantalla, en lugar de un carrusel de cinco puntos que nadie sabe a dónde lleva.",
        en: "One step of three in view and one button per screen, instead of a five-dot carousel nobody knows the end of.",
      },
    ],
  },
  {
    id: "orbita",
    name: "Órbita",
    service: "rediseno-web",
    kind: { es: "Panel de una app de suscripciones", en: "Dashboard for a subscription app" },
    title: { es: "Un panel genérico contra un panel rediseñado.", en: "A generic dashboard versus a redesigned one." },
    idea: {
      es: "Un panel no es una vitrina de números: tiene que contestar cómo va el mes y decir qué hay que hacer hoy.",
      en: "A dashboard isn't a showcase of numbers: it has to say how the month is going and what needs doing today.",
    },
    changes: [
      {
        es: "Ocho tarjetas del mismo tamaño se volvieron un número principal y tres secundarios: lo importante pesa más.",
        en: "Eight cards of the same size became one main number and three supporting ones: what matters weighs more.",
      },
      {
        es: "«Necesita tu atención» junta lo que hay que resolver hoy, cada cosa con su botón para resolverla.",
        en: "“Needs your attention” gathers what has to be solved today, each item with its button to solve it.",
      },
      {
        es: "Una sola gráfica clara en lugar de barras de cinco colores y una dona que no dice nada.",
        en: "One clear chart instead of five-colour bars and a donut that says nothing.",
      },
      {
        es: "Sin emojis ni saludo de bienvenida: un menú corto, color solo donde hay que mirar y letras con jerarquía.",
        en: "No emojis or welcome greeting: a short menu, colour only where you need to look and type with hierarchy.",
      },
    ],
  },
  {
    id: "cancha",
    name: "Cancha",
    service: "aplicaciones-web",
    kind: { es: "App para reservar canchas", en: "Court booking app" },
    title: { es: "Un formulario de reserva contra un MVP de una sola tarea.", en: "A booking form versus a one-task MVP." },
    idea: {
      es: "Un MVP hace una cosa muy bien. Aquí esa cosa es reservar para hoy, y todo lo demás puede esperar a la siguiente versión.",
      en: "An MVP does one thing really well. Here that thing is booking for today, and everything else can wait for the next version.",
    },
    changes: [
      {
        es: "Un calendario del mes y cuatro listas desplegables se volvieron los horarios libres de hoy, con su precio, listos para tocar.",
        en: "A month calendar and four dropdowns became today's open slots, with their price, ready to tap.",
      },
      {
        es: "Lo ocupado se ve tachado, así que nadie elige un horario para que luego le digan que no hay.",
        en: "Taken slots show crossed out, so nobody picks a time only to be told it's gone.",
      },
      {
        es: "El resumen siempre a la vista: cancha, hora, precio total y por persona, y una sola acción para pagar.",
        en: "The summary is always in view: court, time, total price and per person, and one action to pay.",
      },
      {
        es: "Sin promociones ni torneos en la primera versión: lo que no ayuda a reservar hoy no entra al MVP.",
        en: "No promos or tournaments in the first version: whatever doesn't help you book today stays out of the MVP.",
      },
    ],
  },
  {
    id: "orbita-equipo",
    name: "Órbita",
    service: "herramientas-internas",
    kind: { es: "Panel interno de una app de suscripciones", en: "Internal panel for a subscription app" },
    title: { es: "Una tabla de la base de datos contra la ficha de un cliente.", en: "A database table versus a customer profile." },
    idea: {
      es: "A soporte le llega un mensaje: «me cobraron dos veces». Con la ficha del cliente lo entiende y lo resuelve desde una sola pantalla, sin pedirle nada a un programador.",
      en: "Support gets a message: “I was charged twice”. With the customer profile they understand it and fix it from one screen, without asking a developer for anything.",
    },
    changes: [
      {
        es: "Una tabla con todas las columnas de la base de datos se volvió una búsqueda: escribes el nombre o el correo y llegas a la persona.",
        en: "A table with every database column became a search: type the name or email and you land on the person.",
      },
      {
        es: "Plan, pagos e historial del cliente juntos, con el cobro duplicado marcado arriba, donde se ve primero.",
        en: "The customer's plan, payments and history together, with the duplicate charge flagged at the top, where it's seen first.",
      },
      {
        es: "Las acciones de todos los días, como reembolsar, cambiar de plan o reenviar el acceso, son botones, no celdas que alguien edita a mano.",
        en: "Everyday actions like refunding, changing plans or resending access are buttons, not cells someone edits by hand.",
      },
      {
        es: "Cada cambio queda en el historial con quién lo hizo y cuándo, y reembolsar solo lo puede quien tiene permiso.",
        en: "Every change stays in the history with who did it and when, and only people with permission can refund.",
      },
    ],
  },
  {
    id: "cancha-ia",
    name: "Cancha",
    service: "inteligencia-artificial",
    kind: { es: "Búsqueda con IA en una app de reservas", en: "AI search in a booking app" },
    title: { es: "Una burbuja de asistente contra una búsqueda que entiende.", en: "An assistant bubble versus a search that understands." },
    idea: {
      es: "La gente no piensa en filtros, piensa en frases: «pádel mañana después de las 7, somos 4». Aquí la IA convierte esa frase en una búsqueda y enseña cómo la entendió.",
      en: "People don't think in filters, they think in sentences: “padel tomorrow after 7, there are 4 of us”. Here AI turns that sentence into a search and shows how it understood it.",
    },
    changes: [
      {
        es: "La burbuja que saluda y no sabe nada del club se volvió un campo de búsqueda justo donde la gente ya estaba: arriba de los horarios.",
        en: "The bubble that says hi and knows nothing about the club became a search field right where people already were: above the time slots.",
      },
      {
        es: "Lo que entendió aparece como filtros que se pueden quitar. Lo que supuso, como la duración, se marca distinto para que se note.",
        en: "What it understood shows as filters you can remove. What it assumed, like the duration, is marked differently so it stands out.",
      },
      {
        es: "La respuesta son horarios reales del club, con su precio por persona, no un párrafo que hay que creerle.",
        en: "The answer is the club's real time slots, with the price per person, not a paragraph you have to take on trust.",
      },
      {
        es: "Se puede seguir usando sin IA: el enlace a todos los horarios del día está ahí para quien prefiera elegir.",
        en: "It still works without AI: the link to all of the day's slots is there for anyone who'd rather choose.",
      },
    ],
  },
];

export const appExample = (id: string) => APP_EXAMPLES.find((e) => e.id === id);
export const appExampleFor = (service: string) => APP_EXAMPLES.find((e) => e.service === service);
