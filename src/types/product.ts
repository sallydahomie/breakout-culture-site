export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export type DesignVersion = "V1" | "V2";

export interface ProductVariant {
  sku: string;
  size: ProductSize;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  priceCents: number;
  originalPriceCents?: number;
  badge?: string;
  description: string;
  sizes: ProductSize[];
  designVersion: DesignVersion;
  color: string;
  colorCode: string;
  variants: ProductVariant[];
  meaning: string;
  buildToLast: string[];
  images: string[];
}
