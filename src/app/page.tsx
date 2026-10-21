"use client";

import React, { useState } from "react";
import { LenisProvider } from "@/components/vfx/LenisProvider";
import { CyberBackground } from "@/components/vfx/CyberBackground";
import { ScrollProgress } from "@/components/vfx/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { EventBookingModal } from "@/components/layout/EventBookingModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { HighlightsMarquee } from "@/components/sections/HighlightsMarquee";
import { MotivationalQuotesMarquee } from "@/components/sections/MotivationalQuotesMarquee";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { BaraatConvoyCarousel } from "@/components/sections/BaraatConvoyCarousel";
import { DriverJoinSection } from "@/components/sections/DriverJoinSection";
import { EarningsCalculator } from "@/components/sections/EarningsCalculator";
import { SafetyTrustSection } from "@/components/sections/SafetyTrustSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export default function Home() {
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const handleInstantBook = () => {
    window.location.href = "/ride";
  };

  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-[#041611] text-[#F4F7F5] overflow-x-hidden selection:bg-[#DFC993] selection:text-[#041611]">
        {/* Global Scroll Progress Bar */}
        <ScrollProgress />

        {/* Global VFX & Cursors */}
        <CyberBackground />

        {/* Global Navigation */}
        <Navbar 
          onInstantBook={handleInstantBook} 
          onOpenEventModal={() => setEventModalOpen(true)}
        />

        {/* Wedding & Outstation Package Request Modal */}
        <EventBookingModal open={eventModalOpen} onClose={() => setEventModalOpen(false)} />

        {/* Main Content Blueprint */}
        <div className="relative z-10 space-y-0">
          <HeroSection onInstantBook={handleInstantBook} />

          <AppDownloadSection />
          <StatsStrip />
          <HighlightsMarquee />
          <MotivationalQuotesMarquee />
          <BaraatConvoyCarousel onOpenEventModal={() => setEventModalOpen(true)} />
          <ShowcaseSection />
          <DriverJoinSection />
          <EarningsCalculator />
          <SafetyTrustSection />
          <TeamSection />
          <TestimonialMarquee />
          <FaqSection />
          <CTASection />
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />

        {/* Scroll to Top */}
        <ScrollToTop />
      </main>
    </LenisProvider>
  );
}
