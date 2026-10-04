"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Zap, 
  Lock, 
  UserCheck, 
  Share2, 
  AlertTriangle,
  Award,
  Sparkles
} from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";
import { TiltCard } from "@/components/vfx/TiltCard";
import { AnimatedSection } from "@/components/vfx/AnimatedSection";

export function SafetyTrustSection() {
  return (
    <section id="safety-trust" className="relative py-20 sm:py-28 z-10 overflow-hidden bg-[#08090C]">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>100% SAFETY & PRICE GUARANTEE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Aapki Suraksha &amp; Hamari Guarantee <br />
              <span className="text-gradient-emerald">Zero Surge, Zero Surcharge!</span>
            </h2>

            <p className="text-base text-gray-300">
              ChaloJi ke saath har safar 100% surakshit aur transparent hai. Zero surge pricing guarantee aur 24x7 Emergency SOS Support.
            </p>

            <Shayari>
              Tension-free safar, har waqt har jagah — Chaloji ke sath suraksha aur bachat hamesha!
            </Shayari>
          </div>
        </AnimatedSection>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Pillar 1: 24/7 SOS Helpline */}
          <AnimatedSection animation="fade-up" delay={0.1}>
            <TiltCard tiltAmount={6} scaleOnHover={1.02} className="h-full">
              <div className="glass-card p-6 rounded-3xl border border-rose-500/30 shadow-xl shadow-rose-950/20 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <PhoneCall className="w-6 h-6 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">24/7 Emergency SOS</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Direct 1-tap connection to Police (112), ChaloJi Safety Desk &amp; live emergency response team.
                  </p>
                </div>

                <a
                  href="tel:8087747774"
                  className="w-full py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold uppercase tracking-wider text-center block hover:bg-rose-500 hover:text-white transition-all"
                >
                  Call SOS Hotline
                </a>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Pillar 2: Verified Drivers */}
          <AnimatedSection animation="fade-up" delay={0.2}>
            <TiltCard tiltAmount={6} scaleOnHover={1.02} className="h-full">
              <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 shadow-xl shadow-emerald-950/20 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">100% Verified Drivers</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Police background verification, DL check &amp; mandatory vehicle fitness inspection before every onboarding.
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Police Verified Badge</span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Pillar 3: Zero Surge Price Guarantee */}
          <AnimatedSection animation="fade-up" delay={0.3}>
            <TiltCard tiltAmount={6} scaleOnHover={1.02} className="h-full">
              <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 shadow-xl shadow-cyan-950/20 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">Zero Peak Surge</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Rain, midnight, or peak festival hours — price guarantee with zero surge multiplier. What you see is what you pay.
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-cyan-400 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>100% Price Lock</span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Pillar 4: Live Trip Sharing */}
          <AnimatedSection animation="fade-up" delay={0.4}>
            <TiltCard tiltAmount={6} scaleOnHover={1.02} className="h-full">
              <div className="glass-card p-6 rounded-3xl border border-amber-500/30 shadow-xl shadow-amber-950/20 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">Live Trip Sharing</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Share live GPS location link with family &amp; friends on WhatsApp in 1-click for peace of mind.
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-Time GPS Sync</span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

        </div>

        {/* Safety Guarantee Highlight Bar */}
        <AnimatedSection animation="zoom-in" delay={0.2}>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-950/30 via-[#08090C] to-cyan-950/30 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Need Immediate Ride Assistance?</h4>
                <p className="text-xs text-gray-400">Our 24x7 Phoolpur &amp; Prayagraj support desk is active to assist you.</p>
              </div>
            </div>

            <a
              href="tel:8087747774"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all shrink-0"
            >
              Call 24x7 Helpline (+91 80877 47774)
            </a>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
