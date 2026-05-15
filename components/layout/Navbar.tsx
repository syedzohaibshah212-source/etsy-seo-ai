"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type UserProfile = {
  fullName: string
  email: string
  avatarUrl: string
}

type ProfileData = {
  full_name: string | null
  avatar_url: string | null
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
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .maybeSingle<ProfileData>()

        setUser({
          fullName:
            profile?.full_name ||
            (typeof user.user_metadata?.full_name === "string"
              ? user.user_metadata.full_name
              : "User"),

          email: user.email || "",

          avatarUrl: profile?.avatar_url || "",
        })
      }

      setLoading(false)
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", session.user.id)
          .maybeSingle<ProfileData>()

        setUser({
          fullName:
            profile?.full_name ||
            (typeof session.user.user_metadata?.full_name === "string"
              ? session.user.user_metadata.full_name
              : "User"),

          email: session.user.email || "",

          avatarUrl: profile?.avatar_url || "",
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
              <Link href="/settings">
                <div
                  title={user.fullName}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "999px",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, #d4af37 0%, #22c55e 100%)",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    boxShadow: "0 10px 30px rgba(250,204,21,0.25)",
                    cursor: "pointer",
                  }}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    user.fullName.charAt(0)
                  )}
                </div>
              </Link>

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