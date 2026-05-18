import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

const plans = [
  {
    name: "Free",
    price: "$0",
    description:
      "Perfect for testing AI-powered Etsy SEO generation.",
    features: [
      "5 AI generations",
      "Basic SEO scores",
      "13 optimized tags",
      "Listing audit access",
      "Saved history",
    ],
    button: "Start Free",
  },

  {
    name: "Pro",
    price: "$19",
    description:
      "Built for active Etsy sellers scaling traffic and conversions.",
    features: [
      "500 AI generations/month",
      "Advanced AI SEO engine",
      "All 12 SEO methods",
      "Competitor analysis",
      "CSV export",
      "Priority AI quality",
      "Full audit system",
    ],
    button: "Upgrade To Pro",
    featured: true,
  },

  {
    name: "Agency",
    price: "$49",
    description:
      "For agencies, teams and high-volume Etsy operations.",
    features: [
      "2,000 AI generations/month",
      "Bulk listing workflow",
      "Multiple shop workflow",
      "Advanced exports",
      "Priority support",
      "Future analytics tools",
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
          Simple pricing
        </span>

        <h2 className="sectionTitle">
          Pricing Built For Etsy Sellers
        </h2>

        <p className="sectionText">
          Start free and upgrade as your Etsy business grows.
          No contracts. Cancel anytime.
        </p>
      </div>

      <div className="premiumPricingGrid">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`premiumPricingCard ${
              plan.featured ? "premiumPricingFeatured" : ""
            }`}
          >
            {plan.featured && (
              <div className="premiumPricingBadge">
                MOST POPULAR
              </div>
            )}

            <div className="premiumPricingTop">
              <h3>{plan.name}</h3>

              <div className="premiumPricingPrice">
                {plan.price}

                <span>/month</span>
              </div>

              <p>{plan.description}</p>
            </div>

            <ul className="premiumPricingFeatures">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span>✓</span>
                  {feature}
                </li>
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
    </section>
  )
}