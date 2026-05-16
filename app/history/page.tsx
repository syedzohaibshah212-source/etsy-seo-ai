"use client"

import "./style.css"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type ListingItem = {
  id: string
  title: string
  category: string
  tags: string[]
  keywords: string[] | null
  tips: string[] | null
  created_at: string
  description: string
  seo_score: number
  visibility_score: number | null
  competition_score: number | null
  optimization_score: number | null
}

function csvCell(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`
}

export default function HistoryPage() {
  const router = useRouter()

  const [listings, setListings] = useState<ListingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function loadListings() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/login")
          return
        }

        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (!error && data) {
          setListings(data)
        }
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [router])

  const filteredListings = useMemo(() => {
    let filtered = [...listings]

    if (search.trim()) {
      const query = search.toLowerCase()

      filtered = filtered.filter((item) => {
        const tags = (item.tags || []).join(" ").toLowerCase()
        const keywords = (item.keywords || []).join(" ").toLowerCase()

        return (
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          tags.includes(query) ||
          keywords.includes(query)
        )
      })
    }

    if (sortBy === "seo") {
      filtered.sort((a, b) => b.seo_score - a.seo_score)
    }

    if (sortBy === "visibility") {
      filtered.sort(
        (a, b) => (b.visibility_score || 0) - (a.visibility_score || 0)
      )
    }

    if (sortBy === "competition") {
      filtered.sort(
        (a, b) => (b.competition_score || 0) - (a.competition_score || 0)
      )
    }

    if (sortBy === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      )
    }

    if (sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
    }

    return filtered
  }, [listings, search, sortBy])

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  async function deleteListing(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    )

    if (!confirmed) return

    const { error } = await supabase.from("listings").delete().eq("id", id)

    if (!error) {
      setListings((prev) => prev.filter((listing) => listing.id !== id))
    }
  }

  function copyListing(item: ListingItem) {
    const content = `
EtsySEO AI Listing

Title:
${item.title}

Category:
${item.category}

SEO Score:
${item.seo_score}/100

Visibility Score:
${item.visibility_score || 0}/100

Competition Score:
${item.competition_score || 0}/100

Optimization Score:
${item.optimization_score || 0}/100

Tags:
${(item.tags || []).join(", ")}

Keyword Opportunities:
${(item.keywords || []).join(", ")}

SEO Tips:
${(item.tips || []).join("\n")}

Description:
${item.description}
`

    navigator.clipboard.writeText(content)
  }

  function duplicateListing(item: ListingItem) {
    navigator.clipboard.writeText(item.title)
  }

  function reOptimize(item: ListingItem) {
    navigator.clipboard.writeText(item.title)
    router.push("/generate")
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  function toggleExpanded(id: string) {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  function exportCSV() {
    if (filteredListings.length === 0) return

    const headers = [
      "Title",
      "Category",
      "SEO Score",
      "Visibility Score",
      "Competition Score",
      "Optimization Score",
      "Tags",
      "Keywords",
      "Tips",
      "Description",
      "Created",
    ]

    const rows = filteredListings.map((item) => [
      csvCell(item.title),
      csvCell(item.category),
      item.seo_score,
      item.visibility_score || 0,
      item.competition_score || 0,
      item.optimization_score || 0,
      csvCell((item.tags || []).join(", ")),
      csvCell((item.keywords || []).join(", ")),
      csvCell((item.tips || []).join(" | ")),
      csvCell(item.description),
      csvCell(formatDate(item.created_at)),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.setAttribute("download", "etsyseo-history.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <main className="historyPage">
        <section className="historyHero">
          <h1>Loading history...</h1>
        </section>
      </main>
    )
  }

  return (
    <main className="historyPage">
      <nav className="historyNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/generate">Generator</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/settings">Settings</Link>
        </div>
      </nav>

      <section className="historyHero">
        <span className="heroBadge">Saved Listings</span>

        <h1>
          Your generated <span>Etsy SEO history</span>
        </h1>

        <p>
          View previous listings, keyword opportunities, SEO scores and saved
          optimization notes.
        </p>

        <div className="historyHeroActions">
          <Link href="/generate" className="primaryBtn">
            Generate New Listing
          </Link>

          <button onClick={exportCSV} className="historyExportBtn">
            Export CSV
          </button>
        </div>
      </section>

      <section className="historyControls">
        <input
          type="text"
          placeholder="Search listings, tags, keywords or categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="seo">Highest SEO Score</option>
          <option value="visibility">Highest Visibility</option>
          <option value="competition">Best Opportunity</option>
        </select>
      </section>

      <section className="historyGrid">
        {filteredListings.length === 0 ? (
          <div className="emptyResult premiumEmpty">
            <div className="emptyGlow"></div>

            <h3>No saved listings yet</h3>

            <p>
              Your generated Etsy SEO listings will appear here after generation.
            </p>

            <div className="emptyFeatures">
              <span>SEO Titles</span>
              <span>Keyword Tags</span>
              <span>SEO Scores</span>
              <span>AI Optimization</span>
            </div>
          </div>
        ) : (
          filteredListings.map((item) => {
            const isExpanded = expanded[item.id]
            const isFavorite = favorites[item.id]

            return (
              <article className="historyCard premiumHistoryCard" key={item.id}>
                <div className="historyCardTop">
                  <div>
                    <span>{formatDate(item.created_at)}</span>
                    <h3>{item.title}</h3>
                  </div>

                  <div className="historyActions">
                    <button onClick={() => toggleFavorite(item.id)}>
                      {isFavorite ? "★ Saved" : "☆ Favorite"}
                    </button>

                    <button onClick={() => copyListing(item)}>Copy</button>

                    <button onClick={() => duplicateListing(item)}>
                      Duplicate
                    </button>

                    <button onClick={() => reOptimize(item)}>
                      Re-Optimize
                    </button>

                    <button onClick={() => deleteListing(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>

                <p className="historyCategory">{item.category}</p>

                <div className="historyScoreGrid">
                  <div>
                    <span>SEO</span>
                    <strong>{item.seo_score}/100</strong>
                  </div>

                  <div>
                    <span>Visibility</span>
                    <strong>{item.visibility_score || 0}/100</strong>
                  </div>

                  <div>
                    <span>Competition</span>
                    <strong>{item.competition_score || 0}/100</strong>
                  </div>

                  <div>
                    <span>Optimization</span>
                    <strong>{item.optimization_score || 0}/100</strong>
                  </div>
                </div>

                <div className="historyTags">
                  {(item.tags || []).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                {(item.keywords || []).length > 0 && (
                  <div className="historySectionBlock">
                    <strong>Keyword Opportunities</strong>

                    <div className="historyTags">
                      {(item.keywords || []).slice(0, 8).map((keyword) => (
                        <span key={keyword}>{keyword}</span>
                      ))}
                    </div>
                  </div>
                )}

                {(item.tips || []).length > 0 && (
                  <div className="historySectionBlock">
                    <strong>SEO Tips</strong>

                    <ul className="historyTips">
                      {(item.tips || []).slice(0, 4).map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div
                  className={
                    isExpanded
                      ? "historyDescription expanded"
                      : "historyDescription"
                  }
                >
                  {item.description}
                </div>

                {item.description.length > 380 && (
                  <button
                    type="button"
                    className="readMoreBtn"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </article>
            )
          })
        )}
      </section>
    </main>
  )
}