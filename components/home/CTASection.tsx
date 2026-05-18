import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function CTASection() {
  return (
    <section className="ctaSection">
      <Card className="ctaCard premiumCtaCard">
        <div className="ctaGlow" />

        <span className="ctaBadge">
          AI-powered Etsy SEO workflow
        </span>

        <h2 className="ctaTitle">
          Start Creating Better Etsy Listings In Minutes
        </h2>

        <p className="ctaText">
          Generate optimized Etsy titles, descriptions, tags and listing audits
          using AI trained for modern Etsy SEO workflows.
        </p>

        <div className="ctaStats">
          <div className="ctaStat">
            <strong>25K+</strong>
            <span>AI Listings Generated</span>
          </div>

          <div className="ctaStat">
            <strong>92%</strong>
            <span>Average SEO Score</span>
          </div>

          <div className="ctaStat">
            <strong>13</strong>
            <span>Optimized Etsy Tags</span>
          </div>
        </div>

        <div className="ctaActions">
          <a href="/generate">
            <Button>
              Generate My Listing
            </Button>
          </a>

          <a href="/pricing" className="ctaSecondaryBtn">
            View Pricing
          </a>
        </div>

        <div className="ctaBottomText">
          Built for Etsy sellers, PNG creators, print-on-demand shops and
          digital product businesses.
        </div>
      </Card>
    </section>
  )
}