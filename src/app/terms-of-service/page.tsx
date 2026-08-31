import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CyberBackground } from "@/components/vfx/CyberBackground";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { 
  FileText, 
  ShieldCheck, 
  Car, 
  CreditCard, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";

export const metadata = {
  title: "Terms of Service | ChaloJi Mobility",
  description: "Read the Terms of Service for using ChaloJi cab booking, rental, and mobility platform.",
};

export default function TermsOfServicePage() {
  return (
    <main className="relative min-h-screen bg-[#08090C] text-[#E2E8F0] overflow-x-hidden selection:bg-emerald-400 selection:text-black">
      <CyberBackground />
      <Navbar onInstantBook={() => {}} />

      <div className="relative z-10 pt-28 sm:pt-36 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header Hero */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Platform Usage & Service Agreement</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Service</span>
          </h1>
          
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Welcome to <strong className="text-white">ChaloJi Mobility</strong>. These Terms of Service govern your access and use of our cab booking software, outstation packages, wedding Baarat convoys, and ride dispatch services.
          </p>
          
          <p className="text-xs text-gray-500">
            Last Updated: August 31, 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="space-y-10">
          
          {/* Section 1: Acceptance */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-cyan-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2>1. Agreement to Terms</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              By creating an account, downloading the ChaloJi mobile application, or requesting a ride via our website/helpline, you agree to comply with and be legally bound by these Terms of Service and our Privacy Policy.
            </p>
          </section>

          {/* Section 2: Services Provided */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-emerald-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h2>2. Mobility & Ride Services</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              ChaloJi acts as a technology platform connecting passengers with licensed, independent driver partners. Services include:
            </p>
            <ul className="space-y-2 text-sm text-gray-300 pl-2">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Instant City & Hourly Cab Rentals</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Outstation Inter-city One-Way & Round Trips</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Airport Pickup & Drop Express Service</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Luxury Wedding Baarat Convoys & Special Event Rentals</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Pricing & Payments */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-amber-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <h2>3. Fares, Zero Surge Guarantee & Payments</h2>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Surge Pricing Guarantee:</strong> Fare estimates calculated at booking time are honored without hidden surge multipliers.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Tolls & State Taxes:</strong> Outstation fares exclude highway tolls, parking fees, and inter-state permit taxes unless explicitly stated during booking confirmation.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Payment Methods:</strong> Fares can be settled via Cash directly to the driver, or digital UPI / debit / credit card options.</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Cancellation & Refund Policy */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-rose-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h2>4. Cancellation & Refunds</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Riders may cancel bookings free of charge within 5 minutes of driver assignment. Cancellations after a driver has traveled significant distance to pickup location may incur a nominal cancellation fee credited to the driver. Advance deposits for outstation or event bookings are subject to our standard refund timeline (3-5 business days).
            </p>
          </section>

          {/* Section 5: Conduct & Safety */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-cyan-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2>5. User Responsibilities & Conduct</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Users must treat driver partners with respect. Smoking, illegal substance consumption, carrying prohibited goods, or abusive behavior in vehicles is strictly prohibited and will result in immediate account termination and police reporting.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white font-display">6. Contact Information</h2>
            <p className="text-sm text-gray-300">
              For questions regarding these terms, please contact us at:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Phone className="w-4 h-4" />
                <a href="tel:8087747774" className="hover:underline">+91 80877 47774</a>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@chaloji.com" className="hover:underline">support@chaloji.com</a>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
