"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type UserData = {
  id: string
  email: string
  fullName: string
}

type ProfileData = {
  plan: string
  credits: number
}

type ListingPreview = {
  id: string
  title: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()

  const [user, setUser] = useState<UserData | null>(null)
  const [profile, setProfile] = useState<ProfileData>({
    plan: "Free",
    credits: 5,
  })
  const [listingsCount, setListingsCount] = useState(0)
  const [recentListings, setRecentListings] = useState<ListingPreview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const fullName =
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : "EtsySEO User"

      setUser({
        id: user.id,
        email: user.email || "",
        fullName,
      })

      const { data: profileData } = await supabase
        .from("profiles")
        .select("plan, credits")
        .eq("id", user.id)
        .single()

      if (profileData) {
        setProfile({
          plan: profileData.plan || "Free",
          credits:
            typeof profileData.credits === "number" ? profileData.credits : 5,
        })
      }

      const { count } = await supabase
        .from("listings")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)

      setListingsCount(count || 0)

      const { data: recentData } = await supabase
        .from("listings")
        .select("id, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(3)

      setRecentListings(recentData || [])
      setLoading(false)
    }

    loadDashboard()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <main className="dashboardPage">
        <section className="dashboardContent">
          <h1>Loading dashboard...</h1>
        </section>
      </main>
    )
  }

  return (
    <main className="dashboardPage">
      <aside className="dashboardSidebar">
        <Link href="/" className="dashboardLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <nav className="dashboardMenu">
          <Link href="/dashboard" className="active">
            Dashboard
          </Link>
          <Link href="/generate">Generator</Link>
          <Link href="/history">History</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/settings">Settings</Link>
        </nav>

        <div className="sidebarUpgrade">
          <span>{profile.plan} Plan</span>
          <h3>{profile.credits} credits left</h3>
          <Link href="/pricing">Upgrade Pro</Link>
        </div>
      </aside>

      <section className="dashboardContent">
        <header className="dashboardHeader">
          <div>
            <span>Welcome back, {user?.fullName}</span>
            <h1>Your EtsySEO AI Dashboard</h1>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/generate" className="primaryBtn">
              Generate Listing
            </Link>

            <button type="button" className="primaryBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="dashboardStats">
          <div className="dashCard">
            <span>Credits Remaining</span>
            <h2>{profile.credits}</h2>
            <p>{profile.plan} plan generations</p>
          </div>

          <div className="dashCard">
            <span>Listings Generated</span>
            <h2>{listingsCount}</h2>
            <p>Total saved SEO listings</p>
          </div>

          <div className="dashCard">
            <span>Current Plan</span>
            <h2>{profile.plan}</h2>
            <p>Upgrade anytime</p>
          </div>
        </div>

        <section className="dashboardGrid">
          <div className="dashPanel">
            <div className="panelHeader">
              <h3>Recent Listings</h3>
              <Link href="/history">View all</Link>
            </div>

            <div className="recentList">
              {recentListings.length === 0 ? (
                <div>
                  <strong>No saved listings yet</strong>
                  <span>Your generated listings will appear here soon.</span>
                </div>
              ) : (
                recentListings.map((listing) => (
                  <div key={listing.id}>
                    <strong>{listing.title}</strong>
                    <span>Generated {formatDate(listing.created_at)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashPanel highlightPanel">
            <span>Pro Features</span>
            <h3>Unlock unlimited Etsy SEO generation</h3>
            <p>
              Get more credits, saved history, CSV export, smart tags and future
              bulk listing generation.
            </p>

            <Link href="/pricing" className="primaryBtn">
              Upgrade Pro
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}