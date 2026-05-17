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
      "Saved history",
    ],
    button: "Start Free",
  },
  {
    name: "Pro",
    price: "$19",
    text: "Best for active Etsy sellers growing traffic and sales.",
    features: [
      "500 AI generations/month",
      "Advanced AI SEO engine",
      "All 12 SEO methods",
      "Competitor title analysis",
      "CSV export",
      "Priority AI quality",
      "Full listing audit system",
    ],
    button: "Upgrade To Pro",
    featured: true,
  },
  {
    name: "Agency",
    price: "$49",
    text: "Built for large Etsy shops, agencies and high-volume sellers.",
    features: [
      "2,000 AI generations/month",
      "Bulk listing workflow",
      "CSV export system",
      "Multiple shop workflow",
      "Priority support",
      "Advanced analytics soon",
      "Team-ready structure",
    ],
    button: "Start Agency",
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
                {plan.button}
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