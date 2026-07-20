"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { PriceTag } from "@/components/PriceTag";
import { shopItems, ShopCategory, ShopItem } from "@/lib/shopItems";

const filters: Array<{ label: string; value: "All" | ShopCategory }> = [
  { label: "All", value: "All" },
  { label: "Hoodies", value: "Hoodies" },
  { label: "Tees", value: "Tees" },
  { label: "Caps", value: "Caps" },
];

export function ShopGrid() {
  const [active, setActive] = useState<"All" | ShopCategory>("All");

  const visible = shopItems.filter(
    (item) => active === "All" || item.category === active
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter products by category"
        className="flex flex-wrap items-center justify-center gap-3 px-6 pb-16"
      >
        {filters.map((filter) => {
          const isActive = active === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={clsx(
                "focus-gold rounded-full border px-6 py-2 font-subhead text-base tracking-wide transition-colors duration-300",
                isActive
                  ? "border-gold bg-gold text-espresso"
                  : "border-gold/60 text-gold hover:border-gold hover:bg-gold/10"
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {visible.map((item, i) => (
          <ShopItemCard key={item.id} item={item} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}

function SalePriceBlock({ item, badge = true }: { item: ShopItem; badge?: boolean }) {
  return (
    <div className="mt-2 flex flex-col items-center">
      <div className="flex items-baseline gap-2">
        <PriceTag price={item.price!} size="md" />
        {item.originalPrice && (
          <span className="font-body text-sm text-taupe/60 line-through">
            ${item.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      {badge && item.originalPrice && (
        <span className="mt-1.5 inline-flex items-center rounded-full border border-gold-dark/40 px-2.5 py-0.5 font-body text-[10px] tracking-[1.5px] uppercase text-gold-dark">
          22% Off
        </span>
      )}
    </div>
  );
}

const ViewProductArrow = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
    <path
      d="M0.5 5H13M13 5L9 1M13 5L9 9"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function NotifyForm({ productName }: { productName: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag: productName }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-4 font-label text-xs tracking-wide2 uppercase text-gold-dark">
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex w-full max-w-xs flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label={`Email address for ${productName} restock notifications`}
        className="focus-gold w-full border border-espresso/25 bg-transparent px-3 py-2 font-body text-sm text-espresso placeholder:text-taupe/50 outline-none transition-colors duration-200 focus:border-gold"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="focus-gold shrink-0 gold-foil-bg px-4 py-2 font-body text-xs tracking-[1.25px] uppercase text-espresso shadow-warm transition-[filter] duration-300 hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Notify Me!"}
      </button>
      {status === "error" && (
        <p className="font-body text-xs text-burgundy sm:basis-full">{error}</p>
      )}
    </form>
  );
}

function ComingSoonCard({ item, delay }: { item: ShopItem; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full min-h-[420px] flex-col rounded-lg border border-espresso/10 bg-cream p-6 shadow-warm sm:min-h-[460px]"
    >
      <div className="flex aspect-[4/5] items-center justify-center rounded-md bg-espresso/10">
        <span className="font-label text-xs tracking-wide3 uppercase text-taupe">
          Coming Soon
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center text-center">
        <h3 className="font-display text-xl font-semibold text-espresso">
          {item.name}
        </h3>
        <span className="mt-2 font-subhead text-lg text-taupe/50">TBD</span>
        <span className="mt-3 font-label text-[11px] tracking-wide3 uppercase text-gold-dark">
          {item.label}
        </span>

        <p className="mt-4 font-body text-sm leading-relaxed text-taupe">
          {item.description}
        </p>
        <p className="mt-2 font-body text-sm leading-relaxed text-gold-dark">
          <span className="font-semibold">Free Shipping</span> included
        </p>

        <NotifyForm productName={item.name} />
      </div>
    </motion.div>
  );
}

function HoodieFlipCard({ item, delay }: { item: ShopItem; delay: number }) {
  const faceClass =
    "absolute inset-0 flex h-full flex-col rounded-lg border bg-cream p-6 [backface-visibility:hidden]";

  const flipCard = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full min-h-[420px] [perspective:1400px] sm:min-h-[460px]"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={false}
        whileHover={{ rotateY: 180 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
      >
        {/* Front face */}
        <div className={clsx(faceClass, "border-espresso/10 shadow-warm")}>
          {item.image ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 16vw, 40vw"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center rounded-md bg-espresso/10">
              <span className="font-label text-xs tracking-wide3 uppercase text-taupe">
                Coming Soon
              </span>
            </div>
          )}

          <div className="mt-6 flex flex-1 flex-col items-center justify-end text-center">
            <h3 className="font-display text-xl font-semibold text-espresso">
              {item.name}
            </h3>

            <SalePriceBlock item={item} />

            <span className="mt-3 font-label text-[11px] tracking-wide3 uppercase text-gold-dark">
              {item.label}
            </span>
          </div>
        </div>

        {/* Back face */}
        <div
          className={clsx(
            faceClass,
            "[transform:rotateY(180deg)] items-center justify-center border-gold/40 text-center shadow-gold-glow"
          )}
        >
          <h3 className="font-display text-xl font-semibold text-espresso">
            {item.name}
          </h3>

          <SalePriceBlock item={item} badge={false} />

          <p className="mt-4 font-body text-sm leading-relaxed text-taupe">
            {item.description}
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-gold-dark">
            <span className="font-semibold">Free Shipping</span> included
          </p>

          <span className="mt-6 inline-flex items-center gap-1.5 font-subhead text-sm uppercase tracking-wide2 text-gold-dark">
            View Product
            <ViewProductArrow />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="focus-gold block h-full">
        {flipCard}
      </Link>
    );
  }

  return flipCard;
}

function ShopItemCard({ item, delay }: { item: ShopItem; delay: number }) {
  if (item.status === "available") {
    return <HoodieFlipCard item={item} delay={delay} />;
  }
  return <ComingSoonCard item={item} delay={delay} />;
}
