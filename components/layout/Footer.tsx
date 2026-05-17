import Link from "next/link"
import Container from "@/components/layout/Container"

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footerInner">
          <div className="footerBrand">
            <img src="/logo.png" alt="EtsySEO AI" />

            <p>
              AI-powered Etsy SEO listing generation platform built for modern
              Etsy sellers, digital creators and growing online shops.
            </p>
          </div>

          <div className="footerLinks">
            <div>
              <h4>Product</h4>

              <Link href="/generate">Generator</Link>
              <Link href="/audit">Listing Audit</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/history">History</Link>
            </div>

            <div>
              <h4>Account</h4>

              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>

            <div>
              <h4>Company</h4>

              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/refund-policy">Refund Policy</Link>
              <Link href="/support">Support</Link>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          © 2026 EtsySEO AI. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}