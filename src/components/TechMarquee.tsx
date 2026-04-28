import { motion } from "framer-motion";

const skills = [
  { name: "Docker", icon: "docker" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "Stripe", icon: "stripe" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Python", icon: "python" },
  { name: "Git", icon: "git" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Java", icon: "openjdk" },
];

const TechMarquee = () => {
  return (
    <div className="w-full overflow-hidden mt-20 relative py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[100px] before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[100px] after:bg-gradient-to-l after:from-background after:to-transparent">
      <div className="flex w-max animate-marquee">
        {/* First set of icons */}
        <div className="flex gap-16 pr-16 items-center justify-center">
          {skills.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="flex flex-col items-center gap-3 group min-w-20">
              <div className="h-12 w-12 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <img 
                  src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}/white`} 
                  alt={skill.name} 
                  className={`w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${skill.icon.startsWith('http') ? 'brightness-0 invert' : ''}`}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
        {/* Second set of icons (duplicate for seamless loop) */}
        <div className="flex gap-16 pr-16 items-center justify-center">
          {skills.map((skill, index) => (
            <div key={`${skill.name}-dup-${index}`} className="flex flex-col items-center gap-3 group min-w-20">
              <div className="h-12 w-12 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <img 
                  src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}/white`} 
                  alt={skill.name} 
                  className={`w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${skill.icon.startsWith('http') ? 'brightness-0 invert' : ''}`}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
