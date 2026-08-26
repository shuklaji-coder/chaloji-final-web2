import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08090C",
};

export const metadata: Metadata = {
  title: "ChaloJi | Premium Cab Booking & Mobility Platform - Phoolpur, UP",
  description: "Book instant cabs, outstation rides & airport transfers with zero surge pricing. Verified drivers, live GPS tracking & 24/7 support. Download the ChaloJi app now!",
  keywords: ["ChaloJi", "Cab Booking Phoolpur", "Outstation Cab Uttar Pradesh", "Airport Cab", "Zero Surge Pricing", "Live Ride Tracking", "Bike Taxi", "Auto Rental", "Sedan Booking", "SUV Rental"],
  authors: [{ name: "ChaloJi Mobility" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "ChaloJi - Next-Gen Mobility",
    title: "ChaloJi | Premium Cab Booking & Mobility Platform",
    description: "Book instant cabs, outstation rides & airport transfers with zero surge pricing. Verified drivers, live GPS tracking & 24/7 support.",
    images: [
      {
        url: "/Chaloji landing page photo .jpeg",
        width: 1200,
        height: 630,
        alt: "ChaloJi - Premium Cab Booking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChaloJi | Premium Cab Booking & Mobility Platform",
    description: "Book instant cabs, outstation rides & airport transfers with zero surge pricing.",
    images: ["/Chaloji landing page photo .jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
