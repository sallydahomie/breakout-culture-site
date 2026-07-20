"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { PriceTag } from "@/components/PriceTag";
import { useCart } from "@/lib/cart-context";
import { Product, ProductSize } from "@/types/product";

export function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size,
      quantity,
    });
    setAdded(true);
  }

  return (
    <div>
      <div>
        <p className="mb-2 font-label text-xs tracking-wide2 uppercase text-cream/60">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={clsx(
                "focus-gold border px-4 py-2 font-label text-xs tracking-wide2 uppercase transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0",
                size === s
                  ? "border-gold bg-gold text-espresso"
                  : "border-cream/30 text-cream/80 hover:border-gold hover:text-gold"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 font-label text-xs tracking-wide2 uppercase text-cream/60">
          Quantity
        </p>
        <div className="flex items-center gap-4 border border-cream/30 px-4 py-2 w-fit">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="focus-gold font-label text-lg text-cream/80 transition-colors duration-200 hover:text-gold"
          >
            −
          </button>
          <span className="font-body w-6 text-center text-cream">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="focus-gold font-label text-lg text-cream/80 transition-colors duration-200 hover:text-gold"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button onClick={handleAddToCart}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "added" : "add"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="inline-block"
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </motion.span>
          </AnimatePresence>
        </Button>
        <AnimatePresence>
          {added && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button variant="secondary" onClick={() => router.push("/cart")}>
                View Cart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile-only sticky checkout bar — keeps price/CTA reachable without
          scrolling back up past the gallery and Why Buy/Shipping copy. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gold/20 bg-espresso/95 px-6 py-4 backdrop-blur-sm md:hidden">
        <div>
          <p className="font-label text-[10px] uppercase tracking-wide2 text-cream/60">
            Size {size}
          </p>
          <PriceTag price={product.price} dark size="sm" />
        </div>
        <Button onClick={handleAddToCart} className="flex-1 max-w-[220px]">
          {added ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
