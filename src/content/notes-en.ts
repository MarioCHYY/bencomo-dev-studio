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

export const NOTES_EN: Record<string, NoteText> = {
  "valida-tu-idea-de-app": {
    title: [["w", "Validate your app idea"], ["i", "before you build it."], ["G", "What to test, with whom and how."]],
    kicker: "Product · Validation",
    lead:
      "Coding is the most expensive way to find out nobody wanted what you made. Before writing a line of code you can find out whether the problem exists, whether people care and whether your solution makes sense to them. Here's how I'd do it.",
    sections: [
      {
        h: "The biggest risk isn't technical",
        body: [
          { p: "Almost any idea can be built. The hard question is a different one: whether anyone will use it. When a startup shuts down, the most common reason isn't that the code failed." },
          { fact: { n: "42 %", text: "of 101 startups that shut down said the reason was that there was no market for what they built. It was the most cited reason in the analysis.", src: 0 } },
          { p: "Validating isn't asking your friends what they think of your idea. It's looking for evidence that the problem exists and that your solution makes sense, before paying to build it." },
        ],
      },
      {
        h: "The problem first, the app second",
        body: [
          { p: "Write in one sentence who you solve what for, and how they solve it today. If the answer is “they don't”, be wary: sometimes it means it doesn't hurt that much." },
          {
            ul: [
              "Who has the problem? A specific person, not “everyone”.",
              "How do they solve it today? A spreadsheet, a chat, a competitor, nothing.",
              "What does not solving it cost them? Time, money, mistakes, embarrassment.",
            ],
          },
          { tip: "If people already solve the problem with something improvised, that's a good sign: the problem exists, and your app competes with that workaround, not with nothing." },
        ],
      },
      {
        h: "A prototype to see if it makes sense",
        body: [
          { p: "With the problem clear, the next step is a prototype: clickable screens that feel like the app but have no logic behind them. It takes days, not months, and you can throw it away painlessly." },
          { p: "You don't need hundreds of people to test it. A few well-run sessions surface almost all of the big problems." },
          { fact: { n: "≈ 85 %", text: "of an interface's usability problems show up when testing it with 5 people, when each problem affects about a third of users.", src: 1 } },
          { tip: "I'd rather run three short rounds of five people, fixing things in between, than one long round: each fix uncovers what was hiding behind it." },
        ],
      },
      {
        h: "How to run a test session",
        body: [
          {
            ol: [
              "Give a task, not a tour: “log a $350 expense you paid with your mom's card”.",
              "Ask them to think out loud, and don't help, even when they get stuck.",
              "Note where they hesitate, where they go wrong and what they expected to see.",
              "At the end, ask how they solve it today and what would have to happen for them to switch.",
            ],
          },
          { p: "What people say matters less than what they do. If five people get stuck on the same button, the button is the problem, not them." },
        ],
      },
      {
        h: "What counts as validation",
        body: [
          {
            ul: [
              "People who finish the task without help.",
              "People who ask when it's coming out or ask you for access.",
              "People willing to give you something: their email, their time, a payment up front.",
            ],
          },
          { p: "Compliments don't count: “what a great idea” is kind and tells you nothing. And if after testing nobody wants more, you learned something cheaply. That's validating too." },
          { link: { to: "/servicios/prototipos-funcionales", label: "How I make prototypes to validate ideas" } },
        ],
      },
    ],
    sources: [
      "CB Insights (2014), analysis of 101 startups that shut down, published in Fortune",
      "Jeff Sauro (2010), MeasuringU: Why you only need to test with five users (explained)",
    ],
  },
  "prototipo-o-mvp": {
    title: [["w", "Prototype, MVP or product:"], ["i", "what comes first."], ["G", "Three stages that often get mixed up."]],
    kicker: "Product · Strategy",
    lead:
      "They get used as if they were the same thing, and they aren't. A prototype, an MVP and a product answer different questions, cost different amounts and are made with different tools. Mixing them up is the most common way to overspend too early.",
    sections: [
      {
        h: "Each stage answers one question",
        body: [
          {
            timeline: [
              { t: "Prototype", label: "Does it make sense?", text: "Clickable screens with no logic behind them. Good for testing the flow with users or showing the idea to an investor." },
              { t: "MVP", label: "Do people really use it?", text: "The first version that works, with the minimum to solve the main problem and measure whether people come back." },
              { t: "Product", label: "How does it grow?", text: "What you build once you know what works: more cases, more users, more polish." },
            ],
          },
        ],
      },
      {
        h: "What an MVP is, and isn't",
        body: [
          { p: "The term was popularised by Eric Ries, and his definition isn't about a small or cheap app: it's about learning." },
          { fact: { n: "MVP", text: "is, according to Ries, the version of a new product that lets a team learn the most about its customers with the least effort.", src: 0 } },
          { p: "An MVP isn't version 1.0 with features cut out. If it won't teach you something you don't know today, it's neither minimal nor viable: it's just small." },
        ],
      },
      {
        h: "When a prototype is enough",
        body: [
          {
            ul: [
              "You don't know yet whether the main flow makes sense.",
              "You need to show the idea to find partners or investment.",
              "You want to compare two ways of solving the same thing.",
            ],
          },
          { tip: "A good prototype isn't thrown away: its design and structure are the base of the MVP." },
        ],
      },
      {
        h: "When it's time for the MVP",
        body: [
          {
            ul: [
              "Prototype testing went well and people ask when they can use it.",
              "What you need to know only shows with real use: whether they come back, pay or invite others.",
              "You're clear on the minimum: one main task done really well, not ten done halfway.",
            ],
          },
          { p: "In corte, for example, the screen that justifies the app is one: how much each person owes before the card's due date. Everything else is built around it." },
        ],
      },
      {
        h: "The most expensive mistake",
        body: [
          { p: "Skipping the prototype and building the whole product at once, with every feature you thought of. When someone finally tries it, every change already costs code, not a while in Figma." },
          { link: { to: "/servicios/aplicaciones-web", label: "How I design and build an MVP" } },
        ],
      },
    ],
    sources: ["Lean Startup Co., What is an MVP? (Eric Ries's definition)"],
  },
  "onboarding-de-tu-app": {
    title: [["w", "The first minutes in your app"], ["i", "decide everything."], ["G", "How to design onboarding."]],
    kicker: "UX · Onboarding",
    lead:
      "Many people who install an app drop it very soon, usually before understanding what it was for. Onboarding is the stretch between “I opened it” and “it helped me”, and it deserves the same care as any other screen.",
    sections: [
      {
        h: "They leave very fast",
        body: [
          { fact: { n: "77 %", text: "of its daily active users is what the average Android app loses in the 3 days after install, according to Quettra data published by Andrew Chen.", src: 0 } },
          { fact: { n: "90 %", text: "are gone by day 30.", src: 0 } },
          { p: "Those numbers aren't a sentence, they're a priority: if someone doesn't find value in their first session, they rarely come back to look for it." },
        ],
      },
      {
        h: "The goal: reach the first “oh, got it” fast",
        body: [
          { p: "Every app has a moment when people understand what it's for: the first expense split, the first alert that saves them money. Design onboarding to get there in as few steps as possible." },
          {
            ul: [
              "Ask only for what you need for that first moment. The rest can wait.",
              "If your product allows it, let people see the app before asking them to sign up.",
              "Use sample data so screens don't look empty the first time.",
            ],
          },
          { compare: "alcancia" },
        ],
      },
      {
        h: "Tutorials: less than you think",
        body: [
          { p: "Welcome screens that explain the app before using it tend to get skipped or forgotten within minutes. Teaching in the moment works better: a hint next to the button when it's needed, not five cards up front." },
          { tip: "If your app needs a long tutorial to make sense, the problem is usually the interface, not the tutorial." },
        ],
      },
      {
        h: "Empty screens teach too",
        body: [
          { p: "The first time someone opens a section, there's nothing there. That screen can say what goes there and offer the button to create the first item, instead of a “No data”." },
          { ul: ["What they'll see here once there's information.", "The button to take the first step.", "An example, if it helps." ] },
        ],
      },
      {
        h: "Measure where they stop",
        body: [
          {
            ol: [
              "Define your app's first moment of value.",
              "Measure how many people who sign up reach it.",
              "See at which step the rest stop, and start improving there.",
            ],
          },
          { link: { to: "/servicios/ui-ux", label: "How I design a product's experience" } },
        ],
      },
    ],
    sources: ["Andrew Chen (2015), New data shows losing 80% of mobile users is normal (Quettra data)"],
  },
  "por-que-tu-app-se-ve-amateur": {
    title: [["w", "Why does your app"], ["i", "look amateur?"], ["G", "The interface details that give it away."]],
    kicker: "UI · Details",
    lead:
      "It's hardly ever one thing. An app looks amateur because of a sum of details that together say “this was rushed”: text you can't read, tiny buttons, random spacing, screens that don't say what's going on. All of them can be fixed.",
    sections: [
      {
        h: "1. Text you can barely read",
        body: [
          { p: "Light grey on white looks elegant on the designer's monitor and vanishes on a phone in full sun. There's a measure for this." },
          { fact: { n: "4.5 : 1", text: "is the minimum contrast the WCAG accessibility guidelines ask for normal text. For icons, field borders and other components, the minimum is 3 : 1.", src: 0 } },
        ],
      },
      {
        h: "2. Buttons that are too small",
        body: [
          { p: "A finger isn't a cursor. If people have to aim carefully, they make mistakes and get frustrated." },
          { fact: { n: "44 × 44", text: "pixels is the minimum touch target size at WCAG's strictest level. Apple asks for the same measure, in points, for iOS apps.", src: 0 } },
          { tip: "The tappable area can be bigger than what you see: a 24 px icon can have a 44 px zone around it." },
        ],
      },
      {
        h: "3. Random spacing",
        body: [
          { p: "When every margin is different, the screen looks messy even if nobody can say why. Pick a scale, say multiples of 4 or 8, and use it for everything: gaps, margins and sizes." },
        ],
      },
      {
        h: "4. Screens that don't say what's happening",
        body: [
          { p: "An app feels solid when it always responds. If you tap a button and nothing visible happens, you assume it failed and tap again." },
          { fact: { n: "0.1 s", text: "is how long a response can take and still feel instant. Up to 1 second people keep their train of thought; past 10, their attention goes elsewhere.", src: 1 } },
          { ul: ["Loading: a spinner or the screen's skeleton.", "Empty: what goes here and how to start.", "Error: what happened and what to do, in plain words."] },
        ],
      },
      {
        h: "5. A different button on every screen",
        body: [
          { p: "One primary button, one secondary and, at most, a text one. When every screen invents its own, the app feels assembled from parts of different places. A design system solves that." },
          { compare: "orbita" },
        ],
      },
      {
        h: "6. Filler words",
        body: [
          { p: "“Error 500”, “Submit” in an app that's otherwise in Spanish, or a “Lorem ipsum” that slipped into production. Words are interface too: label every button with the verb of what it does." },
          { tip: "“Save expense” says more than “OK”." },
          { link: { to: "/servicios/ui-ux", label: "How I design interfaces" } },
        ],
      },
    ],
    sources: [
      "W3C, WCAG 2.2: minimum contrast, non-text contrast and target size",
      "Nielsen Norman Group, Response Times: The 3 Important Limits",
      "Apple, Human Interface Guidelines: Accessibility",
    ],
  },
  "sistema-de-diseno": {
    title: [["w", "Does your product need"], ["i", "a design system?"], ["G", "When yes, and when not yet."]],
    kicker: "Design · Systems",
    lead:
      "A design system is the agreement on how your product looks and behaves: colours, type, components and the rules for using them. It isn't only for big companies, but it isn't the first thing you need either.",
    sections: [
      {
        h: "What it is, concretely",
        body: [
          {
            ul: [
              "Tokens: the base values, like colours, font sizes, spacing and corners.",
              "Components: buttons, fields, cards and alerts, with all their states.",
              "Rules: when to use each one, and when not to.",
            ],
          },
          { p: "It lives in Figma for whoever designs and in code for whoever builds. When both versions match, what's designed is what gets built." },
        ],
      },
      {
        h: "Why it saves time",
        body: [
          { fact: { n: "34 %", text: "faster is how quickly participants in a Figma experiment completed a design task with a design system, compared with doing it without one.", src: 0 } },
          { p: "The saving isn't only in design: every component solved once is a decision nobody makes again, or builds differently." },
        ],
      },
      {
        h: "Signs you already need one",
        body: [
          {
            ul: [
              "There are three shades of “primary” blue and nobody knows which is right.",
              "The same button looks different on every screen.",
              "More than one person designs or builds the interface.",
              "Every new feature is slow because it's designed from scratch.",
            ],
          },
        ],
      },
      {
        h: "When not yet",
        body: [
          { p: "If you're validating an idea with a prototype, a full system is getting ahead of yourself. A few basic decisions are enough: a short palette, two typefaces and a handful of components. The system grows with the product." },
          { tip: "Start with what repeats most: buttons, form fields and text. That already covers most screens." },
        ],
      },
      {
        h: "How to start without slowing the product down",
        body: [
          {
            ol: [
              "Take inventory: screenshot the screens and group what repeats.",
              "Unify: pick one version of each thing and name it.",
              "Document the states: default, hover, pressed, disabled and error.",
              "Move it to code and use it in the next thing you build, not in a big-bang redesign.",
            ],
          },
          { link: { to: "/servicios/ui-ux", label: "How I put design systems together" } },
        ],
      },
    ],
    sources: ["Figma, Measuring the value of design systems"],
  },
  "redisenar-sin-perder-usuarios": {
    title: [["w", "Redesign your app"], ["i", "without losing users."], ["G", "How to change what people already know."]],
    kicker: "Product · Redesign",
    lead:
      "A redesign can be better in every way and still get complaints in its first week. It isn't always because it's wrong: changing what people already know how to use costs them something, and that cost gets designed just like the screens.",
    sections: [
      {
        h: "The first reaction is almost always negative",
        body: [
          { p: "At Google they gave it a name: change aversion. Aaron Sedley describes it as the short-term negative reaction to changes in a product. It doesn't say whether the change is good or bad; it says people lost something they had mastered." },
          { p: "The key is telling apart complaints out of habit, which fade within days, from those pointing at a real problem, which stay." },
        ],
      },
      {
        h: "Respect what they've already learned",
        body: [
          { p: "What your users already know how to do in your app is an asset. Change what gets in the way and leave what works where it is, even if it looks less modern to you." },
          { tip: "Before moving something, ask whether the benefit is worth every person having to look for it again." },
        ],
      },
      {
        h: "Give notice, explain and let them go back",
        body: [
          { p: "Sedley's recommendations for launching big changes boil down to surprising nobody:" },
          {
            ul: [
              "Announce the change ahead of time, not on the day.",
              "Explain what changes and how it helps the person, not your team.",
              "If possible, let people try the new version and switch back for a while.",
              "Offer help with the transition and a channel for feedback.",
              "Tell them what you adjusted because of what they said.",
            ],
          },
        ],
      },
      {
        h: "Ship it in parts",
        body: [
          { p: "A redesign doesn't have to go out all at once on a Monday. You can start with one section or one group of users and measure before going on. If something gets worse, you see it early and with few people." },
          {
            ol: [
              "Pick one metric per flow: tasks completed, time or drop-offs.",
              "Measure it before the change so you have something to compare against.",
              "Release to a small group and compare.",
              "Adjust and expand.",
            ],
          },
        ],
      },
      {
        h: "Redesigning isn't starting over",
        body: [
          { p: "Often what feels old isn't the product, it's that it grew through patches. A design system and tidy flows can renew the app without throwing away what already works." },
          { link: { to: "/servicios/rediseno-web", label: "How I do a product redesign" } },
        ],
      },
    ],
    sources: ["Aaron Sedley, Change aversion: why users hate what you launched (and what to do about it), GV Library"],
  },
};

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
