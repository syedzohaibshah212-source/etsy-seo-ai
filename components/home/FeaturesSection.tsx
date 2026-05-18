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
    type: "generator",
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
    type: "audit",
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
    type: "tags",
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
    type: "copy",
  },
]

function FeatureVisual({ type }: { type: string }) {
  if (type === "audit") {
    return (
      <div className="featureVisual auditVisual">
        <div className="visualHeader">
          <span>SEO Audit</span>
          <strong>Weaknesses found</strong>
        </div>

        <div className="auditRows">
          <div>
            <span>Title clarity</span>
            <strong>72%</strong>
          </div>

          <div>
            <span>Tag quality</span>
            <strong>64%</strong>
          </div>

          <div>
            <span>Keyword intent</span>
            <strong>81%</strong>
          </div>
        </div>

        <div className="auditWarning">
          Improve title opening phrase and add stronger buyer-intent tags.
        </div>
      </div>
    )
  }

  if (type === "tags") {
    return (
      <div className="featureVisual tagsVisual">
        <div className="visualHeader">
          <span>AI Tags</span>
          <strong>13 optimized tags</strong>
        </div>

        <div className="tagCloudPreview">
          <span>floral png</span>
          <span>etsy clipart</span>
          <span>digital file</span>
          <span>seller design</span>
          <span>printable art</span>
          <span>small shop</span>
          <span>png bundle</span>
          <span>craft supply</span>
        </div>
      </div>
    )
  }

  if (type === "copy") {
    return (
      <div className="featureVisual copyVisual">
        <div className="visualHeader">
          <span>Description</span>
          <strong>Conversion ready</strong>
        </div>

        <div className="copyPreviewBox">
          <h4>Premium Etsy Description</h4>

          <p>
            This digital PNG design is created for Etsy sellers, crafters and
            small business owners who need polished, ready-to-use listing copy.
          </p>

          <ul>
            <li>Clear digital product wording</li>
            <li>Natural keyword placement</li>
            <li>Buyer-friendly structure</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="featureAiCard">
      <div className="featureAiTop">
        <span>AI GENERATOR</span>
        <strong>Live SEO score</strong>
      </div>

      <div className="featureAiBody">
        <div className="featureAiScore">
          <strong>92%</strong>
        </div>

        <div className="featureAiMetrics">
          <div>
            <span>Title SEO</span>
            <strong>94%</strong>
          </div>

          <div>
            <span>Tag Match</span>
            <strong>88%</strong>
          </div>

          <div>
            <span>Buyer Intent</span>
            <strong>Strong</strong>
          </div>
        </div>
      </div>

      <div className="featureAiTags">
        <span>etsy seo</span>
        <span>png design</span>
        <span>digital file</span>
      </div>
    </div>
  )
}

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
              <FeatureVisual type={feature.type} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}