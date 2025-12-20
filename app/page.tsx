import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PreviewFeedSection } from "@/components/home/preview-feed-section"
import { AboutSection } from "@/components/home/about-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <main>
        <HeroSection />
        <PreviewFeedSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
