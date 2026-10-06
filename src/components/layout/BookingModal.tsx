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
  LocateFixed,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Radio,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  createDirectRideRequest,
  subscribeToRide,
  cancelWebRide,
  RideStatus,
} from "@/lib/rideService";

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

const QUICK_ROUTES = [
  { from: "Phoolpur Bus Stand", to: "Varanasi Airport (VNS)" },
  { from: "Main Market, Phoolpur", to: "Phoolpur Chowk" },
  { from: "Phoolpur to Prayagraj", to: "Sangam Ghat" },
  { from: "Phoolpur", to: "Ayodhya Ram Mandir" },
];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

type ModalView = "FORM" | "SEARCHING" | "ASSIGNED";

export function BookingModal({ open, onClose }: BookingModalProps) {
  const today = new Date().toISOString().slice(0, 10);

  const [view, setView] = useState<ModalView>("FORM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("");
  const [tripType, setTripType] = useState("One Way");
  const [rideType, setRideType] = useState("Sedan Cab");
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);

  // Real-time Firestore ride tracking state
  const [currentRideId, setCurrentRideId] = useState<string | null>(null);
  const [rideInfo, setRideInfo] = useState<RideStatus | null>(null);
  const [searchCountdown, setSearchCountdown] = useState(45);

  const resetForm = useCallback(() => {
    setView("FORM");
    setError("");
    setCurrentRideId(null);
    setRideInfo(null);
    setSearchCountdown(45);
  }, []);

  const handleClose = useCallback(() => {
    if (currentRideId && view === "SEARCHING") {
      cancelWebRide(currentRideId).catch(() => {});
    }
    resetForm();
    onClose();
  }, [currentRideId, view, onClose, resetForm]);

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

  // Countdown timer when searching for drivers
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (view === "SEARCHING" && searchCountdown > 0) {
      timer = setInterval(() => {
        setSearchCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [view, searchCountdown]);

  // Real-time Firestore subscription when ride is created
  useEffect(() => {
    if (!currentRideId) return;

    const unsubscribe = subscribeToRide(
      currentRideId,
      (updatedRide) => {
        setRideInfo(updatedRide);
        if (
          updatedRide.status === "ACCEPTED" ||
          updatedRide.status === "ARRIVING" ||
          updatedRide.status === "IN_PROGRESS"
        ) {
          setView("ASSIGNED");
        }
      },
      (err) => {
        console.error("Firestore ride subscription error:", err);
      }
    );

    return () => unsubscribe();
  }, [currentRideId]);

  // GPS Location Fetcher
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

  // Dispatch via Realtime Firebase Firestore to Driver Apps
  const handleDirectRealtimeDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.trim() || !drop.trim()) {
      setError("Pickup aur Drop location dono required hain.");
      return;
    }
    if (!phone.trim()) {
      setError("Driver contact ke liye Mobile Number required hai.");
      return;
    }

    try {
      setError("");
      setView("SEARCHING");
      setSearchCountdown(45);

      const rideId = await createDirectRideRequest({
        riderName: name,
        riderPhone: phone,
        pickup,
        drop,
        date,
        time,
        tripType,
        rideType,
      });

      setCurrentRideId(rideId);
    } catch (err: any) {
      console.error("Realtime dispatch error:", err);
      setError(err?.message || "Driver siren alert dispatch failed. Retrying...");
      // Still show searching view so driver siren alert stays active
      setView("SEARCHING");
    }
  };

  // WhatsApp Dispatch Fallback
  const handleWhatsAppDispatch = () => {
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
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

            {/* Modal Header */}
            <div className="relative flex items-center justify-between px-6 sm:px-8 pt-6 pb-2">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Zap className="w-5 h-5 text-black" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display">
                    {view === "FORM" && "Book Instant Ride"}
                    {view === "SEARCHING" && "Searching Nearby Drivers..."}
                    {view === "ASSIGNED" && "Cab Confirmed & Assigned!"}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    {view === "FORM" && "Direct Realtime Dispatch to Driver Apps"}
                    {view === "SEARCHING" && "Siren Alert Ringing on Driver Phones"}
                    {view === "ASSIGNED" && "Driver is en route to your pickup"}
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

            {/* VIEW 1: BOOKING FORM */}
            {view === "FORM" && (
              <form onSubmit={handleDirectRealtimeDispatch} className="relative px-6 sm:px-8 pb-8 pt-4 space-y-4">
                
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
                    placeholder="e.g. Phoolpur Bus Stand"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-colors"
                  />
                </div>

                {/* Drop Location */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Drop Destination</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="e.g. Varanasi Airport (VNS)"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/[0.07] transition-colors"
                  />
                </div>

                {/* Quick Route Picks */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Quick Route Picks:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_ROUTES.map((qr, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickRoute(qr)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-[11px] text-gray-300 hover:text-emerald-300 transition-all text-left"
                      >
                        {qr.from.split(" ")[0]} ➔ {qr.to.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={today}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Time</span>
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Ride Type Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center space-x-1">
                    <Car className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Select Vehicle Type</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {RIDE_TYPES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRideType(r)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          rideType === r
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black border-transparent shadow-md shadow-emerald-500/20"
                            : "glass-panel border-white/10 text-gray-300 hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-semibold text-rose-400">{error}</p>
                )}

                {/* Primary Realtime Dispatch Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-expand="true"
                  className="group relative w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-black text-sm tracking-wide uppercase shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Radio className="w-4 h-4 text-black animate-pulse" />
                  <span>Broadcast to Nearby Drivers</span>
                </motion.button>

                {/* Secondary WhatsApp Fallback */}
                <button
                  type="button"
                  onClick={handleWhatsAppDispatch}
                  className="w-full py-2.5 rounded-xl glass-panel border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:border-emerald-500/40 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Or Send Booking directly on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero surge pricing • 100% Verified ChaloJi Drivers</span>
                </div>
              </form>
            )}

            {/* VIEW 2: REALTIME DRIVER SEARCH RADAR */}
            {view === "SEARCHING" && (
              <div className="px-6 sm:px-8 py-10 text-center space-y-6">
                
                {/* Animated Radar Pulse */}
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: ring * 0.7,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-emerald-400/40"
                    />
                  ))}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/40">
                    <Radio className="w-10 h-10 text-black animate-ping" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-black text-white font-display">
                    Ringing Driver Apps ({searchCountdown}s)
                  </h4>
                  <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                    Aapki ride <span className="text-emerald-400 font-bold">{pickup}</span> ➔ <span className="text-cyan-400 font-bold">{drop}</span> ke paas ke sabhi drivers ke phone par ring ho rahi hai...
                  </p>
                </div>

                <div className="glass-panel p-4 rounded-2xl border border-white/10 max-w-sm mx-auto text-xs text-gray-400 space-y-1">
                  <p>🚗 Vehicle: <span className="text-white font-bold">{rideType}</span></p>
                  <p>👤 Passenger Phone: <span className="text-white font-bold">{phone}</span></p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppDispatch}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg"
                  >
                    Send to WhatsApp Control Room Instantly
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs text-gray-500 hover:text-rose-400 underline transition-colors"
                  >
                    Cancel Search
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 3: DRIVER ASSIGNED SUCCESS */}
            {view === "ASSIGNED" && rideInfo && (
              <div className="px-6 sm:px-8 py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-white font-display">
                    Driver Assigned &amp; En Route!
                  </h4>
                  <p className="text-xs text-emerald-400 font-bold">
                    Aapki gadi arrival ETA: {rideInfo.etaMins || 4} Mins
                  </p>
                </div>

                {/* Driver Card Info */}
                <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h5 className="text-base font-bold text-white">{rideInfo.driverName}</h5>
                      <p className="text-xs text-gray-400">Verified ChaloJi Partner</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono">
                      {rideInfo.vehicleNumber}
                    </span>
                  </div>

                  <div className="text-xs text-gray-300 space-y-1">
                    <p>📍 <span className="text-gray-400">Pickup:</span> {rideInfo.pickupAddress}</p>
                    <p>🏁 <span className="text-gray-400">Drop:</span> {rideInfo.dropAddress}</p>
                  </div>
                </div>

                <a
                  href={`tel:${rideInfo.driverPhone || "8087747774"}`}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2 block"
                >
                  <PhoneCall className="w-4 h-4 fill-black" />
                  <span>Call Driver ({rideInfo.driverPhone || "+91 80877 47774"})</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
