"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/Button";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-cream px-6 py-24 text-center">
      <div className="mx-auto max-w-xl">
        <p className="font-label text-xs tracking-wide3 uppercase text-gold-dark">
          Order Confirmed
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-espresso">
          Thanks For Building With Us
        </h1>
        <p className="mt-8 font-body text-base text-taupe">
          Your order has been placed. A confirmation email will be sent shortly.
        </p>
        <ButtonLink href="/shop" className="mt-10 inline-flex">
          Continue Shopping
        </ButtonLink>
      </div>
    </section>
  );
}
