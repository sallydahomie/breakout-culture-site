import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { findVariantBySku, getProductBySlug } from "@/lib/products";
import { Product, ProductVariant } from "@/types/product";

const MAX_QUANTITY_PER_ITEM = 20;
const CART_SUMMARY_MAX_LENGTH = 450;

// Never trust name/price/quantity/total sent from the browser for the
// actual charge — every field here is re-resolved against the server-side
// catalog in resolveLineItem() before it touches Stripe.
interface CheckoutRequestItem {
  slug?: string;
  sku?: string;
  size?: string;
  quantity?: unknown;
}

interface CheckoutRequestBody {
  items: CheckoutRequestItem[];
  email?: string;
}

interface ResolvedLine {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

function resolveLineItem(
  raw: CheckoutRequestItem,
  index: number
): ResolvedLine | { error: string } {
  const label = `Item ${index + 1}`;

  if (!raw.sku && !(raw.slug && raw.size)) {
    return { error: `${label}: must include a sku, or a slug and size.` };
  }

  let resolved: { product: Product; variant: ProductVariant } | null = null;

  if (raw.sku) {
    resolved = findVariantBySku(raw.sku);
    if (!resolved) {
      return { error: `${label}: unknown SKU.` };
    }
    if (raw.slug && raw.slug !== resolved.product.slug) {
      return { error: `${label}: sku/slug mismatch.` };
    }
    if (raw.size && raw.size !== resolved.variant.size) {
      return { error: `${label}: sku/size mismatch.` };
    }
  } else {
    const product = getProductBySlug(raw.slug!);
    if (!product) {
      return { error: `${label}: unknown product.` };
    }
    const variant = product.variants.find((v) => v.size === raw.size);
    if (!variant) {
      return { error: `${label}: size ${raw.size} is not available for this product.` };
    }
    resolved = { product, variant };
  }

  const quantity = raw.quantity;
  if (typeof quantity !== "number" || !Number.isInteger(quantity)) {
    return { error: `${label}: invalid quantity.` };
  }
  if (quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
    return { error: `${label}: invalid quantity.` };
  }

  return { product: resolved.product, variant: resolved.variant, quantity };
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local to enable checkout.",
      },
      { status: 500 }
    );
  }

  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) {
    return NextResponse.json(
      { error: "Add SITE_URL to .env.local to enable checkout." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);

  const { items, email } = (await request.json()) as CheckoutRequestBody;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const resolvedLines: ResolvedLine[] = [];
  for (let i = 0; i < items.length; i++) {
    const result = resolveLineItem(items[i], i);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    resolvedLines.push(result);
  }

  let cartSummary = resolvedLines
    .map((line) => `${line.variant.sku}:${line.quantity}`)
    .join(",");
  let cartSummaryTruncated = false;
  if (cartSummary.length > CART_SUMMARY_MAX_LENGTH) {
    cartSummary = cartSummary.slice(0, CART_SUMMARY_MAX_LENGTH);
    cartSummaryTruncated = true;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: resolvedLines.map((line) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${line.product.name} (Size ${line.variant.size})`,
            // Only visible via listLineItems(sessionId, { expand: ["data.price.product"] })
            // when the future fulfillment webhook reads this session back.
            metadata: { sku: line.variant.sku },
          },
          unit_amount: line.product.priceCents,
        },
        quantity: line.quantity,
      })),
      customer_email: email?.trim() || undefined,
      shipping_address_collection: { allowed_countries: ["US"] },
      metadata: {
        cart_summary: cartSummary,
        ...(cartSummaryTruncated ? { cart_summary_truncated: "true" } : {}),
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
