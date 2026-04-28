export type Lang = "en" | "es";

export const translations = {
  nav: {
    about: { en: "About", es: "Sobre mí" },
    education: { en: "Education", es: "Educación" },
    experience: { en: "Experience", es: "Experiencia" },
    projects: { en: "Projects", es: "Proyectos" },
    skills: { en: "Skills", es: "Habilidades" },
    services: { en: "Services", es: "Servicios" },
    contact: { en: "Contact", es: "Contacto" },
    cta: { en: "Let's Work Together", es: "Trabajemos Juntos" },
  },
  hero: {
    badge: { en: "OPEN TO WORK", es: "DISPONIBLE" },
    greeting: { en: "Hi, I'm", es: "Hola, soy" },
    subtitle: {
      en: "Web Developer — Frontend & Backend. Building functional, scalable and visually clean digital solutions.",
      es: "Desarrollador Web — Frontend & Backend. Creando soluciones digitales funcionales, escalables y visualmente limpias.",
    },
    cta: { en: "View My Work", es: "Ver Mi Trabajo" },
  },
  about: {
    label: { en: "01 —", es: "01 —" },
    title: { en: "About Me", es: "Sobre Mí" },
    p1: {
      en: "I am Mario Bencomo, a full-stack web developer focused on building scalable and efficient applications. I turn ideas into optimized digital products with clean code and a great user experience.",
      es: "Soy Mario Bencomo, desarrollador full stack enfocado en construir aplicaciones web escalables y eficientes. Transformo ideas en productos digitales optimizados, con código limpio y una gran experiencia de usuario.",
    },
    p2: {
      en: "When I'm not building web solutions, I'm probably at the gym training discipline and consistency. The same energy I put into every rep, I apply to every line of code.",
      es: "Cuando no estoy creando soluciones web, probablemente estoy en el gimnasio entrenando disciplina y constancia. La misma energía que pongo en cada repetición la aplico en cada línea de código.",
    },
    degree: {
      title: { en: "B.S. in Computer Systems Engineering", es: "Ing. en Sistemas Computacionales" },
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
    label: { en: "02 —", es: "02 —" },
    title: { en: "Education", es: "Educación" },
    degree: {
      title: { en: "B.S. in Computer Systems Engineering", es: "Licenciatura en Ingeniería en Sistemas Computacionales" },
      period: { en: "Currently in 4th Semester • 2026 – Present", es: "Actualmente en 4to Semestre • 2026 – Presente" },
      graduation: { en: "Expected Graduation: 2029", es: "Graduación Esperada: 2029" },
      focus: {
        en: "Focused on software engineering fundamentals, web development, and modern frontend technologies.",
        es: "Enfocado en fundamentos de ingeniería de software, desarrollo web y tecnologías frontend modernas.",
      },
    },
  },
  experience: {
    label: { en: "03 —", es: "03 —" },
    title: { en: "Experience", es: "Experiencia" },
    role: { en: "Frontend Developer", es: "Desarrollador Frontend" },
    type: { en: "Independent Projects", es: "Proyectos Independientes" },
    period: { en: "2026 – Present", es: "2026 – Presente" },
    responsibilities: {
      en: [
        "Developed responsive and modern web applications",
        "Built real-world projects using React and TailwindCSS",
        "Focused on clean code and performance optimization",
        "Designed user-friendly and visually appealing interfaces",
        "Continuously learning and improving technical skills",
      ],
      es: [
        "Desarrollé aplicaciones web responsivas y modernas",
        "Creé proyectos del mundo real usando React y TailwindCSS",
        "Me enfoqué en código limpio y optimización de rendimiento",
        "Diseñé interfaces amigables y visualmente atractivas",
        "Continuamente aprendiendo y mejorando habilidades técnicas",
      ],
    },
  },
  projects: {
    label: { en: "04 —", es: "04 —" },
    title: { en: "Projects", es: "Proyectos" },
    featured: { en: "FEATURED PROJECT", es: "PROYECTO DESTACADO" },
    project1: {
      name: {
        en: "Professional Website for Aesthetic Services Business",
        es: "Sitio Web Profesional para Negocio de Servicios Estéticos",
      },
      oneliner: {
        en: "Business website for a professional cosmetologist focused on trust, clarity, and mobile-first performance.",
        es: "Sitio web de negocio para una cosmetóloga profesional enfocado en confianza, claridad y rendimiento mobile-first.",
      },
      description: {
        en: "End-to-end development of a professional website for an aesthetic services business, focused on improving digital presence and strengthening client acquisition. Implemented a structured architecture separating frontend and backend, optimizing performance and code maintainability.",
        es: "Desarrollo completo de un sitio web profesional para un negocio de servicios estéticos, enfocado en mejorar su presencia digital y fortalecer la captación de clientes. Implementación de una arquitectura estructurada separando frontend y backend, optimizando rendimiento y mantenibilidad del código.",
      },
      role: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
      problemTitle: { en: "Problem / Challenge", es: "Problema / Desafío" },
      problem: {
        en: "The client needed a professional online presence to clearly showcase services, build trust with new customers, and provide an intuitive user experience across devices.",
        es: "La clienta necesitaba una presencia profesional en línea para mostrar claramente sus servicios, generar confianza con nuevos clientes y proporcionar una experiencia de usuario intuitiva en todos los dispositivos.",
      },
      solutionTitle: { en: "Solution", es: "Solución" },
      solutions: {
        en: [
          "Designed a modern, mobile-first interface",
          "Structured service categories for clarity",
          "Implemented responsive and optimized layout",
          "Focused on performance and clean architecture",
          "Built scalable and maintainable code structure",
        ],
        es: [
          "Diseñé una interfaz moderna mobile-first",
          "Estructuré las categorías de servicios para claridad",
          "Implementé un layout responsivo y optimizado",
          "Enfoqué en rendimiento y arquitectura limpia",
          "Construí una estructura de código escalable y mantenible",
        ],
      },
      impactTitle: { en: "Impact / Results", es: "Impacto / Resultados" },
      impacts: {
        en: [
          "Clear service presentation",
          "Improved user navigation flow",
          "Professional digital presence",
          "Ready-to-scale foundation",
          "Business-oriented structure",
        ],
        es: [
          "Presentación clara de servicios",
          "Flujo de navegación mejorado",
          "Presencia digital profesional",
          "Base lista para escalar",
          "Estructura orientada al negocio",
        ],
      },
      learnedTitle: { en: "What I Learned", es: "Lo que Aprendí" },
      learned: {
        en: [
          "Importance of UX in service-based businesses",
          "Structuring information for clarity and conversion",
          "Balancing aesthetics and performance",
          "Writing scalable and maintainable frontend architecture",
        ],
        es: [
          "Importancia de UX en negocios de servicios",
          "Estructurar información para claridad y conversión",
          "Equilibrar estética y rendimiento",
          "Escribir arquitectura frontend escalable y mantenible",
        ],
      },
    },
    responsibilities: {
      en: [
        "Modern responsive UI design",
        "Reusable React components",
        "TypeScript for type safety",
        "Clean architecture patterns",
        "Performance optimization",
        "Version control with Git",
      ],
      es: [
        "Diseño UI moderno y responsivo",
        "Componentes React reutilizables",
        "TypeScript para seguridad de tipos",
        "Patrones de arquitectura limpia",
        "Optimización de rendimiento",
        "Control de versiones con Git",
      ],
    },
    keyResponsibilities: { en: "Key Responsibilities", es: "Responsabilidades Clave" },
    liveDemo: { en: "Live Demo", es: "Demo en Vivo" },
    viewCode: { en: "View Code", es: "Ver Código" },
    viewCaseStudy: { en: "View Case Study", es: "Ver Caso de Estudio" },
    backToProjects: { en: "← Back to Projects", es: "← Volver a Proyectos" },
  },
  skills: {
    label: { en: "05 —", es: "05 —" },
    title: { en: "Skills", es: "Habilidades" },
    levels: {
      Básico: { en: "Basic", es: "Básico" },
      Intermedio: { en: "Intermediate", es: "Intermedio" },
      Avanzado: { en: "Advanced", es: "Avanzado" },
    },
  },
  services: {
    label: { en: "06 —", es: "06 —" },
    title: { en: "Services", es: "Servicios" },
    subtitle: {
      en: "Available for freelance projects. Let's build something great together.",
      es: "Disponible para proyectos freelance. Construyamos algo increíble juntos.",
    },
    items: [
      {
        title: { en: "Web Development", es: "Desarrollo Web" },
        description: {
          en: "Custom websites built with modern technologies. Clean code, fast performance, and great user experience.",
          es: "Sitios web personalizados con tecnologías modernas. Código limpio, rendimiento rápido y gran experiencia de usuario.",
        },
      },
      {
        title: { en: "UI/UX Design", es: "Diseño UI/UX" },
        description: {
          en: "Modern, intuitive interfaces designed to engage users and reflect your brand identity.",
          es: "Interfaces modernas e intuitivas diseñadas para captar usuarios y reflejar la identidad de tu marca.",
        },
      },
      {
        title: { en: "Backend Development", es: "Desarrollo Backend" },
        description: {
          en: "Scalable server-side solutions with structured architecture and database management.",
          es: "Soluciones escalables del lado del servidor con arquitectura estructurada y gestión de bases de datos.",
        },
      },
      {
        title: { en: "Responsive Design", es: "Diseño Responsivo" },
        description: {
          en: "Pixel-perfect layouts that look stunning on every device, from mobile to desktop.",
          es: "Layouts pixel-perfect que se ven increíbles en cada dispositivo, de móvil a escritorio.",
        },
      },
    ],
  },
  contact: {
    label: { en: "07 —", es: "07 —" },
    title: { en: "Get in Touch", es: "Contáctame" },
    subtitle: {
      en: "Have a project in mind? Let's talk about how I can help you.",
      es: "¿Tienes un proyecto en mente? Hablemos de cómo puedo ayudarte.",
    },
    name: { en: "Your Name", es: "Tu Nombre" },
    email: { en: "Your Email", es: "Tu Email" },
    message: { en: "Your Message", es: "Tu Mensaje" },
    send: { en: "Start a Project", es: "Iniciar un Proyecto" },
    fillAll: { en: "Please fill in all fields", es: "Por favor llena todos los campos" },
    sent: { en: "Message sent!", es: "¡Mensaje enviado!" },
    sentDesc: { en: "I'll get back to you soon.", es: "Te responderé pronto." },
  },
  footer: {
    builtWith: { en: "Built with React + TypeScript", es: "Construido con React + TypeScript" },
  },
} as const;
