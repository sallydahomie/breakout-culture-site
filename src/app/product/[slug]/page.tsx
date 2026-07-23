import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { PriceTag } from "@/components/PriceTag";
import { VintageBadge } from "@/components/VintageBadge";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartForm } from "@/components/AddToCartForm";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const related = products.filter((p) => p.slug !== product.slug);

  return (
    <div className="bg-espresso pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-6xl px-6 pt-10 font-label text-xs tracking-wide2 uppercase text-cream/60">
        <Link href="/" className="focus-gold transition-colors duration-200 hover:text-gold">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="focus-gold transition-colors duration-200 hover:text-gold">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-cream">{product.name}</span>
      </nav>

      {/* 45/55 split — both columns dark espresso now */}
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 md:grid-cols-[45%_55%]">
        <div className="bg-espresso px-6 md:px-0">
          <ProductImageCarousel images={product.images} productName={product.name} />
        </div>

        <div className="bg-espresso px-6 py-14 md:pl-12 md:pr-6">
          <div className="relative">
            {product.badge && <VintageBadge label={product.badge} serif className="mb-4" />}
            <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-cream sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-3 flex items-baseline gap-2">
              <PriceTag price={product.price} dark />
              {product.originalPrice && (
                <span className="font-body text-base text-cream/50 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="inline-flex items-center rounded-full border border-gold/40 px-2.5 py-0.5 font-body text-[10px] tracking-[1.5px] uppercase text-gold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                </span>
              )}
            </div>
            <p className="mt-5 whitespace-pre-line font-body text-base leading-[1.7] text-cream/75">
              {product.description}
            </p>
            <p className="mt-4 font-body text-base font-bold leading-[1.7] text-cream">
              80/20 cotton-poly blend · 14oz heavyweight
            </p>
            <p className="mt-3 font-body text-base leading-[1.7] text-gold">
              <span className="font-semibold">Free Shipping</span> included
            </p>

            <div className="mt-8">
              <AddToCartForm product={product} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* The Meaning Behind It */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-cream">
            The Meaning Behind It
          </h2>
          <p className="mt-6 whitespace-pre-line font-body text-base leading-[1.7] text-cream/75">
            {product.meaning}
          </p>
        </div>

        <OrnamentalDivider className="mt-20" />

        {/* Build To Last */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-cream">
            Build To Last.
          </h2>
          <ul className="mt-6 space-y-3 font-body text-base leading-[1.7] text-cream/75">
            {product.buildToLast.map((point) => (
              <li key={point}>&bull; {point}</li>
            ))}
          </ul>
        </div>

        <OrnamentalDivider className="mt-20" />

        {/* Risk Free */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-cream">
            Risk Free
          </h2>
          <p className="mt-6 whitespace-pre-line font-body text-base leading-[1.7] text-cream/75">
            Chase big dreams.{"\n\n"}Your hoodie shouldn&apos;t be the risky part.
          </p>
          <ul className="mt-6 space-y-3 font-body text-base leading-[1.7] text-cream/75">
            <li>&#10003; Free shipping over $75</li>
            <li>&#10003; Ships in 3&ndash;5 business days</li>
            <li>&#10003; 30-day returns</li>
          </ul>
        </div>

        {related.length > 0 && (
          <div className="mt-20 pb-20">
            <h2 className="text-center font-display text-2xl font-semibold text-cream">
              Related Products
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
