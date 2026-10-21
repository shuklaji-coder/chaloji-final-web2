"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Apple, Zap, ShieldCheck, Star, CheckCircle2, Navigation } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";
import { AnimatedText } from "@/components/vfx/AnimatedText";

export function CTASection() {
  return (
    <section id="book" className="relative py-16 sm:py-24 z-10 overflow-hidden bg-[#041611]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl glass-card p-8 sm:p-14 border border-[#DFC993]/35 overflow-hidden shadow-2xl shadow-emerald-950/60">
          
          {/* Background Gradient & Glow Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 via-[#DFC993]/15 to-transparent blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#DFC993]/15 via-emerald-500/10 to-transparent blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#DFC993]/40 text-[#DFC993] text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#DFC993]" />
                <span>MOBILE APP NEXT-GEN DISPATCH</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-[1.1]">
                <AnimatedText text="Book Your Ride in" gradientWords={[]} /> <br />
                <AnimatedText text="Under 10 Seconds." gradientWords={["Under", "10", "Seconds."]} />
              </h2>

              <p className="text-base text-gray-300 max-w-xl leading-relaxed">
                Download the ChaloJi mobile app on iOS and Android. Enjoy instant 1-click ride requests, live driver GPS tracking, emergency SOS safety, and exclusive cashback offers.
              </p>

              <Shayari className="!justify-start">
                Ab der kis baat ki, gaadi khadi hai — Chaloji keh raha, safar azma ke dekh!
              </Shayari>

              {/* App Store / Play Store Buttons with Motion Hover */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="px-6 py-3.5 rounded-2xl glass-panel border border-[#DFC993]/30 hover:border-[#DFC993]/70 flex items-center space-x-3 text-white transition-all duration-300 shadow-lg shadow-[#DFC993]/10"
                  data-cursor-expand="true"
                >
                  <Apple className="w-7 h-7 text-[#DFC993]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Download on</span>
                    <span className="text-sm font-bold font-display">App Store</span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://play.google.com/store/apps/details?id=com.rohan3543.chaloji&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-500/70 flex items-center space-x-3 text-white transition-all duration-300 shadow-lg shadow-emerald-500/10"
                  data-cursor-expand="true"
                >
                  <Smartphone className="w-7 h-7 text-emerald-400" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">GET IT ON</span>
                    <span className="text-sm font-bold font-display">Google Play</span>
                  </div>
                </motion.a>
              </div>

              <div className="flex items-center space-x-6 pt-4 text-xs font-semibold text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-[#DFC993] fill-[#DFC993]" />
                  <span className="text-white">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Encrypted &amp; Safe</span>
                </div>
              </div>

            </div>

            {/* Right Mobile Phone Showcase Graphic with Floating Animation & Ambient Toast Badges */}
            <div className="lg:col-span-5 flex justify-center relative">
              
              {/* Floating Toast Badge 1 - Top Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  default: { duration: 0.5, delay: 0.3 }
                }}
                className="hidden sm:flex absolute -top-4 -right-2 z-20 items-center space-x-2.5 px-3.5 py-2 rounded-2xl glass-card border border-[#DFC993]/40 shadow-2xl backdrop-blur-md"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#DFC993] font-bold uppercase tracking-wider">Ride Confirmed</p>
                  <p className="text-xs font-black text-white font-display">Driver ETA: 2 Mins</p>
                </div>
              </motion.div>

              {/* Floating Toast Badge 2 - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [5, -5, 5] }}
                transition={{ 
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  default: { duration: 0.5, delay: 0.5 }
                }}
                className="hidden sm:flex absolute -bottom-4 -left-4 z-20 items-center space-x-2.5 px-3.5 py-2 rounded-2xl glass-card border border-emerald-500/40 shadow-2xl backdrop-blur-md"
              >
                <div className="w-6 h-6 rounded-lg bg-[#DFC993]/20 flex items-center justify-center text-[#DFC993]">
                  <Navigation className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Zero Surge Lock</p>
                  <p className="text-xs font-black text-white font-display">Fixed Fare ₹49</p>
                </div>
              </motion.div>

              {/* Phone Showcase Frame */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-52 h-[360px] sm:w-64 sm:h-[440px] rounded-[40px] bg-[#03130E] border-4 border-[#DFC993]/35 shadow-2xl p-4 overflow-hidden flex flex-col justify-between group"
              >
                {/* Phone Notch */}
                <div className="w-24 h-4 bg-white/10 rounded-full mx-auto mb-2" />

                {/* Phone Screen Mockup */}
                <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#041611] border border-[#DFC993]/20 p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-[#DFC993] font-mono font-bold">
                      <span>CHALOJI APP</span>
                      <span className="text-emerald-400">5G ONLINE</span>
                    </div>
                    <div className="h-32 rounded-xl bg-cover bg-center border border-[#DFC993]/15" style={{ backgroundImage: "url('/Chaloji landing page photo .jpeg')" }} />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-[#F7EBD2] font-bold flex justify-between">
                      <span>Nearest Sedan:</span>
                      <span className="text-emerald-400">1.2 km away</span>
                    </div>
                    <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] text-[#041611] font-bold text-center text-xs uppercase shadow-md">
                      Confirm Ride
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
