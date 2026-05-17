import Link from "next/link"

export default function TermsPage() {
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
        <span className="heroBadge">Terms of Service</span>

        <h1>
          Terms for using <span>EtsySEO AI</span>
        </h1>

        <p>
          By using EtsySEO AI, you agree to use the platform responsibly and
          verify all AI-generated content before publishing.
        </p>
      </section>

      <section className="legalPage">
        <h2>Use of Service</h2>
        <p>
          EtsySEO AI helps generate Etsy listing titles, descriptions, tags,
          audits and SEO suggestions. You are responsible for reviewing and
          approving all generated content before use.
        </p>

        <h2>No Guarantee</h2>
        <p>
          We do not guarantee Etsy rankings, sales, traffic, conversions or
          search placement.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          You must not use EtsySEO AI to create or promote infringing content,
          protected brand terms, copyrighted characters, slogans, logos or
          trademarked material unless you have the legal right to do so.
        </p>

        <h2>Subscriptions</h2>
        <p>
          Paid plans may renew automatically until cancelled. Subscription
          management is handled through Stripe.
        </p>

        <h2>Acceptable Use</h2>
        <p>
          You agree not to abuse the service, bypass credit limits, overload the
          system or use the platform for unlawful activity.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms as the product grows. Continued use means
          you accept the updated terms.
        </p>
      </section>
    </main>
  )
}