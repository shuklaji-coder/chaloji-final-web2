import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090C",
};

export const metadata: Metadata = {
  title: "ChaloJi Next-Gen | Ultra-Animated Cab & Mobility Platform",
  description: "Experience Uttar Pradesh's premier cinematic mobility platform. Instant outstation cabs, zero surge guarantees, live GPS route tracking, and luxury Baarat wedding convoys.",
  keywords: ["ChaloJi", "ChaloJi Next-Gen", "Cab Booking Phoolpur", "Outstation Cab Uttar Pradesh", "Baarat Convoy", "Wedding Car Rental"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08090C] text-[#E2E8F0] antialiased selection:bg-emerald-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
