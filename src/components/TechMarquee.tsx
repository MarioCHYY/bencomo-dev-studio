const skills = [
  { name: "React", icon: "react-original" },
  { name: "TypeScript", icon: "typescript-original" },
  { name: "JavaScript", icon: "javascript-original" },
  { name: "Node.js", icon: "nodejs-original" },
  { name: "Python", icon: "python-original" },
  { name: "Tailwind CSS", icon: "tailwindcss-original" },
  { name: "Git", icon: "git-original" },
  { name: "Docker", icon: "docker-original" },
  { name: "Java", icon: "java-original" },
  { name: "Figma", icon: "figma-original" },
];

const IconItem = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex flex-col items-center gap-3 group min-w-[80px]">
    <div className="h-16 w-16 flex items-center justify-center">
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.split('-')[0]}/${icon}.svg`}
        alt={name}
        className="w-12 h-12 object-contain transition-all duration-300 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.9)] dark:brightness-[1.2] dark:contrast-[1.1]"
      />
    </div>
    <span className="text-[9px] font-medium tracking-[0.18em] uppercase dark:text-white/40 text-[#505060] group-hover:text-primary transition-colors whitespace-nowrap">
      {name}
    </span>
  </div>
);

const TechMarquee = () => {
  return (
    <div className="w-full overflow-hidden mt-16 relative py-10 border-t border-b dark:border-white/[0.04] border-black/[0.04]
      before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[120px]
      dark:before:bg-gradient-to-r before:bg-gradient-to-r dark:before:from-[#050505] before:from-[#F8F8F8] before:to-transparent
      after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[120px]
      dark:after:bg-gradient-to-l after:bg-gradient-to-l dark:after:from-[#050505] after:from-[#F8F8F8] after:to-transparent"
    >
      <div className="flex w-max animate-marquee">
        <div className="flex gap-16 pr-16 items-center">
          {skills.map((s, i) => (
            <IconItem key={`a-${i}`} name={s.name} icon={s.icon} />
          ))}
        </div>
        <div className="flex gap-16 pr-16 items-center">
          {skills.map((s, i) => (
            <IconItem key={`b-${i}`} name={s.name} icon={s.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
