"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  ArrowUpDown,
  X,
  Mic,
  Clock,
  Calendar,
  Sparkles,
  ChevronRight,
  Plane,
  Train,
  Building,
} from "lucide-react";
import { LocationPoint } from "@/types/ride";
import { POPULAR_INDIAN_LANDMARKS } from "@/lib/rideService";

interface DestinationSearchModalProps {
  open: boolean;
  onClose: () => void;
  pickup: LocationPoint;
  onSelectDrop: (drop: LocationPoint) => void;
  onSelectPickup: (pickup: LocationPoint) => void;
}

export function DestinationSearchModal({
  open,
  onClose,
  pickup,
  onSelectDrop,
  onSelectPickup,
}: DestinationSearchModalProps) {
  const [pickupText, setPickupText] = useState(pickup.title || pickup.address);
  const [dropText, setDropText] = useState("");
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [scheduleTime, setScheduleTime] = useState("10:00");

  const filteredLandmarks = POPULAR_INDIAN_LANDMARKS.filter(
    (l) =>
      l.title.toLowerCase().includes(dropText.toLowerCase()) ||
      l.address.toLowerCase().includes(dropText.toLowerCase()) ||
      l.city.toLowerCase().includes(dropText.toLowerCase())
  );

  const handleSwap = () => {
    const temp = pickupText;
    setPickupText(dropText);
    setDropText(temp);
  };

  const handleSelectLocation = (landmark: (typeof POPULAR_INDIAN_LANDMARKS)[0]) => {
    onSelectDrop({
      lat: landmark.lat,
      lng: landmark.lng,
      address: landmark.address,
      title: landmark.title,
    });
    onClose();
  };

  const toggleVoiceSearch = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setDropText("Varanasi Lal Bahadur Shastri Airport");
      setIsVoiceListening(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[600] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-full max-w-xl h-[88dvh] sm:h-[680px] bg-[#0B1320] rounded-t-3xl sm:rounded-3xl border border-[#DFC993]/35 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative p-5 pb-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC993] to-[#B58E4A] flex items-center justify-center text-[#041611] font-bold shadow-md">
                  📍
                </div>
                <div>
                  <h3 className="text-base font-black text-white font-display">Plan Your Ride</h3>
                  <p className="text-[11px] text-[#DFC993] font-bold uppercase tracking-wider">
                    Zero Surge Upfront Pricing
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setScheduleOpen(!scheduleOpen)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    scheduleOpen
                      ? "bg-[#DFC993] text-[#041611] border-[#DFC993]"
                      : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Schedule</span>
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="p-1.5 rounded-xl glass-panel border border-[#DFC993]/20 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Inputs Box */}
            <div className="p-5 space-y-3 bg-[#041611]/70 border-b border-white/10">
              {/* Pickup Input */}
              <div className="relative flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 ring-4 ring-emerald-400/20" />
                <input
                  type="text"
                  value={pickupText}
                  onChange={(e) => setPickupText(e.target.value)}
                  placeholder="Enter pickup point"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#DFC993] font-medium"
                />
              </div>

              {/* Connecting line & Swap icon */}
              <div className="relative pl-1.5 flex items-center justify-between">
                <div className="w-0.5 h-4 bg-white/20 ml-[3px]" />
                <button
                  onClick={handleSwap}
                  title="Swap Pickup & Drop"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#DFC993] transition-all hover:scale-105 active:scale-95"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Drop Input */}
              <div className="relative flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-[#DFC993] shrink-0 ring-4 ring-[#DFC993]/20" />
                <div className="relative flex-1">
                  <input
                    type="text"
                    autoFocus
                    value={dropText}
                    onChange={(e) => setDropText(e.target.value)}
                    placeholder="Where to? (e.g. Airport, Station, Temple)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-3.5 pr-16 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#DFC993] font-medium"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    {dropText && (
                      <button
                        onClick={() => setDropText("")}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={toggleVoiceSearch}
                      title="Voice Search"
                      className={`p-1.5 rounded-lg transition-colors ${
                        isVoiceListening
                          ? "bg-rose-500 text-white animate-pulse"
                          : "text-[#DFC993] hover:text-white"
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Schedule Drawer */}
              {scheduleOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="pt-2 flex items-center space-x-3 border-t border-white/10 text-xs"
                >
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Date</span>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full bg-white/10 rounded-lg px-2.5 py-1.5 text-white border border-white/10 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Time</span>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full bg-white/10 rounded-lg px-2.5 py-1.5 text-white border border-white/10 text-xs focus:outline-none"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggestions & Indian Landmarks List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-white/5">
              <p className="text-[11px] font-bold text-[#DFC993] uppercase tracking-wider px-2 pt-1 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#DFC993]" />
                <span>POPULAR VERIFIED DESTINATIONS</span>
              </p>

              {filteredLandmarks.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectLocation(item)}
                  className="w-full p-3 rounded-2xl hover:bg-white/5 flex items-center justify-between text-left transition-all duration-200 group active:scale-[0.99]"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#DFC993] group-hover:border-[#DFC993]/40 group-hover:scale-105 transition-all shrink-0">
                      {item.title.includes("Airport") ? (
                        <Plane className="w-4 h-4" />
                      ) : item.title.includes("Junction") || item.title.includes("Station") ? (
                        <Train className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#DFC993] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{item.address}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 shrink-0 ml-2">
                    {item.city}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
