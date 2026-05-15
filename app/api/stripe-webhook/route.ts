import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Missing webhook environment variables." },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeSecretKey)

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature." },
        { status: 400 }
      )
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const email =
        session.customer_details?.email || session.customer_email || ""

      const amount = session.amount_total || 0

      const plan = amount >= 2900 ? "Agency" : "Pro"
      const credits = plan === "Agency" ? 2000 : 500

      if (email) {
        await supabaseAdmin
          .from("profiles")
          .update({
            plan,
            credits,
          })
          .eq("email", email)
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription

      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id

      const customer = await stripe.customers.retrieve(customerId)

      if (!customer.deleted && customer.email) {
        await supabaseAdmin
          .from("profiles")
          .update({
            plan: "Free",
            credits: 5,
          })
          .eq("email", customer.email)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Stripe webhook error:", error)

    return NextResponse.json(
      { error: "Webhook failed." },
      { status: 400 }
    )
  }
}