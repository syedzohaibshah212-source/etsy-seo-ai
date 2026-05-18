"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="cleanNavbar">
      <div className="cleanNavbarInner">
        <Link href="/" className="navbarLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <nav className="cleanNavLinks">
          <Link href="/generate">Generator</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/history">History</Link>
          <Link href="/dashboard">Dashboard</Link>

          <Link href="/signup" className="cleanNavButton">
            Start Free
          </Link>
        </nav>
      </div>
    </header>
  )
}