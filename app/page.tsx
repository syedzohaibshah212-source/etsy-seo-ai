import Navbar from "@/components/layout/Navbar"
import Container from "@/components/layout/Container"
import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import PricingPreview from "@/components/home/PricingPreview"
import CTASection from "@/components/home/CTASection"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Container>
        <HeroSection />
        <FeaturesSection />
        <PricingPreview />
        <CTASection />
        <Footer />
      </Container>
    </main>
  )
}