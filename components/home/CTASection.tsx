import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function CTASection() {
  return (
    <section className="ctaSection">
      <Card className="ctaCard">
        <div className="ctaGlow" />

        <span className="ctaBadge">
          Start Creating Better Etsy Listings
        </span>

        <h2 className="ctaTitle">
          Let AI Handle Your Etsy SEO
        </h2>

        <p className="ctaText">
          Generate optimized Etsy titles, descriptions, tags, categories,
          materials, occasions, and target audiences in seconds using AI.
        </p>

        <div className="ctaActions">
          <a href="/generate">
            <Button>
              Generate Listing
            </Button>
          </a>

          <a href="/pricing" className="ctaSecondaryBtn">
            View Pricing
          </a>
        </div>
      </Card>
    </section>
  )
}