import Card from "@/components/ui/Card"

const steps = [
  {
    number: "01",
    title: "Upload Product",
    text: "Upload your Etsy product image or paste a competitor title.",
  },

  {
    number: "02",
    title: "AI SEO Analysis",
    text: "AI analyzes buyer intent, keywords, tags and listing quality.",
  },

  {
    number: "03",
    title: "Optimize Listing",
    text: "Generate stronger Etsy titles, descriptions and SEO tags.",
  },

  {
    number: "04",
    title: "Publish Faster",
    text: "Use optimized Etsy listings with higher ranking potential.",
  },
]

export default function WorkflowSection() {
  return (
    <section className="workflowSection">
      <div className="sectionHeader">
        <span className="sectionBadge">
          AI-powered workflow
        </span>

        <h2 className="sectionTitle">
          From Product Image To Etsy Listing
        </h2>

        <p className="sectionText">
          EtsySEO AI simplifies Etsy SEO generation into one premium AI
          workflow.
        </p>
      </div>

      <div className="workflowGrid">
        {steps.map((step) => (
          <Card key={step.number} className="workflowCard">
            <div className="workflowNumber">
              {step.number}
            </div>

            <h3>{step.title}</h3>

            <p>{step.text}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}