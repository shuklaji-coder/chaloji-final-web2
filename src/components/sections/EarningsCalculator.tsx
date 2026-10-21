"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Wallet, 
  Award,
  Sparkles
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { AnimatedSection } from "@/components/vfx/AnimatedSection";
import { Shayari } from "@/components/ui/Shayari";

export function EarningsCalculator() {
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [vehicleType, setVehicleType] = useState<"bike" | "auto" | "sedan" | "suv">("sedan");

  // Earnings calculation logic
  const ratePerHour = {
    bike: 180,
    auto: 240,
    sedan: 350,
    suv: 480,
  };

  const dailyEarnings = hoursPerDay * ratePerHour[vehicleType];
  const weeklyEarnings = dailyEarnings * daysPerWeek;
  const monthlyEarnings = Math.round(weeklyEarnings * 4.3);

  // Gauge percentage (max ~ 1,80,000)
  const maxPossible = 180000;
  const gaugePercent = Math.min(Math.max((monthlyEarnings / maxPossible) * 100, 10), 100);

  return (
    <section id="driver-earnings" className="relative py-20 sm:py-28 z-10 overflow-hidden bg-[#041611] border-t border-[#DFC993]/20">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#DFC993]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#DFC993]/40 text-[#DFC993] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#DFC993]" />
              <span>LIVE EARNINGS CALCULATOR</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Calculate Your <br />
              <span className="text-gradient-dual">Monthly Income Potential.</span>
            </h2>

            <p className="text-base text-gray-300">
              See how much you can take home with Chaloji's 0% commission launch model. No hidden deductions!
            </p>

            <Shayari>
              Aapki mehnat, aapka hisaab — har safar me barkat behisaab!
            </Shayari>
          </div>
        </AnimatedSection>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Interactive Calculator Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 glass-card p-6 sm:p-8 rounded-3xl border border-[#DFC993]/25 shadow-2xl shadow-emerald-950/40"
          >
            
            {/* Vehicle Type Selection Buttons */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block font-display">
                1. Select Vehicle Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(
                  [
                    { id: "bike", label: "Bike Taxi", rate: "₹180/hr" },
                    { id: "auto", label: "Auto", rate: "₹240/hr" },
                    { id: "sedan", label: "Sedan Cab", rate: "₹350/hr" },
                    { id: "suv", label: "SUV", rate: "₹480/hr" },
                  ] as const
                ).map((v) => {
                  const isSelected = vehicleType === v.id;
                  return (
                    <motion.button
                      key={v.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setVehicleType(v.id)}
                      className={`relative py-3 px-4 rounded-xl border text-left transition-colors duration-200 overflow-hidden ${
                        isSelected
                          ? "border-[#DFC993] text-white shadow-lg shadow-[#DFC993]/20"
                          : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="calc-vehicle-active"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          className="absolute inset-0 bg-gradient-to-br from-[#DFC993]/25 via-emerald-500/15 to-transparent border border-[#DFC993]/40 rounded-xl"
                        />
                      )}
                      <span className="relative z-10 block text-sm font-bold font-display">{v.label}</span>
                      <span className="relative z-10 block text-[11px] text-[#DFC993] font-mono font-semibold">{v.rate}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Hours per day slider */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-300 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>2. Working Hours Per Day:</span>
                </span>
                <span className="text-emerald-400 font-mono text-base bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                  {hoursPerDay} Hours / day
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                className="w-full accent-[#DFC993] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>4 Hours (Part Time)</span>
                <span>8 Hours (Full Shift)</span>
                <span>14 Hours (Max Earn)</span>
              </div>
            </div>

            {/* Days per week slider */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-300 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#DFC993]" />
                  <span>3. Days Worked Per Week:</span>
                </span>
                <span className="text-[#DFC993] font-mono text-base bg-[#DFC993]/10 px-3 py-1 rounded-lg border border-[#DFC993]/30">
                  {daysPerWeek} Days / week
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                className="w-full accent-[#DFC993] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            {/* Driver Perks List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Daily UPI Settlements</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#DFC993] shrink-0" />
                <span>Zero Deductions on First 100 Rides</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Weekly Fuel & High-Rating Bonus</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#DFC993] shrink-0" />
                <span>24x7 Driver Emergency Helpline</span>
              </div>
            </div>

          </motion.div>

          {/* Right Live Gauge & Earnings Display Box */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#DFC993]/40 shadow-2xl shadow-emerald-950/60 text-center space-y-6 relative overflow-hidden">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>ESTIMATED TAKE-HOME</span>
              </div>

              {/* Animated Semi-Gauge Meter */}
              <div className="relative w-64 h-36 mx-auto flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 110">
                  {/* Gauge Arc Background */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  {/* Gauge Arc Fill */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#gaugeGradientChaloji)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * gaugePercent) / 100}
                    className="transition-all duration-700 ease-out"
                  />
                  <defs>
                    <linearGradient id="gaugeGradientChaloji" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#DFC993" />
                      <stop offset="50%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Monthly Income Text */}
                <div className="absolute bottom-2 flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={monthlyEarnings}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl sm:text-4xl font-black text-white font-display"
                    >
                      {formatCurrency(monthlyEarnings)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">per month potential</span>
                </div>
              </div>

              {/* Weekly & Daily Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-center">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="block text-[10px] text-gray-400 font-semibold uppercase">Daily Earnings</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {formatCurrency(dailyEarnings)}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="block text-[10px] text-gray-400 font-semibold uppercase">Weekly Earnings</span>
                  <span className="text-lg font-bold text-[#DFC993] font-mono">
                    {formatCurrency(weeklyEarnings)}
                  </span>
                </div>
              </div>

              {/* Onboarding Signup CTA */}
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#driver-join"
                className="block relative group overflow-hidden rounded-2xl bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] p-[1px] shadow-xl shadow-emerald-500/20 hover:shadow-[#DFC993]/40 transition-shadow duration-300"
              >
                <div className="w-full py-3.5 bg-[#041611] rounded-[15px] flex items-center justify-center space-x-2 transition-all duration-300 group-hover:bg-transparent">
                  <Zap className="w-5 h-5 text-[#DFC993] group-hover:text-[#041611] transition-colors" />
                  <span className="text-sm font-extrabold text-white group-hover:text-[#041611] uppercase tracking-wider transition-colors">
                    Join &amp; Start Earning Today
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#DFC993] group-hover:text-[#041611] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.a>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
