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
        <div className="aiPreviewCard">
          <div className="aiPreviewTop">
            <div className="aiPreviewBadge">
              AI SEO ANALYSIS
            </div>

            <div className="aiLiveDot"></div>
          </div>

          <h3 className="aiPreviewTitle">
            Floral PNG Bundle for Etsy Sellers
          </h3>

          <p className="aiPreviewText">
            AI-generated Etsy listing optimized for keyword ranking, buyer
            intent, and marketplace visibility.
          </p>

          <div className="aiScoreWrap">
            <div className="aiScoreCircle">
              <strong>92%</strong>
            </div>

            <div className="aiMetrics">
              <div className="aiMetric">
                <div>
                  <span>Keyword Match</span>
                  <strong>94%</strong>
                </div>

                <div className="aiMetricBar">
                  <span></span>
                </div>
              </div>

              <div className="aiMetric">
                <div>
                  <span>Competition</span>
                  <strong>Low</strong>
                </div>

                <div className="aiMetricBar">
                  <span></span>
                </div>
              </div>

              <div className="aiMetric">
                <div>
                  <span>Buyer Intent</span>
                  <strong>Strong</strong>
                </div>

                <div className="aiMetricBar">
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="aiPreviewTags">
            <span>etsy seo</span>
            <span>digital download</span>
            <span>png bundle</span>
            <span>clipart</span>
          </div>

          <div className="aiSuggestionBox">
            <strong>AI Suggestion</strong>

            <p>
              Add “Commercial Use” in the title to improve conversion rate and
              long-tail search visibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}