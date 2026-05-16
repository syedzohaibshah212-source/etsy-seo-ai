"use client"

import "./style.css"

import { useState } from "react"
import Link from "next/link"

type AuditResult = {
  seoScore: number
  visibilityScore: number
  competitionScore: number
  optimizationScore: number
  weaknesses: string[]
  improvedTitle: string
  improvedDescription: string
  improvedTags: string[]
  tips: string[]
}

export default function AuditPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<AuditResult | null>(null)

  async function analyzeListing() {
    setError("")
    setResult(null)

    if (!title.trim()) {
      setError("Please paste your Etsy title first.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/audit-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Audit failed.")
      }

      setResult(json.data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while auditing this listing."
      )
    } finally {
      setLoading(false)
    }
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text)
  }

  function clearAll() {
    setTitle("")
    setDescription("")
    setTags("")
    setResult(null)
    setError("")
  }

  return (
    <main className="auditPage">
      <nav className="auditNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/generate">Generator</Link>
          <Link href="/audit">Audit</Link>
          <Link href="/history">History</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/settings">Settings</Link>
        </div>
      </nav>

      <section className="auditHero">
        <span className="heroBadge">Etsy Listing Audit Engine</span>

        <h1>
          Analyze Your Existing <span>Etsy Listing SEO</span>
        </h1>

        <p>
          Paste your current Etsy title, description and tags. EtsySEO AI will
          score the listing, find weak spots, rewrite the title, improve tags
          and suggest conversion-focused SEO fixes.
        </p>
      </section>

      <section className="auditContainer">
        <div className="auditCard">
          <h2>Existing Etsy Listing</h2>

          <label className="fieldGroup">
            <span>Etsy Title</span>

            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Paste your existing Etsy title..."
            />
          </label>

          <label className="fieldGroup">
            <span>Etsy Description</span>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste your existing Etsy description..."
              rows={10}
            />
          </label>

          <label className="fieldGroup">
            <span>Etsy Tags Comma Separated</span>

            <textarea
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="png design, digital download, printable art..."
            />
          </label>

          {error && <p className="generateError">{error}</p>}

          <div className="generateActions">
            <button
              className="primaryBtn auditBtn"
              onClick={analyzeListing}
              disabled={loading}
            >
              {loading ? "Auditing Listing..." : "Analyze Listing SEO"}
            </button>

            <button type="button" className="clearBtn" onClick={clearAll}>
              Clear
            </button>
          </div>
        </div>

        <div className="auditCard resultCard">
          {loading ? (
            <div className="auditLoading">
              <div className="aiLoader"></div>

              <h3>AI SEO Audit Running...</h3>

              <p>
                Checking title quality, tag coverage, keyword intent,
                description clarity, digital product safety and Etsy
                optimization score.
              </p>
            </div>
          ) : !result ? (
            <div className="emptyResult premiumEmpty">
              <div className="emptyGlow"></div>

              <h3>Audit Ready</h3>

              <p>
                Paste an existing Etsy listing to get a real SEO audit,
                improved title, optimized tags and practical fixes.
              </p>

              <div className="emptyFeatures">
                <span>SEO Score</span>
                <span>Weaknesses</span>
                <span>Better Title</span>
                <span>13 Tags</span>
              </div>
            </div>
          ) : (
            <div className="resultBox compactResult">
              <div className="scoreCard premiumScore">
                <span>SEO Audit Score</span>

                <h3>{result.seoScore}/100</h3>

                <p>
                  Visibility {result.visibilityScore}/100 • Competition{" "}
                  {result.competitionScore}/100 • Optimization{" "}
                  {result.optimizationScore}/100
                </p>
              </div>

              <div className="historyScoreGrid">
                <div>
                  <span>Visibility</span>
                  <strong>{result.visibilityScore}/100</strong>
                </div>

                <div>
                  <span>Competition</span>
                  <strong>{result.competitionScore}/100</strong>
                </div>

                <div>
                  <span>Optimization</span>
                  <strong>{result.optimizationScore}/100</strong>
                </div>

                <div>
                  <span>SEO</span>
                  <strong>{result.seoScore}/100</strong>
                </div>
              </div>

              <div className="auditSection">
                <strong>Problems Found</strong>

                <ul>
                  {result.weaknesses.map((weakness) => (
                    <li key={weakness}>{weakness}</li>
                  ))}
                </ul>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Improved Title</span>
                  <p>{result.improvedTitle}</p>
                </div>

                <button onClick={() => copyText(result.improvedTitle)}>
                  Copy
                </button>
              </div>

              <div className="resultItem large descriptionCard">
                <div>
                  <span>Improved Description</span>
                  <p>{result.improvedDescription}</p>
                </div>

                <button onClick={() => copyText(result.improvedDescription)}>
                  Copy
                </button>
              </div>

              <div className="tagsResult">
                <div className="tagsTop">
                  <span>Improved Etsy Tags</span>

                  <button
                    onClick={() => copyText(result.improvedTags.join(", "))}
                  >
                    Copy Tags
                  </button>
                </div>

                <div className="tagList premiumTags">
                  {result.improvedTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="auditSection">
                <strong>SEO Tips</strong>

                <ul>
                  {result.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="resultButtons">
                <button
                  onClick={() =>
                    copyText(`
Improved Etsy Listing

SEO Score:
${result.seoScore}/100

Improved Title:
${result.improvedTitle}

Improved Tags:
${result.improvedTags.join(", ")}

Improved Description:
${result.improvedDescription}

Weaknesses:
${result.weaknesses.join("\n")}

Tips:
${result.tips.join("\n")}
`)
                  }
                >
                  Copy Full Audit
                </button>

                <button
                  onClick={() => {
                    setTitle(result.improvedTitle)
                    setDescription(result.improvedDescription)
                    setTags(result.improvedTags.join(", "))
                  }}
                >
                  Use Improved Version
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}