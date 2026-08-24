"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How do I book a Chaloji ride?",
    answer:
      "Booking takes under 10 seconds. Download the Chaloji app (Android & iOS), set your pickup & drop location, choose your ride — Bike, Auto, Sedan or SUV — and confirm. You can also call our 24x7 helpline or WhatsApp us for instant bookings.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "You can cancel free of charge within 5 minutes of booking or before the driver starts moving toward you. If the driver is already en route, a small cancellation fee may apply. For outstation & Baarat convoy bookings, cancellations made 24+ hours in advance are fully refundable.",
  },
  {
    question: "Which payment modes are accepted?",
    answer:
      "We accept UPI (GPay, PhonePe, Paytm), all major debit & credit cards, net banking, popular wallets, and cash. Driver partners receive daily payouts directly to their bank accounts with zero delays.",
  },
  {
    question: "Are Chaloji drivers verified?",
    answer:
      "Absolutely. Every driver partner undergoes police background verification, licence & RC document checks, and in-app identity confirmation before their first ride. Our drivers are uniformly rated by passengers after every trip to keep quality high.",
  },
  {
    question: "Is my ride safe at night or as a solo woman?",
    answer:
      "Yes. All rides include live GPS tracking, an in-app emergency SOS button that alerts our control room & trusted contacts, and trip sharing links you can send to family. Night rides get priority support monitoring.",
  },
  {
    question: "Do you charge surge pricing during peak hours?",
    answer:
      "Never. Chaloji is built on zero-surge pricing — the fare you see is the fare you pay, whether it's festival season, rush hour, or heavy rain.",
  },
  {
    question: "Can I book outstation trips or weddings in advance?",
    answer:
      "Yes! Outstation rides, hourly rentals and luxury Baarat convoys can be scheduled days or weeks ahead via the app, phone, or WhatsApp. Wedding convoys come with decoration options, uniformed chauffeurs and dedicated fleet coordination.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 sm:py-24 z-10 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquareText className="w-3.5 h-3.5 text-emerald-400" />
            <span>STILL HAVE QUESTIONS?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Frequently Asked <br />
            <span className="text-gradient-emerald">Questions.</span>
          </h2>

          <p className="text-base text-gray-300">
            Everything about bookings, fares, safety & payments — answered.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl glass-card overflow-hidden transition-colors duration-300 ${
                  isOpen ? "border-emerald-500/40 shadow-lg shadow-emerald-950/40" : "border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left group"
                  data-cursor-expand="true"
                >
                  <span
                    className={`text-sm sm:text-base font-bold font-display transition-colors duration-200 ${
                      isOpen ? "text-emerald-300" : "text-white group-hover:text-emerald-300"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-emerald-500 to-cyan-500 border-transparent text-black"
                        : "glass-panel border-white/10 text-gray-400"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-7 pb-6 text-sm text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
