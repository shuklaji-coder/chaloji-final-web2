"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none">
      {/* Background track */}
      <div className="absolute inset-0 bg-transparent" />
      {/* Animated gradient bar with glow */}
      <motion.div
        className="h-full bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] origin-left shadow-[0_0_12px_rgba(52,211,153,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
