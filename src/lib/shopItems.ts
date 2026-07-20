export type ShopCategory = "Hoodies" | "Tees" | "Caps";

export interface ShopItem {
  id: string;
  category: ShopCategory;
  name: string;
  label: string;
  status: "available" | "coming-soon";
  price?: number;
  originalPrice?: number;
  description?: string;
  image?: string;
  href?: string;
}

export const shopItems: ShopItem[] = [
  {
    id: "hoodie",
    category: "Hoodies",
    name: "Make Internet Money Hoodie",
    label: "DROP 01 · 200 MADE",
    status: "available",
    price: 77.99,
    originalPrice: 99.99,
    description:
      "Heavyweight cotton-blend, front and back print, one run of 200. Built for the ones who left the default path behind.",
    image: "/images/111.png",
    href: "/product/make-internet-money",
  },
  {
    id: "tee",
    category: "Tees",
    name: "Breakout Culture Tee",
    label: "DROP 01",
    status: "coming-soon",
    description: "In development for Drop 01. Join the list to hear first.",
  },
  {
    id: "cap",
    category: "Caps",
    name: "Breakout Culture Cap",
    label: "DROP 01",
    status: "coming-soon",
    description: "In development for Drop 01. Join the list to hear first.",
  },
];
