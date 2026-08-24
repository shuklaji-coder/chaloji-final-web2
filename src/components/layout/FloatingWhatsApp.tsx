"use client";

import React from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "918087747774";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Chaloji! I want to book a ride / enquire about your services."
);

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Chaloji on WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center"
      data-cursor-expand="true"
    >
      <span className="hidden sm:flex max-w-0 overflow-hidden group-hover:max-w-[220px] transition-all duration-500 ease-out items-center">
        <span className="whitespace-nowrap ml-2 mr-[-8px] px-4 py-2.5 rounded-2xl rounded-br-sm glass-card border border-emerald-400/30 text-xs font-bold text-white shadow-xl shadow-black/40">
          Chat with us on WhatsApp
        </span>
      </span>

      <span className="relative flex w-14 h-14 sm:w-16 sm:h-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 shadow-2xl shadow-emerald-500/40">
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-50 animate-ping" />

        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="relative w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg"
          aria-hidden="true"
        >
          <path d="M16.003 3C8.833 3 3.006 8.826 3.006 15.996c0 2.286.6 4.52 1.74 6.49L3 29l6.68-1.72a12.96 12.96 0 0 0 6.32 1.63h.01c7.17 0 13-5.83 13-13C29.01 8.83 23.18 3 16 3zm0 23.66h-.01a10.8 10.8 0 0 1-5.5-1.51l-.39-.23-4.05 1.04 1.08-3.95-.26-.41a10.75 10.75 0 0 1-1.65-5.73c0-5.97 4.86-10.83 10.84-10.83 2.89 0 5.61 1.13 7.65 3.17a10.76 10.76 0 0 1 3.17 7.67c0 5.97-4.86 10.83-10.88 10.83zm5.94-8.11c-.32-.17-1.92-.95-2.22-1.06-.3-.11-.51-.16-.73.17-.21.32-.83 1.05-1.02 1.27-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.61-1.61-.96-.86-1.62-1.92-1.81-2.25-.19-.32-.02-.5.14-.66.15-.15.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.64s1.14 3.07 1.3 3.28c.16.22 2.23 3.4 5.4 4.77.75.32 1.34.52 1.8.67.76.24 1.45.21 2 .13.61-.09 1.92-.79 2.19-1.55.27-.76.27-1.41.19-1.55-.08-.13-.29-.21-.61-.37z" />
        </svg>

        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-70" />
          <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-[#08090C] bg-emerald-400" />
        </span>
      </span>
    </motion.a>
  );
}
