"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";

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
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play interval handling (3.5 seconds auto-scroll)
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % BAARAAT_SLIDES.length);
      }, 3500);
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
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % BAARAAT_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + BAARAAT_SLIDES.length) % BAARAAT_SLIDES.length);
  };

  // Spark burst confetti effect
  const triggerConfettiSparks = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 65,
      spread: 80,
      origin: { x, y },
      colors: ["#DFC993", "#10B981", "#F7EBD2", "#059669", "#B58E4A"],
    });
  };

  return (
    <section 
      id="baarat-showcase" 
      className="relative w-full h-screen min-h-[650px] z-10 overflow-hidden bg-[#041611] flex flex-col justify-between"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#DFC993]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* FULL SCREEN CRISP IMAGE CANVAS WITH DIRECTION-AWARE TRANSITION */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-2 sm:p-6 pt-12 pb-32 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={BAARAAT_SLIDES[activeIndex].id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -80, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
      <motion.button
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.92 }}
        onClick={handlePrev}
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#041611]/80 border border-[#DFC993]/35 text-[#F7EBD2] hover:text-[#DFC993] hover:border-[#10B981] transition-all duration-300 flex items-center justify-center shadow-2xl"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleNext}
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#041611]/80 border border-[#DFC993]/35 text-[#F7EBD2] hover:text-[#DFC993] hover:border-[#10B981] transition-all duration-300 flex items-center justify-center shadow-2xl"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9" />
      </motion.button>

      {/* BOTTOM FLOATING CONTROLS & THUMBNAIL BAR */}
      <div className="relative z-20 pb-6 sm:pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-[#041611]/85 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-[#DFC993]/20 shadow-2xl">
        
        {/* Autoplay Line Indicator at Top of Control Bar */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-white/10 overflow-hidden rounded-full">
          {isAutoPlaying && (
            <motion.div
              key={activeIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.5, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981]"
            />
          )}
        </div>

        {/* Slide Title & CTA */}
        <div className="space-y-1.5 max-w-lg text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={BAARAAT_SLIDES[activeIndex].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-block">
                <span className="px-3 py-1 rounded-full bg-[#DFC993]/20 border border-[#DFC993]/40 text-[#F7EBD2] text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                  {BAARAAT_SLIDES[activeIndex].tag}
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight mt-1">
                {BAARAAT_SLIDES[activeIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-1">
                {BAARAAT_SLIDES[activeIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
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
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#DFC993] via-[#F3E1BD] to-[#C8A463] text-[#041611] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#DFC993]/40 hover:shadow-emerald-500/50 transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#041611] animate-spin" style={{ animationDuration: "6s" }} />
            <span>Reserve Wedding Convoy</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-3 rounded-2xl bg-white/10 border border-[#DFC993]/20 text-[#F7EBD2] hover:bg-white/20 transition-all"
            title={isAutoPlaying ? "Pause Autoplay" : "Play Autoplay"}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-[#DFC993]" /> : <Play className="w-4 h-4 text-[#DFC993]" />}
          </motion.button>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-2">
            {BAARAAT_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.button
                  key={slide.id}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`relative rounded-xl overflow-hidden shrink-0 border-2 bg-black ${
                    isActive
                      ? "border-[#DFC993] shadow-xl ring-2 ring-[#DFC993]/40"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-16 h-12 sm:w-20 sm:h-14 object-contain p-0.5"
                  />
                  {isActive && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#DFC993] animate-pulse" />
                  )}
                </motion.button>
              );
            })}
          </div>

          <span className="text-xs font-mono font-bold text-[#F7EBD2] bg-[#DFC993]/15 px-3 py-1 rounded-full border border-[#DFC993]/30">
            0{activeIndex + 1} / 0{BAARAAT_SLIDES.length}
          </span>
        </div>

      </div>
    </section>
  );
}
