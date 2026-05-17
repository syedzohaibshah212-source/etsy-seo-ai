"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type UserData = {
  id: string
  email: string
  fullName: string
}

type ProfileData = {
  plan: string | null
  credits: number | null
}

type ListingPreview = {
  id: string
  title: string
  created_at: string
  seo_score: number | null
  visibility_score: number | null
  competition_score: number | null
  optimization_score: number | null
}

export default function DashboardPage() {
  const router = useRouter()

  const [user, setUser] = useState<UserData | null>(null)
  const [profile, setProfile] = useState({
    plan: "Free",
    credits: 5,
  })
  const [listings, setListings] = useState<ListingPreview[]>([])
  const [listingsCount, setListingsCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true

    async function loadDashboard() {
      try {
        setLoading(true)
        setError("")

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push("/login")
          return
        }

        const fullName =
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : "EtsySEO User"

        if (!mounted) return

        setUser({
          id: user.id,
          email: user.email || "",
          fullName,
        })

        const { data: profileData } = await supabase
          .from("profiles")
          .select("plan, credits")
          .eq("id", user.id)
          .maybeSingle<ProfileData>()

        if (profileData && mounted) {
          setProfile({
            plan: profileData.plan || "Free",
            credits:
              typeof profileData.credits === "number"
                ? profileData.credits
                : 5,
          })
        }

        const { count } = await supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)

        if (mounted) {
          setListingsCount(count || 0)
        }

        const { data: listingsData } = await supabase
          .from("listings")
          .select(
            "id, title, created_at, seo_score, visibility_score, competition_score, optimization_score"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(20)

        if (mounted) {
          setListings(listingsData || [])
        }
      } catch (err) {
        console.error("Dashboard load error:", err)

        if (mounted) {
          setError("Dashboard could not load. Please refresh the page.")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      mounted = false
    }
  }, [router])

  const analytics = useMemo(() => {
    const scores = listings
      .map((item) =>
        typeof item.seo_score === "number" ? item.seo_score : 0
      )
      .filter((score) => score > 0)

    const visibilityScores = listings
      .map((item) =>
        typeof item.visibility_score === "number"
          ? item.visibility_score
          : 0
      )
      .filter((score) => score > 0)

    const optimizationScores = listings
      .map((item) =>
        typeof item.optimization_score === "number"
          ? item.optimization_score
          : 0
      )
      .filter((score) => score > 0)

    const averageSeo =
      scores.length > 0
        ? Math.round(
            scores.reduce((total, score) => total + score, 0) / scores.length
          )
        : 0

    const bestSeo = scores.length > 0 ? Math.max(...scores) : 0

    const averageVisibility =
      visibilityScores.length > 0
        ? Math.round(
            visibilityScores.reduce((total, score) => total + score, 0) /
              visibilityScores.length
          )
        : 0

    const averageOptimization =
      optimizationScores.length > 0
        ? Math.round(
            optimizationScores.reduce((total, score) => total + score, 0) /
              optimizationScores.length
          )
        : 0

    return {
      averageSeo,
      bestSeo,
      averageVisibility,
      averageOptimization,
    }
  }, [listings])

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

  if (error) {
    return (
      <main className="dashboardPage">
        <section className="dashboardContent">
          <h1>Dashboard Error</h1>

          <p>{error}</p>

          <button
            type="button"
            className="primaryBtn"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
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

          <Link href="/audit">Audit</Link>

          <Link href="/history">History</Link>

          <Link href="/pricing">Pricing</Link>

          <Link href="/settings">Settings</Link>
        </nav>

        <div className="sidebarUpgrade">
          <span>{profile.plan} Plan</span>

          <h3>{profile.credits} credits left</h3>

          <Link href="/pricing">
            {profile.plan === "Free" ? "Upgrade Pro" : "Manage Plan"}
          </Link>
        </div>
      </aside>

      <section className="dashboardContent">
        <header className="dashboardHeader">
          <div>
            <span>Welcome back, {user?.fullName}</span>

            <h1>Your EtsySEO AI Dashboard</h1>

            <p className="dashboardSubtitle">
              Track credits, listing performance, SEO scores and recent AI
              generations.
            </p>
          </div>

          <div className="dashboardHeaderActions">
            <Link href="/generate" className="primaryBtn">
              Generate Listing
            </Link>

            <Link href="/audit" className="secondaryBtn">
              Audit Listing
            </Link>

            <button type="button" className="secondaryBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="dashboardStats">
          <div className="dashCard">
            <span>Credits Remaining</span>

            <h2>{profile.credits}</h2>

            <p>{profile.plan} plan generations available</p>
          </div>

          <div className="dashCard">
            <span>Listings Generated</span>

            <h2>{listingsCount}</h2>

            <p>Total saved Etsy SEO listings</p>
          </div>

          <div className="dashCard">
            <span>Average SEO Score</span>

            <h2>{analytics.averageSeo || "--"}</h2>

            <p>Average score from recent listings</p>
          </div>

          <div className="dashCard">
            <span>Best SEO Score</span>

            <h2>{analytics.bestSeo || "--"}</h2>

            <p>Highest recent listing score</p>
          </div>

          <div className="dashCard">
            <span>Visibility Score</span>

            <h2>{analytics.averageVisibility || "--"}</h2>

            <p>Average visibility estimate</p>
          </div>

          <div className="dashCard">
            <span>Optimization</span>

            <h2>{analytics.averageOptimization || "--"}</h2>

            <p>Average Etsy-ready quality</p>
          </div>
        </div>

        <section className="dashboardGrid">
          <div className="dashPanel">
            <div className="panelHeader">
              <h3>Recent Listings</h3>

              <Link href="/history">View all</Link>
            </div>

            <div className="recentList">
              {listings.length === 0 ? (
                <div>
                  <strong>No saved listings yet</strong>

                  <span>Your generated listings will appear here soon.</span>
                </div>
              ) : (
                listings.slice(0, 5).map((listing) => (
                  <div key={listing.id}>
                    <strong>{listing.title}</strong>

                    <span>
                      Generated {formatDate(listing.created_at)} • SEO{" "}
                      {listing.seo_score || 0}/100
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashPanel highlightPanel">
            <span>Quick Actions</span>

            <h3>Build better Etsy listings faster</h3>

            <p>
              Generate new SEO listings, audit existing Etsy content, review your
              history or upgrade your plan when you need more credits.
            </p>

            <div className="dashboardQuickActions">
              <Link href="/generate" className="primaryBtn">
                Generate
              </Link>

              <Link href="/audit" className="secondaryBtn">
                Audit
              </Link>

              <Link href="/history" className="secondaryBtn">
                History
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}