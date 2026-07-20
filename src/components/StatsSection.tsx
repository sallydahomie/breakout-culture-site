"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/lib/scrollAnimation";

const stats = [
  { value: "18", label: "Months Before The First Dollar" },
  { value: "$1,500", label: "The First Internet Money" },
  { value: "4", label: "Months From $1.5K To $10K" },
  { value: "0", label: "Hours Clocked For Someone Else" },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const state = isInView ? "show" : "hidden";

  return (
    <section className="bg-espresso px-6 pb-24 pt-16 sm:pb-32 sm:pt-20">
      <div className="overflow-x-auto">
        <div
          ref={ref}
          className="mx-auto grid w-max max-w-none grid-cols-[repeat(4,minmax(150px,1fr))] gap-x-10 text-center sm:w-full sm:max-w-5xl sm:gap-x-16 lg:gap-x-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              animate={state}
              variants={fadeUp(i * 0.1)}
              className={i > 0 ? "border-l border-gold/40 pl-6" : undefined}
            >
              <p className="font-display text-[48px] font-bold text-gold sm:text-[64px]">
                {stat.value}
              </p>
              <p className="mx-auto mt-3 max-w-[14ch] font-body text-[11px] leading-[1.4] tracking-[2px] uppercase text-cream">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
