"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Sparkles, Navigation } from "lucide-react";

const DESKTOP_SLIDES = [
  "/home page7.png",
  "/image copy 2.png",
  "/home page.png",
  "/home page1.png",
  "/home page2.png",
  "/homepage3.png",
  "/home page4.png",
];

const MOBILE_SLIDES = [
  "/home page7.png",
  "/image copy 2.png",
  "/home page.png",
  "/ea8530f0-39ca-4eae-bde0-463c0b4773f0.png",
  "/bf915cff-011f-4eb0-99cf-f0afdb56366a.png",
  "/db893559-c633-450f-a2db-8a14d08140c5.png",
];

export function HeroSection({ onInstantBook }: { onInstantBook?: (pickup?: string, drop?: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const HERO_SLIDES = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setCurrentSlide(0);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrentSlide((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((slide) => (slide + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      goTo(currentSlide + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    }
    setTouchStartX(null);
  };

  return (
    <section
      className="hero-fullbleed relative h-svh min-h-[100svh] sm:min-h-[520px] w-full overflow-hidden bg-[#041611]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-Screen Slides with Ken Burns motion */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08, x: direction * 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.96, x: direction * -50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Blurred Fill Background — depth layer */}
          <img
            src={HERO_SLIDES[currentSlide]}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-35 pointer-events-none select-none"
            draggable={false}
          />
          {/* Main Image */}
          <motion.img
            src={HERO_SLIDES[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 4.5, ease: "easeOut" }}
            className="relative block w-full h-full object-cover object-[center_30%] sm:object-center"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#041611] via-transparent to-[#041611]/60 pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#041611] via-[#041611]/80 to-transparent pointer-events-none z-10" />

      {/* Floating Badges with Spring Motion (Desktop & Tablet) */}
      <div className="hidden sm:block absolute top-28 left-8 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div
            animate={{ y: [-4, 5, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel px-4 py-2.5 rounded-2xl border border-[#DFC993]/35 flex items-center space-x-2.5 shadow-2xl backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#DFC993] font-bold">100% Guaranteed</p>
              <p className="text-xs font-black text-white font-display">Zero Surge Pricing</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hidden sm:block absolute top-28 right-8 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div
            animate={{ y: [4, -5, 4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel px-4 py-2.5 rounded-2xl border border-emerald-500/35 flex items-center space-x-2.5 shadow-2xl backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-lg bg-[#DFC993]/20 flex items-center justify-center text-[#DFC993]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Rapid Dispatch</p>
              <p className="text-xs font-black text-white font-display">Ride in 2 Minutes</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Prev / Next Arrows */}
      <motion.button
        whileHover={{ scale: 1.12, x: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => goTo(currentSlide - 1, -1)}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel border border-[#DFC993]/30 flex items-center justify-center text-[#F7EBD2] hover:text-[#10B981] hover:border-[#10B981]/70 shadow-lg shadow-black/50 transition-colors duration-300"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.12, x: 2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => goTo(currentSlide + 1, 1)}
        aria-label="Next slide"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel border border-[#DFC993]/30 flex items-center justify-center text-[#F7EBD2] hover:text-[#10B981] hover:border-[#10B981]/70 shadow-lg shadow-black/50 transition-colors duration-300"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Floating Bottom Bar: Active Indicators & Slide Timer Line */}
      <div className="safe-bottom absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-3 pb-2">
        
        {/* Animated Slide Progress Bar */}
        <div className="w-40 sm:w-56 h-[3px] bg-white/15 rounded-full overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "linear" }}
            className="h-full bg-gradient-to-r from-[#DFC993] to-[#10B981]"
          />
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center space-x-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx, idx > currentSlide ? 1 : -1)}
              aria-label={`Go to slide ${idx + 1}`}
              className="relative p-1.5 focus:outline-none"
            >
              {currentSlide === idx ? (
                <motion.div
                  layoutId="hero-active-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="w-8 h-2.5 rounded-full bg-gradient-to-r from-[#DFC993] to-[#10B981] shadow-lg shadow-[#DFC993]/50 ring-2 ring-[#DFC993]/30"
                />
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-[#DFC993]/70 transition-colors duration-200" />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter Badge */}
        <div className="px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-[#DFC993]">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </div>
      </div>
    </section>
  );
}
