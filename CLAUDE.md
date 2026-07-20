# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BREAKOUT CULTURE Site — a luxury e-commerce website for BREAKOUT CULTURE, a premium
trader/entrepreneur streetwear brand.

## Status

This repository has not been scaffolded yet. There is no package.json, no source tree, and
no build tooling in place. Do not assume any npm scripts, folder structure, or dependencies
exist until they have actually been created — check for `package.json` before running any
`npm` command.

Before any code is written, walk the user through exactly what will be built (project
structure, components, pages, styling approach) and get explicit approval. Build step by
step after approval, and run the dev server to catch and fix build errors before calling
anything done.

## Tech stack

- Next.js 14, React, Tailwind CSS
- Stripe (test mode) for checkout — never wire up live keys or live mode without explicit
  instruction, and never hardcode secrets in source or commits
- Responsive, mobile-first
- Fast, clean code

## Design direction (critical — read before building any UI)

**Vibe:** luxury trading floor meets vintage streetwear. Warm, sophisticated, slightly
antique. Premium feel without corporate polish. Warm and inviting, never cold or stark.
NOT minimalist/basic — use texture, ornamental detail, and careful supporting graphics
(price-action chart motifs, vintage badges, ornamental dividers) to reinforce the
trading/breakout message. Typography mixes modern sans with classic serif.

### Color palette (warm & luxury)

- Primary Dark (warm espresso-black): `#1a1613`
- Background Cream (warm paper-white — never pure white): `#f9f7f4`
- Accent Gold (warm, muted, refined): `#c9a961`
- Secondary Gray (warm taupe, for text): `#6b6359`
- Burgundy (optional accent): `#5a3a2a`

### Typography (import from Google Fonts)

- Headlines: Playfair Display, serif, weight 600–700 — luxury, classic
- Subheadings: Cormorant Garamond, serif, weight 400–500
- Body: Inter or Lato, sans-serif, weight 400
- Labels/CTAs: Montserrat, sans-serif, weight 600, uppercase

### Design elements (subtle, not overcrowded)

1. Vintage trading badges — circular emblems, e.g. "Est. 2026", used sparingly
2. Faint price-action chart patterns in backgrounds, 5–10% opacity, gold tone
3. Ornamental dividers between sections — thin gold lines, small geometric shapes
4. Very light paper/canvas texture overlay on cream backgrounds
5. Gold foil effect on key text — slight gradient/glow for a premium feel
6. Small 2-color icon graphics (trader, arrow, chart) — subtle, not cartoonish
7. Vintage badges on products — e.g. "Limited Edition", "Founder's Drop"

### Interaction / detail conventions

- All text shadows/glows are warm-toned, never pure black
- Buttons: subtle hover lift — gold brightens, slight shadow increase
- General hover states: gold brightens, subtle scale-up, added shadow depth
- Form focus states get gold accents
- Generous vertical whitespace — do not crowd content
- Cream backgrounds are always warm/aged-feeling, never stark white

## Pages

1. **Homepage**
   - Hero: cream background, wordmark with split serif/sans emphasis, emblem badge,
     mission statement, CTA button
   - Featured product: 50/50 image + details, premium layout
   - Brand story section: warm dark background, serif headline, 2–3 paragraphs
   - Footer: warm dark background, cream text, links, social

2. **Product pages** (2x: "Make Internet Money", "Anti 9-5 Club")
   - 60/40 layout, images left, details right
   - Breadcrumb, product name (serif), vintage badge
   - Price in gold serif, description, size/quantity selectors
   - Gold CTA button with glow effect
   - Additional sections: Why Buy, Shipping/Returns, Related Products
   - Ornamental dividers between sections

3. **Shop/Browse**
   - Header: "SHOP THE DROP" (serif)
   - 2-column product grid (1 column on mobile)
   - Product cards: image, name (serif), price (gold), hover reveals vintage badge
   - Subtle gold border on card hover

4. **Cart**
   - Warm backgrounds, cream/gold text hierarchy
   - Cart items list (left), summary (right, on desktop)
   - Gold "Proceed to Checkout" button

5. **Checkout**
   - Steps: shipping, payment, confirmation
   - Gold accents on form focus states
   - Stripe integration (test mode)
   - Confirmation page with a "Thanks" message

6. **About/Mission**
   - Serif headlines, alternating warm dark / cream sections
   - 3–4 short paragraphs, direct tone
   - Optional small trading-related icon

7. **FAQ**
   - Q&A list format, serif headers, clear and scannable

8. **Footer & Navbar**
   - Navbar: warm dark background, cream text, BREAKOUT logo on left, serif links,
     gold hover state
   - Footer: warm dark background, cream/gold text, minimal and elegant

## Products (placeholder — no images yet, text-only placeholder cards for now)

- Make Internet Money Hoodie — $49.99
- Anti 9-5 Club Hoodie — $49.99

## Working conventions

- This is a luxury/premium consumer brand — prioritize polished, high-end visual design
  and copy tone over quick scaffolding when building UI.
- Checkout/payment code defaults to Stripe test mode; never introduce live payment
  credentials or hardcode secrets in source or commits.
- Prefer standard Next.js App Router conventions unless the user directs otherwise.
- Keep the aesthetic warm, vintage-luxury, and trading-inspired at every step — avoid
  anything that reads as generic, cold, or corporate-minimalist.
