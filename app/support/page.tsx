import Link from "next/link"

export default function SupportPage() {
  return (
    <main className="pricingPage">
      <nav className="pricingNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <section className="pricingHero">
        <span className="heroBadge">Support</span>

        <h1>
          Need help with <span>EtsySEO AI?</span>
        </h1>

        <p>
          Contact us for account, billing, subscription, generation or technical
          support.
        </p>
      </section>

      <section className="legalPage">
        <h2>Contact Support</h2>
        <p>
          Email us at:
          <br />
          <strong>support@etsyseoai.com</strong>
        </p>

        <h2>What To Include</h2>
        <p>
          Please include your account email, a short description of the issue and
          any screenshots that help explain the problem.
        </p>

        <h2>Common Support Topics</h2>
        <ul>
          <li>Billing or subscription questions</li>
          <li>Credits not updating</li>
          <li>AI generation errors</li>
          <li>Login or account access issues</li>
          <li>Listing history problems</li>
        </ul>
      </section>
    </main>
  )
}