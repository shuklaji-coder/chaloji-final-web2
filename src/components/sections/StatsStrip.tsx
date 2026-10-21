"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Car, Users, Star, ShieldCheck } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  glow: string;
}

const STATS: StatItem[] = [
  {
    icon: Car,
    value: 500,
    suffix: "K+",
    label: "Completed Rides",
    description: "Safe & verified trips across Uttar Pradesh & Metros",
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/30",
  },
  {
    icon: Users,
    value: 15,
    suffix: "K+",
    label: "Active Drivers",
    description: "Background verified driver partners",
    color: "from-[#DFC993] to-[#B58E4A]",
    glow: "shadow-[#DFC993]/30",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: " ★",
    label: "Customer Rating",
    description: "Over 120,000 positive rider reviews",
    color: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/30",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Surge Protection",
    description: "Guaranteed fixed fair pricing 24/7",
    color: "from-teal-400 to-emerald-500",
    glow: "shadow-teal-500/30",
  },
];

function CountUpNumber({ endValue, isFloat = false }: { endValue: number; isFloat?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const steps = 60;
    const increment = endValue / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, endValue]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : Math.floor(count)}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="relative py-20 z-10 overflow-hidden bg-gradient-to-b from-[#041611] via-[#072019] to-[#041611] border-y border-[#DFC993]/20">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pulsing Glowing Header Badge */}
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass-panel border border-[#DFC993]/40 text-[#DFC993] text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFC993] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DFC993]"></span>
            </span>
            <span>CHALOJI PLATFORM MILESTONES</span>
          </motion.div>
        </div>

        {/* 4-Col Grid for Stats with Staggered Entrance & Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group rounded-3xl glass-card p-6 border border-[#DFC993]/20 hover:border-[#DFC993]/50 transition-colors duration-300 shadow-xl shadow-emerald-950/40"
              >
                {/* Glowing Aura Ring */}
                <div className={`absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-20 rounded-full blur-xl group-hover:opacity-60 transition-opacity`} />

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} p-[1px] ${stat.glow} shadow-lg`}>
                    <div className="w-full h-full bg-[#041611] rounded-[15px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-white font-display flex items-center">
                      <CountUpNumber endValue={stat.value} isFloat={stat.value === 4.9} />
                      <span className="text-[#DFC993]">{stat.suffix}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1 font-display">
                  {stat.label}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
