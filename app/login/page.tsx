import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="authPage">
      <section className="authLeft">
        <Link href="/" className="authLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div>
          <span className="authBadge">Premium Etsy SEO Tool</span>

          <h1>Welcome back to EtsySEO AI</h1>

          <p>
            Login to generate Etsy SEO titles, tags, descriptions and optimized
            product listings faster.
          </p>
        </div>
      </section>

      <section className="authCard">
        <div className="authHeader">
          <h2>Login</h2>
          <p>Enter your details to continue.</p>
        </div>

        <form className="authForm">
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="button" className="authButton">
            Continue
          </button>

          <button type="button" className="googleButton">
            Continue with Google
          </button>
        </form>

        <p className="authSwitch">
          Don&apos;t have an account? <Link href="/signup">Create account</Link>
        </p>

        <Link href="/generate" className="skipLink">
          Continue without login
        </Link>
      </section>
    </main>
  );
}