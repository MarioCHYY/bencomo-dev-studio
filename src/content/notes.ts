/**
 * "Notas de diseño": short, practical articles for business owners, about design only.
 * Every number in here comes from the source listed under the article; nothing is estimated.
 * The articles are written in Spanish (that's who searches for them); the English switch shows a note.
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
    slug: "por-que-tu-pagina-se-ve-barata",
    title: [["w", "¿Por qué tu página web"], ["i", "se ve barata?"], ["G", "8 señales y cómo arreglarlas."]],
    kicker: "Diseño web · Credibilidad",
    date: "2026-11-25",
    read: 7,
    lead:
      "Una página puede tener buena información y aun así dar mala espina. Casi nunca es una sola cosa: son detalles pequeños que, juntos, dicen «esto se hizo a la carrera». Estas son las ocho señales que más veo, y qué hacer con cada una.",
    sections: [
      {
        h: "Primero: sí, la gente juzga por cómo se ve",
        body: [
          {
            p: "Puede sonar superficial, pero así funciona. Antes de leer, la gente ya se formó una idea de tu página, y esa primera idea pesa en si te creen o no.",
          },
          { fact: { n: "50 ms", text: "es lo que tarda alguien en formarse una primera impresión del atractivo visual de una página. Y esa impresión rápida coincide con la que tiene después de verla con calma.", src: 0 } },
          { fact: { n: "46.1 %", text: "de los comentarios de las personas al evaluar si un sitio era creíble tenían que ver con su diseño: el aspecto, la organización, la tipografía y los colores.", src: 1 } },
          { p: "La buena noticia es que casi todo lo que hace ver barata una página se puede corregir sin rehacer tu negocio: es cuestión de diseño." },
        ],
      },
      {
        h: "1. El título dice «Bienvenidos a…»",
        body: [
          {
            p: "El título de arriba es el lugar más valioso de tu página, y «Bienvenidos a Mariscos El Ejemplo» lo desperdicia: no dice qué vendes, ni por qué tú y no el de enfrente. Cámbialo por una frase que solo tu negocio podría decir.",
          },
          { tip: "Prueba: si cambias el nombre y el título le queda igual a cualquier otro negocio, es de plantilla." },
          { compare: "marejada" },
        ],
      },
      {
        h: "2. Emojis y adornos por todos lados",
        body: [
          {
            p: "Un emoji en un mensaje de WhatsApp está bien. En títulos, botones y cada tarjeta se ve improvisado. Además, cada teléfono y computadora los dibuja distinto, así que no controlas cómo se ven. Si quieres darle calidez a tu página, consíguela con buenas fotos, color y palabras.",
          },
        ],
      },
      {
        h: "3. Demasiadas tipografías, o la de siempre",
        body: [
          {
            p: "Tres o cuatro tipos de letra distintos hacen que todo se vea desordenado. Con dos basta: una con carácter para los títulos y una muy legible para el texto. Y si usas la misma que trae cualquier plantilla, tu página se va a parecer a mil más.",
          },
        ],
      },
      {
        h: "4. Texto que casi no se lee",
        body: [
          {
            p: "Gris clarito sobre blanco, letras blancas encima de una foto llena de detalles, texto pequeño en celular. Es uno de los errores más comunes de la web y uno de los que más cansan.",
          },
          { fact: { n: "79.1 %", text: "de las páginas de inicio más visitadas del mundo tenían texto con poco contraste en 2025.", src: 2 } },
          { tip: "Regla rápida: si tienes que entrecerrar los ojos o acercarte a la pantalla, le falta contraste." },
        ],
      },
      {
        h: "5. Fotos de banco que no son tu negocio",
        body: [
          {
            p: "El señor sonriente con casco, el equipo de oficina chocando las manos. La gente reconoce esas fotos y, al verlas, deja de creerte un poquito. Una foto real de tu local, tu producto o tu equipo, aunque sea con celular, transmite más. Tómala con luz natural, de frente y sin filtros exagerados.",
          },
        ],
      },
      {
        h: "6. Espacios sin regla",
        body: [
          {
            p: "Una sección apretada, la siguiente con un hueco enorme, botones de tamaños distintos, cosas que casi se alinean. Nadie lo nota de forma consciente, pero se siente desordenado. Usa los mismos márgenes y separaciones en toda la página y alinea todo a los mismos bordes.",
          },
        ],
      },
      {
        h: "7. Se ve mal en celular",
        body: [
          { fact: { n: "97.2 %", text: "de las personas que usan internet en México se conectan desde un celular inteligente.", src: 3 } },
          {
            p: "Así que la versión de celular no es la secundaria: es la principal. Abre tu página en tu propio teléfono y revisa si hay textos cortados, botones que no le atinas con el dedo, menús que tapan todo o fotos que tardan en salir.",
          },
        ],
      },
      {
        h: "8. Señales de abandono",
        body: [
          {
            p: "«© 2019» en el pie de página, links que no llevan a ningún lado, un logo pixeleado, secciones de «Próximamente» o un número de WhatsApp que ya no es el tuyo. Cada una le dice al visitante que nadie atiende la página, y que tal vez tampoco el negocio.",
          },
        ],
      },
      {
        h: "Cómo saber si la tuya está en problemas",
        body: [
          {
            ol: [
              "Enséñale tu página a alguien que no la conozca, solo 5 segundos.",
              "Quítasela y pregúntale qué vendes, para quién y qué tendría que hacer para comprarte.",
              "Si no puede contestar las tres, el problema no es esa persona: es la página.",
            ],
          },
          { link: { to: "/ejemplos-paginas-web", label: "Ver ejemplos: página genérica contra diseñada" } },
        ],
      },
    ],
    sources: [
      { label: "Lindgaard et al. (2006), Behaviour & Information Technology, reseñado en Nature", url: "https://www.nature.com/news/2006/060109/full/news060109-13.html" },
      { label: "Stanford y Consumer WebWatch (2002), How Do People Evaluate a Web Site's Credibility?", url: "https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility/" },
      { label: "WebAIM, The WebAIM Million (2025)", url: "https://webaim.org/projects/million/2025" },
      { label: "INEGI, ENDUTIH 2024", url: "https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/endutih/ENDUTIH_24_RR.pdf" },
    ],
    related: ["tu-pagina-en-10-segundos", "colores-que-dan-confianza"],
  },
  {
    slug: "colores-que-dan-confianza",
    title: [["w", "Qué colores dan"], ["i", "confianza"], ["g", "en una página web."]],
    kicker: "Diseño web · Color",
    date: "2026-11-25",
    read: 6,
    lead:
      "Si buscas «el color de la confianza» vas a leer mil veces «azul». No está mal, pero se queda corto: la confianza depende más de cómo usas el color que del color que eliges.",
    sections: [
      {
        h: "Lo que sí dice la investigación",
        body: [
          {
            p: "El color influye en la personalidad que la gente le atribuye a una marca. En un estudio publicado en el Journal of the Academy of Marketing Science, los investigadores encontraron que el rojo se asocia con emoción y el azul con competencia (de ahí el título del estudio: «rojo emocionante y azul competente»). También encontraron que no solo importa el tono: qué tan intenso o qué tan claro u oscuro es el color cambia la impresión.",
          },
          {
            p: "Por eso tantos bancos y aseguradoras son azules: quieren verse serios y capaces. Pero eso no significa que el azul le sirva a cualquiera.",
          },
        ],
      },
      {
        h: "El color tiene que ir con lo que vendes",
        body: [
          {
            p: "Una taquería pintada de azul banco se ve fría. Un consultorio en rojo y negro se ve agresivo. El color correcto es el que hace que tu negocio se sienta como es en persona. Estos son los tres ejemplos que hice para negocios inventados:",
          },
          {
            swatches: [
              { name: "Mariscos", colors: ["#0C2B3A", "#FF5A3C", "#F3EADB", "#C9E356"], note: "El mar y el chile: azul profundo, rojo chile y arena. Se antoja y se siente fresco." },
              { name: "Dentista", colors: ["#0F3D33", "#D7F0E3", "#FFB59A", "#FBFAF6"], note: "Verde menta y durazno: limpio sin parecer hospital, tranquilo sin ser frío." },
              { name: "Gimnasio", colors: ["#0D0D0E", "#D8FF3C", "#F4F4F0", "#18181A"], note: "Negro y verde ácido: energía y fuerza. Ahí sí, nada de colores suaves." },
            ],
          },
          { link: { to: "/ejemplos-paginas-web", label: "Ver las tres páginas completas" } },
        ],
      },
      {
        h: "Lo que de verdad da confianza",
        body: [
          {
            ol: [
              "Consistencia. Los mismos colores en tu página, tu logo, tu Instagram y tu local. Cuando todo coincide, el negocio se ve establecido.",
              "Contraste. Que el texto se lea sin esfuerzo. Las pautas de accesibilidad de la web piden una relación de contraste de al menos 4.5 a 1 para texto normal y 3 a 1 para texto grande.",
              "Un color para actuar. El botón principal siempre del mismo color, y que nada más en la página compita con él. Así la gente sabe dónde tocar sin pensarlo.",
              "Pocos colores. Uno principal, uno de acento y neutros (blancos, negros, grises o cremas). Una regla práctica muy usada es 60 % neutro, 30 % color principal y 10 % acento.",
            ],
          },
          { fact: { n: "4.5 : 1", text: "es el contraste mínimo que piden las pautas de accesibilidad (WCAG) para texto normal. Para texto grande, 3 : 1.", src: 1 } },
        ],
      },
      {
        h: "Colores que suelen restar",
        body: [
          {
            ul: [
              "El degradado morado-azul de plantilla: es tan común que hace que tu página se vea genérica al instante.",
              "Rojo en todo: el rojo llama la atención, así que si todo es rojo, nada destaca y todo parece urgente.",
              "Neón sobre neón: cansa la vista y se lee mal.",
              "Gris clarito para el texto: se ve elegante en pantalla grande y se vuelve invisible en un celular al sol.",
            ],
          },
        ],
      },
      {
        h: "Cómo elegir los tuyos",
        body: [
          {
            ol: [
              "Parte de lo que ya tienes: tu logo, tu local, tu producto. Los colores de tu página tienen que coincidir con lo que la gente ve cuando te visita.",
              "Escoge un color de acento solo para los botones importantes.",
              "Revisa el contraste de tus textos con una herramienta gratis como el Contrast Checker de WebAIM.",
              "Ve tu página en el celular, afuera, con sol. Si ahí se lee bien, se lee bien en todos lados.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Labrecque y Milne (2012), Exciting red and competent blue: the importance of color in marketing", url: "https://link.springer.com/article/10.1007/s11747-010-0245-y" },
      { label: "W3C, WCAG 2.2: contraste mínimo", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
      { label: "WebAIM, Contrast Checker", url: "https://webaim.org/resources/contrastchecker/" },
    ],
    related: ["por-que-tu-pagina-se-ve-barata", "tu-pagina-en-10-segundos"],
  },
  {
    slug: "tu-pagina-en-10-segundos",
    title: [["w", "Tu página tiene"], ["i", "10 segundos."], ["G", "Lo que debe ver un cliente al entrar."]],
    kicker: "Diseño web · Primera impresión",
    date: "2026-11-25",
    read: 6,
    lead:
      "Antes de leer una sola palabra, la gente ya decidió si tu página le da confianza. Y si en los primeros segundos no entiende qué haces, se va. Esto es lo que tiene que ver un cliente nada más entrar.",
    sections: [
      {
        h: "Lo que pasa en los primeros segundos",
        body: [
          {
            timeline: [
              { t: "0.05 s", label: "La impresión", text: "En 50 milisegundos la persona ya juzgó si la página se ve bien. Un estudio de Google encontró juicios así desde los 17 milisegundos." },
              { t: "10 s", label: "La decisión", text: "Los primeros 10 segundos son en los que es más probable que alguien se vaya. Ahí tiene que quedar claro qué ofreces." },
              { t: "30 s +", label: "Se queda", text: "Pasado ese momento, entre más tiempo lleva alguien en la página, menos probable es que se vaya." },
            ],
          },
          {
            p: "En pocas palabras: los primeros segundos deciden si alguien sigue leyendo. Por eso lo de hasta arriba de tu página importa más que todo lo demás.",
          },
        ],
      },
      {
        h: "Simple y familiar gana",
        body: [
          {
            p: "El mismo estudio de Google encontró que la gente prefiere las páginas visualmente simples y que se ven como se espera que se vea ese tipo de página. Las páginas recargadas se ven menos atractivas, aunque sean familiares, y las que rompen con lo esperado también salen mal evaluadas.",
          },
          {
            p: "La lección: el menú arriba, el logo a la izquierda y el botón donde se espera. Sé original en tu identidad (tus colores, tus fotos, tus palabras), no en dónde va cada cosa.",
          },
        ],
      },
      {
        h: "Las 4 cosas que deben verse sin hacer scroll",
        body: [
          { p: "Abre tu página en el celular. Sin mover nada, en esa primera pantalla deberían estar:" },
          {
            ol: [
              "Qué haces, en una frase concreta. No «soluciones integrales», sino «aguachiles y ceviches para llevar» o «dentista para niños».",
              "Dónde y para quién. Si atiendes en Culiacán, dilo. A la gente de aquí le da confianza ver que eres de aquí.",
              "Una prueba. Una foto real de tu trabajo, un precio «desde», tu horario de hoy: algo que no sea promesa.",
              "Un solo botón con la acción principal: pedir, agendar, cotizar. Que diga exactamente qué pasa al tocarlo.",
            ],
          },
          { compare: "molar" },
        ],
      },
      {
        h: "Lo que estorba en esos segundos",
        body: [
          {
            ul: [
              "Ventanas emergentes nada más entrar. Antes de saber qué vendes, ya te están pidiendo algo.",
              "Carruseles que cambian solos. Nadie espera a que gire para ver la foto que importa.",
              "Videos pesados de fondo. Se ven bien en la computadora de quien hizo la página y tardan una eternidad en un celular con datos.",
              "Menús con muchas opciones. Mientras más opciones, más tarda la gente en decidir a dónde ir.",
            ],
          },
        ],
      },
      {
        h: "Y si tarda en cargar, no hay primera impresión",
        body: [
          {
            p: "Todo lo anterior supone que la página ya apareció. Google mide qué tan rápido se ve lo principal de una página (lo llama LCP) y considera buena una carga de 2.5 segundos o menos. Revisa la tuya gratis en PageSpeed Insights.",
          },
          { fact: { n: "2.5 s", text: "o menos es lo que Google considera una buena velocidad para que aparezca lo principal de tu página.", src: 3 } },
        ],
      },
      {
        h: "La prueba de los 5 segundos",
        body: [
          {
            ol: [
              "Enséñale tu página en el celular a alguien que no la conozca, durante 5 segundos.",
              "Quítale el teléfono y pregúntale: ¿qué vende?, ¿dónde está?, ¿qué harías para comprarle?",
              "Lo que no recuerde es lo que tu página no está diciendo con claridad.",
            ],
          },
          { link: { to: "/servicios/rediseno-web", label: "Si tu página no pasa la prueba, así la rediseño" } },
        ],
      },
    ],
    sources: [
      { label: "Lindgaard et al. (2006), Behaviour & Information Technology, reseñado en Nature", url: "https://www.nature.com/news/2006/060109/full/news060109-13.html" },
      { label: "Google Research (2012), Users love simple and familiar designs", url: "https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/" },
      { label: "Nielsen Norman Group, How Long Do Users Stay on Web Pages? (sobre Liu, White y Dumais, 2010)", url: "https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/" },
      { label: "Google, web.dev: Largest Contentful Paint (LCP)", url: "https://web.dev/articles/lcp" },
    ],
    related: ["por-que-tu-pagina-se-ve-barata", "colores-que-dan-confianza"],
  },
  {
    slug: "pagina-web-para-restaurante",
    title: [["w", "Cómo debe ser la página"], ["g", "de un"], ["i", "restaurante."]],
    kicker: "Diseño web · Restaurantes",
    date: "2026-11-25",
    read: 6,
    lead:
      "Quien entra a la página de un restaurante casi siempre viene por lo mismo: ver qué hay, cuánto cuesta, si está abierto y cómo pedir. Si eso tarda en encontrarse, se va a pedir a otro lado.",
    sections: [
      {
        h: "Lo que tu cliente busca, en este orden",
        body: [
          {
            ol: [
              "Qué vendes y si se le antoja: tu platillo estrella, con una foto real.",
              "Si estás abierto ahorita: el horario de hoy, no una tabla escondida al final.",
              "Cuánto cuesta: la carta con precios.",
              "Cómo pedir o llegar: un botón para pedir y tu ubicación.",
            ],
          },
          {
            p: "Todo eso debería resolverse en la primera pantalla del celular, o a un movimiento de dedo. Lo demás (la historia del negocio, la galería, las redes) puede ir después.",
          },
          { fact: { n: "97.2 %", text: "de quienes usan internet en México se conectan desde un celular inteligente. Tu carta se va a leer, casi siempre, en una pantalla chica.", src: 3 } },
        ],
      },
      {
        h: "La carta, en la página y no en PDF",
        body: [
          {
            p: "Subir la carta en PDF es lo más rápido para el negocio y lo más incómodo para el cliente: hay que descargarla, hacer zoom y moverse de un lado a otro con el dedo. Nielsen Norman Group, una firma de investigación en experiencia de usuario, recomienda no usar PDF para contenido que se lee en pantalla: la gente se pierde, tarda en cargar y no se puede recorrer como una página.",
          },
          {
            p: "Mejor escribe la carta en la página: por secciones, con nombre, una línea de descripción y precio. Así se lee bien en el celular, la actualizas en un minuto y Google también puede leerla.",
          },
          { compare: "marejada" },
        ],
      },
      {
        h: "Fotos: pocas, reales y de cerca",
        body: [
          {
            p: "La investigación de Nielsen Norman Group con seguimiento ocular encontró que la gente ignora las fotos de relleno y sí mira las que le dan información real, como el producto que va a comprar. En un restaurante, eso es tu comida.",
          },
          {
            ul: [
              "Toma las fotos con luz de día, cerca de una ventana y sin flash.",
              "De cerca y de frente o un poco desde arriba: que se vea la textura.",
              "Siempre del platillo real, no de banco de imágenes. Si el cliente pide lo de la foto, tiene que llegarle eso.",
            ],
          },
        ],
      },
      {
        h: "Un botón grande para pedir",
        body: [
          {
            p: "Pedir por WhatsApp, llamar o pedir en una app: elige la acción principal y hazla un botón grande, visible siempre en celular. Las guías de diseño para pantallas táctiles recomiendan que cualquier botón mida al menos un centímetro por lado, para que el dedo le atine sin esfuerzo.",
          },
          { fact: { n: "1 cm", text: "por lado es el tamaño mínimo recomendado para un botón en una pantalla táctil.", src: 2 } },
          { link: { to: "/notas/boton-de-whatsapp-en-tu-pagina", label: "Cómo hacer bien el botón de WhatsApp" } },
        ],
      },
      {
        h: "Lista rápida para revisar la tuya",
        body: [
          {
            ul: [
              "¿Se ve el horario de hoy sin buscarlo?",
              "¿La carta se lee en el celular sin hacer zoom?",
              "¿Los precios están actualizados?",
              "¿Hay un solo botón claro para pedir?",
              "¿Las fotos son de tu comida?",
              "¿Tu dirección abre el mapa al tocarla?",
            ],
          },
          { link: { to: "/ejemplos-paginas-web", label: "Ver el ejemplo de una marisquería, antes y después" } },
        ],
      },
    ],
    sources: [
      { label: "Nielsen Norman Group, Avoid PDF for On-Screen Reading (2020)", url: "https://www.nngroup.com/articles/avoid-pdf-for-on-screen-reading/" },
      { label: "Nielsen Norman Group, Photos as Web Content (2010)", url: "https://www.nngroup.com/articles/photos-as-web-content/" },
      { label: "Nielsen Norman Group, Touch Targets on Touchscreens (2019)", url: "https://www.nngroup.com/articles/touch-target-size/" },
      { label: "INEGI, ENDUTIH 2024", url: "https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/endutih/ENDUTIH_24_RR.pdf" },
    ],
    related: ["boton-de-whatsapp-en-tu-pagina", "fotos-para-tu-pagina-web"],
  },
  {
    slug: "boton-de-whatsapp-en-tu-pagina",
    title: [["w", "El botón de"], ["i", "WhatsApp."], ["G", "Dónde va y qué debe decir."]],
    kicker: "Diseño web · Contacto",
    date: "2026-11-25",
    read: 5,
    lead:
      "Para muchos negocios, la página existe para una sola cosa: que la gente te escriba. Y aun así, el botón de WhatsApp suele estar escondido, ser diminuto o llevar a un número equivocado.",
    sections: [
      {
        h: "Por qué importa tanto",
        body: [
          { fact: { n: "93 %", text: "de quienes usan internet en México lo usan para comunicarse. Escribir por mensaje es lo más natural para tus clientes.", src: 0 } },
          {
            p: "Si tu cliente ya está en tu página y le dan ganas de preguntar, cada paso extra (copiar el número, abrir WhatsApp, agregarlo como contacto) es una oportunidad de que se le olvide. Un buen botón lo lleva directo a la conversación.",
          },
        ],
      },
      {
        h: "Dónde ponerlo",
        body: [
          {
            ul: [
              "Arriba, en la primera pantalla, como acción principal.",
              "Al final de cada sección importante (servicios, precios, preguntas): justo donde se le resolvió la duda.",
              "En celular, un botón fijo abajo ayuda, siempre que no tape texto ni otros botones.",
            ],
          },
          { tip: "Una sola acción principal por página. Si todo es botón, nada destaca." },
        ],
      },
      {
        h: "Qué tamaño y qué debe decir",
        body: [
          {
            p: "En celular, que mida al menos un centímetro de alto: es el mínimo que recomiendan las guías de diseño para pantallas táctiles. Y que el texto diga qué pasa al tocarlo. «Contáctanos» es vago; «Pide por WhatsApp», «Cotiza por WhatsApp» o «Agenda tu cita por WhatsApp» dicen exactamente qué va a pasar.",
          },
          { fact: { n: "1 cm", text: "de alto es el mínimo recomendado para que un botón se toque bien con el dedo.", src: 1 } },
        ],
      },
      {
        h: "El mensaje ya escrito",
        body: [
          {
            p: "WhatsApp permite que el link abra la conversación con un mensaje listo para enviar. El formato oficial es wa.me/ seguido de tu número completo con lada de país, sin espacios, guiones ni el signo +, y después ?text= con el mensaje. Por ejemplo: wa.me/5266700000000?text=Hola, quiero hacer un pedido.",
          },
          {
            p: "Escribe ese mensaje pensando en ti: que te diga de dónde viene el cliente y qué quiere. «Hola, vi su página y quiero cotizar» te ahorra la primera pregunta.",
          },
          { fact: { n: "wa.me", text: "es el formato de link oficial de WhatsApp para abrir un chat con un número, con o sin mensaje escrito.", src: 2 } },
        ],
      },
      {
        h: "Revísalo hoy",
        body: [
          {
            ol: [
              "Abre tu página en tu celular y toca el botón de WhatsApp.",
              "Confirma que abre el chat con tu número, no con otro. Pasa más de lo que crees: plantillas que traen el número de quien hizo la página, o un número viejo.",
              "Revisa que el mensaje escrito tenga sentido y no diga el nombre de la plantilla.",
            ],
          },
          { link: { to: "/herramientas/tarjeta-qr", label: "Haz gratis la tarjeta con el QR de tu WhatsApp" } },
        ],
      },
    ],
    sources: [
      { label: "INEGI, ENDUTIH 2024: usos de internet", url: "https://inegi.org.mx/contenidos/programas/endutih/2024/doc/presentacion_endutih2024.pdf" },
      { label: "Nielsen Norman Group, Touch Targets on Touchscreens (2019)", url: "https://www.nngroup.com/articles/touch-target-size/" },
      { label: "WhatsApp, How to use click to chat", url: "https://whatsapp.com/faq/en/general/26000030" },
    ],
    related: ["pagina-web-para-restaurante", "tu-pagina-en-10-segundos"],
  },
  {
    slug: "fotos-para-tu-pagina-web",
    title: [["w", "Fotos para tu página,"], ["i", "con tu celular."], ["G", "Sin fotógrafo y sin fotos de banco."]],
    kicker: "Diseño web · Fotografía",
    date: "2026-11-25",
    read: 6,
    lead:
      "No necesitas un fotógrafo para tener buenas fotos en tu página. Necesitas fotos reales de tu negocio, bien iluminadas y pensadas para dónde van a ir. Con el celular que ya tienes alcanza.",
    sections: [
      {
        h: "Por qué fotos reales y no de banco",
        body: [
          {
            p: "En estudios de seguimiento ocular de Nielsen Norman Group, la gente pasó por alto las fotos decorativas puestas «para adornar», y en cambio se detuvo en fotos con información real: las personas del equipo y los productos que iba a comprar.",
          },
          { fact: { n: "10 %", text: "más tiempo pasó un usuario viendo las fotos reales del equipo de una empresa que leyendo sus biografías, aunque las biografías ocupaban 316 % más espacio.", src: 0 } },
          { p: "Una foto real de tu local, tu producto o tu equipo dice «esto existe y somos nosotros». Una de banco dice «no teníamos fotos»." },
        ],
      },
      {
        h: "Cómo tomarlas",
        body: [
          {
            ul: [
              "Luz de día. Cerca de una ventana o afuera en sombra. Evita el flash y la luz amarilla de foco.",
              "Limpia el lente del celular. Parece obvio, pero es la causa más común de fotos borrosas.",
              "Fondo sencillo. Quita lo que no tiene que salir: cajas, cables, bolsas.",
              "Toma horizontal y vertical. La página usa horizontales en computadora y verticales en celular.",
              "Toma de más. De 20 fotos, vas a usar 3.",
              "Mismo estilo en todas: misma luz y mismo tipo de fondo. Así se ven como de una sola marca.",
            ],
          },
        ],
      },
      {
        h: "Qué fotos necesita tu página",
        body: [
          {
            ol: [
              "Una principal: tu producto estrella o tu local por fuera, para la primera pantalla.",
              "Tu producto o servicio en acción: el platillo servido, el corte terminado, el trabajo entregado.",
              "Tu equipo o tú: la gente quiere saber con quién va a tratar.",
              "Tu fachada: para que te reconozcan al llegar.",
            ],
          },
        ],
      },
      {
        h: "Antes de subirlas: que no pesen",
        body: [
          {
            p: "Una foto directa del celular puede pesar varios megas, y eso hace que tu página tarde en abrir. Pídele a quien haga tu página que las suba en formatos modernos como WebP o AVIF: según la documentación de Google, cargan más rápido y gastan menos datos que los JPG y PNG de siempre, con la misma calidad.",
          },
          { fact: { n: "2.5 s", text: "o menos es lo que Google considera una buena velocidad para que aparezca lo principal de tu página. Las fotos pesadas son de lo primero que la frena.", src: 2 } },
        ],
      },
    ],
    sources: [
      { label: "Nielsen Norman Group, Photos as Web Content (2010)", url: "https://www.nngroup.com/articles/photos-as-web-content/" },
      { label: "Google, Lighthouse: Serve images in modern formats", url: "https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images" },
      { label: "Google, web.dev: Largest Contentful Paint (LCP)", url: "https://web.dev/articles/lcp" },
    ],
    related: ["pagina-web-para-restaurante", "por-que-tu-pagina-se-ve-barata"],
  },
  {
    slug: "donde-poner-tu-logo",
    title: [["w", "Dónde poner"], ["i", "tu logo"], ["g", "en tu página web."]],
    kicker: "Diseño web · Marca",
    date: "2026-11-25",
    read: 4,
    lead:
      "Parece un detalle, pero el lugar de tu logo cambia qué tanto te recuerdan y qué tan fácil es moverse por tu página. Y la respuesta es menos creativa de lo que crees: arriba a la izquierda.",
    sections: [
      {
        h: "Arriba a la izquierda, y no por costumbre",
        body: [
          { fact: { n: "89 %", text: "más probable es que la gente recuerde un logo puesto arriba a la izquierda que uno puesto a la derecha, según un estudio de Nielsen Norman Group.", src: 0 } },
          {
            p: "El mismo estudio encontró que mover el logo de ese lugar, por ejemplo al centro, hace que la gente se mueva peor por la página. Es donde todos esperan encontrarlo, y la gente prefiere las páginas que se ven como espera.",
          },
        ],
      },
      {
        h: "Que lleve al inicio",
        body: [
          {
            p: "Tocar el logo para volver al inicio es una de esas costumbres que todo mundo tiene. Si tu logo no hace nada al tocarlo, la gente se siente atrapada.",
          },
        ],
      },
      {
        h: "Tamaño: que se lea, no que grite",
        body: [
          {
            ul: [
              "En celular, que se lea el nombre sin hacer zoom. Si tu logo es muy horizontal o tiene letras finas, ten una versión corta o solo el símbolo.",
              "Más grande no es mejor: un logo enorme le roba espacio a lo que vendes.",
              "En el pie de página puede volver a aparecer, más discreto.",
            ],
          },
        ],
      },
      {
        h: "Que se vea nítido",
        body: [
          {
            p: "Un logo pixeleado es de las señales más rápidas de que algo está descuidado. Pídele a quien hizo tu logo el archivo en vector (SVG, AI o PDF). En formato SVG se ve nítido en cualquier pantalla y casi no pesa.",
          },
          { tip: "Si solo tienes tu logo en una foto o en un JPG chiquito, vale la pena redibujarlo antes de rediseñar la página." },
          { link: { to: "/notas/por-que-tu-pagina-se-ve-barata", label: "Otras señales que hacen ver barata una página" } },
        ],
      },
    ],
    sources: [
      { label: "Nielsen Norman Group, Logo Placement Affects Web Navigation and Brand Recall (2017)", url: "https://www.nngroup.com/videos/logo-placement/" },
      { label: "Google Research (2012), Users love simple and familiar designs", url: "https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/" },
    ],
    related: ["por-que-tu-pagina-se-ve-barata", "tipografia-para-tu-pagina-web"],
  },
  {
    slug: "tipografia-para-tu-pagina-web",
    title: [["w", "Letras que se lean"], ["g", "y tengan"], ["i", "carácter."]],
    kicker: "Diseño web · Tipografía",
    date: "2026-11-25",
    read: 5,
    lead:
      "La tipografía es la voz de tu página. Antes de que alguien lea lo que dices, ya escuchó cómo lo dices. Estas son las reglas que uso para elegirla.",
    sections: [
      {
        h: "Dos tipos de letra, no más",
        body: [
          {
            p: "Una para los títulos, con carácter, que diga algo de tu negocio. Otra para el texto, muy fácil de leer. Si agregas una tercera, casi siempre se ve desordenado.",
          },
          {
            ul: [
              "Una taquería puede tener títulos gruesos y con personalidad.",
              "Un despacho o un consultorio, algo más sobrio y limpio.",
              "Un negocio de diseño o de moda puede jugar con una letra con serifa elegante.",
            ],
          },
        ],
      },
      {
        h: "Tamaño: si se lee en celular, se lee en todos lados",
        body: [
          {
            p: "La mayoría de tus clientes te va a leer en el teléfono, a veces caminando o al sol. Google marcaba como difícil de leer en celular el texto de menos de 12 píxeles. Para el texto principal ve bastante más arriba de eso, y deja los tamaños chicos solo para etiquetas y notas.",
          },
          { fact: { n: "12 px", text: "es el tamaño que la herramienta de revisión de Google usaba como mínimo para considerar que un texto se lee bien en celular.", src: 2 } },
        ],
      },
      {
        h: "Renglones ni muy largos ni muy cortos",
        body: [
          { fact: { n: "50–75", text: "caracteres por renglón es el largo que recomienda Baymard Institute para leer cómodo. Más largo cansa y cuesta encontrar el siguiente renglón.", src: 0 } },
          { p: "En computadora, un párrafo de lado a lado de la pantalla es difícil de leer. Limita el ancho del texto aunque la pantalla sea grande." },
        ],
      },
      {
        h: "Contraste y espacio",
        body: [
          {
            p: "Texto oscuro sobre fondo claro (o al revés) con buena diferencia: las pautas de accesibilidad piden un contraste de al menos 4.5 a 1 para texto normal. Y deja aire entre renglones: el texto apretado se ve barato y se lee peor.",
          },
          { fact: { n: "4.5 : 1", text: "es el contraste mínimo para texto normal según las pautas de accesibilidad web (WCAG).", src: 1 } },
          { link: { to: "/notas/colores-que-dan-confianza", label: "Qué colores dan confianza en una página web" } },
        ],
      },
    ],
    sources: [
      { label: "Baymard Institute, Readability: The Optimal Line Length (2022)", url: "https://baymard.com/blog/line-length-readability" },
      { label: "W3C, WCAG 2.2: contraste mínimo", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
      { label: "Google, Lighthouse: Document doesn't use legible font sizes", url: "https://developer.chrome.com/docs/lighthouse/seo/font-size" },
    ],
    related: ["colores-que-dan-confianza", "donde-poner-tu-logo"],
  },
];

export const note = (slug?: string) => NOTES.find((n) => n.slug === slug);

/** the title as plain text (without the grey line underneath) */
export const titleText = (n: Note) =>
  n.title
    .filter(([s]) => s !== "G")
    .map(([, t]) => t)
    .join(" ");
