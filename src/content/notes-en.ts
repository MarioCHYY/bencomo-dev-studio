import type { Block, Note, TitleSeg } from "./notes";

/**
 * The English version of each design note. Same structure, block for block, as the Spanish one
 * (facts point to the same sources by number), so a note can switch language without changing shape.
 */
export type NoteText = {
  title: TitleSeg[];
  kicker: string;
  lead: string;
  sections: { h: string; body: Block[] }[];
  sources: string[]; // the labels, in the same order as the Spanish note's sources
};

const SRC = {
  lindgaard: "Lindgaard et al. (2006), Behaviour & Information Technology, reported in Nature",
  stanford: "Stanford and Consumer WebWatch (2002), How Do People Evaluate a Web Site's Credibility?",
  webaim: "WebAIM, The WebAIM Million (2025)",
  inegi: "INEGI (Mexico's national statistics institute), ENDUTIH 2024",
  inegiUses: "INEGI, ENDUTIH 2024: what people use the internet for",
  labrecque: "Labrecque and Milne (2012), Exciting red and competent blue: the importance of color in marketing",
  wcag: "W3C, WCAG 2.2: minimum contrast",
  checker: "WebAIM, Contrast Checker",
  google: "Google Research (2012), Users love simple and familiar designs",
  nngStay: "Nielsen Norman Group, How Long Do Users Stay on Web Pages? (on Liu, White and Dumais, 2010)",
  lcp: "Google, web.dev: Largest Contentful Paint (LCP)",
  pdf: "Nielsen Norman Group, Avoid PDF for On-Screen Reading (2020)",
  photos: "Nielsen Norman Group, Photos as Web Content (2010)",
  touch: "Nielsen Norman Group, Touch Targets on Touchscreens (2019)",
  wa: "WhatsApp, How to use click to chat",
  formats: "Google, Lighthouse: Serve images in modern formats",
  logo: "Nielsen Norman Group, Logo Placement Affects Web Navigation and Brand Recall (2017)",
  baymard: "Baymard Institute, Readability: The Optimal Line Length (2022)",
  fontSize: "Google, Lighthouse: Document doesn't use legible font sizes",
};

export const NOTES_EN: Record<string, NoteText> = {
  "por-que-tu-pagina-se-ve-barata": {
    title: [["w", "Why does your website"], ["i", "look cheap?"], ["G", "8 signs and how to fix them."]],
    kicker: "Web design · Credibility",
    lead: "A website can have good information and still feel off. It's almost never one thing: it's small details that, together, say “this was done in a rush”. These are the eight signs I see most, and what to do about each one.",
    sections: [
      {
        h: "First: yes, people judge by looks",
        body: [
          { p: "It may sound shallow, but that's how it works. Before reading, people have already formed an idea of your website, and that first idea weighs on whether they believe you." },
          { fact: { n: "50 ms", text: "is how long it takes someone to form a first impression of how a page looks. And that quick impression matches the one they have after looking at it calmly.", src: 0 } },
          { fact: { n: "46.1 %", text: "of people's comments when judging whether a site was credible had to do with its design: the look, the layout, the type and the colors.", src: 1 } },
          { p: "The good news is that almost everything that makes a website look cheap can be fixed without changing your business: it's a matter of design." },
        ],
      },
      {
        h: "1. The headline says “Welcome to…”",
        body: [
          { p: "The headline at the top is the most valuable spot on your page, and “Welcome to Example Seafood” wastes it: it doesn't say what you sell, or why you and not the place across the street. Replace it with a line only your business could say." },
          { tip: "Test: if you swap the name and the headline fits any other business just as well, it's a template." },
          { compare: "marejada" },
        ],
      },
      {
        h: "2. Emojis and decorations everywhere",
        body: [
          { p: "An emoji in a WhatsApp message is fine. In headlines, buttons and every card, it looks improvised. On top of that, every phone and computer draws them differently, so you don't control how they look. If you want warmth on your page, get it from good photos, color and words." },
        ],
      },
      {
        h: "3. Too many typefaces, or the usual one",
        body: [
          { p: "Three or four different typefaces make everything look messy. Two are enough: one with character for headlines and a very readable one for text. And if you use the same one every template ships with, your page will look like a thousand others." },
        ],
      },
      {
        h: "4. Text you can barely read",
        body: [
          { p: "Light grey on white, white letters over a busy photo, tiny text on a phone. It's one of the most common mistakes on the web and one of the most tiring." },
          { fact: { n: "79.1 %", text: "of the world's most visited home pages had low-contrast text in 2025.", src: 2 } },
          { tip: "Quick rule: if you have to squint or lean into the screen, it needs more contrast." },
        ],
      },
      {
        h: "5. Stock photos that aren't your business",
        body: [
          { p: "The smiling man in a hard hat, the office team high-fiving. People recognize those photos and, when they see them, believe you a little less. A real photo of your place, your product or your team, even taken with a phone, says more. Take it in daylight, straight on and without heavy filters." },
        ],
      },
      {
        h: "6. Spacing without a rule",
        body: [
          { p: "A cramped section, then one with a huge gap, buttons of different sizes, things that almost line up. Nobody notices it consciously, but it feels messy. Use the same margins and gaps across the whole page and align everything to the same edges." },
        ],
      },
      {
        h: "7. It looks bad on a phone",
        body: [
          { fact: { n: "97.2 %", text: "of people who use the internet in Mexico go online from a smartphone.", src: 3 } },
          { p: "So the phone version isn't the secondary one: it's the main one. Open your website on your own phone and check for cut-off text, buttons your finger keeps missing, menus that cover everything or photos that take forever to show up." },
        ],
      },
      {
        h: "8. Signs of neglect",
        body: [
          { p: "“© 2019” in the footer, links that go nowhere, a pixelated logo, “Coming soon” sections or a WhatsApp number that's no longer yours. Each one tells visitors that nobody looks after the website, and maybe not the business either." },
        ],
      },
      {
        h: "How to tell if yours is in trouble",
        body: [
          {
            ol: [
              "Show your website to someone who doesn't know it, for just 5 seconds.",
              "Take it away and ask them what you sell, to whom, and what they'd have to do to buy from you.",
              "If they can't answer all three, the problem isn't them: it's the website.",
            ],
          },
          { link: { to: "/ejemplos-paginas-web", label: "See examples: generic page versus designed" } },
        ],
      },
    ],
    sources: [SRC.lindgaard, SRC.stanford, SRC.webaim, SRC.inegi],
  },

  "colores-que-dan-confianza": {
    title: [["w", "Which colors build"], ["i", "trust"], ["g", "on a website."]],
    kicker: "Web design · Color",
    lead: "Search for “the color of trust” and you'll read “blue” a thousand times. It's not wrong, but it falls short: trust depends more on how you use color than on which color you pick.",
    sections: [
      {
        h: "What the research does say",
        body: [
          { p: "Color shapes the personality people attribute to a brand. In a study published in the Journal of the Academy of Marketing Science, researchers found that red is associated with excitement and blue with competence (hence the study's title: “exciting red and competent blue”). They also found that hue isn't the only thing that matters: how saturated, light or dark a color is changes the impression." },
          { p: "That's why so many banks and insurers are blue: they want to look serious and capable. But that doesn't mean blue works for everyone." },
        ],
      },
      {
        h: "The color has to fit what you sell",
        body: [
          { p: "A taco stand painted bank blue looks cold. A dental office in red and black looks aggressive. The right color is the one that makes your business feel the way it does in person. These are the three examples I made for made-up businesses:" },
          {
            swatches: [
              { name: "Seafood", colors: ["#0C2B3A", "#FF5A3C", "#F3EADB", "#C9E356"], note: "The sea and the chili: deep blue, chili red and sand. Mouth-watering and fresh." },
              { name: "Dentist", colors: ["#0F3D33", "#D7F0E3", "#FFB59A", "#FBFAF6"], note: "Mint green and peach: clean without looking like a hospital, calm without being cold." },
              { name: "Gym", colors: ["#0D0D0E", "#D8FF3C", "#F4F4F0", "#18181A"], note: "Black and acid green: energy and strength. Here, no soft colors." },
            ],
          },
          { link: { to: "/ejemplos-paginas-web", label: "See the three full pages" } },
        ],
      },
      {
        h: "What really builds trust",
        body: [
          {
            ol: [
              "Consistency. The same colors on your website, your logo, your Instagram and your storefront. When everything matches, the business looks established.",
              "Contrast. Text that reads without effort. The web accessibility guidelines ask for a contrast ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text.",
              "One color for action. The main button always the same color, and nothing else on the page competing with it. That way people know where to tap without thinking.",
              "Few colors. One main color, one accent and neutrals (whites, blacks, greys or creams). A widely used rule of thumb is 60% neutral, 30% main color and 10% accent.",
            ],
          },
          { fact: { n: "4.5 : 1", text: "is the minimum contrast the accessibility guidelines (WCAG) ask for normal text. For large text, 3 : 1.", src: 1 } },
        ],
      },
      {
        h: "Colors that usually hurt",
        body: [
          {
            ul: [
              "The template purple-blue gradient: it's so common it makes your page look generic instantly.",
              "Red everywhere: red grabs attention, so if everything is red, nothing stands out and everything feels urgent.",
              "Neon on neon: tiring to look at and hard to read.",
              "Light grey for text: looks elegant on a big screen and disappears on a phone in the sun.",
            ],
          },
        ],
      },
      {
        h: "How to choose yours",
        body: [
          {
            ol: [
              "Start from what you already have: your logo, your place, your product. Your website's colors should match what people see when they visit you.",
              "Pick an accent color just for the important buttons.",
              "Check the contrast of your text with a free tool like WebAIM's Contrast Checker.",
              "Look at your website on a phone, outside, in the sun. If it reads well there, it reads well everywhere.",
            ],
          },
        ],
      },
    ],
    sources: [SRC.labrecque, SRC.wcag, SRC.checker],
  },

  "tu-pagina-en-10-segundos": {
    title: [["w", "Your website has"], ["i", "10 seconds."], ["G", "What a customer should see on arrival."]],
    kicker: "Web design · First impression",
    lead: "Before reading a single word, people have already decided whether your website feels trustworthy. And if in the first seconds they don't understand what you do, they leave. This is what a customer should see the moment they arrive.",
    sections: [
      {
        h: "What happens in the first seconds",
        body: [
          {
            timeline: [
              { t: "0.05 s", label: "The impression", text: "In 50 milliseconds a person has already judged whether the page looks good. A Google study found judgments like that from 17 milliseconds." },
              { t: "10 s", label: "The decision", text: "The first 10 seconds are when someone is most likely to leave. That's when what you offer has to be clear." },
              { t: "30 s +", label: "They stay", text: "Past that point, the longer someone has been on the page, the less likely they are to leave." },
            ],
          },
          { p: "In short: the first seconds decide whether someone keeps reading. That's why the top of your page matters more than everything else." },
        ],
      },
      {
        h: "Simple and familiar wins",
        body: [
          { p: "The same Google study found that people prefer pages that are visually simple and look the way that kind of page is expected to look. Busy pages look less attractive, even when they're familiar, and the ones that break expectations also score poorly." },
          { p: "The lesson: menu at the top, logo on the left and the button where people expect it. Be original in your identity (your colors, your photos, your words), not in where things go." },
        ],
      },
      {
        h: "The 4 things that must show without scrolling",
        body: [
          { p: "Open your website on a phone. Without moving anything, that first screen should have:" },
          {
            ol: [
              "What you do, in one concrete sentence. Not “comprehensive solutions”, but “aguachiles and ceviches to go” or “dentist for kids”.",
              "Where and for whom. If you serve Culiacán, say so. Locals trust seeing that you're local.",
              "Some proof. A real photo of your work, a starting price, today's hours: something that isn't a promise.",
              "A single button with the main action: order, book, get a quote. It should say exactly what happens when tapped.",
            ],
          },
          { compare: "molar" },
        ],
      },
      {
        h: "What gets in the way in those seconds",
        body: [
          {
            ul: [
              "Pop-ups on arrival. Before they know what you sell, you're already asking them for something.",
              "Auto-rotating carousels. Nobody waits for it to turn to see the photo that matters.",
              "Heavy background videos. They look great on the designer's computer and take forever on a phone on mobile data.",
              "Menus with lots of options. The more options, the longer people take to decide where to go.",
            ],
          },
        ],
      },
      {
        h: "And if it's slow to load, there's no first impression",
        body: [
          { p: "Everything above assumes the page has already appeared. Google measures how fast the main content of a page shows up (it calls it LCP) and considers 2.5 seconds or less a good load. Check yours for free in PageSpeed Insights." },
          { fact: { n: "2.5 s", text: "or less is what Google considers a good speed for the main content of your page to appear.", src: 3 } },
        ],
      },
      {
        h: "The 5-second test",
        body: [
          {
            ol: [
              "Show your website on a phone to someone who doesn't know it, for 5 seconds.",
              "Take the phone back and ask: what do they sell? where are they? what would you do to buy from them?",
              "Whatever they don't remember is what your page isn't saying clearly.",
            ],
          },
          { link: { to: "/servicios/rediseno-web", label: "If your website fails the test, here's how I redesign it" } },
        ],
      },
    ],
    sources: [SRC.lindgaard, SRC.google, SRC.nngStay, SRC.lcp],
  },

  "pagina-web-para-restaurante": {
    title: [["w", "What a restaurant's"], ["i", "website"], ["g", "should look like."]],
    kicker: "Web design · Restaurants",
    lead: "Whoever opens a restaurant's website almost always comes for the same thing: see what's on offer, what it costs, whether it's open and how to order. If that takes long to find, they order somewhere else.",
    sections: [
      {
        h: "What your customer looks for, in this order",
        body: [
          {
            ol: [
              "What you sell and whether it looks good: your signature dish, with a real photo.",
              "Whether you're open right now: today's hours, not a table hidden at the bottom.",
              "What it costs: the menu with prices.",
              "How to order or get there: an order button and your location.",
            ],
          },
          { p: "All of that should be solved on the first phone screen, or one swipe away. The rest (the story of the business, the gallery, the social links) can come later." },
          { fact: { n: "97.2 %", text: "of people who use the internet in Mexico go online from a smartphone. Your menu will almost always be read on a small screen.", src: 3 } },
        ],
      },
      {
        h: "The menu, on the page and not as a PDF",
        body: [
          { p: "Uploading the menu as a PDF is the fastest option for the business and the most annoying one for the customer: you have to download it, zoom in and pan around with your finger. Nielsen Norman Group, a user experience research firm, recommends against using PDF for content read on screen: people get lost, it's slow to load and it can't be browsed like a page." },
          { p: "Write the menu on the page instead: by sections, with name, a one-line description and price. That way it reads well on a phone, you update it in a minute and Google can read it too." },
          { compare: "marejada" },
        ],
      },
      {
        h: "Photos: few, real and close-up",
        body: [
          { p: "Nielsen Norman Group's eye-tracking research found that people ignore filler photos and do look at the ones that give them real information, like the product they're about to buy. In a restaurant, that's your food." },
          {
            ul: [
              "Shoot in daylight, near a window and without flash.",
              "Close-up, straight on or slightly from above: let the texture show.",
              "Always the real dish, never stock images. If customers order what's in the photo, that's what should arrive.",
            ],
          },
        ],
      },
      {
        h: "A big button to order",
        body: [
          { p: "Order on WhatsApp, call or order through an app: choose the main action and make it a big button, always visible on phones. Touchscreen design guidelines recommend that any button be at least one centimeter on each side, so a finger hits it without effort." },
          { fact: { n: "1 cm", text: "per side is the recommended minimum size for a button on a touchscreen.", src: 2 } },
          { link: { to: "/notas/boton-de-whatsapp-en-tu-pagina", label: "How to get the WhatsApp button right" } },
        ],
      },
      {
        h: "Quick checklist for yours",
        body: [
          {
            ul: [
              "Can you see today's hours without looking for them?",
              "Does the menu read on a phone without zooming?",
              "Are the prices up to date?",
              "Is there one clear button to order?",
              "Are the photos of your food?",
              "Does your address open the map when tapped?",
            ],
          },
          { link: { to: "/ejemplos-paginas-web", label: "See a seafood restaurant example, before and after" } },
        ],
      },
    ],
    sources: [SRC.pdf, SRC.photos, SRC.touch, SRC.inegi],
  },

  "boton-de-whatsapp-en-tu-pagina": {
    title: [["w", "The"], ["i", "WhatsApp"], ["w", "button."], ["G", "Where it goes and what it should say."]],
    kicker: "Web design · Contact",
    lead: "For many businesses, the website exists for one thing only: getting people to message you. And still, the WhatsApp button is often hidden, tiny or pointing to the wrong number.",
    sections: [
      {
        h: "Why it matters so much",
        body: [
          { fact: { n: "93 %", text: "of people who use the internet in Mexico use it to communicate. Messaging is the most natural thing for your customers.", src: 0 } },
          { p: "If your customer is already on your website and feels like asking, every extra step (copying the number, opening WhatsApp, saving the contact) is a chance for them to forget. A good button takes them straight to the conversation." },
        ],
      },
      {
        h: "Where to put it",
        body: [
          {
            ul: [
              "At the top, on the first screen, as the main action.",
              "At the end of every important section (services, prices, questions): right where their question got answered.",
              "On phones, a button fixed at the bottom helps, as long as it doesn't cover text or other buttons.",
            ],
          },
          { tip: "One main action per page. If everything is a button, nothing stands out." },
        ],
      },
      {
        h: "What size and what it should say",
        body: [
          { p: "On phones, at least one centimeter tall: the minimum touchscreen design guidelines recommend. And the text should say what happens when tapped. “Contact us” is vague; “Order on WhatsApp”, “Get a quote on WhatsApp” or “Book on WhatsApp” say exactly what will happen." },
          { fact: { n: "1 cm", text: "tall is the recommended minimum for a button to be tapped comfortably with a finger.", src: 1 } },
        ],
      },
      {
        h: "The message, already written",
        body: [
          { p: "WhatsApp lets the link open the conversation with a message ready to send. The official format is wa.me/ followed by your full number with country code, with no spaces, dashes or plus sign, then ?text= and the message. For example: wa.me/5266700000000?text=Hi, I'd like to place an order." },
          { p: "Write that message with yourself in mind: it should tell you where the customer comes from and what they want. “Hi, I saw your website and I'd like a quote” saves you the first question." },
          { fact: { n: "wa.me", text: "is WhatsApp's official link format to open a chat with a number, with or without a written message.", src: 2 } },
        ],
      },
      {
        h: "Check it today",
        body: [
          {
            ol: [
              "Open your website on your phone and tap the WhatsApp button.",
              "Make sure it opens the chat with your number, not someone else's. It happens more than you'd think: templates that carry the number of whoever built the site, or an old number.",
              "Check that the prefilled message makes sense and doesn't mention the template's name.",
            ],
          },
          { link: { to: "/herramientas/tarjeta-qr", label: "Make your WhatsApp QR card for free" } },
        ],
      },
    ],
    sources: [SRC.inegiUses, SRC.touch, SRC.wa],
  },

  "fotos-para-tu-pagina-web": {
    title: [["w", "Photos for your website,"], ["i", "with your phone."], ["G", "No photographer, no stock photos."]],
    kicker: "Web design · Photography",
    lead: "You don't need a photographer to have good photos on your website. You need real photos of your business, well lit and planned for where they'll go. The phone you already have is enough.",
    sections: [
      {
        h: "Why real photos and not stock",
        body: [
          { p: "In Nielsen Norman Group's eye-tracking studies, people skipped decorative photos added “to dress things up”, and instead stopped at photos with real information: the people on the team and the products they were about to buy." },
          { fact: { n: "10 %", text: "more time was spent by one user looking at a company's real team photos than reading their bios, even though the bios took up 316% more space.", src: 0 } },
          { p: "A real photo of your place, your product or your team says “this exists and it's us”. A stock one says “we didn't have photos”." },
        ],
      },
      {
        h: "How to take them",
        body: [
          {
            ul: [
              "Daylight. Near a window or outside in the shade. Avoid flash and the yellow light of a bulb.",
              "Clean your phone's lens. It sounds obvious, but it's the most common cause of blurry photos.",
              "Simple background. Remove what shouldn't be there: boxes, cables, bags.",
              "Shoot both horizontal and vertical. The website uses horizontal on computers and vertical on phones.",
              "Take more than you need. Out of 20 photos, you'll use 3.",
              "The same style in all of them: same light and same kind of background. That way they look like one brand.",
            ],
          },
        ],
      },
      {
        h: "Which photos your website needs",
        body: [
          {
            ol: [
              "A main one: your star product or your place from outside, for the first screen.",
              "Your product or service in action: the dish served, the haircut finished, the job delivered.",
              "Your team or you: people want to know who they'll deal with.",
              "Your storefront: so they recognize you when they arrive.",
            ],
          },
        ],
      },
      {
        h: "Before uploading: keep them light",
        body: [
          { p: "A photo straight from a phone can weigh several megabytes, and that makes your website slow to open. Ask whoever builds your site to upload them in modern formats like WebP or AVIF: according to Google's documentation, they load faster and use less data than the usual JPG and PNG, at the same quality." },
          { fact: { n: "2.5 s", text: "or less is what Google considers a good speed for the main content of your page to appear. Heavy photos are among the first things that slow it down.", src: 2 } },
        ],
      },
    ],
    sources: [SRC.photos, SRC.formats, SRC.lcp],
  },

  "donde-poner-tu-logo": {
    title: [["w", "Where to put"], ["i", "your logo"], ["g", "on your website."]],
    kicker: "Web design · Brand",
    lead: "It seems like a detail, but where your logo sits changes how well people remember you and how easy it is to move around your website. And the answer is less creative than you'd think: top left.",
    sections: [
      {
        h: "Top left, and not out of habit",
        body: [
          { fact: { n: "89 %", text: "more likely: that's how much better people remember a logo placed at the top left than one placed on the right, according to a Nielsen Norman Group study.", src: 0 } },
          { p: "The same study found that moving the logo from that spot, for example to the center, makes people navigate the page worse. It's where everyone expects to find it, and people prefer pages that look the way they expect." },
        ],
      },
      {
        h: "It should lead home",
        body: [
          { p: "Tapping the logo to go back to the home page is one of those habits everyone has. If your logo does nothing when tapped, people feel stuck." },
        ],
      },
      {
        h: "Size: readable, not shouting",
        body: [
          {
            ul: [
              "On phones, the name should read without zooming. If your logo is very wide or has thin letters, have a short version or just the symbol.",
              "Bigger isn't better: a huge logo steals space from what you sell.",
              "It can appear again in the footer, more discreetly.",
            ],
          },
        ],
      },
      {
        h: "It should look sharp",
        body: [
          { p: "A pixelated logo is one of the quickest signs that something is neglected. Ask whoever made your logo for the vector file (SVG, AI or PDF). As SVG it looks sharp on any screen and weighs almost nothing." },
          { tip: "If you only have your logo in a photo or a tiny JPG, it's worth redrawing it before redesigning the website." },
          { link: { to: "/notas/por-que-tu-pagina-se-ve-barata", label: "Other signs that make a website look cheap" } },
        ],
      },
    ],
    sources: [SRC.logo, SRC.google],
  },

  "tipografia-para-tu-pagina-web": {
    title: [["w", "Type that reads"], ["g", "and has"], ["i", "character."]],
    kicker: "Web design · Typography",
    lead: "Typography is your website's voice. Before someone reads what you say, they've already heard how you say it. These are the rules I use to choose it.",
    sections: [
      {
        h: "Two typefaces, no more",
        body: [
          { p: "One for headlines, with character, that says something about your business. Another for text, very easy to read. Add a third and it almost always looks messy." },
          {
            ul: [
              "A taco stand can have bold headlines with personality.",
              "A law firm or a clinic, something more sober and clean.",
              "A design or fashion business can play with an elegant serif.",
            ],
          },
        ],
      },
      {
        h: "Size: if it reads on a phone, it reads everywhere",
        body: [
          { p: "Most of your customers will read you on their phone, sometimes walking or in the sun. Google flagged text under 12 pixels as hard to read on phones. For the main text go well above that, and keep small sizes only for labels and notes." },
          { fact: { n: "12 px", text: "is the size Google's audit tool used as the minimum for text to read well on a phone.", src: 2 } },
        ],
      },
      {
        h: "Lines neither too long nor too short",
        body: [
          { fact: { n: "50–75", text: "characters per line is the length Baymard Institute recommends for comfortable reading. Longer is tiring and makes it hard to find the next line.", src: 0 } },
          { p: "On a computer, a paragraph running across the whole screen is hard to read. Limit the width of the text even when the screen is big." },
        ],
      },
      {
        h: "Contrast and space",
        body: [
          { p: "Dark text on a light background (or the other way around) with a clear difference: the accessibility guidelines ask for a contrast of at least 4.5 to 1 for normal text. And leave air between lines: cramped text looks cheap and reads worse." },
          { fact: { n: "4.5 : 1", text: "is the minimum contrast for normal text according to the web accessibility guidelines (WCAG).", src: 1 } },
          { link: { to: "/notas/colores-que-dan-confianza", label: "Which colors build trust on a website" } },
        ],
      },
    ],
    sources: [SRC.baymard, SRC.wcag, SRC.fontSize],
  },
};

/** the note in the language being read: Spanish as written, English from NOTES_EN */
export function inLang(n: Note, es: boolean): Note {
  if (es) return n;
  const en = NOTES_EN[n.slug];
  if (!en) return n;
  return {
    ...n,
    title: en.title,
    kicker: en.kicker,
    lead: en.lead,
    sections: en.sections,
    sources: n.sources.map((s, i) => ({ ...s, label: en.sources[i] ?? s.label })),
  };
}
