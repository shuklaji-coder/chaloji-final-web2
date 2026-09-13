"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Car, 
  Phone, 
  User, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Zap,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";
import { TiltCard } from "@/components/vfx/TiltCard";
import { AnimatedText } from "@/components/vfx/AnimatedText";
import { MagneticButton } from "@/components/vfx/MagneticButton";

const VEHICLE_TYPES = [
  { id: "auto", label: "Auto Rickshaw", icon: "/Auto.png" },
  { id: "cab", label: "Cab / Taxi (Sedan/SUV)", icon: "/car.png" },
  { id: "bike", label: "Bike / Scooter", icon: "/bike.png" },
];

export function DriverJoinSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("auto");
  const [city, setCity] = useState("Phoolpur / Prayagraj");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitted(true);

    // Create pre-filled WhatsApp message
    const message = encodeURIComponent(
      `Hi Chaloji! Main Driver Join karna chahta hu.\n\n👤 Naam: ${name}\n📞 Phone: ${phone}\n🛺 Vehicle: ${vehicle.toUpperCase()}\n📍 Area: ${city}\n\nKripya mujhe callback karein.`
    );
    
    // Open WhatsApp in new window
    window.open(`https://wa.me/918087747774?text=${message}`, "_blank");
  };

  return (
    <section id="driver-join" className="relative py-20 sm:py-28 z-10 overflow-hidden bg-[#08090C]">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>JOIN AS DRIVER PARTNER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            <AnimatedText text="Chaloji Driver Banein," gradientWords={[]} /> <br />
            <AnimatedText text="Har Din Zyaada Kamaayein!" gradientWords={["Har", "Din", "Zyaada", "Kamaayein!"]} />
          </h2>

          <p className="text-base text-gray-300">
            0% Commission offer, Instant UPI Payouts &amp; 24x7 Support. Bas 1 minute me form bharein!
          </p>

          <Shayari>
            Aapki gadi, aapki mehnat — Chaloji ke saath badhegi aapki aamdani aur izzat!
          </Shayari>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Feature Bullet Cards */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard tiltAmount={8} scaleOnHover={1.01}>
              <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-5 shadow-2xl">
                <h3 className="text-xl font-black text-white font-display flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>Kyu Chunein Chaloji?</span>
                </h3>

                <ul className="space-y-4 text-sm text-gray-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-display">Daily Instant UPI Payouts</strong>
                      <span>Kamayi ka paisa turant aapke bank account me. No delay!</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-display">Zero Commission Launch Offer</strong>
                      <span>Poora kiraya aapka! Shuruat me koi extra cut nahi.</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-display">24x7 Local Call Support</strong>
                      <span>Har raste par hum aapke saath hain. Hindi me help support.</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-display">Free Driver Uniform &amp; Branding Kit</strong>
                      <span>Chaloji partner badge aur rewards har hafte!</span>
                    </div>
                  </li>
                </ul>
              </div>
            </TiltCard>

            {/* Quick Call Box */}
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block font-semibold">Direct Call Helpline</span>
                <span className="text-lg font-black text-emerald-400 font-mono">+91 80877 47774</span>
              </div>
              <MagneticButton>
                <a
                  href="tel:8087747774"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-black uppercase tracking-wider hover:bg-emerald-400 transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-7">
            <TiltCard tiltAmount={6} scaleOnHover={1.01}>
              <div className="glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/40 shadow-2xl shadow-emerald-950/50 relative overflow-hidden">
                {/* Form Title */}
                <div className="mb-6 space-y-1">
                  <h3 className="text-2xl font-black text-white font-display">Driver Registration Form</h3>
                  <p className="text-xs text-gray-400">Apna naam aur phone number dalein — team turant contact karegi.</p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <h4 className="text-2xl font-black text-white font-display">Dhananyawad, {name}!</h4>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Aapka details submit ho gaya hai. Humne WhatsApp par bhi message create kar diya hai. Chaloji Team aapko 15 minute me call karegi!
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl glass-panel border border-white/20 text-xs font-bold text-gray-300 hover:text-white transition-all"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Vehicle Type Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        1. Apni Gadi Ka Prakar Chunein:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {VEHICLE_TYPES.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setVehicle(v.id)}
                            className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                              vehicle === v.id
                                ? "bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-[1.02]"
                                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <div className="w-12 h-10 flex items-center justify-center">
                              <img
                                src={v.icon}
                                alt={v.label}
                                className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <span className="text-xs font-bold font-display block leading-tight">{v.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-400" />
                        <span>2. Aapka Poora Naam:</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>3. Mobile Number (WhatsApp):</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                      />
                    </div>

                    {/* City Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>4. Aapka Shehar / Area:</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Phoolpur, Prayagraj, Jaunpur"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
                      />
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black text-sm font-black uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/60 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Instant Driver Join Request (WhatsApp)</span>
                    </button>

                    <p className="text-[11px] text-gray-400 text-center flex items-center justify-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Aapki privacy 100% surakshit hai. No spam!</span>
                    </p>

                  </form>
                )}

              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}

