"use client"

import Link from "next/link"

export default function PricingPage() {
  async function checkout(plan: "pro" | "agency") {
    try {
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
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section className="pricingHero">
        <span className="heroBadge">Simple Pricing</span>

        <h1>
          Choose the plan that fits your <span>Etsy growth</span>
        </h1>

        <p>
          Start free and upgrade when you need more generations, saved history,
          CSV exports and bulk Etsy SEO tools.
        </p>
      </section>

      <section className="pricingFullGrid">
        <div className="pricingPlan">
          <h3>Free</h3>

          <p className="planDesc">Best for testing the tool.</p>

          <div className="planPrice">
            $0 <span>/ month</span>
          </div>

          <ul>
            <li>5 AI generations/month</li>
            <li>Basic SEO titles</li>
            <li>13 Etsy tags</li>
            <li>Image upload</li>
            <li>Copy buttons</li>
          </ul>

          <Link href="/generate" className="secondaryBtn">
            Start Free
          </Link>
        </div>

        <div className="pricingPlan featuredPlan">
          <div className="popularBadge">Most Popular</div>

          <h3>Pro</h3>

          <p className="planDesc">For serious Etsy sellers.</p>

          <div className="planPrice">
            $9 <span>/ month</span>
          </div>

          <ul>
            <li>500 AI generations/month</li>
            <li>Advanced SEO methods</li>
            <li>Listing history</li>
            <li>CSV export</li>
            <li>Priority AI generation</li>
            <li>Future competitor insights</li>
          </ul>

          <button
            type="button"
            className="primaryBtn"
            onClick={() => checkout("pro")}
          >
            Upgrade Pro
          </button>
        </div>

        <div className="pricingPlan">
          <h3>Agency</h3>

          <p className="planDesc">For shops and teams.</p>

          <div className="planPrice">
            $29 <span>/ month</span>
          </div>

          <ul>
            <li>Bulk listing generation</li>
            <li>CSV exports</li>
            <li>Multiple shop support</li>
            <li>Team workflow</li>
            <li>Premium support</li>
          </ul>

          <button
            type="button"
            className="secondaryBtn"
            onClick={() => checkout("agency")}
          >
            Start Agency
          </button>
        </div>
      </section>
    </main>
  )
}