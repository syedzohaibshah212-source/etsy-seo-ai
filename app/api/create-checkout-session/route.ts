import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const plan = body.plan

    let priceId = ""

    if (plan === "pro") {
      priceId = process.env.STRIPE_PRO_PRICE_ID || ""
    }

    if (plan === "agency") {
      priceId = process.env.STRIPE_AGENCY_PRICE_ID || ""
    }

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

    return NextResponse.json({
      url: session.url,
    })
  } catch (error) {
    console.error("Stripe checkout error:", error)

    return NextResponse.json(
      { error: "Stripe checkout failed." },
      { status: 500 }
    )
  }
}