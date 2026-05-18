"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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

const navLinks = [
  { href: "/generate", label: "Generator" },
  { href: "/audit", label: "Audit" },
  { href: "/pricing", label: "Pricing" },
  { href: "/history", label: "History" },
  { href: "/dashboard", label: "Dashboard" },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

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
    <header className="navbar cinematicNavbar">
      <div className="navbarInner cinematicNavbarInner">
        <Link href="/" className="navbarLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <nav className="navbarLinks cinematicNavLinks">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "activeNavLink" : ""}
            >
              {link.label}
            </Link>
          ))}

          {!loading && !user && (
            <>
              <Link href="/login">Login</Link>

              <Link href="/signup" className="navbarCta">
                Start Free
              </Link>
            </>
          )}

          {!loading && user && (
            <div className="navUserBox">
              <Link href="/settings" className="navAvatar" title={user.fullName}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullName} />
                ) : (
                  user.fullName.charAt(0)
                )}
              </Link>

              <button type="button" onClick={logout} className="navLogout">
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}