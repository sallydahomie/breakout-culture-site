"use client";

import { useState } from "react";
import clsx from "clsx";
import { useCart } from "@/lib/cart-context";
import { Button, ButtonLink } from "@/components/Button";

type Step = "shipping" | "review";

interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

const emptyShipping: ShippingInfo = {
  name: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState<ShippingInfo>(emptyShipping);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <section className="bg-cream px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-espresso">
          Your Cart Is Empty
        </h1>
        <ButtonLink href="/shop" className="mt-8 inline-flex">
          Shop the Drop
        </ButtonLink>
      </section>
    );
  }

  function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("review");
  }

  async function handlePayment() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
          })),
          origin: window.location.origin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong starting checkout.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Could not reach checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center font-display text-3xl font-semibold tracking-[-0.02em] text-espresso sm:text-4xl">
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="mt-8 flex justify-center gap-6 font-label text-xs uppercase tracking-wide2">
          <span className={clsx(step === "shipping" ? "text-gold-dark" : "text-taupe")}>
            1. Shipping
          </span>
          <span className={clsx(step === "review" ? "text-gold-dark" : "text-taupe")}>
            2. Payment
          </span>
          <span className="text-taupe">3. Confirmation</span>
        </div>

        {step === "shipping" && (
          <form onSubmit={handleShippingSubmit} className="mt-10 space-y-5">
            <Field
              label="Full Name"
              value={shipping.name}
              onChange={(v) => setShipping((s) => ({ ...s, name: v }))}
              required
            />
            <Field
              label="Email"
              type="email"
              value={shipping.email}
              onChange={(v) => setShipping((s) => ({ ...s, email: v }))}
              required
            />
            <Field
              label="Address"
              value={shipping.address}
              onChange={(v) => setShipping((s) => ({ ...s, address: v }))}
              required
            />
            <div className="grid grid-cols-2 gap-5">
              <Field
                label="City"
                value={shipping.city}
                onChange={(v) => setShipping((s) => ({ ...s, city: v }))}
                required
              />
              <Field
                label="Postal Code"
                value={shipping.postalCode}
                onChange={(v) => setShipping((s) => ({ ...s, postalCode: v }))}
                required
              />
            </div>
            <Button type="submit" className="mt-4 w-full">
              Continue to Payment
            </Button>
          </form>
        )}

        {step === "review" && (
          <div className="mt-10">
            <div className="border border-taupe/20 bg-cream-dark p-6">
              <h2 className="font-display text-xl font-semibold text-espresso">
                Order Summary
              </h2>
              <div className="mt-4 space-y-2 font-body text-sm text-taupe">
                {items.map((item) => (
                  <div
                    key={`${item.slug}-${item.size}`}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} ({item.size}) x{item.quantity}
                    </span>
                    <span className="text-espresso">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between border-t border-taupe/20 pt-4 font-subhead text-lg text-gold-dark">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-2 font-body text-xs text-taupe/70">
                Shipping to {shipping.address}, {shipping.city} {shipping.postalCode}
              </p>
            </div>

            <p className="mt-6 text-center font-body text-sm text-taupe">
              Payment is completed securely on Stripe&apos;s hosted checkout page.
            </p>

            {error && (
              <p className="mt-4 text-center font-body text-sm text-burgundy">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Button
                variant="secondary"
                className="sm:w-1/3"
                onClick={() => setStep("shipping")}
                disabled={loading}
              >
                Back
              </Button>
              <Button className="sm:w-2/3" onClick={handlePayment} disabled={loading}>
                {loading ? "Redirecting..." : "Pay with Stripe"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-xs uppercase tracking-wide2 text-taupe">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-taupe/30 bg-cream px-4 py-3 font-body text-espresso outline-none transition-[border-color,box-shadow] duration-200 focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,97,0.15)]"
      />
    </label>
  );
}
