import Button from "@/components/ui/Button"
import AnimatedStat from "@/components/home/AnimatedStat"

export default function HeroSection() {
  return (
    <section className="cleanHeroSection">
      <div className="cleanHeroContent">
        <div className="heroBadge">
          AI-powered Etsy SEO Workspace
        </div>

        <h1 className="cleanHeroTitle">
          Create Better Etsy Listings With AI
        </h1>

        <p className="cleanHeroText">
          Generate optimized Etsy titles, descriptions, tags and SEO audits
          using a premium AI workflow built for modern Etsy sellers.
        </p>

        <div className="cleanHeroActions">
          <a href="/generate">
            <Button>Generate Listing</Button>
          </a>

          <a href="/pricing" className="heroSecondaryBtn">
            View Pricing
          </a>
        </div>

        <div className="cleanHeroStats">
          <div>
            <strong>
              <AnimatedStat value={25000} suffix="+" />
            </strong>
            <span>Listings Generated</span>
          </div>

          <div>
            <strong>
              <AnimatedStat value={13} />
            </strong>
            <span>Optimized Tags</span>
          </div>

          <div>
            <strong>
              <AnimatedStat value={92} suffix="%" />
            </strong>
            <span>SEO Score</span>
          </div>
        </div>
      </div>

      <div className="cleanHeroPreview">
        <div className="cleanPreviewCard">
          <div className="previewTop">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="previewScore">
            <div>
              <strong>92%</strong>
              <span>SEO Score</span>
            </div>

            <div className="previewAudit">
              <div className="auditItem">
                <span>✓</span>
                <p>Keyword-rich title generated</p>
              </div>

              <div className="auditItem">
                <span>✓</span>
                <p>13 Etsy tags optimized</p>
              </div>

              <div className="auditItem">
                <span>✓</span>
                <p>Buyer intent improved</p>
              </div>
            </div>
          </div>

          <h3>
            Floral PNG Bundle for Etsy Sellers
          </h3>

          <p>
            AI-generated Etsy listing with stronger keyword targeting and
            buyer-intent optimization.
          </p>

          <div className="previewTags">
            <span>etsy seo</span>
            <span>png design</span>
            <span>digital file</span>
          </div>
        </div>
      </div>
    </section>
  )
}