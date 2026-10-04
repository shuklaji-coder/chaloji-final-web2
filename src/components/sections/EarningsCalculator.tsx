"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Car, 
  Wallet, 
  Award
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
    <section id="driver-earnings" className="relative py-24 z-10 overflow-hidden bg-[#08090C]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Interactive Calculator Controls */}
          <div className="lg:col-span-7 space-y-6 glass-card p-8 rounded-3xl border border-white/10">
            
            {/* Vehicle Type Selection Buttons */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block font-display">
                1. Select Vehicle Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(
                  [
                    { id: "bike", label: "Bike", rate: "₹180/hr" },
                    { id: "auto", label: "Auto", rate: "₹240/hr" },
                    { id: "sedan", label: "Sedan Cab", rate: "₹350/hr" },
                    { id: "suv", label: "SUV", rate: "₹480/hr" },
                  ] as const
                ).map((v) => (
                  <motion.button
                    key={v.id}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setVehicleType(v.id)}
                    className={`py-3 px-4 rounded-xl border text-left transition-all duration-200 ${
                      vehicleType === v.id
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-500/40"
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="block text-sm font-bold font-display">{v.label}</span>
                    <span className="block text-[10px] text-emerald-400 font-mono">{v.rate}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hours per day slider */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-300 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>2. Working Hours Per Day:</span>
                </span>
                <span className="text-emerald-400 font-mono text-base">{hoursPerDay} Hours / day</span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>4 Hours (Part Time)</span>
                <span>8 Hours (Full Time)</span>
                <span>14 Hours (Pro Driver)</span>
              </div>
            </div>

            {/* Days per week slider */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-300 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>3. Days Per Week:</span>
                </span>
                <span className="text-cyan-400 font-mono text-base">{daysPerWeek} Days / week</span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            {/* Driver Perks List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Daily Payouts to UPI</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>₹5 Lakh Family Health Insurance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Weekly Fuel & Maintenance Bonus</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24x7 Dedicated Driver Hotline</span>
              </div>
            </div>

          </div>

          {/* Right Live Gauge & Earnings Display Box */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 text-center space-y-6 relative overflow-hidden">
              
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block font-display">
                ESTIMATED MONTHLY POTENTIAL
              </span>

              {/* Animated SVG Semi-Gauge Meter */}
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
                    stroke="url(#gaugeGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * gaugePercent) / 100}
                    className="transition-all duration-700 ease-out"
                  />
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Monthly Income Text */}
                <div className="absolute bottom-2 flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black text-white font-display">
                    {formatCurrency(monthlyEarnings)}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">per month</span>
                </div>
              </div>

              {/* Weekly & Daily Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-[10px] text-gray-400 font-semibold uppercase">Daily Take-Home</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {formatCurrency(dailyEarnings)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-[10px] text-gray-400 font-semibold uppercase">Weekly Take-Home</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">
                    {formatCurrency(weeklyEarnings)}
                  </span>
                </div>
              </div>

              {/* Onboarding Signup CTA */}
              <a
                href="#app-download"
                className="block relative group overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/60 transition-all duration-300"
                data-cursor-expand="true"
              >
                <div className="w-full py-4 bg-[#08090C] rounded-[15px] flex items-center justify-center space-x-2 transition-all duration-300 group-hover:bg-transparent">
                  <Zap className="w-5 h-5 text-emerald-400 group-hover:text-black" />
                  <span className="text-base font-bold text-white group-hover:text-black uppercase tracking-wider">
                    Register as Driver Partner
                  </span>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
