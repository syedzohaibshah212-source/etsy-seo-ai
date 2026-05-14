import Link from "next/link"

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbarInner">
        <Link href="/" className="navbarLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <nav className="navbarLinks">
          <Link href="/generate">Generator</Link>

          <Link href="/pricing">Pricing</Link>

          <Link href="/history">History</Link>

          <Link href="/dashboard">Dashboard</Link>

          <Link href="/settings">Settings</Link>

          <Link href="/login">Login</Link>

          <Link href="/signup" className="navbarCta">
            Start Free
          </Link>
        </nav>
      </div>
    </header>
  )
}