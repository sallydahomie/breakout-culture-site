export function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto h-px w-40 bg-gradient-to-r from-transparent via-gold/70 to-transparent ${className}`}
    />
  );
}
