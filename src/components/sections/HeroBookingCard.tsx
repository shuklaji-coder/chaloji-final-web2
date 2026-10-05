"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Bike, Car, Zap, ArrowRight, LocateFixed, Sparkles } from "lucide-react";
import { BookingModal } from "@/components/layout/BookingModal";

const POPULAR_QUICK_PICK = [
  { from: "Varanasi Junction (Cantt)", to: "Kashi Vishwanath Temple" },
  { from: "Phoolpur Bus Stand", to: "Babatpur Airport (VNS)" },
  { from: "Sigra Chauraha", to: "BHU Lanka Gate" },
];

export function HeroBookingCard({ onOpenModal }: { onOpenModal?: (pickup?: string, drop?: string) => void }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [locating, setLocating] = useState(false);

  const handleGetLocation = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const locationName =
              data.address?.suburb ||
              data.address?.village ||
              data.address?.town ||
              data.address?.city ||
              "Current GPS Location";
            setPickup(locationName);
          } catch {
            setPickup("Current GPS Location (Varanasi)");
          } finally {
            setLocating(false);
          }
        },
        () => {
          setPickup("Varanasi Cantt Station");
          setLocating(false);
        },
        { timeout: 8000 }
      );
    } else {
      setPickup("Varanasi Cantt Station");
      setLocating(false);
    }
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenModal) {
      onOpenModal(pickup, drop);
    }
  };

  return (
    <div className="w-full max-w-lg bg-[#0F121D]/90 backdrop-blur-xl border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/80 space-y-4 text-white">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Zap className="w-4 h-4 text-black" />
          </span>
          <div>
            <h3 className="text-base font-extrabold text-white">Book Instant Ride</h3>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Driver Dispatch Engine
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-black bg-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
          0% Surge
        </span>
      </div>

      {/* Pickup & Drop Inputs */}
      <form onSubmit={handleBookNow} className="space-y-3">
        {/* Pickup Input */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-300 mb-1">
            <label className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Pickup Point
            </label>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={locating}
              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              <LocateFixed className={`w-3 h-3 ${locating ? "animate-spin" : ""}`} />
              {locating ? "Locating..." : "GPS Auto-Fill"}
            </button>
          </div>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup address or landmark"
            className="w-full bg-[#08090C] border border-white/10 focus:border-emerald-500 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            required
          />
        </div>

        {/* Drop Input */}
        <div>
          <label className="text-[11px] font-bold text-gray-300 mb-1 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Destination / Drop Location
          </label>
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            placeholder="Where do you want to go?"
            className="w-full bg-[#08090C] border border-white/10 focus:border-emerald-500 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            required
          />
        </div>

        {/* Quick Pick Buttons */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Popular Quick Pick Routes
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_QUICK_PICK.map((route, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPickup(route.from);
                  setDrop(route.to);
                }}
                className="text-[10px] font-semibold bg-white/5 hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 px-2.5 py-1 rounded-xl transition-all"
              >
                {route.from} → {route.to}
              </button>
            ))}
          </div>
        </div>

        {/* Submit CTA Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <span>Find Drivers & Book Ride</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </form>
    </div>
  );
}
