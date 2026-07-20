"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { ButtonLink } from "@/components/Button";
import { getProductBySlug } from "@/lib/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="bg-espresso px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-cream sm:text-5xl">
          Your Cart Is Empty
        </h1>
        <p className="mt-4 font-body text-cream/70">
          Nothing here yet. Browse the drop.
        </p>
        <ButtonLink href="/shop" className="mt-8 inline-flex">
          Shop the Drop
        </ButtonLink>
      </section>
    );
  }

  return (
    <section className="bg-espresso px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-cream sm:text-5xl">
          Your Cart
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Items */}
          <div className="space-y-6 md:col-span-2">
            {items.map((item) => (
              <div
                key={`${item.slug}-${item.size}`}
                className="flex items-center justify-between border-b border-cream/15 pb-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-espresso-light">
                    {getProductBySlug(item.slug)?.images[0] && (
                      <Image
                        src={getProductBySlug(item.slug)!.images[0]}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-display text-lg text-cream">{item.name}</p>
                    <p className="font-label text-xs uppercase tracking-wide2 text-cream/60">
                      Size {item.size}
                    </p>
                    <div className="mt-2 flex items-center gap-3 border border-cream/25 px-3 py-1 w-fit">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(item.slug, item.size, item.quantity - 1)
                        }
                        className="focus-gold text-cream/60 transition-colors duration-200 hover:text-gold"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-body text-sm text-cream">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.slug, item.size, item.quantity + 1)
                        }
                        className="focus-gold text-cream/60 transition-colors duration-200 hover:text-gold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-subhead text-lg text-gold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.slug, item.size)}
                    className="focus-gold mt-2 font-label text-[10px] uppercase tracking-wide2 text-cream/60 transition-colors duration-200 hover:text-gold-light"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit border border-cream/15 bg-espresso-light p-6">
            <h2 className="font-display text-xl font-semibold text-cream">
              Order Summary
            </h2>
            <div className="mt-6 flex justify-between font-body text-cream/70">
              <span>Subtotal</span>
              <span className="text-cream">${subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-2 font-body text-xs text-cream/50">
              Shipping and taxes calculated at checkout.
            </p>
            <ButtonLink href="/checkout" className="mt-8 w-full">
              Proceed to Checkout
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
