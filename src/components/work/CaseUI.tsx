import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;
export const AURORA = "linear-gradient(90deg,#8FB0FF,#B7A8FF,#FF9AB0,#FFC48A)";

/** One numbered chapter of a case study: label + title on the left, content on the right */
export function Chapter({ n, kicker, title, children }: { n: string; kicker: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="relative z-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] gap-8 lg:gap-20">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
            <span className="font-mono text-white tabular-nums">{n}</span>
            <span className="h-px w-10" style={{ background: AURORA }} />
            <span className="text-white/45">{kicker}</span>
          </div>
          <h2 className="font-heading font-semibold text-white text-3xl md:text-[2.6rem] leading-[1.05] -tracking-[0.04em]" style={{ textWrap: "balance" } as Record<string, string>}>
            {title}
          </h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease }} className="min-w-0 flex flex-col gap-6">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export const P = ({ children }: { children: ReactNode }) => <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">{children}</p>;

/** A desktop screenshot in a slim browser frame */
export function Browser({ src, alt, url, className = "" }: { src: string; alt: string; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[14px] md:rounded-[18px] border border-white/15 bg-[#0b0c0e] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-[#FF9AB0]" />
        <span className="w-2 h-2 rounded-full bg-[#FFC48A]" />
        <span className="w-2 h-2 rounded-full bg-[#8FB0FF]" />
        {url && <span className="ml-3 truncate font-mono text-[10px] text-white/40">{url}</span>}
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  );
}
