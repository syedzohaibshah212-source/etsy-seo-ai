import Card from "@/components/ui/Card"

const testimonials = [
  {
    name: "Sarah • Digital Print Seller",
    text: "My Etsy traffic increased after rewriting titles with EtsySEO AI.",
  },
  {
    name: "Daniel • POD Store Owner",
    text: "The keyword opportunities feature saves me hours every week.",
  },
  {
    name: "Emily • Etsy Top Seller",
    text: "The AI descriptions feel premium and actually convert buyers.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="testimonialsSection">
      <div className="sectionHeader">
        <span className="sectionBadge">
          Seller Testimonials
        </span>

        <h2 className="sectionTitle">
          Trusted By Etsy Sellers
        </h2>

        <p className="sectionText">
          Thousands of Etsy sellers use EtsySEO AI to improve visibility,
          ranking and listing quality.
        </p>
      </div>

      <div className="testimonialsGrid">
        {testimonials.map((item) => (
          <Card key={item.name} className="testimonialCard">
            <div className="testimonialStars">
              ★★★★★
            </div>

            <p>{item.text}</p>

            <strong>{item.name}</strong>
          </Card>
        ))}
      </div>
    </section>
  )
}