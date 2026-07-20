"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ButtonLink } from "@/components/Button";
import { PriceTag } from "@/components/PriceTag";
import { Product } from "@/types/product";
import { fadeUp } from "@/lib/scrollAnimation";

export function ProductShowcase({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const state = isInView ? "show" : "hidden";

  return (
    <section className="bg-espresso">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          animate={state}
          variants={fadeUp(0)}
          className="flex items-center justify-center bg-espresso p-6 sm:p-16"
        >
          <div className="relative aspect-[4/5] w-full max-w-md sm:aspect-[3/4]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={state}
          variants={fadeUp(0.1)}
          className="flex flex-col items-center justify-center px-6 py-10 text-center sm:px-12 sm:py-24"
        >
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            {product.name}
          </h2>
          <PriceTag price={product.price} dark size="lg" className="mt-4 block" />
          <p className="mt-6 max-w-md font-body text-base font-normal leading-[1.8] tracking-[0.3px] text-cream">
            {product.description}
          </p>
          <p className="mt-4 font-body text-[13px] font-medium uppercase tracking-[1px] text-cream">
            80/20 cotton-poly blend &middot; 14oz heavyweight
          </p>
          <ButtonLink href={`/product/${product.slug}`} className="mt-10 w-fit">
            View Product
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
