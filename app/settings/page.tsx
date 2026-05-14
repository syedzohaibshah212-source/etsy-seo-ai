export default function SettingsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: 900,
            marginBottom: "10px",
          }}
        >
          Settings
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "40px",
          }}
        >
          Manage your EtsySEO AI account settings.
        </p>

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Profile</h2>
            <p style={{ color: "#94a3b8" }}>
              Name, email, and account information.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Subscription</h2>
            <p style={{ color: "#94a3b8" }}>
              Manage your pricing plan and credits.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>AI Preferences</h2>
            <p style={{ color: "#94a3b8" }}>
              Configure SEO generation behavior and defaults.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}