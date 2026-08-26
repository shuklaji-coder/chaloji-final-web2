"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shayari } from "@/components/ui/Shayari";

export function ShowcaseSection() {
  return (
    <section className="relative py-14 sm:py-20 z-10 overflow-hidden">

      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-950/50 group"
        >
          <img
            src="/image copy.png"
            alt="Chaloji Showcase"
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            draggable={false}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08090C]/80 to-transparent pointer-events-none" />
        </motion.div>

        <Shayari className="mt-8">
          Kadam badhe toh saath chale hum — har raah pe Chaloji, bas naam hi kaafi hai!
        </Shayari>
      </div>
    </section>
  );
}
