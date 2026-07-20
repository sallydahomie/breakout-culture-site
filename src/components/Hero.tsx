"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShimmerButtonLink } from "@/components/ShimmerButtonLink";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import { VintageBadge } from "@/components/VintageBadge";

const HoodieHero3D = dynamic(
  () => import("@/components/HoodieHero3D").then((mod) => mod.HoodieHero3D),
  { ssr: false }
);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { scrollY } = useScroll();
  const [scrollDistance, setScrollDistance] = useState(500);

  useEffect(() => {
    function updateDistance() {
      setScrollDistance(window.innerWidth < 640 ? 320 : 500);
    }
    updateDistance();
    window.addEventListener("resize", updateDistance);
    return () => window.removeEventListener("resize", updateDistance);
  }, []);

  const rotation = useTransform(scrollY, (latest) => {
    const clamped = Math.min(Math.max(latest, 0), scrollDistance);
    return (clamped / scrollDistance) * Math.PI * 2;
  });

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-espresso px-6 py-24 sm:py-32">
      <BackgroundBeams />

      <div className="absolute inset-0">
        <HoodieHero3D rotation={rotation} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={item} className="mb-8">
          <VintageBadge label="Est. 2026" />
        </motion.div>
        <motion.h1
          variants={item}
          className="font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-cream sm:text-6xl"
        >
          For The Ones Who Refused <span className="gold-foil-text">The Default Path.</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 font-subhead text-xl leading-[1.6] text-cream/80 sm:text-2xl"
        >
          Premium streetwear for young entrepreneurs building freedom outside the 9
          to 5, the classroom, and the ordinary script.
        </motion.p>
        <motion.div
          variants={item}
          className="mt-10 flex w-full max-w-xs flex-col items-stretch gap-5 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-6"
        >
          <ShimmerButtonLink href="/shop" className="w-full sm:w-auto">
            Shop Drop 01
          </ShimmerButtonLink>
          <ShimmerButtonLink href="/about" variant="secondary" className="w-full sm:w-auto">
            Read Our Story
          </ShimmerButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
