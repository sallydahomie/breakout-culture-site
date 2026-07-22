import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CheckoutRequestItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
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

  const stripe = new Stripe(secretKey);

  const { items, origin } = (await request.json()) as {
    items: CheckoutRequestItem[];
    origin: string;
  };

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${item.name} (Size ${item.size})`,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
