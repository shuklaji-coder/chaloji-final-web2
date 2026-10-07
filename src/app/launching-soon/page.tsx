"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { LenisProvider } from "@/components/vfx/LenisProvider";
import { CyberBackground } from "@/components/vfx/CyberBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BookingModal } from "@/components/layout/BookingModal";
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  Zap,
  MapPin,
  Car,
  Gift,
  BellRing,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Users,
  Smartphone,
  Star,
  Clock,
  Check,
  TrendingUp,
} from "lucide-react";

// Target launch date: 30 days from fixed reference date or dynamically set target date
const TARGET_LAUNCH_DATE = new Date("2026-10-15T00:00:00").getTime();

export default function LaunchingSoonPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [roleTab, setRoleTab] = useState<"rider" | "driver">("rider");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [cityName, setCityName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time remaining state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_LAUNCH_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#10B981", "#06B6D4", "#F59E0B", "#3B82F6", "#EC4899"],
        });
      } catch (err) {
        console.error("Confetti error", err);
      }
    }, 800);
  };

  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-[#08090C] text-[#E2E8F0] overflow-x-hidden selection:bg-emerald-400 selection:text-black">
        {/* Global VFX Background */}
        <CyberBackground />

        {/* Navigation */}
        <Navbar onInstantBook={() => setBookingOpen(true)} />

        {/* Booking Modal */}
        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

        <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          
          {/* Breadcrumb / Back Button */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-400 hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>STAGE 1: PRE-LAUNCH ACCESS</span>
            </div>
          </div>

          {/* HERO SECTION */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Pulsing Status Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-cyan-500/20 border border-amber-500/40 backdrop-blur-md text-amber-300 text-xs font-bold tracking-wider uppercase shadow-lg shadow-amber-950/50 animate-pulse">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span>🪔 GRAND POST-DIWALI LAUNCH 🪔</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Safar Ka Naya Andaaz <br />
              <span className="bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                Launching Post-Diwali! 🪔
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get ready for India&apos;s next-generation 0% surge ride platform. Launching right after Diwali across <strong>Mumbai, Bengaluru, Chennai, Varanasi, Phoolpur & PAN-India</strong>!
            </p>
          </div>

          {/* DYNAMIC COUNTDOWN TIMER */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-b from-white/[0.07] to-transparent shadow-2xl shadow-emerald-950/30">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              
              <div className="text-center mb-8">
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                  <span>COUNTDOWN TO OFFICIAL APP DEPLOYMENT</span>
                </span>
              </div>

              {/* Countdown Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative group p-4 sm:p-6 rounded-2xl bg-[#08090C]/80 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 shadow-inner"
                  >
                    <div className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-2">
                      {item.label}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VIP EARLY ACCESS / NOTIFY ME FORM */}
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-emerald-950/40 via-[#0B0F17] to-[#08090C] border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6 text-center">
                <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>EARLY BIRD EXCLUSIVE PERK</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-white">
                  Join the VIP Early Access Pass
                </h2>
                
                <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
                  Be among the first 1,000 users to get <strong>₹100 OFF on your first 5 rides</strong> or <strong>0% Driver Platform Fee for 6 months</strong>.
                </p>

                {/* Role Switcher Tabs */}
                <div className="flex justify-center space-x-2 bg-black/50 p-1.5 rounded-full border border-white/10 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setRoleTab("rider")}
                    className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      roleTab === "rider"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>I am a Rider</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleTab("driver")}
                    className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      roleTab === "driver"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>I am a Driver</span>
                  </button>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 space-y-3 animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Congratulations! You&apos;re on the Chaloji VIP List 🎉
                    </h3>
                    <p className="text-xs text-gray-300">
                      We have reserved your inaugural rewards. We will send you an exclusive invite code as soon as the app goes live in {cityName || "your city"}!
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-emerald-400 underline hover:text-emerald-300 mt-2"
                    >
                      Register another number / email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          required
                          placeholder={
                            roleTab === "rider"
                              ? "Enter Phone or Email address..."
                              : "Enter Phone number for Driver Pass..."
                          }
                          value={emailOrPhone}
                          onChange={(e) => setEmailOrPhone(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                        />
                      </div>
                      <div className="sm:w-36">
                        <input
                          type="text"
                          placeholder="City (e.g. Pune)"
                          value={cityName}
                          onChange={(e) => setCityName(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-bold text-sm tracking-wide uppercase shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 group"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <BellRing className="w-4 h-4" />
                          <span>
                            {roleTab === "rider"
                              ? "Claim Free VIP Rider Pass"
                              : "Register as 0% Commission Driver"}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center space-x-4 text-[11px] text-gray-400 pt-1">
                      <span className="flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>No Spam Guarantee</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Instant SMS Alert at Launch</span>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* UPCOMING REVOLUTIONARY FEATURES SHOWCASE */}
          <div className="space-y-10 max-w-6xl mx-auto pt-6">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                WHAT TO EXPECT
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Why Chaloji will Change the Way You Travel
              </h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
                Built from the ground up for riders and drivers with fairness, speed, and safety at its core.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "0% Commission Model",
                  desc: "Drivers keep 100% of their earnings. No hidden cuts, lower fares for riders, happier drivers.",
                  tag: "DRIVER FAVORITE",
                  color: "from-emerald-500/20 to-teal-500/10",
                  border: "border-emerald-500/30",
                },
                {
                  icon: Zap,
                  title: "AI Smart Dispatch Engine",
                  desc: "Zero waiting time with predictive AI routing that assigns nearest verified drivers instantly.",
                  tag: "ULTRA FAST",
                  color: "from-cyan-500/20 to-blue-500/10",
                  border: "border-cyan-500/30",
                },
                {
                  icon: ShieldCheck,
                  title: "Triple Guard SOS Safety",
                  desc: "Real-time trip tracking, emergency contact broadcast, and verified driver background checks.",
                  tag: "MAX SAFETY",
                  color: "from-amber-500/20 to-orange-500/10",
                  border: "border-amber-500/30",
                },
                {
                  icon: MapPin,
                  title: "Intercity & Hourly Rentals",
                  desc: "Book cabs across cities or hire by the hour for business meetings and city shopping seamlessly.",
                  tag: "FLEXIBLE RIDES",
                  color: "from-purple-500/20 to-pink-500/10",
                  border: "border-purple-500/30",
                },
                {
                  icon: Car,
                  title: "Eco EV & Luxury Fleet",
                  desc: "Choose from clean Electric Vehicles, comfortable Sedans, or spacious SUVs at standard prices.",
                  tag: "GREEN MOBILITY",
                  color: "from-emerald-500/20 to-teal-500/10",
                  border: "border-emerald-500/30",
                },
                {
                  icon: Gift,
                  title: "Instant Cashbacks & Rewards",
                  desc: "Earn Chaloji Coins on every kilometer traveled, redeemable on rides, food, and shopping.",
                  tag: "REWARDS",
                  color: "from-rose-500/20 to-amber-500/10",
                  border: "border-rose-500/30",
                },
              ].map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl p-6 bg-gradient-to-br ${feat.color} border ${feat.border} backdrop-blur-md hover:scale-[1.02] transition-all duration-300 group space-y-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10 uppercase tracking-wider">
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DEVELOPMENT & LAUNCH ROADMAP */}
          <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5 text-emerald-400" />
                <span>Launch Roadmap & Progress</span>
              </h3>
              <p className="text-xs text-gray-400">
                We are actively testing and finalizing our platform for deployment.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  phase: "Phase 1",
                  title: "Core Architecture & Backend Systems",
                  status: "Completed",
                  progress: 100,
                  icon: Check,
                  color: "bg-emerald-500",
                },
                {
                  phase: "Phase 2",
                  title: "Driver Partner Onboarding & Vehicle Verification",
                  status: "In Progress (85%)",
                  progress: 85,
                  icon: TrendingUp,
                  color: "bg-amber-400",
                },
                {
                  phase: "Phase 3",
                  title: "Android & iOS App Store Release",
                  status: "Scheduled",
                  progress: 40,
                  icon: Smartphone,
                  color: "bg-cyan-400",
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-emerald-400 font-mono">
                        {item.phase}
                      </span>
                      <span>{item.title}</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">{item.status}</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 shadow-sm shadow-emerald-500/50`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STORE & COMMUNITY TEASER */}
          <div className="text-center space-y-6 max-w-2xl mx-auto pt-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Stay Connected for Launch Updates
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#app-download"
                onClick={(e) => {
                  e.preventDefault();
                  setBookingOpen(true);
                }}
                className="px-6 py-3 rounded-xl glass-panel border border-white/15 hover:border-emerald-400 text-xs font-bold text-white flex items-center space-x-3 transition-all hover:scale-105"
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase">Available Soon on</div>
                  <div className="text-sm font-extrabold text-white">Google Play & App Store</div>
                </div>
              </a>

              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>Explore Full Website</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />

        {/* Scroll to Top */}
        <ScrollToTop />
      </main>
    </LenisProvider>
  );
}
