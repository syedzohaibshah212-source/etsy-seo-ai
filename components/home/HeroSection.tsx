import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function HeroSection() {
  return (
    <section className="heroSection">
      <Card className="heroCard">
        <div className="heroBadge">
          AI-powered Etsy SEO Generator
        </div>

        <h1 className="heroTitle">
          Generate High-Converting Etsy Listings With AI
        </h1>

        <p className="heroText">
          Create SEO-optimized Etsy titles, descriptions, tags and listing
          audits in seconds using AI-powered Etsy SEO analysis.
        </p>

        <div className="heroActions">
          <a href="/generate">
            <Button>
              Generate Listing
            </Button>
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
      </Card>
    </section>
  )
}