"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleLogin() {
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  async function handleGoogleLogin() {
    setError("")
    setGoogleLoading(true)

    const redirectTo = `${window.location.origin}/dashboard`

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      setGoogleLoading(false)
      setError(error.message)
    }
  }

  return (
    <main className="authPage">
      <section className="authLeft">
        <Link href="/" className="authLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div>
          <span className="authBadge">Premium Etsy SEO Tool</span>

          <h1>Welcome back to EtsySEO AI</h1>

          <p>
            Login to generate Etsy SEO titles, tags, descriptions, audits and
            optimized product listings faster.
          </p>
        </div>
      </section>

      <section className="authCard">
        <div className="authHeader">
          <h2>Login</h2>
          <p>Continue with email or Google.</p>
        </div>

        <form className="authForm">
          <button
            type="button"
            className="googleButton"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
          >
            {googleLoading ? "Opening Google..." : "Continue with Google"}
          </button>

          <div className="authDivider">
            <span>or login with email</span>
          </div>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="generateError">{error}</p>}

          <button
            type="button"
            className="authButton"
            onClick={handleLogin}
            disabled={loading || googleLoading}
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <p className="authSwitch">
          Don&apos;t have an account? <Link href="/signup">Create account</Link>
        </p>
      </section>
    </main>
  )
}