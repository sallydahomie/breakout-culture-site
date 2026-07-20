import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("text-center", className)}>
      {eyebrow && (
        <p
          className={clsx(
            "mb-3 font-label text-xs tracking-wide3 uppercase",
            dark ? "text-gold" : "text-gold-dark"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl",
          dark ? "text-cream" : "text-espresso"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
