"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CyberBackground } from "@/components/vfx/CyberBackground";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { 
  Car, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  CheckCircle2, 
  Phone, 
  Mail, 
  ArrowLeft 
} from "lucide-react";

export default function DriverAgreementPage() {
  return (
    <main className="relative min-h-screen bg-[#041611] text-[#F4F7F5] overflow-x-hidden selection:bg-[#DFC993] selection:text-[#041611]">
      <CyberBackground />
      <Navbar onInstantBook={() => {}} />

      <div className="relative z-10 pt-28 sm:pt-36 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#DFC993] hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header Hero */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#DFC993]/10 border border-[#DFC993]/30 text-[#DFC993] text-xs font-semibold">
            <Car className="w-4 h-4 text-[#DFC993]" />
            <span>Driver Partner Network Agreement</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Driver Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EE] via-[#DFC993] to-[#10B981]">Agreement</span>
          </h1>
          
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Welcome to the <strong className="text-white">ChaloJi Mobility Driver Network</strong>. This agreement sets out the principles of partnership, payout policies, document verification, and conduct expected from all registered cab and vehicle drivers.
          </p>
          
          <p className="text-xs text-[#DFC993]/60">
            Last Updated: August 31, 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="space-y-10">
          
          {/* Section 1: Partnership Status */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#DFC993]/20 space-y-4">
            <div className="flex items-center space-x-3 text-[#DFC993] font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-[#DFC993]/15 border border-[#DFC993]/30 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-[#DFC993]" />
              </div>
              <h2>1. Independent Partner Status</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Driver partners registered with ChaloJi operate as independent service providers and not as employees or agents of ChaloJi. Drivers maintain freedom of schedule and choice of online hours subject to platform availability and customer service standards.
            </p>
          </section>

          {/* Section 2: Verification Requirements */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#DFC993]/20 space-y-4">
            <div className="flex items-center space-x-3 text-emerald-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2>2. Document &amp; Vehicle Onboarding Requirements</h2>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                "Valid Commercial Driving License (Yellow Badge where applicable).",
                "Vehicle Registration Certificate (RC), Fitness Certificate, and Commercial Insurance.",
                "Valid Aadhaar Card & PAN Card verification.",
                "Vehicle cleanliness, functional AC, working seatbelts, and safety equipment."
              ].map((req, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Earnings & Payouts */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#DFC993]/20 space-y-4">
            <div className="flex items-center space-x-3 text-[#DFC993] font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-[#DFC993]/15 border border-[#DFC993]/30 flex items-center justify-center">
                <Award className="w-4 h-4 text-[#DFC993]" />
              </div>
              <h2>3. Commission &amp; Payout Policy</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              ChaloJi offers industry-leading low platform commission rates and transparent payout cycles. Cash collected directly from riders is retained by drivers, with digital trip earnings settled automatically to linked bank accounts.
            </p>
          </section>

          {/* Section 4: Support */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#DFC993]/20 space-y-4">
            <h2 className="text-lg font-bold text-white font-display">4. Driver Support Desk</h2>
            <p className="text-sm text-gray-300">
              For onboarding assistance, vehicle inspection, or account support, visit our driver hub or contact:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm">
              <div className="flex items-center space-x-2 text-[#DFC993]">
                <Phone className="w-4 h-4" />
                <a href="tel:8087747774" className="hover:underline">+91 80877 47774</a>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@chaloji.com" className="hover:underline">support@chaloji.com</a>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
