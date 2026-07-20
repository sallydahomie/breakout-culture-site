import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: "#1a1613",
          light: "#241f1a",
        },
        cream: {
          DEFAULT: "#f9f7f4",
          dark: "#f2eee7",
        },
        gold: {
          DEFAULT: "#c9a961",
          light: "#ddc48a",
          dark: "#a8863f",
        },
        taupe: "#6b6359",
        burgundy: "#5a3a2a",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        subhead: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px rgba(26, 22, 19, 0.12)",
        "warm-lg": "0 12px 40px rgba(26, 22, 19, 0.18)",
        "gold-glow": "0 0 24px rgba(201, 169, 97, 0.45)",
      },
      letterSpacing: {
        wide2: "0.08em",
        wide3: "0.16em",
      },
    },
  },
  plugins: [],
};
export default config;
