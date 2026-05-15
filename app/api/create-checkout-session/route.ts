import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const plan = body.plan

    let priceId = ""

    if (plan === "pro") {
      priceId = process.env.STRIPE_PRO_PRICE_ID!
    }

    if (plan === "agency") {
      priceId = process.env.STRIPE_AGENCY_PRICE_ID!
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid plan selected." },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    })

    return NextResponse.json({
      url: session.url,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Stripe checkout failed." },
      { status: 500 }
    )
  }
}