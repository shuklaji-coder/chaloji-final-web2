"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Phone,
  MessageSquare,
  ShieldCheck,
  Plane,
  HeartHandshake
} from "lucide-react";

const WHATSAPP_NUMBER = "918087747774";

const PACKAGE_TYPES = [
  { id: "baraat", label: "Baraat / Wedding Convoy", icon: "💒", desc: "Multi-car VIP decorated fleet for marriage functions" },
  { id: "airport", label: "Airport / Railway Drop", icon: "✈️", desc: "Fixed rate Prayagraj Airport & Railway drops" },
  { id: "outstation", label: "Outstation Round Trip", icon: "🛣️", desc: "Varanasi, Lucknow, Kanpur, Ayodhya & more" },
];

interface EventBookingModalProps {
  open: boolean;
  onClose: () => void;
  defaultPackage?: "baraat" | "airport" | "outstation";
}

export function EventBookingModal({ open, onClose, defaultPackage = "baraat" }: EventBookingModalProps) {
  const today = new Date().toISOString().slice(0, 10);

  const [packageType, setPackageType] = useState<string>(defaultPackage);
  const [pickupCity, setPickupCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [eventDate, setEventDate] = useState(today);
  const [vehiclesNeeded, setVehiclesNeeded] = useState("3 Cars Convoy");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (defaultPackage) {
      setPackageType(defaultPackage);
    }
  }, [defaultPackage, open]);

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
    if (!pickupCity.trim() || !contactPhone.trim() || !contactName.trim()) {
      setError("Please fill in Name, Phone & Pickup City.");
      return;
    }

    const packageLabel = PACKAGE_TYPES.find(p => p.id === packageType)?.label || packageType;

    const message = encodeURIComponent(
      `💒 *New Wedding & Outstation Package Request*\n\n` +
        `👤 *Name:* ${contactName.trim()}\n` +
        `📞 *Phone:* ${contactPhone.trim()}\n` +
        `🎯 *Package:* ${packageLabel}\n` +
        `📍 *Pickup:* ${pickupCity.trim()}\n` +
        `🏁 *Destination:* ${destinationCity.trim() || "Local / Dynamic"}\n` +
        `📅 *Date:* ${eventDate}\n` +
        `🚗 *Vehicles/Requirement:* ${vehiclesNeeded}`
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
    handleClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="event-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            key="event-panel"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto rounded-3xl glass-card border border-amber-500/40 shadow-2xl shadow-amber-950/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-transparent blur-[80px] pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between px-6 sm:px-8 pt-6 pb-2">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <HeartHandshake className="w-5 h-5 text-black" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display">
                    Wedding &amp; Outstation Quote
                  </h3>
                  <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                    Special Package Rates &amp; Dedicated Fleet
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close event modal"
                className="p-2 rounded-xl glass-panel border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="relative px-6 sm:px-8 pb-8 pt-4 space-y-5">
              
              {/* Package Type Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-300 block">
                  Select Package Category:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {PACKAGE_TYPES.map((pkg) => (
                    <motion.button
                      key={pkg.id}
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setPackageType(pkg.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        packageType === pkg.id
                          ? "bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/20 ring-1 ring-amber-500/40"
                          : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="text-lg block mb-1">{pkg.icon}</span>
                      <span className="text-xs font-bold font-display block text-white leading-tight">{pkg.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-300">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Anand Pandey"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-300">
                    Mobile Number (WhatsApp):
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Pickup & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-300 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pickup City / Area:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    placeholder="e.g. Phoolpur, Prayagraj"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-300 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Destination / Venue:</span>
                  </label>
                  <input
                    type="text"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    placeholder="e.g. Varanasi / Lawn Venue"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Date & Vehicle Fleet Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-300 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Event Date:</span>
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    min={today}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500 [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-300 flex items-center space-x-1">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span>Cars / Vehicles Needed:</span>
                  </label>
                  <select
                    value={vehiclesNeeded}
                    onChange={(e) => setVehiclesNeeded(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#111319] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="1 Luxury Sedan">1 Luxury Sedan / SUV</option>
                    <option value="3 Cars Convoy">3 Cars Convoy (Small Baraat)</option>
                    <option value="5+ Cars Fleet">5+ Cars VIP Baraat Fleet</option>
                    <option value="Airport Drop Service">Airport / Railway Station Drop</option>
                  </select>
                </div>
              </div>

              {error && <p className="text-xs font-semibold text-rose-400">{error}</p>}

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-black text-sm font-black uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-500/60 transition-all flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Get Instant Quote on WhatsApp</span>
              </motion.button>

              <p className="text-center text-[11px] text-gray-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Uniformed Drivers • Clean Vehicles • Dedicated Booking Manager</span>
              </p>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
