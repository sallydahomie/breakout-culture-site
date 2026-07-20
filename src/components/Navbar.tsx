"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-espresso text-cream shadow-warm">
      <p className="bg-espresso px-4 py-2 text-center font-body text-[12px] uppercase tracking-[1.5px] text-gold sm:text-[13px]">
        Free Shipping + 22% Off · Launch Celebration Sale
      </p>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus-gold font-display text-xl font-semibold tracking-wide transition-colors duration-300 hover:text-gold-light"
        >
          BREAKOUT <span className="text-gold">CULTURE</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-gold group relative py-1 font-body text-lg tracking-[0.8px] text-cream/90 transition-colors duration-300 hover:text-gold"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/cart"
            className="focus-gold group relative py-1 font-body text-lg tracking-[0.8px] text-cream/90 transition-colors duration-300 hover:text-gold"
          >
            Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        </nav>

        <button
          className="focus-gold -m-2 p-2 text-cream transition-colors duration-300 hover:text-gold md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="font-label text-xs tracking-wide2 uppercase">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-1 overflow-hidden border-t border-gold/20 px-6 pb-2 pt-2 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-gold py-3 font-body text-lg tracking-[0.8px] text-cream/90 transition-colors duration-300 hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="focus-gold py-3 font-body text-lg tracking-[0.8px] text-cream/90 transition-colors duration-300 hover:text-gold"
              onClick={() => setOpen(false)}
            >
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
