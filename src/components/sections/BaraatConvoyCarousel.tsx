"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Crown, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, Calendar, PhoneCall, Zap, Star } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";

interface WeddingVehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: string;
  features: string[];
  decorated: boolean;
  rating: string;
}

const WEDDING_FLEET: WeddingVehicle[] = [
  {
    id: "audi",
    name: "Audi A6 Matrix Luxury",
    category: "Royal Groom Special",
    image: "/home page4.png",
    pricePerDay: "₹18,500 / day",
    features: ["Flower Decoration Included", "Uniformed Chauffeur", "VIP Escort Flashing Lights"],
    decorated: true,
    rating: "5.0 ★",
  },
  {
    id: "mercedes",
    name: "Mercedes Benz E-Class",
    category: "VIP Convoy Lead",
    image: "/home page1.png",
    pricePerDay: "₹22,000 / day",
    features: ["Panoramero Sunroof", "Champagne & Red Carpet", "24/7 Convoy Lead GPS"],
    decorated: true,
    rating: "5.0 ★",
  },
  {
    id: "vintage",
    name: "Vintage Open Top Royal Car",
    category: "Heritage Baarat Icon",
    image: "/homepage3.png",
    pricePerDay: "₹35,000 / day",
    features: ["Retro Brass Horn", "Royal Chariot Theme", "Photographer Slow Drive"],
    decorated: true,
    rating: "4.9 ★",
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner Legender Convoy",
    category: "Groom Squad Fleet (5 SUVs)",
    image: "/services.png",
    pricePerDay: "₹45,000 / convoy",
    features: ["5 Black Fortuners", "Wireless Intercom Radio", "Police Security Clearance"],
    decorated: false,
    rating: "4.9 ★",
  },
];

export function BaraatConvoyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % WEDDING_FLEET.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + WEDDING_FLEET.length) % WEDDING_FLEET.length);
  };

  // Particle Spark Burst on Button Hover or Click
  const triggerConfettiSparks = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ["#10B981", "#F97316", "#06B6D4", "#FBBF24"],
    });
  };

  return (
    <section id="baarat-showcase" className="relative py-16 sm:py-28 z-10 overflow-hidden bg-[#07080B]">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-amber-500/20">
            <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>EXECUTIVE WEDDING MOBILITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Grand Baarat & <br />
            <span className="text-gradient-amber">Luxury Wedding Convoy</span>
          </h2>

          <p className="text-base text-gray-300">
            Make your wedding entry unforgettable. Rent premium luxury sedans, vintage open-roof cars, and synchronized Fortuner convoys with flower decorations & uniformed chauffeurs.
          </p>

          <Shayari className="text-amber-100/80">
            Shehnai baja de, baarat saja le — royal safar ab Chaloji karwaye!
          </Shayari>
        </div>

        {/* 3D Coverflow Carousel Container */}
        <div className="relative flex flex-col items-center justify-center min-h-[480px]">
          
          <div
            className="relative w-full max-w-4xl h-[520px] sm:h-[460px] lg:h-[420px] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {WEDDING_FLEET.map((vehicle, index) => {
              // Calculate offset relative to activeIndex
              const offset = (index - activeIndex + WEDDING_FLEET.length) % WEDDING_FLEET.length;
              let position = offset;
              if (offset > WEDDING_FLEET.length / 2) {
                position = offset - WEDDING_FLEET.length;
              }

              const isActive = position === 0;

              return (
                <motion.div
                  key={vehicle.id}
                  initial={false}
                  animate={{
                    x: isMobile ? 0 : position * 220,
                    scale: isActive ? 1 : 0.82,
                    rotateY: isMobile ? 0 : position * -18,
                    zIndex: isActive ? 30 : 20 - Math.abs(position),
                    opacity: Math.abs(position) > 1 ? 0 : isActive ? 1 : isMobile ? 0 : 0.65,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={`absolute w-full max-w-md rounded-3xl glass-card border p-5 sm:p-6 shadow-2xl overflow-hidden cursor-pointer ${
                    isActive
                      ? "border-amber-500/50 shadow-amber-500/20"
                      : "border-white/10"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Vehicle Image Container */}
                  <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden mb-5 bg-[#0B0E17] flex items-center justify-center">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 bg-amber-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase">
                      {vehicle.category}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl text-white font-mono font-bold text-xs border border-white/10">
                      {vehicle.pricePerDay}
                    </div>
                  </div>

                  {/* Vehicle Specs & Name */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                        {vehicle.name}
                      </h3>
                      <span className="shrink-0 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        {vehicle.rating}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {vehicle.features.map((feat, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {isActive && (
                      <div className="pt-2">
                        <button
                          onClick={triggerConfettiSparks}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                        >
                          <Sparkles className="w-4 h-4 text-black animate-spin-slow" />
                          <span>Reserve Wedding Convoy</span>
                        </button>
                      </div>
                    )}

                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center space-x-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300"
              data-cursor-expand="true"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {WEDDING_FLEET.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to convoy ${idx + 1}`}
                  className={`relative h-2 rounded-full transition-all duration-300 after:absolute after:-inset-2.5 after:content-[''] ${
                    activeIndex === idx ? "w-8 bg-amber-400" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300"
              data-cursor-expand="true"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
