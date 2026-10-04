"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Crown, Sparkles, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";

interface SlideItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
}

const BAARAAT_SLIDES: SlideItem[] = [
  {
    id: "baarat-1",
    image: "/baarat1.png",
    title: "Royal Groom Entry & Decorated Fleet",
    subtitle: "Make your grand entry unforgettable with customized flower decorations and VIP escort.",
    tag: "BAARAT SPECIAL 01",
  },
  {
    id: "baarat-2",
    image: "/baarat2.png",
    title: "Synchronized Fortuner Convoy & VIP Escort",
    subtitle: "Commanding presence with 5+ black Fortuners, wireless radio intercom & uniformed chauffeurs.",
    tag: "CONVOY SQUAD 02",
  },
  {
    id: "baarat-3",
    image: "/baarat3.png",
    title: "Luxury Vintage & Executive Mobility",
    subtitle: "Heritage open-roof royal cars & luxury sedans for memorable groom and bride processions.",
    tag: "HERITAGE ICON 03",
  },
];

interface BaraatConvoyCarouselProps {
  onOpenEventModal?: () => void;
}

export function BaraatConvoyCarousel({ onOpenEventModal }: BaraatConvoyCarouselProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play interval handling (3 seconds auto-scroll)
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % BAARAAT_SLIDES.length);
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

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
    setActiveIndex((prev) => (prev + 1) % BAARAAT_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + BAARAAT_SLIDES.length) % BAARAAT_SLIDES.length);
  };

  // Spark burst confetti effect
  const triggerConfettiSparks = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x, y },
      colors: ["#F59E0B", "#F97316", "#EC4899", "#10B981", "#3B82F6"],
    });
  };

  return (
    <section 
      id="baarat-showcase" 
      className="relative w-full h-screen min-h-[650px] z-10 overflow-hidden bg-[#07080B] flex flex-col justify-between"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* FULL SCREEN CRISP IMAGE CANVAS (DEFAULT FULL SCREEN) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-2 sm:p-6 pt-12 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={BAARAAT_SLIDES[activeIndex].id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Unblurred, Sharp Image Scaling */}
            <img
              src={BAARAAT_SLIDES[activeIndex].image}
              alt={BAARAAT_SLIDES[activeIndex].title}
              className="w-full h-full object-contain object-center drop-shadow-2xl rounded-2xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FULL-SCREEN EDGE NAVIGATION ARROWS */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/80 border border-amber-500/30 text-white hover:text-amber-400 hover:border-amber-400 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/80 border border-amber-500/30 text-white hover:text-amber-400 hover:border-amber-400 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9" />
      </button>

      {/* BOTTOM FLOATING CONTROLS & THUMBNAIL BAR */}
      <div className="relative z-20 pb-6 sm:pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl">
        
        {/* Slide Title & CTA */}
        <div className="space-y-1.5 max-w-lg text-center md:text-left">
          <div className="inline-block">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              {BAARAAT_SLIDES[activeIndex].tag}
            </span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight">
            {BAARAAT_SLIDES[activeIndex].title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-1">
            {BAARAAT_SLIDES[activeIndex].subtitle}
          </p>
        </div>

        {/* Action Button & Autoplay Toggle */}
        <div className="flex items-center space-x-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              triggerConfettiSparks(e);
              if (onOpenEventModal) onOpenEventModal();
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/40 hover:shadow-amber-500/70 transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: "6s" }} />
            <span>Reserve Wedding Convoy</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-3 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            title={isAutoPlaying ? "Pause Autoplay" : "Play Autoplay"}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400" />}
          </motion.button>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-2">
            {BAARAAT_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 shrink-0 border-2 bg-black ${
                    isActive
                      ? "border-amber-400 scale-105 shadow-xl ring-2 ring-amber-400/40"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-16 h-12 sm:w-20 sm:h-14 object-contain p-0.5"
                  />
                  {isActive && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            0{activeIndex + 1} / 0{BAARAAT_SLIDES.length}
          </span>
        </div>

      </div>
    </section>
  );
}




