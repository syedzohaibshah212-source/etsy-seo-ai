import Card from "@/components/ui/Card"

const features = [
  {
    title: "AI Etsy SEO Titles",
    text: "Generate keyword-focused Etsy titles designed to improve search visibility and buyer clicks.",
  },
  {
    title: "13 Optimized Tags",
    text: "Get a complete set of Etsy tags with long-tail, niche and buyer-intent keywords.",
  },
  {
    title: "AI Listing Audit",
    text: "Analyze existing Etsy listings, detect SEO weaknesses and generate optimized improvements instantly.",
  },
  {
    title: "Competitor Title Input",
    text: "Paste a competitor title and let EtsySEO AI create a stronger optimized version.",
  },
  {
    title: "Image-Based Generation",
    text: "Upload your product image and generate listing content based on your product style.",
  },
  {
    title: "Premium Descriptions",
    text: "Create clean, conversion-focused descriptions with natural SEO keyword placement.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="featuresSection">
      <div className="sectionHeader">
        <span className="sectionBadge">Why EtsySEO AI?</span>

        <h2 className="sectionTitle">
          Everything You Need To Create Better Etsy Listings
        </h2>

        <p className="sectionText">
          Built for Etsy sellers who want faster listing creation, stronger SEO
          and premium product copy without wasting hours on keyword research.
        </p>
      </div>

      <div className="featuresGrid">
        {features.map((feature) => (
          <Card key={feature.title} className="featureCard">
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}