import Link from "next/link"

export default function RefundPolicyPage() {
  return (
    <main className="pricingPage">
      <nav className="pricingNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/support">Support</Link>
        </div>
      </nav>

      <section className="pricingHero">
        <span className="heroBadge">Refund Policy</span>

        <h1>
          Simple and fair <span>refund policy</span>
        </h1>

        <p>
          EtsySEO AI provides digital AI-generated services. Please review your
          plan before purchasing.
        </p>
      </section>

      <section className="legalPage">
        <h2>Digital Service</h2>
        <p>
          Because EtsySEO AI provides digital AI-generated listing content,
          refunds are generally not provided after successful subscription
          activation or AI generation usage.
        </p>

        <h2>Billing Issues</h2>
        <p>
          If you were charged by mistake, charged twice, or experienced a
          technical billing issue, contact support and we will review it.
        </p>

        <h2>Cancellations</h2>
        <p>
          You can cancel your subscription to stop future renewals. Cancelling
          does not automatically refund previous charges.
        </p>

        <h2>Support</h2>
        <p>
          For refund or billing questions, contact us through the support page.
        </p>
      </section>
    </main>
  )
}