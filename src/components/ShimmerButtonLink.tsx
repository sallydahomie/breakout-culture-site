import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary";

const baseClasses =
  "focus-gold inline-flex items-center justify-center border px-7 py-3.5 font-body text-[13px] font-medium tracking-[0.1em] uppercase transition-[background-color,border-color,filter] duration-200";

const variantClasses: Record<Variant, string> = {
  primary: "gold-foil-bg border-transparent text-espresso hover:brightness-110",
  secondary: "gold-foil-text border-gold/25 hover:bg-gold/10",
};

interface ShimmerButtonLinkProps extends LinkProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ShimmerButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ShimmerButtonLinkProps) {
  return (
    <Link {...props} className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </Link>
  );
}
