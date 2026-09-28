import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import { CombineSection } from "@/components/CombineSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BogolanFlight } from "@/components/scroll/BogolanFlight";
import { CityMarquee } from "@/components/scroll/CityMarquee";

// Section order mirrors the Vita Travel reference:
// intro → retreats → about → featured → combine → destination → how it works → practitioners → footer
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation />
      <HeroSection />
      <BogolanFlight />
      <ServicesSection />
      <AboutSection />
      <CityMarquee />
      <FeaturedSection />
      <CombineSection />
      <DestinationsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
