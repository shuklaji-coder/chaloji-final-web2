"use client";

import React from "react";
import { 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUpRight, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Zap
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#08090C] border-t border-white/10 pt-14 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-emerald-500/10 via-cyan-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-12 sm:mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#08090C] rounded-[11px] flex items-center justify-center">
                  <Car className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight font-display">
                  Chalo<span className="text-emerald-400">Ji</span>
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-wider">
                  NEXT-GEN MOBILITY PLATFORM
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              India's premier futuristic mobility ecosystem. Offering instant cab bookings, verified driver partners, zero surge guarantees, and luxury wedding Baarat convoys with 60 FPS digital experience.
            </p>

            {/* Live Server Status Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Network Status: 100% Operational (0.2s Dispatch)</span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Mobility Services</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {["Outstation Cabs", "Local Hourly Rental", "Airport Drop & Pickup", "Luxury Baarat Convoy", "Bike & Auto Express"].map((item, i) => (
                <li key={i}>
                  <a href="#app-download" className="hover:text-emerald-400 transition-colors flex items-center space-x-1 group">
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage Cities */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Top Destinations</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {["Phoolpur to Varanasi", "Phoolpur to Prayagraj", "Phoolpur to Jaunpur", "Phoolpur to Ayodhya", "Phoolpur to Lucknow"].map((city, i) => (
                <li key={i}>
                  <a href="#app-download" className="hover:text-cyan-400 transition-colors flex items-center space-x-1 group">
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Contact 24x7</span>
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span>ChaloJi Mobility HQ, Main Market, Phoolpur, Uttar Pradesh 212402</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:8087747774" className="hover:text-white transition-colors font-medium text-emerald-300">
                  +91 80877 47774
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:support@chaloji.com" className="hover:text-white transition-colors">
                  support@chaloji.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-center md:text-left">© {new Date().getFullYear()} ChaloJi Next-Gen Mobility. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Driver Agreement</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
