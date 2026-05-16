export type SeoScoreInput = {
  title: string
  description: string
  tags: string[]
  category?: string
  keywords?: string[]
}

export type SeoScoreResult = {
  seoScore: number
  visibilityScore: number
  competitionScore: number
  optimizationScore: number
  scoreBreakdown: string
  scoreFeedback: string
  tips: string[]
}

function clampScore(score: number) {
  if (Number.isNaN(score)) return 0
  if (score < 0) return 0
  if (score > 100) return 100
  return Math.round(score)
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function hasDigitalClarity(text: string) {
  const lower = text.toLowerCase()

  return (
    lower.includes("digital") ||
    lower.includes("png") ||
    lower.includes("download") ||
    lower.includes("no physical item")
  )
}

function hasKeyword(text: string, keyword: string) {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

function uniqueCount(items: string[]) {
  return new Set(items.map((item) => item.toLowerCase().trim())).size
}

export function calculateSeoScore(input: SeoScoreInput): SeoScoreResult {
  const title = input.title || ""
  const description = input.description || ""
  const tags = input.tags || []
  const keywords = input.keywords || []

  let titleScore = 0
  let tagScore = 0
  let descriptionScore = 0
  let clarityScore = 0
  let keywordScore = 0

  const tips: string[] = []

  if (title.length >= 70 && title.length <= 140) {
    titleScore += 25
  } else if (title.length >= 45 && title.length < 70) {
    titleScore += 18
    tips.push("Make the title slightly longer with relevant buyer keywords.")
  } else if (title.length > 140) {
    titleScore += 12
    tips.push("Shorten the title to stay under Etsy’s 140 character limit.")
  } else {
    titleScore += 10
    tips.push("Add more descriptive long-tail keywords to the title.")
  }

  if (hasDigitalClarity(title)) {
    titleScore += 5
  } else {
    tips.push("Mention PNG or digital design clearly in the title.")
  }

  if (tags.length === 13) {
    tagScore += 25
  } else if (tags.length >= 10) {
    tagScore += 18
    tips.push("Use all 13 Etsy tags for better discoverability.")
  } else if (tags.length >= 6) {
    tagScore += 12
    tips.push("Add more Etsy tags. Aim for exactly 13 tags.")
  } else {
    tagScore += 6
    tips.push("Tags are too few. Add image-specific Etsy search phrases.")
  }

  const validTagCount = tags.filter((tag) => tag.length <= 20).length

  if (validTagCount === tags.length && tags.length > 0) {
    tagScore += 5
  } else {
    tips.push("Keep every Etsy tag under 20 characters.")
  }

  if (uniqueCount(tags) === tags.length) {
    tagScore += 5
  } else {
    tips.push("Remove duplicate or near-duplicate tags.")
  }

  const descWords = wordCount(description)

  if (descWords >= 350 && descWords <= 900) {
    descriptionScore += 25
  } else if (descWords >= 180) {
    descriptionScore += 18
    tips.push("Expand the description with buyer benefits and use cases.")
  } else {
    descriptionScore += 10
    tips.push("Description is too short. Add product details and buyer guidance.")
  }

  if (hasDigitalClarity(description)) {
    clarityScore += 15
  } else {
    tips.push('Add clear digital product wording, including "No physical item is included."')
  }

  if (description.toLowerCase().includes("no physical item is included")) {
    clarityScore += 10
  } else {
    tips.push('Include the exact sentence: "No physical item is included."')
  }

  const titleKeywordHits = keywords.filter((keyword) =>
    hasKeyword(title, keyword)
  ).length

  const descriptionKeywordHits = keywords.filter((keyword) =>
    hasKeyword(description, keyword)
  ).length

  if (keywords.length > 0) {
    keywordScore += Math.min(15, titleKeywordHits * 3)
    keywordScore += Math.min(15, descriptionKeywordHits * 2)
  } else {
    keywordScore += 10
    tips.push("Add keyword opportunities to improve SEO scoring accuracy.")
  }

  const seoScore = clampScore(
    titleScore +
      tagScore +
      descriptionScore +
      clarityScore +
      keywordScore
  )

  const visibilityScore = clampScore(
    titleScore + tagScore + keywordScore + 20
  )

  const competitionScore = clampScore(
    60 +
      Math.min(20, uniqueCount(tags)) -
      (title.toLowerCase().includes("shirt") ? 8 : 0)
  )

  const optimizationScore = clampScore(
    titleScore + descriptionScore + clarityScore + 20
  )

  return {
    seoScore,
    visibilityScore,
    competitionScore,
    optimizationScore,
    scoreBreakdown: `Title: ${clampScore(titleScore)}/30, Tags: ${clampScore(
      tagScore
    )}/35, Description: ${clampScore(
      descriptionScore
    )}/25, Digital clarity: ${clampScore(
      clarityScore
    )}/25, Keyword usage: ${clampScore(keywordScore)}/30.`,
    scoreFeedback:
      seoScore >= 85
        ? "Strong Etsy SEO structure. The listing is clear, keyword-focused, and ready for publishing after seller verification."
        : seoScore >= 70
          ? "Good SEO foundation. Improve keyword placement, tags, or digital product clarity to increase performance."
          : "This listing needs stronger Etsy SEO optimization. Improve title clarity, tags, description depth, and digital product wording.",
    tips: tips.slice(0, 6),
  }
}