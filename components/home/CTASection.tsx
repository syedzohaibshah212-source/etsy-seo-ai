import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function CTASection() {
  return (
    <section className="ctaSection">
      <Card className="ctaCard">
        <div className="ctaGlow" />

        <span className="ctaBadge">
          Stop Guessing Etsy SEO
        </span>

        <h2 className="ctaTitle">
          Create Higher Ranking Etsy Listings With AI
        </h2>

        <p className="ctaText">
          EtsySEO AI helps Etsy sellers generate optimized titles, keyword-rich
          tags, AI descriptions, listing audits and SEO scores in minutes
          instead of hours.
        </p>

        <div className="ctaStats">
          <div className="ctaStat">
            <strong>12K+</strong>
            <span>Listings Generated</span>
          </div>

          <div className="ctaStat">
            <strong>3.1M+</strong>
            <span>Keywords Processed</span>
          </div>

          <div className="ctaStat">
            <strong>4.9/5</strong>
            <span>Seller Rating</span>
          </div>
        </div>

        <div className="ctaActions">
          <a href="/generate">
            <Button>
              Generate My Etsy Listing
            </Button>
          </a>

          <a href="/audit" className="ctaSecondaryBtn">
            Audit Existing Listing
          </a>
        </div>

        <div className="ctaBottomText">
          Built specifically for Etsy digital product sellers, PNG creators and
          print-on-demand shops.
        </div>
      </Card>
    </section>
  )
}