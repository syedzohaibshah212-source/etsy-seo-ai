type BuildEtsyPromptParams = {
  selectedMethod: string
  competitorTitle?: string
  fileName?: string
}

const methodInstructions: Record<string, string> = {
  "METHOD 1: Exact Buyer Intent + Long-Tail Relevance":
    "Focus on the clearest buyer-ready long-tail phrase that accurately matches the uploaded image. Build title, tags, and description around specific search intent, not broad generic words.",

  "METHOD 2: Competitor Gap + Phrase Pattern Mining":
    "Use the competitor title only for phrasing pattern analysis. Identify useful structures, modifiers, and gaps without copying competitor wording directly.",

  "METHOD 3: Low-Competition Micro-Niche Angle":
    "Avoid broad saturated phrases. Find a narrower niche from the image such as hobby, profession, humor type, aesthetic, recipient, occasion, or specific use case.",

  "METHOD 4: Click-Through Thumbnail + Search Snippet Strategy":
    "Optimize for clickability. Prioritize the first 50-70 title characters, thumbnail clarity, search snippet clarity, and buyer understanding at small preview size.",

  "METHOD 5: Conversion Objection Removal":
    "Optimize for trust and reduced confusion. Make digital delivery, file expectations, no physical item, unknown specs, usage limits, and verification points extremely clear.",

  "METHOD 6: Occasion + Recipient Positioning":
    "If the image supports it, optimize around holidays, events, recipients, relationships, professions, hobbies, or gift-shopping intent. Do not force irrelevant occasions.",

  "METHOD 7: Seasonal Trend Refresh":
    "Use seasonal or holiday positioning only when the uploaded image supports it. Do not force seasonal keywords. Focus on timely buyer intent if relevant.",

  "METHOD 8: Google SEO + Etsy Internal Hybrid":
    "Use natural long-tail phrasing that works for both Etsy search and Google discovery. Keep the title readable and description helpful, not keyword-stuffed.",

  "METHOD 9: Etsy Stats Feedback Loop":
    "Use Etsy Stats only if provided. If no stats are provided, state that stats are unavailable and optimize based on image relevance and Etsy best practices only.",

  "METHOD 10: Portfolio Cannibalization Avoidance":
    "Create a unique keyword angle for this listing so it does not compete with similar shop listings using the same title/tag pattern.",

  "METHOD 11: Paid-Organic Bridge":
    "Use Etsy Ads or search-term data only if provided. If not provided, state that ad/search data is unavailable and do not invent converting terms.",

  "METHOD 12: IP-Safe White Space Strategy":
    "Prioritize trademark and IP safety. Avoid brands, celebrities, teams, franchises, slogans, lyrics, logos, and protected character terms unless seller rights are confirmed.",
}

export function buildEtsyPrompt({
  selectedMethod,
  competitorTitle = "",
  fileName = "uploaded-product-image.png",
}: BuildEtsyPromptParams) {
  const selectedMethodInstruction =
    methodInstructions[selectedMethod] ||
    "Use the selected SEO method as the main strategy for this listing."

  return `
You are an expert Etsy SEO strategist, product image analyst, conversion copywriter, digital PNG listing specialist, and IP safety reviewer.

TASK:
Analyze the uploaded image carefully and create one accurate Etsy SEO listing for a DIGITAL PNG design file.

CRITICAL IMAGE RULE:
First inspect the uploaded image. Base the listing only on what is visibly shown in the artwork:
- main subject
- visible text
- colors
- style/aesthetic
- theme
- occasion
- audience
- use case
- IP/trademark risk

Do NOT create a generic PNG listing unless the image is unclear.

PRODUCT TRUTH:
The product is a digital PNG design file, not a physical shirt, mug, tote, sticker, transfer, or printed product.

INPUTS:
Selected SEO Method: ${selectedMethod}
Selected Method Instructions: ${selectedMethodInstruction}
Image filename: ${fileName}
Competitor title: ${competitorTitle || "Not provided"}
Product type: Digital PNG design file
Language: English (en-US)

SEO METHOD RULE:
Use only the selected method and its instruction as the main strategy.
Do not combine all methods.
Make the selected method visibly influence the title, tags, description, category, score feedback, and SEO reasoning.

TITLE RULES:
- Create ONE optimized Etsy title.
- Maximum 140 characters.
- Must match the uploaded image.
- Put the strongest buyer search phrase at the beginning.
- Make the digital PNG nature clear.
- Do not imply a physical product.
- Do not keyword stuff.
- Avoid generic titles like "PNG Shirt Design" unless the image is unclear.

DESCRIPTION RULES:
- Write a clear Etsy-ready product description.
- Target length: 900 to 1200 words.
- Must be specific to the uploaded image.
- Naturally include the strongest keywords early.
- Clearly say this is a digital PNG design file.
- Include the exact sentence: "No physical item is included."
- Do not invent DPI, dimensions, transparent background, file size, commercial rights, licensing, instant download, or compatibility.
- If technical details are unknown, say unspecified.
- Use short paragraphs and light bullets.
- Include buyer benefits, use cases, file expectations, design style/color notes, and verify-before-publish notes.

TAG RULES:
- Generate exactly 13 Etsy tags.
- Every tag must be 20 characters or fewer.
- Tags must be image-specific.
- Use a balanced mix of product/file-format, subject/theme, style, use-case, audience/recipient, occasion if relevant, and experimental long-tail.
- Do not create duplicate or near-duplicate tags.
- Do not imply a physical shirt.
- Do not use protected IP terms unless rights are confirmed.

CATEGORY RULES:
- Suggest one Etsy-ready category.
- Prefer digital design/craft supply categories over apparel categories.

SEO SCORE RULES:
Give a realistic SEO score from 0 to 100 based on:
- Title relevance and clarity: 25 points
- Tag quality and tag compliance: 25 points
- Description keyword quality and conversion clarity: 20 points
- Image-to-listing match: 15 points
- Digital product clarity: 10 points
- IP/trademark safety: 5 points

Be honest. Do not give 100 unless the listing is truly excellent and no major details are missing.
If DPI, dimensions, transparency, commercial rights, or instant download are unspecified, reduce the score slightly.

ACCURACY RULES:
- Clearly state unknown technical details as unspecified.
- Do not copy competitor wording directly.
- Do not keyword stuff.
- If the image has brands, celebrities, characters, team names, slogans, lyrics, or logos, flag IP risk in scoreFeedback.
- Never claim live Etsy search volume, sales, CTR, conversion rate, or Bestseller status unless explicitly provided.
- If live Etsy research is unavailable, mention in scoreFeedback that keyword strength is estimated from image evidence and Etsy best practices.

OUTPUT:
Return ONLY valid JSON.
Do NOT return markdown.
Do NOT wrap in code blocks.
Do NOT add text before or after JSON.

Use this exact JSON shape:

{
  "title": "",
  "description": "",
  "tags": [],
  "category": "",
  "seoScore": 0,
  "scoreBreakdown": "",
  "scoreFeedback": ""
}

FIELD REQUIREMENTS:

title:
One Etsy title, max 140 characters.

description:
One Etsy description, target 900 to 1200 words.

tags:
Exactly 13 string tags, each 20 characters or fewer.

category:
One Etsy-ready category string.

seoScore:
Number from 0 to 100.

scoreBreakdown:
Plain English breakdown of the score using the point system.

scoreFeedback:
Short practical feedback explaining what is strong, what is missing, and what the seller should verify.

FINAL QUALITY BAR:
The result must be accurate to the uploaded image, Etsy-native, buyer-focused, digital-product-safe, method-specific, easy to copy, and ready for PDF export.
`
}