"use client";

import { motion, useReducedMotion } from "framer-motion";

const beams = [
  { top: "8%", width: "150%", rotate: -10, duration: 24, delay: 0, opacity: 0.09 },
  { top: "42%", width: "170%", rotate: -7, duration: 30, delay: 4, opacity: 0.06 },
  { top: "78%", width: "160%", rotate: -13, duration: 26, delay: 8, opacity: 0.08 },
];

export function BackgroundBeams() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute left-[-25%] h-px"
          style={{
            top: beam.top,
            width: beam.width,
            rotate: beam.rotate,
            opacity: beam.opacity,
            filter: "blur(1px)",
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,97,0.6), transparent)",
          }}
          animate={reduceMotion ? undefined : { x: ["-8%", "8%", "-8%"] }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
