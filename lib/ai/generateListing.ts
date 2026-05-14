import { openrouter } from "./openrouter"

export async function generateAIListing(prompt: string, imageDataUrl?: string) {
  const content = imageDataUrl
    ? [
        {
          type: "text" as const,
          text: prompt,
        },
        {
          type: "image_url" as const,
          image_url: {
            url: imageDataUrl,
          },
        },
      ]
    : prompt

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

  return completion.choices[0]?.message?.content || ""
}