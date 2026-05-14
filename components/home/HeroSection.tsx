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
          Create Etsy Listings That Look Premium & Rank Better
        </h1>

        <p className="heroText">
          Upload your product image, add a competitor title, and generate an
          optimized Etsy title, description, tags, category, material, occasion,
          and target audience in seconds.
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
          <span>13 Etsy Tags</span>
          <span>SEO Title</span>
          <span>AI Description</span>
        </div>
      </Card>
    </section>
  )
}