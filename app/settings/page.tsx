"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type ProfileData = {
  full_name: string | null
  email: string | null
  plan: string | null
  credits: number | null
}

export default function SettingsPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [plan, setPlan] = useState("Free")
  const [credits, setCredits] = useState(5)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, plan, credits")
        .eq("id", user.id)
        .maybeSingle<ProfileData>()

      setFullName(
        data?.full_name ||
          (typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : "")
      )

      setEmail(data?.email || user.email || "")
      setPlan(data?.plan || "Free")
      setCredits(typeof data?.credits === "number" ? data.credits : 5)

      setLoading(false)
    }

    loadSettings()
  }, [router])

  async function saveProfile() {
    setSaving(true)
    setError("")
    setMessage("")

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
      })
      .eq("id", user.id)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    await supabase.auth.updateUser({
      data: {
        full_name: fullName,
      },
    })

    setMessage("Profile updated successfully.")
    setSaving(false)
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <main className="authPage">
        <section className="authCard">
          <h1>Loading settings...</h1>
        </section>
      </main>
    )
  }

  return (
    <main className="authPage">
      <section className="authLeft">
        <Link href="/" className="authLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div>
          <span className="authBadge">Account Settings</span>

          <h1>Manage your EtsySEO AI account</h1>

          <p>
            Update your profile, check your current plan, view credits and manage
            account access.
          </p>
        </div>
      </section>

      <section className="authCard">
        <div className="authHeader">
          <h2>Settings</h2>
          <p>Your real account information.</p>
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

          <input type="email" value={email} disabled />

          <label>Current Plan</label>

          <input type="text" value={plan} disabled />

          <label>Credits Remaining</label>

          <input type="text" value={credits} disabled />

          {message && <p className="generateError">{message}</p>}

          {error && <p className="generateError">{error}</p>}

          <button
            type="button"
            className="authButton"
            onClick={saveProfile}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

          <Link href="/pricing" className="googleButton">
            Manage / Upgrade Plan
          </Link>

          <button
            type="button"
            className="googleButton"
            onClick={logout}
          >
            Logout
          </button>
        </form>

        <p className="authSwitch">
          Back to <Link href="/dashboard">Dashboard</Link>
        </p>
      </section>
    </main>
  )
}