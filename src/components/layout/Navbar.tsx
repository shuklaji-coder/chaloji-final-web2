"use client";

import React, { useState, useEffect } from "react";
import motion from "framer-motion";
import {
  Sparkles,
  PhoneCall, 
  ShieldCheck, 
  HeartHandshake, 
  Menu, 
  X, 
  ChevronRight,
  Zap,
  MapPin
} from "lucide-react";

export function Navbar({ onInstantBook }: { onInstantBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: "Live Route", href: "#hero-route" },
    { name: "Get App", href: "#app-download" },
    { name: "Baarat Convoy", href: "#baarat-showcase", badge: "HOT" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#08090C]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-emerald-950/20"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Notch / status-bar safe area spacer */}
      <div className="safe-area-top" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a href="#" className="group flex items-center cursor-pointer">
            <img
              src="/image.png"
              alt="Chaloji Logo"
              className="w-auto h-11 sm:h-12 object-contain drop-shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 glass-pill px-4 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3.5 py-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1.5 group"
                data-cursor-expand="true"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white animate-pulse">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:8087747774"
              className="flex items-center space-x-2 text-xs font-medium text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-xl transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>24x7 Helpline</span>
            </a>

            {/* Shimmer Light Sweep CTA */}
            <button
              onClick={onInstantBook}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 transition-all duration-300"
              data-cursor-expand="true"
            >
              <div className="relative px-5 py-2.5 bg-[#08090C] rounded-[11px] flex items-center space-x-2 transition-all duration-300 group-hover:bg-transparent">
                <Zap className="w-4 h-4 text-emerald-400 group-hover:text-black transition-colors" />
                <span className="text-xs font-bold text-white group-hover:text-black tracking-wide uppercase">
                  Book Instant Ride
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shimmer-sweep" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-panel text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 space-y-4 max-h-[calc(100dvh-90px)] overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-200 hover:text-emerald-400 py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onInstantBook();
            }}
            className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-sm tracking-wide uppercase shadow-lg shadow-emerald-500/30"
          >
            Book Instant Ride
          </button>
          <a
            href="tel:8087747774"
            className="flex items-center justify-center space-x-2 py-3 rounded-xl glass-panel border border-white/10 text-sm font-semibold text-gray-200"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>24x7 Helpline</span>
          </a>
        </div>
      )}
    </header>
  );
}
