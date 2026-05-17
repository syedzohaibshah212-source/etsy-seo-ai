import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

function getPlanFromPriceId(priceId: string) {
  if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) {
    return {
      plan: "Agency",
      credits: 2000,
    }
  }

  if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
    return {
      plan: "Pro",
      credits: 500,
    }
  }

  return {
    plan: "Free",
    credits: 5,
  }
}

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

      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id || ""

      let plan = "Free"
      let credits = 5

      if (session.metadata?.plan === "pro") {
        plan = "Pro"
        credits = 500
      }

      if (session.metadata?.plan === "agency") {
        plan = "Agency"
        credits = 2000
      }

      if (session.subscription) {
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id

        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        )

        const priceId =
          subscription.items.data[0]?.price.id || ""

        const detected = getPlanFromPriceId(priceId)

        plan = detected.plan
        credits = detected.credits
      }

      if (email) {
        await supabaseAdmin
          .from("profiles")
          .update({
            plan,
            credits,
            stripe_customer_id: customerId,
          })
          .eq("email", email)
      }
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription

      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id

      const priceId = subscription.items.data[0]?.price.id || ""
      const detected = getPlanFromPriceId(priceId)

      const customer = await stripe.customers.retrieve(customerId)

      if (!customer.deleted && customer.email) {
        await supabaseAdmin
          .from("profiles")
          .update({
            plan: detected.plan,
            credits: detected.credits,
            stripe_customer_id: customerId,
          })
          .eq("email", customer.email)
      }
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice

      const customerId =
        typeof invoice.customer === "string"
          ? invoice.customer
          : invoice.customer?.id || ""

      const customer = customerId
        ? await stripe.customers.retrieve(customerId)
        : null

      if (customer && !customer.deleted && customer.email) {
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: "active",
          limit: 1,
        })

        const priceId =
          subscriptions.data[0]?.items.data[0]?.price.id || ""

        const detected = getPlanFromPriceId(priceId)

        await supabaseAdmin
          .from("profiles")
          .update({
            plan: detected.plan,
            credits: detected.credits,
            stripe_customer_id: customerId,
          })
          .eq("email", customer.email)
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
            stripe_customer_id: null,
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