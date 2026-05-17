import { NextResponse } from "next/server"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}

const stripe = new Stripe(stripeSecretKey)

const PRICE_IDS = {
  pro: process.env.STRIPE_PRO_PRICE_ID,
  agency: process.env.STRIPE_AGENCY_PRICE_ID,
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const plan = body.plan as "pro" | "agency"

    if (!plan) {
      return NextResponse.json(
        {
          error: "No plan selected.",
        },
        { status: 400 }
      )
    }

    const priceId = PRICE_IDS[plan]

    if (!priceId) {
      return NextResponse.json(
        {
          error: "Invalid Stripe price ID.",
        },
        { status: 400 }
      )
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://etsy-seo-ai.vercel.app"

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      payment_method_types: ["card"],

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      allow_promotion_codes: true,

      billing_address_collection: "auto",

      success_url: `${siteUrl}/dashboard?payment=success`,

      cancel_url: `${siteUrl}/pricing`,

      metadata: {
        plan,
      },
    })

    return NextResponse.json({
      success: true,
      url: session.url,
    })
  } catch (error) {
    console.error("Stripe checkout error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Stripe checkout failed.",
      },
      { status: 500 }
    )
  }
}