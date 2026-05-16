"use client"

import "./style.css"

import { useState } from "react"
import Link from "next/link"

export default function AuditPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)

  async function analyzeListing() {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 3000)
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
        </div>
      </nav>

      <section className="auditHero">
        <span className="heroBadge">
          Etsy Listing Audit Engine
        </span>

        <h1>
          Analyze Your Existing <span>Etsy Listing SEO</span>
        </h1>

        <p>
          Paste your Etsy listing title, description and tags to
          discover weaknesses, improve SEO visibility and generate
          optimization suggestions.
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
              placeholder="Paste your Etsy title..."
            />
          </label>

          <label className="fieldGroup">
            <span>Etsy Description</span>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste your Etsy description..."
              rows={10}
            />
          </label>

          <label className="fieldGroup">
            <span>Etsy Tags</span>

            <textarea
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3..."
            />
          </label>

          <button
            className="primaryBtn auditBtn"
            onClick={analyzeListing}
            disabled={loading}
          >
            {loading
              ? "Analyzing Etsy Listing..."
              : "Analyze Listing SEO"}
          </button>
        </div>

        <div className="auditCard resultCard">
          {loading ? (
            <div className="auditLoading">
              <div className="aiLoader"></div>

              <h3>AI SEO Audit Running...</h3>

              <p>
                Checking title optimization, tags, readability,
                keyword quality and Etsy ranking opportunities.
              </p>
            </div>
          ) : (
            <>
              <div className="scoreCard premiumScore">
                <span>SEO Audit Score</span>

                <h3>82/100</h3>

                <p>
                  Strong listing foundation but title and tags can
                  be improved for higher Etsy visibility.
                </p>
              </div>

              <div className="auditSection">
                <strong>Problems Found</strong>

                <ul>
                  <li>Title missing strong long-tail keywords</li>
                  <li>Only partial buyer intent optimization</li>
                  <li>Tags are too generic</li>
                  <li>Description opening is weak</li>
                </ul>
              </div>

              <div className="auditSection">
                <strong>Optimization Suggestions</strong>

                <ul>
                  <li>Add searchable long-tail keyword phrases</li>
                  <li>Improve first 50 title characters</li>
                  <li>Add niche-specific tags</li>
                  <li>Improve conversion-focused wording</li>
                </ul>
              </div>

              <div className="auditSection">
                <strong>Recommended SEO Keywords</strong>

                <div className="historyTags">
                  <span>etsy png</span>
                  <span>digital download</span>
                  <span>png design</span>
                  <span>shirt graphic</span>
                  <span>gift idea</span>
                  <span>trendy png</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}