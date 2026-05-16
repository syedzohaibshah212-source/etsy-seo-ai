import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    if (!stripeSecretKey || !supabaseUrl || !serviceRoleKey || !siteUrl) {
      return NextResponse.json(
        { error: "Missing portal environment variables." },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeSecretKey)
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: "Missing user ID." },
        { status: 400 }
      )
    }

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single()

    if (error || !profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No Stripe customer found." },
        { status: 400 }
      )
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${siteUrl}/settings`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Billing portal error:", error)

    return NextResponse.json(
      { error: "Failed to create billing portal session." },
      { status: 500 }
    )
  }
}