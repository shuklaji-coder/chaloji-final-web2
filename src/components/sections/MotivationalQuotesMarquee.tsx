"use client";

import React from "react";
import { Quote, Compass, MapPin, Heart, Zap } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";

interface MotivationalQuote {
  text: string;
  author: string;
  icon: React.ReactNode;
  gradient: string;
}

const QUOTES_ROW_1: MotivationalQuote[] = [
  {
    text: "Safar lamba ho ya chhota, ChaloJi ke saath har pal hota hai khushiyon ka pota!",
    author: "ChaloJi",
    icon: <Compass className="w-5 h-5" />,
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    text: "Manzil toh wahi hai jo safar mein saath chale — aur ChaloJi woh saathi hai jo kabhi na thake!",
    author: "ChaloJi",
    icon: <MapPin className="w-5 h-5" />,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    text: "Kamyabi unhi ko milti hai jo chalte rehte hain — buss ek safe ride chahiye, baaki hum sambhal lenge!",
    author: "ChaloJi",
    icon: <Zap className="w-5 h-5" />,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    text: "Zindagi ek safar hai, toh kyun na isse luxury banaye? ChaloJi ke saath chaliye, royal raaste par!",
    author: "ChaloJi",
    icon: <Heart className="w-5 h-5" />,
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    text: "Har subah ek naya kadam, har kadam ek naya iraada — ChaloJi aapke saath hai har safar ke saath!",
    author: "ChaloJi",
    icon: <Compass className="w-5 h-5" />,
    gradient: "from-violet-500/20 to-purple-500/20",
  },
];

const QUOTES_ROW_2: MotivationalQuote[] = [
  {
    text: "Soch badlo, safar badlega — ChaloJi ke saath har trip hoti hai yaadgaar!",
    author: "ChaloJi",
    icon: <Zap className="w-5 h-5" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    text: "Darr ke aage jeet hai, aur ChaloJi ke aage manzil — bas baith jao, hum le chalenge!",
    author: "ChaloJi",
    icon: <MapPin className="w-5 h-5" />,
    gradient: "from-cyan-500/20 to-sky-500/20",
  },
  {
    text: "Sapne wo nahi jo sote waqt aaye, sapne wo hain jo aapko jagaye — ChaloJi aapko le chale uss sapne ki ore!",
    author: "ChaloJi",
    icon: <Heart className="w-5 h-5" />,
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    text: "Waqt badalta hai, zamana badalta hai — lekin ChaloJi ki commitment kabhi nahi badalti!",
    author: "ChaloJi",
    icon: <Compass className="w-5 h-5" />,
    gradient: "from-rose-500/20 to-red-500/20",
  },
  {
    text: "Ek chhota sa kadam aapka, ek badi soch ChaloJi ki — milke banayenge har safar ka safar ka ek kahaani!",
    author: "ChaloJi",
    icon: <Zap className="w-5 h-5" />,
    gradient: "from-violet-500/20 to-indigo-500/20",
  },
];

export function MotivationalQuotesMarquee() {
  return (
    <section className="relative py-16 sm:py-28 z-10 overflow-hidden bg-[#07080B] border-t border-white/10">

      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Quotes Shayari Header */}
      <div className="relative z-10 text-center mb-10 px-4">
        <Shayari>
          Safar ki raahon mein hausla ka saath — ChaloJi ke saath har din hai naya raath!
        </Shayari>
      </div>

      {/* Marquee Row 1 (Left Direction) */}
      <div className="relative flex overflow-x-hidden mb-6">
        <div className="flex space-x-6 animate-marquee-left whitespace-nowrap">
          {[...QUOTES_ROW_1, ...QUOTES_ROW_1].map((quote, i) => (
            <div
              key={i}
              className="w-[82vw] sm:w-[380px] shrink-0 glass-card p-6 rounded-3xl border border-white/10 space-y-4 whitespace-normal"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${quote.gradient} text-emerald-400`}>
                  {quote.icon}
                </div>
                <Quote className="w-6 h-6 text-white/10" />
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-normal italic">
                &ldquo;{quote.text}&rdquo;
              </p>

              <div className="pt-2 border-t border-white/5">
                <span className="text-[11px] text-emerald-400/70 font-medium tracking-wider uppercase">
                  — {quote.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Right Direction) */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex space-x-6 animate-marquee-right whitespace-nowrap">
          {[...QUOTES_ROW_2, ...QUOTES_ROW_2].map((quote, i) => (
            <div
              key={i}
              className="w-[82vw] sm:w-[380px] shrink-0 glass-card p-6 rounded-3xl border border-white/10 space-y-4 whitespace-normal"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${quote.gradient} text-cyan-400`}>
                  {quote.icon}
                </div>
                <Quote className="w-6 h-6 text-white/10" />
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-normal italic">
                &ldquo;{quote.text}&rdquo;
              </p>

              <div className="pt-2 border-t border-white/5">
                <span className="text-[11px] text-cyan-400/70 font-medium tracking-wider uppercase">
                  — {quote.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
