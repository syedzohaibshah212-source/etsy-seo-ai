import Card from "@/components/ui/Card"

const features = [
  {
    eyebrow: "AI SEO ENGINE",
    title: "Generate Etsy Listings From Product Images",
    text: "Upload your product image and instantly generate optimized Etsy titles, tags and descriptions using AI-powered Etsy SEO analysis.",
    points: [
      "Image-based AI generation",
      "Buyer intent optimization",
      "Long-tail Etsy keywords",
    ],
  },

  {
    eyebrow: "LISTING AUDIT",
    title: "Improve Existing Etsy Listings Instantly",
    text: "Analyze weak Etsy listings, identify SEO gaps and generate stronger optimized versions with better visibility potential.",
    points: [
      "SEO weakness detection",
      "Optimization suggestions",
      "Improved title generation",
    ],
  },

  {
    eyebrow: "SMART TAGS",
    title: "Generate Better Etsy Tags With AI",
    text: "Create 13 optimized Etsy tags using niche keywords, buyer-focused phrases and search-friendly long-tail targeting.",
    points: [
      "13 optimized tags",
      "Long-tail keyword strategy",
      "Niche relevance scoring",
    ],
  },

  {
    eyebrow: "PREMIUM COPY",
    title: "Conversion-Focused Etsy Descriptions",
    text: "Generate clean product descriptions with stronger readability, natural keyword placement and improved buyer clarity.",
    points: [
      "Natural keyword flow",
      "Digital product clarity",
      "Better conversion structure",
    ],
  },
]

export default function FeaturesSection() {
  return (
    <section className="featuresSection">
      <div className="sectionHeader">
        <span className="sectionBadge">
          AI-powered Etsy SEO workflow
        </span>

        <h2 className="sectionTitle">
          Built For Modern Etsy Sellers
        </h2>

        <p className="sectionText">
          EtsySEO AI helps digital sellers create stronger listings, optimize
          keywords and generate SEO-focused Etsy content faster using AI.
        </p>
      </div>

      <div className="premiumFeaturesStack">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className={`premiumFeatureRow ${
              index % 2 === 1 ? "reverseFeature" : ""
            }`}
          >
            <div className="premiumFeatureContent">
              <span className="featureEyebrow">
                {feature.eyebrow}
              </span>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

              <ul>
                {feature.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="premiumFeaturePreview">
              <div className="featurePreviewCard">
                <div className="featurePreviewTop">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="featurePreviewBody">
                  <div className="featurePreviewScore">
                    92%
                  </div>

                  <div className="featurePreviewLines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="featurePreviewTags">
                  <span>etsy seo</span>
                  <span>png design</span>
                  <span>digital file</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}