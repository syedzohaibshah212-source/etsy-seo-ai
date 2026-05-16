"use client"

import "./style.css"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { jsPDF } from "jspdf"
import UploadBox from "@/components/generate/UploadBox"
import type { ListingResult } from "@/types/listing"
import { supabase } from "@/lib/supabase"

const seoMethods = [
  "METHOD 1: Exact Buyer Intent + Long-Tail Relevance",
  "METHOD 2: Competitor Gap + Phrase Pattern Mining",
  "METHOD 3: Low-Competition Micro-Niche Angle",
  "METHOD 4: Click-Through Thumbnail + Search Snippet Strategy",
  "METHOD 5: Conversion Objection Removal",
  "METHOD 6: Occasion + Recipient Positioning",
  "METHOD 7: Seasonal Trend Refresh",
  "METHOD 8: Google SEO + Etsy Internal Hybrid",
  "METHOD 9: Etsy Stats Feedback Loop",
  "METHOD 10: Portfolio Cannibalization Avoidance",
  "METHOD 11: Paid-Organic Bridge",
  "METHOD 12: IP-Safe White Space Strategy",
]

function safeArray(value: string[] | undefined) {
  return Array.isArray(value) ? value : []
}

function safeScore(value: number | undefined) {
  return typeof value === "number" ? value : 0
}

export default function GeneratePage() {
  const router = useRouter()

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [competitorTitle, setCompetitorTitle] = useState("")
  const [method, setMethod] = useState(seoMethods[0])
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState("")
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState("")
  const [result, setResult] = useState<ListingResult | null>(null)
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null)
  const [plan, setPlan] = useState("Free")

  const availableMethods = useMemo(() => {
    if (plan === "Pro" || plan === "Agency") return seoMethods

    return seoMethods.slice(0, 3)
  }, [plan])

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data } = await supabase
        .from("profiles")
        .select("plan, credits")
        .eq("id", user.id)
        .maybeSingle()

      const userPlan =
        typeof data?.plan === "string" && data.plan ? data.plan : "Free"

      setPlan(userPlan)
      setRemainingCredits(typeof data?.credits === "number" ? data.credits : 5)

      if (userPlan === "Free" && !seoMethods.slice(0, 3).includes(method)) {
        setMethod(seoMethods[0])
      }

      setPageLoading(false)
    }

    loadProfile()
  }, [router, method])

  function handleImageChange(file: File) {
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
    setError("")
    setResult(null)
  }

  async function generateListing() {
    if (!imageFile) {
      setError("Please upload a product image first.")
      return
    }

    if (!availableMethods.includes(method)) {
      setError("This SEO method is available on Pro only.")
      return
    }

    setLoading(true)
    setLoadingStep("Analyzing product image...")
    setError("")

    const timers = [
      setTimeout(
        () => setLoadingStep("Finding Etsy keyword opportunities..."),
        1200
      ),
      setTimeout(() => setLoadingStep("Generating SEO title..."), 2400),
      setTimeout(() => setLoadingStep("Writing description..."), 3600),
      setTimeout(() => setLoadingStep("Creating 13 Etsy tags..."), 4800),
      setTimeout(() => setLoadingStep("Calculating SEO score..."), 6000),
    ]

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.access_token) {
        setError("Please login before generating a listing.")
        router.push("/login")
        return
      }

      const formData = new FormData()

      formData.append("image", imageFile)
      formData.append("competitorTitle", competitorTitle)
      formData.append("method", method)

      const response = await fetch("/api/generate-listing", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to generate listing.")
      }

      setResult(json.data)

      if (typeof json.remainingCredits === "number") {
        setRemainingCredits(json.remainingCredits)
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating."
      )
    } finally {
      timers.forEach(clearTimeout)
      setLoading(false)
      setLoadingStep("")
    }
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text)
  }

  function getFullReport() {
    if (!result) return ""

    return `
EtsySEO AI Listing Report

SEO Score:
${result.seoScore}/100

Visibility Score:
${safeScore(result.visibilityScore)}/100

Competition Score:
${safeScore(result.competitionScore)}/100

Optimization Score:
${safeScore(result.optimizationScore)}/100

Optimized Title:
${result.title}

Category:
${result.category}

Etsy Tags:
${safeArray(result.tags).join(", ")}

Keyword Opportunities:
${safeArray(result.keywords).join(", ")}

Description:
${result.description}

SEO Tips:
${safeArray(result.tips).join("\n")}

Score Breakdown:
${result.scoreBreakdown}

Score Feedback:
${result.scoreFeedback}
`
  }

  function copyAll() {
    copyText(getFullReport())
  }

  function downloadPDF() {
    if (!result) return

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text("EtsySEO AI Listing Report", 20, 20)

    doc.setFontSize(12)
    doc.text(`SEO Score: ${result.seoScore}/100`, 20, 40)
    doc.text(
      `Visibility Score: ${safeScore(result.visibilityScore)}/100`,
      20,
      50
    )
    doc.text(
      `Competition Score: ${safeScore(result.competitionScore)}/100`,
      20,
      60
    )
    doc.text(
      `Optimization Score: ${safeScore(result.optimizationScore)}/100`,
      20,
      70
    )

    doc.text(`Title: ${result.title}`, 20, 88, { maxWidth: 170 })
    doc.text(`Category: ${result.category}`, 20, 112)

    doc.text(`Tags: ${safeArray(result.tags).join(", ")}`, 20, 126, {
      maxWidth: 170,
    })

    doc.text(`Keywords: ${safeArray(result.keywords).join(", ")}`, 20, 146, {
      maxWidth: 170,
    })

    doc.text(`Description: ${result.description}`, 20, 170, {
      maxWidth: 170,
    })

    doc.save("etsy-seo-listing-report.pdf")
  }

  function clearAll() {
    setImageFile(null)
    setPreview(null)
    setCompetitorTitle("")
    setMethod(availableMethods[0])
    setError("")
    setResult(null)
  }

  if (pageLoading) {
    return (
      <main className="generatePage">
        <section className="generateHero">
          <h1>Loading generator...</h1>
        </section>
      </main>
    )
  }

  return (
    <main className="generatePage">
      <nav className="generateNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/audit">Audit</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/history">History</Link>
          <Link href="/settings">Settings</Link>

          <Link href="/dashboard" className="navCta">
            Dashboard
          </Link>
        </div>
      </nav>

      <section className="generateHero">
        <div className="heroBadge">AI Vision Etsy SEO Engine</div>

        <h1>Generate Etsy PNG SEO Listings</h1>

        <p>
          Upload a PNG design, choose one SEO strategy, and generate a premium
          Etsy SEO title, description, tags, keywords and ranking score.
        </p>
      </section>

      <section className="generatorGrid">
        <div className="generatorPanel">
          <h2>Product Input</h2>

          <p className="generateError">
            Plan: {plan} • Credits: {remainingCredits ?? 0}
          </p>

          {plan === "Free" && (
            <p className="generateError">
              Free plan includes only first 3 SEO methods. Upgrade to Pro for
              all 12 methods.
            </p>
          )}

          <UploadBox preview={preview} onImageChange={handleImageChange} />

          <label className="fieldGroup">
            <span>Competitor Etsy Title Optional</span>

            <textarea
              value={competitorTitle}
              onChange={(e) => setCompetitorTitle(e.target.value)}
              placeholder="Paste competitor Etsy title here..."
            />
          </label>

          <label className="fieldGroup">
            <span>SEO Method</span>

            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              {availableMethods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          {plan === "Free" && (
            <Link href="/pricing" className="primaryBtn">
              Unlock All 12 Methods
            </Link>
          )}

          {error && <p className="generateError">{error}</p>}

          <div className="generateActions">
            <button onClick={generateListing} disabled={loading}>
              {loading ? "AI Optimizing..." : "Generate Listing"}
            </button>

            <button type="button" onClick={clearAll} className="clearBtn">
              Clear All
            </button>
          </div>
        </div>

        <div className="generatorPanel">
          <h2>SEO Listing Result</h2>

          {loading ? (
            <div className="aiLoadingBox">
              <div className="aiLoader"></div>

              <h3>AI SEO Engine Working...</h3>

              <p>{loadingStep}</p>

              <div className="loadingSteps">
                <span>Analyzing Product</span>
                <span>Finding Keywords</span>
                <span>Writing Title</span>
                <span>Creating Tags</span>
                <span>SEO Scoring</span>
              </div>
            </div>
          ) : !result ? (
            <div className="emptyResult premiumEmpty">
              <div className="emptyGlow"></div>

              <h3>AI SEO Generator Ready</h3>

              <p>
                Upload your Etsy PNG design and generate a premium
                SEO-optimized title, tags, description, keyword opportunities
                and ranking score.
              </p>

              <div className="emptyFeatures">
                <span>SEO Titles</span>
                <span>13 Etsy Tags</span>
                <span>Keyword Opportunities</span>
                <span>AI SEO Score</span>
              </div>
            </div>
          ) : (
            <div className="resultBox compactResult">
              <div className="scoreCard premiumScore">
                <span>SEO Score</span>
                <h3>{result.seoScore}/100</h3>
                <p>{result.scoreFeedback}</p>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Visibility Score</span>
                  <p>
                    {safeScore(result.visibilityScore)}/100 estimated search
                    discoverability
                  </p>
                </div>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Competition Score</span>
                  <p>
                    {safeScore(result.competitionScore)}/100 niche opportunity
                    score
                  </p>
                </div>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Optimization Score</span>
                  <p>
                    {safeScore(result.optimizationScore)}/100 Etsy-ready
                    optimization quality
                  </p>
                </div>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Optimized Title</span>
                  <p>{result.title}</p>
                </div>

                <button onClick={() => copyText(result.title)}>Copy</button>
              </div>

              <div className="resultItem">
                <div>
                  <span>Category</span>
                  <p>{result.category}</p>
                </div>

                <button onClick={() => copyText(result.category)}>Copy</button>
              </div>

              <div className="tagsResult">
                <div className="tagsTop">
                  <span>13 Etsy Tags</span>

                  <button
                    onClick={() =>
                      copyText(safeArray(result.tags).join(", "))
                    }
                  >
                    Copy Tags
                  </button>
                </div>

                <div className="tagList premiumTags">
                  {safeArray(result.tags).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="resultItem large descriptionCard">
                <div>
                  <span>SEO Description</span>
                  <p>{result.description}</p>
                </div>

                <button onClick={() => copyText(result.description)}>
                  Copy
                </button>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Keyword Opportunities</span>

                  <div className="tagList premiumTags">
                    {safeArray(result.keywords).length > 0
                      ? safeArray(result.keywords).map((keyword) => (
                          <span key={keyword}>{keyword}</span>
                        ))
                      : safeArray(result.tags)
                          .slice(0, 6)
                          .map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>

              <div className="resultItem large">
                <div>
                  <span>SEO Optimization Tips</span>

                  <ul className="tipsList">
                    {safeArray(result.tips).length > 0 ? (
                      safeArray(result.tips).map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))
                    ) : (
                      <>
                        <li>
                          Use all 13 Etsy tags for maximum discoverability.
                        </li>
                        <li>
                          Keep important keywords near the beginning of title.
                        </li>
                        <li>Use long-tail buyer intent phrases.</li>
                        <li>Refresh seasonal keywords regularly.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Score Breakdown</span>
                  <p>{result.scoreBreakdown}</p>
                </div>
              </div>

              <div className="resultButtons">
                <button onClick={copyAll}>Copy Full Listing</button>
                <button onClick={downloadPDF}>Download PDF</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}