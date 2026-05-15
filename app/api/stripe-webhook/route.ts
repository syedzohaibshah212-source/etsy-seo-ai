import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature." },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Missing Stripe webhook secret." },
        { status: 500 }
      )
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const customerEmail =
        session.customer_details?.email || session.customer_email

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id

      if (customerEmail) {
        const plan =
          session.amount_total === 2900 ? "Agency" : "Pro"

        const credits =
          plan === "Agency" ? 2000 : 500

        await supabaseAdmin
          .from("profiles")
          .update({
            plan,
            credits,
          })
          .eq("email", customerEmail)

        console.log("Subscription activated:", {
          customerEmail,
          plan,
          credits,
          subscriptionId,
        })
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription

      const customer =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id

      const stripeCustomer =
        await stripe.customers.retrieve(customer)

      if (
        stripeCustomer &&
        !stripeCustomer.deleted &&
        stripeCustomer.email
      ) {
        await supabaseAdmin
          .from("profiles")
          .update({
            plan: "Free",
            credits: 5,
          })
          .eq("email", stripeCustomer.email)

        console.log("Subscription cancelled:", stripeCustomer.email)
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