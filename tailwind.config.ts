import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: "#FAF7EE",
          100: "#F5EFDA",
          200: "#EBDDB7",
          300: "#DFC993",
          400: "#D4B672",
          500: "#C59F53",
          600: "#AA823E",
          700: "#866330",
          800: "#654926",
          900: "#48331E",
          DEFAULT: "#DFC993",
          light: "#F7EBD2",
          shimmer: "#FFF9EE",
          dark: "#B58E4A",
          muted: "#9E8C6C",
        },
        cyber: {
          bg: "#041611",
          surface: "#072019",
          card: "#0A2820",
          border: "#164738",
          emerald: "#10B981",
          amber: "#DFC993",
          cyan: "#34D399",
          violet: "#B58E4A",
          rose: "#E11D48",
          text: "#F4F7F5",
          muted: "#8FA89F",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer-sweep": "shimmer 2.5s infinite",
        "shimmer-text": "shimmerText 2.5s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "marquee-left": "marqueeLeft 30s linear infinite",
        "marquee-right": "marqueeRight 30s linear infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        shimmerText: {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      boxShadow: {
        "neon-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.5)",
        "neon-champagne": "0 0 25px -5px rgba(223, 201, 147, 0.45)",
        "neon-amber": "0 0 25px -5px rgba(223, 201, 147, 0.5)",
        "neon-cyan": "0 0 25px -5px rgba(52, 211, 153, 0.5)",
        "glass-glow": "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        "champagne-glow": "0 10px 30px -5px rgba(223, 201, 147, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
