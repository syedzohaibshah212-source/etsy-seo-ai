import { NextResponse } from "next/server"
import { buildEtsyPrompt } from "@/lib/buildEtsyPrompt"
import { generateAIListing } from "@/lib/ai/generateListing"
import { generateListingSchema } from "@/lib/validations/generateListing"

function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : ""
}

function parseAIResponse(response: string): unknown {
  try {
    return JSON.parse(response)
  } catch {
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(cleaned)
  }
}

function toText(value: unknown) {
  if (typeof value === "string") return value
  if (value === null || value === undefined) return ""
  return JSON.stringify(value, null, 2)
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

  return value.map((item) => {
    if (typeof item === "string") return item
    return JSON.stringify(item)
  })
}

function normalizeListingData(data: Record<string, unknown>) {
  return {
    title: toText(data.title).slice(0, 140),
    description: toText(data.description),
    tags: toStringArray(data.tags)
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => (tag.length > 20 ? tag.slice(0, 20).trim() : tag))
      .slice(0, 13),
    category: toText(data.category),
    seoScore: toScore(data.seoScore),
    scoreBreakdown: toText(data.scoreBreakdown),
    scoreFeedback: toText(data.scoreFeedback),
  }
}

async function fileToDataUrl(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString("base64")

  return `data:${file.type};base64,${base64}`
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const rawData = {
      competitorTitle: cleanText(formData.get("competitorTitle")),
      method:
        cleanText(formData.get("method")) ||
        "METHOD 1: Exact Buyer Intent + Long-Tail Relevance",
    }

    const validated = generateListingSchema.safeParse(rawData)

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            validated.error.issues[0]?.message ||
            "Invalid input. Please check your details.",
        },
        { status: 400 }
      )
    }

    const competitorTitle = validated.data.competitorTitle || ""
    const selectedMethod = validated.data.method

    const image = formData.get("image")

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "Product image is required.",
        },
        { status: 400 }
      )
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"]

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Only PNG, JPG, JPEG, and WEBP images are allowed.",
        },
        { status: 400 }
      )
    }

    const maxSize = 5 * 1024 * 1024

    if (image.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "Image must be smaller than 5MB.",
        },
        { status: 400 }
      )
    }

    const fileName = image.name || "uploaded-product-image.png"

    const prompt = buildEtsyPrompt({
      selectedMethod,
      competitorTitle,
      fileName,
    })

    const imageDataUrl = await fileToDataUrl(image)

    const aiResponse = await generateAIListing(prompt, imageDataUrl)
    const parsedData = parseAIResponse(aiResponse) as Record<string, unknown>
    const data = normalizeListingData(parsedData)

    return NextResponse.json({
      success: true,
      mode: "ai-vision-generated",
      data,
    })
  } catch (error) {
    console.error("Generate listing error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while generating the listing.",
      },
      { status: 500 }
    )
  }
}