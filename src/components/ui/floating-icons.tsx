import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Interface for the props of each individual icon.
export interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string; // Used for custom positioning of the icon.
}

// Interface for the main component's props.
export interface FloatingIconsProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: IconProps[];
  className?: string;
}

// A single icon: repelled by the cursor, and floating at its own depth (parallax)
const Icon = ({
  mouseX,
  mouseY,
  px,
  py,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const depth = 0.4 + ((index * 37) % 10) / 10; // 0.4 – 1.3, stable per icon

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const parX = useTransform(px, (v) => v * 40 * depth);
  const parY = useTransform(py, (v) => v * 30 * depth);

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = mouseX.current - (rect.left + rect.width / 2);
      const dy = mouseY.current - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - distance / 150) * 50;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  const size = depth > 1 ? 'w-20 h-20 md:w-24 md:h-24' : depth > 0.7 ? 'w-16 h-16 md:w-20 md:h-20' : 'w-14 h-14 md:w-16 md:h-16';

  return (
    <motion.div
      ref={ref}
      style={{ x: parX, y: parY, opacity: 0.45 + depth * 0.45, filter: depth < 0.6 ? 'blur(1px)' : undefined }}
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn('absolute pointer-events-auto', iconData.className)}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <motion.div
          className={cn(
            'flex items-center justify-center p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 overflow-hidden cursor-crosshair hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300 shadow-[0_20px_50px_-24px_rgba(51,133,255,0.4)]',
            size,
          )}
          animate={{ y: [0, -10, 0, 10, 0], x: [0, 8, 0, -8, 0], rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6 + (index % 4), repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <iconData.icon className="w-1/2 h-1/2 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Button that leans towards the cursor
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block p-4 -m-4"
    >
      {children}
    </motion.div>
  );
};

const FloatingIconsSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);
  const px = useSpring(0, { stiffness: 60, damping: 20 });
  const py = useSpring(0, { stiffness: 60, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
    const r = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - r.left) / r.width - 0.5) * -2);
    py.set(((event.clientY - r.top) / r.height - 0.5) * -2);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('relative w-full min-h-[760px] flex items-center justify-center overflow-hidden', className)}
      {...props}
    >
      {/* 3D rings behind the title */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none" style={{ perspective: 1000 }}>
        <div className="relative w-[min(90vw,760px)] aspect-square" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(72deg)' }}>
          <div className="absolute inset-0 rounded-full border border-primary/25 animate-[spin_40s_linear_infinite] shadow-[0_0_60px_rgba(51,133,255,0.15)]" />
          <div className="absolute inset-[12%] rounded-full border border-dashed border-white/10 animate-[spin_26s_linear_infinite_reverse]" />
          <div className="absolute inset-[26%] rounded-full border border-white/[0.07] animate-[spin_18s_linear_infinite]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[320px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating icons */}
      <div className="absolute inset-0 z-20 w-full h-full max-w-7xl mx-auto pointer-events-none">
        {icons.map((iconData, index) => (
          <Icon key={iconData.id} mouseX={mouseX} mouseY={mouseY} px={px} py={py} iconData={iconData} index={index} />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pointer-events-none">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur text-[10px] font-mono tracking-[0.24em] uppercase text-primary pointer-events-auto"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(51,141,255,0.9)] animate-pulse" />
          Open to work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl -tracking-[0.03em] leading-[1.02] mb-6 pointer-events-auto text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#b9cbff] [filter:drop-shadow(0_0_30px_rgba(51,133,255,0.2))]"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 text-lg md:text-xl text-white/60 mx-auto max-w-2xl mb-12 pointer-events-auto font-light"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="pointer-events-auto"
        >
          <MagneticButton>
            <Button asChild size="lg" className="px-9 py-6 text-base md:text-lg font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-shadow duration-300 hover:shadow-[0_0_70px_rgba(59,130,246,0.6)]">
              <a href={ctaHref}>{ctaText} →</a>
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
});

FloatingIconsSection.displayName = 'FloatingIconsSection';

export { FloatingIconsSection };
