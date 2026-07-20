import clsx from "clsx";

interface VintageBadgeProps {
  label: string;
  className?: string;
  serif?: boolean;
}

export function VintageBadge({ label, className = "", serif = false }: VintageBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full border border-gold uppercase text-gold",
        serif
          ? "px-3 py-1 font-subhead text-xs tracking-wide2"
          : "px-4 py-1.5 font-label text-[10px] tracking-wide3",
        className
      )}
    >
      {label}
    </span>
  );
}
