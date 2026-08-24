"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Car, Users, Star, ShieldCheck, Zap, Award } from "lucide-react";

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
    description: "Safe & verified trips across Uttar Pradesh",
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/30",
  },
  {
    icon: Users,
    value: 15,
    suffix: "K+",
    label: "Active Drivers",
    description: "Background verified partners",
    color: "from-cyan-400 to-blue-500",
    glow: "shadow-cyan-500/30",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: " ★",
    label: "Customer Rating",
    description: "Over 120,000 positive reviews",
    color: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/30",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Surge Protection",
    description: "Fixed fair pricing 24/7",
    color: "from-violet-400 to-purple-500",
    glow: "shadow-violet-500/30",
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
    <section className="relative py-20 z-10 overflow-hidden bg-gradient-to-b from-[#08090C] via-[#0E111A] to-[#08090C] border-y border-white/10">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pulsing Glowing Header Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>CHALOJI PLATFORM MILESTONES</span>
          </div>
        </div>

        {/* 4-Col Grid for Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group rounded-3xl glass-card p-6 border border-white/10 hover:border-emerald-500/40 transition-all duration-300"
              >
                {/* Glowing Aura Ring */}
                <div className={`absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-20 rounded-full blur-xl group-hover:opacity-60 transition-opacity`} />

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} p-[1px] ${stat.glow} shadow-lg`}>
                    <div className="w-full h-full bg-[#08090C] rounded-[15px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-white font-display flex items-center">
                      <CountUpNumber endValue={stat.value} isFloat={stat.value === 4.9} />
                      <span className="text-emerald-400">{stat.suffix}</span>
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
