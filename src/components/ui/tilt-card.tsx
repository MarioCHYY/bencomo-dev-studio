import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Max rotation in degrees */
  max?: number;
  /** Show the light that follows the cursor */
  spotlight?: boolean;
  /** Spotlight colour (any CSS colour) */
  spotColor?: string;
  /** Lift the card towards the viewer on hover (px) */
  lift?: number;
}

/**
 * 3D tilt that follows the pointer, with a soft spotlight and a border glow.
 * Writes CSS variables only (no React re-renders). Off on touch screens and for reduced motion.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  spotlight = true,
  spotColor = "rgba(51,133,255,0.18)",
  lift = 14,
  style,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0, on = 0, con = 0;
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      con += (on - con) * 0.12;
      el.style.setProperty("--rx", `${(-cy * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(cx * max).toFixed(2)}deg`);
      el.style.setProperty("--lift", `${(con * lift).toFixed(1)}px`);
      el.style.setProperty("--spot-o", con.toFixed(3));
      if (Math.abs(tx - cx) + Math.abs(ty - cy) + Math.abs(on - con) > 0.002) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      tx = px * 2 - 1;
      ty = py * 2 - 1;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      on = 1;
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      on = 0;
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [max, lift]);

  return (
    <div
      ref={ref}
      className={cn("relative [transform-style:preserve-3d] will-change-transform", className)}
      style={{
        transform: "perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(var(--lift,0px))",
        ...style,
      }}
      {...rest}
    >
      {children}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30"
          style={{
            opacity: "var(--spot-o,0)",
            background: `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ${spotColor}, transparent 60%)`,
          }}
        />
      )}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30"
          style={{
            opacity: "var(--spot-o,0)",
            padding: 1,
            background: `radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(120,170,255,0.9), transparent 65%)`,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
    </div>
  );
}

export default TiltCard;
