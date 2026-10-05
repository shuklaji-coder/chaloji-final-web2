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
  alternates: {
    canonical: "https://chaloji.com",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
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
  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "ChaloJi Mobility",
    "image": "https://chaloji.com/Chaloji%20landing%20page%20photo%20.jpeg",
    "@id": "https://chaloji.com/#organization",
    "url": "https://chaloji.com",
    "telephone": "+918087747774",
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1420",
      "reviewCount": "1420",
      "bestRating": "5",
      "worstRating": "1"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Market, Phoolpur",
      "addressLocality": "Phoolpur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "212402",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.5517,
      "longitude": 82.0911
    },
    "areaServed": [
      { "@type": "City", "name": "Phoolpur" },
      { "@type": "City", "name": "Prayagraj" },
      { "@type": "City", "name": "Varanasi" },
      { "@type": "City", "name": "Jaunpur" },
      { "@type": "State", "name": "Uttar Pradesh" }
    ],
    "serviceType": ["Cab Booking", "Auto Rental", "Outstation Taxi", "Bike Taxi", "Wedding Baarat Convoy"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ChaloJi Mobility Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instant Cab Booking Phoolpur",
            "description": "Zero surge pricing AC Sedan and SUV cab booking in Phoolpur & Prayagraj."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Outstation Taxi Service",
            "description": "Outstation cabs from Phoolpur to Varanasi Airport, Sangam Ghat, Ayodhya & Lucknow."
          }
        }
      ]
    }
  };

  const jsonLdUserApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChaloJi User App",
    "operatingSystem": "ANDROID",
    "applicationCategory": "TravelApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "installUrl": "https://play.google.com/store/apps/details?id=com.rohan3543.chaloji&pcampaignid=web_share"
  };

  const jsonLdDriverApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChaloJi Driver App",
    "operatingSystem": "ANDROID",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "installUrl": "https://play.google.com/store/apps/details?id=com.chaloji.driver&pcampaignid=web_share"
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdUserApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDriverApp) }}
        />
      </head>
      <body className="bg-[#08090C] text-[#E2E8F0] antialiased selection:bg-emerald-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
