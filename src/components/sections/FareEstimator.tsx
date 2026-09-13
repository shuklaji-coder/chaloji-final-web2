"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bike, 
  Car, 
  Sparkles, 
  Crown, 
  MapPin, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Info, 
  Clock, 
  Zap,
  Users
} from "lucide-react";

interface VehicleOption {
  id: string;
  name: string;
  category: string;
  capacity: string;
  baseFare: number;
  perKm: number;
  eta: string;
  icon: React.ElementType;
  popular?: boolean;
  tagline: string;
}

const VEHICLES: VehicleOption[] = [
  {
    id: "bike",
    name: "Express Bike",
    category: "2-Wheeler",
    capacity: "1 Rider",
    baseFare: 25,
    perKm: 9,
    eta: "2 mins",
    icon: Bike,
    tagline: "Beat traffic instantly",
  },
  {
    id: "auto",
    name: "Chalo Auto",
    category: "3-Wheeler",
    capacity: "3 Passengers",
    baseFare: 40,
    perKm: 13,
    eta: "3 mins",
    icon: Car,
    tagline: "Affordable local ride",
  },
  {
    id: "cab",
    name: "Prime Sedan",
    category: "Sedan Cab",
    capacity: "4 Passengers",
    baseFare: 80,
    perKm: 16,
    eta: "4 mins",
    icon: Car,
    popular: true,
    tagline: "AC Sedan comfort",
  },
  {
    id: "suv",
    name: "XL SUV",
    category: "6-Seater",
    capacity: "6 Passengers",
    baseFare: 120,
    perKm: 22,
    eta: "5 mins",
    icon: Car,
    tagline: "Spacious group travel",
  },
  {
    id: "baarat",
    name: "Baarat Convoy",
    category: "Wedding Fleet",
    capacity: "VIP Luxury",
    baseFare: 4500,
    perKm: 85,
    eta: "Pre-Book",
    icon: Crown,
    tagline: "Grand wedding convoy",
  },
];

const POPULAR_ROUTES = [
  { from: "Phoolpur Bus Stand", to: "Varanasi Airport (VNS)", dist: 14.5 },
  { from: "Main Market", to: "Phoolpur Chowk", dist: 11.2 },
  { from: "Kankarbagh", to: "Patliputra Junction", dist: 8.7 },
  { from: "Phoolpur to Varanasi", to: "Kashi Vishwanath Temple", dist: 108.0 },
  { from: "Phoolpur to Prayagraj", to: "Sangam Ghat", dist: 78.5 },
];

export function FareEstimator() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption>(VEHICLES[2]); // Default Cab
  const [pickup, setPickup] = useState(POPULAR_ROUTES[0].from);
  const [drop, setDrop] = useState(POPULAR_ROUTES[0].to);
  const [distance, setDistance] = useState(POPULAR_ROUTES[0].dist);
  const [calculatedFare, setCalculatedFare] = useState(0);
  const [displayFare, setDisplayFare] = useState(0);
  const [bookingDone, setBookingDone] = useState(false);

  // Calculate fare
  useEffect(() => {
    const rawFare = Math.round(selectedVehicle.baseFare + distance * selectedVehicle.perKm);
    setCalculatedFare(rawFare);
  }, [selectedVehicle, distance]);

  // Smooth CountUp Animation for Fare Price
  useEffect(() => {
    let start = displayFare;
    const end = calculatedFare;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setDisplayFare(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [calculatedFare]);

  const handleRouteSelect = (route: { from: string; to: string; dist: number }) => {
    setPickup(route.from);
    setDrop(route.to);
    setDistance(route.dist);
  };

  const handleBook = () => {
    setBookingDone(true);

    const message = encodeURIComponent(
      `🚖 *Instant Ride Booking Request - Chaloji*\n\n` +
        `🚗 *Vehicle Type:* ${selectedVehicle.name} (${selectedVehicle.category})\n` +
        `📍 *Pickup:* ${pickup}\n` +
        `🏁 *Drop:* ${drop}\n` +
        `📏 *Distance:* ${distance.toFixed(1)} km\n` +
        `💰 *Estimated Fare:* ₹${calculatedFare}\n` +
        `⚡ *Rate:* ₹${selectedVehicle.baseFare} Base + ₹${selectedVehicle.perKm}/km\n\n` +
        `Kripya gadi dispatch karein.`
    );

    window.open(`https://wa.me/918087747774?text=${message}`, "_blank", "noopener,noreferrer");

    setTimeout(() => setBookingDone(false), 4000);
  };

  return (
    <section id="fare-estimator" className="relative py-24 z-10 overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>REAL-TIME FARE ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Instant Fare Estimator & <br />
            <span className="text-gradient-emerald">Transparent Pricing</span>
          </h2>

          <p className="text-base text-gray-300">
            No hidden charges, zero peak hour surge pricing. Select your vehicle type and get live ride estimation instantly.
          </p>
        </div>

        {/* Estimator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls & Tab Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Vehicle Selector Tabs with Morphing layoutId */}
            <div className="glass-panel p-2 rounded-2xl border border-white/10 flex flex-wrap gap-2">
              {VEHICLES.map((vehicle) => {
                const Icon = vehicle.icon;
                const isSelected = selectedVehicle.id === vehicle.id;

                return (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`relative flex-1 min-w-[110px] py-3 px-3 rounded-xl flex flex-col items-center justify-center space-y-1 text-center transition-colors duration-200 ${
                      isSelected ? "text-white" : "text-gray-400 hover:text-gray-200"
                    }`}
                    data-cursor-expand="true"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeVehicleTab"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/40 rounded-xl shadow-lg shadow-emerald-500/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center space-x-1.5">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-gray-400"}`} />
                      <span className="text-xs font-bold font-display">{vehicle.name}</span>
                    </div>

                    <span className="relative z-10 text-[10px] font-medium text-gray-400">
                      {vehicle.capacity}
                    </span>

                    {vehicle.popular && (
                      <span className="absolute -top-1.5 -right-1 z-20 text-[8px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-500 text-black uppercase">
                        Popular
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pickup & Drop Location Input Box */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 font-display flex items-center justify-between">
                <span>Select Route</span>
                <span className="text-xs font-normal text-emerald-400">Live GPS Distance</span>
              </h3>

              <div className="space-y-3">
                {/* Pickup Field */}
                <div className="relative flex items-center">
                  <div className="absolute left-4 w-3 h-3 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/50" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter Pickup Location"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Vertical Connector line */}
                <div className="ml-5 h-4 w-0.5 border-l-2 border-dashed border-emerald-500/40" />

                {/* Drop Field */}
                <div className="relative flex items-center">
                  <div className="absolute left-4 w-3 h-3 rounded-full bg-amber-400 shadow-md shadow-amber-500/50" />
                  <input
                    type="text"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="Enter Drop Destination"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm font-medium focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Distance Slider control */}
              <div className="pt-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-400">Custom Route Distance:</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">{distance.toFixed(1)} km</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="200"
                  step="0.5"
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Popular quick route suggestions */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Popular Route Quick Picks:
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_ROUTES.map((route, i) => (
                    <button
                      key={i}
                      onClick={() => handleRouteSelect(route)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-xs text-gray-300 hover:text-emerald-300 transition-all text-left"
                    >
                      {route.from.split(" ")[0]} ➔ {route.to.split(" ")[0]} ({route.dist}km)
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Live Calculated Fare Box */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 space-y-6 relative overflow-hidden">
              
              {/* Top Accent Light Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Selected Vehicle Overview Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    SELECTED RIDE CATEGORY
                  </span>
                  <h3 className="text-2xl font-black text-white font-display flex items-center space-x-2">
                    <span>{selectedVehicle.name}</span>
                  </h3>
                  <p className="text-xs text-gray-400">{selectedVehicle.tagline}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <selectedVehicle.icon className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              {/* Real-time Animated Counter Fare Price Box */}
              <div className="bg-[#0B0E17] p-6 rounded-2xl border border-emerald-500/20 text-center space-y-2 relative">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  ESTIMATED FARE (NO SURGE)
                </span>
                <div className="text-5xl sm:text-6xl font-black text-white font-display tracking-tight flex items-center justify-center space-x-1">
                  <span className="text-emerald-400">₹</span>
                  <motion.span className="text-gradient-emerald">
                    {displayFare}
                  </motion.span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Includes Taxes, Tolls & Fuel • No hidden surcharge
                </p>
              </div>

              {/* Ride Details Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Estimated Travel Time:</span>
                  <span className="text-white font-bold font-mono">
                    {Math.round(distance * 2.2 + 8)} mins
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Nearest Driver Arrival:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {selectedVehicle.eta}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Rate Breakdown:</span>
                  <span className="text-gray-300 font-mono">
                    ₹{selectedVehicle.baseFare} Base + ₹{selectedVehicle.perKm}/km
                  </span>
                </div>
              </div>

              {/* Instant Book Action CTA */}
              <button
                onClick={handleBook}
                className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/60 transition-all duration-300"
                data-cursor-expand="true"
              >
                <div className="w-full py-4 bg-[#08090C] rounded-[15px] flex items-center justify-center space-x-2 transition-all duration-300 group-hover:bg-transparent">
                  {bookingDone ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400 group-hover:text-black" />
                      <span className="text-base font-bold text-white group-hover:text-black uppercase tracking-wider">
                        Ride Dispatched!
                      </span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-emerald-400 group-hover:text-black" />
                      <span className="text-base font-bold text-white group-hover:text-black uppercase tracking-wider">
                        Confirm & Dispatch Cab
                      </span>
                      <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </>
                  )}
                </div>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Price Lock Guarantee • Cancel Anytime Free</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
