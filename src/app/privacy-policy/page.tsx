import React from "react";
import Metadata from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CyberBackground } from "@/components/vfx/CyberBackground";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Eye, 
  FileText, 
  Phone, 
  Mail, 
  UserCheck, 
  Database, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ChaloJi Mobility",
  description: "Learn how ChaloJi protects your data, privacy, and personal information across our cab booking and mobility services.",
};

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Data Protection & Privacy Standards</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Policy</span>
          </h1>
          
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            At <strong className="text-white">ChaloJi Mobility</strong>, we are committed to safeguarding your privacy and ensuring transparency in how your personal data is collected, stored, used, and protected when using our platform and mobile applications.
          </p>
          
          <p className="text-xs text-gray-500">
            Last Updated: August 31, 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="space-y-10">
          
          {/* Section 1: Overview & Scope */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-emerald-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2>1. Introduction & Scope</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              This Privacy Policy applies to all riders, driver partners, and users of the ChaloJi mobile application, website (https://chalojii.in), and associated ride-booking services. By accessing or using ChaloJi, you consent to the practices described in this document.
            </p>
          </section>

          {/* Section 2: Data We Collect */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center space-x-3 text-cyan-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <h2>2. Information We Collect</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-xl border border-white/5 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Personal Identification</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Full name, mobile phone number, profile photo, email address, and emergency contact details provided during registration.
                </p>
              </div>

              <div className="bg-white/5 p-5 rounded-xl border border-white/5 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Location Data</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Precise GPS coordinates (foreground and background during active rides) for pickup dispatch, live trip tracking, navigation, and safety verification.
                </p>
              </div>

              <div className="bg-white/5 p-5 rounded-xl border border-white/5 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Payment & Transaction Data</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Payment mode preferences, trip fares, transaction IDs, and receipt history. Financial credentials (UPI IDs, cards) are processed directly via PCI-DSS compliant payment gateways.
                </p>
              </div>

              <div className="bg-white/5 p-5 rounded-xl border border-white/5 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-rose-400" />
                  <span>Device & Diagnostic Information</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Device model, operating system version, app logs, IP address, unique device identifiers, and crash telemetry to optimize performance.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Your Data */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-emerald-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2>3. Purpose of Processing & Usage</h2>
            </div>
            
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                "Matching riders with available verified driver partners efficiently.",
                "Enabling real-time trip navigation, ETA calculation, and route monitoring.",
                "Calculating transparent, zero-surge fares based on exact distance and time.",
                "Facilitating customer support, dispute resolution, and ride assistance.",
                "Sending critical transactional alerts, booking confirmations, and ride updates via SMS or push notifications.",
                "Preventing fraud, unauthorized account access, and enhancing overall platform safety."
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Data Sharing */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-amber-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h2>4. Information Sharing & Disclosure</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">We do NOT sell, rent, or trade your personal information to third parties.</strong> Data is shared strictly under the following operational conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400 pl-2">
              <li><strong className="text-gray-200">With Driver Partners:</strong> During an active booking, drivers receive your pickup address, name, and masked contact info necessary to complete the trip.</li>
              <li><strong className="text-gray-200">With Emergency Services & Authorities:</strong> If an SOS trigger is activated or required by applicable laws, law enforcement agencies, or court orders.</li>
              <li><strong className="text-gray-200">Third-Party Service Providers:</strong> Trusted partners who process cloud hosting, map rendering, SMS gateways, and analytics under strict confidentiality contracts.</li>
            </ul>
          </section>

          {/* Section 5: Data Security & Retention */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-cyan-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2>5. Data Security & Storage</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              ChaloJi employs industry-standard encryption protocols (SSL/TLS for data in transit and AES-256 for data at rest) to safeguard user data against unauthorized access, loss, or alteration. Access to sensitive user records is strictly restricted to authorized operational personnel.
            </p>
          </section>

          {/* Section 6: User Rights & Choice */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-emerald-400 font-bold font-display text-lg">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <h2>6. Your Rights & Controls</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              You maintain full control over your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400 pl-2">
              <li><strong className="text-gray-200">Location Settings:</strong> You can disable device location permissions at any time via phone settings, though this will limit ride booking capabilities.</li>
              <li><strong className="text-gray-200">Account Access & Corrections:</strong> You can review and update your profile information within the app settings.</li>
              <li><strong className="text-gray-200">Account Deletion:</strong> You can request permanent account and data deletion by contacting our support team at support@chaloji.com.</li>
            </ul>
          </section>

          {/* Section 7: Support & Grievance Contact */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white font-display">7. Contact Us & Grievance Redressal</h2>
              <p className="text-sm text-gray-300">
                If you have questions, feedback, or grievances regarding this Privacy Policy or data handling, please reach out to our dedicated privacy officer:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Helpline</p>
                  <a href="tel:8087747774" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    +91 80877 47774
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Support Email</p>
                  <a href="mailto:support@chaloji.com" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    support@chaloji.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Headquarters</p>
                  <p className="text-xs font-semibold text-white">
                    Phoolpur, Uttar Pradesh 212402
                  </p>
                </div>
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
