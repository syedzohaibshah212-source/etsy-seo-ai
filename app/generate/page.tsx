export default function GeneratePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07111f",
        color: "white",
        padding: "120px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              color: "#10b981",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            AI ETSY GENERATOR
          </span>

          <h1
            style={{
              fontSize: "72px",
              lineHeight: 1,
              marginTop: "20px",
              fontWeight: 900,
            }}
          >
            Generate Etsy Listings
          </h1>

          <p
            style={{
              marginTop: "24px",
              color: "#94a3b8",
              fontSize: "18px",
              lineHeight: 1.7,
            }}
          >
            Upload product images, analyze competitors and generate optimized
            Etsy SEO listings using 12 advanced AI methods.
          </p>

          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "14px",
            }}
          >
            <div>✓ 12 SEO optimization methods</div>
            <div>✓ Competitor title analysis</div>
            <div>✓ AI-generated Etsy descriptions</div>
            <div>✓ Smart keyword targeting</div>
          </div>
        </div>

        <div
          style={{
            borderRadius: "30px",
            padding: "30px",
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h3
            style={{
              fontSize: "28px",
              marginBottom: "24px",
            }}
          >
            Upload Product Image
          </h3>

          <div
            style={{
              height: "260px",
              borderRadius: "24px",
              border: "2px dashed rgba(255,255,255,.15)",
              display: "grid",
              placeItems: "center",
              color: "#94a3b8",
            }}
          >
            Drag & Drop PNG/JPG Here
          </div>

          <input
            placeholder="Paste competitor Etsy title..."
            style={{
              width: "100%",
              marginTop: "24px",
              padding: "18px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.05)",
              color: "white",
            }}
          />

          <button
            style={{
              marginTop: "24px",
              width: "100%",
              padding: "18px",
              borderRadius: "16px",
              border: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg,#f5b85b,#10b981)",
            }}
          >
            Generate SEO Listing
          </button>
        </div>
      </div>
    </main>
  )
}