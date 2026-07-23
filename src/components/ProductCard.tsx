"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Product } from "@/types/product";
import { PriceTag } from "@/components/PriceTag";

const MotionLink = motion.create(Link);

export function ProductCard({
  product,
  fill = false,
}: {
  product: Product;
  fill?: boolean;
}) {
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
      className={clsx(
        "focus-gold group relative flex h-full flex-col overflow-hidden rounded-lg bg-espresso p-[50px] transition-shadow duration-300 hover:shadow-gold-glow",
        !fill && "lg:mx-auto lg:max-w-[550px]"
      )}
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-espresso">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-contain p-[30px] transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-[25px] flex flex-1 flex-col items-center justify-between text-center">
        <div>
          <h3 className="font-display text-xl font-semibold text-cream">
            {product.name}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
            <PriceTag price={product.price} dark size="sm" />
            {product.originalPrice && (
              <>
                <span className="font-body text-sm text-cream/50 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="inline-flex items-center rounded-full border border-gold/40 px-2 py-0.5 font-body text-[10px] tracking-[1.5px] uppercase text-gold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                </span>
              </>
            )}
          </div>
        </div>
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
