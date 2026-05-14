import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

const plans = [
  {
    name: "Free",
    price: "$0",
    text: "Perfect for testing EtsySEO AI.",
    features: ["5 AI generations", "Basic SEO title", "13 Etsy tags"],
  },
  {
    name: "Pro",
    price: "$19",
    text: "Best for active Etsy sellers.",
    features: ["Unlimited listings", "Advanced SEO copy", "Priority AI quality"],
    featured: true,
  },
  {
    name: "Business",
    price: "$49",
    text: "For shops managing many products.",
    features: ["Bulk generation", "CSV export", "Team-ready workflow"],
  },
]

export default function PricingPreview() {
  return (
    <section className="pricingPreview">
      <div className="sectionHeader">
        <span className="sectionBadge">Simple Pricing</span>

        <h2 className="sectionTitle">
          Start Free, Upgrade When You Grow
        </h2>

        <p className="sectionText">
          Choose a plan that fits your Etsy shop. Start with free generations and
          unlock more power as your store grows.
        </p>
      </div>

      <div className="pricingGrid">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`pricingCard ${plan.featured ? "pricingFeatured" : ""}`}
          >
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
                View Plan
              </Button>
            </a>
          </Card>
        ))}
      </div>
    </section>
  )
}