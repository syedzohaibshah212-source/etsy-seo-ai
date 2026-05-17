import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function HeroSection() {
  return (
    <section className="heroSection">
      <Card className="heroCard">
        <div className="heroBadge">AI-powered Etsy SEO Generator</div>

        <h1 className="heroTitle">
          Generate High-Converting Etsy Listings With AI
        </h1>

        <p className="heroText">
          Create SEO-optimized Etsy titles, descriptions, tags and listing
          audits in seconds using AI-powered Etsy SEO analysis.
        </p>

        <div className="aiTypingLine">
          <span>AI is optimizing:</span>
          <strong> Etsy title • 13 tags • SEO description • audit score</strong>
        </div>

        <div className="heroActions">
          <a href="/generate">
            <Button>Generate Listing</Button>
          </a>

          <a href="/pricing" className="heroSecondaryBtn">
            View Pricing
          </a>
        </div>

        <div className="heroStats">
          <span>SEO Titles</span>
          <span>13 Etsy Tags</span>
          <span>AI Listing Audit</span>
        </div>

        <div className="floatingDashboardMockup">
          <div className="mockupTop">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="mockupContent">
            <div className="mockupScore">
              <strong>92</strong>
              <span>SEO Score</span>
            </div>

            <div className="mockupLines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="mockupTags">
            <span>png design</span>
            <span>etsy seo</span>
            <span>digital file</span>
          </div>
        </div>
      </Card>
    </section>
  )
}