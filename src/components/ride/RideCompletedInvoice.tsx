"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Star,
  Download,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Heart,
  Home,
} from "lucide-react";
import { Ride } from "@/types/ride";
import { formatCurrency } from "@/lib/utils";

interface RideCompletedInvoiceProps {
  ride: Ride;
  onFinish: () => void;
}

export function RideCompletedInvoice({
  ride,
  onFinish,
}: RideCompletedInvoiceProps) {
  const [rating, setRating] = useState(5);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#DFC993", "#10B981", "#F7EBD2", "#059669", "#B58E4A"],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const totalAmount = ride.fare + (selectedTip || 0);

  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#0B1320] border-t border-[#DFC993]/40 rounded-t-3xl shadow-2xl p-6 space-y-6 max-h-[88dvh] overflow-y-auto">
      
      {/* Success Badge */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/30"
        >
          <CheckCircle2 className="w-9 h-9" />
        </motion.div>
        <h3 className="text-2xl font-black text-white font-display">Aapki Sawaari Safal Rahi!</h3>
        <p className="text-xs text-gray-400">
          Trip Completed • Thank you for choosing ChaloJi
        </p>
      </div>

      {/* Official Digital Tax Invoice Card */}
      <div className="p-5 rounded-2xl bg-[#041611] border border-[#DFC993]/30 space-y-4 shadow-xl print:text-black print:bg-white">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Receipt className="w-4 h-4 text-[#DFC993]" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              TAX INVOICE #{ride.id}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            GST PAID (0% SURGE)
          </span>
        </div>

        {/* Route Details */}
        <div className="space-y-1.5 text-xs text-gray-300">
          <div className="flex items-start space-x-2">
            <span className="text-emerald-400">📍</span>
            <span className="font-semibold text-white">Pickup:</span>
            <span className="line-clamp-1">{ride.pickup.title || ride.pickup.address}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-[#DFC993]">🏁</span>
            <span className="font-semibold text-white">Drop:</span>
            <span className="line-clamp-1">{ride.drop.title || ride.drop.address}</span>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs font-mono text-gray-300">
          <div className="flex justify-between">
            <span>Trip Distance ({ride.distanceKm} km):</span>
            <span>{formatCurrency(ride.fare + (ride.discount || 0))}</span>
          </div>
          {ride.discount > 0 && (
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>Promo Discount Applied:</span>
              <span>-{formatCurrency(ride.discount)}</span>
            </div>
          )}
          {selectedTip && (
            <div className="flex justify-between text-[#DFC993] font-bold">
              <span>Driver Appreciation Tip:</span>
              <span>+{formatCurrency(selectedTip)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-white/10 text-white font-black text-base font-display">
            <span>Total Paid ({ride.paymentMethod.toUpperCase()}):</span>
            <span className="text-emerald-400">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* Captain acknowledgement */}
        {ride.driverDetails && (
          <div className="flex items-center space-x-3 pt-2 text-xs text-gray-400">
            <span>Captain: <strong className="text-white">{ride.driverDetails.name}</strong></span>
            <span>•</span>
            <span>Vehicle: <strong className="text-white">{ride.driverDetails.vehicleModel}</strong></span>
          </div>
        )}
      </div>

      {/* 5-Star Captain Rating */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
          Rate Captain {ride.driverDetails?.name || ""}
        </h4>
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-125 active:scale-95"
            >
              <Star
                className={`w-7 h-7 ${
                  star <= rating
                    ? "fill-[#DFC993] text-[#DFC993]"
                    : "text-gray-600"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Tip Selection */}
        <div className="pt-2">
          <span className="text-[11px] text-gray-400 block mb-2">
            Encourage your Captain with a voluntary Tip:
          </span>
          <div className="flex justify-center space-x-2">
            {[10, 20, 50].map((tip) => (
              <button
                key={tip}
                onClick={() => setSelectedTip(selectedTip === tip ? null : tip)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  selectedTip === tip
                    ? "bg-[#DFC993] text-[#041611] border-[#DFC993] shadow-md"
                    : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
                }`}
              >
                +₹{tip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={handleDownloadInvoice}
          className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#DFC993] hover:text-white transition-all flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Tax Invoice</span>
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinish}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] text-[#041611] font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-[#DFC993]/40 transition-all flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4 text-[#041611]" />
          <span>Back to Home Dashboard</span>
        </motion.button>
      </div>

    </div>
  );
}
