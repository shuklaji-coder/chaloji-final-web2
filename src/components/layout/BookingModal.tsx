"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  X,
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Repeat,
  Car,
} from "lucide-react";

const WHATSAPP_NUMBER = "918087747774";

const TRIP_TYPES = ["One Way", "Round Trip", "Hourly Rental"];

const RIDE_TYPES = [
  "Express Bike",
  "Chalo Auto",
  "Sedan Cab",
  "SUV",
  "Outstation",
  "Baarat Convoy",
];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const today = new Date().toISOString().slice(0, 10);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("");
  const [tripType, setTripType] = useState("One Way");
  const [rideType, setRideType] = useState("Sedan Cab");
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    onClose();
    setError("");
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.trim() || !drop.trim()) {
      setError("Pickup aur Drop location dono required hain.");
      return;
    }
    const message = encodeURIComponent(
      `🚖 *Instant Ride Booking - Chaloji*\n\n` +
        `👤 *Name:* ${name.trim() || "Rider"}\n` +
        `📞 *Phone:* ${phone.trim() || "Not specified"}\n` +
        `📍 *Pickup:* ${pickup.trim()}\n` +
        `🏁 *Drop:* ${drop.trim()}\n` +
        `📅 *Date:* ${date || "ASAP"}\n` +
        `🕐 *Time:* ${time || "ASAP"}\n` +
        `🔁 *Trip Type:* ${tripType}\n` +
        `🚗 *Vehicle:* ${rideType}\n\n` +
        `Kripya gadi jaldi dispatch karein!`
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
    setPickup("");
    setDrop("");
    setTime("");
    setName("");
    setPhone("");
    handleClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl glass-card border border-emerald-500/30 shadow-2xl shadow-black/60"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-transparent blur-[80px] pointer-events-none" />

            <div className="relative flex items-center justify-between px-6 sm:px-8 pt-6 pb-2">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Zap className="w-5 h-5 text-black" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display">
                    Book Instant Ride
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    Confirmed on WhatsApp in seconds
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

            <form onSubmit={handleSubmit} className="relative px-6 sm:px-8 pb-8 pt-4 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pickup Location</span>
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Civil Lines, Phoolpur"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Drop Location</span>
                </label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="e.g. Kashi Vishwanath Temple, Varanasi"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/[0.07] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-base text-white focus:outline-none focus:border-emerald-500/60 transition-colors [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Time</span>
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-base text-white focus:outline-none focus:border-cyan-500/60 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                  <Repeat className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Trip Type</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TRIP_TYPES.map((t) => (
                    <motion.button
                      key={t}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTripType(t)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                        tripType === t
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-emerald-500/25"
                          : "glass-panel border-white/10 text-gray-300 hover:border-emerald-500/40 hover:text-white"
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                  <Car className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ride Type</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {RIDE_TYPES.map((r) => (
                    <motion.button
                      key={r}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRideType(r)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                        rideType === r
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-emerald-500/25"
                          : "glass-panel border-white/10 text-gray-300 hover:border-cyan-500/40 hover:text-white"
                      }`}
                    >
                      {r}
                    </motion.button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-xs font-semibold text-rose-400">{error}</p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-expand="true"
                className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-black font-black text-sm tracking-wide uppercase shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Confirm & Send on WhatsApp</span>
              </motion.button>

              <p className="text-center text-[11px] text-gray-500">
                Zero surge • Free cancellation • 24x7 support
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
