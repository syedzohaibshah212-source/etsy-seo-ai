import { NextResponse } from "next/server"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe secret key is missing." },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeSecretKey)

    const body = await req.json()
    const plan = body.plan

    const priceId =
      plan === "agency"
        ? process.env.STRIPE_AGENCY_PRICE_ID
        : process.env.STRIPE_PRO_PRICE_ID

    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid plan selected." },
        { status: 400 }
      )
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://etsy-seo-ai.vercel.app"

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/dashboard?payment=success`,
      cancel_url: `${siteUrl}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)

    return NextResponse.json(
      { error: "Stripe checkout failed." },
      { status: 500 }
    )
  }
}