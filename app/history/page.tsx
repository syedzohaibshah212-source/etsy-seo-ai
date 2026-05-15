"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type ListingItem = {
  id: string
  title: string
  category: string
  tags: string[]
  created_at: string
  description: string
  seo_score: number
}

export default function HistoryPage() {
  const router = useRouter()

  const [listings, setListings] = useState<ListingItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadListings() {
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

      setLoading(false)
    }

    loadListings()
  }, [router])

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

    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", id)

    if (!error) {
      setListings((prev) =>
        prev.filter((listing) => listing.id !== id)
      )
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

Tags:
${item.tags.join(", ")}

Description:
${item.description}
`

    navigator.clipboard.writeText(content)
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
          View your previous Etsy SEO listings, tags, categories and generated
          product ideas.
        </p>

        <Link href="/generate" className="primaryBtn">
          Generate New Listing
        </Link>
      </section>

      <section className="historyGrid">
        {listings.length === 0 ? (
          <div className="emptyResult">
            <h3>No saved listings yet</h3>

            <p>
              Your generated Etsy SEO listings will appear here after generation.
            </p>
          </div>
        ) : (
          listings.map((item) => (
            <article className="historyCard" key={item.id}>
              <div className="historyCardTop">
                <div>
                  <span>{formatDate(item.created_at)}</span>

                  <h3>{item.title}</h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <button onClick={() => copyListing(item)}>
                    Copy
                  </button>

                  <button onClick={() => deleteListing(item.id)}>
                    Delete
                  </button>
                </div>
              </div>

              <p>{item.category}</p>

              <div className="historyTags">
                {item.tags?.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div
                style={{
                  marginTop: "16px",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {item.description}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  )
}