import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";

export function ShopGrid() {
  return (
    <div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-10 px-6 pb-24 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} fill />
        ))}
      </div>

      <OrnamentalDivider />

      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="font-subhead text-lg tracking-wide2 text-gold sm:text-xl">
          DROP 02
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream sm:text-4xl">
          Coming Soon
        </h2>
      </div>
    </div>
  );
}
