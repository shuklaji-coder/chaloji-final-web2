"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Tag,
  CreditCard,
  Banknote,
  QrCode,
  Zap,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { LocationPoint, RideCategory, RideOption } from "@/types/ride";
import { formatCurrency } from "@/lib/utils";

interface RideSelectionSheetProps {
  pickup: LocationPoint;
  drop: LocationPoint;
  onBookRide: (category: RideCategory, paymentMethod: "cash" | "upi" | "wallet", fare: number, discount: number) => void;
  onCancel: () => void;
}

export function RideSelectionSheet({
  pickup,
  drop,
  onBookRide,
  onCancel,
}: RideSelectionSheetProps) {
  const [selectedCategory, setSelectedCategory] = useState<RideCategory>("cab");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi" | "wallet">("upi");
  const [promoCode, setPromoCode] = useState("CHALOJI50");
  const [promoApplied, setPromoApplied] = useState(true);
  const [showFareBreakdown, setShowFareBreakdown] = useState(false);

  // Approximate distance calculation using Haversine formula
  const getDistanceKm = () => {
    const R = 6371;
    const dLat = ((drop.lat - pickup.lat) * Math.PI) / 180;
    const dLon = ((drop.lng - pickup.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pickup.lat * Math.PI) / 180) *
        Math.cos((drop.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.max(parseFloat((d * 1.3).toFixed(1)), 3.5); // 1.3 road winding factor, min 3.5km
  };

  const distanceKm = getDistanceKm();
  const durationMins = Math.round(distanceKm * 2.8 + 4);

  const RIDE_OPTIONS: RideOption[] = [
    {
      id: "bike",
      title: "Bike Express",
      subtitle: "Doorstep solo pickup • Traffic-free",
      seats: 1,
      etaMins: 2,
      basePrice: 25,
      perKmRate: 8,
      icon: "🏍️",
      badge: "FASTEST",
    },
    {
      id: "auto",
      title: "Chalo Auto",
      subtitle: "Meter-free upfront • Zero refusal",
      seats: 3,
      etaMins: 3,
      basePrice: 35,
      perKmRate: 12,
      icon: "🛺",
      badge: "POPULAR",
    },
    {
      id: "cab",
      title: "Cab Sedan AC",
      subtitle: "Clean AC Dzire/Amaze • Top Captains",
      seats: 4,
      etaMins: 4,
      basePrice: 60,
      perKmRate: 16,
      icon: "🚗",
      badge: "BEST VALUE",
    },
    {
      id: "suv",
      title: "SUV (7-Seater)",
      subtitle: "Spacious Ertiga/Innova • Family & Luggage",
      seats: 6,
      etaMins: 5,
      basePrice: 110,
      perKmRate: 24,
      icon: "🚙",
      badge: "PREMIUM",
    },
  ];

  const currentOption = RIDE_OPTIONS.find((r) => r.id === selectedCategory) || RIDE_OPTIONS[2];

  // Pricing formula
  const baseFare = currentOption.basePrice;
  const distanceFare = Math.round(distanceKm * currentOption.perKmRate);
  const surgeFare = 0; // 100% Zero Surge Guaranteed!
  const discountAmount = promoApplied ? 50 : 0;
  const grossFare = baseFare + distanceFare + surgeFare;
  const netFare = Math.max(grossFare - discountAmount, 20);

  return (
    <div className="w-full bg-[#0B1320] border-t border-[#DFC993]/30 rounded-t-3xl shadow-2xl p-5 space-y-4 max-h-[85dvh] overflow-y-auto">
      
      {/* Route Summary Pill */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="line-clamp-1 max-w-[140px] sm:max-w-[180px]">{pickup.title || pickup.address}</span>
            <span className="text-gray-500">➔</span>
            <span className="w-2 h-2 rounded-full bg-[#DFC993]" />
            <span className="line-clamp-1 max-w-[140px] sm:max-w-[180px] text-[#DFC993]">
              {drop.title || drop.address}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono text-gray-400 mt-1">
            <span>{distanceKm} km total</span>
            <span>•</span>
            <span className="text-emerald-400">{durationMins} mins travel time</span>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 hover:text-white transition-colors"
        >
          Change
        </button>
      </div>

      {/* Ride Option Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-gray-300">
          <span>Choose Your Vehicle:</span>
          <span className="text-[#DFC993] flex items-center space-x-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Surge Pricing</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {RIDE_OPTIONS.map((option) => {
            const isSelected = selectedCategory === option.id;
            const optionFare = Math.max(
              option.basePrice + Math.round(distanceKm * option.perKmRate) - discountAmount,
              20
            );

            return (
              <motion.button
                key={option.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(option.id)}
                className={`relative w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-r from-[#DFC993]/15 via-emerald-500/10 to-transparent border-[#DFC993] shadow-lg shadow-[#DFC993]/15 ring-1 ring-[#DFC993]/40"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                }`}
              >
                {/* Vehicle Details */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-[#041611] border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-md">
                    {option.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-black text-white font-display">
                        {option.title}
                      </h4>
                      {option.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#DFC993] text-[#041611] uppercase tracking-wider">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{option.subtitle}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-emerald-400 font-mono mt-0.5">
                      <span className="flex items-center space-x-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{option.etaMins} mins away</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-0.5 text-gray-400">
                        <Users className="w-3 h-3" />
                        <span>{option.seats} seats</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-white font-display block">
                    {formatCurrency(optionFare)}
                  </span>
                  {promoApplied && (
                    <span className="text-[10px] text-emerald-400 line-through">
                      {formatCurrency(optionFare + discountAmount)}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Fare Breakdown Accordion */}
      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden text-xs">
        <button
          onClick={() => setShowFareBreakdown(!showFareBreakdown)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
        >
          <span className="font-semibold flex items-center space-x-1.5 text-xs">
            <Info className="w-3.5 h-3.5 text-[#DFC993]" />
            <span>Fare Breakdown &amp; GST Details</span>
          </span>
          {showFareBreakdown ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        <AnimatePresence>
          {showFareBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-3 pt-1 space-y-1.5 border-t border-white/5 text-[11px] text-gray-300 font-mono"
            >
              <div className="flex justify-between">
                <span>Base Fare:</span>
                <span>{formatCurrency(baseFare)}</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Rate ({distanceKm} km):</span>
                <span>{formatCurrency(distanceFare)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Surge Fee Guarantee:</span>
                <span>₹0 (ZERO SURGE)</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#DFC993] font-bold">
                  <span>Welcome Promo Discount (CHALOJI50):</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-white/10 text-white font-bold font-display text-xs">
                <span>Total Amount:</span>
                <span>{formatCurrency(netFare)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Payment Mode Selector & Promo */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setPaymentMethod("upi")}
          className={`p-2.5 rounded-xl border text-center transition-all ${
            paymentMethod === "upi"
              ? "bg-[#DFC993]/20 border-[#DFC993] text-white shadow-md"
              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          <QrCode className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
          <span className="text-[11px] font-bold block">UPI / QR</span>
        </button>

        <button
          onClick={() => setPaymentMethod("wallet")}
          className={`p-2.5 rounded-xl border text-center transition-all ${
            paymentMethod === "wallet"
              ? "bg-[#DFC993]/20 border-[#DFC993] text-white shadow-md"
              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#DFC993]" />
          <span className="text-[11px] font-bold block">Wallet (₹250)</span>
        </button>

        <button
          onClick={() => setPaymentMethod("cash")}
          className={`p-2.5 rounded-xl border text-center transition-all ${
            paymentMethod === "cash"
              ? "bg-[#DFC993]/20 border-[#DFC993] text-white shadow-md"
              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          <Banknote className="w-4 h-4 mx-auto mb-1 text-amber-400" />
          <span className="text-[11px] font-bold block">Cash to Driver</span>
        </button>
      </div>

      {/* Main Book Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onBookRide(selectedCategory, paymentMethod, netFare, discountAmount)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] text-[#041611] font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/20 hover:shadow-[#DFC993]/40 transition-all flex items-center justify-center space-x-2"
      >
        <span>Book {currentOption.title} ({formatCurrency(netFare)})</span>
        <ArrowRight className="w-4 h-4 stroke-[3]" />
      </motion.button>
    </div>
  );
}
