"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { PriceTag } from "@/components/PriceTag";
import { VintageBadge } from "@/components/VintageBadge";

const MotionLink = motion.create(Link);

export function ProductCard({ product }: { product: Product }) {
  return (
    <MotionLink
      href={`/product/${product.slug}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", duration: 0.3, bounce: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className="focus-gold group relative block overflow-hidden rounded-lg bg-espresso p-[50px] transition-shadow duration-300 hover:shadow-gold-glow lg:mx-auto lg:max-w-[550px]"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-espresso">
        {product.badge && (
          <VintageBadge
            label={product.badge}
            serif
            className="absolute right-3 top-3 z-10 bg-cream shadow-warm"
          />
        )}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-contain p-[30px] transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-[25px] text-center">
        <h3 className="font-display text-xl font-semibold text-cream">
          {product.name}
        </h3>
        <PriceTag price={product.price} dark size="sm" className="mt-2.5 block" />
        <span className="mt-[15px] inline-flex items-center gap-1.5 font-subhead text-sm uppercase tracking-wide2 text-gold transition-colors duration-200 group-hover:underline group-hover:underline-offset-4">
          View Product
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0.5 5H13M13 5L9 1M13 5L9 9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </MotionLink>
  );
}
