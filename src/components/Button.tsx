"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

type Variant = "primary" | "secondary";

const baseClasses =
  "focus-gold inline-flex items-center justify-center px-8 py-3 font-body text-[13px] tracking-[1.25px] uppercase transition-[background-color,border-color,filter] duration-300";

const variantClasses: Record<Variant, string> = {
  primary: "gold-foil-bg text-espresso shadow-warm hover:brightness-110",
  secondary:
    "gold-foil-text border border-gold/70 hover:border-gold hover:bg-gold/[0.07] hover:underline hover:underline-offset-4",
};

const hoverMotion = {
  whileHover: { y: -3 },
  whileTap: { scale: 0.96 },
  transition: { type: "spring" as const, stiffness: 400, damping: 20 },
};

type MotionSafeButtonAttrs = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
>;

interface ButtonProps extends MotionSafeButtonAttrs {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      {...hoverMotion}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface ButtonLinkProps extends LinkProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

const MotionLink = motion.create(Link);

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <MotionLink
      {...hoverMotion}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
