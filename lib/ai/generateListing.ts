import { openrouter } from "./openrouter"

const fallbackListing = {
  title:
    "Minimalist PNG Shirt Design | Trendy Graphic Tee | Digital Download",
  description:
    "This premium PNG design is optimized for Etsy SEO with strong buyer-intent keywords, niche targeting, and conversion-focused formatting.",
  tags: [
    "png design",
    "graphic tee",
    "shirt png",
    "etsy shirt",
    "digital png",
    "minimalist art",
    "trendy design",
    "print on demand",
    "retro shirt",
    "viral png",
    "cute graphic",
    "gift idea",
    "small business",
  ],
  category: "Digital Prints",
  seoScore: 88,
  scoreBreakdown:
    "Strong keyword relevance, optimized Etsy title structure, high-converting tag strategy, and readable product description.",
  scoreFeedback:
    "Excellent Etsy SEO foundation. Consider seasonal keyword refreshes and niche expansion for additional traffic.",
}

export async function generateAIListing(
  prompt: string,
  imageDataUrl?: string
) {
  try {
    const content = imageDataUrl
      ? [
          {
            type: "text" as const,
            text: `
${prompt}

IMPORTANT:

Return ONLY valid JSON.

Required structure:

{
  "title": "",
  "description": "",
  "tags": [],
  "category": "",
  "seoScore": 0,
  "scoreBreakdown": "",
  "scoreFeedback": ""
}

RULES:
- Title must be Etsy SEO optimized
- Tags array must contain exactly 13 Etsy tags
- Tags should be under 20 characters
- seoScore must be between 0 and 100
- No markdown
- No explanation
- JSON only
`,
          },
          {
            type: "image_url" as const,
            image_url: {
              url: imageDataUrl,
            },
          },
        ]
      : `
${prompt}

IMPORTANT:

Return ONLY valid JSON.

Required structure:

{
  "title": "",
  "description": "",
  "tags": [],
  "category": "",
  "seoScore": 0,
  "scoreBreakdown": "",
  "scoreFeedback": ""
}

RULES:
- Title must be Etsy SEO optimized
- Tags array must contain exactly 13 Etsy tags
- Tags should be under 20 characters
- seoScore must be between 0 and 100
- No markdown
- No explanation
- JSON only
`

    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-4o-mini",

      messages: [
        {
          role: "user",
          content,
        },
      ],

      temperature: 0.35,
    })

    const response =
      completion.choices[0]?.message?.content?.trim() || ""

    if (!response) {
      return JSON.stringify(fallbackListing)
    }

    return response
  } catch (error) {
    console.error("AI generation error:", error)

    return JSON.stringify(fallbackListing)
  }
}