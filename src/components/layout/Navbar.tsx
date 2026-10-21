"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall, 
  Menu, 
  X, 
  ChevronRight,
  Zap,
} from "lucide-react";

export function Navbar({ 
  onInstantBook, 
  onOpenEventModal 
}: { 
  onInstantBook?: () => void;
  onOpenEventModal?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu khulne par background scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Desktop size par aate hi drawer auto-close
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const navLinks = [
    { name: "Live Ride App", href: "/ride", badge: "LIVE 🚖" },
    { name: "Driver Join", href: "/#driver-join", badge: "EARN" },
    { name: "Baraat Fleet", href: "/#baarat-showcase" },
    { name: "Post-Diwali Launch", href: "/launching-soon", badge: "DIWALI 🪔" },
    { name: "Get App", href: "/#app-download" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#041611]/85 backdrop-blur-xl border-b border-[#DFC993]/20 shadow-2xl shadow-emerald-950/40"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Notch / status-bar safe area spacer */}
      <div className="safe-area-top" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <motion.a 
            href="#" 
            className="group flex items-center cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src="/chaloji logo.png"
              alt="Chaloji Logo"
              className="w-auto h-11 sm:h-12 object-contain drop-shadow-lg shadow-emerald-500/20 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(223,201,147,0.4)] transition-all duration-300"
            />
          </motion.a>

          {/* Desktop Nav Links */}
          <nav 
            className="hidden md:flex items-center space-x-1 glass-pill px-3 py-1.5 rounded-full border border-[#DFC993]/20 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                className="relative px-3.5 py-1.5 text-xs font-semibold text-[#F7EBD2]/85 hover:text-white transition-colors duration-200 flex items-center space-x-1.5 z-10"
                data-cursor-expand="true"
              >
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white/10 rounded-full border border-[#DFC993]/30 shadow-sm"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
                {link.badge && (
                  <span className="relative z-10 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[#DFC993] to-[#B58E4A] text-[#041611] shadow-sm">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.a
              href="tel:8087747774"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center space-x-2 text-xs font-medium text-[#F7EBD2] hover:text-[#10B981] px-3 py-2 rounded-xl transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#DFC993] animate-bounce" />
              <span>24x7 Helpline</span>
            </motion.a>

            {/* Shimmer Light Sweep CTA */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (onInstantBook) {
                  onInstantBook();
                } else {
                  window.location.href = "/#app-download";
                }
              }}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] p-[1px] shadow-lg shadow-[#DFC993]/20 hover:shadow-emerald-500/40 transition-shadow duration-300"
              data-cursor-expand="true"
            >
              <div className="relative px-5 py-2.5 bg-[#041611] rounded-[11px] flex items-center space-x-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#DFC993] group-hover:to-[#10B981]">
                <Zap className="w-4 h-4 text-[#DFC993] group-hover:text-[#041611] transition-colors" />
                <span className="text-xs font-bold text-[#F4F7F5] group-hover:text-[#041611] tracking-wide uppercase transition-colors">
                  Book Instant Ride
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#DFC993] group-hover:text-[#041611] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shimmer-sweep" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-panel border border-[#DFC993]/20 text-[#F7EBD2] hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass-panel border-b border-[#DFC993]/20 px-6 py-6 space-y-4 max-h-[calc(100dvh-90px)] overflow-y-auto bg-[#041611]/98 backdrop-blur-2xl shadow-2xl"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06 },
                },
              }}
              className="space-y-2"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold text-[#F7EBD2] hover:text-[#10B981] py-2.5 px-3 rounded-xl hover:bg-white/5 border-b border-white/5 flex items-center justify-between transition-colors"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#DFC993] to-[#B58E4A] text-[#041611]">
                      {link.badge}
                    </span>
                  )}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 pt-2"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onInstantBook) {
                    onInstantBook();
                  } else {
                    window.location.href = "/#app-download";
                  }
                }}
                className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] text-[#041611] font-extrabold text-sm tracking-wide uppercase shadow-lg shadow-[#DFC993]/30"
              >
                Book Instant Ride
              </motion.button>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href="tel:8087747774"
                className="flex items-center justify-center space-x-2 py-3 rounded-xl glass-panel border border-[#DFC993]/20 text-sm font-semibold text-[#F7EBD2]"
              >
                <PhoneCall className="w-4 h-4 text-[#DFC993]" />
                <span>24x7 Helpline: 8087747774</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
