import React from "react";
import { Link } from "react-router-dom";

interface FlipLinkProps {
  children: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

/**
 * FlipLink — animación de letras individuales al hacer hover.
 * Cada letra sube y es reemplazada por una copia que sube desde abajo,
 * con un delay escalonado para efecto de cascada.
 */
export const FlipLink = ({ children, href, className = "", onClick }: FlipLinkProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`group relative block whitespace-nowrap ${className}`}
      style={{ lineHeight: 1 }}
    >
      <div className="relative block overflow-hidden">
        {/* Top row — se va hacia arriba en hover */}
        <div className="flex">
          {children.split("").map((letter, i) => (
            <span
              key={`top-${i}`}
              className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </div>

        {/* Bottom row — sube desde abajo en hover */}
        <div className="absolute inset-0 flex">
          {children.split("").map((letter, i) => (
            <span
              key={`bottom-${i}`}
              className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

/**
 * Demo standalone — muestra el componente con links de ejemplo.
 */
export const Component = () => {
  return (
    <section className="grid place-content-center gap-2 bg-background w-full h-screen text-black">
      <FlipLink href="https://github.com/MarioCHYY" className="text-primary text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl">
        Github
      </FlipLink>
      <FlipLink href="https://www.linkedin.com/in/mario-bencomo-4998273aa/" className="text-primary text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl">
        Linkedin
      </FlipLink>
      <FlipLink href="https://www.instagram.com/mario_bencomo06" className="text-primary text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl">
        Instagram
      </FlipLink>
    </section>
  );
};
