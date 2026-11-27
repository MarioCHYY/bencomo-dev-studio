export type Lang = "en" | "es";

export const translations = {
  nav: {
    home: { en: "Home", es: "Inicio" },
    about: { en: "About", es: "Sobre mí" },
    education: { en: "Education", es: "Educación" },
    experience: { en: "Experience", es: "Experiencia" },
    projects: { en: "My Work", es: "Mi Trabajo" },
    services: { en: "Services", es: "Servicios" },
    notes: { en: "Notes", es: "Notas" },
    contact: { en: "Contact", es: "Contacto" },
    cta: { en: "Let's Work Together", es: "Trabajemos Juntos" },
  },
  ctaSection: {
    title: { en: "Ready to build something incredible?", es: "¿Listo para construir algo increíble?" },
    subtitle: { en: "Tell me about your project and I'll respond with a clear proposal and work plan.", es: "Cuéntame tu proyecto y te respondo con una propuesta clara y un plan de trabajo." },
    button: { en: "Start conversation", es: "Iniciar conversación" },
  },
  hero: {
    subtitle: {
      en: "It's not just about writing code, but looking beyond the obvious. I design and build digital experiences that are born from a vision, take shape with intention, and become real through code.",
      es: "No se trata solo de escribir código, sino de mirar más allá de lo evidente. Diseño y construyo experiencias digitales que nacen de una visión, toman forma con intención y se vuelven reales a través del código.",
    },
    title: {
      line1: { en: "THE FUTURE", es: "EL FUTURO" },
      line2: { en: "IS", es: "SE" },
      line3: { en: "DESIGNED.", es: "DISEÑA." },
    },
    cta: { en: "View my work", es: "Ver mi trabajo" },
  },
  about: {
    label: { en: "", es: "" },
    title: { en: "About Me", es: "Sobre mí" },
    p1: {
      en: "I am Mario Bencomo, a full-stack developer with a strong focus on design, aesthetics, and user experience. I love building digital products that not only work but have presence, intention, and a clear visual identity.",
      es: "Soy Mario Bencomo, desarrollador full stack con una visión muy marcada por el diseño, la estética y la experiencia de usuario. Me gusta construir productos digitales que no solo funcionen, sino que tengan presencia, intención y una identidad visual clara.",
    },
    degree: {
      title: { en: "B.S. in Computer Systems Engineering", es: "Licenciatura en Ingeniería en Sistemas Computacionales" },
      sub: { en: "Tecnológico de Culiacán — Grad. Dec 2028", es: "Tecnológico de Culiacán — Grad. Dic 2028" },
    },
    role: {
      title: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
      sub: { en: "Frontend & Backend", es: "Frontend & Backend" },
    },
    location: {
      title: { en: "Culiacán, Sinaloa", es: "Culiacán, Sinaloa" },
      sub: { en: "México — Remote Available", es: "México — Disponible Remoto" },
    },
  },
  education: {
    label: { en: "", es: "" },
    title: { en: "Education", es: "Educación" },
    degree: {
      title: { en: "B.S. in Computer Systems Engineering", es: "Licenciatura en Ingeniería en Sistemas Computacionales" },
      institution: { en: "Tecnológico de Culiacán", es: "Tecnológico de Culiacán" },
      period: { en: "Currently in 5th Semester • 2026 – Present", es: "Actualmente en 5to semestre · 2026 – Presente" },
      graduation: { en: "Expected Graduation: 2029", es: "Graduación Esperada: 2029" },
      focus: {
        en: "Training focused on software engineering, programming, databases, and systems development. Through academic and personal projects, I have strengthened my ability to build digital solutions with structure, logic, and a carefully crafted user experience.",
        es: "Formación enfocada en ingeniería de software, programación, bases de datos y desarrollo de sistemas. A través de proyectos académicos y personales, he fortalecido mi capacidad para construir soluciones digitales con estructura, lógica y una experiencia de usuario cuidada.",
      },
    },
    certifications: [
      {
        title: { en: "English Language Program", es: "Programa de Inglés Sabatino" },
        institution: { en: "Universidad Autónoma de Sinaloa (UAS)", es: "Universidad Autónoma de Sinaloa (UAS)" },
        period: { en: "April 2026", es: "Abril 2026" },
        focus: { 
          en: "Completed a 500-hour English language program at the Center for Language Studies.",
          es: "Conclusión satisfactoria de 500 horas de estudio en el Centro de Estudio de Idiomas."
        }
      },
      {
        title: { en: "B1 Preliminary (PET)", es: "B1 Preliminary (PET)" },
        institution: { en: "Cambridge English", es: "Cambridge English" },
        period: { en: "June 2026", es: "Junio 2026" },
        focus: {
          en: "Achieved B1 certification from Cambridge Assessment English, demonstrating practical English skills for everyday use.",
          es: "Certificación de nivel B1 expedida por Cambridge Assessment English, demostrando habilidades prácticas del idioma para uso cotidiano."
        }
      }
    ]
  },
  experience: {
    label: { en: "", es: "" },
    title: { en: "Experience", es: "Experiencia" },
    role: { en: "Web Developer", es: "Desarrollador Web" },
    type: { en: "Independent Projects", es: "Proyectos independientes" },
    period: { en: "2026 – Present", es: "2026 – Presente" },
  },
  services: {
    label: { en: "", es: "" },
    title: { en: "Services", es: "Servicios" },
    subtitle: {
      en: "I design and build apps and digital products: from the prototype that validates your idea to the product your users rely on.",
      es: "Diseño y construyo apps y productos digitales: del prototipo que valida tu idea al producto que usan tus clientes.",
    },
    items: [
      {
        id: "sitios-web",
        title: { en: "Product Websites", es: "Sitios Web de Producto" },
        subtitle: { en: "The public face of your app or startup.", es: "La cara pública de tu app o startup." },
        description: {
          en: "I design and build your product's website: it explains what you solve in seconds, shows the app in action and leads people to sign up, download or book a demo.",
          es: "Diseño y programo el sitio de tu producto: explica en segundos qué resuelves, muestra la app en acción y lleva a la gente a registrarse, descargarla o agendar una demo.",
        },
        deliverables: {
          en: [
            "A launch page or a full site",
            "Design with your product's identity",
            "Fast and built for phones",
            "Ready for Google: titles, sitemap and structured data"
          ],
          es: [
            "Página de lanzamiento o sitio completo",
            "Diseño con la identidad de tu producto",
            "Rápido y adaptado a celular",
            "Listo para Google: títulos, sitemap y datos estructurados"
          ]
        }
      },
      {
        id: "ui-ux",
        title: { en: "Product UI/UX Design", es: "Diseño UI/UX de Producto" },
        subtitle: { en: "Your app, easy to use from the first screen.", es: "Que usar tu app sea fácil desde la primera pantalla." },
        description: {
          en: "I design interfaces for apps and platforms around how your users think and move: flows, wireframes, prototype and a design system your team can follow.",
          es: "Diseño interfaces para apps y plataformas pensando en cómo piensa y se mueve tu usuario: flujos, wireframes, prototipo y un sistema de diseño que tu equipo pueda seguir.",
        },
        deliverables: {
          en: [
            "Flows, wireframes and clickable mockups",
            "Design system: colours, type and components",
            "Usability testing before coding",
            "Files ready to hand over to development"
          ],
          es: [
            "Flujos, wireframes y mockups navegables",
            "Sistema de diseño: colores, tipografía y componentes",
            "Pruebas de usabilidad antes de programar",
            "Archivos listos para pasar a desarrollo"
          ]
        }
      },
      {
        id: "prototipos-funcionales",
        title: { en: "Prototypes to Validate", es: "Prototipos para Validar" },
        subtitle: { en: "Validate your idea before investing in full development.", es: "Valida tu idea antes de invertir en desarrollo completo." },
        description: {
          en: "I create clickable, interactive demos so you can test your idea with real users or investors before building the final product.",
          es: "Creo demos navegables e interactivas para que pruebes tu idea con usuarios reales o inversionistas antes de construir el producto final.",
        },
        deliverables: {
          en: [
            "Clickable demo of the idea or product",
            "The main user journey, end to end",
            "Quick adjustments based on feedback",
            "Base ready to move to full development"
          ],
          es: [
            "Demo clicable de la idea o producto",
            "El recorrido principal del usuario, de principio a fin",
            "Ajustes rápidos según retroalimentación",
            "Base lista para pasar a desarrollo completo"
          ]
        }
      },
      {
        id: "aplicaciones-web",
        title: { en: "Web Apps & MVP", es: "Apps Web y MVP" },
        subtitle: { en: "Your product, from idea to real users.", es: "Tu producto, de la idea a usuarios reales." },
        description: {
          en: "I design and build complete apps: what users see, the logic and the database. I start with an MVP that has what you need to launch, learn and grow on the same base.",
          es: "Diseño y programo apps completas: lo que ve el usuario, la lógica y la base de datos. Empiezo por un MVP con lo esencial para lanzar, aprender y crecer sobre la misma base.",
        },
        deliverables: {
          en: [
            "An MVP with what's essential to launch",
            "Frontend, backend and database",
            "User accounts, payments and admin panels",
            "Deployment ready for production"
          ],
          es: [
            "MVP con lo esencial para lanzar",
            "Frontend, backend y base de datos",
            "Cuentas de usuario, pagos y panel de administración",
            "Despliegue listo para producción"
          ]
        }
      },
      {
        id: "herramientas-internas",
        title: { en: "Internal Tools & Admin Panels", es: "Paneles y Herramientas Internas" },
        subtitle: { en: "The part of your product only your team sees.", es: "La parte de tu producto que solo ve tu equipo." },
        description: {
          en: "I design and build the back office of your app: the panel where your team manages users, reviews payments, handles support and follows the product's numbers, without touching the database.",
          es: "Diseño y programo el back office de tu app: el panel donde tu equipo administra usuarios, revisa pagos, atiende soporte y sigue los números del producto, sin tocar la base de datos.",
        },
        deliverables: {
          en: [
            "Your app's admin panel",
            "Roles and permissions per person",
            "Search and a full view of each customer",
            "Product metrics in one place"
          ],
          es: [
            "Panel de administración de tu app",
            "Roles y permisos por persona",
            "Búsqueda y vista completa de cada cliente",
            "Métricas del producto en un solo lugar"
          ]
        }
      },
      {
        id: "rediseno-web",
        title: { en: "Product Redesign", es: "Rediseño de Producto" },
        subtitle: { en: "A new version without starting over.", es: "Una nueva versión sin empezar de cero." },
        description: {
          en: "I take your current app or platform and redesign it: clearer flows, a consistent interface and better performance, without losing the users you already have.",
          es: "Tomo tu app o plataforma actual y la rediseño: flujos más claros, una interfaz consistente y mejor rendimiento, sin perder a los usuarios que ya tienes.",
        },
        deliverables: {
          en: [
            "Usability review of the current product",
            "New flows and interface design",
            "A design system to keep it consistent",
            "A plan to ship the change in stages"
          ],
          es: [
            "Diagnóstico de usabilidad del producto actual",
            "Nuevos flujos y diseño de interfaz",
            "Sistema de diseño para mantenerlo consistente",
            "Plan para lanzar el cambio por etapas"
          ]
        }
      },
      {
        id: "automatizacion",
        title: { en: "Integrations & In-App Flows", es: "Integraciones y Flujos" },
        subtitle: { en: "Your app does on its own what your team does by hand.", es: "Que tu app haga sola lo que hoy hace tu equipo a mano." },
        description: {
          en: "I design and build the flows that run inside your product: emails and alerts that go out on their own, payments and subscriptions wired in, scheduled jobs and outside services talking to your app through APIs and webhooks.",
          es: "Diseño y programo los flujos que corren dentro de tu producto: correos y avisos que salen solos, pagos y suscripciones conectados, tareas programadas y servicios externos que se hablan con tu app por API y webhooks.",
        },
        deliverables: {
          en: [
            "API and webhook integrations",
            "Automatic notifications and emails",
            "Scheduled background jobs",
            "A log of what happened, to review failures"
          ],
          es: [
            "Integraciones por API y webhooks",
            "Notificaciones y correos automáticos",
            "Tareas programadas en segundo plano",
            "Registro de lo que pasó, para revisar fallas"
          ]
        }
      },
      {
        id: "inteligencia-artificial",
        title: { en: "AI in Your Product", es: "IA en tu Producto" },
        subtitle: { en: "Smart features that feel part of the app.", es: "Funciones inteligentes que se sienten parte de la app." },
        description: {
          en: "I bring AI models into apps and platforms and design how they're used: what you ask, how it answers, what happens while it thinks and how you correct it when it's wrong.",
          es: "Integro modelos de IA dentro de apps y plataformas y diseño cómo se usan: qué le pides, cómo responde, qué pasa mientras procesa y cómo lo corriges cuando se equivoca.",
        },
        deliverables: {
          en: [
            "AI features inside your app",
            "The experience: waiting, errors and corrections",
            "Instructions and data so it doesn't make things up",
            "Testing with real cases before launch"
          ],
          es: [
            "Funciones con IA dentro de tu app",
            "Diseño de la experiencia: espera, errores y correcciones",
            "Instrucciones y datos para que no invente",
            "Pruebas con casos reales antes de lanzar"
          ]
        }
      },
    ],
  },
  footer: {
    shortText: {
      en: "Design with intention. Develop with structure. Build with vision.",
      es: "Diseño con intención. Desarrollo con estructura. Construyo con visión.",
    },
    copyright: {
      en: "© 2026 Mario Bencomo. All rights reserved.",
      es: "© 2026 Mario Bencomo. Todos los derechos reservados.",
    },
    builtWith: { en: "Built with React + TypeScript", es: "Construido con React + TypeScript" },
  },
} as const;
