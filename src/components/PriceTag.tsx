export function PriceTag({
  price,
  className = "",
  dark = false,
  size = "md",
}: {
  price: number;
  className?: string;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <span
      className={`font-body font-medium ${sizeClass} ${dark ? "text-gold" : "text-gold-dark"} ${className}`}
    >
      ${price.toFixed(2)}
    </span>
  );
}
