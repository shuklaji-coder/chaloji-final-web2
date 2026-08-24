"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  "/home page1.png",
  "/home page2.png",
  "/homepage3.png",
  "/home page4.png",
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrentSlide((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((slide) => (slide + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
      className="relative h-svh min-h-[420px] sm:min-h-[520px] w-full overflow-hidden bg-[#08090C]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Full-Screen Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Blurred Fill Background (mobile par letterbox area bharne ke liye) */}
          <img
            src={HERO_SLIDES[currentSlide]}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40 pointer-events-none select-none sm:hidden"
            draggable={false}
          />
          {/* Main Image — mobile par bada & immersive, desktop par full cover */}
          <img
            src={HERO_SLIDES[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="relative w-full h-full object-cover object-center scale-[1.02] sm:scale-100"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next Arrows */}
      <button
        onClick={() => goTo(currentSlide - 1, -1)}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => goTo(currentSlide + 1, 1)}
        aria-label="Next slide"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx, idx > currentSlide ? 1 : -1)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`relative h-2.5 rounded-full transition-all duration-300 after:absolute after:-inset-2.5 after:content-[''] ${
              currentSlide === idx
                ? "w-10 bg-emerald-400 shadow-lg shadow-emerald-400/50"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
