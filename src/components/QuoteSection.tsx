"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/lib/scrollAnimation";

export function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const state = isInView ? "show" : "hidden";

  return (
    <section className="bg-espresso px-6 pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div ref={ref} className="mx-auto max-w-2xl text-center">
        <motion.p
          initial="hidden"
          animate={state}
          variants={fadeUp(0)}
          className="font-subhead text-[24px] font-bold italic leading-[1.8] text-cream sm:text-[28px]"
        >
          &ldquo;I wore the ANTI 9-5 Club Hoodie | Statement the day I handed in my notice.
          My manager asked where to get one.&rdquo;
        </motion.p>
        <motion.p
          initial="hidden"
          animate={state}
          variants={fadeUp(0.1)}
          className="mt-6 font-body text-xs tracking-[1.5px] uppercase text-gold"
        >
          M. Okafor, Funded Trader, Ex-Account Manager
        </motion.p>
      </div>
    </section>
  );
}
