import { z } from "zod"

export const generateListingSchema = z.object({
  competitorTitle: z
    .string()
    .trim()
    .max(300, "Competitor title is too long.")
    .optional()
    .or(z.literal("")),

  method: z
    .string()
    .trim()
    .min(1, "SEO method is required.")
    .max(120, "SEO method is invalid."),
})

export type GenerateListingInput =
  z.infer<typeof generateListingSchema>