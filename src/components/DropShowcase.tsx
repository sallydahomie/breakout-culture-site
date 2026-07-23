"use client";

import { ButtonLink } from "@/components/Button";
import { PriceTag } from "@/components/PriceTag";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const revealItems = [
  {
    key: "label",
    delay: 0,
    duration: 0.4,
    content: (
      <p className="font-body text-[11px] tracking-[2px] uppercase text-gold">
        VOLATILE //001
      </p>
    ),
  },
  {
    key: "headline",
    delay: 0.1,
    duration: 0.4,
    content: (
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
        ANTI 9-5 Club Hoodie | Statement
      </h2>
    ),
  },
  {
    key: "price",
    delay: 0.2,
    duration: 0.4,
    content: (
      <div className="mt-4 flex flex-col items-center">
        <div className="flex flex-wrap items-baseline justify-center gap-3">
          <PriceTag price={65.99} dark size="lg" />
          <span className="font-body text-lg text-cream/40 line-through">
            $89.99
          </span>
        </div>
        <p className="mt-2 font-body text-xs tracking-[1.5px] uppercase text-gold/90">
          27% Off &middot; Launch Celebration Sale &middot; Ends In 10 Days
        </p>
      </div>
    ),
  },
  {
    key: "description",
    delay: 0.3,
    duration: 0.4,
    content: (
      <>
        <p className="mt-6 max-w-md font-body text-[15px] font-normal leading-[1.6] tracking-[0.3px] text-cream">
          Two hundred of each print. Front and back, one run, no restocks.
          Heavyweight cotton-blend built for the ones who left the default path
          behind.
        </p>
        <p className="mt-3 max-w-md font-body text-[15px] leading-[1.6] text-gold">
          <span className="font-semibold">Free Shipping</span> included
        </p>
      </>
    ),
  },
  {
    key: "cta",
    delay: 0.4,
    duration: 0.4,
    content: (
      <ButtonLink href="/shop" className="mt-10 w-fit">
        View The Full Catalogue
      </ButtonLink>
    ),
  },
];

export function DropShowcase() {
  return (
    <section className="bg-espresso px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        {revealItems.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: item.duration, delay: item.delay, ease: EASE }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
