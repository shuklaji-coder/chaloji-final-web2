"use client";

import React from "react";
import {
  ShieldCheck,
  MapPin,
  Headset,
  BadgeIndianRupee,
  Bike,
  CarTaxiFront,
  Crown,
  Route,
  Clock,
  Wallet,
  Sparkles,
} from "lucide-react";

type Highlight = {
  icon: React.ReactNode;
  text: string;
  accent: string;
};

const HIGHLIGHTS_ROW_1: Highlight[] = [
  { icon: <BadgeIndianRupee className="w-5 h-5" />, text: "Zero Surge Pricing", accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  { icon: <ShieldCheck className="w-5 h-5" />, text: "Background Verified Drivers", accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
  { icon: <MapPin className="w-5 h-5" />, text: "Live Ride Tracking", accent: "text-teal-400 bg-teal-500/10 border-teal-500/30" },
  { icon: <Headset className="w-5 h-5" />, text: "24/7 Customer Support", accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
];

const HIGHLIGHTS_ROW_2: Highlight[] = [
  { icon: <Crown className="w-5 h-5" />, text: "Baraat & Convoy Bookings", accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
  { icon: <Route className="w-5 h-5" />, text: "Outstation Rides", accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  { icon: <Bike className="w-5 h-5" />, text: "Express Bikes", accent: "text-teal-400 bg-teal-500/10 border-teal-500/30" },
  { icon: <Clock className="w-5 h-5" />, text: "Hourly Rentals", accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
  { icon: <Wallet className="w-5 h-5" />, text: "Daily Driver Payouts", accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  { icon: <CarTaxiFront className="w-5 h-5" />, text: "Clean & Sanitized Cabs", accent: "text-teal-400 bg-teal-500/10 border-teal-500/30" },
];

function PillCard({ item }: { item: Highlight }) {
  return (
    <div
      className={`shrink-0 flex items-center space-x-3 px-6 py-4 rounded-2xl glass-card border ${item.accent} whitespace-nowrap`}
    >
      {item.icon}
      <span className="text-sm font-bold uppercase tracking-wider text-white">{item.text}</span>
    </div>
  );
}

export function HighlightsMarquee() {
  return (
    <section id="highlights" className="relative py-14 sm:py-20 z-10 overflow-hidden">

      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>WHY CHOOSE CHALOJI</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Built for Riders. <br />
          <span className="text-gradient-emerald">Empowered for Drivers.</span>
        </h2>
      </div>

      {/* Marquee Row 1 (Left Direction) */}
      <div className="relative flex overflow-x-hidden mb-5">
        <div className="flex space-x-5 animate-marquee-left">
          {[...HIGHLIGHTS_ROW_1, ...HIGHLIGHTS_ROW_1].map((item, i) => (
            <PillCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Right Direction) */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex space-x-5 animate-marquee-right">
          {[...HIGHLIGHTS_ROW_2, ...HIGHLIGHTS_ROW_2].map((item, i) => (
            <PillCard key={i} item={item} />
          ))}
        </div>
      </div>

    </section>
  );
}
