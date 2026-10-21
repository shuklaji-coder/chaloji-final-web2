"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Shield,
  Share2,
  AlertTriangle,
  Star,
  CheckCircle2,
  Navigation,
  Car,
  ChevronRight,
  X,
  Send,
  Zap,
} from "lucide-react";
import { Ride } from "@/types/ride";
import { formatCurrency } from "@/lib/utils";

interface ActiveRideTrackingProps {
  ride: Ride;
  onUpdateStatus: (status: Ride["status"]) => void;
  onCancelRide: () => void;
}

const CHAT_PRESETS = [
  "I am waiting at the pickup pin 📍",
  "Please turn on the AC ❄️",
  "How long will you take to arrive? ⏱️",
  "I have 2 bags of luggage 🧳",
];

export function ActiveRideTracking({
  ride,
  onUpdateStatus,
  onCancelRide,
}: ActiveRideTrackingProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "driver"; text: string }>>([
    { sender: "driver", text: "Namaste! Main pickup location ki taraf aa raha hoon." },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [sosActive, setSosActive] = useState(false);

  const captain = ride.driverDetails;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setInputMessage("");

    // Simulated driver reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "driver", text: "Theek hai ji, bas 2 minute me pahunch raha hoon!" },
      ]);
    }, 1500);
  };

  const handleShareTrip = () => {
    const text = encodeURIComponent(
      `🚖 Main ChaloJi ride par hoon!\n` +
      `Captain: ${captain?.name || "ChaloJi Captain"}\n` +
      `Gadi: ${captain?.vehicleModel} (${captain?.vehicleNumber})\n` +
      `Live Track: https://chaloji.com/track/${ride.id}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="w-full bg-[#0B1320] border-t border-[#DFC993]/40 rounded-t-3xl shadow-2xl p-5 space-y-4 max-h-[85dvh] overflow-y-auto">
      
      {/* Top Status & 4-Digit OTP Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFC993] block">
            {ride.status === "arrived"
              ? "CAPTAIN HAS ARRIVED AT PICKUP"
              : ride.status === "ongoing"
              ? "TRIP IN PROGRESS"
              : "CAPTAIN IS EN ROUTE"}
          </span>
          <h3 className="text-base font-black text-white font-display">
            {ride.status === "ongoing"
              ? "Heading to Destination"
              : "Arriving in approx 2-3 mins"}
          </h3>
        </div>

        {/* 4-Digit High-Contrast Start OTP */}
        <div className="text-center px-4 py-2 rounded-2xl bg-gradient-to-br from-[#DFC993] via-[#F3E1BD] to-[#C8A463] text-[#041611] shadow-lg shadow-[#DFC993]/30">
          <span className="text-[9px] uppercase font-extrabold tracking-wider block">START OTP</span>
          <span className="text-lg font-black font-mono tracking-widest leading-none">
            {ride.otp || "4774"}
          </span>
        </div>
      </div>

      {/* Live Captain Details Card */}
      {captain && (
        <div className="p-4 rounded-2xl bg-[#041611] border border-[#DFC993]/25 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <img
                src={captain.photoUrl}
                alt={captain.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#DFC993]"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-black text-[9px] font-black flex items-center space-x-0.5">
                <span>{captain.rating}</span>
                <Star className="w-2 h-2 fill-black text-black" />
              </span>
            </div>

            <div>
              <h4 className="text-sm font-black text-white font-display leading-tight">
                {captain.name}
              </h4>
              <p className="text-xs font-bold text-[#DFC993]">{captain.vehicleModel}</p>
              <span className="text-[11px] font-mono font-bold text-gray-300 px-2 py-0.5 rounded bg-white/5 border border-white/10 mt-1 inline-block">
                {captain.vehicleNumber}
              </span>
            </div>
          </div>

          {/* Quick Actions (Call & Chat) */}
          <div className="flex items-center space-x-2">
            <a
              href={`tel:${captain.phone}`}
              aria-label="Call Driver"
              className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black flex items-center justify-center transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setChatOpen(true)}
              aria-label="Chat with Driver"
              className="w-10 h-10 rounded-xl bg-[#DFC993]/20 border border-[#DFC993]/40 text-[#DFC993] hover:bg-[#DFC993] hover:text-[#041611] flex items-center justify-center transition-all shadow-md relative"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </button>
          </div>
        </div>
      )}

      {/* 24x7 Safety & Emergency SOS Toolkit */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={handleShareTrip}
          className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center space-x-2 text-xs font-bold text-white transition-colors"
        >
          <Share2 className="w-4 h-4 text-[#DFC993]" />
          <span>Share Live Ride</span>
        </button>

        <button
          onClick={() => setSosActive(true)}
          className="p-3 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 flex items-center justify-center space-x-2 text-xs font-bold text-rose-300 transition-colors"
        >
          <Shield className="w-4 h-4 text-rose-400" />
          <span>24/7 Safety SOS</span>
        </button>
      </div>

      {/* Interactive Simulation Action Buttons (For Testing Full Flow) */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-[10px] font-mono uppercase font-bold text-gray-400 block">
          RIDE PROGRESS SIMULATOR:
        </span>
        <div className="flex flex-wrap gap-2">
          {ride.status !== "ongoing" && ride.status !== "arrived" && (
            <button
              onClick={() => onUpdateStatus("arrived")}
              className="px-3 py-1.5 rounded-xl bg-[#DFC993]/20 border border-[#DFC993]/40 text-xs font-bold text-[#DFC993] hover:bg-[#DFC993] hover:text-[#041611] transition-all"
            >
              Simulate: Captain Arrived
            </button>
          )}
          {ride.status !== "ongoing" && (
            <button
              onClick={() => onUpdateStatus("ongoing")}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
            >
              Start Trip (OTP Verified)
            </button>
          )}
          <button
            onClick={() => onUpdateStatus("completed")}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#DFC993] to-[#10B981] text-xs font-black text-[#041611] hover:brightness-110 transition-all shadow-md ml-auto"
          >
            Complete Ride ➔
          </button>
        </div>
      </div>

      {/* In-App Quick Chat Modal */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full max-w-md h-[500px] bg-[#0B1320] rounded-t-3xl sm:rounded-3xl border border-[#DFC993]/40 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-bold text-white">Chat with {captain?.name}</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages stream */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-xs font-medium ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-[#DFC993] to-[#10B981] text-[#041611] font-bold"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Presets */}
              <div className="p-2 border-t border-white/10 flex space-x-2 overflow-x-auto">
                {CHAT_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 whitespace-nowrap"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/10 flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2 rounded-xl bg-[#DFC993] text-[#041611]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOS Modal */}
      <AnimatePresence>
        {sosActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-sm rounded-3xl bg-[#0B1320] border-2 border-rose-500 p-6 space-y-4 text-center shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center mx-auto text-rose-500 animate-bounce">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white font-display">24x7 Emergency SOS</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Emergency desk alerted. Tap below to directly call Police Emergency (112) or the dedicated ChaloJi 24x7 Safety Desk.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:112"
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider block shadow-lg shadow-rose-600/40"
                >
                  Call Police Emergency (112)
                </a>
                <a
                  href="tel:8087747774"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider block"
                >
                  Call ChaloJi Safety Desk (8087747774)
                </a>
                <button
                  onClick={() => setSosActive(false)}
                  className="text-xs text-gray-400 hover:text-white pt-2 block mx-auto"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
