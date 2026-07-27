import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SpotifyCoverflow = ({ tracks }: { tracks: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progressValue = useMotionValue(0);
  const progress = useSpring(progressValue, { stiffness: 70, damping: 20 });

  useEffect(() => {
    progressValue.set(activeIndex);
  }, [activeIndex, progressValue]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tracks.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(interval);
  }, [isHovered, tracks.length]);

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      setActiveIndex((prev) => Math.min(tracks.length - 1, prev + 1));
    } else if (swipe > 50) {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <motion.div 
      className="w-full flex flex-col items-center cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
    >
      <div
        className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center [perspective:1500px] [transform-style:preserve-3d] mt-8"
      >
        {tracks.map((id, i) => {
          const distance = useTransform(progress, (p) => p - i);
          
          const x = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [800, 500, 240, 0, -240, -500, -800]);
          const xMobile = useTransform(distance, [-2, -1, 0, 1, 2], [300, 150, 0, -150, -300]);
          const scale = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [0.5, 0.65, 0.85, 1, 0.85, 0.65, 0.5]);
          const opacity = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [0, 0.1, 0.5, 1, 0.5, 0.1, 0]);
          const rotateY = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [-50, -35, -20, 0, 20, 35, 50]);
          const z = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [-600, -350, -150, 0, -150, -350, -600]);
          const zIndex = useTransform(distance, (d) => 20 - Math.abs(Math.round(d)));

          return (
            <motion.div
              key={i}
              style={{
                x: typeof window !== "undefined" && window.innerWidth < 768 ? xMobile : x,
                scale,
                opacity,
                rotateY,
                z,
                zIndex,
              }}
              className="absolute top-1/2 left-1/2 -mt-[176px] -ml-[130px] md:-ml-[150px] w-[260px] md:w-[300px] h-[352px]"
            >
              <div className="w-full h-full relative rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.03)] bg-transparent">
                <iframe 
                  style={{ borderRadius: "12px", background: "transparent" }}
                  src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
                {/* Overlay for clicking inactive items to bring them to front */}
                {activeIndex !== i && (
                  <div 
                    className="absolute inset-0 z-20 cursor-pointer bg-transparent" 
                    onClick={() => setActiveIndex(i)} 
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="w-full max-w-3xl mx-auto mt-6 px-4 relative z-30 flex items-center justify-center gap-2 sm:gap-4">
        <button
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none flex-shrink-0"
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A0A0A] dark:text-white" />
        </button>

        <div className="flex gap-1 sm:gap-1.5 justify-center flex-nowrap overflow-visible">
          {tracks.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setActiveIndex(i)}
              className="group py-2 px-0 sm:px-0.5 focus:outline-none flex-shrink-0"
              aria-label={`Go to track ${i + 1}`}
            >
              <div
                className={`rounded-full transition-all duration-400 h-1 sm:h-1.5 ${
                  activeIndex === i
                    ? "w-3 sm:w-5 bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(51,141,255,0.5)]"
                    : "w-1 sm:w-1.5 bg-black/15 dark:bg-white/15 group-hover:bg-black/30 dark:group-hover:bg-white/30 group-hover:w-2 sm:group-hover:w-2.5"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveIndex(Math.min(tracks.length - 1, activeIndex + 1))}
          className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          disabled={activeIndex === tracks.length - 1}
        >
          <ChevronRight className="w-5 h-5 text-[#0A0A0A] dark:text-white" />
        </button>
      </div>
    </motion.div>
  );
};
