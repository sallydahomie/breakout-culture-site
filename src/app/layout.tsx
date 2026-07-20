import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { MotionProvider } from "@/components/MotionProvider";
import { LenisProvider } from "@/components/LenisProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = "https://breakoutculture.com";
const siteDescription =
  "Premium streetwear for young entrepreneurs building freedom outside the 9 to 5, the classroom, and the ordinary script.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BREAKOUT CULTURE",
    template: "%s | BREAKOUT CULTURE",
  },
  description: siteDescription,
  openGraph: {
    title: "BREAKOUT CULTURE",
    description: siteDescription,
    url: siteUrl,
    siteName: "BREAKOUT CULTURE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BREAKOUT CULTURE",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${montserrat.variable} font-body bg-espresso text-cream antialiased`}
      >
        <LenisProvider>
          <MotionProvider>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </MotionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
