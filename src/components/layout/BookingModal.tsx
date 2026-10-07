"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Car,
  Phone,
  CheckCircle2,
  LocateFixed,
  Zap,
  MessageSquare,
} from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  defaultPickup?: string;
  defaultDrop?: string;
  defaultRideType?: string;
}

const VEHICLE_TYPES = [
  { id: "car", name: "Cab / Sedan", icon: "🚕", desc: "Ac 4-Seater Comfortable Sedan" },
  { id: "auto", name: "Auto Rickshaw", icon: "🛺", desc: "Quick & Affordable local travel" },
  { id: "bike", name: "Express Bike", icon: "🏍️", desc: "Fastest single rider commute" },
  { id: "jeep", name: "SUV / Baarat Convoy", icon: "🚙", desc: "Spacious 6-7 seater for families & events" },
];

const POPULAR_ROUTES = [
  { from: "Phoolpur", to: "Varanasi Cantt Station" },
  { from: "Phoolpur", to: "Babuatpur Airport (VNS)" },
  { from: "Phoolpur", to: "Godowlia / Kashi Vishwanath" },
];

const WHATSAPP_NUMBER = "918087747774"; // Support WhatsApp

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  defaultPickup = "",
  defaultDrop = "",
  defaultRideType = "car",
}) => {
  const [pickup, setPickup] = useState(defaultPickup);
  const [drop, setDrop] = useState(defaultDrop);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tripType, setTripType] = useState<"ONE_WAY" | "ROUND_TRIP">("ONE_WAY");
  const [rideType, setRideType] = useState(defaultRideType);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill initial values when opened
  React.useEffect(() => {
    if (open) {
      setPickup(defaultPickup);
      setDrop(defaultDrop);
      setRideType(defaultRideType);
      setError("");
      setSubmitted(false);
    }
  }, [open, defaultPickup, defaultDrop, defaultRideType]);

  const handleClose = () => {
    setError("");
    setSubmitted(false);
    onClose();
  };

  // HTML5 GPS Geolocation reverse geocoding
  const handleGetLocation = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
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
            setPickup("Current GPS Location (Phoolpur)");
          } finally {
            setLocating(false);
          }
        },
        () => {
          setPickup("Phoolpur Main Market");
          setLocating(false);
        },
        { timeout: 8000 }
      );
    } else {
      setPickup("Phoolpur Main Market");
      setLocating(false);
    }
  };

  const handleQuickRoute = (route: { from: string; to: string }) => {
    setPickup(route.from);
    setDrop(route.to);
  };

  // Instant WhatsApp Booking Dispatch
  const handleWhatsAppBooking = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!pickup.trim() || !drop.trim()) {
      setError("Pickup aur Drop location dono required hain.");
      return;
    }
    if (!phone.trim()) {
      setError("Kripya apna mobile number enter karein.");
      return;
    }

    setError("");
    setSubmitted(true);

    const message = encodeURIComponent(
      `🚖 *Instant Ride Booking - Chaloji*\n\n` +
        `👤 *Name:* ${name.trim() || "Rider"}\n` +
        `📞 *Phone:* ${phone.trim()}\n` +
        `📍 *Pickup:* ${pickup.trim()}\n` +
        `🏁 *Drop:* ${drop.trim()}\n` +
        `📅 *Date:* ${date || "ASAP"}\n` +
        `🕐 *Time:* ${time || "ASAP"}\n` +
        `🔁 *Trip Type:* ${tripType === "ONE_WAY" ? "One-Way" : "Round Trip"}\n` +
        `🚗 *Vehicle:* ${rideType.toUpperCase()}\n\n` +
        `Kripya gadi jaldi dispatch karein!`
    );

    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl glass-card border border-emerald-500/30 shadow-2xl shadow-black/60"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-transparent blur-[80px] pointer-events-none" />

            {/* Modal Header */}
            <div className="relative flex items-center justify-between px-6 sm:px-8 pt-6 pb-2">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Zap className="w-5 h-5 text-black" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display">
                    {submitted ? "Booking Confirmed!" : "Book Ride Instantly"}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    {submitted ? "Connecting on WhatsApp..." : "Instant Cab Dispatch to Driver Partner"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close booking form"
                className="p-2 rounded-xl glass-panel border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleWhatsAppBooking} className="relative px-6 sm:px-8 pb-8 pt-4 space-y-4">
                {/* Rider Contact Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Mobile No <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pickup Location</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={locating}
                      className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <LocateFixed className={`w-3 h-3 ${locating ? "animate-spin" : ""}`} />
                      <span>{locating ? "Locating..." : "GPS Location"}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup address in Phoolpur / Varanasi"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Drop Location */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Drop Destination</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="Where do you want to go?"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Quick Popular Routes */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {POPULAR_ROUTES.map((route, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickRoute(route)}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 transition-all"
                    >
                      ⚡ {route.from} ➔ {route.to}
                    </button>
                  ))}
                </div>

                {/* Trip Type & Vehicle Selection */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {/* Trip Type */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Trip Type
                    </label>
                    <div className="grid grid-cols-2 gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => setTripType("ONE_WAY")}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                          tripType === "ONE_WAY"
                            ? "bg-emerald-500 text-black shadow-md"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        One-Way
                      </button>
                      <button
                        type="button"
                        onClick={() => setTripType("ROUND_TRIP")}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                          tripType === "ROUND_TRIP"
                            ? "bg-emerald-500 text-black shadow-md"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Round Trip
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Type */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Vehicle Option
                    </label>
                    <select
                      value={rideType}
                      onChange={(e) => setRideType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      {VEHICLE_TYPES.map((v) => (
                        <option key={v.id} value={v.id} className="bg-slate-900 text-white">
                          {v.icon} {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Schedule Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>Date (Optional)</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Time (Optional)</span>
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit CTA */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-black text-sm sm:text-base hover:opacity-95 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-5 h-5 fill-black" />
                    <span>BOOK INSTANT RIDE ON WHATSAPP</span>
                  </button>

                  <a
                    href="tel:8087747774"
                    className="w-full py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>OR CALL FOR IMMEDIATE CAB: 8087747774</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Booking Details Submitted!</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Opening WhatsApp to connect with ChaloJi Dispatch Center...
                  </p>
                </div>
                <div className="pt-4 flex justify-center space-x-3">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20"
                  >
                    Close Window
                  </button>
                  <a
                    href="tel:8087747774"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 flex items-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 8087747774</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
