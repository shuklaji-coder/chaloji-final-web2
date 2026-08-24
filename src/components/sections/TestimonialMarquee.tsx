"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";

interface Review {
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  avatar: string;
}

const REVIEWS_ROW_1: Review[] = [
  {
    name: "Vikram Kumar",
    role: "Regular Outstation Passenger",
    city: "Phoolpur",
    rating: 5,
    text: "Booked a cab from Phoolpur to Varanasi for a family pilgrimage. The driver arrived 5 mins early, cab was super clean, and zero surge pricing!",
    avatar: "/team member 1.jpeg",
  },
  {
    name: "Ananya Sharma",
    role: "Corporate Traveler",
    city: "Boring Road",
    rating: 5,
    text: "ChaloJi is a game changer in Uttar Pradesh! The live map tracking works seamlessly, and booking an instant sedan takes less than 10 seconds.",
    avatar: "/team member 2.jpeg",
  },
  {
    name: "Rajesh Singh",
    role: "Driver Partner",
    city: "Kankarbagh",
    rating: 5,
    text: "Joined as a driver 6 months ago. Daily UPI payouts and full support from the ChaloJi team. I earn over ₹65,000 every single month!",
    avatar: "/founder.png",
  },
  {
    name: "Pooja Verma",
    role: "Wedding Planner",
    city: "Varanasi",
    rating: 5,
    text: "We booked 6 Fortuners and an Audi for our client's Baarat convoy. Synchronized drivers, flower decoration, and total royal treatment!",
    avatar: "/team member 2.jpeg",
  },
];

const REVIEWS_ROW_2: Review[] = [
  {
    name: "Amitabh Roy",
    role: "Airport Shuttle Commuter",
    city: "Varanasi Airport",
    rating: 5,
    text: "No hassle of bargaining with auto drivers at the airport anymore. Fixed rate, polite driver, and smooth luxury ride to home.",
    avatar: "/team member 1.jpeg",
  },
  {
    name: "Sneha Prakash",
    role: "University Student",
    city: "Jaunpur",
    rating: 5,
    text: "The Express Bike option is incredibly fast for college runs! Super affordable and I always feel safe with live ride sharing with family.",
    avatar: "/team member 2.jpeg",
  },
  {
    name: "Sunil Prasad",
    role: "Business Owner",
    city: "Prayagraj",
    rating: 5,
    text: "Hourly rental option allowed me to complete 5 business meetings across town in a single day without waiting for multiple rides.",
    avatar: "/founder.png",
  },
  {
    name: "Ritu Kumari",
    role: "Tourist",
    city: "Ayodhya",
    rating: 5,
    text: "The digital booking UI is futuristic! Loved the transparent fare breakdown and instantaneous driver allocation.",
    avatar: "/team member 1.jpeg",
  },
];

export function TestimonialMarquee() {
  return (
    <section id="reviews" className="relative py-16 sm:py-28 z-10 overflow-hidden bg-[#07080B] border-t border-white/10">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Reviews Shayari Header */}
      <div className="relative z-10 text-center mb-10 px-4">
        <Shayari>
          Aapki tareef, hamari taqat — har khush safar ki yahi shuruaat!
        </Shayari>
      </div>

      {/* Marquee Row 1 (Left Direction) */}
      <div className="relative flex overflow-x-hidden mb-6">
        <div className="flex space-x-6 animate-marquee-left whitespace-nowrap">
          {[...REVIEWS_ROW_1, ...REVIEWS_ROW_1].map((review, i) => (
            <div
              key={i}
              className="w-[82vw] sm:w-[380px] shrink-0 glass-card p-6 rounded-3xl border border-white/10 space-y-4 whitespace-normal"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-white/10" />
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center space-x-3 pt-2 border-t border-white/5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-white font-display flex items-center space-x-1">
                    <span>{review.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {review.role} • {review.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Right Direction) */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex space-x-6 animate-marquee-right whitespace-nowrap">
          {[...REVIEWS_ROW_2, ...REVIEWS_ROW_2].map((review, i) => (
            <div
              key={i}
              className="w-[82vw] sm:w-[380px] shrink-0 glass-card p-6 rounded-3xl border border-white/10 space-y-4 whitespace-normal"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-white/10" />
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center space-x-3 pt-2 border-t border-white/5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-white font-display flex items-center space-x-1">
                    <span>{review.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {review.role} • {review.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
