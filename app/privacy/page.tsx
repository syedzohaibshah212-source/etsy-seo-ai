import Link from "next/link"

export default function PrivacyPage() {
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
        <span className="heroBadge">Privacy Policy</span>

        <h1>
          Your privacy <span>matters</span>
        </h1>

        <p>
          EtsySEO AI collects only the information needed to provide AI listing
          generation, account access, billing and support.
        </p>
      </section>

      <section className="legalPage">
        <h2>Information We Collect</h2>
        <p>
          We may collect your name, email address, account details, uploaded
          product images, listing inputs, generated outputs and billing-related
          information.
        </p>

        <h2>How We Use Information</h2>
        <p>
          We use this information to generate Etsy SEO listings, save history,
          manage credits, process payments, improve the product and provide
          support.
        </p>

        <h2>Payments</h2>
        <p>
          Payments are processed securely through Stripe. We do not store your
          full card details.
        </p>

        <h2>AI Processing</h2>
        <p>
          Uploaded images and listing inputs may be processed by AI providers to
          generate titles, descriptions, tags, audits and SEO scores.
        </p>

        <h2>Data Selling</h2>
        <p>
          We do not sell your personal information.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, contact us through the support page.
        </p>
      </section>
    </main>
  )
}