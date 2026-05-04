import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Typewriter = ({
  text,
  delay = 0,
  speed = 50,
  showCursor = false,
  onComplete,
}: {
  text: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let i = 0;
    
    const timeout = setTimeout(() => {
      setIsTyping(true);
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span className="relative inline-block">
      {/* Hidden full text to preserve exact dimensions and prevent layout jumping */}
      <span className="opacity-0 pointer-events-none select-none">
        {text}
        {showCursor && (
          <span className="inline-block w-[0.08em] h-[0.85em] ml-[0.05em]" />
        )}
      </span>
      
      {/* Actual animated text */}
      <span className="absolute top-0 left-0 w-full h-full text-left">
        {displayedText}
        {showCursor && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block w-[0.08em] h-[0.85em] bg-white ml-[0.05em]"
            style={{ verticalAlign: "baseline" }}
          />
        )}
      </span>
    </span>
  );
};
