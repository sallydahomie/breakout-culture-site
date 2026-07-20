"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VintageBadge } from "@/components/VintageBadge";
import { fadeUp } from "@/lib/scrollAnimation";

const paragraphs = [
  "Breakout Culture was built for people who know they were made for more. It is for the young entrepreneurs, traders, creators, and risk takers who refuse to believe that life only has one path.",
  "College. A nine to five. A paycheck. A life spent building someone else's dream.",
  "I started trading during my freshman year of high school. For two years, I studied strategies, watched videos, took trades, and tried to make it work, but I made almost no progress.",
  "Eventually, I walked away for an entire year. I thought I was finished. I thought trading was not for me.",
  "At the same time, I was working at Publix. I started during my sophomore year and stayed for three years.",
  "I hated it. Not because working was beneath me, but because I knew I was not getting anywhere.",
  "Every shift felt like another day spent working toward someone else's goals, someone else's business, and someone else's dream. I was earning a paycheck, but I did not feel like I was building a life.",
  "Two months before my senior year ended, I opened the charts again. There was no big plan or dramatic moment. I simply decided to give trading another shot.",
  "This time, I switched from Forex to futures. I tried a new strategy, took one simulated trade, and made $200.",
  "The money was fake, but the realization was not. For the first time, I saw what was possible.",
  "It felt like I had looked behind the curtain and caught a glimpse of the life I had been chasing. That was the moment I decided to go all in.",
  "I backtested the strategy for two weeks and bought my first evaluation account. It took me one month to pass.",
  "During that month, I learned that trading was not only about finding good entries. It was about risk management, patience, discipline, and psychology.",
  "I had to learn how to lose without falling apart and how to win without becoming reckless.",
  "I passed the account and made it to the final day before my first payout. Then I took one bad trade.",
  "That loss turned into another, and then another. I revenge traded until the entire account was gone.",
  "I was furious, but I was not finished.",
  "I bought another account and passed it in one week. Within three months of returning to trading, I received my first $1,500 payout.",
  "Then came another payout. By the time I had earned $4,000 from trading, I had already made what Publix paid me in an entire year.",
  "I had made it in less than six months, so I quit.",
  "Walking away from that job was one of the happiest moments of my life. For the first time, I felt free.",
  "I was free to control my time, free to focus completely on trading, and free to build something that actually belonged to me.",
  "In less than six months, I generated over $10,000 in gross trading profit. Not because I was special, and not because I got lucky.",
  "I did it because I came back. I learned from failure instead of letting it define me, and I stopped waiting for permission to take control of my life.",
  "That is what Breakout Culture represents.",
  "It is about breaking out of fear, breaking out of limitations, and breaking out of the life you were told you had to live.",
  "This brand is not about pretending success is easy. It is about proving that failure does not disqualify you.",
  "You can lose, doubt yourself, walk away, and feel completely stuck. You can still come back stronger.",
  "You do not need to be chosen. You do not need permission, and you do not need to have everything figured out.",
  "You only need to decide that the life you are living is no longer enough.",
  "Break the pattern. Build your future. Become undeniable.",
  "Welcome to Breakout Culture.",
];

const STEP = 0.1;
const LABEL_DELAY = 0;
const HEADLINE_DELAY = 0.2;
const PARAGRAPHS_START = HEADLINE_DELAY + STEP;

export function AboutContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const state = isInView ? "show" : "hidden";

  return (
    <section className="bg-espresso px-6 py-24">
      <div ref={ref} className="relative mx-auto max-w-2xl text-center">
        <VintageBadge label="Est. 2026" className="mb-6" />
        <motion.p
          initial="hidden"
          animate={state}
          variants={fadeUp(LABEL_DELAY)}
          className="font-label text-xs tracking-wide3 uppercase text-gold"
        >
          Our Mission
        </motion.p>
        <motion.h1
          initial="hidden"
          animate={state}
          variants={fadeUp(HEADLINE_DELAY)}
          className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl"
        >
          I Made Nothing for Two Years. I Came Back Anyway.
        </motion.h1>

        <div className="mt-8 space-y-6 text-left font-body text-base leading-[1.7] text-cream/75">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial="hidden"
              animate={state}
              variants={fadeUp(PARAGRAPHS_START + i * STEP)}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
