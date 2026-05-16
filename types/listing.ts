export type ListingResult = {
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