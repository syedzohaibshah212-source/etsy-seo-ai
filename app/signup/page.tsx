"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setError("")

    if (!fullName.trim()) {
      setError("Please enter your full name.")
      return
    }

    if (!email.trim() || !password.trim()) {
      setError("Please complete all fields.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <main className="authPage">
      <section className="authLeft">
        <Link href="/" className="authLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div>
          <span className="authBadge">Premium Etsy SEO Tool</span>

          <h1>Create your EtsySEO AI account</h1>

          <p>
            Generate premium Etsy SEO titles, descriptions, tags, audits and
            optimized product listings using AI.
          </p>
        </div>
      </section>

      <section className="authCard">
        <div className="authHeader">
          <h2>Create Account</h2>

          <p>Create your account to continue.</p>
        </div>

        <form className="authForm">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="generateError">{error}</p>}

          <button
            type="button"
            className="authButton"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="authSwitch">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}