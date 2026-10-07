"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

const DESKTOP_SLIDES = [
  "/image copy 2.png",
  "/home page.png",
  "/home page1.png",
  "/home page2.png",
  "/homepage3.png",
  "/home page4.png",
];

const MOBILE_SLIDES = [
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
    }, 4000);
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
      className="hero-fullbleed relative h-svh min-h-[100svh] sm:min-h-[520px] w-full overflow-hidden bg-[#08090C]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Full-Screen Slides with Ken Burns motion */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08, x: direction * 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.96, x: direction * -60 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Blurred Fill Background — depth layer */}
          <img
            src={HERO_SLIDES[currentSlide]}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none select-none"
            draggable={false}
          />
          {/* Main Image — full-screen cover on all devices, smart position on mobile */}
          <motion.img
            src={HERO_SLIDES[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="relative block w-full h-full object-cover object-[center_30%] sm:object-center"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient for shayari readability */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Prev / Next Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => goTo(currentSlide - 1, -1)}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white hover:text-emerald-400 hover:border-emerald-500/60 shadow-lg shadow-black/40 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => goTo(currentSlide + 1, 1)}
        aria-label="Next slide"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white hover:text-emerald-400 hover:border-emerald-500/60 shadow-lg shadow-black/40 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Hero Content Overlay: Shayari & Embedded Instant Booking Card */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pt-20 pb-8 pointer-events-none">
        <div className="w-full max-w-lg space-y-4 pointer-events-auto">
          <motion.p 
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-center glass-panel rounded-full border border-emerald-500/40 px-4 py-2 text-xs sm:text-sm italic text-white/90 shadow-xl shadow-emerald-950/40 backdrop-blur-md w-full"
          >
            ❝ Manzil aap ki, zimmedari hamari — <span className="text-gradient-emerald font-semibold">Chaloji</span> ke saath har safar suhaana! ❞
          </motion.p>

          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="pt-2 flex justify-center w-full"
          >
            <button
              onClick={() => onInstantBook && onInstantBook()}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/70 flex items-center justify-center space-x-3 transition-all cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-black text-black" />
              <span>BOOK RIDE NOW</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Dot Indicators with spring active pill */}
      <div className="safe-bottom absolute left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx, idx > currentSlide ? 1 : -1)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`relative h-2.5 rounded-full transition-all duration-300 after:absolute after:-inset-2.5 after:content-[''] ${
              currentSlide === idx
                ? "w-10 bg-emerald-400 shadow-lg shadow-emerald-400/60 ring-2 ring-emerald-400/30"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
