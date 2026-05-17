import { NextResponse } from "next/server"
import { generateAIListing } from "@/lib/ai/generateListing"
import { calculateSeoScore } from "@/lib/seo/calculateSeoScore"

type AuditBody = {
  title?: string
  description?: string
  tags?: string[]
}

type AuditData = {
  seoScore?: number
  visibilityScore?: number
  competitionScore?: number
  optimizationScore?: number
  weaknesses?: unknown[]
  improvedTitle?: string
  improvedDescription?: string
  improvedTags?: unknown[]
  tips?: unknown[]
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function cleanTags(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean)
    .map((tag) => (tag.length > 20 ? tag.slice(0, 20).trim() : tag))
    .slice(0, 13)
}

function parseAIResponse(response: string) {
  const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  return JSON.parse(cleaned)
}

function toScore(value: unknown) {
  const score = Number(value)

  if (Number.isNaN(score)) return 0
  if (score < 0) return 0
  if (score > 100) return 100

  return Math.round(score)
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
}

function normalizeImprovedTags(value: unknown, fallback: string[]) {
  const tags = toStringArray(value)
    .map((tag) => tag.toLowerCase())
    .map((tag) => (tag.length > 20 ? tag.slice(0, 20).trim() : tag))
    .filter(Boolean)

  const unique = Array.from(new Set(tags))

  const fallbackTags = fallback.length
    ? fallback
    : [
        "png design",
        "digital png",
        "etsy printable",
        "craft supply",
        "small business",
        "print design",
        "download file",
        "graphic design",
        "seller tools",
        "digital design",
        "creative png",
        "product mockup",
        "etsy seo",
      ]

  for (const tag of fallbackTags) {
    if (unique.length >= 13) break

    const cleaned = tag.length > 20 ? tag.slice(0, 20).trim() : tag

    if (!unique.includes(cleaned)) {
      unique.push(cleaned)
    }
  }

  while (unique.length < 13) {
    unique.push(`etsy tag ${unique.length + 1}`)
  }

  return unique.slice(0, 13)
}

function fallbackAudit(title: string, description: string, tags: string[]) {
  const seo = calculateSeoScore({
    title,
    description,
    tags,
    keywords: tags,
  })

  const improvedTags = normalizeImprovedTags(tags, tags)

  return {
    seoScore: seo.seoScore,
    visibilityScore: seo.visibilityScore,
    competitionScore: seo.competitionScore,
    optimizationScore: seo.optimizationScore,
    weaknesses: [
      "Title may need stronger buyer-intent long-tail keywords.",
      "Tags should use all 13 Etsy tag slots with specific search phrases.",
      "Description should clearly explain digital product details and buyer expectations.",
      "Opening paragraph should include the strongest keyword phrase naturally.",
    ],
    improvedTitle: `${title} PNG Digital Download, Etsy Design File`.slice(
      0,
      140
    ),
    improvedDescription: `${title}

This is a digital PNG design file for Etsy sellers, crafters, small business owners and creative projects.

No physical item is included.

Use this design for suitable digital projects, product mockups, printable-style artwork or creative business workflows. Please verify file size, DPI, dimensions, background type, usage rights and software compatibility before publishing.

Before using this listing, review your title, tags and description to make sure they accurately match the product and do not include protected brand names, characters, slogans or trademarks.`,
    improvedTags,
    tips:
      seo.tips.length > 0
        ? seo.tips
        : [
            "Put the strongest buyer-intent keyword near the beginning of the title.",
            "Use all 13 Etsy tags with specific, non-repetitive phrases.",
            "Add clear digital product wording and include that no physical item is included.",
            "Avoid broad generic tags when a niche-specific phrase is available.",
          ],
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AuditBody

    const title = cleanText(body.title)
    const description = cleanText(body.description)
    const tags = cleanTags(body.tags)

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required.",
        },
        { status: 400 }
      )
    }

    const prompt = `
You are EtsySEO AI, a senior Etsy SEO auditor, marketplace keyword strategist, conversion copywriter, and digital product listing optimizer.

Audit the existing Etsy listing below and rewrite it into a stronger Etsy-ready version.

CURRENT LISTING:
Title:
${title}

Description:
${description || "Not provided"}

Tags:
${tags.join(", ") || "Not provided"}

AUDIT GOALS:
Evaluate the listing for:
- Etsy title structure
- buyer intent
- keyword clarity
- long-tail search phrases
- tag quality
- tag compliance
- digital product clarity
- conversion clarity
- readability
- niche specificity
- IP/trademark safety
- missing buyer objections
- weak opening description
- generic or repeated keywords

IMPORTANT:
Do not claim real Etsy search volume, sales data, ranking guarantees, bestseller status, CTR, or conversion rate.
Do not invent file specs such as DPI, dimensions, transparent background, commercial license, instant download, SVG/PDF/JPG formats, or software compatibility.
If details are unknown, say they are unspecified.
If product type is unclear, keep wording safe and general.
If this appears to be a digital product, clearly include: "No physical item is included."

TITLE REWRITE RULES:
- improvedTitle must be max 140 characters.
- Put the strongest buyer search phrase first.
- Include PNG or digital design naturally when relevant.
- Avoid keyword stuffing.
- Avoid duplicate keyword ideas.
- Do not imply physical delivery.
- Avoid protected brand names, celebrities, teams, franchises, lyrics, slogans, and character names unless rights are confirmed.

TAG REWRITE RULES:
- improvedTags must contain exactly 13 Etsy tags.
- Every tag must be 20 characters or fewer.
- No duplicates.
- No near-duplicates.
- Mix format, subject, style, audience, use case, occasion if relevant, and long-tail buyer phrases.
- Avoid protected IP terms.
- Avoid physical product terms unless phrased safely as a design/graphic.

DESCRIPTION REWRITE RULES:
- improvedDescription should be 350 to 700 words.
- Write short paragraphs.
- Include light bullets.
- Include buyer benefits.
- Include usage ideas.
- Include digital product clarity.
- Include verify-before-purchase/publish notes.
- Do not overstuff keywords.
- Make it sound premium and useful, not robotic.

SCORING:
Return realistic scores from 0 to 100.

seoScore:
Overall Etsy SEO quality.

visibilityScore:
Estimated search discoverability from title, tags, keyword clarity, and niche specificity.

competitionScore:
Niche opportunity score. Higher means more specific and less broad/saturated.

optimizationScore:
How polished, clear, Etsy-ready and conversion-focused the listing is.

Weaknesses:
Give 4 to 8 specific problems found in the current listing.

Tips:
Give 4 to 6 practical next actions for the seller.

OUTPUT:
Return ONLY valid JSON.
No markdown.
No code block.
No text before or after JSON.
No trailing commas.

Use this exact JSON shape:

{
  "seoScore": 0,
  "visibilityScore": 0,
  "competitionScore": 0,
  "optimizationScore": 0,
  "weaknesses": [],
  "improvedTitle": "",
  "improvedDescription": "",
  "improvedTags": [],
  "tips": []
}
`

    let data: AuditData

    try {
      const aiResponse = await generateAIListing(prompt)

      if (
        !aiResponse ||
        aiResponse.startsWith("<!DOCTYPE") ||
        aiResponse.startsWith("Request") ||
        aiResponse.startsWith("Error")
      ) {
        throw new Error("Invalid AI response")
      }

      data = parseAIResponse(aiResponse) as AuditData
    } catch (error) {
      console.error("Audit AI fallback used:", error)
      data = fallbackAudit(title, description, tags)
    }

    const improvedTags = normalizeImprovedTags(data.improvedTags, tags)

    const baseSeo = calculateSeoScore({
      title,
      description,
      tags,
      keywords: improvedTags,
    })

    const fallback = fallbackAudit(title, description, tags)

    return NextResponse.json({
      success: true,
      data: {
        seoScore:
          typeof data.seoScore === "number"
            ? toScore(data.seoScore)
            : baseSeo.seoScore,
        visibilityScore:
          typeof data.visibilityScore === "number"
            ? toScore(data.visibilityScore)
            : baseSeo.visibilityScore,
        competitionScore:
          typeof data.competitionScore === "number"
            ? toScore(data.competitionScore)
            : baseSeo.competitionScore,
        optimizationScore:
          typeof data.optimizationScore === "number"
            ? toScore(data.optimizationScore)
            : baseSeo.optimizationScore,
        weaknesses:
          toStringArray(data.weaknesses).length > 0
            ? toStringArray(data.weaknesses).slice(0, 8)
            : fallback.weaknesses,
        improvedTitle:
          typeof data.improvedTitle === "string" && data.improvedTitle.trim()
            ? data.improvedTitle.trim().slice(0, 140)
            : fallback.improvedTitle,
        improvedDescription:
          typeof data.improvedDescription === "string" &&
          data.improvedDescription.trim()
            ? data.improvedDescription.trim()
            : fallback.improvedDescription,
        improvedTags,
        tips:
          toStringArray(data.tips).length > 0
            ? toStringArray(data.tips).slice(0, 6)
            : fallback.tips,
      },
    })
  } catch (error) {
    console.error("Audit listing error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Listing audit failed. Please try again.",
      },
      { status: 500 }
    )
  }
}