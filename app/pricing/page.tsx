"use client"

import Link from "next/link"
import { useState } from "react"

type PaidPlan = "pro" | "agency"

const plans = [
  {
    name: "Free",
    price: "$0",
    label: "Start testing",
    description: "For trying EtsySEO AI before upgrading.",
    features: [
      "5 AI generations",
      "Basic Etsy SEO score",
      "13 Etsy tags",
      "Listing audit access",
      "History access",
    ],
    button: "Start Free",
    href: "/signup",
    type: "free",
  },
  {
    name: "Pro",
    price: "$19",
    label: "Most Popular",
    description: "For active Etsy sellers growing traffic.",
    features: [
      "500 AI generations/month",
      "All 12 SEO methods",
      "Advanced SEO scoring",
      "Competitor title analysis",
      "CSV export",
      "Priority AI quality",
      "Future Etsy URL audit",
    ],
    button: "Upgrade Pro",
    plan: "pro",
    type: "paid",
    featured: true,
  },
  {
    name: "Agency",
    price: "$49",
    label: "For scale",
    description: "For large shops, teams and agencies.",
    features: [
      "2,000 AI generations/month",
      "Bulk listing workflow",
      "CSV export",
      "Multiple shop workflow",
      "Priority support",
      "Advanced analytics soon",
      "Team-ready structure",
    ],
    button: "Start Agency",
    plan: "agency",
    type: "paid",
  },
]

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  async function checkout(plan: PaidPlan) {
    try {
      setLoadingPlan(plan)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || "Checkout failed.")
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      alert("Something went wrong while opening checkout.")
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <main className="pricingPage">
      <nav className="pricingNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/generate">Generator</Link>
          <Link href="/audit">Audit</Link>
          <Link href="/history">History</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section className="pricingHero">
        <span className="heroBadge">Simple Etsy SEO Pricing</span>

        <h1>
          Choose the plan that fits your <span>Etsy growth</span>
        </h1>

        <p>
          Start free, then upgrade when you need more AI generations, listing
          audits, advanced SEO methods, CSV exports and scalable Etsy seller
          workflows.
        </p>
      </section>

      <section className="pricingFullGrid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricingPlan ${plan.featured ? "featuredPlan" : ""}`}
          >
            <div className={plan.featured ? "popularBadge" : "planBadge"}>
              {plan.label}
            </div>

            <h3>{plan.name}</h3>

            <p className="planDesc">{plan.description}</p>

            <div className="planPrice">
              {plan.price} <span>/ month</span>
            </div>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            {plan.type === "free" ? (
              <Link href={plan.href || "/signup"} className="secondaryBtn">
                {plan.button}
              </Link>
            ) : (
              <button
                type="button"
                className={plan.featured ? "primaryBtn" : "secondaryBtn"}
                onClick={() => checkout(plan.plan as PaidPlan)}
                disabled={loadingPlan === plan.plan}
              >
                {loadingPlan === plan.plan ? "Opening..." : plan.button}
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="pricingFaq">
        <div>
          <h3>Can I cancel anytime?</h3>
          <p>Yes. Plans are monthly and can be cancelled anytime.</p>
        </div>

        <div>
          <h3>Do credits reset monthly?</h3>
          <p>Yes. Paid plan credits reset every billing cycle.</p>
        </div>

        <div>
          <h3>Is this only for PNG sellers?</h3>
          <p>
            It is optimized for PNG, POD, digital downloads and Etsy listing SEO.
          </p>
        </div>
      </section>
    </main>
  )
}