"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";
import { fadeUp } from "@/lib/scrollAnimation";

const faqs = [
  {
    question: "What sizes do you carry?",
    answer: "S through XXL on every product. Fit details are listed on each product page.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Free shipping on orders over $75. Orders ship within 3–5 business days. You'll receive tracking as soon as it's out the door.",
  },
  {
    question: "What's your return policy?",
    answer: "30-day returns, no questions asked, on unworn items in original condition.",
  },
  {
    question: "Is checkout secure?",
    answer: "Yes. Payments are processed securely through Stripe. Card details never touch our servers.",
  },
  {
    question: "Do you restock limited drops?",
    answer: "Limited Edition and Founder's Drop pieces are produced in small batches and typically do not restock.",
  },
];

const STEP = 0.1;
const ANSWER_OFFSET = 0.05;
const HEADLINE_DELAY = 0;
const LIST_START = 0.2;

export function FaqContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const state = isInView ? "show" : "hidden";

  return (
    <section className="bg-espresso px-6 py-20">
      <div ref={ref} className="mx-auto max-w-2xl">
        <motion.h1
          initial="hidden"
          animate={state}
          variants={fadeUp(HEADLINE_DELAY)}
          className="text-center font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl"
        >
          FAQ
        </motion.h1>

        <div className="mt-14">
          {faqs.map((faq, i) => {
            const questionDelay = LIST_START + i * STEP;
            return (
              <div
                key={faq.question}
                className={clsx("py-6", i > 0 && "border-t border-gold/20")}
              >
                <motion.h2
                  initial="hidden"
                  animate={state}
                  variants={fadeUp(questionDelay)}
                  className="font-display text-xl font-semibold text-cream"
                >
                  {faq.question}
                </motion.h2>
                <motion.p
                  initial="hidden"
                  animate={state}
                  variants={fadeUp(questionDelay + ANSWER_OFFSET)}
                  className="mt-2 font-body text-base leading-[1.7] text-cream/75"
                >
                  {faq.answer}
                </motion.p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
