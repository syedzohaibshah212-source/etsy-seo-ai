import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function HeroSection() {
  return (
    <section className="heroSection">
      <Card className="heroCard">
        <div className="heroBadge">
          Etsy SEO AI for PNG sellers, POD shops & digital products
        </div>

        <h1 className="heroTitle">
          Turn Product Images Into Etsy Titles, Tags & SEO Scores
        </h1>

        <p className="heroText">
          Upload your PNG design and EtsySEO AI analyzes the artwork, creates an
          optimized title, writes a buyer-focused description, generates 13 Etsy
          tags, finds keyword opportunities and gives you a real SEO score.
        </p>

        <div className="heroActions">
          <a href="/generate">
            <Button>
              Generate My Listing
            </Button>
          </a>

          <a href="/audit" className="heroSecondaryBtn">
            Audit Existing Listing
          </a>
        </div>

        <div className="heroStats">
          <span>13 Etsy Tags</span>
          <span>SEO Score</span>
          <span>Keyword Opportunities</span>
          <span>Listing Audit</span>
        </div>

        <div className="heroPreview">
          <div className="heroPreviewTop">
            <span>Before</span>
            <p>cute mom flower png shirt design</p>
          </div>

          <div className="heroPreviewArrow">↓</div>

          <div className="heroPreviewBottom">
            <span>After EtsySEO AI</span>
            <p>
              Floral Mom PNG Design, Mother&apos;s Day Digital Download, Cute
              Botanical Shirt Graphic
            </p>
          </div>

          <div className="heroPreviewTags">
            <span>mom png</span>
            <span>floral png</span>
            <span>mothers day png</span>
            <span>shirt graphic</span>
          </div>
        </div>
      </Card>
    </section>
  )
}