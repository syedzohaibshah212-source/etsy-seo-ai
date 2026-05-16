import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

const plans = [
  {
    name: "Free",
    price: "$0",
    text: "Perfect for new Etsy sellers testing AI SEO optimization.",
    features: [
      "5 AI generations",
      "Basic Etsy SEO scores",
      "13 AI tags",
      "Listing audit access",
      "Keyword suggestions",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    text: "Best for serious Etsy sellers growing traffic and sales.",
    features: [
      "Unlimited generations",
      "Advanced AI SEO engine",
      "All 12 SEO methods",
      "Competitor gap analysis",
      "Advanced keyword opportunities",
      "Priority AI quality",
      "Full listing audit system",
    ],
    featured: true,
  },
  {
    name: "Business",
    price: "$49",
    text: "Built for agencies, large Etsy shops and scaling teams.",
    features: [
      "Bulk listing generation",
      "CSV export system",
      "Team-ready workflow",
      "Future analytics tools",
      "Priority support",
      "High-volume optimization",
      "Advanced shop management",
    ],
  },
]

export default function PricingPreview() {
  return (
    <section className="pricingPreview">
      <div className="sectionHeader">
        <span className="sectionBadge">
          Flexible Etsy seller pricing
        </span>

        <h2 className="sectionTitle">
          Start Free. Scale Your Etsy Shop Faster.
        </h2>

        <p className="sectionText">
          Whether you&apos;re testing your first digital PNG listing or managing
          thousands of Etsy products, EtsySEO AI helps you generate optimized
          listings faster with AI-powered SEO analysis.
        </p>
      </div>

      <div className="pricingGrid">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`pricingCard ${
              plan.featured ? "pricingFeatured" : ""
            }`}
          >
            {plan.featured && (
              <div className="pricingPopularBadge">
                MOST POPULAR
              </div>
            )}

            <h3>{plan.name}</h3>

            <div className="pricingPrice">
              {plan.price}
              <span>/mo</span>
            </div>

            <p>{plan.text}</p>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <a href="/pricing">
              <Button className="pricingButton">
                {plan.featured
                  ? "Upgrade To Pro"
                  : "View Plan"}
              </Button>
            </a>
          </Card>
        ))}
      </div>

      <div className="pricingBottomText">
        No contracts. Cancel anytime. Built for Etsy SEO growth.
      </div>
    </section>
  )
}