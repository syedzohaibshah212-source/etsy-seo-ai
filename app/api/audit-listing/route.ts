import { NextResponse } from "next/server"
import { generateAIListing } from "@/lib/ai/generateListing"
import { calculateSeoScore } from "@/lib/seo/calculateSeoScore"

type AuditBody = {
  title?: string
  description?: string
  tags?: string[]
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function cleanTags(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean)
    .slice(0, 13)
}

function parseAIResponse(response: string) {
  const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  return JSON.parse(cleaned)
}

function fallbackAudit(title: string, description: string, tags: string[]) {
  const seo = calculateSeoScore({
    title,
    description,
    tags,
    keywords: tags,
  })

  return {
    seoScore: seo.seoScore,
    visibilityScore: seo.visibilityScore,
    competitionScore: seo.competitionScore,
    optimizationScore: seo.optimizationScore,
    weaknesses: [
      "Title may need stronger buyer-intent keywords.",
      "Tags should use all 13 Etsy tag slots.",
      "Description should clearly explain digital product details.",
    ],
    improvedTitle: `${title} PNG Digital Download, Etsy Design File`.slice(
      0,
      140
    ),
    improvedDescription: `${title}

This is a digital PNG design file for Etsy sellers, crafters, small business owners and creative projects.

No physical item is included.

Use this design for suitable digital projects, product mockups, printable-style artwork or creative business workflows. Please verify file size, DPI, dimensions, background type, usage rights and software compatibility before publishing.`,
    improvedTags:
      tags.length > 0
        ? tags
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
          ],
    tips: seo.tips,
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
You are EtsySEO AI, an expert Etsy SEO auditor.

Audit this existing Etsy listing.

CURRENT TITLE:
${title}

CURRENT DESCRIPTION:
${description || "Not provided"}

CURRENT TAGS:
${tags.join(", ") || "Not provided"}

Return ONLY valid JSON.

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

Rules:
- improvedTitle must be max 140 characters.
- improvedTags must contain exactly 13 Etsy tags.
- Every tag must be 20 characters or fewer.
- Focus on Etsy SEO, buyer intent, digital product clarity, tag quality, and conversion clarity.
- Do not claim real Etsy search volume or sales data.
- If product type is unclear, keep wording safe and general.
- Mention digital product clarity when relevant.
- JSON only. No markdown.
`

    let data

    try {
      const aiResponse = await generateAIListing(prompt)
      data = parseAIResponse(aiResponse)
    } catch (error) {
      console.error("Audit AI fallback used:", error)
      data = fallbackAudit(title, description, tags)
    }

    const baseSeo = calculateSeoScore({
      title,
      description,
      tags,
      keywords: Array.isArray(data.improvedTags) ? data.improvedTags : tags,
    })

    const improvedTags = Array.isArray(data.improvedTags)
      ? data.improvedTags
          .map((tag: unknown) =>
            typeof tag === "string" ? tag.trim() : ""
          )
          .filter(Boolean)
          .map((tag: string) =>
            tag.length > 20 ? tag.slice(0, 20).trim() : tag
          )
          .slice(0, 13)
      : fallbackAudit(title, description, tags).improvedTags

    while (improvedTags.length < 13) {
      improvedTags.push(`etsy tag ${improvedTags.length + 1}`)
    }

    return NextResponse.json({
      success: true,
      data: {
        seoScore:
          typeof data.seoScore === "number"
            ? data.seoScore
            : baseSeo.seoScore,
        visibilityScore:
          typeof data.visibilityScore === "number"
            ? data.visibilityScore
            : baseSeo.visibilityScore,
        competitionScore:
          typeof data.competitionScore === "number"
            ? data.competitionScore
            : baseSeo.competitionScore,
        optimizationScore:
          typeof data.optimizationScore === "number"
            ? data.optimizationScore
            : baseSeo.optimizationScore,
        weaknesses: Array.isArray(data.weaknesses)
          ? data.weaknesses.slice(0, 8)
          : fallbackAudit(title, description, tags).weaknesses,
        improvedTitle:
          typeof data.improvedTitle === "string"
            ? data.improvedTitle.slice(0, 140)
            : fallbackAudit(title, description, tags).improvedTitle,
        improvedDescription:
          typeof data.improvedDescription === "string"
            ? data.improvedDescription
            : fallbackAudit(title, description, tags).improvedDescription,
        improvedTags,
        tips: Array.isArray(data.tips)
          ? data.tips.slice(0, 6)
          : baseSeo.tips,
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