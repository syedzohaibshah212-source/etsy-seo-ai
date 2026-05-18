import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import AnimatedStat from "@/components/home/AnimatedStat"

const railItems = ["SEO", "AI", "TAG", "AUDIT"]

export default function HeroSection() {
  return (
    <section className="heroSection cinematicHeroSection">
      <Card className="heroCard cinematicHeroCard">
        <div className="heroRail">
          {railItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="cinematicHeroContent">
          <div className="heroBadge">AI-powered Etsy SEO Workspace</div>

          <h1 className="heroTitle cinematicHeroTitle">
            Build Better Etsy Listings With AI SEO Intelligence
          </h1>

          <p className="heroText cinematicHeroText">
            Upload a product image and generate optimized Etsy titles,
            descriptions, tags, audits and SEO scores inside one premium AI
            workspace.
          </p>

          <div className="aiTypingLine cinematicTypingLine">
            <span>AI is optimizing:</span>
            <strong>
              {" "}
              buyer intent • keywords • title clarity • SEO score
            </strong>
          </div>

          <div className="heroActions cinematicHeroActions">
            <a href="/generate">
              <Button>Generate Listing</Button>
            </a>

            <a href="/audit" className="heroSecondaryBtn">
              Audit Listing
            </a>
          </div>

          <div className="heroStats premiumStats cinematicStats">
            <div className="premiumStatItem">
              <strong>
                <AnimatedStat value={25000} suffix="+" />
              </strong>

              <span>Listings Generated</span>
            </div>

            <div className="premiumStatItem">
              <strong>
                <AnimatedStat value={13} />
              </strong>

              <span>Etsy Tags</span>
            </div>

            <div className="premiumStatItem">
              <strong>
                <AnimatedStat value={92} suffix="%" />
              </strong>

              <span>SEO Score</span>
            </div>
          </div>
        </div>

        <div className="cinematicHeroVisual">
          <div className="heroMapGlow" />

          <div className="seoScorePanel">
            <span>SEO Score</span>
            <strong>92</strong>
            <p>High visibility listing</p>
          </div>

          <div className="listingPreviewPanel">
            <div className="mockupTop">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <h3>Floral PNG Bundle for Etsy Sellers</h3>

            <p>
              AI-optimized Etsy title with stronger keyword targeting and
              buyer-focused description structure.
            </p>

            <div className="mockupBars">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="mockupTags">
              <span>png design</span>
              <span>etsy seo</span>
              <span>digital file</span>
            </div>
          </div>

          <div className="tagCloudPanel">
            <span>13 Tags Ready</span>
            <strong>AI optimized</strong>
          </div>
        </div>
      </Card>
    </section>
  )
}