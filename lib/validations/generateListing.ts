import { z } from "zod"

export const generateListingSchema = z.object({
  competitorTitle: z
    .string()
    .max(300, "Competitor title is too long.")
    .optional(),

  method: z
    .string()
    .min(1, "SEO method is required."),
})

export type GenerateListingInput =
  z.infer<typeof generateListingSchema>