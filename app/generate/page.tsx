"use client"

import "./style.css"

import { useState } from "react"
import Link from "next/link"
import { jsPDF } from "jspdf"
import UploadBox from "@/components/generate/UploadBox"
import type { ListingResult } from "@/types/listing"

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

export default function GeneratePage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [competitorTitle, setCompetitorTitle] = useState("")
  const [method, setMethod] = useState(seoMethods[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<ListingResult | null>(null)

  function handleImageChange(file: File) {
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
    setError("")
  }

  async function generateListing() {
    if (!imageFile) {
      setError("Please upload a product image first.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()

      formData.append("image", imageFile)
      formData.append("competitorTitle", competitorTitle)
      formData.append("method", method)

      const response = await fetch("/api/generate-listing", {
        method: "POST",
        body: formData,
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to generate listing.")
      }

      setResult(json.data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating."
      )
    } finally {
      setLoading(false)
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

Optimized Title:
${result.title}

Category:
${result.category}

Etsy Tags:
${result.tags.join(", ")}

Description:
${result.description}

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

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    const margin = 14

    let y = 18

    function addTitle(text: string) {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(18)

      doc.text(text, margin, y)

      y += 12
    }

    function addSection(title: string, content: string) {
      if (y > pageHeight - 30) {
        doc.addPage()
        y = 18
      }

      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)

      doc.text(title, margin, y)

      y += 7

      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)

      const lines = doc.splitTextToSize(
        content,
        pageWidth - margin * 2
      )

      lines.forEach((line: string) => {
        if (y > pageHeight - 15) {
          doc.addPage()
          y = 18
        }

        doc.text(line, margin, y)

        y += 5
      })

      y += 6
    }

    addTitle("EtsySEO AI Listing Report")

    addSection("SEO Score", `${result.seoScore}/100`)
    addSection("Optimized Title", result.title)
    addSection("Category", result.category)
    addSection("Etsy Tags", result.tags.join(", "))
    addSection("Description", result.description)
    addSection("Score Breakdown", result.scoreBreakdown)
    addSection("Score Feedback", result.scoreFeedback)

    doc.save("etsy-seo-listing-report.pdf")
  }

  function clearAll() {
    setImageFile(null)
    setPreview(null)
    setCompetitorTitle("")
    setMethod(seoMethods[0])
    setError("")
    setResult(null)
  }

  return (
    <main className="generatePage">
      <nav className="generateNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/">Home</Link>

          <Link href="/pricing">Pricing</Link>

          <Link href="/history">History</Link>

          <Link href="/settings">Settings</Link>

          <Link href="/dashboard" className="navCta">
            Dashboard
          </Link>
        </div>
      </nav>

      <section className="generateHero">
        <div className="heroBadge">
          AI Vision Etsy SEO Engine
        </div>

        <h1>Generate Etsy PNG SEO Listings</h1>

        <p>
          Upload a PNG design, choose one SEO strategy,
          and generate a title, description, tags,
          category and SEO score.
        </p>
      </section>

      <section className="generatorGrid">
        <div className="generatorPanel">
          <h2>Product Input</h2>

          <UploadBox
            preview={preview}
            onImageChange={handleImageChange}
          />

          <label className="fieldGroup">
            <span>Competitor Etsy Title Optional</span>

            <textarea
              value={competitorTitle}
              onChange={(e) =>
                setCompetitorTitle(e.target.value)
              }
              placeholder="Paste competitor Etsy title here..."
            />
          </label>

          <label className="fieldGroup">
            <span>SEO Method</span>

            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              {seoMethods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          {error && (
            <p className="generateError">{error}</p>
          )}

          <div className="generateActions">
            <button
              onClick={generateListing}
              disabled={loading}
            >
              {loading
                ? "Analyzing PNG..."
                : "Generate Listing"}
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="clearBtn"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="generatorPanel">
          <h2>SEO Listing Result</h2>

          {!result ? (
            <div className="emptyResult">
              <h3>No listing generated yet</h3>

              <p>
                Your optimized Etsy title,
                description, tags, category and SEO
                score will appear here.
              </p>
            </div>
          ) : (
            <div className="resultBox compactResult">
              <div className="scoreCard">
                <span>SEO Score</span>

                <h3>{result.seoScore}/100</h3>

                <p>{result.scoreFeedback}</p>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Optimized Title</span>

                  <p>{result.title}</p>
                </div>

                <button
                  onClick={() =>
                    copyText(result.title)
                  }
                >
                  Copy
                </button>
              </div>

              <div className="resultItem">
                <div>
                  <span>Category</span>

                  <p>{result.category}</p>
                </div>

                <button
                  onClick={() =>
                    copyText(result.category)
                  }
                >
                  Copy
                </button>
              </div>

              <div className="tagsResult">
                <div className="tagsTop">
                  <span>Etsy Tags</span>

                  <button
                    onClick={() =>
                      copyText(
                        result.tags.join(", ")
                      )
                    }
                  >
                    Copy Tags
                  </button>
                </div>

                <div className="tagList">
                  {result.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="resultItem large descriptionCard">
                <div>
                  <span>SEO Description</span>

                  <p>{result.description}</p>
                </div>

                <button
                  onClick={() =>
                    copyText(result.description)
                  }
                >
                  Copy
                </button>
              </div>

              <div className="resultItem large">
                <div>
                  <span>Score Breakdown</span>

                  <p>{result.scoreBreakdown}</p>
                </div>
              </div>

              <div className="resultButtons">
                <button onClick={copyAll}>
                  Copy Full Listing
                </button>

                <button onClick={downloadPDF}>
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}