"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, ShieldAlert, CheckCircle2, Phone, Mail, Car } from "lucide-react";

export default function AccountDeletionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [appType, setAppType] = useState<"user" | "driver">("user");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    const message = encodeURIComponent(
      `🗑️ *Account & Data Deletion Request - ChaloJi*\n\n` +
        `📱 *App Type:* ${appType === "user" ? "ChaloJi User App" : "ChaloJi Driver App"}\n` +
        `📞 *Registered Phone:* ${phone.trim()}\n` +
        `📝 *Reason:* ${reason.trim() || "User requested deletion"}\n\n` +
        `Please process account deletion and erase associated personal data per Google Play Policy.`
    );

    window.open(`https://wa.me/918087747774?text=${message}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#08090C] text-[#E2E8F0] selection:bg-emerald-400 selection:text-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-rose-500/10 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Google Play Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Account &amp; Data Deletion Request
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            In compliance with Google Play Developer Policies, ChaloJi riders and driver partners can request complete deletion of their account and associated personal data at any time.
          </p>
        </div>

        {/* Info Banner */}
        <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>What happens when you delete your account?</span>
          </div>
          <ul className="text-xs text-gray-300 space-y-1.5 pl-6 list-disc">
            <li>Your user profile, ride history, and saved preferences will be permanently erased.</li>
            <li>Driver earnings records required for legal/tax compliance will be archived securely as per statutory regulations.</li>
            <li>Your account will be deactivated within 48-72 business hours upon verification.</li>
          </ul>
        </div>

        {/* Form or Confirmation */}
        {submitted ? (
          <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Deletion Request Initiated</h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              Your deletion request has been submitted to support team (+91 80877 47774). Our compliance team will verify your phone number and complete account deletion within 48-72 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Select App Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAppType("user")}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    appType === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-emerald-500/20"
                      : "glass-panel border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  ChaloJi User App (Rider)
                </button>
                <button
                  type="button"
                  onClick={() => setAppType("driver")}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    appType === "driver"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-emerald-500/20"
                      : "glass-panel border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  ChaloJi Driver App (Partner)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Registered Mobile Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Reason for Account Deletion (Optional)
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Let us know why you are leaving..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Confirm &amp; Request Data Deletion</span>
            </button>
          </form>
        )}

        {/* Support contact info */}
        <div className="text-center pt-4 border-t border-white/10 text-xs text-gray-400 space-y-2">
          <p>Alternatively, email your account deletion request directly to:</p>
          <div className="flex items-center justify-center space-x-4 font-medium text-emerald-400">
            <a href="mailto:support@chaloji.com" className="flex items-center space-x-1.5 hover:underline">
              <Mail className="w-3.5 h-3.5" />
              <span>support@chaloji.com</span>
            </a>
            <span>•</span>
            <a href="tel:8087747774" className="flex items-center space-x-1.5 hover:underline">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 80877 47774</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
