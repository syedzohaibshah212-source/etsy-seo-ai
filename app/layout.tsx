import "./globals.css"
import "./generate/style.css"
import PremiumEffects from "@/components/effects/PremiumEffects"

export const metadata = {
  title: "Etsy SEO AI",
  description: "AI Etsy Listing Generator",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <PremiumEffects />
        {children}
      </body>
    </html>
  )
}