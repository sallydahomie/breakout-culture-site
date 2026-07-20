import { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "make-internet-money",
    name: "Make Internet Money Hoodie",
    price: 77.99,
    originalPrice: 99.99,
    badge: "Founder's Drop",
    description:
      "For the ones who left the default path behind. Premium heavyweight cotton-blend, built for the grind. Bold centered chest print. Embroidered neck tag with Breakout Culture mark.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    whyBuy: [
      "Heavyweight 400gsm fleece for a structured, premium drape",
      "Garment-dyed for a warm, vintage-washed finish that ages with you",
      "Embroidered emblem, no flat prints, no shortcuts",
      "80/20 cotton-poly blend",
    ],
    images: [
      "/images/111.png",
      "/images/222.png",
      "/images/333.png",
      "/images/444.png",
      "/images/555.png",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
