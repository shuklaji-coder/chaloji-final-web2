"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, Download, ShieldCheck, Zap, X, Rocket, BellRing } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";

type AppType = {
  name: string;
  icon: string;
  accent: string;
};

export function AppDownloadSection() {
  const [selectedApp, setSelectedApp] = useState<AppType | null>(null);

  const driverApp: AppType = {
    name: "Chaloji Driver App",
    icon: "/icon.png",
    accent: "emerald",
  };

  const userApp: AppType = {
    name: "Chaloji User App",
    icon: "/icon%20copy.png",
    accent: "cyan",
  };

  // Lock body scroll while modal is open
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedApp(null);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [selectedApp]);

  return (
    <section id="app-download" className="relative py-16 sm:py-24 z-10 overflow-hidden">

      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>GET THE CHALOJI APPS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            One Platform, <br />
            <span className="text-gradient-emerald">Two Powerful Apps.</span>
          </h2>

          <p className="text-base text-gray-300">
            Ride with ease using the Chaloji User App, or earn on your own schedule as a Driver Partner.
          </p>

          <Shayari>
            Phone uthao, Chaloji chalao — sawaari apni, tension bhulao!
          </Shayari>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">

          {/* Driver App Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl shadow-emerald-950/40 flex flex-col items-center text-center space-y-6 relative overflow-hidden group"
            data-cursor-expand="true"
          >
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <img
                src={driverApp.icon}
                alt="Chaloji Driver App"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl object-cover shadow-xl shadow-emerald-950/60 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold uppercase tracking-wider">
                Partner
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white font-display">Chaloji Driver App</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Become a verified Chaloji partner. Accept rides, track live earnings &amp; grow your income every day.
              </p>
            </div>

            <button
              onClick={() => setSelectedApp(driverApp)}
              className="relative mt-auto w-full group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/60 transition-all duration-300 cursor-pointer"
            >
              <div className="w-full py-3.5 bg-[#08090C] rounded-[15px] flex items-center justify-center space-x-2 transition-all duration-300 group-hover/btn:bg-transparent">
                <Download className="w-5 h-5 text-emerald-400 group-hover/btn:text-black transition-colors" />
                <span className="text-sm font-extrabold text-white group-hover/btn:text-black uppercase tracking-wider transition-colors">
                  Download Driver App
                </span>
              </div>
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Free Registration • Daily Payouts • Full Support</span>
            </div>
          </motion.div>

          {/* User App Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl shadow-cyan-950/40 flex flex-col items-center text-center space-y-6 relative overflow-hidden group"
            data-cursor-expand="true"
          >
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <img
                src={userApp.icon}
                alt="Chaloji User App"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl object-cover shadow-xl shadow-cyan-950/60 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-cyan-500 text-black text-[10px] font-extrabold uppercase tracking-wider">
                Rider
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white font-display">Chaloji User App</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Book your first zero-surge ride in seconds. Live tracking, transparent fares &amp; instant support.
              </p>
            </div>

            <button
              onClick={() => setSelectedApp(userApp)}
              className="relative mt-auto w-full group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60 transition-all duration-300 cursor-pointer"
            >
              <div className="w-full py-3.5 bg-[#08090C] rounded-[15px] flex items-center justify-center space-x-2 transition-all duration-300 group-hover/btn:bg-transparent">
                <Download className="w-5 h-5 text-cyan-400 group-hover/btn:text-black transition-colors" />
                <span className="text-sm font-extrabold text-white group-hover/btn:text-black uppercase tracking-wider transition-colors">
                  Download User App
                </span>
              </div>
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Android &amp; iOS Supported</span>
            </div>
          </motion.div>

        </div>

        {/* ===== COMING SOON POPUP ===== */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            >
              {/* Card */}
              <motion.div
                initial={{ scale: 0.7, y: 60, opacity: 0, rotateX: -25 }}
                animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.75, y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-3xl p-[1.5px] bg-gradient-to-br from-emerald-400/60 via-white/10 to-cyan-400/60 shadow-2xl shadow-emerald-500/20"
              >
                <div className="relative bg-[#0A0B10]/95 rounded-[calc(1.5rem-1.5px)] px-7 py-10 overflow-hidden text-center">

                  {/* Inner glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

                  {/* Close btn */}
                  <button
                    onClick={() => setSelectedApp(null)}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-panel border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                  >
                    <X className="w-[18px] h-[18px]" />
                  </button>

                  {/* Rocket with pulse rings */}
                  <div className="relative mx-auto w-fit mb-6">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="absolute inset-0 rounded-full border border-emerald-400/50"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: [1, 2.1], opacity: [0.8, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.65,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                    <motion.div
                      animate={{ y: [-3, 3, -3], rotate: [-6, 6, -6] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/40"
                    >
                      <Rocket className="w-11 h-11 text-white" strokeWidth={2.2} />
                    </motion.div>
                  </div>

                  {/* App badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass-panel border border-white/10"
                  >
                    <img
                      src={selectedApp.icon}
                      alt=""
                      className="w-5 h-5 rounded-md object-cover"
                    />
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                      {selectedApp.name}
                    </span>
                  </motion.div>

                  {/* Coming Soon Text with shimmer */}
                  <motion.h3
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="relative text-4xl sm:text-5xl font-black font-display tracking-tight mb-3"
                  >
                    <span className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#34d399,#ffffff,#22d3ee,#34d399)] bg-[length:250%_100%] animate-shimmer-text">
                      Coming&nbsp;Soon
                    </span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto mb-7"
                  >
                    Hum tez tarike se kaam kar rahe hain!{" "}
                    <span className="text-gray-200 font-semibold">{selectedApp.name}</span> bahut jald Play Store &amp; App Store par aa raha hai. 🚀
                  </motion.p>

                  {/* Animated loading dots */}
                  <div className="flex items-center justify-center gap-2 mb-7">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                        animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </div>

                  {/* Notify button */}
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedApp(null)}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/60 transition-shadow duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <BellRing className="w-[18px] h-[18px]" />
                    Notify Me At Launch
                  </motion.button>

                  <p className="mt-4 text-[11px] text-gray-500 tracking-wide">
                    Launch hone pe sabse pehle aapko batayenge ✌️
                  </p>

                  {/* Bottom shimmer line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
