"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, Sparkles, Radio } from "lucide-react";
import { RideCategory } from "@/types/ride";

interface ChaloCaptainLoaderProps {
  category: RideCategory;
  onCancelRequest: (reason: string) => void;
}

const ROTATING_TEXTS = [
  "Engine start ho raha hai... 🏍️",
  "Nearest verified Captains se connect ho rahe hain... 📡",
  "Transparent upfront fare lock ho raha hai... ⚡",
  "Bas 2 second, Chalo Ji! ✨",
];

const CANCEL_REASONS = [
  "Booked by mistake",
  "Driver taking too long to assign",
  "Changed my mind / plan cancelled",
  "Want to change pickup or drop location",
  "Want to select another vehicle category",
];

export function ChaloCaptainLoader({
  category,
  onCancelRequest,
}: ChaloCaptainLoaderProps) {
  const [seconds, setSeconds] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Stopwatch timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Text rotator every 2.5 seconds
  useEffect(() => {
    const rotator = setInterval(() => {
      setTextIndex((i) => (i + 1) % ROTATING_TEXTS.length);
    }, 2500);
    return () => clearInterval(rotator);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getVehicleIcon = () => {
    switch (category) {
      case "bike":
        return "🏍️";
      case "auto":
        return "🛺";
      case "suv":
        return "🚙";
      default:
        return "🚗";
    }
  };

  return (
    <div className="w-full bg-[#0B1320] border-t border-[#DFC993]/40 rounded-t-3xl shadow-2xl p-6 space-y-6 text-center relative overflow-hidden">
      
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-48 h-32 bg-[#DFC993]/15 blur-3xl pointer-events-none" />

      {/* Top Header & Radar Pulse */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400">
          <Radio className="w-4 h-4 animate-pulse text-[#DFC993]" />
          <span>CONNECTING TO SATELLITE DISPATCH...</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs font-bold text-white">
          {formatTimer(seconds)}
        </div>
      </div>

      {/* SIGNATURE ANIMATED VEHICLE ON MOVING HIGHWAY */}
      <div className="relative w-full h-36 rounded-2xl bg-[#041611] border border-[#DFC993]/20 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
        
        {/* Speed streak lines in background */}
        <div className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-30">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFC993] to-transparent"
          />
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear", delay: 0.3 }}
            className="w-36 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          />
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.6 }}
            className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#DFC993] to-transparent"
          />
        </div>

        {/* The Exact Booked Vehicle with Suspension Bounce & Road Vibration */}
        <div className="relative flex-1 flex items-center justify-center">
          <motion.div
            animate={{
              y: [-3, 3, -2, 2, -3],
              rotate: [-1, 1, -0.5, 0.5, -1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative text-6xl drop-shadow-[0_15px_15px_rgba(16,185,129,0.3)] select-none"
          >
            {getVehicleIcon()}

            {/* Subtle underglow shadow */}
            <div className="w-16 h-3 bg-emerald-500/30 rounded-full blur-md mx-auto mt-[-10px]" />
          </motion.div>
        </div>

        {/* Infinite Moving Highway Dashed Road Strip */}
        <div className="relative w-full h-3 border-t border-dashed border-white/20 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="flex w-[200%] space-x-4"
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="w-6 h-1 rounded-full bg-[#DFC993] shrink-0 opacity-70"
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dynamic Rotating Status Text */}
      <div className="h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="text-sm sm:text-base font-bold text-white font-display"
          >
            {ROTATING_TEXTS[textIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Cancel Request Button */}
      <button
        onClick={() => setShowCancelModal(true)}
        className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-400 hover:text-rose-400 transition-colors"
      >
        Cancel Search Request
      </button>

      {/* Cancel Reason Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-[#0B1320] border border-rose-500/40 p-6 space-y-4 text-left shadow-2xl"
            >
              <div className="flex items-center space-x-2 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-base font-bold text-white font-display">Cancel Ride Search?</h3>
              </div>
              <p className="text-xs text-gray-400">Please tell us why you want to cancel:</p>

              <div className="space-y-2">
                {CANCEL_REASONS.map((reason, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setShowCancelModal(false);
                      onCancelRequest(reason);
                    }}
                    className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-xs text-gray-300 hover:text-white text-left transition-colors"
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                Continue Waiting for Captain
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
