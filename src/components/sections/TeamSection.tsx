"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Linkedin, Mail } from "lucide-react";
import { Shayari } from "@/components/ui/Shayari";

const TEAM = [
  {
    name: "Rohan Shukla",
    role: "Founder & CEO",
    tagline: "Building Phoolpur's most trusted mobility platform from the ground up.",
    photo: "/founder.png",
    founder: true,
  },
  {
    name: "Divyansh Pandey",
    role: "Marketing Head",
    tagline: "Driving Chaloji's brand to every city, street & smartphone.",
    photo: "/team member 1.jpeg",
    founder: false,
  },
  {
    name: "Ayaan Mirza",
    role: "Marketing Executive",
    tagline: "Spreading the Chaloji word across campuses & communities.",
    photo: "/team member 2.jpeg",
    founder: false,
  },
];

export function TeamSection() {
  return (
    <section id="team" className="relative py-16 sm:py-24 z-10 overflow-hidden">

      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>MEET THE TEAM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            The Minds Behind <br />
            <span className="text-gradient-emerald">Chaloji.</span>
          </h2>

          <p className="text-base text-gray-300">
            A passionate crew on a mission to redefine mobility across Uttar Pradesh &amp; beyond.
          </p>

          <Shayari>
            Mehnat hamara zewar, muskaan aapka inaam — yahi hai Chaloji ki pehchaan!
          </Shayari>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">

          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 text-center space-y-5 overflow-hidden group ${
                member.founder
                  ? "glass-card border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 md:-translate-y-4"
                  : "glass-card border border-white/10 shadow-xl shadow-black/30"
              }`}
            >

              {/* Top Glow */}
              <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${
                member.founder ? "bg-emerald-500/25" : "bg-cyan-500/15 opacity-0 group-hover:opacity-100"
              }`} />

              {member.founder && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[9px] font-extrabold uppercase tracking-widest">
                  ★ Founder
                </span>
              )}

              {/* Photo with Gradient Ring */}
              <div className="relative w-44 h-44 mx-auto rounded-full p-[3px] bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 group-hover:from-amber-400 group-hover:via-rose-500 group-hover:to-purple-500 transition-all duration-500">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full rounded-full object-cover border-4 border-[#08090C]"
                  draggable={false}
                />
                <span className="absolute bottom-2 right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-[#08090C] bg-emerald-500" />
                </span>
              </div>

              {/* Info */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white font-display">{member.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-widest ${member.founder ? "text-emerald-400" : "text-cyan-400"}`}>
                  {member.role}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed pt-1">{member.tagline}</p>
              </div>

              {/* Socials */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                <a
                  href="https://wa.me/918087747774?text=Hi%20Chaloji!%20I%20want%20to%20connect%20with%20the%20team."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact ${member.name} on WhatsApp`}
                  className="w-9 h-9 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="tel:8087747774"
                  aria-label={`Call Chaloji for ${member.name}`}
                  className="w-9 h-9 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <Users className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
