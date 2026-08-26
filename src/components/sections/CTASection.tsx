"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Apple, Zap, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";

export function CTASection() {
  return (
    <section id="book" className="relative py-16 sm:py-24 z-10 overflow-hidden bg-[#08090C]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl glass-card p-8 sm:p-14 border border-emerald-500/30 overflow-hidden shadow-2xl shadow-emerald-950/50">
          
          {/* Background Gradient & Glow Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>MOBILE APP NEXT-GEN DISPATCH</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-[1.1]">
                Book Your Ride in <br />
                <span className="text-gradient-emerald">Under 10 Seconds.</span>
              </h2>

              <p className="text-base text-gray-300 max-w-xl leading-relaxed">
                Download the ChaloJi mobile app on iOS and Android. Enjoy instant 1-click ride requests, live driver GPS tracking, emergency SOS safety, and exclusive cash-back offers.
              </p>

              <Shayari className="!justify-start">
                Ab der kis baat ki, gaadi khadi hai — Chaloji keh raha, safar azma ke dekhi!
              </Shayari>

              {/* App Store / Play Store Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#"
                  className="px-6 py-3.5 rounded-2xl glass-panel border border-white/15 hover:border-emerald-500/50 flex items-center space-x-3 text-white transition-all duration-300 hover:scale-105"
                  data-cursor-expand="true"
                >
                  <Apple className="w-7 h-7 text-emerald-400" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Download on</span>
                    <span className="text-sm font-bold font-display">App Store</span>
                  </div>
                </a>

                <a
                  href="#"
                  className="px-6 py-3.5 rounded-2xl glass-panel border border-white/15 hover:border-cyan-500/50 flex items-center space-x-3 text-white transition-all duration-300 hover:scale-105"
                  data-cursor-expand="true"
                >
                  <Smartphone className="w-7 h-7 text-cyan-400" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">GET IT ON</span>
                    <span className="text-sm font-bold font-display">Google Play</span>
                  </div>
                </a>
              </div>

              <div className="flex items-center space-x-6 pt-4 text-xs font-semibold text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Encrypted & Safe</span>
                </div>
              </div>

            </div>

            {/* Right Mobile Phone Showcase Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-52 h-[360px] sm:w-64 sm:h-[440px] rounded-[40px] bg-[#0A0D14] border-4 border-white/15 shadow-2xl p-4 overflow-hidden flex flex-col justify-between group">
                
                {/* Phone Notch */}
                <div className="w-24 h-4 bg-white/10 rounded-full mx-auto mb-2" />

                {/* Phone Screen Mockup */}
                <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#08090C] border border-white/10 p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-emerald-400 font-mono font-bold">
                      <span>CHALOJI APP</span>
                      <span>5G ONLINE</span>
                    </div>
                    <div className="h-32 rounded-xl bg-cover bg-center" style={{ backgroundImage: "url('/Chaloji landing page photo .jpeg')" }} />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-bold flex justify-between">
                      <span>Nearest Sedan:</span>
                      <span>1.2 km away</span>
                    </div>
                    <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-center text-xs uppercase">
                      Confirm Ride
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
