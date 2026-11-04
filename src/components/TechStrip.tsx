import { useLang } from "@/i18n/LanguageContext";

const tech = [
  { name: "React", icon: "react/react-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "Node.js", icon: "nodejs/nodejs-original" },
  { name: "Python", icon: "python/python-original" },
  { name: "Tailwind", icon: "tailwindcss/tailwindcss-original" },
  { name: "Docker", icon: "docker/docker-original" },
  { name: "GitHub", icon: "github/github-original" },
  { name: "Vercel", icon: "vercel/vercel-original" },
  { name: "Figma", icon: "figma/figma-original" },
  { name: "Java", icon: "java/java-original" },
];

/** Tech I build with: a slow grayscale strip, colour on hover. */
const TechStrip = () => {
  const { lang } = useLang();
  const row = (k: string) => (
    <ul className="flex items-center gap-14 pr-14 shrink-0" aria-hidden={k === "b" ? true : undefined}>
      {tech.map((x) => (
        <li key={`${k}-${x.name}`} className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${x.icon}.svg`}
            alt=""
            loading="lazy"
            className="w-6 h-6 object-contain grayscale brightness-[1.8] opacity-60 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition"
          />
          <span className="text-[13px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap">{x.name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={lang === "es" ? "Tecnologías" : "Technologies"} className="relative z-20 py-12 border-y border-white/[0.06]">
      <p className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-8">
        {lang === "es" ? "Tecnologías con las que construyo" : "Tools I build with"}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: "40s" }}>
          {row("a")}
          {row("b")}
        </div>
      </div>
    </section>
  );
};

export default TechStrip;
