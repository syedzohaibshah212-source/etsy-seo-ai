import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { buildEtsyPrompt } from "@/lib/buildEtsyPrompt"
import { generateAIListing } from "@/lib/ai/generateListing"
import { generateListingSchema } from "@/lib/validations/generateListing"

type ListingData = {
  title: string
  description: string
  tags: string[]
  category: string
  seoScore: number
  visibilityScore: number
  competitionScore: number
  optimizationScore: number
  keywords: string[]
  tips: string[]
  scoreBreakdown: string
  scoreFeedback: string
}

type ProfileData = {
  plan: string | null
  credits: number | null
}

function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : ""
}

function parseAIResponse(response: string): unknown {
  const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  return JSON.parse(cleaned)
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

function normalizeTags(value: unknown) {
  const tags = toStringArray(value)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => (tag.length > 20 ? tag.slice(0, 20).trim() : tag))
    .slice(0, 13)

  while (tags.length < 13) {
    tags.push(`etsy seo ${tags.length + 1}`)
  }

  return tags.slice(0, 13)
}

function normalizeListingData(data: Record<string, unknown>): ListingData {
  return {
    title: toText(data.title).slice(0, 140),
    description: toText(data.description),
    tags: normalizeTags(data.tags),
    category: toText(data.category) || "Digital Prints",
    seoScore: toScore(data.seoScore),
    visibilityScore: toScore(data.visibilityScore),
    competitionScore: toScore(data.competitionScore),
    optimizationScore: toScore(data.optimizationScore),
    keywords: toStringArray(data.keywords)
      .map((keyword) => keyword.trim())
      .filter(Boolean)
      .slice(0, 10),
    tips: toStringArray(data.tips)
      .map((tip) => tip.trim())
      .filter(Boolean)
      .slice(0, 6),
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
    const authHeader = req.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          error: "Please login before generating a listing.",
        },
        { status: 401 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    )

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Your login session expired. Please login again.",
        },
        { status: 401 }
      )
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, credits")
      .eq("id", user.id)
      .maybeSingle<ProfileData>()

    let currentCredits = profile?.credits ?? 5

    if (!profile) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email || "",
        full_name:
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : "EtsySEO User",
        plan: "Free",
        credits: 5,
      })

      currentCredits = 5
    }

    if (currentCredits <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "You have no credits left. Please upgrade your plan.",
        },
        { status: 402 }
      )
    }

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

    console.log("RAW AI RESPONSE:", aiResponse)

    if (
      !aiResponse ||
      aiResponse.startsWith("<!DOCTYPE") ||
      aiResponse.startsWith("Request") ||
      aiResponse.startsWith("Error") ||
      aiResponse.includes("Request Entity Too Large")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "AI provider returned an invalid response. Try again with a smaller image.",
        },
        { status: 500 }
      )
    }

    let parsedData: Record<string, unknown>

    try {
      parsedData = parseAIResponse(aiResponse) as Record<string, unknown>
    } catch (parseError) {
      console.error("AI JSON parse error:", parseError)
      console.error("Invalid AI response:", aiResponse)

      return NextResponse.json(
        {
          success: false,
          error:
            "AI returned invalid JSON. Please try again with a clearer/smaller image.",
        },
        { status: 500 }
      )
    }

    const data = normalizeListingData(parsedData)

    const { data: savedListing, error: listingError } = await supabase
      .from("listings")
      .insert({
        user_id: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags,
        seo_score: data.seoScore,
        visibility_score: data.visibilityScore,
        competition_score: data.competitionScore,
        optimization_score: data.optimizationScore,
        keywords: data.keywords,
        tips: data.tips,
        score_breakdown: data.scoreBreakdown,
        score_feedback: data.scoreFeedback,
      })
      .select("id")
      .single()

    if (listingError) {
      console.error("Save listing error:", listingError)

      return NextResponse.json(
        {
          success: false,
          error: "Listing generated but could not be saved.",
        },
        { status: 500 }
      )
    }

    const remainingCredits = currentCredits - 1

    const { error: creditError } = await supabase
      .from("profiles")
      .update({
        credits: remainingCredits,
      })
      .eq("id", user.id)

    if (creditError) {
      console.error("Credit update error:", creditError)
    }

    return NextResponse.json({
      success: true,
      mode: "ai-vision-generated",
      remainingCredits,
      listingId: savedListing?.id,
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