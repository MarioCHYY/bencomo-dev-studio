/**
 * "Notas de diseño": short, practical articles for founders and product teams, about product design.
 * Every number in here comes from the source listed under the article; nothing is estimated.
 * Written in Spanish (that's who searches for them); the English version lives in notes-en.ts.
 */

export type Block =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { fact: { n: string; text: string; src: number } }
  | { tip: string }
  | { swatches: { name: string; colors: string[]; note: string }[] }
  | { timeline: { t: string; label: string; text: string }[] }
  | { compare: string }
  | { link: { to: string; label: string } };

export type TitleSeg = ["w" | "g" | "i" | "G", string];

export type Note = {
  slug: string;
  /**
   * the title in pieces, styled like every other heading on the site:
   * w = solid, g = soft grey, i = the serif, G = a soft grey line of its own underneath
   */
  title: TitleSeg[];
  kicker: string;
  date: string; // ISO
  read: number; // minutes
  lead: string;
  sections: { h: string; body: Block[] }[];
  sources: { label: string; url: string }[];
  related: string[];
};

export const NOTES: Note[] = [
  {
    slug: "valida-tu-idea-de-app",
    title: [["w", "Valida tu idea de app"], ["i", "antes de programarla."], ["G", "Qué probar, con quién y cómo."]],
    kicker: "Producto · Validación",
    date: "2026-11-26",
    read: 6,
    lead:
      "Programar es la forma más cara de descubrir que nadie quería lo que hiciste. Antes de escribir una línea de código puedes averiguar si el problema existe, si a la gente le importa y si tu solución se entiende. Así lo haría yo.",
    sections: [
      {
        h: "El riesgo más grande no es técnico",
        body: [
          { p: "Casi cualquier idea se puede construir. La pregunta difícil es otra: si alguien la va a usar. Cuando una startup cierra, lo más común no es que el código haya fallado." },
          { fact: { n: "42 %", text: "de 101 startups que cerraron dijeron que el motivo fue que no había mercado para lo que construyeron. Fue la razón más citada del análisis.", src: 0 } },
          { p: "Validar no es preguntarle a tus amigos qué opinan de tu idea. Es buscar evidencia de que el problema existe y de que tu solución se entiende, antes de pagar por construirla." },
        ],
      },
      {
        h: "Primero el problema, después la app",
        body: [
          { p: "Escribe en una frase a quién le resuelves qué, y cómo lo resuelve hoy. Si la respuesta es «no lo resuelve», duda: a veces significa que no le duele tanto." },
          {
            ul: [
              "¿Quién tiene el problema? Una persona concreta, no «todo el mundo».",
              "¿Cómo lo resuelve hoy? Una hoja de cálculo, un chat, un competidor, nada.",
              "¿Qué le cuesta no resolverlo? Tiempo, dinero, errores, pena.",
            ],
          },
          { tip: "Si la gente ya resuelve el problema con algo improvisado, es buena señal: el problema existe, y tu app compite contra esa solución, no contra la nada." },
        ],
      },
      {
        h: "Un prototipo para ver si se entiende",
        body: [
          { p: "Con el problema claro, el siguiente paso es un prototipo: pantallas navegables que se sienten como la app, pero sin la lógica detrás. Se hace en días, no en meses, y se puede tirar sin dolor." },
          { p: "Para probarlo no necesitas a cientos de personas. Con pocas sesiones bien hechas aparecen casi todos los problemas grandes." },
          { fact: { n: "≈ 85 %", text: "de los problemas de usabilidad de una interfaz aparecen al probarla con 5 personas, cuando cada problema le ocurre a cerca de un tercio de los usuarios.", src: 1 } },
          { tip: "Prefiero tres rondas cortas de cinco personas, corrigiendo entre una y otra, que una sola ronda larga: cada corrección destapa lo que estaba escondido detrás." },
        ],
      },
      {
        h: "Cómo hacer una sesión de prueba",
        body: [
          {
            ol: [
              "Dale una tarea, no un recorrido: «registra un gasto de $350 que pagaste con la tarjeta de tu mamá».",
              "Pídele que piense en voz alta y no le ayudes, aunque se atore.",
              "Anota dónde duda, dónde se equivoca y qué esperaba ver.",
              "Al final pregúntale cómo lo resuelve hoy y qué tendría que pasar para cambiar.",
            ],
          },
          { p: "Lo que dicen importa menos que lo que hacen. Si cinco personas se atoran en el mismo botón, el problema es el botón, no ellas." },
        ],
      },
      {
        h: "Qué cuenta como validación",
        body: [
          {
            ul: [
              "Personas que completan la tarea sin ayuda.",
              "Personas que preguntan cuándo sale o te piden acceso.",
              "Personas dispuestas a darte algo: su correo, su tiempo, un pago por adelantado.",
            ],
          },
          { p: "Los elogios no cuentan: «qué buena idea» es amable y no te dice nada. Y si después de las pruebas nadie quiere más, aprendiste algo barato. Eso también es validar." },
          { link: { to: "/servicios/prototipos-funcionales", label: "Cómo hago prototipos para validar ideas" } },
        ],
      },
    ],
    sources: [
      { label: "CB Insights (2014), análisis de 101 startups que cerraron, publicado en Fortune", url: "https://fortune.com/2014/09/25/why-startups-fail-according-to-their-founders/" },
      { label: "Jeff Sauro (2010), MeasuringU: Why you only need to test with five users (explained)", url: "https://measuringu.com/five-users/" },
    ],
    related: ["prototipo-o-mvp", "onboarding-de-tu-app"],
  },
  {
    slug: "prototipo-o-mvp",
    title: [["w", "Prototipo, MVP o producto:"], ["i", "qué va primero."], ["G", "Tres etapas que se suelen confundir."]],
    kicker: "Producto · Estrategia",
    date: "2026-11-26",
    read: 5,
    lead:
      "Se usan como si fueran lo mismo y no lo son. Un prototipo, un MVP y un producto contestan preguntas distintas, cuestan distinto y se hacen con herramientas distintas. Confundirlos es la forma más común de gastar de más demasiado pronto.",
    sections: [
      {
        h: "Cada etapa contesta una pregunta",
        body: [
          {
            timeline: [
              { t: "Prototipo", label: "¿Se entiende?", text: "Pantallas navegables sin lógica detrás. Sirve para probar el flujo con usuarios o mostrarle la idea a un inversionista." },
              { t: "MVP", label: "¿Lo usan de verdad?", text: "La primera versión que funciona, con lo mínimo para resolver el problema principal y medir si la gente regresa." },
              { t: "Producto", label: "¿Cómo crece?", text: "Lo que construyes cuando ya sabes qué funciona: más casos, más usuarios, más pulido." },
            ],
          },
        ],
      },
      {
        h: "Qué es, y qué no es, un MVP",
        body: [
          { p: "El término lo popularizó Eric Ries, y su definición no habla de una app chica ni barata: habla de aprender." },
          { fact: { n: "MVP", text: "es, según Ries, la versión de un producto nuevo con la que un equipo aprende lo más posible sobre sus clientes con el menor esfuerzo.", src: 0 } },
          { p: "Un MVP no es la versión 1.0 con funciones recortadas. Si no te va a enseñar algo que hoy no sabes, no es mínimo ni viable: solo es pequeño." },
        ],
      },
      {
        h: "Cuándo basta un prototipo",
        body: [
          {
            ul: [
              "Todavía no sabes si el flujo principal se entiende.",
              "Necesitas mostrar la idea para conseguir socios o inversión.",
              "Quieres comparar dos formas de resolver lo mismo.",
            ],
          },
          { tip: "Un prototipo bien hecho no se tira: el diseño y la estructura son la base del MVP." },
        ],
      },
      {
        h: "Cuándo toca el MVP",
        body: [
          {
            ul: [
              "Las pruebas con el prototipo salieron bien y la gente pregunta cuándo puede usarlo.",
              "Lo que necesitas saber solo se ve con uso real: si regresan, si pagan, si invitan a otros.",
              "Tienes claro qué es lo mínimo: una tarea principal hecha muy bien, no diez a medias.",
            ],
          },
          { p: "En corte, por ejemplo, la pantalla que justifica la app es una: cuánto le toca pagar a cada quien antes de la fecha límite de la tarjeta. Lo demás se construye alrededor de esa." },
        ],
      },
      {
        h: "El error más caro",
        body: [
          { p: "Saltarse el prototipo y construir de una vez el producto con todas las funciones que se te ocurrieron. Cuando por fin lo prueba alguien, cada cambio ya cuesta código, no un rato en Figma." },
          { link: { to: "/servicios/aplicaciones-web", label: "Cómo diseño y programo un MVP" } },
        ],
      },
    ],
    sources: [{ label: "Lean Startup Co., What is an MVP? (la definición de Eric Ries)", url: "https://leanstartup.co/what-is-an-mvp/" }],
    related: ["valida-tu-idea-de-app", "sistema-de-diseno"],
  },
  {
    slug: "onboarding-de-tu-app",
    title: [["w", "Los primeros minutos de tu app"], ["i", "lo deciden todo."], ["G", "Cómo diseñar el onboarding."]],
    kicker: "UX · Onboarding",
    date: "2026-11-26",
    read: 5,
    lead:
      "Mucha gente que instala una app la deja muy pronto, casi siempre antes de entender para qué servía. El onboarding es el tramo entre «la abrí» y «ya me sirvió», y se diseña con el mismo cuidado que cualquier otra pantalla.",
    sections: [
      {
        h: "Se van muy rápido",
        body: [
          { fact: { n: "77 %", text: "de sus usuarios activos diarios pierde, en promedio, una app de Android en los 3 días siguientes a que la instalan, según datos de Quettra publicados por Andrew Chen.", src: 0 } },
          { fact: { n: "90 %", text: "los ha perdido a los 30 días.", src: 0 } },
          { p: "No hay que leer esos números como una condena, sino como una prioridad: si alguien no encuentra valor en su primera sesión, rara vez vuelve a buscarlo." },
        ],
      },
      {
        h: "La meta: llegar rápido al primer «ah, ya»",
        body: [
          { p: "Cada app tiene un momento en que la persona entiende para qué sirve: el primer gasto repartido, la primera alerta que le ahorra dinero. Diseña el onboarding para llegar ahí con el menor número de pasos." },
          {
            ul: [
              "Pide solo lo que necesitas para ese primer momento. Lo demás puede esperar.",
              "Si tu producto lo permite, deja ver la app antes de pedir que se cree una cuenta.",
              "Usa datos de ejemplo para que las pantallas no se vean vacías la primera vez.",
            ],
          },
          { compare: "alcancia" },
        ],
      },
      {
        h: "Tutoriales: menos de lo que crees",
        body: [
          { p: "Las pantallas de bienvenida que explican la app antes de usarla se suelen saltar o se olvidan a los pocos minutos. Funciona mejor enseñar en el momento: una pista junto al botón cuando hace falta, no cinco tarjetas al principio." },
          { tip: "Si tu app necesita un tutorial largo para entenderse, el problema suele estar en la interfaz, no en el tutorial." },
        ],
      },
      {
        h: "Las pantallas vacías también enseñan",
        body: [
          { p: "La primera vez que alguien abre una sección, no hay nada. Esa pantalla puede decir qué va ahí y tener el botón para crear lo primero, en lugar de un «No hay datos»." },
          { ul: ["Qué va a ver aquí cuando tenga información.", "El botón para dar el primer paso.", "Un ejemplo, si ayuda a entender."] },
        ],
      },
      {
        h: "Mide dónde se quedan",
        body: [
          {
            ol: [
              "Define cuál es el primer momento de valor de tu app.",
              "Mide cuántas personas de las que se registran llegan a él.",
              "Revisa en qué paso se quedan las demás y empieza a mejorar por ese.",
            ],
          },
          { link: { to: "/servicios/ui-ux", label: "Cómo diseño la experiencia de un producto" } },
        ],
      },
    ],
    sources: [
      { label: "Andrew Chen (2015), New data shows losing 80% of mobile users is normal (datos de Quettra)", url: "https://andrewchen.com/new-data-shows-why-losing-80-of-your-mobile-users-is-normal-and-that-the-best-apps-do-much-better/" },
    ],
    related: ["valida-tu-idea-de-app", "por-que-tu-app-se-ve-amateur"],
  },
  {
    slug: "por-que-tu-app-se-ve-amateur",
    title: [["w", "¿Por qué tu app"], ["i", "se ve amateur?"], ["G", "Los detalles de interfaz que la delatan."]],
    kicker: "UI · Detalles",
    date: "2026-11-26",
    read: 6,
    lead:
      "Casi nunca es una sola cosa. Una app se ve amateur por una suma de detalles que juntos dicen «esto se hizo con prisa»: texto que no se lee, botones diminutos, espacios al azar, pantallas que no dicen qué está pasando. Todos tienen arreglo.",
    sections: [
      {
        h: "1. Texto que apenas se lee",
        body: [
          { p: "El gris clarito sobre blanco se ve elegante en el monitor de quien diseña y desaparece en un celular a pleno sol. Para esto hay una medida." },
          { fact: { n: "4.5 : 1", text: "es el contraste mínimo que piden las pautas de accesibilidad WCAG para el texto normal. Para iconos, bordes de campos y otros componentes, el mínimo es 3 : 1.", src: 0 } },
        ],
      },
      {
        h: "2. Botones demasiado chicos",
        body: [
          { p: "Un dedo no es un cursor. Si hay que apuntar con cuidado, la gente se equivoca y se frustra." },
          { fact: { n: "44 × 44", text: "píxeles es el tamaño mínimo de un área táctil en el nivel más estricto de WCAG. Apple pide la misma medida, en puntos, para las apps de iOS.", src: 0 } },
          { tip: "El área que se toca puede ser más grande que lo que se ve: un icono de 24 px puede tener una zona de 44 px a su alrededor." },
        ],
      },
      {
        h: "3. Espacios al azar",
        body: [
          { p: "Cuando cada margen mide distinto, la pantalla se ve desordenada aunque nadie sepa decir por qué. Elige una escala, por ejemplo múltiplos de 4 u 8, y úsala para todo: separaciones, márgenes y tamaños." },
        ],
      },
      {
        h: "4. Pantallas que no dicen qué pasa",
        body: [
          { p: "Una app se siente sólida cuando siempre responde. Si tocas un botón y no pasa nada visible, piensas que falló y lo vuelves a tocar." },
          { fact: { n: "0.1 s", text: "es lo que puede tardar una respuesta para sentirse instantánea. Hasta 1 segundo la persona no pierde el hilo; pasados 10, su atención se va a otra parte.", src: 1 } },
          { ul: ["Cargando: un indicador o el esqueleto de la pantalla.", "Vacío: qué va aquí y cómo empezar.", "Error: qué pasó y qué se puede hacer, en palabras normales."] },
        ],
      },
      {
        h: "5. Un botón distinto en cada pantalla",
        body: [
          { p: "Un botón principal, uno secundario y, si acaso, uno de texto. Cuando cada pantalla inventa el suyo, la app se siente armada con piezas de lugares distintos. Eso lo resuelve un sistema de diseño." },
          { compare: "orbita" },
        ],
      },
      {
        h: "6. Palabras de relleno",
        body: [
          { p: "«Error 500», «Submit» en una app en español o un «Lorem ipsum» que se coló a producción. Las palabras también son interfaz: escribe cada botón con el verbo de lo que hace." },
          { tip: "«Guardar gasto» dice más que «Aceptar»." },
          { link: { to: "/servicios/ui-ux", label: "Cómo diseño interfaces" } },
        ],
      },
    ],
    sources: [
      { label: "W3C, WCAG 2.2: contraste mínimo, contraste de componentes y tamaño de objetivos", url: "https://www.w3.org/TR/WCAG22/" },
      { label: "Nielsen Norman Group, Response Times: The 3 Important Limits", url: "https://www.nngroup.com/articles/response-times-3-important-limits/" },
      { label: "Apple, Human Interface Guidelines: Accessibility", url: "https://developer.apple.com/design/human-interface-guidelines/accessibility" },
    ],
    related: ["sistema-de-diseno", "onboarding-de-tu-app"],
  },
  {
    slug: "sistema-de-diseno",
    title: [["w", "¿Tu producto necesita"], ["i", "un sistema de diseño?"], ["G", "Cuándo sí, y cuándo todavía no."]],
    kicker: "Diseño · Sistemas",
    date: "2026-11-26",
    read: 5,
    lead:
      "Un sistema de diseño es el acuerdo de cómo se ve y se comporta tu producto: colores, tipografía, componentes y las reglas para usarlos. No es exclusivo de empresas grandes, pero tampoco es lo primero que necesitas.",
    sections: [
      {
        h: "Qué es, en concreto",
        body: [
          {
            ul: [
              "Tokens: los valores base, como colores, tamaños de letra, espacios y esquinas.",
              "Componentes: botones, campos, tarjetas y avisos, con todos sus estados.",
              "Reglas: cuándo usar cada uno, y cuándo no.",
            ],
          },
          { p: "Vive en Figma para quien diseña y en código para quien programa. Cuando las dos versiones coinciden, lo que se diseña es lo que se construye." },
        ],
      },
      {
        h: "Por qué ahorra tiempo",
        body: [
          { fact: { n: "34 %", text: "más rápido completaron una tarea de diseño los participantes de un experimento de Figma cuando tenían un sistema de diseño, comparado con hacerla sin él.", src: 0 } },
          { p: "El ahorro no es solo de diseño: cada componente resuelto una vez es una decisión que nadie vuelve a tomar ni a programar distinto." },
        ],
      },
      {
        h: "Señales de que ya lo necesitas",
        body: [
          {
            ul: [
              "Hay tres tonos de azul «principal» y nadie sabe cuál es el bueno.",
              "El mismo botón se ve distinto en cada pantalla.",
              "Más de una persona diseña o programa la interfaz.",
              "Cada función nueva tarda porque se diseña desde cero.",
            ],
          },
        ],
      },
      {
        h: "Cuándo todavía no",
        body: [
          { p: "Si estás validando una idea con un prototipo, un sistema completo es adelantarse. Bastan unas decisiones básicas: una paleta corta, dos tipografías y un puñado de componentes. El sistema crece junto con el producto." },
          { tip: "Empieza por lo que más se repite: botones, campos de formulario y textos. Eso ya cubre la mayoría de las pantallas." },
        ],
      },
      {
        h: "Cómo empezar sin frenar el producto",
        body: [
          {
            ol: [
              "Haz un inventario: captura las pantallas y junta lo que se repite.",
              "Unifica: elige una versión de cada cosa y ponle nombre.",
              "Documenta los estados: normal, encima, presionado, deshabilitado y error.",
              "Pásalo a código y úsalo en lo siguiente que se construya, no en un rediseño de golpe.",
            ],
          },
          { link: { to: "/servicios/ui-ux", label: "Cómo armo sistemas de diseño" } },
        ],
      },
    ],
    sources: [{ label: "Figma, Measuring the value of design systems", url: "https://www.figma.com/blog/measuring-the-value-of-design-systems/" }],
    related: ["redisenar-sin-perder-usuarios", "por-que-tu-app-se-ve-amateur"],
  },
  {
    slug: "redisenar-sin-perder-usuarios",
    title: [["w", "Rediseña tu app"], ["i", "sin perder usuarios."], ["G", "Cómo cambiar lo que la gente ya conoce."]],
    kicker: "Producto · Rediseño",
    date: "2026-11-26",
    read: 5,
    lead:
      "Un rediseño puede ser mejor en todo y aun así recibir quejas la primera semana. No siempre es porque esté mal: cambiar lo que la gente ya sabe usar le cuesta, y ese costo se diseña igual que las pantallas.",
    sections: [
      {
        h: "La primera reacción casi siempre es negativa",
        body: [
          { p: "En Google le pusieron nombre: aversión al cambio. Aaron Sedley la describe como la reacción negativa, de corto plazo, ante los cambios en un producto. No dice si el cambio es bueno o malo; dice que la gente perdió algo que ya dominaba." },
          { p: "La clave es separar las quejas por costumbre, que bajan con los días, de las que señalan un problema real, que se quedan." },
        ],
      },
      {
        h: "Respeta lo que ya aprendieron",
        body: [
          { p: "Lo que tus usuarios ya saben hacer en tu app es un activo. Cambia lo que estorba y deja en su lugar lo que funciona, aunque te parezca menos moderno." },
          { tip: "Antes de mover algo de lugar, pregúntate si el beneficio compensa que cada persona lo tenga que volver a buscar." },
        ],
      },
      {
        h: "Avisa, explica y deja regresar",
        body: [
          { p: "Las recomendaciones de Sedley para lanzar cambios grandes se resumen en no sorprender a nadie:" },
          {
            ul: [
              "Avisa antes del cambio, no el mismo día.",
              "Explica qué cambia y en qué le ayuda a la persona, no a tu equipo.",
              "Si se puede, deja probar la nueva versión y volver a la anterior por un tiempo.",
              "Ofrece ayuda para la transición y un canal para opinar.",
              "Cuenta qué ajustaste por lo que te dijeron.",
            ],
          },
        ],
      },
      {
        h: "Lanza por partes",
        body: [
          { p: "Un rediseño no tiene que salir completo un lunes. Puedes empezar por una sección o por un grupo de usuarios y medir antes de seguir. Si algo empeora, lo ves pronto y con poca gente." },
          {
            ol: [
              "Elige una métrica por flujo: tareas completadas, tiempo o abandonos.",
              "Mídela antes del cambio para tener con qué comparar.",
              "Lanza a un grupo pequeño y compara.",
              "Ajusta y amplía.",
            ],
          },
        ],
      },
      {
        h: "Rediseñar no es empezar de cero",
        body: [
          { p: "Muchas veces lo que se siente viejo no es el producto, sino que creció a parches. Un sistema de diseño y unos flujos ordenados pueden renovar la app sin tirar lo que ya funciona." },
          { link: { to: "/servicios/rediseno-web", label: "Cómo hago un rediseño de producto" } },
        ],
      },
    ],
    sources: [
      { label: "Aaron Sedley, Change aversion: why users hate what you launched (and what to do about it), GV Library", url: "https://library.gv.com/change-aversion-why-users-hate-what-you-launched-and-what-to-do-about-it-2fb94ce65766" },
    ],
    related: ["sistema-de-diseno", "onboarding-de-tu-app"],
  },
];

export const note = (slug?: string) => NOTES.find((n) => n.slug === slug);

/** the title as plain text (without the grey line underneath) */
export const titleText = (n: Note) =>
  n.title
    .filter(([s]) => s !== "G")
    .map(([, t]) => t)
    .join(" ");
