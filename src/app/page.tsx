"use client";

import React, { useState } from "react";
import { LenisProvider } from "@/components/vfx/LenisProvider";
import { CyberBackground } from "@/components/vfx/CyberBackground";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BookingModal } from "@/components/layout/BookingModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { HighlightsMarquee } from "@/components/sections/HighlightsMarquee";
import { MotivationalQuotesMarquee } from "@/components/sections/MotivationalQuotesMarquee";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-[#08090C] text-[#E2E8F0] overflow-x-hidden selection:bg-emerald-400 selection:text-black">
        {/* Global VFX & Cursors */}
        <CyberBackground />

        {/* Global Navigation */}
        <Navbar onInstantBook={() => setBookingOpen(true)} />

        {/* Instant Ride Booking Modal */}
        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

        {/* Main Content Blueprint */}
        <div className="relative z-10 space-y-0">
          <HeroSection />
          <AppDownloadSection />
          <HighlightsMarquee />
          <MotivationalQuotesMarquee />
          <ShowcaseSection />
          <TeamSection />
          <TestimonialMarquee />
          <FaqSection />
          <CTASection />
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />
      </main>
    </LenisProvider>
  );
}
