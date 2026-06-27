import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Animated role text rotator.
 * Words slide in from the top (y: -40 → 0) and exit downward (y: 0 → 40).
 * AnimatePresence mode="wait" ensures one word is fully out before next enters.
 */
export function TextRotate({
  words,
  interval = 2500,
  className,
}: TextRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Extract text-gradient to be applied on the child to avoid browser text-clipping issues on animated parents
  const isGradient = className?.includes("text-gradient");
  const parentClass = className?.replace("text-gradient", "");

  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden align-bottom",
        "h-[1.2em] items-center",
        parentClass
      )}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
          }}
          className={cn(
            "inline-flex items-center whitespace-nowrap",
            isGradient ? "text-gradient" : ""
          )}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Re-export a default pre-wired to personal.roles for convenience
export function RolesTextRotate({ className }: { className?: string }) {
  return (
    <TextRotate
      words={personal.roles}
      interval={2500}
      className={className}
    />
  );
}
