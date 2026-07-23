import { ShopGrid } from "@/components/ShopGrid";

export const metadata = {
  title: "Shop the Drop",
  description:
    "Shop the first BREAKOUT CULTURE drop: premium heavyweight hoodies built for founders, solopreneurs, and creators.",
};

export default function ShopPage() {
  return (
    <div className="bg-espresso">
      <section className="px-6 pb-10 pt-20 text-center sm:pt-28">
        <p className="font-subhead text-lg tracking-wide2 text-gold sm:text-xl">
          VOLATILE //001
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] text-cream sm:text-5xl">
          Numbered runs. No restocks.
        </h1>
      </section>

      <ShopGrid />
    </div>
  );
}
