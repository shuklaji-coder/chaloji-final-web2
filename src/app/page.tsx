"use client";

import React, { useState } from "react";
import { LenisProvider } from "@/components/vfx/LenisProvider";
import { CyberBackground } from "@/components/vfx/CyberBackground";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { EventBookingModal } from "@/components/layout/EventBookingModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { HighlightsMarquee } from "@/components/sections/HighlightsMarquee";
import { MotivationalQuotesMarquee } from "@/components/sections/MotivationalQuotesMarquee";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { BaraatConvoyCarousel } from "@/components/sections/BaraatConvoyCarousel";
import { DriverJoinSection } from "@/components/sections/DriverJoinSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { SafetyTrustSection } from "@/components/sections/SafetyTrustSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export default function Home() {
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const handleInstantBook = () => {
    window.open(
      "https://wa.me/918087747774?text=🚖%20Hi%20Chaloji%2C%20I%20want%20to%20book%20a%20ride!",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-[#08090C] text-[#E2E8F0] overflow-x-hidden selection:bg-emerald-400 selection:text-black">
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
          <HighlightsMarquee />
          <MotivationalQuotesMarquee />
          <BaraatConvoyCarousel onOpenEventModal={() => setEventModalOpen(true)} />
          <ShowcaseSection />
          <DriverJoinSection />
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
