import Link from "next/link";

const historyItems = [
  {
    title: "Personalized Birthday Gift PNG",
    category: "Home & Living > Home Decor",
    date: "Today",
    tags: ["personalized gift", "birthday gift", "custom png", "etsy seo"],
  },
  {
    title: "Teacher Appreciation Shirt Design",
    category: "Clothing > Gender-Neutral Adult Clothing",
    date: "Yesterday",
    tags: ["teacher gift", "shirt design", "school png", "gift for teacher"],
  },
  {
    title: "Custom Family Name Wall Art",
    category: "Home & Living > Wall Decor",
    date: "3 days ago",
    tags: ["family wall art", "custom decor", "home gift", "personalized"],
  },
];

export default function HistoryPage() {
  return (
    <main className="historyPage">
      <nav className="historyNav">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div className="navLinks">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/generate">Generator</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section className="historyHero">
        <span className="heroBadge">Saved Listings</span>

        <h1>
          Your generated <span>Etsy SEO history</span>
        </h1>

        <p>
          View your previous Etsy SEO listings, tags, categories and generated
          product ideas.
        </p>

        <Link href="/generate" className="primaryBtn">
          Generate New Listing
        </Link>
      </section>

      <section className="historyGrid">
        {historyItems.map((item) => (
          <article className="historyCard" key={item.title}>
            <div className="historyCardTop">
              <div>
                <span>{item.date}</span>
                <h3>{item.title}</h3>
              </div>

              <button>Copy</button>
            </div>

            <p>{item.category}</p>

            <div className="historyTags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}