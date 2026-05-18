import Card from "@/components/ui/Card"

const testimonials = [
  {
    name: "Sarah • Digital Print Seller",
    role: "Etsy Digital Products",
    text: "My Etsy listings started ranking better after switching to EtsySEO AI. The keyword optimization alone saves hours every week.",
  },

  {
    name: "Daniel • POD Store Owner",
    role: "Print-On-Demand Seller",
    text: "The AI audit system instantly shows what is hurting my Etsy SEO and gives better optimized titles and tags.",
  },

  {
    name: "Emily • Etsy Top Seller",
    role: "Top Etsy Creator",
    text: "The generated descriptions actually sound premium and convert much better than generic AI copy tools.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="testimonialsSection premiumTestimonialsSection">
      <div className="sectionHeader">
        <span className="sectionBadge">
          Trusted by Etsy sellers
        </span>

        <h2 className="sectionTitle">
          Built For Real Etsy Growth
        </h2>

        <p className="sectionText">
          EtsySEO AI helps digital creators, print-on-demand sellers and Etsy
          shops generate stronger SEO listings faster.
        </p>
      </div>

      <div className="premiumTestimonialsGrid">
        {testimonials.map((item, index) => (
          <Card
            key={item.name}
            className={`premiumTestimonialCard ${
              index === 1 ? "premiumTestimonialFeatured" : ""
            }`}
          >
            <div className="testimonialGlow" />

            <div className="premiumTestimonialTop">
              <div className="testimonialAvatar">
                {item.name.charAt(0)}
              </div>

              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </div>

            <div className="testimonialStars">
              ★★★★★
            </div>

            <p>{item.text}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}