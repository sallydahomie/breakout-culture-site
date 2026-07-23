import { DesignVersion, Product, ProductSize, ProductVariant } from "@/types/product";

function buildSku(designVersion: DesignVersion, colorCode: string, size: ProductSize): string {
  return `VOL-${designVersion}-${colorCode}-${size}`;
}

function buildVariants(
  designVersion: DesignVersion,
  colorCode: string,
  sizes: ProductSize[]
): ProductVariant[] {
  return sizes.map((size) => ({ sku: buildSku(designVersion, colorCode, size), size }));
}

type RawProduct = Omit<
  Product,
  "priceCents" | "originalPriceCents" | "variants" | "colorCode"
> & {
  colorCode: string;
};

const rawProducts: RawProduct[] = [
  {
    slug: "make-internet-money",
    name: "ANTI 9-5 Club Hoodie | Statement",
    price: 65.99,
    originalPrice: 89.99,
    designVersion: "V1",
    color: "Black",
    colorCode: "BLK",
    description:
      "This isn't for everyone. It's for the people who refuse to spend the only life they'll ever have building someone else's dream. The entrepreneurs. The creators | The traders | The builders | The ones willing to fail, learn, and keep going until they create a life they're proud of. This hoodie isn't the goal. It's a reminder of who you decided to become.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    meaning:
      "You only get one life.\n\nMost people spend it following a script they never chose.\n\nBreakout Culture exists to remind you that another path exists.\n\nEvery failure teaches.\n\nEvery setback builds.\n\nEvery risk moves you closer to the life you actually want.\n\nThis hoodie isn't about fashion.\n\nIt's about making a decision.\n\nTo stop waiting.\n\nTo stop settling.\n\nTo build something that's yours.",
    buildToLast: [
      "Premium heavyweight 400gsm fleece",
      "Garment dyed for a vintage finish",
      "80/20 cotton blend",
      "Designed to improve with age",
    ],
    images: [
      "/images/111.png",
      "/images/222.png",
      "/images/333.png",
      "/images/444.png",
      "/images/555.png",
    ],
  },
  {
    slug: "anti-9-5-club",
    name: "ANTI 9-5 Club Hoodie | Essential",
    price: 65.99,
    originalPrice: 89.99,
    designVersion: "V2",
    color: "Black",
    colorCode: "BLK",
    description:
      "Not every statement has to be loud.\n\nSome of the strongest convictions are quiet. The Essential Hoodie was designed for the people who don't need to prove what they believe. They live it. Every morning you choose between comfort and growth. Between following the script and writing your own. This hoodie is a reminder of that decision. Built with the same premium heavyweight construction. Designed with a cleaner chest print for everyday wear. Less noise. Same mission.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    meaning:
      'Most people spend their lives waiting for the "right time". The right opportunity. The right amount of money. The right amount of confidence. But the people who build extraordinary lives eventually realize something. The future isn\'t given. It\'s built. Every risk you take. Every lesson you learn. Every time you refuse to quit. That\'s what this hoodie represents. Not rebellion. Responsibility. The responsibility to make the most of the only life you\'ll ever have.',
    buildToLast: [
      "Premium heavyweight 400gsm fleece",
      "Garment dyed for a vintage finish",
      "80/20 cotton blend",
      "Clean, minimal chest print for everyday wear",
    ],
    images: [
      "/images/1%20v2.png",
      "/images/2%20v2.png",
      "/images/3%20v2.png",
      "/images/4%20v2.png",
      "/images/5%20v2.png",
    ],
  },
];

export const products: Product[] = rawProducts.map((raw) => ({
  ...raw,
  priceCents: Math.round(raw.price * 100),
  originalPriceCents:
    raw.originalPrice !== undefined ? Math.round(raw.originalPrice * 100) : undefined,
  variants: buildVariants(raw.designVersion, raw.colorCode, raw.sizes),
}));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function findVariantBySlugAndSize(
  slug: string,
  size: string
): { product: Product; variant: ProductVariant } | null {
  const product = getProductBySlug(slug);
  if (!product) return null;
  const variant = product.variants.find((v) => v.size === size);
  if (!variant) return null;
  return { product, variant };
}

export function findVariantBySku(
  sku: string
): { product: Product; variant: ProductVariant } | null {
  for (const product of products) {
    const variant = product.variants.find((v) => v.sku === sku);
    if (variant) return { product, variant };
  }
  return null;
}
