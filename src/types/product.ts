export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  sizes: ProductSize[];
  whyBuy: string[];
  images: string[];
}
