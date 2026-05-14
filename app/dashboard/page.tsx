import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="dashboardPage">
      <aside className="dashboardSidebar">
        <Link href="/" className="dashboardLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <nav className="dashboardMenu">
          <Link href="/dashboard" className="active">Dashboard</Link>
          <Link href="/generate">Generator</Link>
          <Link href="/history">History</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/settings">Settings</Link>
        </nav>

        <div className="sidebarUpgrade">
          <span>Free Plan</span>
          <h3>5 credits left</h3>
          <Link href="/pricing">Upgrade Pro</Link>
        </div>
      </aside>

      <section className="dashboardContent">
        <header className="dashboardHeader">
          <div>
            <span>Welcome back</span>
            <h1>Your EtsySEO AI Dashboard</h1>
          </div>

          <Link href="/generate" className="primaryBtn">
            Generate Listing
          </Link>
        </header>

        <div className="dashboardStats">
          <div className="dashCard">
            <span>Credits Remaining</span>
            <h2>5</h2>
            <p>Free monthly generations</p>
          </div>

          <div className="dashCard">
            <span>Listings Generated</span>
            <h2>24</h2>
            <p>Total SEO listings created</p>
          </div>

          <div className="dashCard">
            <span>Current Plan</span>
            <h2>Free</h2>
            <p>Upgrade anytime</p>
          </div>
        </div>

        <section className="dashboardGrid">
          <div className="dashPanel">
            <div className="panelHeader">
              <h3>Recent Listings</h3>
              <Link href="/history">View all</Link>
            </div>

            <div className="recentList">
              <div>
                <strong>Personalized Birthday Gift PNG</strong>
                <span>Generated 2 hours ago</span>
              </div>

              <div>
                <strong>Teacher Appreciation Shirt Design</strong>
                <span>Generated yesterday</span>
              </div>

              <div>
                <strong>Custom Family Name Wall Art</strong>
                <span>Generated 3 days ago</span>
              </div>
            </div>
          </div>

          <div className="dashPanel highlightPanel">
            <span>Pro Features</span>
            <h3>Unlock unlimited Etsy SEO generation</h3>
            <p>
              Get more credits, saved history, CSV export, smart tags and future
              bulk listing generation.
            </p>

            <Link href="/pricing" className="primaryBtn">
              Upgrade Pro
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}