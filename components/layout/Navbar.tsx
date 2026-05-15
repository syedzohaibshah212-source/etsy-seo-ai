"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type UserProfile = {
  fullName: string
  email: string
}

export default function Navbar() {
  const router = useRouter()

  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser({
          fullName:
            typeof user.user_metadata?.full_name === "string"
              ? user.user_metadata.full_name
              : "User",
          email: user.email || "",
        })
      }

      setLoading(false)
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          fullName:
            typeof session.user.user_metadata?.full_name === "string"
              ? session.user.user_metadata.full_name
              : "User",
          email: session.user.email || "",
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

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

          {!loading && !user && (
            <>
              <Link href="/login">Login</Link>

              <Link href="/signup" className="navbarCta">
                Start Free
              </Link>
            </>
          )}

          {!loading && user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginLeft: "10px",
              }}
            >
              <div
                title={user.fullName}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(135deg, #d4af37 0%, #facc15 100%)",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "16px",
                  textTransform: "uppercase",
                  boxShadow: "0 10px 30px rgba(250,204,21,0.25)",
                }}
              >
                {user.fullName.charAt(0)}
              </div>

              <button
                onClick={logout}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}