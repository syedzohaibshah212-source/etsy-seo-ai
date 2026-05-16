import Card from "@/components/ui/Card"

const features = [
  {
    title: "AI Vision Etsy Analysis",
    text: "Upload your PNG or product design and EtsySEO AI analyzes artwork, style, audience, colors and buyer intent automatically.",
  },
  {
    title: "13 Etsy SEO Tags",
    text: "Generate optimized Etsy tags with long-tail keywords, niche targeting and buyer-search relevance.",
  },
  {
    title: "SEO Score Engine",
    text: "Get real Etsy listing scores including visibility score, competition score and optimization quality analysis.",
  },
  {
    title: "Keyword Opportunities",
    text: "Discover additional Etsy keyword opportunities your competitors are missing.",
  },
  {
    title: "AI Listing Audit",
    text: "Paste an existing Etsy listing and instantly discover weaknesses, missing keywords and SEO improvements.",
  },
  {
    title: "Conversion Optimization",
    text: "Generate descriptions designed to improve clicks, clarity and buyer trust without keyword stuffing.",
  },
  {
    title: "Competitor Gap Analysis",
    text: "Analyze competitor title structures and create stronger optimized listing angles for your shop.",
  },
  {
    title: "Premium Etsy Titles",
    text: "Create Etsy-ready titles focused on ranking, click-through rate and long-tail buyer intent.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="featuresSection">
      <div className="sectionHeader">
        <span className="sectionBadge">
          Built specifically for Etsy sellers
        </span>

        <h2 className="sectionTitle">
          More Than A Basic AI Writer
        </h2>

        <p className="sectionText">
          EtsySEO AI combines Etsy SEO optimization, keyword analysis, AI vision,
          listing audits and conversion-focused copywriting into one premium Etsy
          seller toolkit.
        </p>
      </div>

      <div className="featuresGrid">
        {features.map((feature) => (
          <Card key={feature.title} className="featureCard">
            <div className="featureIconGlow"></div>

            <h3>{feature.title}</h3>

            <p>{feature.text}</p>
          </Card>
        ))}
      </div>

      <div className="featureBottomStats">
        <div className="featureStatCard">
          <strong>12K+</strong>
          <span>Listings Generated</span>
        </div>

        <div className="featureStatCard">
          <strong>3.1M+</strong>
          <span>SEO Keywords Processed</span>
        </div>

        <div className="featureStatCard">
          <strong>4.9/5</strong>
          <span>Seller Satisfaction</span>
        </div>
      </div>
    </section>
  )
}