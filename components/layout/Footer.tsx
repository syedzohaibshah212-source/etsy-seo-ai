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
              AI-powered Etsy SEO listing generation platform for modern Etsy
              sellers.
            </p>
          </div>

          <div className="footerLinks">
            <div>
              <h4>Product</h4>

              <Link href="/generate">Generator</Link>
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

              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
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