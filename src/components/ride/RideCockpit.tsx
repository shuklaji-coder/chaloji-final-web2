"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Sparkles,
  Zap,
  Users,
  Compass,
  Bell,
  Wallet,
  Tag,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Star,
  Award,
} from "lucide-react";
import { RideCategory, LocationPoint } from "@/types/ride";
import { POPULAR_INDIAN_LANDMARKS } from "@/lib/rideService";

interface RideCockpitProps {
  onOpenSearch: () => void;
  onSelectCategory: (category: RideCategory) => void;
  onQuickDestination: (loc: LocationPoint) => void;
  onOpenSpecialService: (type: string) => void;
  currentAddress: string;
}

const FLEET_CATEGORIES: Array<{
  id: RideCategory;
  name: string;
  tagline: string;
  badge: string;
  icon: string;
  eta: string;
  fareFrom: string;
}> = [
  {
    id: "bike",
    name: "Moto Bike",
    tagline: "Doorstep solo pickup • Traffic-free",
    badge: "2 MINS",
    icon: "🏍️",
    eta: "2 min",
    fareFrom: "₹25",
  },
  {
    id: "auto",
    name: "Chalo Auto",
    tagline: "Meter-free upfront • Zero refusal",
    badge: "POPULAR",
    icon: "🛺",
    eta: "3 min",
    fareFrom: "₹35",
  },
  {
    id: "cab",
    name: "Cab Sedan AC",
    tagline: "Clean AC Dzire/Amaze • Top Captains",
    badge: "RECOMMENDED",
    icon: "🚗",
    eta: "4 min",
    fareFrom: "₹60",
  },
  {
    id: "suv",
    name: "SUV (7-Seater)",
    tagline: "Spacious Ertiga/Innova • Family & Luggage",
    badge: "ROYALE",
    icon: "🚙",
    eta: "5 min",
    fareFrom: "₹110",
  },
];

const ROYALE_SERVICES = [
  {
    id: "outstation",
    title: "Highway Outstation",
    tagline: "One-way & round-trip verified intercity sedans & SUVs.",
    badge: "INTERCITY",
    icon: "🛣️",
    accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  },
  {
    id: "baraat",
    title: "Royale Baraat & Fleet",
    tagline: "Luxury bridal cars, black Fortuner convoys & VIP coordinators.",
    badge: "WEDDINGS",
    icon: "👑",
    accent: "from-[#DFC993]/25 to-amber-500/10 border-[#DFC993]/40",
  },
  {
    id: "driver_on_demand",
    title: "Chauffeur on Demand",
    tagline: "Gaadi aapki, driver ChaloJi ka — Certified hourly chauffeurs.",
    badge: "CHAUFFEUR",
    icon: "👔",
    accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
  },
  {
    id: "saath",
    title: "Chalo Saath (Rideshare)",
    tagline: "Verified co-riders heading on the same route. Save 60% fuel.",
    badge: "CARPOOL",
    icon: "🤝",
    accent: "from-purple-500/20 to-emerald-500/10 border-purple-500/30",
  },
];

const PROMO_OFFERS = [
  {
    code: "CHALOJI50",
    title: "Flat ₹50 OFF on First 3 Rides",
    desc: "Valid on all Bike, Auto & Sedan bookings.",
  },
  {
    code: "DIWALIROYALE",
    title: "₹150 OFF on Outstation & Baraat",
    desc: "Valid for family trips & festive highway bookings.",
  },
];

export function RideCockpit({
  onOpenSearch,
  onSelectCategory,
  onQuickDestination,
  onOpenSpecialService,
  currentAddress,
}: RideCockpitProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0B1320] text-white overflow-y-auto p-4 sm:p-6 space-y-6">
      
      {/* 1. TOP HEADER BRAND BAR */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="/chaloji logo.png"
              alt="ChaloJi"
              className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(223,201,147,0.3)]"
            />
          </a>

          {/* Current Address Pill */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-[#DFC993]/20 text-[11px] text-gray-300 hover:text-white transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="line-clamp-1 max-w-[160px] font-medium text-[#DFC993]">
              {currentAddress || "Phoolpur / Prayagraj"}
            </span>
          </button>
        </div>

        {/* User Balance & Avatar */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#DFC993]">
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>₹250</span>
          </div>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DFC993] to-[#B58E4A] p-[1.5px] shadow-md">
            <div className="w-full h-full bg-[#041611] rounded-full flex items-center justify-center font-bold text-xs text-[#DFC993]">
              CJ
            </div>
          </div>
        </div>
      </div>

      {/* 2. BIG CALL TO ACTION: SEARCH DESTINATION BAR */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onOpenSearch}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-[#DFC993]/40 hover:border-[#DFC993] shadow-xl flex items-center justify-between group transition-all text-left"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFC993] to-[#B58E4A] flex items-center justify-center text-[#041611] shadow-lg shrink-0">
            <Search className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFC993] block">
              AAPKO KAHAN JANA HAI?
            </span>
            <span className="text-base sm:text-lg font-black text-white font-display">
              Where to? Enter Destination
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-xs font-bold text-[#DFC993] group-hover:translate-x-1 transition-transform">
          <span>Search</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </motion.button>

      {/* 3. 1-TAP QUICK COMMUTE CHIPS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400">
          <span>Quick 1-Tap Commute:</span>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={onOpenSearch}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white shrink-0 flex items-center space-x-1.5 transition-colors"
          >
            <span>🏠</span>
            <span>+ Set Home</span>
          </button>
          <button
            onClick={onOpenSearch}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white shrink-0 flex items-center space-x-1.5 transition-colors"
          >
            <span>🏢</span>
            <span>+ Set Work</span>
          </button>
          {POPULAR_INDIAN_LANDMARKS.slice(0, 3).map((item, idx) => (
            <button
              key={idx}
              onClick={() => onQuickDestination(item)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#DFC993]/15 border border-white/10 hover:border-[#DFC993]/40 text-xs text-gray-300 hover:text-white shrink-0 flex items-center space-x-1.5 transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#DFC993]" />
              <span className="line-clamp-1 max-w-[130px]">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. INTERACTIVE FLEET COCKPIT (4-CATEGORY SELECTOR) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Zap className="w-4 h-4 text-[#DFC993]" />
            <span>DAILY INSTANT RIDES (ZERO SURGE)</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            FAST DISPATCH
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {FLEET_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onSelectCategory(cat.id);
                onOpenSearch();
              }}
              className="p-3.5 rounded-2xl bg-[#041611] border border-[#DFC993]/20 hover:border-[#DFC993] text-left flex flex-col justify-between space-y-3 shadow-lg group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#DFC993]/20 text-[#DFC993] border border-[#DFC993]/30 uppercase font-mono">
                  {cat.badge}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-black text-white font-display group-hover:text-[#DFC993] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[10px] text-gray-400 line-clamp-1">{cat.tagline}</p>
                <div className="flex items-center justify-between text-[11px] font-mono font-bold mt-2 pt-2 border-t border-white/5">
                  <span className="text-gray-400">{cat.eta} away</span>
                  <span className="text-emerald-400">{cat.fareFrom}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 5. SPECIALIZED ROYALE SERVICES CAROUSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Award className="w-4 h-4 text-[#DFC993]" />
            <span>SPECIALIZED ROYALE MOBILITY</span>
          </div>
          <span className="text-[10px] text-[#DFC993] uppercase font-bold">VIP SERVICES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ROYALE_SERVICES.map((srv) => (
            <motion.button
              key={srv.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onOpenSpecialService(srv.id)}
              className={`p-4 rounded-2xl bg-gradient-to-br ${srv.accent} border text-left flex items-start space-x-3.5 shadow-xl transition-all group`}
            >
              <div className="w-11 h-11 rounded-xl bg-[#041611] border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                {srv.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-white font-display group-hover:text-[#DFC993] transition-colors">
                    {srv.title}
                  </h4>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white font-mono">
                    {srv.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mt-1">
                  {srv.tagline}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 6. HOT PROMOS & DISCOUNT OFFERS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400">
          <span className="flex items-center space-x-1.5 text-white">
            <Tag className="w-4 h-4 text-[#DFC993]" />
            <span>HOT OFFERS &amp; COMMUTER DEALS</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PROMO_OFFERS.map((promo, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-black text-white font-display block">
                  {promo.title}
                </span>
                <p className="text-[11px] text-gray-400">{promo.desc}</p>
              </div>

              <button
                onClick={() => copyPromo(promo.code)}
                className="px-3 py-1.5 rounded-xl bg-[#DFC993]/15 hover:bg-[#DFC993]/25 border border-[#DFC993]/40 text-xs font-mono font-bold text-[#DFC993] flex items-center space-x-1.5 transition-all shrink-0 ml-2"
              >
                {copiedCode === promo.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{promo.code}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
